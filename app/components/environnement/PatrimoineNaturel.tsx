import Image from "next/image";
import { useTranslations } from "next-intl";
import EnvHeading from "./EnvHeading";
import PhotoScotchee from "./PhotoScotchee";

/* Nom d'espece ou chiffre mis en avant dans le texte (Comico, comme la maquette) */
function Mot({ children, vert = false }: { children: React.ReactNode; vert?: boolean }) {
  return (
    <span className={`font-comico uppercase tracking-wide ${vert ? "text-pinede-500" : ""}`}>
      {children}
    </span>
  );
}

export default function PatrimoineNaturel() {
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
        <EnvHeading overline={t("patriOverline")} titre={t("patriTitre")} />

        {/* Texte + photo du coureur */}
        <div className="mt-10 grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_38%] lg:gap-16">
          <div className="lg:pl-[76px]">
            <h3 className="titre max-w-[16ch] text-[20px] leading-[1.25] sm:text-[22px]">{t("patriSousTitre")}</h3>
            <div className="mt-5 max-w-[444px] space-y-4 text-[17px] leading-[1.3] text-dark-700">
              <p>{t("patriTexte1")}</p>
              <p>
                {t("patriTexte2Avant")}
                <Mot vert>{t("patriSurface")}</Mot>
                {t("patriTexte2Apres")}
              </p>
            </div>
          </div>
          <PhotoScotchee
            src="/photos/_dsc7014.jpg"
            alt={t("patriAltCoureur")}
            ratio="410/457"
            sizes="(min-width: 1024px) 38vw, 90vw"
            rotation={1.5}
            className="mx-auto w-full max-w-[380px] lg:-mt-24 lg:mr-0"
          />
        </div>

        {/* Collage des especes + texte a droite */}
        <div className="mt-16 grid grid-cols-1 items-start gap-12 lg:mt-12 lg:grid-cols-[1fr_40%] lg:gap-16">
          {/* Collage : empile en grille sur mobile, photos posees en chevauchement
              sur grand ecran (cotes relevees sur la maquette, loutre 364 px,
              saumon 274 px, lamproie 290 px) */}
          <div className="grid grid-cols-[1.15fr_1fr] items-start gap-4 sm:gap-6 lg:relative lg:-ml-[58px] lg:block lg:h-[640px]">
            <PhotoScotchee
              src="/photos/env-loutre.jpg"
              alt={t("patriAltLoutre")}
              ratio="900/1150"
              sizes="(min-width: 1024px) 364px, 50vw"
              rotation={-2}
              legende={t("patriLoutre")}
              className="row-span-2 lg:absolute lg:left-0 lg:top-0 lg:w-[364px]"
            />
            <PhotoScotchee
              src="/photos/env-saumon.jpg"
              alt={t("patriAltSaumon")}
              ratio="274/300"
              sizes="(min-width: 1024px) 274px, 42vw"
              rotation={2}
              position="50% 35%"
              legende={t("patriSaumon")}
              className="pt-6 lg:absolute lg:left-[330px] lg:top-[10px] lg:z-10 lg:w-[274px] lg:pt-0"
            />
            <PhotoScotchee
              src="/photos/env-lamproie.jpg"
              alt={t("patriAltLamproie")}
              ratio="900/560"
              sizes="(min-width: 1024px) 290px, 42vw"
              rotation={-3}
              legende={t("patriLamproie")}
              className="lg:absolute lg:left-[420px] lg:top-[390px] lg:z-20 lg:w-[290px]"
            />
          </div>

          <div className="space-y-5 text-[17px] leading-[1.3] text-dark-700 lg:ml-auto lg:max-w-[400px] lg:pt-24 lg:text-right">
            <p>
              {t("patriEspeces1")}
              <Mot>{t("patriLoutre")}</Mot>
              {t("patriEspeces2")}
              <Mot>{t("patriSaumon")}</Mot>
              {t("patriEspeces3")}
              <Mot>{t("patriLamproie")}</Mot>
              {t("patriEspeces4")}
            </p>
            <p>{t("patriUsages")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
