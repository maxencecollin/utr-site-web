import Image from "next/image";
import ArrowButton from "../ArrowButton";

const COURSES = [
  {
    lignes: ["33", "KM"],
    legende: "Le 33 de la Ria",
    rotation: "lg:-rotate-2",
    photo: "/photos/_dsc6696-girl.jpg",
  },
  {
    lignes: ["80", "KM"],
    legende: "Le tour complet",
    rotation: "",
    photo: "/photos/_dsc6870-guy.jpg",
  },
  {
    lignes: ["REL", "AIS"],
    legende: "Le tour en duo",
    rotation: "lg:rotate-1",
    photo: "/photos/_dsc6509-girl2.jpg",
  },
];

export default function Courses() {
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
      <div className="relative mt-12 pb-10">
        {/* Bande noire : du milieu des "KM" jusqu'un peu sous les legendes */}
        <div className="absolute inset-x-0 bottom-0 top-[76%] bg-black" aria-hidden="true" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {COURSES.map((course) => (
              <figure key={course.legende} className="flex flex-col">
                {/* Carte photo (seule a etre legerement inclinee) */}
                <div
                  className={`relative aspect-[2/3] w-full overflow-hidden shadow-[0_3px_8px_#00000029] ${course.rotation}`}
                >
                  <Image
                    src={course.photo}
                    alt={course.legende}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover"
                  />
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

      {/* Bas de section : reste noir ; boutons noirs (contour blanc) ceintures par deux filets blancs */}
      <div className="bg-black pb-14">
        <div className="border-y border-white/70">
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
