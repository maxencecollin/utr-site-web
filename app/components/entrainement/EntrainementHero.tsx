import Image from "next/image";
import { useTranslations } from "next-intl";
import Countdown from "../Countdown";
import ArrowButton from "../ArrowButton";

/*
  Hero de la page Entrainement (maquette XD) : photo plein cadre floutee,
  picto haltere, titre Comico sur deux lignes, cartouche marron, compte a rebours.
  Meme ossature que le hero de la landing, mais titre a la place du badge date.
*/
export default function EntrainementHero() {
  const t = useTranslations("entrainementPage");
  const tNav = useTranslations("nav");
  const tCta = useTranslations("cta");

  return (
    <section
      id="top"
      className="relative isolate flex min-h-screen flex-col overflow-hidden text-white"
    >
      <Image
        src="/photos/calque-24.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-[50%_50%]"
      />
      {/* Voile sombre : la maquette garde la photo tres lisible au centre */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-dark-900/35 via-dark-900/15 to-dark-900/45" />


      <div className="flex flex-1 flex-col items-center px-6 pt-24 text-center">
        <div className="flex flex-1 flex-col items-center justify-center gap-6">
          {/* Picto haltere : le SVG source est marron, on le repasse en blanc */}
          <Image
            src="/images/icones/fichier-12.svg"
            alt=""
            width={68}
            height={60}
            className="h-[62px] w-auto brightness-0 invert"
          />

          <h1 className="headline text-4xl leading-[1.1] sm:text-6xl lg:text-[76px]">
            {t("heroTitleLine1")}
            <br />
            {t("heroTitleLine2")}
          </h1>

          {/* Cartouche marron incline (#6f4126, meme brun que les cartouches de la landing) */}
          <span className="relative inline-block px-4 py-1.5">
            <span aria-hidden="true" className="absolute inset-0 -skew-x-12 bg-[#6f4126]" />
            <span className="relative text-[15px] font-bold uppercase tracking-[2px]">
              {t("heroSubtitle")}
            </span>
          </span>
        </div>

        <div className="mb-5 lg:mb-7">
          <Countdown />
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 pb-8 lg:px-10">
        <div className="flex items-end justify-between gap-4">
          <ArrowButton href="/#courses" variant="outline-white">
            {tNav("epreuves")}
          </ArrowButton>

          <ArrowButton href="#inscription" variant="outline-white">
            {tCta("inscription")}
          </ArrowButton>
        </div>
      </div>
    </section>
  );
}
