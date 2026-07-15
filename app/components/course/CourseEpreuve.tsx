"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
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

/* Echelle du zoom photo (clic sur un chapitre) */
const ZOOM = 2.2;

/*
  Recentre le point vise au milieu du cadre, borne pour que les bords de la
  photo n'entrent pas dans le cadre. Origine fixe (0,0) : seul translate/scale
  change d'un etat a l'autre, l'animation est donc continue entre deux objets.
*/
function zoomTransform(x: number, y: number, scale: number) {
  const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
  const tx = clamp(50 - scale * x, 100 - 100 * scale, 0);
  const ty = clamp(50 - scale * y, 100 - 100 * scale, 0);
  return {
    transform: `translate(${tx}%, ${ty}%) scale(${scale})`,
    transformOrigin: "0 0",
  };
}

/*
  Section "L'epreuve" : photo du materiel a plat. Chapitres a gauche :
  un clic zoome la photo sur l'objet (facon page produit Apple).
  Les pastilles sur les objets restent les liens de navigation.
*/
export default function CourseEpreuve({
  trailing,
  photo,
  photoAlt,
  hotspots,
  utmbIndex,
}: Props) {
  const t = useTranslations("course");
  // Index du chapitre zoome (-1 = vue d'ensemble)
  const [zoomed, setZoomed] = useState(-1);

  const active = zoomed >= 0 ? hotspots[zoomed] : null;
  // Cible du zoom : centre de l'objet si fourni, sinon deduit de l'ancre de l'etiquette
  const zoomStyle = active
    ? zoomTransform(
        active.zoom?.x ?? parseFloat(active.left) + 4,
        active.zoom?.y ?? parseFloat(active.top) + 12,
        ZOOM,
      )
    : zoomTransform(50, 50, 1);

  return (
    <section id="epreuve" className="overflow-x-clip bg-white pt-16 lg:pt-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Picto coureur (entrainement.svg, passe en noir par l'en-tete) */}
        <CourseSectionHeading
          icon="/images/icones/entrainement.svg"
          title={t("epreuve")}
          trailing={trailing}
        />
      </div>

      {/* Photo pleine largeur avec les etiquettes (masquees sur petit ecran) */}
      <div className="relative mt-8 w-full overflow-hidden">
        <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[1965/1120]">
          {/* Couche zoomable (les chapitres pilotent le zoom) */}
          <div
            className="absolute inset-0 transition-transform duration-[1100ms] will-change-transform [transition-timing-function:cubic-bezier(0.32,0.72,0.24,1)]"
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

          {/* Chapitres (facon page produit Apple) : pilules translucides, zoom au clic */}
          <ul className="absolute left-6 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-start gap-2.5 sm:flex">
            {[{ label: t("vueEnsemble"), index: -1 }, ...hotspots.map((h, i) => ({ label: t(h.labelKey), index: i }))].map(
              ({ label, index }) => (
                <li key={label}>
                  <button
                    type="button"
                    onClick={() => setZoomed(zoomed === index && index !== -1 ? -1 : index)}
                    className={`rounded-full px-5 py-2.5 text-[14px] font-medium backdrop-blur-xl transition-all duration-300 active:scale-95 ${
                      zoomed === index
                        ? "bg-white/90 text-[#1c1c1c] shadow-[0_4px_16px_rgba(0,0,0,0.35)]"
                        : "bg-black/35 text-white/95 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14),0_2px_10px_rgba(0,0,0,0.25)] hover:bg-black/50"
                    }`}
                  >
                    {label}
                  </button>
                </li>
              ),
            )}
          </ul>

          {/* Lien vers la page liee a l'objet zoome (apparait une fois le zoom pose) */}
          <div
            className={`absolute bottom-6 right-6 z-10 hidden transition-all duration-300 sm:block ${
              active
                ? "translate-y-0 opacity-100 delay-700"
                : "pointer-events-none translate-y-2 opacity-0"
            }`}
          >
            <HotspotLink
              href={active?.href ?? "#"}
              className="group inline-flex items-center gap-2.5 rounded-full bg-white/90 px-5 py-2.5 text-[14px] font-medium text-[#1c1c1c] shadow-[0_4px_16px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-colors hover:bg-white"
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
  );
}
