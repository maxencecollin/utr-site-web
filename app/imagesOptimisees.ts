import versions from "./imagesOptimisees.json";

/*
  Version WebP pre-generee la plus proche de la largeur demandee (voir
  scripts/optimiser-images.mjs). Les SVG et les images sans version allegee
  sont servis tels quels. Partage entre le chargeur de next/image et les
  quelques photos posees en fond CSS.
*/
const VERSIONS: Record<string, number[]> = versions;

export function imageOptimisee(src: string, largeur: number) {
  const largeurs = VERSIONS[src];
  if (!largeurs) return src;
  const choisie = largeurs.find((l) => l >= largeur) ?? largeurs[largeurs.length - 1];
  return `/_img${src.replace(/\.[^.]+$/, "")}-${choisie}.webp`;
}
