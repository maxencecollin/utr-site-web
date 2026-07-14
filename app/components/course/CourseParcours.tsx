import { useTranslations } from "next-intl";
import ArrowButton from "../ArrowButton";
import CourseSectionHeading from "./CourseSectionHeading";
import ParcoursMap from "./ParcoursMap";

type Props = {
  traceUrl: string;
  /* Libelle de la trace dans la legende (ex. "80 km - Parcours complet") */
  legendTrace: string;
  /* Prefixes (en minuscules) des waypoints du GPX a afficher en marqueurs */
  markers?: string[];
};

/* Section "Le parcours" : fond marine + motif topo, carte OpenStreetMap
   interactive avec legende, boutons GPX / inscription (maquette XD) */
export default function CourseParcours({ traceUrl, legendTrace, markers }: Props) {
  const t = useTranslations("course");
  const tCta = useTranslations("cta");

  return (
    <section id="parcours" className="relative overflow-hidden bg-[#0d3757] py-16 text-white lg:py-20">
      {/* Motif topographique en filigrane (lignes claires sur marine) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-30 invert"
        style={{
          backgroundImage: "url(/images/deco/topographie.svg)",
          backgroundSize: "1400px auto",
          backgroundRepeat: "repeat",
        }}
      />

      {/* Conteneur resserre : pointilles, carte et boutons alignes sur la meme largeur */}
      <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
        {/* Picto provisoire (pin) : le panneau directionnel de la maquette n'est pas dans les assets */}
        <CourseSectionHeading
          icon="/images/icones/pin.svg?v=2"
          title={t("parcoursTitle")}
          align="right"
          tone="light"
          bleed={false}
        />

        <div className="relative mt-10">
          <ParcoursMap
            traceUrl={traceUrl}
            markers={markers}
            startLabel={t("departArrivee")}
            className="h-[420px] w-full border-2 border-white md:h-[520px]"
          />

          {/* Legende (posee sur la carte, au-dessus des tuiles Leaflet) */}
          <div className="absolute bottom-6 left-6 z-[1000] hidden rounded-md bg-white px-5 py-4 text-[#333333] shadow-[0_2px_10px_#00000045] sm:block">
            <p className="text-[15px] font-bold">{t("legendTitle")}</p>
            <ul className="mt-3 space-y-2.5 text-[14px] font-medium">
              <li className="flex items-center gap-3">
                <span aria-hidden="true" className="h-1 w-7 rounded-full bg-[#d9822b]" />
                {legendTrace}
              </li>
              <li className="flex items-center gap-3">
                <svg
                  width="16"
                  height="21"
                  viewBox="0 0 30 40"
                  className="mx-1.5 shrink-0"
                  aria-hidden="true"
                >
                  <path
                    d="M15 0C6.7 0 0 6.7 0 15c0 10.5 15 25 15 25s15-14.5 15-25C30 6.7 23.3 0 15 0z"
                    fill="#3ba55d"
                  />
                  <circle cx="15" cy="14.5" r="6" fill="#ffffff" />
                </svg>
                {t("legendRavito")}
              </li>
            </ul>
          </div>
        </div>

        {/* Boutons : GPX a gauche, inscription a droite */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4">
          <ArrowButton href={traceUrl} variant="outline-white" direction="up">
            {t("downloadGpx")}
          </ArrowButton>
          <ArrowButton href="#inscription" variant="outline-white">
            {tCta("inscription")}
          </ArrowButton>
        </div>
      </div>
    </section>
  );
}
