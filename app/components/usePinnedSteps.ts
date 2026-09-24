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
const MAX_SPEED_UP = 1.2;
/* Molette : seuil anti-declenchement accidentel, puis temps de recharge */
const WHEEL_THRESHOLD = 100;
const WHEEL_COOLDOWN_UP = 450;
/* Silence (ms) qui separe deux gestes : un geste de trackpad est une rafale
   d'evenements qui s'amortit (inertie) ; tant qu'elle dure, c'est le meme geste */
const FIN_DE_GESTE = 180;
/* Au-dela de ce delai apres un palier, le suivant est accepte meme sans pause :
   un defilement continu (on veut aller vite) avance au lieu de rester bloque */
const VERROU_MAX = 1000;
/* Amplitude sous laquelle un evenement est une traine d'inertie mourante, qui
   ne doit pas declencher de palier une fois VERROU_MAX passe */
const TRAINE = 15;

type Options = {
  /* false : la molette n'est plus capturee quand on remonte, le scroll natif
     reprend la main et on traverse la section d'un seul geste au lieu de
     repasser palier par palier. */
  captureUp?: boolean;
  /* Temps de recharge de la molette apres un palier, en descendant (ms) */
  recharge?: number;
  /* Vitesse max de la progression en descendant (part du voyage par seconde) */
  vitesse?: number;
  /* Pause apres le dernier palier, en fraction de hauteur d'ecran : la section
     reste epinglee sur son etat final avant de laisser place a la suite.
     La hauteur du conteneur doit prevoir cette reserve. */
  pauseFin?: number;
};

/*
  Decalage d'epinglage : si la section depasse la hauteur de l'ecran, on
  l'epingle par le bas. Uniquement quand elle est reellement "sticky" : sur
  petit ecran elle est en position relative, et un "top" negatif la
  remonterait par-dessus la section precedente.
*/
function decalageEpingle(sticky: HTMLElement) {
  if (getComputedStyle(sticky).position !== "sticky") return 0;
  return Math.min(0, window.innerHeight - sticky.offsetHeight);
}

export function usePinnedSteps(
  stepsCount: number,
  { captureUp = true, recharge = 1200, vitesse = 0.6, pauseFin = 0 }: Options = {},
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  // Si la section depasse la hauteur de l'ecran, on l'epingle par le bas
  const [stickyTop, setStickyTop] = useState(0);

  /* Longueur de scroll consacree aux paliers : la hauteur de voyage moins la
     pause finale */
  const paliers = useCallback(
    (container: HTMLElement, sticky: HTMLElement) =>
      container.offsetHeight - sticky.offsetHeight - pauseFin * window.innerHeight,
    [pauseFin],
  );

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
      const maxDelta = (target < current ? MAX_SPEED_UP : vitesse) * dt;
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
      const top = decalageEpingle(sticky);
      setStickyTop(top);
      const range = paliers(container, sticky);
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
    let dernierEvenement = 0;
    let derniereAmplitude = 0;
    // Instant et numero du dernier palier vise
    let palierA = -Infinity;
    let palierVise = 0;
    // Le geste en cours n'a pas encore franchi de palier : il reste libre
    // jusqu'au prochain palier, meme quand son inertie decroit
    let gesteLibre = true;

    const onWheel = (e: WheelEvent) => {
      const container = containerRef.current;
      const sticky = stickyRef.current;
      if (!container || !sticky) return;
      const top = decalageEpingle(sticky);
      const range = paliers(container, sticky);
      if (range <= 0) return;
      const y = top - container.getBoundingClientRect().top;
      const goingDown = e.deltaY > 0;
      const now = performance.now();
      const amplitude = Math.abs(e.deltaY);
      // Nouveau geste : une pause, ou une reacceleration (l'inertie ne fait que
      // decroitre ; une nouvelle impulsion fait remonter l'amplitude)
      const nouveauGeste =
        now - dernierEvenement > FIN_DE_GESTE || amplitude > derniereAmplitude * 1.6 + 3;
      dernierEvenement = now;
      derniereAmplitude = amplitude;
      if (nouveauGeste) gesteLibre = true;
      // Apres un palier (y compris le dernier), la suite du geste et son inertie
      // sont avalees - sinon un seul geste de trackpad sautait deux paliers ou
      // emportait la page au-dela du dernier - jusqu'a une pause du defilement,
      // ou une reacceleration, ou au plus VERROU_MAX si le defilement reste
      // franc : un defilement continu n'est jamais bloque
      const verrouille =
        now < coolUntil ||
        (!gesteLibre && (now - palierA < VERROU_MAX || amplitude < TRAINE));
      const dansZone = y > -2 && y < range + 2;
      if (dansZone && (goingDown || captureUp) && verrouille) {
        e.preventDefault();
        return;
      }
      // Hors de la zone des paliers (avant, dans la pause finale, apres) : scroll natif
      if (y < 1 || y > range - 1) {
        wheelAccum = 0;
        return;
      }
      const stepSize = range / (stepsCount - 1);
      const nearestStep = Math.round(y / stepSize);
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
      wheelAccum += e.deltaY;
      if (Math.abs(wheelAccum) < WHEEL_THRESHOLD) return;
      // Pendant le trajet doux vers le palier vise (~0,5 s), la position n'a
      // pas encore rejoint ce palier : on part de lui, sinon un geste rapide
      // viserait a nouveau le meme palier et serait perdu
      const depart = now - palierA < 600 ? palierVise : nearestStep;
      const targetStep = Math.max(
        0,
        Math.min(stepsCount - 1, depart + (wheelAccum > 0 ? 1 : -1)),
      );
      const goingUp = targetStep < depart;
      wheelAccum = 0;
      palierA = now;
      palierVise = targetStep;
      gesteLibre = false;
      coolUntil = now + (goingUp ? WHEEL_COOLDOWN_UP : recharge);
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
  }, [stepsCount, captureUp, recharge, vitesse, paliers]);

  /* Saut direct a un palier (clic sur une pilule, une fleche...).
     Renvoie false si la section n'est pas epinglee (petit ecran) : l'appelant
     sait alors qu'il doit gerer la selection lui-meme. */
  const scrollToStep = useCallback(
    (step: number) => {
      const container = containerRef.current;
      const sticky = stickyRef.current;
      if (!container || !sticky) return false;
      const range = paliers(container, sticky);
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
    [stepsCount, stickyTop, paliers],
  );

  return { containerRef, stickyRef, progress, stickyTop, scrollToStep };
}
