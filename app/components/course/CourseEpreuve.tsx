import type { CSSProperties, ReactNode } from "react";
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

/*
  Section "L'epreuve" : photo du materiel a plat, etiquettes cliquables
  posees sur les objets (desktop) ou listees sous la photo (mobile).
*/
export default function CourseEpreuve({
  trailing,
  photo,
  photoAlt,
  hotspots,
  utmbIndex,
}: Props) {
  const t = useTranslations("course");

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
        <div className="relative aspect-[4/3] w-full sm:aspect-[1965/1120]">
          <Image
            src={photo}
            alt={photoAlt}
            fill
            sizes="100vw"
            className="object-cover"
          />

          {utmbIndex && (
            <UtmbBadge index={utmbIndex} className="absolute right-[5%] top-[10%]" />
          )}

          {hotspots.map((h) => (
            <HotspotLink
              key={h.labelKey}
              href={h.href}
              className="group absolute hidden sm:block"
              style={{ left: h.left, top: h.top }}
            >
              {/* Zone de survol genereuse autour de l'objet */}
              <span aria-hidden="true" className="absolute -left-16 -top-14 h-32 w-40" />

              {/* Pastille : seul repere visible au repos */}
              <span aria-hidden="true" className="relative flex h-4 w-4">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/50 [animation-duration:2.2s]" />
                <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-white bg-white/40 backdrop-blur-[2px]" />
              </span>

              {/* Etiquette : apparait en fondu au survol, au-dessus de la pastille */}
              <span className="pointer-events-none absolute bottom-7 left-1/2 -translate-x-1/2 translate-y-1 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                <span className="relative inline-flex items-center gap-2.5 whitespace-nowrap border border-white/60 bg-white/25 px-4 py-2 text-[13px] font-semibold uppercase tracking-[1px] text-white backdrop-blur-[3px]">
                  {t(h.labelKey)}
                  <Arrow direction={h.direction} />
                  {/* Petite pointe vers la pastille */}
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-[7px] left-1/2 h-3.5 w-3.5 -translate-x-1/2 rotate-45 border-b border-r border-white/60 bg-white/10 backdrop-blur-[3px]"
                  />
                </span>
              </span>
            </HotspotLink>
          ))}
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
