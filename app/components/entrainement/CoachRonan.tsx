import Image from "next/image";
import { useTranslations } from "next-intl";
import ArrowButton from "../ArrowButton";

// Offre de coaching de Ronan : cible a fournir (site ou page dediee)
const HREF_COACH = "#coach";

/*
  Section "Les conseils du coach Ronan" : fond brun profond avec la topographie
  en filigrane, texte a gauche, portrait incline dans un cadre blanc a droite.
*/
export default function CoachRonan() {
  const t = useTranslations("entrainementPage");
  const tCta = useTranslations("cta");

  return (
    <section
      id="coach"
      className="relative isolate overflow-hidden bg-[#462d1e] py-16 text-white lg:py-24"
    >
      {/* Topographie en filigrane, a peine visible sur le brun (maquette) */}
      <Image
        src="/images/deco/topographie.svg"
        alt=""
        width={1600}
        height={900}
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-[0.07]"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* En-tete : cartouche Comico + nom + fonction sur la meme ligne */}
        <div className="flex flex-wrap items-end gap-x-6 gap-y-3">
          <div>
            <span className="font-comico inline-block bg-[#6f4126] px-3 py-1 text-[14px] uppercase leading-[22px] tracking-[8px] text-white">
              {t("coachOverline")}
            </span>
            <h2 className="titre mt-2 text-3xl sm:text-4xl lg:text-[44px]">
              {t("coachName")}
            </h2>
          </div>
          <p className="mb-2 max-w-[18ch] text-[17px] font-bold uppercase italic leading-[1.25] sm:text-[19px]">
            {t("coachRole")}
          </p>
        </div>

        {/* Pointilles clairs sous l'en-tete, interrompus par la photo a droite */}
        <span className="mt-6 block h-[2px] bg-[repeating-linear-gradient(90deg,#ffffff_0,#ffffff_11px,transparent_11px,transparent_20px)] opacity-70 lg:w-[62%]" />

        <div className="mt-10 grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_38%] lg:gap-16">
          <div>
            <h3 className="text-[22px] font-extrabold uppercase italic leading-[1.3] sm:text-[26px]">
              {t("coachTitle")}
            </h3>

            <div className="mt-6 space-y-5 text-[16px] leading-[1.65] text-white/90 lg:max-w-[46ch]">
              <p>{t("coachText1")}</p>
              <p>{t("coachText2")}</p>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <ArrowButton href="#inscription" variant="outline-white" direction="up">
                {tCta("inscription")}
              </ArrowButton>
              <ArrowButton href={HREF_COACH} variant="outline-white">
                {t("coachCta")}
              </ArrowButton>
            </div>
          </div>

          {/* Portrait incline facon photo posee, cadre blanc epais */}
          <div className="rotate-[3deg] bg-white p-2 shadow-2xl lg:-mt-24">
            <Image
              src="/photos/coach-ronan.jpg"
              alt={t("coachAlt")}
              width={1000}
              height={1249}
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
