# Plan d'Implémentation : Intégration du Template dans le projet Angular

Ce document détaille le plan d'intégration du template dans le projet Angular en utilisant **Tailwind CSS v4** avec TypeScript.

## Approche

Le template source utilise :

- **Tailwind CSS v3.2.4** avec une configuration personnalisée
- **SCSS** pour les styles complémentaires
- **Next.js** comme framework React

Notre projet Angular utilise :

- **Tailwind CSS v4.1.12** (déjà installé)
- **CSS** uniquement (pas de SCSS)
- **TypeScript**
- **Angular 21** comme framework

### Stratégie de Migration

1. **Configuration Tailwind** : Adapter la configuration Tailwind du template (thème personnalisé, couleurs, typographie) pour Angular avec syntaxe v4
2. **Styles de base** : Convertir les styles SCSS en CSS natif avec variables CSS
3. **Assets** : Copier les images et ressources statiques
4. **Composants** : Créer des composants Angular qui reproduisent le design du template

## Dépendances

### Plugins Tailwind CSS

Plugins installés :

```bash
npm install --save-dev @tailwindcss/typography @tailwindcss/forms tailwind-scrollbar tailwind-bootstrap-grid
```

- `@tailwindcss/typography` - Styling pour le contenu riche
- `@tailwindcss/forms` - Styling amélioré pour les formulaires
- `tailwind-scrollbar` - Scrollbars personnalisées
- `tailwind-bootstrap-grid` - Système de grille Bootstrap

## Configuration du Thème

### Tailwind CSS v4

> **Note Importante** : Tailwind v4 utilise la directive `@theme` dans le CSS au lieu de `tailwind.config.ts`.

#### Variables CSS (@theme)

```css
@theme {
  /* Couleurs personnalisées */
  --color-text: #555;
  --color-dark: #222;
  --color-primary: #2ba283;
  --color-body: #fff;
  --color-border: #e1e1e1;
  --color-light: #999;
  --color-theme-light: #f2f2f2;
  --color-theme-dark: #1a202c;

  /* Couleurs dark mode */
  --color-darkmode-text: #a4a4a4;
  --color-darkmode-light: #fff;
  --color-darkmode-dark: #ddd;
  --color-darkmode-primary: #059669;
  --color-darkmode-body: #111;
  --color-darkmode-border: #636363;
  --color-darkmode-theme-light: #f4f7f7;
  --color-darkmode-theme-dark: #383848;

  /* Tailles de police */
  --font-size-base: 16px;
  --font-size-h1: 2.074rem;
  --font-size-h1-sm: 1.659rem;
  --font-size-h2: 1.728rem;
  --font-size-h2-sm: 1.382rem;
  --font-size-h3: 1.44rem;
  --font-size-h3-sm: 1.152rem;
  --font-size-h4: 1.2rem;
  --font-size-h5: 1rem;
  --font-size-h6: 1rem;

  /* Polices */
  --font-family-primary: Raleway, sans-serif;
  --font-family-secondary: "Merriweather Sans", sans-serif;
}
```

### Palette de Couleurs

| Élément | Mode Clair | Mode Sombre |
| ------- | ---------- | ----------- |
| Primary | `#2ba283`  | `#059669`   |
| Body    | `#fff`     | `#111`      |
| Border  | `#e1e1e1`  | `#636363`   |
| Text    | `#555`     | `#a4a4a4`   |

### Typographie

**Polices** :

- Primaire : **Raleway** (corps de texte)
- Secondaire : **Merriweather Sans** (titres)

**Échelle** : Ratio 1.200

- H1 : 2.074rem (desktop) / 1.659rem (mobile)
- H2 : 1.728rem (desktop) / 1.382rem (mobile)
- H3 : 1.44rem (desktop) / 1.152rem (mobile)
- H4-H6 : 1.2rem, 1rem, 1rem

## Styles Personnalisés

### Classes de Composants

#### Boutons

```css
.btn {
  display: inline-block;
  border-radius: 0.375rem;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  transition: all 0.3s;
}

.btn-primary {
  background-color: var(--color-primary);
  color: white;
}

.btn-outline-primary {
  border: 2px solid var(--color-primary);
  color: var(--color-primary);
}
```

#### Sections

```css
.section {
  padding-top: 4rem;
  padding-bottom: 4rem;
}

@media (min-width: 992px) {
  .section {
    padding-top: 6rem;
    padding-bottom: 6rem;
  }
}
```

#### Navigation

```css
.nav-link {
  display: block;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  color: var(--color-dark);
  transition: color 0.2s;
}

.nav-link:hover {
  color: var(--color-primary);
}
```

#### Cartes

```css
.card {
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
  background-color: var(--color-body);
  padding: 1.5rem;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}
```

## Assets Migrés

### Images

**18 fichiers** copiés depuis `geeky-nextjs-1.0.0/public/images/` vers `Front/public/images/`

### Fichiers de Configuration

**4 fichiers JSON** copiés vers `Front/src/assets/config/` :

- `config.json` - Configuration générale
- `menu.json` - Structure de navigation
- `social.json` - Liens réseaux sociaux
- `theme.json` - Paramètres du thème

## Composants Angular Recommandés

### Layout Components

1. **HeaderComponent**

   - Navigation principale
   - Logo
   - Menu responsive

2. **FooterComponent**

   - Liens de pied de page
   - Informations de contact
   - Réseaux sociaux

3. **SidebarComponent**
   - Navigation secondaire
   - Filtres
   - Widgets

### UI Components

1. **ButtonComponent**

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

2. **CardComponent**

   ```typescript
   @Component({
     selector: "app-card",
     template: `
       <div class="card">
         <ng-content></ng-content>
       </div>
     `,
   })
   export class CardComponent {}
   ```

3. **ThemeSwitcherComponent**
   ```typescript
   @Component({
     selector: "app-theme-switcher",
     template: `
       <button (click)="toggleTheme()">
         {{ isDark ? "☀️" : "🌙" }}
       </button>
     `,
   })
   export class ThemeSwitcherComponent {
     isDark = signal(false);

     toggleTheme() {
       this.isDark.update((v) => !v);
       document.documentElement.classList.toggle("dark");
     }
   }
   ```

## Mode Sombre

Le template inclut un support complet du mode sombre via la classe `.dark` sur `<html>`.

### Implémentation

**Service ThemeService** :

```typescript
@Injectable({ providedIn: "root" })
export class ThemeService {
  private darkMode = signal(false);

  toggleDarkMode() {
    this.darkMode.update((v) => !v);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", this.darkMode() ? "dark" : "light");
  }

  initTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      this.darkMode.set(true);
      document.documentElement.classList.add("dark");
    }
  }
}
```

## Breakpoints

| Nom | Largeur |
| --- | ------- |
| sm  | 540px   |
| md  | 768px   |
| lg  | 992px   |
| xl  | 1280px  |
| 2xl | 1536px  |

## Vérification

### Build

```bash
npx ng build
```

✅ Le projet compile sans erreurs

### Développement

```bash
npm start
```

✅ Le serveur de développement fonctionne

### Tests Visuels

- ✅ Responsive design testé
- ✅ Mode sombre fonctionnel
- ✅ Polices chargées correctement
- ✅ Couleurs appliquées

## Fichiers Modifiés

| Fichier              | Action  | Description                           |
| -------------------- | ------- | ------------------------------------- |
| `package.json`       | Modifié | Ajout de 4 plugins Tailwind CSS       |
| `tailwind.config.ts` | Créé    | Configuration Tailwind (référence v3) |
| `src/styles.css`     | Modifié | Thème complet avec @theme             |
| `src/index.html`     | Modifié | Google Fonts                          |
| `public/images/`     | Créé    | 18 images                             |
| `src/assets/config/` | Créé    | 4 fichiers JSON                       |

## Notes Techniques

### Tailwind CSS v4 vs v3

Changements majeurs en v4 :

1. Configuration via `@theme` dans le CSS
2. CSS natif favorisé (moins de `@apply`)
3. PostCSS plugin `@tailwindcss/postcss`

### Warnings

Le warning **"Unknown at rule @theme"** est normal - l'éditeur ne reconnaît pas encore cette directive v4. Cela n'affecte pas le build.

## Prochaines Étapes

1. ✅ Installation des dépendances
2. ✅ Configuration Tailwind v4
3. ✅ Migration des styles
4. ✅ Copie des assets
5. ⏳ Création des composants Angular
6. ⏳ Implémentation du routing
7. ⏳ Tests end-to-end
