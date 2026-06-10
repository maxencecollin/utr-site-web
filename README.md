# Ultra Tour de la Ria d'Étel — site web

Site officiel de l'**Ultra Tour de la Ria d'Étel**, fête du trail nature autour de la
Ria d'Étel (Bretagne, zone Natura 2000). Prochaine édition : **22 mai 2027**.

Épreuves : Ultra 80 km · Relais Duo 80 km · Trail 30 km.

## Stack

Next.js 16 (App Router, Turbopack) · TypeScript · React 19 · Tailwind CSS v4.
Site 100 % statique exporté pour **GitHub Pages** (domaine `www.ultratourdelaria.fr`).

## Développement

```bash
npm install      # installer les dépendances
npm run dev      # serveur de dev sur http://localhost:3000
npm run lint     # lint
```

## Déploiement

```bash
npm run deploy   # build statique + copie de l'export dans docs/
```

GitHub Pages sert le site depuis le dossier `docs/` de la branche principale.
Commiter et pousser `docs/` met le site en ligne.

## Documentation projet

- `BRIEFING-NOUVEAU-PROJET.md` — contexte complet (événement, épreuves, mentions légales, charte).
- `CLAUDE.md` — règles de développement et conventions.
