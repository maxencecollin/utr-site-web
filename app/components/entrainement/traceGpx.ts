import fs from "node:fs";
import path from "node:path";

/*
  Lecture d'un GPX a la construction du site (export statique) : le trace est
  projete en coordonnees SVG et chaque kilometre demande est place sur le
  trace a sa distance reelle.
*/
export type TraceSvg = {
  largeur: number;
  hauteur: number;
  d: string;
  /* Distance totale mesuree sur le GPX, en km */
  totalKm: number;
  /* Points places a une distance donnee : { km, x, y, fraction du trace } */
  reperes: { km: number; x: number; y: number; fraction: number }[];
  /* Premier et dernier point du trace */
  debut: { x: number; y: number };
  fin: { x: number; y: number };
};

function distanceKm(a: [number, number], b: [number, number]) {
  const R = 6371;
  const [la1, lo1] = a.map((v) => (v * Math.PI) / 180);
  const [la2, lo2] = b.map((v) => (v * Math.PI) / 180);
  const h =
    Math.sin((la2 - la1) / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin((lo2 - lo1) / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export function traceGpx(fichier: string, kms: number[], kmOfficiels: number, largeur = 600): TraceSvg {
  const xml = fs.readFileSync(path.join(process.cwd(), "public", fichier), "utf8");
  const pts: [number, number][] = [...xml.matchAll(/<trkpt[^>]*lat="([-\d.]+)"[^>]*lon="([-\d.]+)"/g)].map(
    (m) => [parseFloat(m[1]), parseFloat(m[2])],
  );
  // Projection equirectangulaire corrigee de la latitude moyenne
  const latMoy = pts.reduce((s, p) => s + p[0], 0) / pts.length;
  const k = Math.cos((latMoy * Math.PI) / 180);
  const xs = pts.map((p) => p[1] * k);
  const ys = pts.map((p) => -p[0]);
  const [minX, maxX, minY, maxY] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const marge = 24;
  const echelle = (largeur - 2 * marge) / (maxX - minX);
  const hauteur = Math.round((maxY - minY) * echelle + 2 * marge);
  const proj = (i: number): [number, number] => [
    +((xs[i] - minX) * echelle + marge).toFixed(1),
    +((ys[i] - minY) * echelle + marge).toFixed(1),
  ];
  // Distances cumulees
  const cumul = [0];
  for (let i = 1; i < pts.length; i++) cumul.push(cumul[i - 1] + distanceKm(pts[i - 1], pts[i]));
  const totalKm = cumul[cumul.length - 1];
  const d = pts.map((_, i) => `${i ? "L" : "M"}${proj(i).join(" ")}`).join("");
  // Les kilometres officiels sont ramenes a la distance mesuree sur le GPX
  const reperes = kms.map((km) => {
    const cible = (km / kmOfficiels) * totalKm;
    const i = Math.max(1, cumul.findIndex((c) => c >= cible));
    const t = (cible - cumul[i - 1]) / (cumul[i] - cumul[i - 1] || 1);
    const [x0, y0] = proj(i - 1);
    const [x1, y1] = proj(i);
    return { km, x: +(x0 + (x1 - x0) * t).toFixed(1), y: +(y0 + (y1 - y0) * t).toFixed(1), fraction: cible / totalKm };
  });
  const [dx, dy] = proj(0);
  const [fx, fy] = proj(pts.length - 1);
  return { largeur, hauteur, d, totalKm, reperes, debut: { x: dx, y: dy }, fin: { x: fx, y: fy } };
}
