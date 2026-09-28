"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

/*
  Saut programme (onglets, liste des ravitos...) : passe par Lenis quand il
  est actif, sinon defilement natif. Sans cela, Lenis et le navigateur se
  disputeraient la position.
*/
export function defilerVers(y: number, duree = 1.1) {
  if (lenis) lenis.scrollTo(y, { duration: duree });
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
