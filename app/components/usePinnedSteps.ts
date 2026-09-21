"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/*
  Section epinglee parcourue au scroll, palier par palier.

  Le conteneur est plus haut que l'ecran ; la section interieure reste collee
  pendant qu'on le traverse. La progression renvoyee (0 -> 1) est lissee avec
  inertie derriere la position de scroll, et la molette est capturee tant que
  la section est epinglee : un geste = un palier.

  Partage par la section "L'epreuve" des pages de course (voyage de zoom d'un
  objet a l'autre) et par "Les ravitos" de la page Entrainement.
*/

/* Raideur du rappel : plus grand = suit le scroll de plus pres */
const STIFFNESS = 5;
/* Vitesse max de la progression (part du voyage complet par seconde).
   La remontee est plus rapide que la descente. */
const MAX_SPEED_DOWN = 0.6;
const MAX_SPEED_UP = 1.2;
/* Molette : seuil anti-declenchement accidentel, puis temps de recharge */
const WHEEL_THRESHOLD = 100;
const WHEEL_COOLDOWN_DOWN = 1200;
const WHEEL_COOLDOWN_UP = 450;

type Options = {
  /* false : la molette n'est plus capturee quand on remonte, le scroll natif
     reprend la main et on traverse la section d'un seul geste au lieu de
     repasser palier par palier. */
  captureUp?: boolean;
};

export function usePinnedSteps(stepsCount: number, { captureUp = true }: Options = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  // Si la section depasse la hauteur de l'ecran, on l'epingle par le bas
  const [stickyTop, setStickyTop] = useState(0);

  useEffect(() => {
    let raf = 0;
    let running = false;
    let started = false;
    let last = 0;
    let target = 0;
    let current = 0;

    const tick = (now: number) => {
      // Le timestamp rAF (debut de frame) peut preceder le performance.now()
      // capture au lancement : dt doit rester >= 0
      const dt = Math.min(0.05, Math.max(0, (now - last) / 1000));
      last = now;
      const delta = (target - current) * (1 - Math.exp(-STIFFNESS * dt));
      const maxDelta = (target < current ? MAX_SPEED_UP : MAX_SPEED_DOWN) * dt;
      current += Math.min(maxDelta, Math.max(-maxDelta, delta));
      if (Math.abs(target - current) < 0.0005) {
        current = target;
        running = false;
      } else {
        raf = requestAnimationFrame(tick);
      }
      setProgress(current);
    };

    const onScroll = () => {
      const container = containerRef.current;
      const sticky = stickyRef.current;
      if (!container || !sticky) return;
      const top = Math.min(0, window.innerHeight - sticky.offsetHeight);
      setStickyTop(top);
      const range = container.offsetHeight - sticky.offsetHeight;
      const y = top - container.getBoundingClientRect().top;
      target = range > 0 ? Math.min(1, Math.max(0, y / range)) : 0;
      if (!started) {
        // Premier passage (chargement, arrivee par ancre) : on se cale sans animer
        started = true;
        current = target;
        setProgress(target);
        return;
      }
      if (!running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    /* Tant que la section est epinglee, un geste de molette = un palier.
       On accumule les deltas puis on scrolle en douceur jusqu'au palier
       suivant ; pendant le trajet et la recharge, les evenements (inertie du
       trackpad) sont avales. */
    let wheelAccum = 0;
    let coolUntil = 0;

    const onWheel = (e: WheelEvent) => {
      const container = containerRef.current;
      const sticky = stickyRef.current;
      if (!container || !sticky) return;
      const top = Math.min(0, window.innerHeight - sticky.offsetHeight);
      const range = container.offsetHeight - sticky.offsetHeight;
      if (range <= 0) return;
      const y = top - container.getBoundingClientRect().top;
      // Hors de la zone epinglee : scroll natif
      if (y < 1 || y > range - 1) {
        wheelAccum = 0;
        return;
      }
      const stepSize = range / (stepsCount - 1);
      const nearestStep = Math.round(y / stepSize);
      const goingDown = e.deltaY > 0;
      // Remontee libre : on laisse filer le scroll natif
      if (!goingDown && !captureUp) {
        wheelAccum = 0;
        return;
      }
      // Pose sur le premier/dernier palier et on continue dans la meme
      // direction : on libere le scroll natif pour sortir de la section
      const atEdge = goingDown ? nearestStep >= stepsCount - 1 : nearestStep <= 0;
      if (atEdge && Math.abs(y - nearestStep * stepSize) < 2) {
        wheelAccum = 0;
        return;
      }
      e.preventDefault();
      const now = performance.now();
      if (now < coolUntil) return;
      wheelAccum += e.deltaY;
      if (Math.abs(wheelAccum) < WHEEL_THRESHOLD) return;
      const targetStep = Math.max(
        0,
        Math.min(stepsCount - 1, nearestStep + (wheelAccum > 0 ? 1 : -1)),
      );
      const goingUp = targetStep < nearestStep;
      wheelAccum = 0;
      coolUntil = now + (goingUp ? WHEEL_COOLDOWN_UP : WHEEL_COOLDOWN_DOWN);
      window.scrollTo({
        top:
          window.scrollY +
          container.getBoundingClientRect().top -
          top +
          stepSize * targetStep,
        behavior: "smooth",
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("wheel", onWheel);
      cancelAnimationFrame(raf);
    };
  }, [stepsCount, captureUp]);

  /* Saut direct a un palier (clic sur une pilule, une fleche...).
     Renvoie false si la section n'est pas epinglee (petit ecran) : l'appelant
     sait alors qu'il doit gerer la selection lui-meme. */
  const scrollToStep = useCallback(
    (step: number) => {
      const container = containerRef.current;
      const sticky = stickyRef.current;
      if (!container || !sticky) return false;
      const range = container.offsetHeight - sticky.offsetHeight;
      if (range <= 0) return false;
      window.scrollTo({
        top:
          window.scrollY +
          container.getBoundingClientRect().top -
          stickyTop +
          range * (step / (stepsCount - 1)),
        behavior: "smooth",
      });
      return true;
    },
    [stepsCount, stickyTop],
  );

  return { containerRef, stickyRef, progress, stickyTop, scrollToStep };
}
