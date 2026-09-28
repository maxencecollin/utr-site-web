"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { TraceSvg } from "./traceGpx";
import { RAVITOS_80 } from "../entrainement/ravitosData";

gsap.registerPlugin(ScrollTrigger);

const PRESTATIONS = [
  { icone: "/images/icones/eau.svg", label: "ravitosEau" },
  { icone: "/images/icones/boisson-energie.svg", label: "ravitosLiquide" },
  { icone: "/images/icones/barre-energie.svg", label: "ravitosSec" },
  { icone: "/images/icones/plat-chaud.svg", label: "ravitosChaud" },
  { icone: "/images/icones/fichier-14.svg", label: "ravitosMedical" },
  { icone: "/images/icones/aide-exterieur.svg", label: "ravitosAideExterne" },
];

/*
  Prototype : les ravitos pilotes par le defilement, sans capture de molette.
  Le trace reel du 80 km (GPX) se dessine au fil du scroll, un point de
  coureur avance dessus, chaque ravito s'allume au passage et le compteur de
  kilometres defile en continu. Aimantage doux sur chaque ravito a l'arret.
*/
export default function ProtoRavitos({ trace }: { trace: TraceSvg }) {
  const t = useTranslations("entrainementPage");
  const section = useRef<HTMLElement>(null);
  const chemin = useRef<SVGPathElement>(null);
  const coureur = useRef<SVGGElement>(null);
  const compteur = useRef<HTMLSpanElement>(null);
  const reperes = useRef<(SVGGElement | null)[]>([]);
  const [courant, setCourant] = useState(-1);

  useEffect(() => {
    const path = chemin.current!;
    const longueur = path.getTotalLength();
    path.style.strokeDasharray = `${longueur}`;
    path.style.strokeDashoffset = `${longueur}`;
    // Paliers d'aimantage : depart, chaque ravito, arrivee
    const paliers = [0, ...trace.reperes.map((r) => r.fraction), 1];

    const maj = (p: number) => {
      path.style.strokeDashoffset = `${longueur * (1 - p)}`;
      const pt = path.getPointAtLength(longueur * p);
      coureur.current?.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
      if (compteur.current) compteur.current.textContent = `${Math.round(p * 80)}`;
      let c = -1;
      trace.reperes.forEach((r, i) => {
        const atteint = p >= r.fraction - 0.004;
        reperes.current[i]?.classList.toggle("atteint", atteint);
        if (atteint) c = i;
      });
      setCourant((x) => (x === c ? x : c));
    };

    const ctx = gsap.context(() => {
      const etat = { p: 0 };
      ScrollTrigger.create({
        trigger: section.current,
        start: "top top",
        end: `+=${(trace.reperes.length + 1) * 60}%`,
        pin: true,
        scrub: 0.8,
        snap: { snapTo: paliers, duration: { min: 0.3, max: 0.9 }, delay: 0.12, ease: "power2.inOut" },
        onUpdate: (st) => { etat.p = st.progress; maj(st.progress); },
      });
      maj(0);
    }, section);
    return () => ctx.revert();
  }, [trace]);

  const ravito = courant >= 0 ? RAVITOS_80[courant] : null;

  return (
    <section ref={section} className="relative isolate h-screen overflow-hidden text-white">
      <Image src="/photos/fond-vert-flou.jpg" alt="" fill sizes="100vw" className="-z-20 object-cover" />
      <div className="absolute inset-0 -z-10 bg-[#17321a]/55" />

      <div className="mx-auto grid h-full max-w-7xl grid-cols-1 items-center gap-10 px-6 pt-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:px-10">
        {/* Panneau : compteur continu, puis le detail du dernier ravito atteint */}
        <div>
          <h2 className="titre text-2xl sm:text-3xl">{t("ravitosTitle")}</h2>
          <span className="mt-4 block h-[2px] max-w-md bg-[repeating-linear-gradient(90deg,#ffffff_0,#ffffff_11px,transparent_11px,transparent_20px)] opacity-80" />
          <p className="mt-8 flex items-baseline gap-3">
            <span ref={compteur} className="titre text-7xl tabular-nums sm:text-8xl">0</span>
            <span className="titre text-3xl">KM</span>
          </p>
          <div className="relative mt-6 min-h-[220px]">
            {RAVITOS_80.map((r, i) => (
              <div
                key={r.km}
                aria-hidden={courant !== i}
                className={`absolute inset-0 transition-all duration-500 ${courant === i ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
              >
                <p className="text-[13px] uppercase tracking-[3px] text-white/75">
                  Ravito {i + 1} · {r.km} km{r.mentionKey ? ` · ${t(r.mentionKey)}` : ""}
                </p>
                <ul className="mt-4 grid max-w-md grid-cols-2 gap-x-6 gap-y-3">
                  {PRESTATIONS.map((pr) => (
                    <li key={pr.label} className="flex items-center gap-3 text-[14px] font-semibold uppercase">
                      <Image src={pr.icone} alt="" width={32} height={32} className="h-8 w-auto brightness-0 invert" />
                      {t(pr.label)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <p className={`absolute inset-0 text-[15px] text-white/80 transition-opacity duration-500 ${ravito ? "opacity-0" : "opacity-100"}`}>
              {t("ravitosIntro")}
            </p>
          </div>
        </div>

        {/* Carte : trace reel qui se dessine */}
        <svg viewBox={`0 0 ${trace.largeur} ${trace.hauteur}`} className="mx-auto max-h-[82vh] w-full max-w-[720px] overflow-visible" role="img" aria-label={t("ravitosMapAlt")}>
          <defs>
            <filter id="craie" x="-5%" y="-5%" width="110%" height="110%">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="bruit" />
              <feDisplacementMap in="SourceGraphic" in2="bruit" scale="2.2" />
            </filter>
          </defs>
          {/* Trace complet, en filigrane */}
          <path d={trace.d} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Portion parcourue : se dessine au fil du defilement */}
          <path ref={chemin} d={trace.d} fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" filter="url(#craie)" />
          {trace.reperes.map((r, i) => (
            <g key={r.km} ref={(el) => { reperes.current[i] = el; }} className="repere-ravito" transform={`translate(${r.x} ${r.y})`}>
              <circle r="9" className="halo" />
              <circle r="6" className="point" />
              <text x="14" y="5" className="titre etiquette">{r.km} KM</text>
            </g>
          ))}
          <g ref={coureur}>
            <circle r="12" fill="#0781dd" opacity="0.35" />
            <circle r="6.5" fill="#0781dd" stroke="#fff" strokeWidth="2.5" />
          </g>
        </svg>
      </div>

      <style>{`
        .repere-ravito .point { fill: transparent; stroke: rgba(255,255,255,.55); stroke-width: 2; transition: all .4s; }
        .repere-ravito .halo { fill: #fff; opacity: 0; transform-origin: center; transition: opacity .4s; }
        .repere-ravito .etiquette { fill: rgba(255,255,255,.6); font-size: 15px; transition: fill .4s; }
        .repere-ravito.atteint .point { fill: #fff; stroke: #fff; }
        .repere-ravito.atteint .halo { opacity: .25; }
        .repere-ravito.atteint .etiquette { fill: #fff; }
      `}</style>
    </section>
  );
}
