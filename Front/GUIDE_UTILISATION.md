# Guide d'utilisation - Plateforme de Recrutement

## 📋 Vue d'ensemble

Plateforme de recrutement en ligne développée avec **Angular 21** permettant aux candidats de postuler à des offres d'emploi et aux administrateurs de gérer l'ensemble du processus de recrutement.

## 🚀 Démarrage rapide

### Installation

```bash
npm install
```

### Lancement du serveur de développement

```bash
npm start
# ou
ng serve
```

L'application sera accessible sur `http://localhost:4200/`

### Build de production

```bash
npm run build
```

## 👥 Comptes de test

### Candidat
- **Email**: candidate@test.com
- **Mot de passe**: n'importe quel mot de passe (mode démo)

### Administrateur
- **Email**: admin@test.com
- **Mot de passe**: n'importe quel mot de passe (mode démo)

## 📱 Fonctionnalités principales

### Pour les Candidats

#### 1. **Inscription et Connexion**
- Création de compte avec validation d'email
- Authentification sécurisée
- Récupération de mot de passe

#### 2. **Gestion du profil**
- Modification des informations personnelles (nom, prénom, téléphone, adresse)
- Niveau d'études et expérience professionnelle
- Téléchargement de CV (PDF, DOC, DOCX)
- Photo de profil

#### 3. **Recherche d'offres d'emploi**
- Recherche par mots-clés
- Filtres avancés :
  - Domaine (Informatique, Design, Marketing, etc.)
  - Localisation
  - Type de contrat (CDI, CDD, Stage, Freelance, Alternance)
- Affichage détaillé de chaque offre

#### 4. **Candidature**
- Postulation en un clic
- Lettre de motivation optionnelle
- Suivi de l'état des candidatures :
  - ✉️ Envoyée
  - ⏳ En cours
  - ✅ Retenue
  - ❌ Rejetée

#### 5. **Chat intégré**
- Possibilité de poser des questions sur chaque offre
- Réponses automatiques du bot RH
- Historique des conversations

### Pour les Administrateurs

#### 1. **Tableau de bord**
- Statistiques globales :
  - Nombre d'utilisateurs
  - Nombre d'offres publiées
  - Nombre de candidatures
  - Offres actives
- Vue d'ensemble des activités récentes

#### 2. **Gestion des offres d'emploi**
- Création d'offres avec :
  - Titre, entreprise, localisation
  - Type de contrat
  - Description détaillée
  - Exigences et responsabilités
  - Salaire et avantages
- Modification et suppression d'offres
- Publication/dépublication
- Statistiques par offre (vues, candidatures)

#### 3. **Gestion des candidatures**
- Consultation de toutes les candidatures
- Filtrage par statut
- Téléchargement des CV
- Mise à jour du statut des candidatures
- Recherche par candidat ou poste

#### 4. **Gestion des utilisateurs**
- Liste complète des utilisateurs
- Informations détaillées (profil, CV, expérience)
- Activation/désactivation de comptes
- Filtrage par rôle (candidat/admin)

## 🗂️ Structure du projet

```
src/app/
├── models/                      # Modèles TypeScript
│   ├── user.model.ts
│   ├── job-offer.model.ts
│   ├── application.model.ts
│   ├── chat.model.ts
│   └── stats.model.ts
│
├── services/                    # Services Angular
│   ├── auth.service.ts         # Authentification
│   ├── job.service.ts          # Gestion des offres
│   ├── application.service.ts  # Gestion des candidatures
│   └── chat.service.ts         # Système de chat
│
├── pages/                       # Pages de l'application
│   ├── auth/
│   │   ├── login/              # Page de connexion
│   │   └── signup/             # Page d'inscription
│   ├── jobs/
│   │   ├── job-list/           # Liste des offres
│   │   └── job-detail/         # Détail d'une offre
│   ├── profile/                # Profil utilisateur
│   ├── my-applications/        # Candidatures du candidat
│   ├── home/                   # Page d'accueil
│   └── admin/
│       ├── admin-dashboard/    # Tableau de bord admin
│       ├── admin-jobs/         # Gestion des offres
│       ├── admin-applications/ # Gestion des candidatures
│       └── admin-users/        # Gestion des utilisateurs
│
├── components/                  # Composants réutilisables
│   └── chat/                   # Composant de chat
│
└── layouts/                     # Layouts de l'application
    ├── header/                 # En-tête
    ├── footer/                 # Pied de page
    └── main-layout/            # Layout principal
```

## 🎨 Technologies utilisées

- **Angular 21** - Framework frontend
- **TypeScript** - Langage de programmation
- **Tailwind CSS** - Framework CSS
- **Angular Signals** - Gestion d'état réactive
- **Angular Router** - Navigation
- **Angular Forms** - Gestion des formulaires

## 🔄 Navigation

### Routes publiques
- `/` - Page d'accueil
- `/login` - Connexion
- `/signup` - Inscription
- `/jobs` - Liste des offres d'emploi
- `/jobs/:id` - Détail d'une offre

### Routes candidat (authentification requise)
- `/profile` - Profil personnel
- `/my-applications` - Mes candidatures

### Routes admin (authentification admin requise)
- `/admin/dashboard` - Tableau de bord
- `/admin/jobs` - Gestion des offres
- `/admin/applications` - Gestion des candidatures
- `/admin/users` - Gestion des utilisateurs

## 💾 Données fictives

L'application utilise des données fictives stockées en mémoire pour la démonstration :

### Offres d'emploi (5 offres)
1. Développeur Full Stack - Tech Sénégal (Dakar)
2. Designer UI/UX - Creative Agency (Abidjan)
3. Chef de Projet Digital - Digital Solutions (Lomé)
4. Stagiaire Marketing Digital - StartUp Hub (Cotonou)
5. Data Analyst - Analytics Pro (Accra)

### Utilisateurs (4 utilisateurs)
- 3 candidats
- 1 administrateur

## 🎯 Fonctionnalités avancées

### Chat en temps réel
- Widget de chat flottant sur les pages d'offres
- Réponses automatiques du bot
- Historique des messages par offre

### Recherche et filtres
- Recherche en temps réel
- Filtres multiples combinables
- Réinitialisation facile des filtres

### Statistiques
- Tableaux de bord avec métriques clés
- Croissance mensuelle
- Indicateurs de performance

## 🔒 Sécurité

- Hashage des mots de passe (à implémenter avec un backend)
- Validation des formulaires
- Protection des routes admin
- Gestion des sessions utilisateur

## 📝 Prochaines étapes

Pour passer en production, il faudra :

1. **Backend API**
   - Implémenter une API REST (Node.js/Express, Spring Boot, Laravel, etc.)
   - Base de données (PostgreSQL, MongoDB, MySQL)
   - Authentification JWT

2. **Fonctionnalités supplémentaires**
   - Envoi d'emails (confirmation, notifications)
   - Upload réel de fichiers (CV, photos)
   - Notifications en temps réel
   - Système de messagerie avancé
   - Paiements (pour offres premium)

3. **Améliorations**
   - Tests unitaires et e2e
   - Optimisation des performances
   - Accessibilité (WCAG)
   - Internationalisation (i18n)
   - Mode sombre

## 🐛 Dépannage

### Le serveur ne démarre pas
```bash
# Supprimer node_modules et réinstaller
rm -rf node_modules
npm install
```

### Erreurs de build
```bash
# Nettoyer le cache
npm run build -- --output-path=dist --delete-output-path
```

## 📞 Support

Pour toute question ou problème :
- Email : support@plateforme-recrutement.com
- Documentation : [Lien vers la documentation]

## 📄 Licence

Ce projet est sous licence MIT.

---

**Développé avec ❤️ pour le recrutement en Afrique de l'Ouest**
