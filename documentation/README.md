# Documentation - Intégration Template Geeky

Cette documentation contient tous les guides et références pour travailler avec le template Geeky intégré dans le projet Angular.

## 📁 Structure de la Documentation

### 1. [Guide de Démarrage](./guide-demarrage.md)

Guide rapide pour commencer à utiliser le template dans votre projet Angular.

**Contenu** :

- Installation et configuration
- Utilisation des classes CSS
- Mode sombre
- Personnalisation des couleurs
- Typographie
- Composants recommandés
- Dépannage

### 2. [Plan d'Implémentation](./plan-implementation.md)

Plan détaillé de l'intégration du template avec tous les détails techniques.

**Contenu** :

- Approche de migration
- Configuration Tailwind CSS v4
- Variables CSS et thème
- Classes personnalisées
- Assets migrés
- Composants Angular recommandés
- Notes techniques

### 3. [Walkthrough - Intégration](./integration-template-geeky.md)

Documentation complète de ce qui a été fait lors de l'intégration.

**Contenu** :

- Vue d'ensemble
- Changements effectués
- Résultats de vérification
- Mode sombre
- Prochaines étapes
- Fichiers modifiés
- Notes techniques
- Résumé

## 🎨 Quick Reference

### Classes CSS Principales

| Classe                 | Usage               | Exemple                            |
| ---------------------- | ------------------- | ---------------------------------- |
| `.btn`                 | Bouton de base      | `<button class="btn btn-primary">` |
| `.btn-primary`         | Bouton primaire     | Bouton d'action principal          |
| `.btn-outline-primary` | Bouton avec contour | Bouton secondaire                  |
| `.section`             | Section de contenu  | `<section class="section">`        |
| `.section-title`       | Titre de section    | `<h2 class="section-title">`       |
| `.nav-link`            | Lien de navigation  | `<a class="nav-link">`             |
| `.card`                | Carte de contenu    | `<div class="card">`               |

### Variables CSS Clés

```css
/* Couleurs */
--color-primary: #2ba283;
--color-darkmode-primary: #059669;
--color-body: #fff;
--color-text: #555;

/* Polices */
--font-family-primary: Raleway, sans-serif;
--font-family-secondary: "Merriweather Sans", sans-serif;

/* Tailles */
--font-size-h1: 2.074rem;
--font-size-h2: 1.728rem;
--font-size-h3: 1.44rem;
```

### Mode Sombre

```typescript
// Activer/désactiver
document.documentElement.classList.toggle("dark");

// Vérifier l'état
document.documentElement.classList.contains("dark");
```

## 🚀 Démarrage Rapide

```bash
# Installation
cd recru-front/Front
npm install

# Développement
npm start

# Build production
npm run build
```

## 📦 Dépendances Tailwind

- `@tailwindcss/typography` - Styling pour le contenu riche
- `@tailwindcss/forms` - Styling amélioré pour les formulaires
- `tailwind-scrollbar` - Scrollbars personnalisées
- `tailwind-bootstrap-grid` - Système de grille Bootstrap

## 🎯 Assets Disponibles

### Images

**18 fichiers** dans `public/images/` :

- `banner-bg-shape.svg` - Forme de bannière
- `post/post-*.png` - Images d'articles (1-8)
- Autres images du template

### Configuration JSON

**4 fichiers** dans `src/assets/config/` :

- `config.json` - Configuration générale
- `menu.json` - Structure de navigation
- `social.json` - Liens réseaux sociaux
- `theme.json` - Paramètres du thème

## 🔧 Fichiers Modifiés/Créés

| Fichier              | Type    | Description                        |
| -------------------- | ------- | ---------------------------------- |
| `package.json`       | Modifié | Ajout de 4 plugins Tailwind        |
| `tailwind.config.ts` | Créé    | Configuration Tailwind (référence) |
| `src/styles.css`     | Modifié | Thème complet avec @theme          |
| `src/index.html`     | Modifié | Google Fonts                       |
| `public/images/`     | Créé    | 18 images                          |
| `src/assets/config/` | Créé    | 4 fichiers JSON                    |

## 📱 Breakpoints

| Nom   | Largeur | Usage         |
| ----- | ------- | ------------- |
| `sm`  | 540px   | Mobile large  |
| `md`  | 768px   | Tablette      |
| `lg`  | 992px   | Desktop petit |
| `xl`  | 1280px  | Desktop       |
| `2xl` | 1536px  | Large desktop |

## 🎨 Palette de Couleurs

### Mode Clair

- **Primary**: `#2ba283` 🟢
- **Body**: `#fff` ⚪
- **Text**: `#555` ⚫
- **Border**: `#e1e1e1` ⬜

### Mode Sombre

- **Primary**: `#059669` 🟢
- **Body**: `#111` ⚫
- **Text**: `#a4a4a4` ⚪
- **Border**: `#636363` ⬛

## 📚 Polices

- **Raleway** (400, 700) - Corps de texte
- **Merriweather Sans** (400, 700) - Titres

## ⚡ Tailwind CSS v4

Le projet utilise **Tailwind CSS v4** avec :

- Configuration via `@theme` dans le CSS
- CSS natif (pas de `@apply`)
- Plugin PostCSS `@tailwindcss/postcss`

## 🔗 Liens Utiles

- [Documentation Tailwind CSS](https://tailwindcss.com/docs)
- [Documentation Angular](https://angular.dev)
- [Template Geeky Original](https://themewagon.github.io/geeky-nextjs)

## 📝 Notes

- Le warning `Unknown at rule @theme` dans l'éditeur est normal avec Tailwind v4
- Le fichier `tailwind.config.ts` existe pour référence mais n'est pas utilisé en v4
- Tous les styles utilisent des variables CSS natives pour compatibilité maximale

## 🆘 Support

Pour toute question :

1. Consultez le [Guide de Démarrage](./guide-demarrage.md)
2. Vérifiez le [Walkthrough](./integration-template-geeky.md)
3. Référez-vous au [Plan d'Implémentation](./plan-implementation.md)

---

**Dernière mise à jour** : Janvier 2026  
**Version du template** : Geeky Next.js 1.0.0  
**Version Tailwind CSS** : 4.1.12  
**Version Angular** : 21.1.0
