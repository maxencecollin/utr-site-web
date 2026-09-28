"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";
import type { TraceSvg } from "./traceGpx";
import { RAVITOS_80 } from "../entrainement/ravitosData";

gsap.registerPlugin(ScrollTrigger);

/* Memes contenus que la section actuelle */
const PRESTATIONS = [
  { cle: "eau", icone: "/images/icones/eau.svg", label: "ravitosEau", desc: "ravitosEauDesc" },
  { cle: "liquide", icone: "/images/icones/boisson-energie.svg", label: "ravitosLiquide", desc: "ravitosLiquideDesc" },
  { cle: "sec", icone: "/images/icones/barre-energie.svg", label: "ravitosSec", desc: "ravitosSecDesc" },
  { cle: "chaud", icone: "/images/icones/plat-chaud.svg", label: "ravitosChaud", desc: "ravitosChaudDesc" },
] as const;
const PRODUITS = [
  { nom: "Energy date bar", icone: "/images/icones/barre-energie-simple.svg", desc: "ravitosProduit1Desc" },
  { nom: "ISO+ isotonic drink", icone: "/images/icones/boisson-energie-simple.svg", desc: "ravitosProduit2Desc" },
] as const;
const SERVICES = [
  { cle: "medical", icone: "/images/icones/fichier-14.svg", label: "ravitosMedical" },
  { cle: "aideExterne", icone: "/images/icones/aide-exterieur.svg", label: "ravitosAideExterne" },
] as const;

/* Badge hexagonal du numero de ravito */
function Numero({ n, plein }: { n: number; plein: boolean }) {
  return (
    <span className={`font-comico relative inline-flex h-8 w-8 shrink-0 items-center justify-center text-[15px] ${plein ? "text-[#1c3d1c]" : "text-white"}`}>
      <svg viewBox="0 0 40 40" aria-hidden="true" className="absolute inset-0 h-full w-full">
        <polygon points="20,2 36,11 36,29 20,38 4,29 4,11" fill={plein ? "#fff" : "none"} stroke="#fff" strokeWidth="2.5" />
      </svg>
      <span className="relative">{n}</span>
    </span>
  );
}

/* Place les etiquettes kilometriques sans qu'elles se chevauchent : chacune
   essaie droite, gauche, dessous puis dessus et garde la premiere place libre */
type Boite = { x: number; y: number; l: number; h: number };
function placerEtiquettes(reperes: TraceSvg["reperes"]) {
  const H = 28;
  const prises: Boite[] = reperes.map((r) => ({ x: r.x - 10, y: r.y - 10, l: 20, h: 20 }));
  const chevauche = (a: Boite, b: Boite) => a.x < b.x + b.l && b.x < a.x + a.l && a.y < b.y + b.h && b.y < a.y + a.h;
  return reperes.map((r) => {
    const L = r.km >= 10 ? 76 : 64;
    const essais = [
      { dx: 16, dy: -14 },
      { dx: -16 - L, dy: -14 },
      { dx: -L / 2, dy: 16 },
      { dx: -L / 2, dy: -16 - H },
    ];
    const choix =
      essais.find(({ dx, dy }) => !prises.some((b) => chevauche({ x: r.x + dx, y: r.y + dy, l: L, h: H }, b))) ?? essais[0];
    prises.push({ x: r.x + choix.dx, y: r.y + choix.dy, l: L, h: H });
    return { ...choix, L };
  });
}

const Pointilles = () => (
  <span className="block h-[2px] bg-[repeating-linear-gradient(90deg,#ffffff_0,#ffffff_9px,transparent_9px,transparent_17px)] opacity-50" />
);

/*
  Prototype : les ravitos pilotes par le defilement, sans capture de molette.
  Le trace reel du 80 km (GPX) se dessine au fil du scroll, un point de
  coureur avance dessus, chaque ravito s'allume au passage, le compteur de
  kilometres defile en continu et le panneau affiche le detail du dernier
  ravito atteint. Aimantage doux sur chaque ravito a l'arret.
*/
export default function ProtoRavitos({ trace }: { trace: TraceSvg }) {
  const t = useTranslations("entrainementPage");
  const section = useRef<HTMLElement>(null);
  const chemin = useRef<SVGPathElement>(null);
  const coureur = useRef<SVGGElement>(null);
  const compteur = useRef<HTMLSpanElement>(null);
  const reperes = useRef<(SVGGElement | null)[]>([]);
  const declencheur = useRef<ScrollTrigger | null>(null);
  const [courant, setCourant] = useState(-1);
  const etiquettes = useMemo(() => placerEtiquettes(trace.reperes), [trace]);

  useEffect(() => {
    const path = chemin.current!;
    const longueur = path.getTotalLength();
    path.style.strokeDasharray = `${longueur}`;
    path.style.strokeDashoffset = `${longueur}`;
    const paliers = [0, ...trace.reperes.map((r) => r.fraction), 1];

    const maj = (p: number) => {
      path.style.strokeDashoffset = `${longueur * (1 - p)}`;
      const pt = path.getPointAtLength(longueur * p);
      coureur.current?.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
      if (compteur.current) compteur.current.textContent = `${Math.round(p * 80)}`;
      let c = -1;
      trace.reperes.forEach((r, i) => { if (p >= r.fraction - 0.004) c = i; });
      reperes.current.forEach((g, i) => {
        g?.classList.toggle("atteint", i <= c);
        g?.classList.toggle("courant", i === c);
      });
      setCourant((x) => (x === c ? x : c));
    };

    const ctx = gsap.context(() => {
      declencheur.current = ScrollTrigger.create({
        trigger: section.current,
        start: "top top",
        end: `+=${(trace.reperes.length + 1) * 60}%`,
        pin: true,
        scrub: 0.8,
        snap: { snapTo: paliers, duration: { min: 0.3, max: 0.9 }, delay: 0.12, ease: "power2.inOut" },
        onUpdate: (st) => maj(st.progress),
      });
      maj(0);
    }, section);
    return () => ctx.revert();
  }, [trace]);

  /* Clic sur un ravito de la liste : on defile jusqu'a lui */
  const allerAu = (i: number) => {
    const st = declencheur.current;
    if (!st) return;
    const cible = st.start + (st.end - st.start) * trace.reperes[i].fraction;
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (lenis) lenis.scrollTo(cible, { duration: 1.2 });
    else window.scrollTo({ top: cible, behavior: "smooth" });
  };

  const ravito = courant >= 0 ? RAVITOS_80[courant] : null;

  return (
    <section ref={section} className="relative isolate h-screen overflow-hidden text-white">
      <Image src="/photos/fond-vert-flou.jpg" alt="" fill sizes="100vw" className="-z-20 object-cover" />
      <div className="absolute inset-0 -z-10 bg-[#17321a]/55" />

      <div className="mx-auto grid h-full max-w-7xl grid-cols-1 items-center gap-8 px-6 pt-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:px-10">
        {/* ---------- Panneau ---------- */}
        <div className="max-w-[560px]">
          <h2 className="titre text-2xl sm:text-3xl">{t("ravitosTitle")}</h2>
          <span className="mt-3 block h-[2px] bg-[repeating-linear-gradient(90deg,#ffffff_0,#ffffff_11px,transparent_11px,transparent_20px)] opacity-80" />

          {/* Compteur continu + ravito atteint */}
          <div className="mt-5 flex flex-wrap items-end gap-x-6 gap-y-2">
            <p className="flex items-baseline gap-2">
              <span ref={compteur} className="titre text-6xl tabular-nums sm:text-7xl">0</span>
              <span className="titre text-2xl">KM</span>
            </p>
            <div className={`pb-2 transition-opacity duration-500 ${ravito ? "opacity-100" : "opacity-0"}`}>
              <p className="flex items-center gap-2.5">
                <Numero n={courant + 1} plein />
                <span className="titre text-[17px]">
                  {ravito ? `${ravito.km} KM` : ""}
                  {ravito?.mentionKey ? <span className="text-[0.75em]"> / {t(ravito.mentionKey)}</span> : null}
                </span>
              </p>
              <p className="mt-1.5 flex items-center gap-2 text-[12px] uppercase italic tracking-wide text-white/80">
                <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                {t("ravitosArriveeMax")} : {ravito?.arriveeMax ?? t("ravitosAConfirmer")}
              </p>
            </div>
          </div>

          {/* Detail : fondu enchaine d'un ravito a l'autre */}
          <div className="relative mt-5">
            <p className={`text-[15px] leading-[1.55] text-white/85 transition-opacity duration-500 ${ravito ? "absolute inset-x-0 top-0 opacity-0" : "opacity-100"}`}>
              {t("ravitosIntro")}
            </p>
            <div className={`transition-all duration-500 ${ravito ? "translate-y-0 opacity-100" : "pointer-events-none absolute inset-x-0 top-0 translate-y-3 opacity-0"}`}>
              <span className="block h-px bg-white/40" />
              <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3">
                {PRESTATIONS.map((p) => (
                  <li key={p.cle} className="flex items-start gap-3">
                    <Image src={p.icone} alt="" width={40} height={40} className="h-8 w-auto shrink-0 brightness-0 invert" />
                    <div>
                      <p className="text-[13px] font-bold uppercase">{t(p.label)}</p>
                      <p className="text-[12px] leading-[1.35] text-white/80">{t(p.desc)}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-4"><Pointilles /></div>
              <ul className="mt-4 grid grid-cols-2 gap-x-6">
                {PRODUITS.map((p) => (
                  <li key={p.nom} className="flex items-start gap-3">
                    <Image src={p.icone} alt="" width={36} height={40} className="h-8 w-auto shrink-0 brightness-0 invert" />
                    <div>
                      <p className="text-[13px] font-bold uppercase leading-[1.2]">{p.nom}</p>
                      <p className="mt-0.5 flex items-center gap-2 text-[12px] text-white/80">
                        {t(p.desc)}
                        <Image src="/images/partenaires/decathlon.svg" alt="Decathlon" width={313} height={203} className="h-3 w-auto brightness-0 invert" />
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-4"><Pointilles /></div>
              <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
                {SERVICES.map((s) => (
                  <li key={s.cle} className="flex items-center gap-3">
                    <Image src={s.icone} alt="" width={36} height={36} className="h-8 w-auto shrink-0 brightness-0 invert" />
                    <span className="text-[12px] font-bold uppercase leading-[1.2]">{t(s.label)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tous les ravitos, cliquables */}
          <div className="mt-6 border-t border-white/35 pt-4">
            <p className="text-[11px] uppercase tracking-[2px] text-white/70">{t("ravitosSuivants")}</p>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {RAVITOS_80.map((r, i) => (
                <li key={r.km}>
                  <button type="button" onClick={() => allerAu(i)} className={`flex items-center gap-2 transition-opacity ${i === courant ? "opacity-100" : "opacity-60 hover:opacity-100"}`}>
                    <Numero n={i + 1} plein={i === courant} />
                    <span className="titre text-[15px]">{r.km} KM</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ---------- Carte : trace reel qui se dessine ---------- */}
        <svg viewBox={`0 0 ${trace.largeur} ${trace.hauteur}`} className="mx-auto max-h-[80vh] w-full max-w-[720px] overflow-visible" role="img" aria-label={t("ravitosMapAlt")}>
          <defs>
            <filter id="craie" x="-5%" y="-5%" width="110%" height="110%">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="bruit" />
              <feDisplacementMap in="SourceGraphic" in2="bruit" scale="2.2" />
            </filter>
          </defs>
          <path d={trace.d} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <path ref={chemin} d={trace.d} fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" filter="url(#craie)" />
          {trace.reperes.map((r, i) => (
            <g key={r.km} ref={(el) => { reperes.current[i] = el; }} className="repere-ravito" transform={`translate(${r.x} ${r.y})`}>
              <circle r="16" className="halo" />
              <circle r="8" className="point" />
              {/* Etiquette : pastille sombre, blanche pour le ravito courant */}
              <g transform={`translate(${etiquettes[i].dx} ${etiquettes[i].dy})`}>
                <rect className="fond" x="0" y="0" rx="4" width={etiquettes[i].L} height="28" />
                <text x="9" y="20" className="titre etiquette">{r.km} KM</text>
              </g>
            </g>
          ))}
          <g ref={coureur}>
            <circle r="13" fill="#0781dd" opacity="0.35" />
            <circle r="7" fill="#0781dd" stroke="#fff" strokeWidth="2.5" />
          </g>
        </svg>
      </div>

      <style>{`
        .repere-ravito .point { fill: #17321a; stroke: rgba(255,255,255,.75); stroke-width: 2.5; transition: all .4s; }
        .repere-ravito .halo { fill: #fff; opacity: 0; transition: opacity .4s; }
        .repere-ravito .fond { fill: rgba(10,30,14,.72); stroke: rgba(255,255,255,.35); stroke-width: 1; transition: fill .4s; }
        .repere-ravito .etiquette { fill: #fff; font-size: 19px; transition: fill .4s; }
        .repere-ravito.atteint .point { fill: #fff; stroke: #fff; }
        .repere-ravito.courant .halo { opacity: .28; animation: pouls 1.8s ease-out infinite; }
        .repere-ravito.courant .fond { fill: #fff; stroke: #fff; }
        .repere-ravito.courant .etiquette { fill: #1c3d1c; }
        @keyframes pouls { 0% { transform: scale(.6); opacity: .45; } 100% { transform: scale(1.6); opacity: 0; } }
        @media (prefers-reduced-motion: reduce) { .repere-ravito.courant .halo { animation: none; } }
      `}</style>
    </section>
  );
}
