# Architecture de la plateforme de recrutement

## 🏗️ Vue d'ensemble

Cette plateforme est une application Angular moderne utilisant les dernières fonctionnalités d'Angular 21, notamment les **Signals** pour la gestion d'état réactive et les **Standalone Components**.

## 🎯 Principes architecturaux

### 1. **Standalone Components**
Tous les composants sont autonomes et n'ont pas besoin de NgModules :
```typescript
@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule, FormsModule, ...],
  templateUrl: './example.component.html'
})
```

### 2. **Angular Signals**
Gestion d'état réactive sans RxJS pour les cas simples :
```typescript
// État réactif
const count = signal(0);

// Valeurs calculées
const doubled = computed(() => count() * 2);

// Mise à jour
count.set(5);
count.update(v => v + 1);
```

### 3. **Services avec Dependency Injection**
Services injectables au niveau root :
```typescript
@Injectable({ providedIn: 'root' })
export class AuthService { }
```

## 📊 Diagramme d'architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     PRESENTATION LAYER                       │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Pages   │  │ Layouts  │  │Components│  │  Guards  │   │
│  │          │  │          │  │          │  │          │   │
│  │ - Auth   │  │ - Header │  │ - Chat   │  │ - Auth   │   │
│  │ - Jobs   │  │ - Footer │  │ - Cards  │  │ - Admin  │   │
│  │ - Admin  │  │ - Main   │  │          │  │          │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                      BUSINESS LAYER                          │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                    SERVICES                             │ │
│  │                                                          │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐            │ │
│  │  │   Auth   │  │   Jobs   │  │   Chat   │            │ │
│  │  │ Service  │  │ Service  │  │ Service  │            │ │
│  │  └──────────┘  └──────────┘  └──────────┘            │ │
│  │                                                          │ │
│  │  ┌──────────────┐  ┌──────────────┐                   │ │
│  │  │ Application  │  │    User      │                   │ │
│  │  │   Service    │  │   Service    │                   │ │
│  │  └──────────────┘  └──────────────┘                   │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                        DATA LAYER                            │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                     MODELS                              │ │
│  │                                                          │ │
│  │  User | JobOffer | Application | Chat | Stats          │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              MOCK DATA (In-Memory)                      │ │
│  │                                                          │ │
│  │  - Users data                                           │ │
│  │  - Jobs data                                            │ │
│  │  - Applications data                                    │ │
│  │  - Chat messages                                        │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Flux de données

### Authentification
```
User Input (Login Form)
    ↓
AuthService.login()
    ↓
Store user in Signal
    ↓
Save to LocalStorage
    ↓
Navigate to Dashboard/Jobs
    ↓
Header displays user info
```

### Recherche d'offres
```
User Input (Search/Filters)
    ↓
JobListComponent.onSearch()
    ↓
JobService.searchJobs(filters)
    ↓
Computed Signal updates
    ↓
View updates automatically
```

### Candidature
```
User clicks "Apply"
    ↓
JobDetailComponent.applyForJob()
    ↓
Check if CV exists
    ↓
ApplicationService.applyForJob()
    ↓
Create new application
    ↓
Update applications Signal
    ↓
Show success message
```

### Chat
```
User sends message
    ↓
ChatComponent.sendMessage()
    ↓
ChatService.sendMessage()
    ↓
Update messages Signal
    ↓
Trigger bot response
    ↓
Add bot message to Signal
    ↓
View updates (both messages)
```

## 🗂️ Structure des données

### User Model
```typescript
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: string;
  educationLevel?: string;
  experience?: string;
  profilePhoto?: string;
  cvUrl?: string;
  role: 'candidate' | 'admin';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### JobOffer Model
```typescript
interface JobOffer {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  type: 'CDI' | 'CDD' | 'Stage' | 'Freelance' | 'Alternance';
  domain: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  salary?: string;
  benefits?: string[];
  isPublished: boolean;
  postedDate: Date;
  expiryDate?: Date;
  viewCount: number;
  applicationsCount: number;
  tags: string[];
}
```

### Application Model
```typescript
interface Application {
  id: string;
  jobId: string;
  userId: string;
  jobTitle: string;
  company: string;
  userName: string;
  userEmail: string;
  cvUrl: string;
  coverLetter?: string;
  status: 'envoyée' | 'en cours' | 'retenue' | 'rejetée';
  appliedDate: Date;
  updatedDate: Date;
}
```

## 🎨 Design Patterns utilisés

### 1. **Service Pattern**
Séparation de la logique métier dans des services injectables.

### 2. **Observer Pattern (via Signals)**
Les composants observent les changements d'état automatiquement.

### 3. **Facade Pattern**
Les services fournissent une interface simplifiée pour les opérations complexes.

### 4. **Singleton Pattern**
Services injectés au niveau root sont des singletons.

### 5. **Component Pattern**
Architecture basée sur des composants réutilisables et composables.

## 🔐 Sécurité

### Actuellement implémenté (Frontend uniquement)
- Validation des formulaires
- Stockage sécurisé dans localStorage
- Protection des routes par rôle
- Sanitization des entrées utilisateur (Angular par défaut)

### À implémenter (avec Backend)
- JWT Authentication
- HTTPS obligatoire
- CSRF Protection
- Rate limiting
- Password hashing (bcrypt)
- XSS Protection
- SQL Injection prevention

## 📱 Responsive Design

L'application utilise Tailwind CSS avec une approche mobile-first :
- **Mobile** : < 768px
- **Tablet** : 768px - 1024px
- **Desktop** : > 1024px

Classes Tailwind utilisées :
```html
<!-- Mobile first -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
  <!-- Contenu -->
</div>
```

## ⚡ Performance

### Optimisations implémentées
1. **Lazy Loading** : Routes chargées à la demande (prêt pour)
2. **Computed Signals** : Calculs mémorisés automatiquement
3. **OnPush Change Detection** : Possible avec Signals
4. **Tree Shaking** : Build optimisé pour la production

### Métriques de build
- Bundle size : ~428 KB (raw)
- Gzipped : ~100 KB
- Build time : ~10 secondes

## 🧪 Tests (À implémenter)

### Structure de tests recommandée
```
src/
├── app/
│   ├── services/
│   │   ├── auth.service.ts
│   │   └── auth.service.spec.ts
│   ├── components/
│   │   ├── chat/
│   │   │   ├── chat.component.ts
│   │   │   └── chat.component.spec.ts
```

### Types de tests
1. **Unit Tests** (Vitest)
2. **Integration Tests**
3. **E2E Tests** (Playwright/Cypress)

## 🔄 État de l'application

### LocalStorage
```javascript
{
  "currentUser": {
    // User object
  }
}
```

### Signals (En mémoire)
- `currentUser` - Utilisateur connecté
- `jobs` - Liste des offres
- `applications` - Liste des candidatures
- `chatRooms` - Salles de chat

## 🌐 Internationalisation (Future)

Structure recommandée :
```
src/
├── assets/
│   ├── i18n/
│   │   ├── fr.json
│   │   ├── en.json
│   │   └── ar.json
```

## 📦 Dépendances principales

```json
{
  "@angular/core": "^21.1.0",
  "@angular/router": "^21.1.0",
  "@angular/forms": "^21.1.0",
  "tailwindcss": "^4.1.12",
  "chart.js": "^4.5.1"
}
```

## 🚀 Déploiement

### Options de déploiement
1. **Vercel** (recommandé pour Angular)
2. **Netlify**
3. **Firebase Hosting**
4. **AWS S3 + CloudFront**
5. **Azure Static Web Apps**

### Configuration de production
```bash
ng build --configuration=production
```

---

**Cette architecture est conçue pour être scalable, maintenable et performante.**
