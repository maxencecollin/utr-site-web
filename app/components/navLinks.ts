/*
  Entrees de navigation partagees entre le header desktop et le menu mobile.
  Chemins absolus (avec /) pour que les ancres fonctionnent aussi depuis les
  pages de course et la page Entrainement.
*/

/* Cible de tous les boutons d'inscription : page d'attente tant que la page
   Klikego n'existe pas. Mettre ici son adresse complete (https://...) le jour
   de l'ouverture. */
export const HREF_INSCRIPTION = "/inscription";

/* Les quatre entrees de la maquette XD. "Infos pratiques" mene a une page
   d'attente tant que son contenu n'est pas pret. */
export const HEADER_LINKS = [
  { key: "headerEpreuves", href: "/#courses" },
  { key: "headerEntrainement", href: "/entrainement" },
  { key: "headerEnvironnement", href: "/environnement" },
  { key: "headerInfos", href: "/infos-pratiques" },
] as const;

/* Sections de la landing listees en plus dans le menu mobile */
export const SECONDARY_LINKS = [
  { key: "parcours", href: "/#parcours" },
  { key: "benevoles", href: "/#benevoles" },
  { key: "partenaires", href: "/#partenaires" },
] as const;
