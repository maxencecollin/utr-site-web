/*
  Entrees de navigation partagees entre le header desktop et le menu mobile.
  Chemins absolus (avec /) pour que les ancres fonctionnent aussi depuis les
  pages de course et la page Entrainement.
*/

/* Les quatre entrees de la maquette XD.
   TODO : "Environnement" et "Infos pratiques" pointent sur les sections de la
   landing en attendant leurs pages dediees. */
export const HEADER_LINKS = [
  { key: "headerEpreuves", href: "/#courses" },
  { key: "headerEntrainement", href: "/entrainement" },
  { key: "headerEnvironnement", href: "/#patrimoine" },
  { key: "headerInfos", href: "/#village" },
] as const;

/* Sections de la landing listees en plus dans le menu mobile */
export const SECONDARY_LINKS = [
  { key: "parcours", href: "/#parcours" },
  { key: "benevoles", href: "/#benevoles" },
  { key: "partenaires", href: "/#partenaires" },
] as const;
