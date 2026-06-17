import Image from "next/image";
import ArrowButton from "../ArrowButton";

const LABELS = ["Natura 2000", "ZNIEFF", "Sites classés"];

export default function Patrimoine() {
  return (
    // Marge haute large : la carte du parcours depasse dans cette section, le texte commence dessous
    <section id="patrimoine" className="relative overflow-hidden bg-white pb-20 pt-56 sm:pt-72 lg:pb-28 lg:pt-80">
      {/* Fond : motif topographique sur blanc (maquette XD) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "url(/images/deco/topographie.svg)",
          backgroundSize: "1400px auto",
          backgroundRepeat: "repeat",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          <div>
            {/* En-tete : picto + cartouche Comico vert + titre + pointilles verts (picto XD : 55x54, ecart 40px) */}
            <div className="flex items-start gap-10">
              <Image
                src="/images/icones/patrimoine.svg?v=2"
                alt=""
                width={55}
                height={54}
                className="h-[54px] w-[55px] shrink-0"
              />

              {/* Tout le texte est aligne sur le bord gauche du cartouche (specs XD : left 262px) */}
              <div className="min-w-0 flex-1">
                <span className="font-comico inline-block bg-pinede-400 px-3 py-1 text-[15px] uppercase leading-[23px] tracking-[9px] text-white">
                  La Ria d&apos;Étel, notre
                </span>
                <h2 className="titre mt-2 text-3xl text-[#2c2c2c] sm:text-4xl">
                  Patrimoine naturel
                </h2>
                <span className="mt-3 block h-0 border-t-2 border-dashed border-pinede-400" />

                {/* Labels reglementaires : Comico 16px vert, separes par des "/" */}
                <ul className="font-comico mt-5 flex flex-wrap items-center gap-x-3 text-[16px] uppercase leading-5 text-pinede-500">
                  {LABELS.map((label, i) => (
                    <li key={label} className="flex items-center gap-x-3">
                      {i > 0 && <span aria-hidden="true">/</span>}
                      {label}
                    </li>
                  ))}
                </ul>

                <h3 className="titre mt-8 text-xl text-[#2c2c2c]">
                  Un joyau naturel
                  <br />
                  de la Bretagne
                </h3>
                <p className="mt-4 max-w-md text-dark-700">
                  Cette ancienne vallée fluviale envahie par la mer abrite une
                  biodiversité remarquable : oiseaux migrateurs, poissons,
                  crustacés et une flore unique. Nous nous engageons à préserver
                  ce trésor par différentes actions :
                </p>

                <div className="mt-8">
                  <ArrowButton href="#patrimoine" variant="green">
                    Nos engagements
                  </ArrowButton>
                </div>
              </div>
            </div>
          </div>

          {/* Photo scotchee en haut au milieu, legerement inclinee (specs XD : 410x457) */}
          <div className="relative mx-auto w-full max-w-[410px] lg:ml-auto">
            <div className="relative aspect-[410/457] w-full -rotate-1 overflow-hidden shadow-[0_3px_6px_#00000029]">
              <Image
                src="/photos/_dsc7014.jpg"
                alt="Coureur dans la Ria d'Étel"
                fill
                sizes="(max-width: 1024px) 100vw, 410px"
                className="object-cover"
              />
            </div>
            <Image
              src="/images/deco/scotch.png"
              alt=""
              width={103}
              height={29}
              className="absolute -top-4 left-1/2 w-[103px] -translate-x-1/2 -rotate-2 opacity-[0.16] shadow-[0_3px_6px_#00000029]"
            />
          </div>
        </div>

        {/* Vue panoramique, scotch sur le coin haut-gauche (specs XD : 1186x403) */}
        <figure className="mt-16">
          {/* Les scotchs sont ancres sur ce conteneur = la photo seule (pas la legende) */}
          <div className="relative">
            <div className="relative aspect-[1186/403] w-full -rotate-1 overflow-hidden shadow-[2px_4px_7px_#00000046]">
              <Image
                src="/photos/ilot-de-nichtarguer-maison-bleue-morbihan-1-scaled.jpg"
                alt="Maison aux volets bleus, Île Saint-Cado"
                fill
                sizes="100vw"
                className="object-cover object-[50%_68%]"
              />
            </div>
            <Image
              src="/images/deco/scotch.png"
              alt=""
              width={92}
              height={29}
              className="absolute -left-6 -top-2 w-[92px] -rotate-[35deg] border-2 border-[#707070] opacity-[0.16] shadow-[0_3px_6px_#00000029]"
            />
            <Image
              src="/images/deco/scotch.png"
              alt=""
              width={96}
              height={29}
              className="absolute -bottom-3 -right-6 w-[96px] -rotate-[29deg] border-2 border-[#707070] opacity-[0.16] shadow-[0_3px_6px_#00000029]"
            />
          </div>
          {/* Legende : Comico 13px sombre, legerement inclinee comme la photo (specs XD) */}
          <figcaption className="font-comico mt-4 flex -rotate-1 items-center gap-2 text-[13px] uppercase leading-5 text-[#1c1c1c]">
            <Image
              src="/images/icones/pin.svg?v=2"
              alt=""
              width={16}
              height={16}
              className="h-4 w-4"
            />
            Maison aux volets bleus — Île Saint-Cado (Morbihan)
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
