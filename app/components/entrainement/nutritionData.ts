/*
  Plan nutrition jour J.

  Les sept reperes en croix sont deja dessines sur `plan-nutrition-papier.png`
  (l'asset est recadre sur les bords exacts du papier, les pourcentages
  ci-dessous s'appliquent donc directement a son cadre). On ne pose que le
  texte par-dessus, comme pour la carte des ravitos.

  TODO : plan reel par epreuve (cadence, rations, points de vigilance) a valider
  avec le coach ; pour l'instant on applique la cadence generale de la maquette,
  une prise toutes les 45 minutes.
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
  /* Cle de traduction de la duree estimee */
  dureeKey: string;
  /* Kilometrage de depart et d'arrivee de l'etape */
  kmDepart: number;
  kmArrivee: number;
  /* Numero du relayeur, pour les deux etapes du relais */
  relayeur?: number;
};

/*
  Le relais est le parcours du 80 km coupe au km 50 (passage de relais).
  Les deux relayeurs ont donc chacun leur plan.
*/
export const ETAPES: Etape[] = [
  { nomKey: "nutritionEpreuve80", dureeKey: "nutritionDuree80", kmDepart: 0, kmArrivee: 80 },
  { nomKey: "nutritionEpreuve33", dureeKey: "nutritionDuree33", kmDepart: 0, kmArrivee: 33 },
  { nomKey: "nutritionEpreuveRelais", dureeKey: "nutritionDureeRelais", kmDepart: 0, kmArrivee: 50, relayeur: 1 },
  { nomKey: "nutritionEpreuveRelais", dureeKey: "nutritionDureeRelais", kmDepart: 50, kmArrivee: 80, relayeur: 2 },
];
