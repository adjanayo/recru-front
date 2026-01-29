# 🗺️ Documentation Complète des Routes

## 📋 Vue d'ensemble

L'application utilise Angular Router avec des guards pour protéger les routes sensibles.

## 🔒 Système de Protection

### Guards disponibles

#### `authGuard`
**Fichier**: `src/app/guards/auth.guard.ts`
- Vérifie que l'utilisateur est authentifié
- Redirige vers `/login` si non authentifié
- Conserve l'URL de destination dans `returnUrl`

#### `adminGuard`
**Fichier**: `src/app/guards/admin.guard.ts`
- Vérifie que l'utilisateur est authentifié ET a le rôle admin
- Redirige vers `/` si non autorisé

## 📍 Routes Publiques

### Page d'accueil
```
Route: /
Composant: HomeComponent
Fichier: src/app/pages/home/home.ts
Layout: MainLayoutComponent
Protection: Aucune
Description: Page d'accueil avec présentation de la plateforme
```

**Liens sortants**:
- `/jobs` - Découvrir les offres
- `/signup` - Créer un compte

---

### Connexion
```
Route: /login
Composant: LoginComponent
Fichier: src/app/pages/auth/login/login.component.ts
Layout: Aucun (page standalone)
Protection: Aucune
Description: Formulaire de connexion
```

**Fonctionnalités**:
- Connexion avec email/password
- Redirection vers returnUrl ou dashboard après login
- Lien vers inscription

**Comptes de test**:
- Candidat: `candidate@test.com`
- Admin: `admin@test.com`

---

### Inscription
```
Route: /signup
Composant: SignupComponent
Fichier: src/app/pages/auth/signup/signup.component.ts
Layout: Aucun (page standalone)
Protection: Aucune
Description: Formulaire d'inscription
```

**Fonctionnalités**:
- Inscription avec nom, prénom, email, téléphone, mot de passe
- Validation des champs
- Acceptation des CGU
- Redirection vers `/jobs` après inscription

---

### Liste des offres d'emploi
```
Route: /jobs
Composant: JobListComponent
Fichier: src/app/pages/jobs/job-list/job-list.component.ts
Layout: MainLayoutComponent
Protection: Aucune
Description: Liste de toutes les offres avec recherche et filtres
```

**Fonctionnalités**:
- Recherche par mot-clé
- Filtres: domaine, localisation, type
- Affichage en cards
- Clic sur une offre → `/jobs/:id`

**Filtres disponibles**:
- Domaines: Informatique, Design, Marketing, Management, Data Science, Finance, RH
- Types: CDI, CDD, Stage, Freelance, Alternance

---

### Détail d'une offre
```
Route: /jobs/:id
Composant: JobDetailComponent
Fichier: src/app/pages/jobs/job-detail/job-detail.component.ts
Layout: MainLayoutComponent
Protection: Aucune
Description: Détail complet d'une offre d'emploi
```

**Fonctionnalités**:
- Affichage détaillé (description, exigences, responsabilités, avantages)
- Bouton "Postuler" (redirige vers login si non connecté)
- Chat intégré (redirige vers login si non connecté)
- Compteur de vues et candidatures

**Liens sortants**:
- Retour vers `/jobs`
- `/login` si tentative de postuler sans connexion

---

## 🔐 Routes Candidat (Protection: authGuard)

### Profil candidat
```
Route: /profile
Composant: ProfileComponent
Fichier: src/app/pages/profile/profile.component.ts
Layout: MainLayoutComponent
Protection: authGuard
Description: Gestion du profil personnel
```

**Fonctionnalités**:
- Modification des informations (nom, prénom, téléphone, adresse)
- Niveau d'études et expérience
- Upload de CV (simulation)
- Upload de photo de profil (simulation)
- Statistiques des candidatures

**Redirection si non connecté**: `/login?returnUrl=/profile`

---

### Mes candidatures
```
Route: /my-applications
Composant: MyApplicationsComponent
Fichier: src/app/pages/my-applications/my-applications.component.ts
Layout: MainLayoutComponent
Protection: authGuard
Description: Liste et suivi des candidatures du candidat
```

**Fonctionnalités**:
- Statistiques (total, envoyées, en cours, acceptées)
- Filtrage par statut
- Affichage des détails de chaque candidature
- Lien vers l'offre d'emploi
- Téléchargement du CV

**Statuts possibles**:
- 🔵 Envoyée
- 🟡 En cours
- 🟢 Retenue
- 🔴 Rejetée

**Redirection si non connecté**: `/login?returnUrl=/my-applications`

---

## 👨‍💼 Routes Admin (Protection: adminGuard)

### Dashboard Admin
```
Route: /admin/dashboard
Composant: AdminDashboardComponent
Fichier: src/app/pages/admin/admin-dashboard/admin-dashboard.component.ts
Layout: MainLayoutComponent
Protection: adminGuard
Description: Tableau de bord administrateur
```

**Fonctionnalités**:
- Statistiques globales (utilisateurs, offres, candidatures)
- Taux de croissance
- Candidatures récentes (5 dernières)
- Offres récentes (5 dernières)
- Actions rapides (créer offre, gérer users, voir candidatures)

**Liens sortants**:
- `/admin/jobs/create` (à implémenter)
- `/admin/users`
- `/admin/applications`
- `/admin/jobs`

**Redirection si non admin**: `/`

---

### Gestion des offres (Admin)
```
Route: /admin/jobs
Composant: AdminJobsComponent
Fichier: src/app/pages/admin/admin-jobs/admin-jobs.component.ts
Layout: MainLayoutComponent
Protection: adminGuard
Description: CRUD complet des offres d'emploi
```

**Fonctionnalités**:
- Liste de toutes les offres
- Recherche par titre/entreprise/domaine
- Publier/Dépublier une offre
- Modifier une offre
- Supprimer une offre (avec confirmation)
- Statistiques par offre (vues, candidatures)

**Actions disponibles**:
- Créer → `/admin/jobs/create` (à implémenter)
- Modifier → `/admin/jobs/edit/:id` (à implémenter)
- Supprimer → Modal de confirmation

**Redirection si non admin**: `/`

---

### Gestion des candidatures (Admin)
```
Route: /admin/applications
Composant: AdminApplicationsComponent
Fichier: src/app/pages/admin/admin-applications/admin-applications.component.ts
Layout: MainLayoutComponent
Protection: adminGuard
Description: Gestion de toutes les candidatures
```

**Fonctionnalités**:
- Liste de toutes les candidatures
- Statistiques (total, envoyées, en cours, acceptées)
- Recherche par candidat/poste/entreprise
- Filtrage par statut
- Changement de statut (dropdown)
- Téléchargement des CV
- Affichage des lettres de motivation

**Statuts modifiables**:
- Envoyée → En cours
- En cours → Retenue / Rejetée

**Redirection si non admin**: `/`

---

### Gestion des utilisateurs (Admin)
```
Route: /admin/users
Composant: AdminUsersComponent
Fichier: src/app/pages/admin/admin-users/admin-users.component.ts
Layout: MainLayoutComponent
Protection: adminGuard
Description: Gestion de tous les utilisateurs
```

**Fonctionnalités**:
- Liste de tous les utilisateurs (candidats + admins)
- Statistiques (total, candidats, admins, actifs)
- Recherche par nom/email
- Filtrage par rôle (candidat/admin)
- Activation/Désactivation de comptes
- Consultation des profils
- Téléchargement des CV

**Affichage en tableau**:
- Utilisateur (nom, niveau d'études)
- Contact (email, téléphone)
- Rôle (badge)
- Statut (actif/inactif)
- Date d'inscription
- Actions

**Redirection si non admin**: `/`

---

## 🔄 Route Fallback

### Redirection par défaut
```
Route: **
Redirection: /
Description: Toute route non définie redirige vers la page d'accueil
```

---

## 🧭 Navigation dans l'application

### Header (Navigation principale)

#### Non connecté
- Logo "LinkIn" → `/`
- Accueil → `/`
- Offres d'emploi → `/jobs`
- Connexion → `/login`
- Inscription → `/signup`

#### Candidat connecté
- Logo "LinkIn" → `/`
- Accueil → `/`
- Offres d'emploi → `/jobs`
- Mes candidatures → `/my-applications`
- Menu profil:
  - Mon Profil → `/profile`
  - Mes candidatures → `/my-applications`
  - Déconnexion → `/login`

#### Admin connecté
- Logo "LinkIn" → `/`
- Accueil → `/`
- Offres d'emploi → `/jobs`
- Dashboard Admin → `/admin/dashboard`
- Menu profil:
  - Dashboard Admin → `/admin/dashboard`
  - Déconnexion → `/login`

### Footer

#### Plateforme
- À propos → `/about` (à créer)
- Projets → `/projects` (à créer)
- Tarification → `/pricing` (à créer)
- Blog → `/blog` (à créer)

#### Support
- Aide → `/help` (à créer)
- FAQ → `/faq` (à créer)
- Contact → `/contact` (à créer)
- Confidentialité → `/privacy` (à créer)
- Conditions → `/terms` (à créer)

---

## 📊 Matrice d'accès aux routes

| Route | Non connecté | Candidat | Admin |
|-------|-------------|----------|-------|
| `/` | ✅ Accessible | ✅ Accessible | ✅ Accessible |
| `/login` | ✅ Accessible | ✅ Accessible | ✅ Accessible |
| `/signup` | ✅ Accessible | ✅ Accessible | ✅ Accessible |
| `/jobs` | ✅ Accessible | ✅ Accessible | ✅ Accessible |
| `/jobs/:id` | ✅ Accessible | ✅ Accessible | ✅ Accessible |
| `/profile` | ❌ → `/login` | ✅ Accessible | ✅ Accessible |
| `/my-applications` | ❌ → `/login` | ✅ Accessible | ✅ Accessible |
| `/admin/dashboard` | ❌ → `/` | ❌ → `/` | ✅ Accessible |
| `/admin/jobs` | ❌ → `/` | ❌ → `/` | ✅ Accessible |
| `/admin/applications` | ❌ → `/` | ❌ → `/` | ✅ Accessible |
| `/admin/users` | ❌ → `/` | ❌ → `/` | ✅ Accessible |

---

## 🚧 Routes à implémenter

### Admin - Gestion des offres
- `/admin/jobs/create` - Formulaire de création d'offre
- `/admin/jobs/edit/:id` - Formulaire de modification d'offre

### Pages institutionnelles
- `/about` - À propos de la plateforme
- `/projects` - Projets
- `/pricing` - Tarification
- `/blog` - Liste des articles
- `/blog/:slug` - Article de blog
- `/help` - Aide
- `/faq` - Questions fréquentes
- `/contact` - Formulaire de contact
- `/privacy` - Politique de confidentialité
- `/terms` - Conditions d'utilisation

### Pages supplémentaires (optionnel)
- `/404` - Page 404 personnalisée
- `/forgot-password` - Récupération mot de passe
- `/reset-password/:token` - Réinitialisation mot de passe

---

## 🔧 Configuration technique

### Fichier de routes
**Emplacement**: `src/app/app.routes.ts`

### Structure
```typescript
export const routes: Routes = [
  // Auth routes (sans layout)
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  
  // Routes publiques (avec layout)
  { path: '', component: MainLayoutComponent, children: [...] },
  
  // Routes candidat (avec authGuard)
  { path: 'profile', canActivate: [authGuard], ... },
  
  // Routes admin (avec adminGuard)
  { path: 'admin', canActivate: [adminGuard], children: [...] },
  
  // Fallback
  { path: '**', redirectTo: '' }
];
```

### Layouts
- **MainLayoutComponent**: Header + Content + Footer
- **Sans layout**: Pages auth (login, signup)

---

## 🎯 Bonnes pratiques implémentées

✅ **Séparation des routes par rôle**
- Routes publiques
- Routes candidat avec authGuard
- Routes admin avec adminGuard

✅ **Protection des routes sensibles**
- Guards typés avec `CanActivateFn`
- Redirection automatique si non autorisé

✅ **Conservation de l'URL de destination**
- `returnUrl` dans les query params
- Redirection automatique après login

✅ **Routes organisées logiquement**
- Groupement par fonctionnalité
- Hiérarchie claire (admin/*)

✅ **Fallback configuré**
- Toutes les routes inexistantes redirigent vers `/`

---

## 📝 Notes de développement

### Pour ajouter une nouvelle route

1. Créer le composant
2. Ajouter la route dans `app.routes.ts`
3. Ajouter le guard si nécessaire
4. Mettre à jour la navigation (header/footer)
5. Tester l'accès selon les rôles

### Pour ajouter un nouveau guard

1. Créer le fichier dans `src/app/guards/`
2. Implémenter `CanActivateFn`
3. Injecter les services nécessaires
4. Appliquer aux routes

---

**Dernière mise à jour**: 2026-01-22  
**Status**: ✅ Routes configurées et protégées  
**Build status**: ✅ Compilation réussie sans erreurs
