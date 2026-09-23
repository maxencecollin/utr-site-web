/*
  Mode "site en construction".

  Tant qu'il est actif, chaque page s'ouvre sur un rideau qui demande un mot de
  passe, et les moteurs de recherche sont tenus a l'ecart (noindex + robots.txt).
  A la mise en ligne publique : passer CHANTIER_ACTIF a false, c'est tout.

  Ce n'est PAS une protection : le depot GitHub est public et le contenu des
  pages reste dans le HTML. Le rideau sert a tenir le grand public et Google a
  distance pendant que l'association relit le site.

  L'empreinte est le SHA-256 du mot de passe, pour qu'il n'apparaisse pas en
  clair dans le code. Pour le changer :
    printf '%s' 'nouveau-mot-de-passe' | shasum -a 256
*/
export const CHANTIER_ACTIF = true;

export const CHANTIER_EMPREINTE =
  "54cfd2539a1e572af8f84f25f0bb7980386c5412f6a7698226ae252805a6140f";

/* Cle de stockage : contient l'empreinte, donc changer le mot de passe
   referme le rideau pour tout le monde */
export const CHANTIER_CLE = "utr-chantier";

/*
  Script execute dans le <head>, avant l'affichage : s'il trouve l'empreinte
  dans le navigateur, il leve le rideau tout de suite (pas de flash).
*/
export const CHANTIER_SCRIPT = `try{if(localStorage.getItem(${JSON.stringify(
  CHANTIER_CLE,
)})===${JSON.stringify(CHANTIER_EMPREINTE)})document.documentElement.dataset.chantier="ouvert"}catch(e){}`;
