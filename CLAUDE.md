@AGENTS.md

# Ultra Tour de la Ria d'Étel — site web

Site vitrine de l'événement de trail **Ultra Tour de la Ria d'Étel** (Ria d'Étel, Bretagne).
Édition du **22 mai 2027**. Trois épreuves : Ultra 80 km, Relais Duo 80 km, Trail 30 km.

Le briefing complet du projet est dans `BRIEFING-NOUVEAU-PROJET.md` (contexte événement,
épreuves, mentions légales, charte, arborescence). La maquette **Adobe XD** de la brand
designer est la **source de vérité** pour le design.

## Stack

- Next.js 16 (App Router) + Turbopack, TypeScript, React 19
- Tailwind CSS v4 — configuration via `@theme` dans `app/globals.css` (PAS de `tailwind.config.js`)
- Site 100 % statique : `output: 'export'`, `images.unoptimized: true`, `trailingSlash: true`

## Déploiement

- **GitHub Pages** sur ce repo, source **branche `main` / dossier `/docs`**.
- `npm run deploy` construit le site et copie l'export dans `docs/` (source GitHub Pages).
- Le dossier `docs/` est versionné ; `out/` est ignoré.
- PAS de `basePath` ni `assetPrefix` (le site cible est servi à la racine du domaine).

### Domaine `www.ultratourdelaria.fr` — bascule différée

Le domaine est **encore rattaché à l'ancien repo `ultra-tour-de-la-ria`** qui sert le
site actuellement en ligne. On NE revendique PAS le domaine ici tant que le nouveau site
n'est pas prêt (sinon le build Pages de l'ancien casse). Au moment du go-live :
1. Recréer `public/CNAME` avec `www.ultratourdelaria.fr`.
2. Retirer le domaine de l'ancien repo (`gh api -X PUT repos/maxencecollin/ultra-tour-de-la-ria/pages -f cname=""`).
3. Le déclarer sur ce repo (`gh api -X PUT repos/maxencecollin/utr-site-web/pages -f cname=www.ultratourdelaria.fr`).

## Règles de développement

- **Pas d'emojis** dans le code, le contenu ou les messages.
- **Accents français** : toujours vérifier (é, è, ê, à, ù, ô, î…). Ne jamais oublier
  « Épreuves », « Résultats », « réservés », etc.
- **Commits** : ne jamais ajouter de co-auteur. Relire le code avant chaque commit, vérifier
  la cohérence et que le site s'affiche sans erreur console.
- **Images** optimisées web (max ~500 Ko). **Vidéos** compressées format web (max ~10 Mo).
- Garder le projet propre : pas de fichiers temporaires ni de code commenté inutile.
