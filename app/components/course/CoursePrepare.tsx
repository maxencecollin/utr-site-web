import Image from "next/image";
import { useTranslations } from "next-intl";
import ArrowButton from "../ArrowButton";
import CourseSectionHeading from "./CourseSectionHeading";

// Page dediee a l'entrainement a venir ; en attendant, ancre de la landing
const HREF_ENTRAINEMENT = "/#entrainement";

type Props = {
  /* Couleur des bandes decoratives (classe bg-*), marine par defaut */
  stripeClass?: string;
};

/*
  Section "Prepare ta course" : echo de la section Entrainement de la landing
  (photo scotchee + traits, texte a droite), avec les traits a la couleur de la course.
*/
export default function CoursePrepare({ stripeClass = "bg-[#0d3757]" }: Props) {
  const t = useTranslations("course");
  const tEntrainement = useTranslations("entrainement");

  return (
    <section id="prepare" className="overflow-hidden bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <CourseSectionHeading
          icon="/images/icones/fichier-12.svg"
          title={t("prepareTitle")}
          align="right"
        />

        <div className="mt-14 grid grid-cols-1 items-center gap-12 lg:grid-cols-[55%_1fr]">
          <div className="relative">
            {/* Bandes colorees, plus fines que les marrons de la landing (maquette) */}
            <span
              aria-hidden="true"
              className={`absolute right-[75.2%] top-[21%] h-[7px] w-screen -rotate-1 ${stripeClass}`}
            />
            <span
              aria-hidden="true"
              className={`absolute left-[80.4%] top-[68.4%] h-[7px] w-[276px] -rotate-1 ${stripeClass}`}
            />
            <span
              aria-hidden="true"
              className={`absolute left-[82.7%] top-[77.6%] h-[7px] w-[276px] -rotate-1 ${stripeClass}`}
            />

            {/* Photo scotchee, legerement inclinee */}
            <div className="relative aspect-[665/456] w-full -rotate-1 overflow-hidden shadow-[0_3px_6px_#00000029]">
              <Image
                src="/photos/miguel-alcantara-nFz4XuVpPD8-unsplash.jpg"
                alt={t("altPrepare")}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
            </div>

            <Image
              src="/images/deco/scotch.png"
              alt=""
              width={91}
              height={29}
              className="absolute -left-5 -top-3.5 w-[91px] -rotate-[37deg] opacity-[0.16] shadow-[0_3px_6px_#00000029]"
            />
            <Image
              src="/images/deco/scotch.png"
              alt=""
              width={96}
              height={29}
              className="absolute -bottom-2 -right-5 w-[96px] -rotate-[29deg] opacity-[0.16] shadow-[0_3px_6px_#00000029]"
            />
          </div>

          <div className="flex flex-col items-start text-left lg:items-end lg:text-right">
            <h3 className="titre text-xl text-[#2c2c2c]">
              {tEntrainement("subtitle1")}
              <br />
              {tEntrainement("subtitle2")}
            </h3>
            <p className="mt-4 max-w-sm text-dark-700">{t("prepareText")}</p>
            <p className="mt-1 font-bold italic text-dark-800">
              {tEntrainement("ready")}
            </p>
            <div className="mt-8">
              <ArrowButton href={HREF_ENTRAINEMENT} variant="outline-dark">
                {tEntrainement("button")}
              </ArrowButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
