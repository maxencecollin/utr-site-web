import Image from "next/image";
import { useTranslations } from "next-intl";
import ArrowButton from "../ArrowButton";

/*
  Page d'attente des infos pratiques (acces, stationnement, hebergement,
  navettes, retrait des dossards), en attendant la page de la maquette.
*/
const REGLEMENT = "/docs/Reglement_Ultra_Tour_Ria_2027.pdf";
const EMAIL = "contact@ultratourdelaria.fr";

export default function InfosPratiquesAttente() {
  const t = useTranslations("infosPratiques");

  return (
    <section className="relative isolate flex min-h-screen flex-col overflow-hidden text-white">
      <Image src="/photos/calque-24.jpg" alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-dark-900/60 via-dark-900/40 to-dark-900/75" />

      <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 pb-16 pt-28 text-center">
        <h1 className="headline text-4xl leading-[1.1] sm:text-6xl lg:text-[70px]">
          {t("titreLigne1")}
          <br />
          {t("titreLigne2")}
        </h1>
        <span className="relative inline-block px-4 py-1.5">
          <span aria-hidden="true" className="absolute inset-0 -skew-x-12 bg-ria-500" />
          <span className="relative text-[15px] font-bold uppercase tracking-[2px]">{t("badge")}</span>
        </span>
        <p className="mt-2 max-w-[54ch] text-[17px] leading-[1.55] text-white/90">{t("texte")}</p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <ArrowButton href={REGLEMENT} variant="outline-white">
            {t("reglement")}
          </ArrowButton>
          <ArrowButton href="/#courses" variant="outline-white">
            {t("epreuves")}
          </ArrowButton>
        </div>

        <p className="mt-6 text-[15px] text-white/85">
          {t("question")}{" "}
          <a href={`mailto:${EMAIL}`} className="font-semibold underline underline-offset-4">
            {EMAIL}
          </a>
        </p>
      </div>
    </section>
  );
}
