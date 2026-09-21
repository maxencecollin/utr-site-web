"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  ETAPES,
  JALONS,
  LIMITE_PAR_DEFAUT,
  MARGE_DROITE,
  MARGE_GAUCHE,
  tempsDuJalon,
} from "./nutritionData";

/* Fleche ronde du selecteur d'epreuve et de relayeur */
function Fleche({
  sens,
  label,
  onClick,
  disabled,
}: {
  sens: "gauche" | "droite";
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      disabled={disabled}
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-dark-900 text-dark-900 transition-colors hover:bg-dark-900 hover:text-white disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:text-dark-900"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className={`h-3 w-3 ${sens === "gauche" ? "rotate-180" : ""}`}
        aria-hidden="true"
      >
        <path
          d="M5 12h14M13 6l6 6-6 6"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

/* Trait pointille horizontal du papier */
function Pointilles({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`block h-px bg-[repeating-linear-gradient(90deg,#1c1c1c_0,#1c1c1c_7px,transparent_7px,transparent_14px)] ${className}`}
    />
  );
}

export default function EntrainementNutrition() {
  const t = useTranslations("entrainementPage");
  const [index, setIndex] = useState(0);
  const etape = ETAPES[index];

  // Les deux etapes du relais se suivent : on navigue entre relayeurs sans
  // changer d'epreuve, et entre epreuves sans entrer dans le detail du relais.
  const estRelais = etape.relayeur !== undefined;
  const allerEpreuve = (pas: number) => {
    const premieres = ETAPES.map((e, i) => (e.relayeur === undefined || e.relayeur === 1 ? i : -1)).filter((i) => i >= 0);
    const courant = premieres.findIndex((i) => i === index || (estRelais && ETAPES[i].relayeur === 1));
    const suivant = (courant + pas + premieres.length) % premieres.length;
    setIndex(premieres[suivant]);
  };

  const formatTemps = (i: number) => {
    const { h, m } = tempsDuJalon(i);
    return h === 0 ? `${m} min` : m === 0 ? `${h} h` : `${h} h ${String(m).padStart(2, "0")}`;
  };

  return (
    <section id="nutrition" className="overflow-hidden bg-white pb-16 pt-16 lg:pt-20">
      {/* En-tete aligne a droite (maquette) */}
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex items-end justify-end gap-5">
          <div className="text-right">
            <span className="font-comico inline-block bg-[#6f4126] px-3 py-1 text-[13px] uppercase leading-[21px] tracking-[6px] text-white">
              {t("nutritionOverline")}
            </span>
            <h2 className="titre mt-2 text-2xl text-[#2c2c2c] sm:text-4xl">
              {t("nutritionTitle")}
            </h2>
          </div>
          {/* Picto bouteille + fourchette */}
          <Image
            src="/images/icones/ravito.svg"
            alt=""
            width={60}
            height={54}
            className="h-12 w-auto shrink-0 brightness-0"
          />
        </div>
        <span className="mt-4 block h-[2px] bg-[repeating-linear-gradient(90deg,#797979_0,#797979_11px,transparent_11px,transparent_20px)]" />
      </div>

      {/* Photo pleine largeur a gauche, papier superpose a droite */}
      {/* Deux bandes photo pleine largeur separees d'un filet blanc (maquette) */}
      <div className="relative mt-10 lg:mt-16">
        <div className="relative h-[230px] w-full sm:h-[340px] lg:h-[520px]">
          <Image
            src="/photos/nutrition-sentier.jpg"
            alt={t("nutritionPhotoAlt")}
            fill
            sizes="100vw"
            className="object-cover object-[50%_28%]"
          />
        </div>

        {/* Papier : superpose aux deux bandes sur grand ecran, intercale entre
            elles en dessous (l'ecran est trop etroit pour la superposition) */}
        <div className="relative z-10 mx-auto -mt-16 w-[92%] max-w-[480px] sm:w-[76%] lg:absolute lg:right-[3%] lg:top-[-40px] lg:mt-0 lg:w-[44%] lg:max-w-[560px]">
          <div className="relative aspect-[635/1083] w-full">
            <Image
              src="/images/deco/plan-nutrition-papier.png"
              alt=""
              fill
              sizes="(min-width: 1024px) 38vw, 80vw"
              className="object-contain drop-shadow-[0_18px_34px_rgba(0,0,0,0.22)]"
            />

            {/* ---- Bloc de tete : titre, duree, selecteurs ---- */}
            <div className="absolute inset-x-[16%] top-[4%] text-center text-[#1c1c1c]">
              <p className="titre text-[15px] leading-[1.15] sm:text-[17px] lg:text-[19px]">
                {t("nutritionPlanTitle")}
              </p>
              <p className="font-comico mt-1 text-[10px] uppercase tracking-[2px] sm:text-[11px]">
                ({t(etape.dureeKey)})
              </p>

              <Pointilles className="mt-3" />

              {/* Choix de l'epreuve */}
              <div className="mt-2 flex items-center justify-center gap-3">
                <Fleche sens="gauche" label={t("nutritionEpreuvePrecedente")} onClick={() => allerEpreuve(-1)} />
                <span className="font-comico text-[15px] uppercase tracking-[1px] sm:text-[17px]">
                  {t(etape.nomKey)}
                </span>
                <Fleche sens="droite" label={t("nutritionEpreuveSuivante")} onClick={() => allerEpreuve(1)} />
              </div>

              <Pointilles className="mt-2" />

              {/* Depart : numero de relayeur pour le relais, kilometrage sinon */}
              <div className="mt-3 flex items-center justify-center gap-2.5">
                <span className="font-comico text-[13px] uppercase tracking-[1px] sm:text-[15px]">
                  {t("nutritionDepart")}
                  {estRelais && ` #${etape.relayeur}`}
                </span>
                {estRelais && (
                  <Fleche
                    sens={etape.relayeur === 1 ? "droite" : "gauche"}
                    label={etape.relayeur === 1 ? t("nutritionRelaisSuivant") : t("nutritionRelaisPrecedent")}
                    onClick={() => setIndex(etape.relayeur === 1 ? index + 1 : index - 1)}
                  />
                )}
              </div>
              <p className="font-comico mt-0.5 text-[9px] uppercase tracking-[2px] sm:text-[10px]">
                {etape.kmDepart} km
              </p>
            </div>

            {/* ---- Jalons le long du trace ---- */}
            {JALONS.map((jalon, i) => {
              const limite = jalon.limite ?? LIMITE_PAR_DEFAUT;
              const aGauche = jalon.cote === "gauche";
              return (
              <div
                key={jalon.y}
                className={`absolute flex -translate-y-1/2 items-center gap-1.5 ${
                  aGauche
                    ? "flex-row justify-end text-right"
                    : "flex-row-reverse justify-end text-left"
                }`}
                style={{
                  top: `${jalon.y}%`,
                  left: aGauche ? `${MARGE_GAUCHE}%` : `${limite}%`,
                  right: aGauche ? `${limite}%` : `${MARGE_DROITE}%`,
                }}
              >
                <span className="hidden text-[9px] leading-[1.3] text-[#1c1c1c] sm:inline sm:text-[10px] lg:text-[11px]">
                  {t("nutritionRation")}
                </span>
                <span className="shrink-0 border border-dashed border-[#1c1c1c] px-1 py-0.5 text-center">
                  <span className="font-comico block text-[10px] leading-[1.1] sm:text-[12px]">
                    {formatTemps(i)}
                  </span>
                </span>
              </div>
              );
            })}

            {/* ---- Pied : arrivee et PDF ---- */}
            <div className="absolute inset-x-[15%] bottom-[3.5%] text-center text-[#1c1c1c]">
              <p className="font-comico text-[9px] uppercase tracking-[2px] sm:text-[10px]">
                {etape.kmArrivee} km
              </p>
              <p className="font-comico mt-0.5 text-[15px] uppercase tracking-[1px] sm:text-[18px]">
                {t("nutritionArrivee")}
              </p>
              <p className="mt-1 text-[9px] leading-[1.25] text-[#1c1c1c] sm:hidden">
                {t("nutritionRationChaque")}
              </p>
              <p className="mt-1.5 hidden text-[9px] leading-[1.3] text-dark-500 sm:block sm:text-[10px]">
                {t("nutritionCadence")}
              </p>
              {/* PDF par epreuve a fournir : lien neutralise en attendant */}
              <span
                title={t("nutritionPdfBientot")}
                className="mt-1.5 inline-block cursor-not-allowed text-[10px] uppercase tracking-[1px] text-dark-400 underline underline-offset-4 sm:mt-2 sm:text-[11px]"
              >
                {t("nutritionPdf")}
              </span>
            </div>
          </div>
        </div>

        <div className="relative mt-10 h-[200px] w-full sm:h-[260px] lg:mt-7 lg:h-[420px]">
          <Image
            src="/photos/mousse-sous-bois.jpg"
            alt={t("nutritionPhoto2Alt")}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
