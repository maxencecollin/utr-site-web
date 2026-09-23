import Image from "next/image";
import { useTranslations } from "next-intl";
import ArrowButton from "../ArrowButton";
import EnvHeading from "./EnvHeading";
import PhotoScotchee from "./PhotoScotchee";
import { LIEN_NATURA_2000 } from "./ZonesProtegees";

const MENACES = ["enj1", "enj2", "enj3", "enj4", "enj5", "enj6"] as const;

export default function Enjeux() {
  const t = useTranslations("environnement");
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 lg:py-24">
      <Image
        src="/images/deco/topographie.svg"
        alt=""
        width={1600}
        height={900}
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-[0.06]"
      />
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <EnvHeading overline={t("enjOverline")} titre={t("enjTitre")} aDroite />

        <div className="mt-12 grid grid-cols-1 items-start gap-12 lg:grid-cols-[52%_1fr] lg:gap-16">
          {/* Deux photos posees l'une sur l'autre */}
          {/* Grande photo 524 x 605 ; la petite (60 %) se pose en bas et deborde
              a droite de 130 px, comme la maquette */}
          <div className="relative max-w-[524px] pb-16 lg:-ml-[38px] lg:pb-4">
            <PhotoScotchee
              src="/photos/env-enjeux.jpg"
              alt={t("enjAltBalade")}
              ratio="524/605"
              sizes="(min-width: 1024px) 46vw, 90vw"
              position="35% 50%"
              rotation={-1.5}
            />
            <PhotoScotchee
              src="/photos/env-maree-basse.jpg"
              alt={t("enjAltMaree")}
              ratio="900/600"
              sizes="(min-width: 1024px) 24vw, 50vw"
              rotation={3}
              className="absolute left-[40%] top-[67%] w-[60%] sm:left-[65%]"
            />
          </div>

          <div className="lg:ml-auto lg:max-w-[320px] lg:text-right">
            <p className="titre text-[19px] leading-[1.3] sm:text-[22px]">{t("enjIntro")}</p>
            <ul className="mt-6 space-y-5">
              {MENACES.map((m) => (
                <li key={m}>
                  <p className="font-comico text-[15px] uppercase tracking-wide text-pinede-500 sm:text-[16px]">
                    {t(`${m}Titre`)}
                    <span aria-hidden="true"> •</span>
                  </p>
                  <p className="mt-0.5 text-[15px] leading-[1.3] text-dark-700">{t(`${m}Texte`)}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 text-[17px] leading-[1.3] text-dark-700 lg:grid-cols-2 lg:gap-16">
          <p>
            {t("enjUsagesAvant")}
            <span className="font-comico uppercase tracking-wide text-[#1c1c1c]">{t("enjUsagesFort")}</span>
            {t("enjUsagesApres")}
          </p>
          <div>
            <p>{t("enjNatura")}</p>
            <div className="mt-8">
              <ArrowButton href={LIEN_NATURA_2000} variant="green">
                {t("enjCta")}
              </ArrowButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
