import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  // Site 100% statique, servi par GitHub Pages
  output: "export",
  // GitHub Pages sert des fichiers statiques : URL avec slash final -> dossier/index.html
  trailingSlash: true,
  // Pas d'optimiseur d'images cote serveur en export statique : les versions
  // WebP sont pre-generees (scripts/optimiser-images.mjs) et choisies par un
  // chargeur maison. Largeurs alignees sur celles du script.
  images: {
    loader: "custom",
    loaderFile: "./app/chargeurImages.ts",
    deviceSizes: [640, 828, 1080, 1600, 2048],
    imageSizes: [384],
  },
};

// Branche next-intl (lit i18n/request.ts). Le middleware/proxy n'est pas utilise
// en export statique ; il sera ajoute lors du passage sur serveur.
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
