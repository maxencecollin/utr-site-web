import Image from "next/image";
import ArrowButton from "../ArrowButton";

const PARTNERS = [
  { nom: "Decathlon", niveau: "Officiel", src: "/images/partenaires/decathlon.svg", w: 313, h: 203 },
  { nom: "Kinetik", niveau: "Privilège", src: "/images/partenaires/kinetik.svg", w: 171, h: 159 },
  { nom: "UTMB Index", niveau: "Majeur", src: "/images/partenaires/utmb-index.svg", w: 185, h: 44 },
  { nom: "Plancoët", niveau: "Majeur", src: "/images/partenaires/plancoet.svg", w: 216, h: 101 },
];

export default function Partenaires() {
  return (
    <section id="partenaires" className="bg-white pb-24 pt-20 lg:pb-32 lg:pt-24">
      {/* En-tete : ermine + cartouche Comico noir + titre + pointilles */}
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex items-start gap-5">
          <Image
            src="/images/icones/fichier-10.svg?v=2"
            alt=""
            width={68}
            height={60}
            className="h-[60px] w-[68px] shrink-0"
          />

          <div className="min-w-0 flex-1">
            <span className="font-comico inline-block bg-black px-3 py-1 text-[15px] uppercase leading-[23px] tracking-[9px] text-white">
              Merci à tous
            </span>
            <h2 className="titre mt-2 text-[46px] leading-[56px] text-[#2c2c2c]">
              Nos partenaires
            </h2>
            <span className="mt-2 block h-[2px] bg-[repeating-linear-gradient(90deg,#101010_0,#101010_11px,transparent_11px,transparent_20px)]" />
          </div>
        </div>
      </div>

      {/* Bandeau bleu pleine largeur avec les logos */}
      <div className="relative isolate mt-12 overflow-hidden">
        <Image
          src="/photos/994.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="relative mx-auto max-w-[88rem] px-6 lg:px-10">
          {/* Logos + bouton centres ensemble, separes par des filets blancs inclines (65px, 1px) */}
          <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-10 py-20">
            {PARTNERS.map((p, i) => (
              <div key={p.nom} className="flex items-center gap-x-7">
                {i > 0 && (
                  <span aria-hidden="true" className="hidden h-[65px] w-px -skew-x-12 bg-white/50 lg:block" />
                )}
                <div className="text-center">
                  <Image
                    src={p.src}
                    alt={p.nom}
                    width={p.w}
                    height={p.h}
                    className="mx-auto h-14 w-auto"
                  />
                  <span className="mt-4 block text-[13px] font-bold uppercase tracking-[2px] text-white/85">
                    {p.niveau}
                  </span>
                </div>
              </div>
            ))}

            <ArrowButton href="#partenaires" variant="outline-white" textSize="text-[14px]">
              Nos partenaires
            </ArrowButton>
          </div>
        </div>
      </div>
    </section>
  );
}
