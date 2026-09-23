/*
  Ravitaillements, par epreuve.

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
  /* Mention accolee au kilometrage (ex. passage de relais) */
  mentionKey?: string;
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
  { km: 47, x: 27.0, y: 33.0, side: "left", ax: 19, ay: 27, mentionKey: "ravitosRelais", ...COMPLET },
  { km: 63, x: 55.0, y: 13.0, side: "left", dx: -3, dy: -7, ax: 55, ay: 28, ...COMPLET },
  { km: 73, x: 78.0, y: 19.0, side: "right", ax: 78, ay: 29, ...COMPLET },
];

/*
  Le 33 km est la fin du parcours du 80 : il part du ravitaillement du km 50 et
  emprunte les deux derniers ravitos avant la meme arrivee. On reutilise donc la
  meme carte, en ne posant que les reperes concernes.

  Il part du ravitaillement du km 47 (80 - 47 = 33), qui sert aussi de
  passage de relais.

  TODO : kilometrages deduits par soustraction, a confirmer avec l'organisation.
*/
export const RAVITOS_33: Ravito[] = [
  { km: 16, x: 55.0, y: 13.0, side: "left", dx: -3, dy: -7, ax: 55, ay: 28, ...COMPLET },
  { km: 26, x: 78.0, y: 19.0, side: "right", ax: 78, ay: 29, ...COMPLET },
];

export type Repere = { x: number; y: number; side: RavitoSide };

export type Epreuve = {
  /* Cle de traduction de l'onglet */
  ongletKey: string;
  ravitos: Ravito[];
  depart: Repere;
  arrivee: Repere;
};

/* Ergots depart / arrivee dessines a droite du trace */
const ERGOT_ARRIVEE: Repere = { x: 88.0, y: 57.5, side: "right" };
const ERGOT_DEPART: Repere = { x: 88.0, y: 61.0, side: "right" };

export const EPREUVES: Epreuve[] = [
  {
    ongletKey: "ravitosTab80",
    ravitos: RAVITOS_80,
    depart: ERGOT_DEPART,
    arrivee: ERGOT_ARRIVEE,
  },
  {
    ongletKey: "ravitosTab33",
    ravitos: RAVITOS_33,
    // Le depart du 33 est le ravitaillement du km 47 du grand parcours
    depart: { x: 27.0, y: 33.0, side: "left" },
    arrivee: ERGOT_ARRIVEE,
  },
];
