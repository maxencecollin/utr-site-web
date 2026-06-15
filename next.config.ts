import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  // Site 100% statique, servi par GitHub Pages
  output: "export",
  // GitHub Pages sert des fichiers statiques : URL avec slash final -> dossier/index.html
  trailingSlash: true,
  // Obligatoire pour l'export statique (pas d'optimiseur d'images cote serveur)
  images: {
    unoptimized: true,
  },
};

// Branche next-intl (lit i18n/request.ts). Le middleware/proxy n'est pas utilise
// en export statique ; il sera ajoute lors du passage sur serveur.
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
