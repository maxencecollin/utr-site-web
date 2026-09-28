"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/*
  Defilement lisse (Lenis) synchronise avec ScrollTrigger : Lenis lisse la
  molette et le trackpad sur tous les navigateurs, ScrollTrigger lit la
  position lissee pour piloter les animations. La molette n'est jamais
  interceptee : l'utilisateur garde toujours la main sur le rythme.
  Desactive si le systeme demande de reduire les animations.
*/
export function useDefilementDoux() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
    // Accessible aux sections pour les sauts programmes (clic sur un ravito)
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tic = (temps: number) => lenis.raf(temps * 1000);
    gsap.ticker.add(tic);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tic);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);
}
