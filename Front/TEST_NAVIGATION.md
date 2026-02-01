# 🧪 Plan de Test - Navigation et Routes

## ✅ Routes configurées

### Routes Publiques (Accessibles sans authentification)
- ✅ `/` - Page d'accueil
- ✅ `/login` - Connexion
- ✅ `/signup` - Inscription
- ✅ `/jobs` - Liste des offres d'emploi
- ✅ `/jobs/:id` - Détail d'une offre

### Routes Candidat (Authentification requise)
- ✅ `/profile` - Profil utilisateur (protégé par authGuard)
- ✅ `/my-applications` - Mes candidatures (protégé par authGuard)

### Routes Admin (Authentification + rôle admin requis)
- ✅ `/admin/dashboard` - Tableau de bord admin (protégé par adminGuard)
- ✅ `/admin/jobs` - Gestion des offres (protégé par adminGuard)
- ✅ `/admin/applications` - Gestion des candidatures (protégé par adminGuard)
- ✅ `/admin/users` - Gestion des utilisateurs (protégé par adminGuard)

### Route de fallback
- ✅ `/**` - Redirige vers la page d'accueil

## 🛡️ Guards implémentés

### authGuard
- **Fonction**: Vérifie si l'utilisateur est authentifié
- **Action si non authentifié**: Redirige vers `/login` avec returnUrl
- **Routes protégées**: `/profile`, `/my-applications`

### adminGuard
- **Fonction**: Vérifie si l'utilisateur est authentifié ET administrateur
- **Action si non autorisé**: Redirige vers `/`
- **Routes protégées**: Toutes les routes `/admin/*`

## 🧪 Scénarios de test

### Test 1: Navigation publique (utilisateur non connecté)
1. ✅ Accéder à `/` → Affiche la page d'accueil
2. ✅ Cliquer sur "Offres d'emploi" → Navigue vers `/jobs`
3. ✅ Cliquer sur une offre → Navigue vers `/jobs/:id`
4. ✅ Cliquer sur "Connexion" → Navigue vers `/login`
5. ✅ Cliquer sur "Inscription" → Navigue vers `/signup`

### Test 2: Protection des routes candidat
1. ❌ Tenter d'accéder à `/profile` sans connexion → Redirigé vers `/login?returnUrl=/profile`
2. ❌ Tenter d'accéder à `/my-applications` sans connexion → Redirigé vers `/login?returnUrl=/my-applications`

### Test 3: Navigation candidat (utilisateur connecté)
1. ✅ Se connecter avec `candidate@test.com`
2. ✅ Vérifier que le header affiche l'avatar/initiales
3. ✅ Cliquer sur l'avatar → Menu déroulant apparaît
4. ✅ Cliquer sur "Mon Profil" → Navigue vers `/profile`
5. ✅ Cliquer sur "Mes candidatures" → Navigue vers `/my-applications`
6. ✅ Naviguer vers une offre et postuler
7. ✅ Vérifier que la candidature apparaît dans `/my-applications`

### Test 4: Protection des routes admin
1. ❌ Se connecter avec `candidate@test.com`
2. ❌ Tenter d'accéder à `/admin/dashboard` → Redirigé vers `/`
3. ❌ Tenter d'accéder à `/admin/jobs` → Redirigé vers `/`

### Test 5: Navigation admin (administrateur connecté)
1. ✅ Se connecter avec `admin@test.com`
2. ✅ Le header affiche "Dashboard Admin" dans le menu
3. ✅ Cliquer sur "Dashboard Admin" → Navigue vers `/admin/dashboard`
4. ✅ Vérifier l'affichage des statistiques
5. ✅ Cliquer sur "Créer une offre" → Navigue vers `/admin/jobs/create` (à implémenter)
6. ✅ Cliquer sur "Gestion des utilisateurs" → Navigue vers `/admin/users`
7. ✅ Cliquer sur "Gestion des candidatures" → Navigue vers `/admin/applications`
8. ✅ Cliquer sur "Gestion des offres" → Navigue vers `/admin/jobs`

### Test 6: Navigation dans le header
1. ✅ Logo "LinkIn" → Navigue vers `/`
2. ✅ Menu "Accueil" → Navigue vers `/`
3. ✅ Menu "Offres d'emploi" → Navigue vers `/jobs`
4. ✅ Menu dynamique selon le rôle (Candidat vs Admin)

### Test 7: Navigation mobile
1. ✅ Ouvrir le menu hamburger
2. ✅ Vérifier que tous les liens sont présents
3. ✅ Cliquer sur un lien → Navigation fonctionne + menu se ferme

### Test 8: Déconnexion et redirection
1. ✅ Se connecter (candidat ou admin)
2. ✅ Naviguer vers une page protégée
3. ✅ Cliquer sur "Déconnexion"
4. ✅ Vérifier la redirection vers `/login`
5. ✅ Vérifier que localStorage est vidé
6. ❌ Tenter d'accéder à l'historique des pages protégées → Redirigé vers `/login`

### Test 9: Routes inexistantes
1. ✅ Accéder à `/route-inexistante` → Redirigé vers `/`
2. ✅ Accéder à `/admin/route-inexistante` → Redirigé vers `/`

### Test 10: Navigation avec le bouton retour du navigateur
1. ✅ Naviguer: Home → Jobs → Job Detail
2. ✅ Cliquer sur retour navigateur → Retour à Jobs
3. ✅ Cliquer sur retour navigateur → Retour à Home

### Test 11: Deep linking
1. ✅ Coller directement `/jobs/1` dans la barre d'adresse → Affiche le détail de l'offre 1
2. ✅ Coller `/profile` sans être connecté → Redirigé vers `/login?returnUrl=/profile`
3. ✅ Se connecter → Automatiquement redirigé vers `/profile`

### Test 12: Chat et navigation
1. ✅ Ouvrir le chat sur une offre
2. ✅ Naviguer vers une autre page
3. ✅ Revenir sur l'offre → Le chat n'est plus ouvert (correct)

## 📊 Matrice de compatibilité des routes

| Route | Non connecté | Candidat | Admin |
|-------|-------------|----------|-------|
| `/` | ✅ | ✅ | ✅ |
| `/login` | ✅ | ✅ | ✅ |
| `/signup` | ✅ | ✅ | ✅ |
| `/jobs` | ✅ | ✅ | ✅ |
| `/jobs/:id` | ✅ | ✅ | ✅ |
| `/profile` | ❌ → `/login` | ✅ | ✅ |
| `/my-applications` | ❌ → `/login` | ✅ | ✅ |
| `/admin/dashboard` | ❌ → `/` | ❌ → `/` | ✅ |
| `/admin/jobs` | ❌ → `/` | ❌ → `/` | ✅ |
| `/admin/applications` | ❌ → `/` | ❌ → `/` | ✅ |
| `/admin/users` | ❌ → `/` | ❌ → `/` | ✅ |

## 🔗 Links configurés dans l'application

### Header
- Logo → `/`
- Accueil → `/`
- Offres d'emploi → `/jobs`
- Mes candidatures → `/my-applications` (si candidat)
- Dashboard Admin → `/admin/dashboard` (si admin)
- Connexion → `/login`
- Inscription → `/signup`

### Footer
- À propos → `/about` (à créer)
- Projets → `/projects` (à créer)
- Tarification → `/pricing` (à créer)
- Blog → `/blog` (à créer)
- Aide → `/help` (à créer)
- FAQ → `/faq` (à créer)
- Contact → `/contact` (à créer)

### Page d'accueil
- Découvrir les offres → `/jobs`
- Créer un compte → `/signup`

### Liste des offres
- Clic sur une offre → `/jobs/:id`

### Détail d'offre
- Retour aux offres → `/jobs`
- Voir l'offre (si supprimée) → `/jobs`

### Profil candidat
- Voir tout (candidatures) → `/my-applications`

### Mes candidatures
- Voir l'offre → `/jobs/:id`
- Découvrir les offres (si aucune candidature) → `/jobs`

### Admin Dashboard
- Créer une offre → `/admin/jobs/create` (à implémenter)
- Gérer les utilisateurs → `/admin/users`
- Voir les candidatures → `/admin/applications`
- Voir tout (candidatures) → `/admin/applications`
- Voir tout (offres) → `/admin/jobs`

### Admin Jobs
- Modifier → `/admin/jobs/edit/:id` (à implémenter)

## ✅ Vérifications à effectuer

### Structure
- [x] Tous les composants importent RouterLink quand nécessaire
- [x] Guards créés et configurés
- [x] Routes protégées correctement
- [x] Redirections configurées

### Fonctionnalités
- [ ] Tester chaque route manuellement
- [ ] Vérifier les guards avec différents rôles
- [ ] Tester la navigation au clavier (Tab, Enter)
- [ ] Vérifier l'accessibilité des liens
- [ ] Tester le retour navigateur
- [ ] Vérifier les URL avec paramètres

### Performance
- [ ] Les routes chargent rapidement
- [ ] Pas de rechargement complet de la page
- [ ] Les animations de transition sont fluides

## 🐛 Problèmes connus à vérifier

1. ⚠️ Routes `/admin/jobs/create` et `/admin/jobs/edit/:id` référencées mais non créées
2. ⚠️ Routes footer (about, blog, etc.) référencées mais non créées
3. ✅ returnUrl après login (à tester)

## 📝 Notes pour l'avenir

### Routes manquantes à créer
- `/admin/jobs/create` - Formulaire de création d'offre
- `/admin/jobs/edit/:id` - Formulaire de modification d'offre
- `/about` - Page à propos
- `/blog` - Liste des articles de blog
- `/contact` - Formulaire de contact
- `/help` - Page d'aide
- `/faq` - Questions fréquentes
- `/privacy` - Politique de confidentialité
- `/terms` - Conditions d'utilisation

### Améliorations possibles
- Ajouter un guard pour vérifier si le CV est uploadé avant de postuler
- Implémenter le lazy loading pour les routes admin
- Ajouter des animations de transition entre les pages
- Implémenter un breadcrumb pour faciliter la navigation
- Ajouter une page 404 personnalisée au lieu de rediriger vers `/`

---

**Status**: ✅ Routes et navigation configurées et protégées
**Date**: 2026-01-22
