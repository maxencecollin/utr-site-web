import Image from "next/image";
import { useTranslations } from "next-intl";
import ArrowButton from "../ArrowButton";

// Le gros lettrage : distance fixe (33/80 KM, universel) ou mot "relais" traduit (2 lignes).
const COURSES = [
  {
    id: "trail33",
    lignes: ["33", "KM"] as [string, string] | null,
    legendKey: "legendTrail33",
    rotation: "lg:-rotate-2",
    photo: "/photos/_dsc6696-girl.jpg",
    flip: false,
    zoom: "scale-110",
  },
  {
    id: "ultra80",
    lignes: ["80", "KM"] as [string, string] | null,
    legendKey: "legendUltra80",
    rotation: "",
    photo: "/photos/_dsc6870-guy.jpg",
    flip: true,
    zoom: "scale-110",
  },
  {
    id: "relais",
    lignes: null,
    legendKey: "legendRelais",
    rotation: "lg:rotate-1",
    photo: "/photos/_dsc6509-girl2.jpg",
    flip: false,
    zoom: "scale-125",
  },
];

export default function Courses() {
  const t = useTranslations("courses");
  const tCta = useTranslations("cta");
  return (
    <section id="courses" className="relative overflow-hidden bg-white pt-20 lg:pt-28">
      {/* En-tete (sur fond blanc) */}
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex items-start gap-4">
          {/* Picto de section */}
          <Image
            src="/images/icones/courses.svg"
            alt=""
            width={44}
            height={44}
            className="mt-1 h-11 w-11 shrink-0"
          />

          <div className="min-w-0 flex-1">
            <span className="font-comico inline-block bg-dark-900 px-3 py-1 text-[15px] uppercase leading-[23px] tracking-[9px] text-white">
              {t("overline")}
            </span>
            <div className="mt-2 flex items-baseline justify-between gap-4">
              <h2 className="titre text-3xl text-[#2c2c2c] sm:text-4xl">{t("title")}</h2>
              <span className="font-technor text-[23px] font-semibold text-black">
                / 2027
              </span>
            </div>
            <span className="mt-3 block h-0 border-t-2 border-dashed border-[#101010]" />
          </div>
        </div>
      </div>

      {/* Zone cartes + bande noire de fond */}
      <div className="relative mt-12 pb-10">
        {/* Bande noire : sur mobile (cartes empilees) elle couvre toute la zone ;
            sur desktop elle part du milieu des "KM" (cartes cote a cote) */}
        <div className="absolute inset-x-0 bottom-0 top-0 bg-black sm:top-[76%]" aria-hidden="true" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {COURSES.map((course) => {
              const legend = t(course.legendKey);
              const lignes = course.lignes ?? [t("relaisLine1"), t("relaisLine2")];
              return (
                <figure key={course.id} className="flex flex-col">
                  {/* Carte photo (seule a etre legerement inclinee) */}
                  <div
                    className={`relative aspect-[425/654] w-full overflow-hidden shadow-[0_3px_8px_#00000029] ${course.rotation}`}
                  >
                    {/* Conteneur de zoom (le flip reste sur l'image pour eviter le conflit de transform) */}
                    <div className={`absolute inset-0 ${course.zoom}`}>
                      <Image
                        src={course.photo}
                        alt={legend}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className={`object-cover ${course.flip ? "-scale-x-100" : ""}`}
                      />
                    </div>
                    <span className="chiffre absolute inset-x-0 bottom-[10%] text-center text-7xl leading-[0.92] text-white [text-shadow:0_3px_6px_#00000086] sm:text-8xl">
                      {lignes[0]}
                      <br />
                      {lignes[1]}
                    </span>
                  </div>
                  {/* Legende : droite (non inclinee), sur la bande noire */}
                  <figcaption className="mt-5 text-center text-[13px] font-semibold italic uppercase tracking-[1.17px] text-white">
                    {legend}
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bas de section : reste noir ; boutons noirs (contour blanc) ceintures par deux filets blancs */}
      <div className="bg-black pb-14">
        <div className="border-y border-white/70">
          <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-4 px-6 py-4 lg:px-10">
            <ArrowButton href="#courses" variant="outline-white" direction="up">
              {t("details")}
            </ArrowButton>
            <ArrowButton href="#inscription" variant="outline-white">
              {tCta("inscription")}
            </ArrowButton>
          </div>
        </div>
      </div>
    </section>
  );
}
