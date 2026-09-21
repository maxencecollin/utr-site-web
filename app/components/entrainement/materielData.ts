/*
  Materiel obligatoire, tire du reglement 2027
  (public/docs/Reglement_Ultra_Tour_Ria_2027.pdf, section "MATERIEL OBLIGATOIRE").

  La maquette ne montre que des lignes "MATERIEL" de remplissage : les trois
  categories (habillement / securite / alimentation) sont notre repartition, le
  reglement donnant une liste a plat.
*/

export type Materiel = {
  labelKey: string;
  /* Precision affichee sous le libelle (volumes, cas particuliers) */
  detailKey?: string;
  /* Epreuves ou l'objet est obligatoire */
  km80: boolean;
  km33: boolean;
  relais: boolean;
};

export type Categorie = {
  labelKey: string;
  items: Materiel[];
};

export const CATEGORIES: Categorie[] = [
  {
    labelKey: "materielHabillement",
    items: [
      { labelKey: "materielVeste", km80: true, km33: true, relais: true },
      { labelKey: "materielStrap", km80: true, km33: true, relais: true },
    ],
  },
  {
    labelKey: "materielSecurite",
    items: [
      { labelKey: "materielSac", detailKey: "materielSacDetail", km80: true, km33: false, relais: false },
      { labelKey: "materielTelephone", detailKey: "materielTelephoneDetail", km80: true, km33: true, relais: true },
      { labelKey: "materielCouverture", detailKey: "materielCouvertureDetail", km80: true, km33: true, relais: true },
      { labelKey: "materielSifflet", km80: true, km33: true, relais: true },
      { labelKey: "materielFrontale", detailKey: "materielFrontaleDetail", km80: true, km33: false, relais: true },
    ],
  },
  {
    labelKey: "materielAlimentation",
    items: [
      { labelKey: "materielEau", detailKey: "materielEauDetail", km80: true, km33: true, relais: true },
      { labelKey: "materielGobelet", km80: true, km33: true, relais: true },
      { labelKey: "materielReserve", km80: true, km33: true, relais: true },
    ],
  },
];

/* Colonnes du tableau, dans l'ordre de la maquette */
export const EPREUVES = [
  { cle: "km80", labelKey: "materielColonne80" },
  { cle: "km33", labelKey: "materielColonne33" },
  { cle: "relais", labelKey: "materielColonneRelais" },
] as const;

/* Complement declenche par l'organisation la veille, annonce par SMS */
export const KIT_CANICULE = [
  "materielCaniculeEau",
  "materielCaniculeCasquette",
  "materielCaniculeCreme",
];
