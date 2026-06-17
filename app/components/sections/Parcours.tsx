import Image from "next/image";

export default function Parcours() {
  return (
    // clip-path : coupe la carte en haut (bande noire) mais la laisse depasser en bas ;
    // z-10 pour que ce depassement reste visible au-dessus du fond topo de la section suivante
    <section id="parcours" className="relative z-10 bg-white [clip-path:inset(0_0_-9999px_0)]">
      {/* Espace au-dessus : la photo ne touche pas la bande noire des courses.
          Pas d'espace en dessous : le fond topo de la section suivante remonte jusqu'a la photo. */}
      <div className="pt-12">
        {/* Conteneur a ratio fixe (composition validee a 1440x748) : tout est en
            pourcentages, donc bandes ET carte scalent ensemble a toutes les largeurs */}
        <div className="relative aspect-[1440/748] w-full">
          {/* Bande du haut (55.6%) : la MEME photo des deux cotes, recadree differemment
              (horizon aligne, la carte cache la jonction) */}
          <div className="absolute inset-x-0 top-0 flex h-[55.6%]">
            {/* Gauche : juste l'effet bleu (mer/ciel floue, extreme gauche de la meme photo) */}
            <div
              className="relative w-[34%]"
              aria-hidden="true"
              style={{
                backgroundImage: "url(/photos/_dsc6875.jpg)",
                backgroundSize: "400% auto",
                backgroundPosition: "left 52%",
                backgroundRepeat: "no-repeat",
              }}
            />
            {/* Droite : le coureur entier */}
            <div className="relative w-[66%]">
              <Image
                src="/photos/_dsc6875.jpg"
                alt="Coureur en mouvement"
                fill
                sizes="66vw"
                className="object-cover object-[32%_42%]"
              />
            </div>
          </div>

          {/* Bande du bas (42.8%) : foule, pleine largeur (filet blanc de 1.6% au-dessus) */}
          <div className="absolute inset-x-0 bottom-0 h-[42.8%]">
            <Image
              src="/photos/calque-24.jpg"
              alt="Foule de coureurs"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          {/* Carte d'itineraire dessinee, a gauche et grosse, traverse les photos */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-start">
            <div className="relative -ml-[18%] h-[185%] aspect-square">
              <Image
                src="/photos/groupe-321.png"
                alt="Itinéraire : Locoal-Mendon, traversée d'Étel, Sainte-Hélène"
                fill
                sizes="(max-width: 640px) 90vw, 900px"
                className="object-contain [filter:drop-shadow(0_2px_3px_rgba(0,0,0,0.28))]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
