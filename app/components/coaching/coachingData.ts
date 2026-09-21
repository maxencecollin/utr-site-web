/*
  Offres de coaching de Ronan Kervadec, relevees sur la maquette XD.
  Les tarifs reduits s'appliquent aux coureurs inscrits a l'Ultra Tour de la Ria.
*/

/* Adresse de contact de Ronan : le site est statique, le formulaire de la
   maquette est remplace par un lien mailto.
   TODO : remplacer par sa vraie adresse. */
export const EMAIL_RONAN = "contact@ultratourdelaria.fr";

export type Offre = {
  titreKey: string;
  mentionKey: string;
  chapeauKey: string;
  /* Offre 1 : un plan par course et par objectif. Offre 2 : liste de prestations. */
  plan: { type: "courses" } | { type: "prestations"; cles: string[] };
  prix: { coursesKey: string; reduit: number; plein: number }[];
};

/* Colonne de gauche du bloc "plan" de l'offre generale */
export const COURSES_OFFRE1 = ["materielColonne33", "materielColonneRelais", "materielColonne80"];

export const OFFRES: Offre[] = [
  {
    titreKey: "offre1Titre",
    mentionKey: "offre1Mention",
    chapeauKey: "offre1Chapeau",
    plan: { type: "courses" },
    prix: [
      { coursesKey: "prix80et33", reduit: 32, plein: 40 },
      { coursesKey: "prixRelais", reduit: 52, plein: 65 },
    ],
  },
  {
    titreKey: "offre2Titre",
    mentionKey: "offre2Mention",
    chapeauKey: "offre2Chapeau",
    plan: {
      type: "prestations",
      cles: ["offre2Plan1", "offre2Plan2", "offre2Plan3", "offre2Plan4", "offre2Plan5", "offre2Plan6"],
    },
    prix: [
      { coursesKey: "prix80et33", reduit: 36, plein: 45 },
      { coursesKey: "prixRelais", reduit: 60, plein: 75 },
    ],
  },
];

/* Les cinq questions de la FAQ. Seule celle sur l'alimentation a sa reponse
   dans la maquette ; les autres attendent les textes de Ronan. */
export const FAQ = [
  { questionKey: "faqQ1", reponses: [] as string[] },
  { questionKey: "faqQ2", reponses: [] as string[] },
  { questionKey: "faqQ3", reponses: ["faqQ3a", "faqQ3b"] },
  { questionKey: "faqQ4", reponses: [] as string[] },
  { questionKey: "faqQ5", reponses: [] as string[] },
];
