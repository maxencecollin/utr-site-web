/*
  Genere des versions WebP allegees de chaque image du site, a plusieurs
  largeurs, avant la construction (npm run build les lance automatiquement).

  Le site est statique : sans ce script, chaque visiteur telechargeait la photo
  d'origine, pleine taille, quel que soit son ecran. Ici, chaque image de
  public/photos et public/images est declinee dans public/_img/ (non versionne),
  et la liste des largeurs disponibles est ecrite dans app/imagesOptimisees.json,
  lue par le chargeur d'images (app/chargeurImages.ts).

  Les fichiers deja a jour ne sont pas recalcules.
*/
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const RACINE = path.resolve(import.meta.dirname, "..");
const PUBLIC = path.join(RACINE, "public");
const SORTIE = path.join(PUBLIC, "_img");
const MANIFESTE = path.join(RACINE, "app", "imagesOptimisees.json");
const DOSSIERS = ["photos", "images"];
/* Memes largeurs que deviceSizes + imageSizes de next.config.ts */
const LARGEURS = [384, 640, 828, 1080, 1600, 2048];
const EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

function lister(dossier) {
  return fs.readdirSync(dossier, { withFileTypes: true }).flatMap((e) => {
    const chemin = path.join(dossier, e.name);
    if (e.isDirectory()) return lister(chemin);
    return EXTENSIONS.has(path.extname(e.name).toLowerCase()) ? [chemin] : [];
  });
}

const manifeste = {};
let generees = 0;

for (const dossier of DOSSIERS) {
  for (const fichier of lister(path.join(PUBLIC, dossier))) {
    const relatif = path.relative(PUBLIC, fichier).split(path.sep).join("/");
    const { width: origine } = await sharp(fichier).metadata();
    // Largeurs utiles : celles inferieures a l'original, plus l'original (plafonne)
    const largeurs = [...new Set([...LARGEURS.filter((l) => l < origine), Math.min(origine, LARGEURS.at(-1))])];
    // Les PNG (carte, papier, fonds transparents) gardent plus de finesse
    const qualite = path.extname(fichier).toLowerCase() === ".png" ? 90 : 78;
    const base = relatif.replace(/\.[^.]+$/, "");
    const dateSource = fs.statSync(fichier).mtimeMs;

    for (const largeur of largeurs) {
      const cible = path.join(SORTIE, `${base}-${largeur}.webp`);
      if (fs.existsSync(cible) && fs.statSync(cible).mtimeMs >= dateSource) continue;
      fs.mkdirSync(path.dirname(cible), { recursive: true });
      await sharp(fichier).resize({ width: largeur }).webp({ quality: qualite }).toFile(cible);
      generees++;
    }
    manifeste[`/${relatif}`] = largeurs;
  }
}

const trie = Object.fromEntries(Object.keys(manifeste).sort().map((k) => [k, manifeste[k]]));
fs.writeFileSync(MANIFESTE, JSON.stringify(trie, null, 2) + "\n");
console.log(`Images : ${Object.keys(trie).length} sources, ${generees} versions generees`);
