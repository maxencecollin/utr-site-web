"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { defilerVers } from "../Defilement";
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

gsap.registerPlugin(ScrollTrigger);

/* Echelle du zoom photo */
const ZOOM = 2.2;

/* A partir de sm, la section est epinglee et pilotee par le defilement */
const GRAND_ECRAN = "(min-width: 640px)";

/*
  Translation (en % du cadre) qui recentre le point vise, bornee pour que les
  bords de la photo n'entrent pas dans le cadre. Origine fixe (0,0).
*/
function cadrage(x: number, y: number, scale: number) {
  const borne = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
  return {
    xPercent: borne(50 - scale * x, 100 - 100 * scale, 0),
    yPercent: borne(50 - scale * y, 100 - 100 * scale, 0),
    scale,
  };
}

/*
  Section "L'epreuve" : photo du materiel a plat, epinglee pendant le defilement.
  Le zoom voyage d'un objet a l'autre en suivant la position de defilement
  (GSAP ScrollTrigger, facon page produit Apple) : la molette n'est jamais
  interceptee ni corrigee, la page s'arrete exactement ou on la laisse.
  Une courte pause sur le dernier objet precede la section suivante.
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
  const section = useRef<HTMLElement>(null);
  const calque = useRef<HTMLDivElement>(null);
  const declencheur = useRef<ScrollTrigger | null>(null);
  const labels = useRef<number[]>([]);
  // 0 = vue d'ensemble, i = objet i
  const [etape, setEtape] = useState(0);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(GRAND_ECRAN, () => {
      gsap.set(calque.current, { transformOrigin: "0 0", ...cadrage(50, 50, 1) });
      const tl = gsap.timeline({ defaults: { ease: "power2.inOut", duration: 1 } });
      tl.addLabel("e0").to({}, { duration: 0.35 });
      hotspots.forEach((h, i) => {
        const x = h.zoom?.x ?? parseFloat(h.left) + 4;
        const y = h.zoom?.y ?? parseFloat(h.top) + 12;
        tl.to(calque.current, cadrage(x, y, ZOOM)).addLabel(`e${i + 1}`).to({}, { duration: 0.35 });
      });
      // Pause sur le dernier objet avant la section suivante
      tl.to({}, { duration: 0.8 });
      const total = tl.duration();
      labels.current = hotspots.map((_, i) => tl.labels[`e${i + 1}`] / total);
      declencheur.current = ScrollTrigger.create({
        trigger: section.current,
        start: "top top",
        // 30 % d'ecran de defilement par objet : la section ne retient pas la
        // page trop longtemps
        end: `+=${(hotspots.length + 1) * 30}%`,
        pin: true,
        // Le <body> est en flex : ScrollTrigger y desactive par defaut la reserve
        // d'espace, et la suite de la page remonterait par-dessus la section
        pinSpacing: true,
        scrub: 0.6,
        animation: tl,
        onUpdate: (st) => {
          let courant = 0;
          labels.current.forEach((pos, i) => { if (st.progress >= pos - 0.06) courant = i + 1; });
          setEtape((e) => (e === courant ? e : courant));
        },
      });
      return () => {
        declencheur.current = null;
      };
    });
    return () => mm.revert();
  }, [hotspots]);

  /* Clic sur une pilule : defilement jusqu'a l'objet */
  const allerA = (i: number) => {
    const st = declencheur.current;
    if (st) defilerVers(st.start + (st.end - st.start) * labels.current[i]);
  };

  const objet = etape > 0 ? hotspots[etape - 1] : null;

  return (
    /* Enveloppe geree par React : GSAP insere son conteneur d'epinglage entre
       elle et la section. Au changement de page, React ne retire que
       l'enveloppe, dont le parent n'a pas bouge (sinon erreur removeChild). */
    <div>
      <section id="epreuve" ref={section} className="overflow-x-clip bg-white pt-16 sm:flex sm:h-screen sm:flex-col sm:pt-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          {/* Picto coureur (entrainement.svg, passe en noir par l'en-tete) */}
          <CourseSectionHeading icon="/images/icones/entrainement.svg" title={t("epreuve")} trailing={trailing} />
        </div>

        {/* Photo pleine largeur (etiquettes masquees sur petit ecran) */}
        <div className="relative mt-8 w-full overflow-hidden sm:mt-6 sm:flex-1">
          <div className="relative aspect-[4/3] w-full overflow-hidden sm:absolute sm:inset-0 sm:aspect-auto">
            {/* Couche zoomable, pilotee par le defilement */}
            <div ref={calque} className="absolute inset-0 will-change-transform">
              <Image src={photo} alt={photoAlt} fill sizes="100vw" className="object-cover" />
            </div>

            {utmbIndex && <UtmbBadge index={utmbIndex} className="absolute right-[5%] top-[10%]" />}

            {/* Chapitres : pilules translucides, indicateur + acces direct */}
            <ul className="absolute left-6 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-start gap-2.5 sm:flex">
              {hotspots.map((h, i) => (
                <li key={h.labelKey}>
                  <button
                    type="button"
                    onClick={() => allerA(i)}
                    className={`rounded-full px-5 py-2.5 text-[14px] font-medium backdrop-blur-xl transition-all duration-500 active:scale-95 ${
                      etape === i + 1
                        ? "bg-white/90 text-[#1c1c1c] shadow-[0_4px_16px_rgba(0,0,0,0.35)]"
                        : "bg-black/35 text-white/95 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14),0_2px_10px_rgba(0,0,0,0.25)] hover:bg-black/50"
                    }`}
                  >
                    {t(h.labelKey)}
                  </button>
                </li>
              ))}
            </ul>

            {/* Legendes : fondu enchaine d'un objet a l'autre */}
            <div className="absolute bottom-8 left-1/2 z-10 hidden w-[min(88%,600px)] -translate-x-1/2 sm:block">
              {hotspots.map((h) => (
                <p
                  key={h.labelKey}
                  aria-hidden={objet !== h}
                  className={`absolute inset-x-0 bottom-0 rounded-2xl bg-black/45 px-7 py-4 text-center text-[15px] font-medium leading-relaxed text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12),0_6px_24px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all duration-500 ${
                    objet === h ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
                  }`}
                >
                  {tCaptions(`${h.labelKey}Text`)}
                </p>
              ))}
            </div>

            {/* Progression discrete */}
            <div
              className="absolute bottom-0 left-0 z-10 hidden h-[3px] bg-ria-500 transition-[width] duration-300 sm:block"
              style={{ width: `${(etape / hotspots.length) * 100}%` }}
            />
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
