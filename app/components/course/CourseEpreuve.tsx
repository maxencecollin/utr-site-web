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
}: Props) {
  const t = useTranslations("course");
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLElement>(null);
  // Progression 0..1 dans le conteneur de scroll (0 sur mobile : pas de sticky)
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const container = containerRef.current;
        const sticky = stickyRef.current;
        if (!container || !sticky) return;
        const range = container.offsetHeight - sticky.offsetHeight;
        const y = -container.getBoundingClientRect().top;
        setProgress(range > 0 ? Math.min(1, Math.max(0, y / range)) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

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
  const seg = Math.min(Math.floor(f), steps.length - 2);
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

  // Clic sur une pilule : scrolle jusqu'au palier de l'etape (step 0 = vue d'ensemble)
  const scrollToStep = (step: number) => {
    const container = containerRef.current;
    const sticky = stickyRef.current;
    if (!container || !sticky) return;
    const range = container.offsetHeight - sticky.offsetHeight;
    if (range <= 0) return;
    const top =
      window.scrollY +
      container.getBoundingClientRect().top +
      range * (step / (steps.length - 1));
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    /* Conteneur haut : la hauteur donne la longueur du voyage au scroll (desktop) */
    <div id="epreuve" ref={containerRef} className="relative sm:h-[400vh]">
      <section
        ref={stickyRef}
        className="overflow-x-clip bg-white pt-16 sm:sticky sm:top-0 lg:pt-20"
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
              {[
                { label: t("vueEnsemble"), step: 0 },
                ...hotspots.map((h, i) => ({ label: t(h.labelKey), step: i + 1 })),
              ].map(({ label, step }) => (
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

            {/* Lien vers la page liee a l'objet (apparait quand la vue est posee) */}
            <div
              className={`absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 transition-all duration-300 sm:block ${
                active
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none translate-y-3 opacity-0"
              }`}
            >
              <HotspotLink
                href={active?.href ?? "#"}
                className="group inline-flex items-center gap-3 rounded-full bg-white/90 px-7 py-3.5 text-[16px] font-medium text-[#1c1c1c] shadow-[0_6px_24px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-colors hover:bg-white"
              >
                {t("enSavoirPlus")}
                {active && <Arrow direction={active.direction} />}
              </HotspotLink>
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
