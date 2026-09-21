/*
  Ravitaillements du 80 km (parcours partage avec le relais).

  x / y : position du repere sur `carte-ravito.png`, en pourcentage de l'image.
  Les petits traits perpendiculaires sont deja dessines dans l'asset ; on ne
  pose que le texte par-dessus, d'ou ces coordonnees relevees sur le trace.

  side : cote ou se pose l'etiquette par rapport au repere.

  TODO : composition reelle et heures de fermeture par ravito (l'organisation
  doit les fournir) ; en attendant tous les ravitos affichent la composition
  generale du reglement ("solide et liquide tous les 10 a 15 km").
*/

export type RavitoSide = "left" | "right" | "above" | "below";

export type Ravito = {
  km: number;
  x: number;
  y: number;
  side: RavitoSide;
  /* Decalage fin de l'etiquette par rapport au repere, en % de l'image :
     le trace est sinueux, certaines etiquettes doivent s'ecarter pour rester lisibles */
  dx?: number;
  dy?: number;
  /* Position du grand nombre quand le ravito est le ravito courant.
     Relevee dans une zone libre du trace : le blanc sur blanc serait illisible
     si on se contentait d'agrandir l'etiquette sur place. */
  ax: number;
  ay: number;
  /* Heure limite de passage, une fois connue (ex. "1h30") */
  arriveeMax?: string;
  /* Prestations presentes sur place */
  eau: boolean;
  liquide: boolean;
  sec: boolean;
  chaud: boolean;
  medical: boolean;
  aideExterne: boolean;
};

/* Composition generale appliquee a tous les ravitos tant qu'on n'a pas le detail */
const COMPLET = {
  eau: true,
  liquide: true,
  sec: true,
  chaud: true,
  medical: true,
  aideExterne: true,
} as const;

export const RAVITOS_80: Ravito[] = [
  { km: 16, x: 40.0, y: 75.0, side: "below", ax: 40, ay: 83, ...COMPLET },
  { km: 27, x: 4.5, y: 85.0, side: "left", ax: 33, ay: 87, ...COMPLET },
  { km: 39, x: 30.0, y: 61.0, side: "above", dy: -2, ax: 37, ay: 55, ...COMPLET },
  { km: 50, x: 27.0, y: 33.0, side: "left", ax: 19, ay: 27, ...COMPLET },
  { km: 63, x: 55.0, y: 13.0, side: "left", dx: -3, dy: -7, ax: 55, ay: 28, ...COMPLET },
  { km: 73, x: 78.0, y: 19.0, side: "right", ax: 78, ay: 29, ...COMPLET },
];

/* Ergots depart / arrivee dessines a droite du trace */
export const DEPART_ARRIVEE = { x: 88.0, yArrivee: 57.5, yDepart: 61.0 };
