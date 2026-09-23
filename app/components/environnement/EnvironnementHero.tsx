import Image from "next/image";
import { useTranslations } from "next-intl";
import Countdown from "../Countdown";
import ArrowButton from "../ArrowButton";

/* Hero de la page Environnement : entree de la ria vue du ciel, titre incline
   et cartouche bleu comme le hero de la landing */
export default function EnvironnementHero() {
  const t = useTranslations("environnement");
  const tCta = useTranslations("cta");

  return (
    <section id="top" className="relative isolate flex min-h-screen flex-col overflow-hidden text-white">
      <Image
        src="/photos/env-hero.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-dark-900/35 via-dark-900/5 to-dark-900/40" />

      <div className="flex flex-1 flex-col items-center px-6 pt-24 text-center">
        <div className="flex flex-1 flex-col items-center justify-center gap-5">
          <Image
            src="/images/icones/patrimoine.svg?v=2"
            alt=""
            width={68}
            height={64}
            className="h-[60px] w-auto brightness-0 invert"
          />
          <h1 className="headline -rotate-[5deg] text-4xl leading-[1.15] sm:text-6xl lg:text-[64px]">
            {t("heroTitleLine1")}
            <br />
            {t("heroTitleLine2")}
          </h1>
          <span className="inline-block -rotate-[5deg]">
            <span className="relative inline-block px-4 py-1.5">
              <span aria-hidden="true" className="absolute inset-0 -skew-x-12 bg-ria-500" />
              <span className="relative text-[15px] font-bold uppercase tracking-[1px]">
                {t("heroSubtitle")}
              </span>
            </span>
          </span>
        </div>

        <div className="mb-5 lg:mb-7">
          <Countdown />
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 pb-8 lg:px-10">
        <div className="flex items-end justify-between gap-4">
          <ArrowButton href="#engagements" variant="outline-white" direction="down">
            {t("heroCta")}
          </ArrowButton>
          <ArrowButton href="#inscription" variant="outline-white">
            {tCta("inscription")}
          </ArrowButton>
        </div>
      </div>
    </section>
  );
}
