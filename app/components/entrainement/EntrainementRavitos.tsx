"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { usePinnedSteps } from "../usePinnedSteps";
import { EPREUVES, type RavitoSide } from "./ravitosData";

/* Prestations affichees en grille, dans l'ordre de la maquette */
const PRESTATIONS = [
  { key: "eau", icon: "/images/icones/eau.svg", label: "ravitosEau", desc: "ravitosEauDesc" },
  { key: "liquide", icon: "/images/icones/boisson-energie.svg", label: "ravitosLiquide", desc: "ravitosLiquideDesc" },
  { key: "sec", icon: "/images/icones/barre-energie.svg", label: "ravitosSec", desc: "ravitosSecDesc" },
  { key: "chaud", icon: "/images/icones/plat-chaud.svg", label: "ravitosChaud", desc: "ravitosChaudDesc" },
] as const;

/* Produits partenaire presents sur les tables (noms commerciaux, non traduits) */
const PRODUITS = [
  { nom: "Energy date bar", icon: "/images/icones/barre-energie-simple.svg", desc: "ravitosProduit1Desc" },
  { nom: "ISO+ isotonic drink", icon: "/images/icones/boisson-energie-simple.svg", desc: "ravitosProduit2Desc" },
] as const;

/*
  Services. Le picto "toilettes" de la maquette n'est pas dans l'export de la
  graphiste : la ligne le reprendra quand le SVG arrivera.
*/
const SERVICES = [
  { key: "medical", icon: "/images/icones/fichier-14.svg", label: "ravitosMedical" },
  { key: "aideExterne", icon: "/images/icones/aide-exterieur.svg", label: "ravitosAideExterne" },
] as const;

/* Decalage de l'etiquette par rapport a son repere, selon le cote */
const OFFSET: Record<RavitoSide, string> = {
  left: "-translate-x-full -translate-y-1/2 pr-4",
  right: "translate-x-0 -translate-y-1/2 pl-4",
  above: "-translate-x-1/2 -translate-y-full pb-3",
  below: "-translate-x-1/2 translate-y-0 pt-3",
};

/* Badge hexagonal portant le numero du ravito */
function NumeroRavito({ n, actif }: { n: number; actif: boolean }) {
  return (
    <span
      className={`font-comico relative inline-flex h-8 w-8 shrink-0 items-center justify-center text-[15px] ${
        actif ? "text-[#1c3d1c]" : "text-white"
      }`}
    >
      <svg viewBox="0 0 40 40" aria-hidden="true" className="absolute inset-0 h-full w-full">
        <polygon
          points="20,2 36,11 36,29 20,38 4,29 4,11"
          fill={actif ? "#ffffff" : "none"}
          stroke="#ffffff"
          strokeWidth="2.5"
        />
      </svg>
      <span className="relative">{n}</span>
    </span>
  );
}

export default function EntrainementRavitos() {
  const t = useTranslations("entrainementPage");
  // Le 33 km emprunte la fin du parcours du 80 : meme carte, reperes differents
  const [indexEpreuve, setIndexEpreuve] = useState(0);
  const epreuve = EPREUVES[indexEpreuve];
  const ravitos = epreuve.ravitos;
  // captureUp desactive : en remontant, on ressort de la section d'un trait
  const { containerRef, stickyRef, progress, stickyTop, scrollToStep } =
    usePinnedSteps(ravitos.length, { captureUp: false });

  // Un palier par ravito ; l'index courant est le palier le plus proche
  const indexScroll = Math.min(
    ravitos.length - 1,
    Math.max(0, Math.round(progress * (ravitos.length - 1))),
  );
  /*
    Sous lg la section n'est pas epinglee : le scroll ne pilote plus rien, c'est
    le choix explicite de l'utilisateur qui fait foi. Sur grand ecran on laisse
    le scroll commander et cet etat reste nul.
  */
  const [manuel, setManuel] = useState<number | null>(null);
  const index = manuel ?? indexScroll;

  const allerAu = (i: number) => {
    setManuel(scrollToStep(i) ? null : i);
  };
  const actif = ravitos[index];
  const autres = ravitos.filter((_, i) => i !== index);

  return (
    <div
      id="ravitos"
      ref={containerRef}
      /* Longueur du voyage proportionnelle au nombre de ravitos : le 33 km en
         a deux, le 80 en a six. Une hauteur fixe rendrait le 33 interminable. */
      style={{ "--hauteur-ravitos": `${ravitos.length * 70}vh` } as CSSProperties}
      className="relative lg:h-[var(--hauteur-ravitos)]"
    >
      <section
        ref={stickyRef}
        className="relative isolate overflow-hidden pb-10 pt-28 text-white lg:sticky"
        style={{ top: stickyTop }}
      >
        {/* Fond vert flou pleine largeur */}
        <Image
          src="/photos/fond-vert-flou.jpg"
          alt=""
          fill
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[#17321a]/45" />

        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {/* En-tete */}
          <div className="max-w-xl">
            <h2 className="titre text-2xl sm:text-3xl">{t("ravitosTitle")}</h2>
            <span className="mt-4 block h-[2px] bg-[repeating-linear-gradient(90deg,#ffffff_0,#ffffff_11px,transparent_11px,transparent_20px)] opacity-80" />
            <p className="mt-3 text-[14px] leading-[1.5] text-white/90">
              {t("ravitosIntro")}
            </p>
          </div>

          {/* Choix de l'epreuve */}
          <div className="mt-6 flex flex-wrap gap-3">
            {EPREUVES.map((e, i) => (
              <button
                key={e.ongletKey}
                type="button"
                onClick={() => {
                  setIndexEpreuve(i);
                  setManuel(null);
                }}
                aria-pressed={indexEpreuve === i}
                className={`relative px-5 py-2 text-[13px] font-bold uppercase italic tracking-wide transition-colors ${
                  indexEpreuve === i ? "text-[#1c3d1c]" : "text-white hover:text-white/80"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute inset-0 -skew-x-12 border border-white ${
                    indexEpreuve === i ? "bg-white" : ""
                  }`}
                />
                <span className="relative">{t(e.ongletKey)}</span>
              </button>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
            {/* ---------- Panneau du ravito courant ---------- */}
            <div className="relative">
              {/* Fleches de navigation entre ravitos (desktop) */}
              <div className="absolute -left-2 top-1/3 flex flex-col gap-3 sm:-left-4 xl:-left-14">
                <button
                  type="button"
                  onClick={() => allerAu(Math.max(0, index - 1))}
                  aria-label={t("ravitosPrecedent")}
                  disabled={index === 0}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/70 text-white transition-colors hover:bg-white hover:text-[#1c3d1c] disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 -rotate-90" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => allerAu(Math.min(ravitos.length - 1, index + 1))}
                  aria-label={t("ravitosSuivant")}
                  disabled={index === ravitos.length - 1}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/70 text-white transition-colors hover:bg-white hover:text-[#1c3d1c] disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 rotate-90" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              {/* Titre du ravito : numero + kilometrage + heure de fermeture */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <NumeroRavito n={index + 1} actif />
                <span className="titre text-3xl">{actif.km} KM</span>
                <span className="flex items-center gap-2 text-[13px] uppercase italic tracking-wide text-white/85">
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                    <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  {t("ravitosArriveeMax")} : {actif.arriveeMax ?? t("ravitosAConfirmer")}
                </span>
              </div>

              <span className="mt-4 block h-px bg-white/45" />

              {/* Prestations */}
              <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                {PRESTATIONS.filter((p) => actif[p.key]).map((p) => (
                  <li key={p.key} className="flex items-start gap-4">
                    <Image src={p.icon} alt="" width={48} height={44} className="h-9 w-auto shrink-0 brightness-0 invert" />
                    <div>
                      <p className="text-[15px] font-bold uppercase">{t(p.label)}</p>
                      <p className="mt-0.5 text-[13px] leading-[1.4] text-white/85">{t(p.desc)}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <span className="mt-4 block h-[2px] bg-[repeating-linear-gradient(90deg,#ffffff_0,#ffffff_9px,transparent_9px,transparent_17px)] opacity-60" />

              {/* Produits partenaire */}
              <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                {PRODUITS.map((p) => (
                  <li key={p.nom} className="flex items-start gap-4">
                    <Image src={p.icon} alt="" width={40} height={44} className="h-9 w-auto shrink-0 brightness-0 invert" />
                    <div>
                      <p className="max-w-[16ch] text-[15px] font-bold uppercase leading-[1.2]">{p.nom}</p>
                      <p className="mt-0.5 flex items-center gap-3 text-[13px] text-white/85">
                        {t(p.desc)}
                        <Image
                          src="/images/partenaires/decathlon.svg"
                          alt="Decathlon"
                          width={313}
                          height={203}
                          className="h-3.5 w-auto brightness-0 invert"
                        />
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <span className="mt-4 block h-[2px] bg-[repeating-linear-gradient(90deg,#ffffff_0,#ffffff_9px,transparent_9px,transparent_17px)] opacity-60" />

              {/* Services sur place */}
              <ul className="mt-4 flex flex-wrap items-center gap-x-10 gap-y-3">
                {SERVICES.filter((s) => actif[s.key]).map((s) => (
                  <li key={s.key} className="flex items-center gap-3">
                    <Image src={s.icon} alt="" width={44} height={40} className="h-9 w-auto shrink-0 brightness-0 invert" />
                    <span className="max-w-[10ch] text-[13px] font-bold uppercase leading-[1.2]">
                      {t(s.label)}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Acces direct aux autres ravitos */}
              <div className="mt-5 border-t border-white/35 pt-4">
                <p className="text-[12px] uppercase tracking-[2px] text-white/70">
                  {t("ravitosSuivants")}
                </p>
                <ul className="mt-3 flex flex-wrap gap-x-7 gap-y-2">
                  {autres.map((r) => (
                    <li key={r.km}>
                      <button
                        type="button"
                        onClick={() => allerAu(ravitos.indexOf(r))}
                        className="flex items-center gap-3 transition-opacity hover:opacity-70"
                      >
                        <NumeroRavito n={ravitos.indexOf(r) + 1} actif={false} />
                        <span className="titre text-lg">{r.km} KM</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ---------- Carte ---------- */}
            <div className="relative mx-auto w-full max-w-[500px] lg:ml-auto lg:mr-0">
              <div className="relative mx-auto aspect-[624/679] w-[78%] sm:w-[86%] lg:w-full">
                <Image
                  src="/images/deco/carte-ravito.png"
                  alt={t("ravitosMapAlt")}
                  fill
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  className="object-contain"
                />

                {/* Etiquettes kilometriques posees sur les reperes du trace */}
                {ravitos.map((r, i) => {
                  const courant = i === index;
                  return (
                    <span
                      key={r.km}
                      className={`titre absolute whitespace-nowrap transition-all duration-500 ${
                        courant
                          ? "-translate-x-1/2 -translate-y-1/2 text-2xl text-white sm:text-4xl"
                          : `${OFFSET[r.side]} text-sm text-white/85 sm:text-lg`
                      }`}
                      style={
                        courant
                          ? { left: `${r.ax}%`, top: `${r.ay}%` }
                          : { left: `${r.x + (r.dx ?? 0)}%`, top: `${r.y + (r.dy ?? 0)}%` }
                      }
                    >
                      {r.km} KM
                    </span>
                  );
                })}

                {/* Depart et arrivee, a leur place pour cette epreuve */}
                {([
                  { repere: epreuve.arrivee, cle: "ravitosArrivee" },
                  { repere: epreuve.depart, cle: "ravitosDepart" },
                ] as const).map(({ repere, cle }) => (
                  <span
                    key={cle}
                    className={`absolute text-[13px] font-bold uppercase italic sm:text-[15px] ${OFFSET[repere.side]}`}
                    style={{ left: `${repere.x}%`, top: `${repere.y}%` }}
                  >
                    {t(cle)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
