import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import ArrowButton from "../ArrowButton";
import CourseSectionHeading from "./CourseSectionHeading";

export type AutreEpreuve = {
  /* Route de la page de course (ex. "/33km") */
  href: string;
  photo: string;
  /* Cadrage de la photo (object-position) */
  photoPosition?: string;
  /* Gros lettrage Technor, une entree par ligne */
  lines: [string, string];
  /* Cle de la legende dans "courses" (pour l'alt) */
  legendKey: string;
};

type Props = {
  epreuves: AutreEpreuve[];
};

/*
  Section "Nos autres epreuves" : deux cartes parallelogrammes sur bande
  marine, boutons details / inscription (maquette XD).
*/
export default function CourseAutresEpreuves({ epreuves }: Props) {
  const t = useTranslations("course");
  const tCourses = useTranslations("courses");
  const tCta = useTranslations("cta");

  return (
    <section id="autres-epreuves" className="relative overflow-hidden bg-white pt-16 lg:pt-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Picto coureur (entrainement.svg, passe en noir par l'en-tete) */}
        <CourseSectionHeading
          icon="/images/icones/entrainement.svg"
          title={t("autresEpreuves")}
          align="right"
        />
      </div>

      {/* Barre decorative marine a gauche (maquette) */}
      <span
        aria-hidden="true"
        className="mt-10 block h-3 w-[32%] bg-[#0d3757]"
      />

      {/* Cartes + bande marine de fond */}
      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 top-0 bg-[#0d3757] sm:top-[38%]"
        />

        <div className="relative mx-auto max-w-6xl px-6 pt-6 lg:px-10">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-14">
            {epreuves.map((epreuve) => (
              <Link
                key={epreuve.href}
                href={epreuve.href}
                className="group relative block aspect-[740/450] -skew-x-3 overflow-hidden shadow-[0_3px_8px_#00000040]"
              >
                <div className="absolute -inset-x-4 inset-y-0 skew-x-3">
                  <Image
                    src={epreuve.photo}
                    alt={tCourses(epreuve.legendKey)}
                    fill
                    sizes="(max-width: 640px) 100vw, 45vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ objectPosition: epreuve.photoPosition ?? "50% 30%" }}
                  />
                </div>
                <span className="chiffre absolute bottom-[8%] left-[7%] skew-x-3 text-6xl leading-[0.92] text-white [text-shadow:0_3px_6px_#00000086] sm:text-7xl">
                  {epreuve.lines[0]}
                  <br />
                  {epreuve.lines[1]}
                </span>
              </Link>
            ))}
          </div>

          {/* Boutons ceintures par deux filets blancs */}
          <div className="mt-12 border-y border-white/70 pb-4 pt-4">
            <div className="flex flex-wrap justify-center gap-4">
              <ArrowButton href="/#courses" variant="outline-white" direction="up">
                {tCourses("details")}
              </ArrowButton>
              <ArrowButton href="#inscription" variant="outline-white">
                {tCta("inscription")}
              </ArrowButton>
            </div>
          </div>
          <div className="pb-14" />
        </div>
      </div>
    </section>
  );
}
