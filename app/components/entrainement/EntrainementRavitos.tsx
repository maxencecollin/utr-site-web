"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { defilerVers } from "../Defilement";
import { EPREUVES } from "./ravitosData";
import type { TraceSvg } from "./traceGpx";

gsap.registerPlugin(ScrollTrigger);

/* Partenaire qui fournit la prestation, logo affiche a cote de la description */
const PLANCOET = { nom: "Plancoët", src: "/images/partenaires/plancoet.svg", w: 216, h: 101, classe: "h-7" };
const DECATHLON = { nom: "Decathlon", src: "/images/partenaires/decathlon.svg", w: 313, h: 203, classe: "h-5" };

/* Eau : exclusivite Plancoet. Boisson et energie : Decathlon. Sec : achats
   en supermarche, sans partenaire. Gels non annonces tant qu'ils ne sont pas
   confirmes. */
const PRESTATIONS = [
  { cle: "eau", icone: "/images/icones/eau.svg", label: "ravitosEau", desc: "ravitosEauDesc", partenaire: PLANCOET },
  { cle: "liquide", icone: "/images/icones/boisson-energie.svg", label: "ravitosLiquide", desc: "ravitosLiquideDesc", partenaire: DECATHLON },
  { cle: "energie", icone: "/images/icones/barre-energie.svg", label: "ravitosEnergie", desc: "ravitosEnergieDesc", partenaire: DECATHLON },
  { cle: "sec", icone: "/images/icones/barre-energie-simple.svg", label: "ravitosSec", desc: "ravitosSecDesc", partenaire: null },
] as const;
const SERVICES = [
  { cle: "aideExterne", icone: "/images/icones/aide-exterieur.svg", label: "ravitosAideExterne" },
  { cle: "toilettes", icone: "/images/icones/toilettes.svg", label: "ravitosToilettes" },
] as const;

/* Grand ecran : section epinglee et pilotee par le defilement */
const GRAND_ECRAN = "(min-width: 1024px)";

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

const Pointilles = () => (
  <span className="block h-[2px] bg-[repeating-linear-gradient(90deg,#ffffff_0,#ffffff_9px,transparent_9px,transparent_17px)] opacity-50" />
);

/* Points du trace (lus dans son "d") et part du trace atteinte a chacun */
function lirePoints(d: string) {
  const points = d.slice(1).split("L");
  const xy = points.map((p) => p.split(" ").map(Number));
  const cumul = [0];
  for (let i = 1; i < xy.length; i++)
    cumul.push(cumul[i - 1] + Math.hypot(xy[i][0] - xy[i - 1][0], xy[i][1] - xy[i - 1][1]));
  const total = cumul[cumul.length - 1];
  return { points, xy, parts: cumul.map((c) => c / total) };
}

/* Etiquettes kilometriques sans chevauchement : chacune essaie droite, gauche,
   dessous puis dessus et garde la premiere place libre */
type Boite = { x: number; y: number; l: number; h: number };
function placerEtiquettes(trace: TraceSvg) {
  const H = 28;
  const prises: Boite[] = [
    ...trace.reperes.map((r) => ({ x: r.x - 10, y: r.y - 10, l: 20, h: 20 })),
    { x: trace.debut.x - 10, y: trace.debut.y - 10, l: 20, h: 20 },
  ];
  const chevauche = (a: Boite, b: Boite) => a.x < b.x + b.l && b.x < a.x + a.l && a.y < b.y + b.h && b.y < a.y + a.h;
  return trace.reperes.map((r) => {
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

/*
  Section "Les ravitos".

  Grand ecran : la section est epinglee et suit le defilement (GSAP
  ScrollTrigger, sans capture de la molette). Le trace reel de l'epreuve, lu
  dans son GPX, se dessine au fil du scroll ; un point de coureur avance, chaque
  ravito s'allume au passage, le compteur de kilometres defile en continu et le
  panneau affiche le dernier ravito atteint.

  Petit ecran : pas d'epinglage, le trace est affiche en entier et on choisit
  un ravito dans la liste.
*/
export default function EntrainementRavitos({ traces }: { traces: TraceSvg[] }) {
  const t = useTranslations("entrainementPage");
  const [indexEpreuve, setIndexEpreuve] = useState(0);
  const epreuve = EPREUVES[indexEpreuve];
  const trace = traces[indexEpreuve];
  const ravitos = epreuve.ravitos;

  const section = useRef<HTMLElement>(null);
  const chemin = useRef<SVGPathElement>(null);
  const coureur = useRef<SVGGElement>(null);
  const compteur = useRef<HTMLSpanElement>(null);
  const reperes = useRef<(SVGGElement | null)[]>([]);
  const declencheur = useRef<ScrollTrigger | null>(null);
  const [courant, setCourant] = useState(-1);
  const [epingle, setEpingle] = useState(false);
  const etiquettes = useMemo(() => placerEtiquettes(trace), [trace]);
  const geometrie = useMemo(() => lirePoints(trace.d), [trace]);

  /* Debut du trace jusqu'a la part p, et point atteint. Le trait est redessine
     plutot que masque par des pointilles : Safari rend mal les pointilles sur
     un trace de plusieurs milliers de points (morceaux blancs un peu partout). */
  const parcelle = (p: number) => {
    const { points, xy, parts } = geometrie;
    let bas = 1;
    let haut = parts.length - 1;
    while (bas < haut) {
      const m = (bas + haut) >> 1;
      if (parts[m] < p) bas = m + 1;
      else haut = m;
    }
    const [x0, y0] = xy[bas - 1];
    const [x1, y1] = xy[bas];
    const t = Math.min(1, Math.max(0, (p - parts[bas - 1]) / (parts[bas] - parts[bas - 1] || 1)));
    const x = +(x0 + (x1 - x0) * t).toFixed(1);
    const y = +(y0 + (y1 - y0) * t).toFixed(1);
    const d = p <= 0 ? "" : `M${points.slice(0, bas).join("L")}L${x} ${y}`;
    return { d, x, y };
  };

  // Affichage d'un etat : p = part du trace parcourue
  const afficher = (p: number, c: number, km?: number) => {
    const path = chemin.current;
    if (!path) return;
    const pt = parcelle(p);
    path.setAttribute("d", pt.d);
    coureur.current?.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
    if (compteur.current) compteur.current.textContent = `${km ?? Math.round(p * epreuve.km)}`;
    reperes.current.forEach((g, i) => {
      g?.classList.toggle("atteint", i <= c);
      g?.classList.toggle("courant", i === c);
    });
    setCourant((x) => (x === c ? x : c));
  };

  useEffect(() => {
    const mm = gsap.matchMedia();
    // Grand ecran : epinglage et defilement
    mm.add(GRAND_ECRAN, () => {
      setEpingle(true);
      /* Chaque intervalle (depart, ravitos, arrivee) recoit la meme longueur de
         defilement, quelle que soit sa distance reelle.
         Le trace se dessine plus ou moins vite selon la distance a couvrir. */
      const trajet = [0, ...trace.reperes.map((r) => r.fraction), 1];
      const n = trajet.length - 1;
      const parcours = (s: number) => {
        const k = Math.min(n - 1, Math.floor(s * n));
        return trajet[k] + (trajet[k + 1] - trajet[k]) * (s * n - k);
      };
      declencheur.current = ScrollTrigger.create({
        trigger: section.current,
        start: "top top",
        // 30 % d'ecran de defilement par etape (depart, ravitos, arrivee)
        end: `+=${n * 30}%`,
        pin: true,
        // Le <body> est en flex : ScrollTrigger y desactive par defaut la reserve
        // d'espace, et la suite de la page remonterait par-dessus la section
        pinSpacing: true,
        scrub: 0.8,
        onUpdate: (st) => {
          const c = Math.min(trace.reperes.length, Math.floor(st.progress * n + 0.02)) - 1;
          afficher(parcours(st.progress), c);
        },
      });
      afficher(0, -1);
      return () => {
        declencheur.current = null;
      };
    });
    // Petit ecran : trace complet, premier ravito selectionne
    mm.add(`not all and ${GRAND_ECRAN}`, () => {
      setEpingle(false);
      afficher(1, 0, ravitos[0].km);
    });
    return () => mm.revert();
    // afficher ne depend que de l'epreuve, deja dans les dependances
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trace, epreuve]);

  /* Choix d'un ravito dans la liste : on defile jusqu'a lui (grand ecran), ou on
     l'affiche directement (petit ecran) */
  const allerAu = (i: number) => {
    const st = declencheur.current;
    if (st) defilerVers(st.start + ((st.end - st.start) * (i + 1)) / (trace.reperes.length + 1));
    else afficher(1, i, ravitos[i].km);
  };

  /* Changer de course change la longueur de la section : on repart de son debut
     si on etait en plein milieu, pour ne pas se retrouver au-dela. Saut
     instantane (invisible, la section est epinglee) : un retour en douceur se
     ferait doubler par le recalcul des positions quand la section raccourcit */
  const changerEpreuve = (i: number) => {
    const st = declencheur.current;
    if (st && window.scrollY > st.start) defilerVers(st.start, 0);
    setIndexEpreuve(i);
  };

  const ravito = courant >= 0 ? ravitos[courant] : null;
  const boucle = Math.hypot(trace.debut.x - trace.fin.x, trace.debut.y - trace.fin.y) < 12;

  return (
    /* Enveloppe geree par React : GSAP insere son conteneur d'epinglage entre
       elle et la section. Au changement de page, React ne retire que
       l'enveloppe, dont le parent n'a pas bouge (sinon erreur removeChild). */
    <div>
      <section
        id="ravitos"
        ref={section}
        className="relative isolate overflow-hidden py-14 text-white lg:h-screen lg:py-0"
      >
        <Image src="/photos/fond-vert-flou.jpg" alt="" fill sizes="100vw" className="-z-20 object-cover" />
        <div className="absolute inset-0 -z-10 bg-[#17321a]/55" />

        {/* Marge haute sur grand ecran : header fixe + barre d'onglets collee */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 lg:h-full lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-8 lg:px-10 lg:pb-6 lg:pt-[140px]">
          {/* ---------- Panneau ---------- */}
          <div className="max-w-[560px]">
            <h2 className="titre text-2xl sm:text-3xl">{t("ravitosTitle")}</h2>
            <span className="mt-3 block h-[2px] bg-[repeating-linear-gradient(90deg,#ffffff_0,#ffffff_11px,transparent_11px,transparent_20px)] opacity-80" />

            {/* Choix de l'epreuve */}
            <div className="mt-5 flex flex-wrap gap-3">
              {EPREUVES.map((e, i) => (
                <button
                  key={e.ongletKey}
                  type="button"
                  onClick={() => changerEpreuve(i)}
                  aria-pressed={indexEpreuve === i}
                  className={`relative px-5 py-1.5 text-[13px] font-bold uppercase italic tracking-wide transition-colors ${indexEpreuve === i ? "text-[#1c3d1c]" : "text-white hover:text-white/80"}`}
                >
                  <span aria-hidden="true" className={`absolute inset-0 -skew-x-12 border border-white ${indexEpreuve === i ? "bg-white" : ""}`} />
                  <span className="relative">{t(e.ongletKey)}</span>
                </button>
              ))}
            </div>

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

            {/* Detail du ravito, ou texte d'introduction avant le premier */}
            <div className="relative mt-5">
              <p className={`text-[15px] leading-[1.55] text-white/85 transition-opacity duration-500 ${ravito ? "absolute inset-x-0 top-0 opacity-0" : "opacity-100"}`}>
                {t("ravitosIntro")}
              </p>
              <div className={`transition-all duration-500 ${ravito ? "translate-y-0 opacity-100" : "pointer-events-none absolute inset-x-0 top-0 translate-y-3 opacity-0"}`}>
                <span className="block h-px bg-white/40" />
                <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                  {PRESTATIONS.filter((p) => !ravito || ravito[p.cle]).map((p) => (
                    <li key={p.cle} className="flex items-start gap-3">
                      <Image src={p.icone} alt="" width={40} height={40} className="h-8 w-auto shrink-0 brightness-0 invert" />
                      <div>
                        <p className="text-[13px] font-bold uppercase">{t(p.label)}</p>
                        <p className="text-[12px] leading-[1.35] text-white/80">{t(p.desc)}</p>
                      </div>
                      {/* Logo du partenaire, centre sur les deux lignes de texte */}
                      {p.partenaire && (
                        <Image
                          src={p.partenaire.src}
                          alt={p.partenaire.nom}
                          width={p.partenaire.w}
                          height={p.partenaire.h}
                          className={`${p.partenaire.classe} ml-1 w-auto self-center brightness-0 invert`}
                        />
                      )}
                    </li>
                  ))}
                </ul>
                <div className="mt-4"><Pointilles /></div>
                <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
                  {SERVICES.filter((s) => !ravito || ravito[s.cle]).map((s) => (
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
                {ravitos.map((r, i) => (
                  <li key={r.km}>
                    <button
                      type="button"
                      onClick={() => allerAu(i)}
                      aria-current={i === courant ? "step" : undefined}
                      className={`flex items-center gap-2 transition-opacity ${i === courant ? "opacity-100" : "opacity-60 hover:opacity-100"}`}
                    >
                      <Numero n={i + 1} plein={i === courant} />
                      <span className="titre text-[15px]">
                        {r.km} KM
                        {r.mentionKey ? <span className="text-[0.75em]"> / {t(r.mentionKey)}</span> : null}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ---------- Carte : trace reel de l'epreuve ---------- */}
          <svg
            key={epreuve.ongletKey}
            viewBox={`0 0 ${trace.largeur} ${trace.hauteur}`}
            className="mx-auto w-full max-w-[680px] overflow-visible lg:max-h-[calc(100vh-170px)]"
            role="img"
            aria-label={t("ravitosMapAlt")}
          >
            <defs>
              <filter id="craie" x="-5%" y="-5%" width="110%" height="110%">
                <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="bruit" />
                <feDisplacementMap in="SourceGraphic" in2="bruit" scale="2.2" />
              </filter>
            </defs>
            <path d={trace.d} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            <path ref={chemin} d={trace.d} fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" filter="url(#craie)" />

            {/* Depart et arrivee */}
            {[
              { p: trace.debut, texte: boucle ? `${t("ravitosDepart")} / ${t("ravitosArrivee")}` : t("ravitosDepart") },
              ...(boucle ? [] : [{ p: trace.fin, texte: t("ravitosArrivee") }]),
            ].map(({ p, texte }) => (
              <g key={texte} transform={`translate(${p.x} ${p.y})`}>
                <rect x="-7" y="-7" width="14" height="14" fill="#fff" transform="rotate(45)" />
                <text x="14" y="30" className="titre" fill="#fff" fontSize="16" style={{ paintOrder: "stroke", stroke: "#17321a", strokeWidth: 4 }}>
                  {texte}
                </text>
              </g>
            ))}

            {trace.reperes.map((r, i) => (
              <g key={`${epreuve.ongletKey}-${r.km}`} ref={(el) => { reperes.current[i] = el; }} className="repere-ravito" transform={`translate(${r.x} ${r.y})`}>
                <circle r="16" className="halo" />
                <circle r="8" className="point" />
                <g transform={`translate(${etiquettes[i].dx} ${etiquettes[i].dy})`}>
                  <rect className="fond" x="0" y="0" rx="4" width={etiquettes[i].L} height="28" />
                  <text x="9" y="20" className="titre etiquette">{r.km} KM</text>
                </g>
              </g>
            ))}
            {/* Point du coureur (grand ecran seulement) */}
            <g ref={coureur} className={epingle ? "" : "hidden"}>
              <circle r="13" fill="#0781dd" opacity="0.35" />
              <circle r="7" fill="#0781dd" stroke="#fff" strokeWidth="2.5" />
            </g>
          </svg>
        </div>

        <style>{`
          .repere-ravito .point { fill: #17321a; stroke: rgba(255,255,255,.75); stroke-width: 2.5; transition: all .4s; }
          .repere-ravito .halo { fill: #fff; opacity: 0; transition: opacity .4s; transform-box: fill-box; transform-origin: center; }
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
    </div>
  );
}
