"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let premiereVue = true;
let retourNavigateur = false;
/* Hauteur du header fixe en version fine, pour les ancres */
const HAUTEUR_HEADER = 80;

/*
  Saut programme (onglets, liste des ravitos...) : defilement natif du
  navigateur, en douceur, ou instantane avec duree = 0.
*/
export function defilerVers(y: number, duree = 1) {
  window.scrollTo({ top: y, behavior: duree === 0 ? "instant" : "smooth" });
}

/*
  Defilement natif sur tout le site : pas de lissage ni d'aimantation, la
  page suit exactement la molette ou le doigt. GSAP ScrollTrigger pilote les
  sections animees a partir de cette position.
*/
export default function Defilement() {
  const chemin = usePathname();

  /*
    Changement de page sans rechargement : on fixe nous-memes la position.
    - lien : haut de page, ou l'ancre visee (sous le header fixe) ;
    - retour/avance du navigateur : la position restauree par le navigateur.
    Puis on fait remesurer les sections animees de la nouvelle page.
  */
  useEffect(() => {
    const surPopstate = () => { retourNavigateur = true; };
    window.addEventListener("popstate", surPopstate);
    return () => window.removeEventListener("popstate", surPopstate);
  }, []);

  useEffect(() => {
    // Arrivee directe sur la page : le navigateur s'occupe de la position,
    // sauf pour une ancre, qu'il vise avant que les sections epinglees
    // n'allongent la page (lien partage vers /entrainement/#nutrition...)
    if (premiereVue) {
      premiereVue = false;
      if (!window.location.hash) return;
    }
    const retour = retourNavigateur;
    retourNavigateur = false;
    const placer = () => {
      // D'abord les sections epinglees prennent leur place definitive (elles
      // allongent la page), ensuite seulement on mesure la position de l'ancre
      ScrollTrigger.refresh();
      let cible = window.scrollY;
      if (!retour) {
        const ancre = window.location.hash ? document.getElementById(window.location.hash.slice(1)) : null;
        cible = ancre ? ancre.getBoundingClientRect().top + window.scrollY - HAUTEUR_HEADER : 0;
      }
      window.scrollTo({ top: cible, behavior: "instant" });
    };
    // Second passage une fois la page stabilisee (images, sections epinglees) :
    // la position d'une ancre peut encore bouger apres le premier rendu
    const minuteurs = [window.setTimeout(placer, retour ? 60 : 0)];
    if (!retour && window.location.hash) minuteurs.push(window.setTimeout(placer, 400));
    return () => minuteurs.forEach(clearTimeout);
  }, [chemin]);

  /*
    Quand la hauteur de la page change (images qui se chargent, changement de
    page sans rechargement), GSAP recalcule les positions des sections animees,
    sinon une section demarre au milieu de son animation.
  */
  useEffect(() => {
    let minuteur = 0;
    let hauteur = document.body.scrollHeight;
    const obs = new ResizeObserver(() => {
      if (document.body.scrollHeight === hauteur) return;
      hauteur = document.body.scrollHeight;
      clearTimeout(minuteur);
      minuteur = window.setTimeout(() => ScrollTrigger.refresh(), 150);
    });
    obs.observe(document.body);
    return () => {
      clearTimeout(minuteur);
      obs.disconnect();
    };
  }, []);

  return null;
}
