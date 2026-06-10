import SectionHeading from "../SectionHeading";
import Placeholder from "../Placeholder";

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
          {/* Carte d'itineraire dessinee : fournie sous forme d'asset graphique */}
          <Placeholder
            label="Carte d'itinéraire (asset à venir)"
            tone="light"
            className="min-h-[28rem] w-full rounded-lg border-0"
          />

          {/* Photos */}
          <div className="grid grid-rows-2 gap-6">
            <Placeholder
              label="Photo coureur en mouvement"
              tone="dark"
              className="min-h-48 w-full border-0"
            />
            <Placeholder
              label="Photo foule / ambiance"
              tone="dark"
              className="min-h-48 w-full border-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
