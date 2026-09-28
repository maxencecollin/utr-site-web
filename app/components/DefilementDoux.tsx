"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;
let premiereVue = true;
let retourNavigateur = false;
/* Hauteur du header fixe en version fine, pour les ancres */
const HAUTEUR_HEADER = 80;

/*
  Saut programme (onglets, liste des ravitos...) : passe par Lenis quand il
  est actif, sinon defilement natif. Sans cela, Lenis et le navigateur se
  disputeraient la position.
*/
export function defilerVers(y: number, duree = 1.1) {
  if (duree === 0) {
    if (lenis) lenis.scrollTo(y, { immediate: true, force: true });
    else window.scrollTo(0, y);
  } else if (lenis) lenis.scrollTo(y, { duration: duree });
  else window.scrollTo({ top: y, behavior: "smooth" });
}

/*
  Aimantage d'une section epinglee : quand le defilement s'arrete dans la zone
  des paliers, on glisse vers le palier le plus proche de la position reelle.
  Passe par Lenis (defilerVers) : l'aimantage integre de ScrollTrigger deplace
  la page dans le dos de Lenis, qui reprend ensuite depuis l'ancienne position.
  Hors de [premier palier, dernier palier] (ex. pause finale), pas d'aimantage.
*/
export function aimanter(st: ScrollTrigger, paliers: number[]) {
  const min = Math.min(...paliers);
  const max = Math.max(...paliers);
  const surArret = () => {
    const longueur = st.end - st.start;
    const p = (window.scrollY - st.start) / longueur;
    if (p <= min + 0.001 || p >= max - 0.001) return;
    const cible = paliers.reduce((a, b) => (Math.abs(b - p) < Math.abs(a - p) ? b : a));
    const y = st.start + cible * longueur;
    if (Math.abs(y - window.scrollY) > 2) defilerVers(y, 0.6);
  };
  ScrollTrigger.addEventListener("scrollEnd", surArret);
  return () => ScrollTrigger.removeEventListener("scrollEnd", surArret);
}

/*
  Defilement lisse sur tout le site (Lenis), synchronise avec ScrollTrigger qui
  pilote les sections animees. La molette n'est jamais interceptee : on garde
  toujours la main sur le rythme. Coupe si le systeme demande de reduire les
  animations, et fige tant que le rideau "site en construction" est baisse.
*/
export default function DefilementDoux() {
  const chemin = usePathname();

  /*
    Changement de page sans rechargement : Next voudrait remettre la page en
    haut, mais Lenis, qui garde l'ancienne position en memoire, la ramenait
    aussitot au milieu de la nouvelle page. On fixe donc nous-memes la position :
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
    if (premiereVue) {
      premiereVue = false;
      return;
    }
    const retour = retourNavigateur;
    retourNavigateur = false;
    const placer = () => {
      let cible = window.scrollY;
      if (!retour) {
        const ancre = window.location.hash ? document.getElementById(window.location.hash.slice(1)) : null;
        cible = ancre ? ancre.getBoundingClientRect().top + window.scrollY - HAUTEUR_HEADER : 0;
      }
      if (lenis) {
        lenis.resize();
        lenis.scrollTo(cible, { immediate: true, force: true });
      } else window.scrollTo(0, cible);
      ScrollTrigger.refresh();
    };
    // Second passage une fois la page stabilisee (images, sections epinglees) :
    // la position d'une ancre peut encore bouger apres le premier rendu
    const minuteurs = [window.setTimeout(placer, retour ? 60 : 0)];
    if (!retour && window.location.hash) minuteurs.push(window.setTimeout(placer, 400));
    return () => minuteurs.forEach(clearTimeout);
  }, [chemin]);

  /*
    Quand la hauteur de la page change (images qui se chargent, changement de
    page sans rechargement) :
    - Lenis remesure la page. Il ne surveille que <html>, dont la hauteur est
      fixee a celle de la fenetre : il gardait la hauteur de la page precedente
      et bloquait le defilement avant le bas d'une page plus longue ;
    - GSAP recalcule les positions des sections animees, sinon une section
      demarre au milieu de son animation.
  */
  useEffect(() => {
    let minuteur = 0;
    let hauteur = document.body.scrollHeight;
    const obs = new ResizeObserver(() => {
      if (document.body.scrollHeight === hauteur) return;
      hauteur = document.body.scrollHeight;
      lenis?.resize();
      clearTimeout(minuteur);
      minuteur = window.setTimeout(() => ScrollTrigger.refresh(), 150);
    });
    obs.observe(document.body);
    return () => {
      clearTimeout(minuteur);
      obs.disconnect();
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    lenis = new Lenis({ lerp: 0.1 });
    lenis.on("scroll", ScrollTrigger.update);
    const tic = (temps: number) => lenis?.raf(temps * 1000);
    gsap.ticker.add(tic);
    gsap.ticker.lagSmoothing(0);

    // Rideau de chantier : pas de defilement derriere lui
    const racine = document.documentElement;
    const suivreRideau = () => {
      const ferme = !!document.querySelector(".chantier-voile") && racine.dataset.chantier !== "ouvert";
      if (ferme) lenis?.stop();
      else lenis?.start();
    };
    suivreRideau();
    const obs = new MutationObserver(suivreRideau);
    obs.observe(racine, { attributes: true, attributeFilter: ["data-chantier"] });

    return () => {
      obs.disconnect();
      gsap.ticker.remove(tic);
      lenis?.destroy();
      lenis = null;
    };
  }, []);
  return null;
}
