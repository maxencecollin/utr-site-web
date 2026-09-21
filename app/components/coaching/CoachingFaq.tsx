"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { FAQ } from "./coachingData";

/* Chevron de l'accordeon */
function Chevron({ ouvert }: { ouvert: boolean }) {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-dark-900/70">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className={`h-3.5 w-3.5 transition-transform duration-300 ${ouvert ? "rotate-180" : ""}`}
        aria-hidden="true"
      >
        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function CoachingFaq() {
  const t = useTranslations("coaching");
  // La question sur l'alimentation est ouverte par defaut (seule renseignee)
  const [ouvert, setOuvert] = useState<number | null>(2);

  return (
    <section id="faq" className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <h2 className="titre text-2xl text-[#2c2c2c] sm:text-4xl">{t("faqTitle")}</h2>
        <span className="mx-[calc(50%-50vw)] mt-4 block h-[2px] bg-[repeating-linear-gradient(90deg,#797979_0,#797979_11px,transparent_11px,transparent_20px)]" />

        <ul className="mt-10 border-t border-dark-300">
          {FAQ.map((item, i) => {
            const estOuvert = ouvert === i;
            const aReponse = item.reponses.length > 0;
            return (
              <li key={item.questionKey} className={`border-b border-dark-300 ${estOuvert ? "bg-dark-50" : ""}`}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOuvert(estOuvert ? null : i)}
                    aria-expanded={estOuvert}
                    aria-controls={`faq-${i}`}
                    className="flex w-full items-center justify-between gap-6 px-4 py-5 text-left transition-colors hover:text-dark-600 sm:px-8"
                  >
                    <span className="titre text-[16px] text-[#1c1c1c] sm:text-[21px]">
                      {t(item.questionKey)}
                    </span>
                    <Chevron ouvert={estOuvert} />
                  </button>
                </h3>
                <div id={`faq-${i}`} hidden={!estOuvert} className="px-4 pb-7 sm:px-8">
                  {aReponse ? (
                    <div className="grid grid-cols-1 gap-x-14 gap-y-4 lg:grid-cols-2">
                      {item.reponses.map((cle) => (
                        <p key={cle} className="text-[15px] leading-[1.65] text-dark-700">
                          {t(cle)}
                        </p>
                      ))}
                    </div>
                  ) : (
                    /* Reponses de Ronan a venir : on le dit plutot que d'ouvrir sur du vide */
                    <p className="text-[15px] italic text-dark-500">{t("faqAVenir")}</p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
