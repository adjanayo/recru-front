# Guide de Démarrage - Template

Ce guide vous explique comment commencer à développer avec le template intégré dans le projet Angular.

## 📋 Prérequis

- Node.js 20+ installé
- npm 11+ installé
- Projet Angular 21 configuré
- Les dépendances Tailwind CSS v4 installées

## 🚀 Démarrage Rapide

### 1. Installation des dépendances

Si ce n'est pas déjà fait, installez les dépendances du projet :

```bash
cd recru-front/Front
npm install
```

### 2. Démarrer le serveur de développement

```bash
npm start
```

Le serveur démarre sur `http://localhost:4200` (ou un port alternatif si 4200 est occupé).

### 3. Construire pour la production

```bash
npm run build
```

Les fichiers de build seront générés dans `dist/Front/`.

## 🎨 Utilisation des Classes CSS

Le template fournit plusieurs classes CSS utilitaires prêtes à l'emploi.

### Boutons

```html
<!-- Bouton primaire -->
<button class="btn btn-primary">Cliquez-moi</button>

<!-- Bouton avec contour -->
<button class="btn btn-outline-primary">Inscription</button>
```

### Sections

```html
<section class="section">
  <h2 class="section-title">Titre de la Section</h2>
  <p>Contenu de la section...</p>
</section>
```

### Cartes

```html
<div class="card">
  <h3>Titre de la carte</h3>
  <p>Description de la carte...</p>
</div>
```

### Navigation

```html
<nav>
  <a href="#" class="nav-link">Accueil</a>
  <a href="#" class="nav-link">À propos</a>
  <a href="#" class="nav-link">Contact</a>
</nav>
```

## 🌓 Mode Sombre

### Activer le mode sombre

Pour activer le mode sombre, ajoutez la classe `dark` sur l'élément `<html>` :

```typescript
// Dans un composant ou service
toggleDarkMode() {
  document.documentElement.classList.toggle('dark');
}
```

### Service ThemeService recommandé

Créez un service pour gérer le thème :

```typescript
import { Injectable, signal } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ThemeService {
  private darkMode = signal(false);
  isDark = this.darkMode.asReadonly();

  toggleDarkMode() {
    this.darkMode.update((v) => !v);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", this.darkMode() ? "dark" : "light");
  }

  initTheme() {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      this.darkMode.set(true);
      document.documentElement.classList.add("dark");
    }
  }
}
```

### Initialisation au démarrage

Dans `app.component.ts` :

```typescript
export class AppComponent {
  constructor(private theme: ThemeService) {
    this.theme.initTheme();
  }
}
```

## 🎨 Personnalisation des Couleurs

### Modifier les couleurs du thème

Éditez le fichier `src/styles.css` et modifiez les variables dans `@theme` :

```css
@theme {
  /* Changer la couleur primaire */
  --color-primary: #votre-couleur;
  --color-darkmode-primary: #votre-couleur-dark;
}
```

### Couleurs disponibles

| Variable          | Mode Clair | Mode Sombre |
| ----------------- | ---------- | ----------- |
| `--color-primary` | #2ba283    | #059669     |
| `--color-body`    | #fff       | #111        |
| `--color-text`    | #555       | #a4a4a4     |
| `--color-border`  | #e1e1e1    | #636363     |

## 📝 Typographie

### Polices

Deux polices Google Fonts sont chargées :

- **Raleway** : Police principale (corps de texte)
- **Merriweather Sans** : Police secondaire (titres)

### Titres

```html
<h1>Titre H1</h1>
<h2>Titre H2</h2>
<h3>Titre H3</h3>
<!-- ou -->
<p class="h1">Texte stylisé comme H1</p>
```

### Tailles de police

- H1 : 2.074rem (desktop) / 1.659rem (mobile)
- H2 : 1.728rem (desktop) / 1.382rem (mobile)
- H3 : 1.44rem (desktop) / 1.152rem (mobile)
- H4 : 1.2rem
- H5-H6 : 1rem
- Base : 16px

## 🖼️ Images

Les images du template sont stockées dans `public/images/`.

### Utilisation dans les composants

```typescript
@Component({
  template: `
    <img src="/images/banner-bg-shape.svg" alt="Bannière">
  `
})
```

## 📦 Composants Recommandés

### Créer un composant Bouton

```bash
ng generate component components/ui/button
```

```typescript
// button.component.ts
@Component({
  selector: "app-button",
  standalone: true,
  template: `
    <button [class]="'btn ' + variant" [type]="type">
      <ng-content></ng-content>
    </button>
  `,
})
export class ButtonComponent {
  @Input() variant: "btn-primary" | "btn-outline-primary" = "btn-primary";
  @Input() type: "button" | "submit" | "reset" = "button";
}
```

### Utilisation

```html
<app-button variant="btn-primary">Envoyer</app-button>
<app-button variant="btn-outline-primary">Annuler</app-button>
```

## 📱 Responsive Design

Le template utilise des breakpoints personnalisés :

```css
/* Mobile first */
.ma-classe {
  /* Styles mobile par défaut */
}

/* Tablette (768px+) */
@media (min-width: 768px) {
  .ma-classe {
    /* Styles tablette */
  }
}

/* Desktop (992px+) */
@media (min-width: 992px) {
  .ma-classe {
    /* Styles desktop */
  }
}
```

Avec Tailwind :

```html
<div class="text-sm md:text-base lg:text-lg">Texte responsive</div>
```

## 🔧 Configuration

### Fichiers de configuration JSON

Les fichiers dans `src/assets/config/` peuvent être utilisés pour la configuration dynamique :

```typescript
@Injectable({ providedIn: "root" })
export class ConfigService {
  constructor(private http: HttpClient) {}

  getConfig() {
    return this.http.get("/assets/config/config.json");
  }

  getMenu() {
    return this.http.get("/assets/config/menu.json");
  }

  getSocial() {
    return this.http.get("/assets/config/social.json");
  }
}
```

## 🐛 Dépannage

### Le build échoue

1. Vérifiez que toutes les dépendances sont installées :

   ```bash
   npm install
   ```

2. Nettoyez le cache :
   ```bash
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

### Les styles ne s'appliquent pas

1. Vérifiez que `src/styles.css` est bien importé dans `angular.json`
2. Redémarrez le serveur de développement

### Le mode sombre ne fonctionne pas

Vérifiez que la classe `dark` est bien ajoutée à `<html>` :

```javascript
console.log(document.documentElement.classList.contains("dark"));
```

## 📚 Ressources

- [Documentation Tailwind CSS v4](https://tailwindcss.com/docs)
- [Documentation Angular](https://angular.dev)
- [Google Fonts](https://fonts.google.com)

## 🆘 Support

Pour toute question ou problème :

1. Consultez la documentation complète dans `documentation/integration-template-geeky.md`
2. Vérifiez le plan d'implémentation dans `documentation/plan-implementation.md`
