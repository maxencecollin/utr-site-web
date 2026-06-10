import SectionHeading from "../SectionHeading";
import Placeholder from "../Placeholder";
import ArrowButton from "../ArrowButton";

const ETAPES = [
  {
    lieu: "Locoal-Mendon",
    km: "0 km",
    badge: "Départ / D1",
    details: ["#1 Course principale", "#3 Course relais 1/2"],
  },
  {
    lieu: "Traversée en bateau",
    km: "Étel ↔ Le Magouër",
    badge: "Natura 2000",
    details: ["Passage emblématique de la Ria d'Étel"],
  },
  {
    lieu: "Sainte-Hélène",
    km: "Départ / D2",
    badge: "Relais",
    details: ["#2 Course secondaire", "#3 Course relais 2/2"],
  },
  {
    lieu: "Locoal-Mendon",
    km: "80 km",
    badge: "Arrivée",
    details: ["Ligne d'arrivée et village festif"],
  },
];

export default function Parcours() {
  return (
    <section id="parcours" className="bg-creme py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          overline="Au fil de la ria"
          title="Le parcours"
          accent="blue"
        />

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Itineraire (la carte dessinee a la main remplacera ce bloc) */}
          <ol className="relative rounded-lg border border-dark-200 bg-white p-8 shadow-sm">
            {ETAPES.map((etape, i) => (
              <li key={`${etape.lieu}-${i}`} className="relative flex gap-5 pb-8 last:pb-0">
                {/* Ligne verticale */}
                {i < ETAPES.length - 1 && (
                  <span className="absolute left-[7px] top-5 h-full w-px bg-dark-200" />
                )}
                <span className="mt-1 h-4 w-4 shrink-0 rounded-full border-2 border-ria-500 bg-white" />
                <div>
                  <span className="text-[0.7rem] font-bold uppercase tracking-widest text-ria-500">
                    {etape.badge}
                  </span>
                  <h3 className="titre text-xl text-dark-900">
                    {etape.lieu}{" "}
                    <span className="text-base text-dark-400">· {etape.km}</span>
                  </h3>
                  <ul className="mt-1 space-y-0.5 text-sm text-dark-500">
                    {etape.details.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}

            <div className="mt-4 border-t border-dashed border-dark-200 pt-6">
              <ArrowButton href="#inscription" variant="blue">
                Inscription 2027
              </ArrowButton>
            </div>
          </ol>

          {/* Photos */}
          <div className="grid grid-rows-2 gap-6">
            <Placeholder label="Photo coureur en mouvement" tone="dark" className="min-h-48 w-full border-0" />
            <Placeholder label="Photo foule / ambiance" tone="dark" className="min-h-48 w-full border-0" />
          </div>
        </div>
      </div>
    </section>
  );
}
