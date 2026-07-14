import Image from "next/image";
import { useTranslations } from "next-intl";
import Header from "../Header";
import Countdown from "../Countdown";
import ArrowButton from "../ArrowButton";
import UtmbBadge from "./UtmbBadge";

type Props = {
  /* Gros lettrage Technor du hero, une entree par ligne (ex. ["80 KM"]) */
  titleLines: string[];
  photo: string;
  photoAlt: string;
  /* Cadrage de la photo (object-position) */
  photoPosition?: string;
  /* Categorie d'index UTMB ; omis = pas de badge */
  utmbIndex?: string;
};

export default function CourseHero({
  titleLines,
  photo,
  photoAlt,
  photoPosition = "50% 30%",
  utmbIndex,
}: Props) {
  const t = useTranslations("course");
  const tCta = useTranslations("cta");

  return (
    <section
      id="top"
      className="relative isolate flex min-h-screen flex-col overflow-hidden text-white"
    >
      {/* Fond : photo plein cadre + voile sombre */}
      <Image
        src={photo}
        alt={photoAlt}
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
        style={{ objectPosition: photoPosition }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-dark-900/25 via-dark-900/5 to-dark-900/45" />

      <Header />

      {/* Contenu central */}
      <div className="flex flex-1 flex-col items-center px-6 pt-24 text-center">
        <div className="flex flex-1 flex-col items-center justify-center">
          <h1 className="chiffre text-[clamp(5rem,17vw,15.5rem)] leading-[0.95] text-white">
            {titleLines.map((line, i) => (
              <span key={line} className={i > 0 ? "block" : undefined}>
                {line}
              </span>
            ))}
          </h1>
          {utmbIndex && <UtmbBadge index={utmbIndex} white className="mt-4" />}
        </div>

        {/* Compte a rebours, place plus bas */}
        <div className="mb-5 lg:mb-7">
          <Countdown />
        </div>
      </div>

      {/* Bas de hero : details de la course + inscription */}
      <div className="mx-auto w-full max-w-7xl px-6 pb-8 lg:px-10">
        <div className="flex items-end justify-between gap-4">
          <ArrowButton href="#epreuve" variant="outline-white" direction="down">
            {t("detailsCourse")}
          </ArrowButton>

          <ArrowButton href="#inscription" variant="outline-white">
            {tCta("inscription")}
          </ArrowButton>
        </div>
      </div>
    </section>
  );
}
