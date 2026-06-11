import Image from "next/image";

export default function Parcours() {
  return (
    <section id="parcours" className="relative overflow-hidden bg-creme">
      {/* Deux bandes photo pleine largeur, empilees */}
      <div className="flex flex-col">
        <div className="relative h-64 w-full sm:h-80">
          <Image
            src="/photos/994.jpg"
            alt="Coureur en mouvement"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="relative h-64 w-full sm:h-80">
          <Image
            src="/photos/calque-24.jpg"
            alt="Ambiance et public"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* Carte d'itineraire dessinee, centree par-dessus (coupe les photos en deux) */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="relative h-[115%] aspect-square">
          <Image
            src="/photos/groupe-321.png"
            alt="Itinéraire : Locoal-Mendon, traversée d'Étel, Sainte-Hélène"
            fill
            sizes="(max-width: 640px) 90vw, 640px"
            className="object-contain drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
