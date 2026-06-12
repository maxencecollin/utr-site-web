import Image from "next/image";

export default function Parcours() {
  return (
    // clip-path : coupe la carte en haut (bande noire) mais la laisse depasser en bas ;
    // z-10 pour que ce depassement reste visible au-dessus du fond topo de la section suivante
    <section id="parcours" className="relative z-10 bg-white [clip-path:inset(0_0_-9999px_0)]">
      {/* Espace au-dessus : la photo ne touche pas la bande noire des courses.
          Pas d'espace en dessous : le fond topo de la section suivante remonte jusqu'a la photo. */}
      <div className="pt-12">
        <div className="relative">
          {/* Bande du haut : la MEME photo des deux cotes, recadree differemment (horizon aligne, la carte cache la jonction) */}
          <div className="flex h-72 w-full sm:h-[26rem]">
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

          {/* Bande du bas : foule, pleine largeur (separee de celle du haut par un filet blanc) */}
          <div className="relative mt-3 block h-64 w-full sm:h-80">
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
            <div className="relative -ml-[24%] h-[170%] aspect-square">
              <Image
                src="/photos/groupe-321.png"
                alt="Itinéraire : Locoal-Mendon, traversée d'Étel, Sainte-Hélène"
                fill
                sizes="(max-width: 640px) 90vw, 640px"
                className="object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
