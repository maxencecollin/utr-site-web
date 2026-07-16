"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import CourseSectionHeading from "./CourseSectionHeading";
import UtmbBadge from "./UtmbBadge";

export type Hotspot = {
  /* Cle de traduction dans "course" (hydratation, parcoursLabel...) */
  labelKey: string;
  href: string;
  /* Fleche vers le bas = ancre dans la page, a droite = autre page */
  direction: "right" | "down";
  /* Position du coin haut-gauche de l'etiquette, en % de la photo */
  left: string;
  top: string;
  /* Centre de l'objet vise par le zoom, en % de la photo */
  zoom?: { x: number; y: number };
};

type Props = {
  /* Texte a droite de l'en-tete (ex. "/ 80 KM") */
  trailing: string;
  photo: string;
  photoAlt: string;
  hotspots: Hotspot[];
  utmbIndex?: string;
  /* Namespace des legendes d'objets (course80...) : textes specifiques a l'epreuve */
  captionNamespace: string;
};

function Arrow({ direction }: { direction: "right" | "down" }) {
  return (
    <span className="flex h-6 w-6 items-center justify-center rounded-full border border-current">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className={`h-3 w-3 ${direction === "down" ? "rotate-90" : ""}`}
        aria-hidden="true"
      >
        <path
          d="M5 12h14M13 6l6 6-6 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/* Lien d'etiquette : <a> pour les ancres de la page, Link i18n pour les routes */
function HotspotLink({
  href,
  className,
  style,
  children,
}: {
  href: string;
  className: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  if (href.startsWith("#")) {
    return (
      <a href={href} className={className} style={style}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} style={style}>
      {children}
    </Link>
  );
}

/* Echelle du zoom photo */
const ZOOM = 2.2;

/* Part de chaque segment de scroll ou la vue reste posee sur l'objet
   (le reste du segment sert a la transition vers l'objet suivant) */
const DWELL = 0.3;

/*
  Valeurs de transform qui recentrent le point vise au milieu du cadre,
  bornees pour que les bords de la photo n'entrent pas dans le cadre.
  Origine fixe (0,0) : translate/scale s'interpolent donc continument.
*/
function zoomValues(x: number, y: number, scale: number) {
  const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
  return {
    tx: clamp(50 - scale * x, 100 - 100 * scale, 0),
    ty: clamp(50 - scale * y, 100 - 100 * scale, 0),
    s: scale,
  };
}

/*
  Section "L'epreuve" : photo du materiel a plat, epinglee pendant le scroll.
  Le defilement fait voyager le zoom d'un objet a l'autre (facon page produit
  Apple) ; les pilules indiquent le chapitre courant et permettent d'y sauter.
*/
export default function CourseEpreuve({
  trailing,
  photo,
  photoAlt,
  hotspots,
  utmbIndex,
  captionNamespace,
}: Props) {
  const t = useTranslations("course");
  const tCaptions = useTranslations(captionNamespace);
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLElement>(null);
  // Progression affichee, lissee avec inertie derriere la position de scroll :
  // un coup de molette rapide traverse quand meme les objets en un mouvement fluide
  const [progress, setProgress] = useState(0);
  // Si la section depasse la hauteur de l'ecran, on l'epingle par le bas
  // (le haut du titre sort de l'ecran, la photo reste entierement visible)
  const [stickyTop, setStickyTop] = useState(0);

  useEffect(() => {
    // Raideur du rappel : plus grand = suit le scroll de plus pres
    const STIFFNESS = 5;
    // Vitesse max de la progression (part du voyage complet par seconde) :
    // un gros coup de molette traverse les objets a un rythme lisible.
    // La remontee est plus rapide que la descente.
    const MAX_SPEED_DOWN = 0.6;
    const MAX_SPEED_UP = 1.2;
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
    // Molette : tant que la section est epinglee, un geste = un objet.
    // On accumule les deltas (seuil anti-declenchement accidentel) puis on
    // scrolle en douceur jusqu'au palier suivant ; pendant le trajet et le
    // temps de recharge, les evenements (inertie du trackpad) sont avales.
    const WHEEL_THRESHOLD = 100;
    // Recharge apres un pas : plus courte en remontant (retour rapide)
    const WHEEL_COOLDOWN_DOWN = 1200;
    const WHEEL_COOLDOWN_UP = 450;
    let wheelAccum = 0;
    let coolUntil = 0;

    const onWheel = (e: WheelEvent) => {
      const container = containerRef.current;
      const sticky = stickyRef.current;
      if (!container || !sticky) return;
      const stepsCount = hotspots.length + 1;
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
  }, [hotspots.length]);

  // Etapes du voyage : vue d'ensemble puis chaque objet
  const steps = [
    { x: 50, y: 50, s: 1 },
    ...hotspots.map((h) => ({
      x: h.zoom?.x ?? parseFloat(h.left) + 4,
      y: h.zoom?.y ?? parseFloat(h.top) + 12,
      s: ZOOM,
    })),
  ];

  // Position dans les segments : palier (DWELL) a chaque bout, smoothstep entre
  const f = progress * (steps.length - 1);
  const seg = Math.max(0, Math.min(Math.floor(f), steps.length - 2));
  const tSeg = f - seg;
  let eased = 0;
  if (tSeg >= 1 - DWELL) eased = 1;
  else if (tSeg > DWELL) {
    const u = (tSeg - DWELL) / (1 - 2 * DWELL);
    eased = u * u * (3 - 2 * u);
  }
  const a = zoomValues(steps[seg].x, steps[seg].y, steps[seg].s);
  const b = zoomValues(steps[seg + 1].x, steps[seg + 1].y, steps[seg + 1].s);
  const zoomStyle: CSSProperties = {
    transform: `translate(${a.tx + (b.tx - a.tx) * eased}%, ${
      a.ty + (b.ty - a.ty) * eased
    }%) scale(${a.s + (b.s - a.s) * eased})`,
    transformOrigin: "0 0",
  };

  // Etape posee (palier) ou -1 en pleine transition ; pilule en surbrillance = etape la plus proche
  const settled = eased === 0 ? seg : eased === 1 ? seg + 1 : -1;
  const nearest = Math.round(f);
  const active = settled >= 1 ? hotspots[settled - 1] : null;
  // Legende affichee sous l'objet (celle de l'etape la plus proche, pour que
  // le texte soit deja le bon quand il reapparait apres une transition)
  const caption = nearest >= 1 ? hotspots[nearest - 1] : null;

  // Clic sur une pilule : scrolle jusqu'au palier de l'etape (step 0 = vue d'ensemble)
  const scrollToStep = (step: number) => {
    const container = containerRef.current;
    const sticky = stickyRef.current;
    if (!container || !sticky) return;
    const range = container.offsetHeight - sticky.offsetHeight;
    if (range <= 0) return;
    const top =
      window.scrollY +
      container.getBoundingClientRect().top -
      stickyTop +
      range * (step / (steps.length - 1));
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    /* Conteneur haut : la hauteur donne la longueur du voyage au scroll (desktop) */
    <div id="epreuve" ref={containerRef} className="relative sm:h-[400vh]">
      <section
        ref={stickyRef}
        className="overflow-x-clip bg-white pt-16 sm:sticky lg:pt-20"
        style={{ top: stickyTop }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {/* Picto coureur (entrainement.svg, passe en noir par l'en-tete) */}
          <CourseSectionHeading
            icon="/images/icones/entrainement.svg"
            title={t("epreuve")}
            trailing={trailing}
          />
        </div>

        {/* Photo pleine largeur (etiquettes masquees sur petit ecran) */}
        <div className="relative mt-8 w-full overflow-hidden">
          <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[1965/1120]">
            {/* Couche zoomable, pilotee par le scroll */}
            <div
              className="absolute inset-0 will-change-transform"
              style={zoomStyle}
            >
              <Image
                src={photo}
                alt={photoAlt}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>

            {utmbIndex && (
              <UtmbBadge index={utmbIndex} className="absolute right-[5%] top-[10%]" />
            )}

            {/* Chapitres : pilules translucides, indicateur + acces direct */}
            <ul className="absolute left-6 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-start gap-2.5 sm:flex">
              {hotspots
                .map((h, i) => ({ label: t(h.labelKey), step: i + 1 }))
                .map(({ label, step }) => (
                <li key={label}>
                  <button
                    type="button"
                    onClick={() => scrollToStep(step)}
                    className={`rounded-full px-5 py-2.5 text-[14px] font-medium backdrop-blur-xl transition-all duration-300 active:scale-95 ${
                      nearest === step
                        ? "bg-white/90 text-[#1c1c1c] shadow-[0_4px_16px_rgba(0,0,0,0.35)]"
                        : "bg-black/35 text-white/95 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14),0_2px_10px_rgba(0,0,0,0.25)] hover:bg-black/50"
                    }`}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>

            {/* Legende de l'objet (apparait quand la vue est posee) */}
            <div
              className={`absolute bottom-8 left-1/2 z-10 hidden w-[min(88%,600px)] -translate-x-1/2 transition-all duration-300 sm:block ${
                active
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none translate-y-3 opacity-0"
              }`}
            >
              <p className="rounded-2xl bg-black/45 px-7 py-4 text-center text-[15px] font-medium leading-relaxed text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12),0_6px_24px_rgba(0,0,0,0.3)] backdrop-blur-xl">
                {caption && tCaptions(`${caption.labelKey}Text`)}
              </p>
            </div>
          </div>
        </div>

        {/* Mobile : les memes liens, listes sous la photo */}
        <div className="mx-auto flex max-w-7xl flex-wrap gap-3 px-6 pt-5 sm:hidden">
          {hotspots.map((h) => (
            <HotspotLink key={h.labelKey} href={h.href} className="inline-flex">
              <span className="inline-flex items-center gap-2.5 border border-dark-900 px-4 py-2 text-[13px] font-semibold uppercase tracking-[1px] text-dark-900">
                {t(h.labelKey)}
                <Arrow direction={h.direction} />
              </span>
            </HotspotLink>
          ))}
        </div>
      </section>
    </div>
  );
}
