import Placeholder from "../Placeholder";
import ArrowButton from "../ArrowButton";

const COURSES = [
  { lignes: ["33", "KM"], legende: "Le 33 de la Ria", rotation: "lg:-rotate-2" },
  { lignes: ["80", "KM"], legende: "Le tour complet", rotation: "" },
  { lignes: ["REL", "AIS"], legende: "Le tour en duo", rotation: "lg:rotate-1" },
];

export default function Courses() {
  return (
    <section id="courses" className="relative overflow-hidden bg-white pt-20 lg:pt-28">
      {/* En-tete (sur fond blanc) */}
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex items-start gap-4">
          {/* Picto de section (asset a venir) */}
          <span
            className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center bg-dark-900 text-white"
            aria-hidden="true"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
              <path
                d="M4 18l5-9 4 6 3-4 4 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>

          <div className="min-w-0 flex-1">
            <span className="font-comico inline-block bg-dark-900 px-3 py-1 text-[15px] uppercase leading-[23px] tracking-[9px] text-white">
              Choisis ton trail !
            </span>
            <div className="mt-2 flex items-baseline justify-between gap-4">
              <h2 className="titre text-4xl text-[#2c2c2c]">Nos courses</h2>
              <span className="font-technor text-[23px] font-semibold text-black">
                / 2027
              </span>
            </div>
            <span className="mt-3 block h-0 border-t-2 border-dashed border-[#101010]" />
          </div>
        </div>
      </div>

      {/* Zone cartes + bande noire de fond */}
      <div className="relative mt-12">
        {/* Bande noire : couvre le bas des cartes, les legendes et les boutons */}
        <div className="absolute inset-x-0 bottom-0 top-[60%] bg-black" aria-hidden="true" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {COURSES.map((course) => (
              <figure key={course.legende} className="flex flex-col">
                {/* Carte photo (seule a etre legerement inclinee) */}
                <div
                  className={`relative aspect-[2/3] w-full overflow-hidden shadow-[0_3px_8px_#00000029] ${course.rotation}`}
                >
                  <Placeholder label="Photo coureur" tone="dark" className="h-full w-full border-0" />
                  <span className="chiffre absolute inset-x-0 bottom-[10%] text-center text-7xl leading-[0.92] text-white [text-shadow:0_3px_6px_#00000086] sm:text-8xl">
                    {course.lignes[0]}
                    <br />
                    {course.lignes[1]}
                  </span>
                </div>
                {/* Legende : droite (non inclinee), sur la bande noire */}
                <figcaption className="mt-5 text-center text-[13px] font-semibold italic uppercase tracking-[1.17px] text-white">
                  {course.legende}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>

      {/* Boutons sur la bande noire, entre deux filets blancs pleine largeur */}
      <div className="bg-black">
        <div className="border-y border-white/80">
          <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-4 px-6 py-4 lg:px-10">
            <ArrowButton href="#courses" variant="outline-white" direction="up">
              Détails des courses
            </ArrowButton>
            <ArrowButton href="#inscription" variant="outline-white">
              Inscription 2027
            </ArrowButton>
          </div>
        </div>
      </div>
    </section>
  );
}
