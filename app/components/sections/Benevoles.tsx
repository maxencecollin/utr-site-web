import Image from "next/image";
import { useTranslations } from "next-intl";
import ArrowButton from "../ArrowButton";

/*
  Section construite aux specs XD (section 1440x694) :
  positions en pourcentages, typo en vw pour rester proportionnelle au cadre.
*/
export default function Benevoles() {
  const t = useTranslations("benevoles");
  return (
    <section id="benevoles" className="relative isolate overflow-hidden text-white">
      {/* DESKTOP/TABLETTE (md+) : composition pleine aux specs XD */}
      <div className="relative hidden aspect-[1440/694] w-full md:block">
        <Image
          src="/photos/img_2769.jpg"
          alt={t("altPhoto")}
          fill
          priority={false}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-dark-900/25" />

        {/* Surtitre (Comico 24px/37px) a left 368 / top 197 */}
        <span className="font-comico absolute left-[25.56%] top-[28.4%] text-[1.667vw] uppercase leading-[2.569vw]">
          {t("overline")}
        </span>

        {/* Filet sous le surtitre (left 363, width 1105 -> bord droit), 2px */}
        <span
          aria-hidden="true"
          className="absolute left-[25.2%] right-0 top-[34.15%] h-0.5 bg-white"
        />

        {/* Picto poignee de main (~84x74) a gauche, centre verticalement sur le titre */}
        <Image
          src="/images/icones/fichier-13.svg?v=2"
          alt=""
          width={84}
          height={74}
          className="absolute left-[11.5%] top-[46%] h-[7.5vw] w-auto -translate-y-1/2"
        />

        {/* Separateur entre picto et titre (left 300, top 6354, height 92, 2px),
            legerement incline facon italique comme le titre */}
        <span
          aria-hidden="true"
          className="absolute left-[21.3%] top-[39.3%] h-[6.39vw] w-0.5 -skew-x-12 bg-white"
        />

        {/* Titre (Inter 800 italic 49px/54px) a left 340 / top 263 */}
        <h2 className="titre absolute left-[23.6%] top-[37.9%] text-[3.403vw] leading-[3.75vw]">
          {t("title1")}
          <br />
          {t("title2")}
        </h2>

        {/* Filet sous le titre (depuis le bord gauche jusqu'a 40.5%), 2px */}
        <span
          aria-hidden="true"
          className="absolute left-0 top-[60.1%] h-0.5 w-[40.5%] bg-white"
        />

        {/* Bouton (cadre 290x54 a left 325 / top 6540) */}
        <div className="absolute left-[22.57%] top-[66.1%]">
          <ArrowButton href="#benevoles" variant="outline-white" textSize="text-[15px]">
            {t("button")}
          </ArrowButton>
        </div>
      </div>

      {/* MOBILE (<md) : contenu empile sur la photo */}
      <div className="relative isolate md:hidden">
        <Image
          src="/photos/img_2769.jpg"
          alt={t("altPhoto")}
          fill
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-dark-900/55" />

        <div className="px-6 py-16">
          <span className="font-comico text-[15px] uppercase tracking-[2px]">
            {t("overline")}
          </span>
          <span aria-hidden="true" className="mt-3 block h-0.5 w-16 bg-white" />

          <div className="mt-6 flex items-center gap-4">
            <Image
              src="/images/icones/fichier-13.svg?v=2"
              alt=""
              width={64}
              height={56}
              className="h-14 w-auto shrink-0"
            />
            <span aria-hidden="true" className="h-14 w-0.5 -skew-x-12 bg-white/80" />
            <h2 className="titre text-3xl leading-[1.05]">
              {t("title1")}
              <br />
              {t("title2")}
            </h2>
          </div>

          <div className="mt-8">
            <ArrowButton href="#benevoles" variant="outline-white">
              {t("button")}
            </ArrowButton>
          </div>
        </div>
      </div>
    </section>
  );
}
