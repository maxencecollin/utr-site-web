"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CourseSectionHeading from "../course/CourseSectionHeading";

gsap.registerPlugin(ScrollTrigger);

/* Memes objets et memes points de zoom que la page du 80 km */
const OBJETS = [
  { cle: "hydratation", x: 20, y: 26 },
  { cle: "parcoursLabel", x: 43, y: 46 },
  { cle: "equipements", x: 19, y: 70 },
  { cle: "entrainementLabel", x: 39, y: 80 },
  { cle: "dossard", x: 70, y: 77 },
];
const ZOOM = 2.2;

/* Translation (en % du cadre) qui centre le point vise, bornee aux bords de la photo */
function cadrage(x: number, y: number, s: number) {
  const borne = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
  return { xPercent: borne(50 - s * x, 100 - 100 * s, 0), yPercent: borne(50 - s * y, 100 - 100 * s, 0), scale: s };
}

/*
  Prototype : l'animation du materiel sur GSAP ScrollTrigger. La section est
  epinglee et le zoom suit la position de defilement (scrub) : aucune capture
  de la molette. Quand on s'arrete, un aimantage doux ramene sur l'objet le
  plus proche.
*/
export default function ProtoMateriel() {
  const t = useTranslations("course");
  const tLegendes = useTranslations("course80");
  const section = useRef<HTMLElement>(null);
  const calque = useRef<HTMLDivElement>(null);
  const [etape, setEtape] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(calque.current, { transformOrigin: "0 0", ...cadrage(50, 50, 1) });
      const tl = gsap.timeline({ defaults: { ease: "power2.inOut", duration: 1 } });
      tl.addLabel("e0").to({}, { duration: 0.35 });
      OBJETS.forEach((o, i) => {
        tl.to(calque.current, cadrage(o.x, o.y, ZOOM)).addLabel(`e${i + 1}`).to({}, { duration: 0.35 });
      });
      const positions = OBJETS.map((_, i) => tl.labels[`e${i + 1}`] / tl.duration());
      ScrollTrigger.create({
        trigger: section.current,
        start: "top top",
        end: `+=${OBJETS.length * 70}%`,
        pin: true,
        scrub: 0.6,
        animation: tl,
        snap: { snapTo: "labels", duration: { min: 0.25, max: 0.7 }, delay: 0.12, ease: "power2.inOut" },
        onUpdate: (st) => {
          const p = st.progress;
          let courant = 0;
          positions.forEach((pos, i) => { if (p >= pos - 0.06) courant = i + 1; });
          setEtape((e) => (e === courant ? e : courant));
        },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  const objet = etape > 0 ? OBJETS[etape - 1] : null;

  return (
    <section ref={section} className="relative flex h-screen flex-col overflow-hidden bg-white pt-24">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <CourseSectionHeading icon="/images/icones/entrainement.svg" title={t("epreuve")} trailing="/ 80 KM" />
      </div>
      <div className="relative mt-6 w-full flex-1 overflow-hidden">
        <div ref={calque} className="absolute inset-0 will-change-transform">
          <Image src="/photos/materiel-course.jpg" alt={t("altMateriel")} fill sizes="100vw" className="object-cover" />
        </div>

        {/* Chapitres : indicateur de l'objet courant */}
        <ul className="absolute left-6 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-start gap-2.5 sm:flex">
          {OBJETS.map((o, i) => (
            <li
              key={o.cle}
              className={`rounded-full px-5 py-2.5 text-[14px] font-medium backdrop-blur-xl transition-all duration-500 ${
                etape === i + 1
                  ? "bg-white/90 text-[#1c1c1c] shadow-[0_4px_16px_rgba(0,0,0,0.35)]"
                  : "bg-black/35 text-white/95"
              }`}
            >
              {t(o.cle)}
            </li>
          ))}
        </ul>

        {/* Legende : fondu enchaine d'un objet a l'autre */}
        <div className="absolute bottom-8 left-1/2 z-10 w-[min(88%,600px)] -translate-x-1/2">
          {OBJETS.map((o) => (
            <p
              key={o.cle}
              className={`absolute inset-x-0 bottom-0 rounded-2xl bg-black/45 px-7 py-4 text-center text-[15px] font-medium leading-relaxed text-white backdrop-blur-xl transition-all duration-500 ${
                objet === o ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
              }`}
              aria-hidden={objet !== o}
            >
              {tLegendes(`${o.cle}Text`)}
            </p>
          ))}
        </div>
        {/* Barre de progression discrete */}
        <div className="absolute bottom-0 left-0 h-[3px] bg-ria-500 transition-[width] duration-300" style={{ width: `${(etape / OBJETS.length) * 100}%` }} />
      </div>
    </section>
  );
}
