/*
  Plan nutrition jour J.

  Les sept reperes en croix sont deja dessines sur `plan-nutrition-papier.png`
  (l'asset est recadre sur les bords exacts du papier, les pourcentages
  ci-dessous s'appliquent donc directement a son cadre). On ne pose que le
  texte par-dessus, comme pour la carte des ravitos.

  Plan basique, une prise toutes les 45 minutes : boisson + un en-cas parmi ce
  que proposent les ravitos (barres, pates de fruits, fruits, gateaux secs) ou
  un gel. 500 mL par prise sur le 80 km, 400 mL sur le 33 km.
  TODO : a faire valider par le coach.
*/

/*
  Position verticale de chaque repere, en % de la hauteur du papier, relevee
  sur les croix dessinees dans l'asset.

  Les croix debordent des deux cotes du trace : elles ne designent pas un cote.
  On alterne donc gauche et droite comme la maquette, en gardant a gauche le
  repere du milieu dont la croix part loin sur la gauche.
*/
export type Jalon = {
  /* Hauteur du repere, en % de la hauteur du papier */
  y: number;
  /* Cote ou se pose l'etiquette */
  cote: "gauche" | "droite";
  /* % de son cote ou l'etiquette s'arrete ; LIMITE_PAR_DEFAUT sinon */
  limite?: number;
};

export const JALONS: Jalon[] = [
  { y: 37.2, cote: "gauche" },
  { y: 46.3, cote: "droite" },
  { y: 50.9, cote: "gauche" },
  { y: 56.9, cote: "droite" },
  // Le trace part jusqu'a 36 % vers la gauche a cette hauteur : l'etiquette recule
  { y: 60.1, cote: "gauche", limite: 68 },
  { y: 67.5, cote: "droite" },
  { y: 74.8, cote: "gauche" },
];

/* Le trace occupe 43 % a 57 % de la largeur : par defaut les etiquettes
   s'arretent a 60 % de leur cote. */
export const LIMITE_PAR_DEFAUT = 60;
/* Marges interieures du papier (bords dechires) */
export const MARGE_GAUCHE = 15;
export const MARGE_DROITE = 12;

/* Une prise toutes les 45 minutes (cadence de la maquette) */
const CADENCE_MIN = 45;

export function tempsDuJalon(index: number) {
  const total = CADENCE_MIN * (index + 1);
  const h = Math.floor(total / 60);
  const m = total % 60;
  return { h, m };
}

export type Etape = {
  /* Cle de traduction du nom de l'epreuve */
  nomKey: string;
  /* Cle de traduction de la duree de course */
  dureeKey: string;
  /* Cle de traduction des sept prises, une par repere */
  prisesKey: string;
  /* Cles du resume (petit ecran) et du conseil de pied de carte */
  resumeKey: string;
  conseilKey: string;
  kmArrivee: number;
};

/* Le relais suit le meme plan que le 80 km, comme sur la carte des ravitos */
export const ETAPES: Etape[] = [
  { nomKey: "nutritionEpreuve80", dureeKey: "nutritionDuree80", prisesKey: "nutritionPrises80", resumeKey: "nutritionResume80", conseilKey: "nutritionConseil80", kmArrivee: 80 },
  { nomKey: "nutritionEpreuve33", dureeKey: "nutritionDuree33", prisesKey: "nutritionPrises33", resumeKey: "nutritionResume33", conseilKey: "nutritionConseil33", kmArrivee: 33 },
];
