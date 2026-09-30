/*
  Ravitaillements, par epreuve.

  Les ravitos sont places sur le trace GPX de l'epreuve a leur distance reelle
  (voir traceGpx.ts) : aucune position a relever a la main.

  Decide avec l'organisation (2026-09-30) : pas de chaud, pas de poste medical
  sur les ravitos (il est a Locoal-Mendon, sur le site d'arrivee), aide
  exterieure autorisee uniquement sur les ravitos, toilettes visees partout.
  TODO : heures de fermeture par ravito.
*/

export type Ravito = {
  km: number;
  /* Mention accolee au kilometrage (ex. passage de relais) */
  mentionKey?: string;
  /* Heure limite de passage, une fois connue (ex. "1h30") */
  arriveeMax?: string;
  /* Prestations presentes sur place */
  eau: boolean;
  liquide: boolean;
  sec: boolean;
  aideExterne: boolean;
  toilettes: boolean;
};

/* Composition commune a tous les ravitos */
const COMPLET = {
  eau: true,
  liquide: true,
  sec: true,
  aideExterne: true,
  toilettes: true,
} as const;

export const RAVITOS_80: Ravito[] = [
  { km: 16, ...COMPLET },
  { km: 27, ...COMPLET },
  { km: 39, ...COMPLET },
  { km: 47, mentionKey: "ravitosRelais", ...COMPLET },
  { km: 63, ...COMPLET },
  { km: 73, ...COMPLET },
];

/*
  Le 33 km part du ravitaillement du km 47 du grand parcours (80 - 47 = 33) :
  ses deux ravitos sont ceux des km 63 et 73 du 80.
  TODO : kilometrages deduits par soustraction, a confirmer avec l'organisation.
*/
export const RAVITOS_33: Ravito[] = [
  { km: 16, ...COMPLET },
  { km: 26, ...COMPLET },
];

export type Epreuve = {
  /* Cle de traduction de l'onglet */
  ongletKey: string;
  ravitos: Ravito[];
  /* Trace GPX (dans public/) et distance officielle de l'epreuve */
  gpx: string;
  km: number;
};

export const EPREUVES: Epreuve[] = [
  { ongletKey: "ravitosTab80", ravitos: RAVITOS_80, gpx: "docs/UTR-80km-relais.gpx", km: 80 },
  { ongletKey: "ravitosTab33", ravitos: RAVITOS_33, gpx: "docs/UTR-33km.gpx", km: 33 },
];
