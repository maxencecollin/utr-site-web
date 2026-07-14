import Image from "next/image";
import { useTranslations } from "next-intl";
import ArrowButton from "../ArrowButton";
import CourseSectionHeading from "./CourseSectionHeading";

/*
  Section "Environnement" : vue aerienne de la Ria plein cadre,
  texte pose sur un degrade marine a gauche (maquette XD).
*/
export default function CourseEnvironnement() {
  const t = useTranslations("course");
  const tNav = useTranslations("nav");
  // "Natura 2000" et "ZNIEFF" sont des designations propres (non traduites)
  const LABELS = ["Natura 2000", "ZNIEFF", t("sitesClasses")];

  return (
    <section id="environnement" className="overflow-x-clip bg-white pt-16 lg:pt-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <CourseSectionHeading
          icon="/images/icones/patrimoine.svg?v=2"
          title={t("environnement")}
        />
      </div>

      {/* Photo satellite pleine largeur + voile marine a gauche pour le texte */}
      <div className="relative isolate mt-8 overflow-hidden bg-[#0d2f4b] text-white">
        <Image
          src="/photos/vue-aerienne-ria.jpg"
          alt={t("altVueAerienne")}
          fill
          sizes="100vw"
          className="-z-20 object-cover object-[70%_50%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0d2f4b] from-15% via-[#0d2f4b]/60 via-45% to-transparent to-70%"
        />

        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <h2 className="titre max-w-xl text-3xl leading-tight sm:text-5xl">
            {t("envTitle1")}
            <br />
            {t("envTitle2")}
          </h2>

          {/* Ligne pointillee qui court vers la droite sur la photo,
              tampon patrimoine blanc pose au-dessus (maquette XD) */}
          <div className="relative mt-6">
            <span className="block h-[2px] bg-[repeating-linear-gradient(90deg,#ffffff_0,#ffffff_11px,transparent_11px,transparent_20px)] opacity-70" />
            <Image
              src="/images/icones/patrimoine.svg?v=2"
              alt=""
              width={96}
              height={94}
              className="absolute bottom-4 right-[10%] hidden w-24 brightness-0 invert lg:block"
            />
          </div>

          {/* Labels reglementaires : Comico blanc, separes par des "/" */}
          <ul className="font-comico mt-5 flex flex-wrap items-center gap-x-3 text-[16px] uppercase leading-5">
            {LABELS.map((label, i) => (
              <li key={label} className="flex items-center gap-x-3">
                {i > 0 && <span aria-hidden="true">/</span>}
                {label}
              </li>
            ))}
          </ul>
          <span className="mt-5 block h-[2px] bg-[repeating-linear-gradient(90deg,#ffffff_0,#ffffff_11px,transparent_11px,transparent_20px)] opacity-70" />

          <h3 className="titre mt-10 text-2xl">{t("riaTitle")}</h3>
          <p className="mt-3 max-w-sm leading-relaxed">{t("riaText")}</p>

          <div className="mt-10">
            <ArrowButton href="/#patrimoine" variant="outline-white">
              {tNav("engagements")}
            </ArrowButton>
          </div>
        </div>
      </div>
    </section>
  );
}
