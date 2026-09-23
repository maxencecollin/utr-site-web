import Image from "next/image";
import { useTranslations } from "next-intl";

/* "Un dernier conseil" : photo floutee plein cadre, texte centre sur deux colonnes */
export default function CoachingConseil() {
  const t = useTranslations("coaching");

  return (
    <section className="relative isolate overflow-hidden py-24 text-white lg:py-60">
      <Image
        src="/photos/dernier-conseil.jpg"
        alt={t("conseilAlt")}
        fill
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-dark-900/35" />

      <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
        <Image
          src="/images/icones/fichier-12.svg"
          alt=""
          width={68}
          height={60}
          className="mx-auto h-12 w-auto brightness-0 invert"
        />
        <h2 className="font-comico mt-5 text-[26px] uppercase leading-[1.1] sm:text-[42px]">
          {t("conseilTitre")}
        </h2>
        <span className="mx-auto mt-5 block h-[2px] max-w-md bg-[repeating-linear-gradient(90deg,#ffffff_0,#ffffff_11px,transparent_11px,transparent_20px)]" />

        <div className="mt-8 grid grid-cols-1 gap-x-12 gap-y-4 text-left text-[16px] italic leading-[1.6] sm:text-[17px] lg:grid-cols-2">
          <p>{t("conseil1")}</p>
          <p>{t("conseil2")}</p>
        </div>
      </div>
    </section>
  );
}
