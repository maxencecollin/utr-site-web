# Briefing - Refonte du site Ultra Tour de la Ria

Note de contexte pour recréer le projet de zéro avec un nouveau design (maquette Adobe XD réalisée par une brand designer). À donner à Claude au démarrage du nouveau projet.

---

## 1. Contexte de l'événement

- **Nom officiel** : Ultra Tour de la Ria d'Étel
- **Date de l'édition** : 22 mai 2027
- **Lieu** : Ria d'Étel, Bretagne (Locoal-Mendon / Saint-Hélène)
- **Nature** : Grande fête du trail nature autour de la Ria d'Étel, en zone Natura 2000. Spécificité : traversée en bateau pendant la course.
- **Positionnement** : événement sportif nature valorisant le patrimoine de la Ria d'Étel.

### Les épreuves
| Épreuve | Distance | Places |
|---|---|---|
| Ultra | 80 km | 350 places |
| Relais Duo | 80 km (en duo) | 50 duos |
| Trail | 30 km | 450 places |

### Organisateur (mentions légales)
- **Nom légal** : Association ULTRA TRAIL DE LA RIA (association déclarée)
- **RNA** : W561014176
- **SIRET** : 100 445 485 00012
- **Siège social** : 11 rue de l'Éolienne, 56510 Saint-Pierre-Quiberon
- **Code APE** : 93.12Z (organisation d'événements et activités de clubs de sports)
- **Responsable publication** : Maxence COLLIN
- **Email officiel** : contact@ultratourdelaria.fr

---

## 2. Stack technique (projet actuel — à reconduire sauf indication du nouveau design)

- **Framework** : Next.js 16 (App Router) avec Turbopack
- **Langage** : TypeScript
- **UI** : React 19
- **CSS** : Tailwind CSS v4 (configuration via `@theme` dans `globals.css`, pas de `tailwind.config.js`)
- **Animations** : Framer Motion
- **Cartographie** : Leaflet + React-Leaflet (affichage des parcours)
- **Parsing GPX** : gpxparser (tracés des parcours)
- **Export** : site 100% statique (`output: 'export'`), pages pré-rendues en HTML
- **Images** : `images: { unoptimized: true }` (obligatoire pour l'export statique)

### Hébergement / déploiement
- **GitHub Pages** avec **domaine personnalisé** : www.ultratourdelaria.fr
- Le site est servi à la **racine** (`/`) — PAS de `basePath` ni `assetPrefix` à configurer (le projet précédent les avait car il était sur un sous-dossier `/ultra-tour-de-la-ria/`, ce n'est plus le cas).
- Le build est copié dans le dossier `docs/` à la racine du repo (source GitHub Pages).

---

## 3. Identité visuelle (design actuel — à confronter avec la nouvelle maquette XD)

### Typographies
- **Police d'affichage / titres** : **Comico** (Comico-Regular.woff2) — variable CSS `--font-display`
- **Police de corps / sans-serif** : **Futura** (Futura-Medium 400, Futura-Bold 700) — variable CSS `--font-sans`, fallback Inter / system-ui
- **Inter** est chargée depuis Google Fonts comme fallback

> Note : la nouvelle maquette définira probablement de nouvelles typos — vérifier dans le fichier XD et remplacer.

### Palette de couleurs (4 familles, déclinées 50 → 900)

**Bleu Ria** (couleur principale) — référence `#0781dd`
```
ria-50:  #ebf5fd    ria-500: #0781dd  (principale)
ria-100: #d4eafb    ria-600: #0669bb
ria-200: #aad5f7    ria-700: #045099
ria-300: #72b8f0    ria-800: #023e7c
ria-400: #3a9ae8    ria-900: #012d5a
```

**Pinède** (vert forêt) — référence `#374426`
```
pinede-50:  #edf2de   pinede-500: #374426
pinede-100: #d5e0bc   pinede-600: #2f3d1c
pinede-200: #adc087   pinede-700: #283516
pinede-300: #7a9457   pinede-800: #1e280f
pinede-400: #556a3c   pinede-900: #111508
```

**Sable / Terrain** (brun) — référence `#8b4e2a`
```
sable-50:  #f9ede4   sable-500: #8b4e2a
sable-100: #f0d8c6   sable-600: #8b421c
sable-200: #e0b99a   sable-700: #733514
sable-300: #cc8f68   sable-800: #5c2a0e
sable-400: #b06a42   sable-900: #3a1a08
```

**Dark** (texte / neutres)
```
dark-50:  #f5f5f5   dark-500: #666666
dark-100: #e5e5e5   dark-600: #4a4a4a
dark-200: #cccccc   dark-700: #333333
dark-300: #aaaaaa   dark-800: #1f1f1f
dark-400: #888888   dark-900: #111111
```

- **Fond** : blanc (#ffffff), thème clair
- **Texte par défaut** : dark-800 (#1f1f1f)

> Note : ces couleurs sont celles de la charte actuelle. Comparer avec la nouvelle maquette XD et mettre à jour si la designer a fait évoluer la palette.

### Logos disponibles (SVG, dans `/images/logos/`)
Trois variantes, chacune en 3 versions (couleur / noir / blanc) :
- `logo-principal-*` : logo principal
- `logo-etire-*` : version étirée (utilisée dans le header)
- `logo-utr-*` : monogramme UTR

---

## 4. Arborescence des pages (site actuel)

- `/` — Accueil (hero vidéo drone)
- `/epreuves` — Présentation des 3 épreuves
  - `/epreuves/ultra` — Le 80 km
  - `/epreuves/relais` — Le Relais Duo
  - `/epreuves/30km` — Le 30 km
- `/environnement` — Engagement environnemental (Natura 2000)
- `/benevoles` — Appel aux bénévoles
- `/partenaires` — Partenaires
- `/infos-pratiques` — Guide coureur
- `/inscription` — Inscriptions
- `/resultats` — Résultats
- `/cgv` — Conditions générales de vente
- `/confidentialite` — Politique de confidentialité
- `/mentions-legales` — Mentions légales

**Navigation principale** : Accueil · Épreuves (sous-menu : 80km, Relais Duo, 30km) · Environnement · Bénévoles · Partenaires · Infos Pratiques (sous-menu : Guide Coureur, Règlement PDF, Résultats) · bouton Inscription

**Documents** : règlement PDF + fichiers GPX des parcours (dans `/docs/`).

---

## 5. Règles de développement (issues du CLAUDE.md actuel — à conserver)

- **Pas d'emojis** dans le code, le contenu ou les messages.
- **Accents français** : toujours vérifier (é, è, ê, à, ù, ô, î…). Ne jamais oublier les accents sur « Épreuves », « Résultats », « réservés », etc.
- **Commits** : ne jamais ajouter de co-auteur. Relire le code modifié avant chaque commit, vérifier cohérence/qualité, et que le site s'affiche sans erreur console.
- **Images** optimisées web (max ~500 Ko). **Vidéos** compressées format web (max ~10 Mo).
- Garder le projet propre : pas de fichiers temporaires, pas de code commenté inutile, supprimer les approches abandonnées.

---

## 6. Points d'attention pour le nouveau projet

1. **Partir de la maquette XD** comme source de vérité pour le design (couleurs, typos, espacements, composants) — les valeurs de cette note décrivent l'ancien design, à confronter/remplacer.
2. **Configurer le déploiement dès le départ** pour le domaine racine (pas de basePath/assetPrefix).
3. **Récupérer les assets réutilisables** de l'ancien projet : logos SVG, photos web, vidéos drone, fichiers GPX, règlement PDF.
4. **Réutiliser les contenus textuels** (mentions légales, CGV, confidentialité déjà rédigés et à jour) si la designer ne les a pas retouchés.
