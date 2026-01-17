# Walkthrough : Intégration du Template

## Vue d'ensemble

J'ai intégré avec succès le template dans le projet Angular en utilisant **Tailwind CSS v4** (syntaxe native, sans SCSS). Le projet compile correctement et le serveur de développement fonctionne.

## Changements Effectués

### 1. Installation des Dépendances

**Plugins Tailwind CSS installés** :

- `@tailwindcss/typography` - Styling pour le contenu riche
- `@tailwindcss/forms` - Styling amélioré pour les formulaires
- `tailwind-scrollbar` - Scrollbars personnalisées
- `tailwind-bootstrap-grid` - Système de grille Bootstrap

```bash
npm install --save-dev @tailwindcss/typography @tailwindcss/forms tailwind-scrollbar tailwind-bootstrap-grid
```

**Résultat** : 13 packages ajoutés avec succès

---

### 2. Configuration Tailwind CSS v4

#### tailwind.config.ts

> [!NOTE]
> Fichier créé mais **non utilisé** avec Tailwind v4. La configuration v4 se fait directement dans le CSS avec `@theme`.

Ce fichier a été créé pour la compatibilité future si vous souhaitez revenir à Tailwind v3. Avec Tailwind v4, la configuration se fait via `@theme` dans `styles.css`.

---

### 3. Styles Globaux - Tailwind CSS v4

#### styles.css

**Adaptations majeures pour Tailwind v4** :

##### Configuration du thème avec `@theme`

Au lieu d'utiliser `tailwind.config.ts`, j'ai utilisé la nouvelle directive `@theme` de Tailwind v4 :

```css
@theme {
  --color-primary: #2ba283;
  --color-darkmode-primary: #059669;
  --font-family-primary: Raleway, sans-serif;
  --font-size-h1: 2.074rem;
  /* ... */
}
```

**Palette de couleurs** :

- **Primary** : `#2ba283` (mode clair), `#059669` (mode sombre)
- **Body** : `#fff` (mode clair), `#111` (mode sombre)
- **Border** : `#e1e1e1` (mode clair), `#636363` (mode sombre)
- **Text** : `#555` (mode clair), `#a4a4a4` (mode sombre)

**Typographie** :

- Police primaire : **Raleway** (corps de texte)
- Police secondaire : **Merriweather Sans** (titres)
- Échelle : Ratio 1.200
  - H1 : 2.074rem (desktop) / 1.659rem (mobile)
  - H2 : 1.728rem (desktop) / 1.382rem (mobile)
  - H3 : 1.44rem (desktop) / 1.152rem (mobile)
  - H4-H6 : 1.2rem, 1rem, 1rem

##### Styles de base

**Au lieu de** :

```css
body {
  @apply bg-body font-primary text-text;
}
```

**Utilisation de CSS natif** :

```css
body {
  background-color: var(--color-body);
  font-family: var(--font-family-primary);
  color: var(--color-text);
}
```

> [!IMPORTANT]
> Cette approche élimine les warnings `@apply` et est la pratique recommandée pour Tailwind CSS v4.

##### Composants personnalisés

Classes utilitaires créées :

- `.btn` / `.btn-primary` / `.btn-outline-primary` - Boutons
- `.section` / `.section-title` - Sections
- `.nav-link` - Liens de navigation
- `.card` - Cartes de contenu

Tous avec support **mode sombre** via `.dark`.

---

### 4. Polices Google Fonts

#### index.html

Ajout des polices du template :

```html
<!-- Google Fonts - Template Geeky -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&family=Merriweather+Sans:wght@400;700&display=swap"
  rel="stylesheet"
/>
```

**Polices chargées** :

- Raleway : Regular (400) et Bold (700)
- Merriweather Sans : Regular (400) et Bold (700)

---

### 5. Migration des Assets

#### Images

**18 fichiers** copiés depuis `geeky-nextjs-1.0.0/public/images/` vers `Front/public/images/` :

```
recru-front/Front/public/images/
├── banner-bg-shape.svg
├── post/
│   ├── post-1.png
│   ├── post-2.png
│   ├── ... (post-3 à post-8)
└── ... (autres images)
```

#### Configuration JSON

**4 fichiers** copiés depuis `geeky-nextjs-1.0.0/config/` vers `Front/src/assets/config/` :

- `config.json` - Configuration générale
- `menu.json` - Structure de navigation
- `social.json` - Liens réseaux sociaux
- `theme.json` - Paramètres du thème

Ces fichiers peuvent être utilisés dans vos composants Angular pour la configuration dynamique.

---

## Résultats de Vérification

### ✅ Build Angular

**Commande** : `npx ng build`  
**Résultat** : ✅ **Succès** (Exit code: 0)

```
Browser bundles generated successfully
Application bundle generated
```

Le projet compile sans erreurs.

### ✅ Serveur de Développement

**Commande** : `npm start`  
**Résultat** : ✅ **Serveur démarré**

Le serveur de développement Angular fonctionne et est accessible localement.

---

## Mode Sombre

Le template inclut un support complet du **mode sombre** via la classe `.dark` :

**Exemple d'utilisation** :

```html
<html class="dark">
  <!-- Toute l'application utilisera les couleurs du mode sombre -->
</html>
```

Pour implémenter un sélecteur de thème, vous pouvez créer un composant Angular qui bascule la classe `dark` sur `<html>` :

```typescript
// Dans un service ou composant
toggleDarkMode() {
  document.documentElement.classList.toggle('dark');
}
```

---

## Prochaines Étapes Recommandées

### 1. Créer des Composants Angular

Pour tirer pleinement parti du template, créez ces composants :

**Layout Components** :

- `HeaderComponent` - En-tête avec navigation
- `FooterComponent` - Pied de page
- `SidebarComponent` - Barre latérale

**UI Components** :

- `ButtonComponent` - Utilise les classes `.btn-primary`, `.btn-outline-primary`
- `CardComponent` - Utilise la classe `.card`
- `SectionComponent` - Utilise `.section` et `.section-title`

**Exemple de composant bouton** :

```typescript
@Component({
  selector: "app-button",
  template: `
    <button [class]="'btn ' + variant">
      <ng-content></ng-content>
    </button>
  `,
})
export class ButtonComponent {
  @Input() variant: "btn-primary" | "btn-outline-primary" = "btn-primary";
}
```

### 2. Implémenter le Dark Mode

Créez un service Angular pour gérer le thème :

```typescript
@Injectable({ providedIn: "root" })
export class ThemeService {
  private darkMode = signal(false);

  toggleDarkMode() {
    this.darkMode.update((v) => !v);
    document.documentElement.classList.toggle("dark");
  }
}
```

### 3. Utiliser les Fichiers de Configuration

Chargez les fichiers JSON copiés dans `src/assets/config/` :

```typescript
@Injectable({ providedIn: "root" })
export class ConfigService {
  constructor(private http: HttpClient) {}

  getMenu() {
    return this.http.get("/assets/config/menu.json");
  }
}
```

### 4. Ajouter des Icônes

Le template Next.js utilise `react-icons`. Pour Angular, installez une alternative :

```bash
npm install @ng-icons/core @ng-icons/heroicons
```

---

## Fichiers Modifiés

| Fichier              | Type    | Description                                 |
| -------------------- | ------- | ------------------------------------------- |
| `package.json`       | Modifié | Ajout de 4 plugins Tailwind CSS             |
| `tailwind.config.ts` | Créé    | Configuration Tailwind (non utilisée en v4) |
| `src/styles.css`     | Modifié | Thème complet avec @theme et styles de base |
| `src/index.html`     | Modifié | Google Fonts Raleway et Merriweather Sans   |
| `public/images/`     | Créé    | 18 images copiées                           |
| `src/assets/config/` | Créé    | 4 fichiers JSON de configuration            |

---

## Notes Techniques

### Tailwind CSS v4 vs v3

Votre projet utilise **Tailwind CSS v4.1.12** qui introduit des changements majeurs :

1. **Pas de `tailwind.config.js` obligatoire** - Configuration via `@theme` dans le CSS
2. **CSS natif favorisé** - Moins de dépendance à `@apply`
3. **PostCSS plugin** - Utilise `@tailwindcss/postcss` au lieu du CLI classique

### Warnings Lint

Le warning `Unknown at rule @theme` est normal - votre éditeur ne reconnaît pas encore cette nouvelle directive Tailwind v4. Cela n'affecte pas le build.

---

## Résumé

✅ **Installation** : 4 plugins Tailwind CSS  
✅ **Configuration** : Thème personnalisé avec couleurs, polices, typographie  
✅ **Styles** : Conversion complète SCSS → CSS v4 natif  
✅ **Assets** : 18 images + 4 fichiers de configuration migrés  
✅ **Polices** : Google Fonts Raleway et Merriweather Sans  
✅ **Build** : Compilation réussie  
✅ **Serveur** : Démarrage réussi

Votre projet Angular est maintenant configuré avec le thème visuel du template Geeky Next.js !
