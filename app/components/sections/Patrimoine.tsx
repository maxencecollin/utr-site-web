import Image from "next/image";
import SectionHeading from "../SectionHeading";
import ArrowButton from "../ArrowButton";

const LABELS = ["Natura 2000", "ZNIEFF", "Sites classés"];

export default function Patrimoine() {
  return (
    <section id="patrimoine" className="bg-creme py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              overline="La Ria d'Étel, notre"
              title="Patrimoine naturel"
              icon="/images/icones/patrimoine.svg"
              accent="green"
            />

            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs font-bold uppercase tracking-widest text-pinede-500">
              {LABELS.map((label) => (
                <li key={label} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-pinede-400" />
                  {label}
                </li>
              ))}
            </ul>

            <h3 className="titre mt-8 text-xl text-dark-900">
              Un joyau naturel de la Bretagne
            </h3>
            <p className="mt-3 max-w-md text-dark-600">
              Cette ancienne vallée fluviale envahie par la mer abrite une
              biodiversité remarquable : oiseaux migrateurs, poissons, crustacés
              et une flore unique. Nous nous engageons à préserver ce trésor par
              différentes actions.
            </p>

            <div className="mt-8">
              <ArrowButton href="#patrimoine" variant="green">
                Nos engagements
              </ArrowButton>
            </div>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src="/photos/_dsc7014.jpg"
              alt="Coureur dans la Ria d'Étel"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Vue panoramique pleine largeur */}
        <figure className="mt-14">
          <div className="relative aspect-[21/9] w-full overflow-hidden">
            <Image
              src="/photos/ilot-de-nichtarguer-maison-bleue-morbihan-1-scaled.jpg"
              alt="Maison aux volets bleus, Île Saint-Cado"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-pinede-500">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
            </svg>
            Maison aux volets bleu — Île Saint-Cado (Morbihan)
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
