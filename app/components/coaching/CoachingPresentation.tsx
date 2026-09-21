import Image from "next/image";
import { useTranslations } from "next-intl";
import ArrowButton from "../ArrowButton";

/*
  Presentation : collage de photos inclinees a gauche, carte papier a droite.

  La graphiste n'a pas livre la carte a bords dechires ni les glyphes d'oiseaux
  de la maquette : la carte est reconstituee avec la texture papier et un
  clip-path irregulier, a remplacer si l'export arrive.
*/
const BORDS_DECHIRES =
  "polygon(0% 4%, 9% 1%, 21% 5%, 33% 1%, 46% 4%, 58% 0%, 71% 4%, 84% 1%, 95% 5%, 100% 2%, 100% 96%, 91% 99%, 78% 95%, 66% 99%, 53% 96%, 40% 100%, 27% 96%, 15% 99%, 5% 95%, 0% 98%)";

export default function CoachingPresentation() {
  const t = useTranslations("coaching");

  return (
    <section id="presentation" className="relative isolate overflow-hidden bg-white py-16 lg:py-24">
      {/* Topographie en filigrane */}
      <Image
        src="/images/deco/topographie.svg"
        alt=""
        width={1600}
        height={900}
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-[0.08]"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex items-end gap-5">
          <Image
            src="/images/icones/fichier-12.svg"
            alt=""
            width={68}
            height={60}
            className="h-12 w-auto shrink-0 brightness-0"
          />
          <div>
            <span className="font-comico inline-block bg-[#6f4126] px-3 py-1 text-[13px] uppercase leading-[21px] tracking-[6px] text-white">
              {t("presentationOverline")}
            </span>
            <h2 className="titre mt-2 text-2xl text-[#2c2c2c] sm:text-4xl">
              {t("presentationTitle")}
            </h2>
          </div>
        </div>
        <span className="mx-[calc(50%-50vw)] mt-4 block h-[2px] bg-[repeating-linear-gradient(90deg,#797979_0,#797979_11px,transparent_11px,transparent_20px)]" />

        <div className="mt-12 grid grid-cols-1 gap-12 lg:mt-16 lg:grid-cols-[52%_1fr] lg:gap-16">
          {/* Collage : grande photo inclinee, deux vignettes posees dessus */}
          <div className="relative mx-auto w-full max-w-[520px] pb-24 pr-10 lg:mx-0 lg:max-w-none">
            <div className="rotate-[-3deg] bg-white p-2 shadow-[0_14px_30px_rgba(0,0,0,0.18)]">
              <Image
                src="/photos/ronan-triathlon.jpg"
                alt={t("altTriathlon")}
                width={900}
                height={1350}
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="h-auto w-full object-cover"
              />
            </div>
            <div className="absolute -right-2 top-[26%] w-[42%] rotate-[3deg] bg-white p-1.5 shadow-[0_12px_26px_rgba(0,0,0,0.2)]">
              <Image
                src="/photos/ronan-trail.jpg"
                alt={t("altTrail")}
                width={900}
                height={600}
                sizes="25vw"
                className="h-auto w-full object-cover"
              />
            </div>
            <div className="absolute -left-2 bottom-0 w-[46%] rotate-[-2deg] bg-white p-1.5 shadow-[0_12px_26px_rgba(0,0,0,0.2)]">
              <Image
                src="/photos/ronan-groupe.jpg"
                alt={t("altGroupe")}
                width={900}
                height={1011}
                sizes="25vw"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>

          {/* Carte papier : nom, fonction, age */}
          <div>
            <div
              className="relative bg-[#f2efe9] bg-[url('/images/deco/papier-fond.jpg')] bg-cover px-8 py-10 shadow-[0_10px_26px_rgba(0,0,0,0.12)]"
              style={{ clipPath: BORDS_DECHIRES }}
            >
              <p className="font-comico text-[30px] uppercase leading-[1.05] text-[#6f4126] sm:text-[40px]">
                {t("nom")}
              </p>
              {/* Trait de pinceau sous le nom */}
              <span
                aria-hidden="true"
                className="mt-1 block h-[6px] w-[86%] rounded-full bg-[#6f4126]"
                style={{ clipPath: "polygon(0% 40%, 6% 0%, 40% 30%, 72% 5%, 100% 35%, 98% 100%, 55% 75%, 20% 100%, 2% 80%)" }}
              />
              <div className="mt-4 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
                <p className="font-comico max-w-[22ch] text-[17px] uppercase leading-[1.3] text-[#1c1c1c] sm:text-[20px]">
                  {t("role")}
                </p>
                <p className="font-comico text-[17px] uppercase text-[#1c1c1c] sm:text-[20px]">
                  {t("age")}
                </p>
              </div>
            </div>

            <span className="mt-8 block h-[2px] max-w-md bg-[repeating-linear-gradient(90deg,#1c1c1c_0,#1c1c1c_9px,transparent_9px,transparent_18px)]" />

            <div className="mt-6 space-y-5 text-[16px] leading-[1.6] text-dark-700">
              <p>{t("bio1")}</p>
              <p>
                {t("bio2Avant")}
                <strong className="font-bold italic text-[#6f4126]">{t("bio2Fort")}</strong>
                {t("bio2Apres")}
              </p>
            </div>

            <div className="mt-9">
              <ArrowButton href="#offres" variant="brown" direction="down">
                {t("ctaEntrainer")}
              </ArrowButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
