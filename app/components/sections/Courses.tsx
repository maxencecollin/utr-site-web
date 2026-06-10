import Placeholder from "../Placeholder";
import ArrowButton from "../ArrowButton";

const COURSES = [
  {
    lignes: ["33", "KM"],
    legende: "Le 33 de la Ria",
    rotation: "lg:-rotate-2",
  },
  {
    lignes: ["80", "KM"],
    legende: "Le tour complet",
    rotation: "lg:-translate-y-8",
  },
  {
    lignes: ["REL", "AIS"],
    legende: "Le tour en duo",
    rotation: "lg:rotate-1",
  },
];

export default function Courses() {
  return (
    <section id="courses" className="bg-creme pt-20 lg:pt-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* En-tete */}
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
            <div className="flex items-center gap-4">
              {/* Surtitre : boite noire, Comico blanc tres espace */}
              <span className="font-comico bg-dark-900 px-3 py-1 text-[15px] uppercase leading-[23px] tracking-[9px] text-white">
                Choisis ton trail !
              </span>
              <span className="h-0 flex-1 border-t-2 border-dashed border-[#101010]" />
              <span className="font-technor text-[23px] font-semibold text-black">
                / 2027
              </span>
            </div>
            <h2 className="titre mt-1 text-4xl text-[#2c2c2c]">Nos courses</h2>
          </div>
        </div>

        {/* Cartes */}
        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {COURSES.map((course) => (
            <figure
              key={course.legende}
              className={`flex flex-col ${course.rotation}`}
            >
              <div className="relative aspect-[2/3] w-full overflow-hidden shadow-[0_3px_8px_#00000029]">
                <Placeholder
                  label="Photo coureur"
                  tone="dark"
                  className="h-full w-full border-0"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-dark-900/70 to-transparent p-5">
                  <span className="chiffre block text-7xl leading-[0.9] text-white [text-shadow:0_3px_6px_#00000086]">
                    {course.lignes[0]}
                    <br />
                    {course.lignes[1]}
                  </span>
                </div>
              </div>
              <figcaption className="mt-4 text-center text-[13px] font-semibold italic uppercase tracking-[1.17px] text-[#2c2c2c]">
                {course.legende}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* Boutons entre deux filets pleine largeur */}
      <div className="mt-16 border-y border-dark-300">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-4 px-6 py-4 lg:px-10">
          <ArrowButton href="#courses" variant="outline-dark" direction="up">
            Détails des courses
          </ArrowButton>
          <ArrowButton href="#inscription" variant="outline-dark">
            Inscription 2027
          </ArrowButton>
        </div>
      </div>
    </section>
  );
}
