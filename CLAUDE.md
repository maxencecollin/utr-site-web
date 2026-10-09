@AGENTS.md

# Ultra Tour de la Ria — site web

Site vitrine de l'événement de trail **Ultra Tour de la Ria** (Ria d'Étel, Bretagne).
Édition du **16 octobre 2027**. Trois épreuves : Ultra 80 km, Relais Duo 80 km, Trail 33 km.

Le briefing complet du projet est dans `BRIEFING-NOUVEAU-PROJET.md` (contexte événement,
épreuves, mentions légales, charte, arborescence). La maquette **Adobe XD** de la brand
designer est la **source de vérité** pour le design.

## Stack

- Next.js 16 (App Router) + Turbopack, TypeScript, React 19
- Tailwind CSS v4 — configuration via `@theme` dans `app/globals.css` (PAS de `tailwind.config.js`)
- Site 100 % statique : `output: 'export'`, `trailingSlash: true`
- Images : `scripts/optimiser-images.mjs` (lancé par `prebuild`/`predev`) décline chaque image de
  `public/photos` et `public/images` en WebP multi-largeurs dans `public/_img/` (non versionné) ;
  `app/chargeurImages.ts` (loader custom de `next/image`) sert la bonne version. Ajouter une photo =
  la déposer dans `public/photos`, rien d'autre.
- Défilement natif (pas de Lenis ni d'aimantation) ; sections animées en GSAP ScrollTrigger.

## Typographie (maquette XD, remplace l'ancienne charte du briefing)

Système réel de la maquette — Futura n'est PLUS utilisé :
- **Comico** → grand titre du hero — classe `.headline`
- **Technor** (police variable, axe 200→900) → titres de section + chiffres — classes `.titre` / `.chiffre`
- **Inter** → interface et corps de texte — `--font-sans`

Fichiers dans `app/fonts/`, chargés via `next/font/local` (+ Inter via `next/font/google`)
dans `app/layout.tsx`. `.headline`/`.titre`/`.chiffre` sont définies **hors `@layer`** dans
`globals.css` pour que `text-transform: uppercase` ne soit pas écrasé par les utilitaires.
Bleu principal confirmé par la maquette : `#0781DD`. Specs XD brutes : `_assets-source/xd-exports/` (non versionné).

## Déploiement

- Publication : GitHub Actions (`.github/workflows/deploy.yml`) construit et publie `out/`
  sur GitHub Pages à chaque push sur `main`.
- `public/CNAME` (`ultratourdelaria.fr`) doit rester en place. PAS de `basePath` ni `assetPrefix`.
- Site derrière un rideau « en construction » tant que `CHANTIER_ACTIF` vaut `true` dans
  `app/chantier.ts` : le passer à `false` à l'ouverture au public.

## Règles de développement

- **Pas d'emojis** dans le code, le contenu ou les messages.
- **Accents français** : toujours vérifier (é, è, ê, à, ù, ô, î…). Ne jamais oublier
  « Épreuves », « Résultats », « réservés », etc.
- **Commits** : ne jamais ajouter de co-auteur. Relire le code avant chaque commit, vérifier
  la cohérence et que le site s'affiche sans erreur console.
- **Images** optimisées web (max ~500 Ko). **Vidéos** compressées format web (max ~10 Mo).
- Garder le projet propre : pas de fichiers temporaires ni de code commenté inutile.
