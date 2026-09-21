"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import ArrowButton from "../ArrowButton";
import { COURSES_OFFRE1, EMAIL_RONAN, OFFRES } from "./coachingData";

/* Libelle vertical de la colonne de gauche (contenu / plan / prix) */
function LibelleVertical({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-9 shrink-0 items-center justify-center border-r border-white/50 py-2">
      <span className="font-comico whitespace-nowrap text-[12px] uppercase tracking-[2px] [writing-mode:vertical-rl] [transform:rotate(180deg)] sm:text-[13px]">
        {children}
      </span>
    </div>
  );
}

export default function CoachingOffres() {
  const t = useTranslations("coaching");
  const tCta = useTranslations("cta");
  // Les libelles des epreuves vivent dans le namespace de la page Entrainement
  const tEpreuves = useTranslations("entrainementPage");
  const [index, setIndex] = useState(0);
  const offre = OFFRES[index];

  return (
    <section
      id="offres"
      className="relative isolate overflow-hidden py-16 text-white lg:py-20"
    >
      <Image
        src="/photos/coaching-offres.jpg"
        alt={t("offresAlt")}
        fill
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-dark-900/55" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Onglets */}
        <div className="flex flex-wrap gap-3">
          {OFFRES.map((o, i) => (
            <button
              key={o.titreKey}
              type="button"
              onClick={() => setIndex(i)}
              aria-pressed={index === i}
              className={`relative px-6 py-2 text-[13px] font-bold uppercase italic tracking-wide transition-colors sm:text-[15px] ${
                index === i ? "text-white" : "text-white/45 hover:text-white/70"
              }`}
            >
              <span
                aria-hidden="true"
                className={`absolute inset-0 -skew-x-12 border ${
                  index === i ? "border-white" : "border-white/35"
                }`}
              />
              <span className="relative">{t(i === 0 ? "offresOnglet1" : "offresOnglet2")}</span>
            </button>
          ))}
        </div>

        {/* Titre de l'offre */}
        <div className="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <h2 className="titre text-2xl sm:text-4xl">{t(offre.titreKey)}</h2>
          <span aria-hidden="true" className="titre text-xl sm:text-2xl">/</span>
          <span className="font-comico text-[13px] uppercase tracking-[4px] sm:text-[15px]">
            {t(offre.mentionKey)}
          </span>
        </div>
        <span className="mt-4 block h-[2px] max-w-2xl bg-[repeating-linear-gradient(90deg,#ffffff_0,#ffffff_9px,transparent_9px,transparent_18px)] opacity-80" />

        <p className="mt-5 text-[16px] sm:text-[18px]">
          {t(offre.chapeauKey)}{" "}
          <strong className="font-bold italic">{t("offresChapeauFort")}</strong>
        </p>

        {/* Tableau : contenu / plan / prix */}
        <div className="mt-9 max-w-4xl border-t border-white/50">
          <div className="flex border-b border-white/50">
            <LibelleVertical>{t("offresContenuLabel")}</LibelleVertical>
            <p className="px-5 py-5 text-[15px] italic leading-[1.5] sm:px-8">
              {t("offresContenu")}
            </p>
          </div>

          <div className="flex border-b border-white/50">
            <LibelleVertical>{t("offresPlanLabel")}</LibelleVertical>
            <div className="flex-1 px-5 py-5 sm:px-8">
              {offre.plan.type === "courses" ? (
                <div className="grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-[auto_1fr]">
                  <div>
                    <p className="titre text-[17px] sm:text-[19px]">{t("offre1PlanTitre")}</p>
                    <p className="mt-1 max-w-[18ch] text-[14px] leading-[1.4] text-white/85">
                      {t("offre1PlanSousTitre")}
                    </p>
                  </div>
                  <ul className="space-y-2">
                    {COURSES_OFFRE1.map((cle) => (
                      <li key={cle} className="text-[15px]">
                        <strong className="font-bold italic">{tEpreuves(cle)}</strong>{" "}
                        <span className="text-white/85">{t("offre1PlanFinisher")}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <ul className="grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2">
                  {offre.plan.cles.map((cle) => (
                    <li key={cle} className="flex items-start gap-2 text-[14px] leading-[1.45]">
                      <span aria-hidden="true" className="mt-0.5 shrink-0">*</span>
                      {t(cle)}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="flex border-b border-white/50">
            <LibelleVertical>{t("offresPrixLabel")}</LibelleVertical>
            <div className="grid flex-1 grid-cols-1 sm:grid-cols-2">
              {offre.prix.map((ligne, i) => (
                <div
                  key={ligne.coursesKey}
                  className={`flex items-baseline gap-4 px-5 py-5 sm:px-8 ${
                    i === 0 ? "border-b border-white/50 sm:border-b-0 sm:border-r" : ""
                  }`}
                >
                  <span className="titre max-w-[7ch] text-[16px] leading-[1.15] sm:text-[18px]">
                    {t(ligne.coursesKey)} :
                  </span>
                  <span>
                    <span className="titre text-3xl sm:text-4xl">{ligne.reduit} €</span>
                    <span aria-hidden="true" className="align-super text-[13px]">*</span>
                    <span className="mt-1 block text-[12px] leading-[1.35] text-white/80">
                      * {t("offresPrixNote")}.
                      <br />
                      {t("offresPrixSansReduction", { prix: `${ligne.plein} €` })}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <ArrowButton href={`mailto:${EMAIL_RONAN}`} variant="outline-white">
            {t("ctaContact")}
          </ArrowButton>
          <ArrowButton href="#inscription" variant="outline-white">
            {tCta("inscription")}
          </ArrowButton>
        </div>
      </div>
    </section>
  );
}
