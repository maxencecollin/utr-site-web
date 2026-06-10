import SectionHeading from "../SectionHeading";
import Placeholder from "../Placeholder";
import ArrowButton from "../ArrowButton";

const COURSES = [
  { lignes: ["33", "KM"], legende: "Le 33 de la Ria", rotation: "lg:-rotate-3" },
  { lignes: ["80", "KM"], legende: "Le tour complet", rotation: "lg:-translate-y-6" },
  { lignes: ["REL", "AIS"], legende: "Le tour en duo", rotation: "lg:rotate-3" },
];

export default function Courses() {
  return (
    <section id="courses" className="bg-creme py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          overline="Choisis ton trail !"
          title="Nos courses"
          accent="dark"
          trailing={
            <span className="titre text-sm text-dark-400">/ 2027</span>
          }
        />

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3">
          {COURSES.map((course) => (
            <figure
              key={course.legende}
              className={`flex flex-col items-center ${course.rotation}`}
            >
              <div className="relative w-full overflow-hidden border-4 border-dark-900 shadow-xl">
                <Placeholder
                  label="Photo coureur"
                  tone="dark"
                  className="aspect-[3/4] w-full border-0"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-dark-900/80 to-transparent p-5">
                  <span className="titre block text-5xl leading-none text-white lg:text-6xl">
                    {course.lignes[0]}
                    <br />
                    {course.lignes[1]}
                  </span>
                </div>
              </div>
              <figcaption className="titre mt-4 text-sm text-dark-500">
                {course.legende}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
          <ArrowButton href="#courses" variant="outline-dark" direction="up">
            Détails des courses
          </ArrowButton>
          <ArrowButton href="#inscription" variant="dark">
            Inscription 2027
          </ArrowButton>
        </div>
      </div>
    </section>
  );
}
