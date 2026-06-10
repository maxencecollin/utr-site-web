import type { NextConfig } from "next";

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

export default nextConfig;
