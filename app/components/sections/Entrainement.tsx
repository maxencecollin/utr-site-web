import Image from "next/image";
import SectionHeading from "../SectionHeading";
import ArrowButton from "../ArrowButton";

const THEMES = [
  "Coaching",
  "Matériel",
  "Nutrition",
  "Préparation mentale",
  "Plan d'entraînement",
];

export default function Entrainement() {
  return (
    <section id="entrainement" className="bg-creme py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          overline="Prépares-toi à"
          title="L'entraînement"
          icon="/images/icones/entrainement.svg"
          accent="brown"
        />

        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs font-bold uppercase tracking-widest text-sable-600">
          {THEMES.map((theme) => (
            <li key={theme} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-sable-400" />
              {theme}
            </li>
          ))}
        </ul>

        <div className="mt-12 grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div className="relative aspect-[4/3] w-full overflow-hidden lg:-rotate-2">
            <Image
              src="/photos/venti-views--uyedjt31zy-unsplash.jpg"
              alt="Coureur en plein saut"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="lg:pl-4">
            <h3 className="titre text-2xl text-dark-900">
              Prépares-toi pour ton trail !
            </h3>
            <p className="mt-4 max-w-md text-dark-600">
              Que ce soit pour performer ou terminer ta première course de trail,
              on te donne tous les conseils, pour les novices comme pour les
              expérimentés. On te propose aussi un coach perso pour
              t&apos;accompagner dans ton aventure.
            </p>
            <p className="titre mt-3 text-sable-600">Tiens-toi prêt !</p>
            <div className="mt-8">
              <ArrowButton href="#entrainement" variant="brown">
                Entraîne-toi !
              </ArrowButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
