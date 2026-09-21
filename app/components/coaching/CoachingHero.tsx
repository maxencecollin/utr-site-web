import Image from "next/image";
import { useTranslations } from "next-intl";
import Countdown from "../Countdown";
import ArrowButton from "../ArrowButton";

/* Hero de la page Coaching : meme ossature que celui de la page Entrainement */
export default function CoachingHero() {
  const t = useTranslations("coaching");
  const tNav = useTranslations("nav");
  const tCta = useTranslations("cta");

  return (
    <section
      id="top"
      className="relative isolate flex min-h-screen flex-col overflow-hidden text-white"
    >
      <Image
        src="/photos/ronan-hero.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-[50%_35%]"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-dark-900/45 via-dark-900/15 to-dark-900/50" />

      <div className="flex flex-1 flex-col items-center px-6 pt-24 text-center">
        <div className="flex flex-1 flex-col items-center justify-center gap-5">
          <h1 className="headline text-4xl leading-[1.1] sm:text-6xl lg:text-[70px]">
            {t("heroTitleLine1")}
            <br />
            {t("heroTitleLine2")}
          </h1>
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
