import Image from "next/image";
import SectionHeading from "../SectionHeading";
import ArrowButton from "../ArrowButton";

const PARTNERS = [
  { nom: "Decathlon", niveau: "Officiel", src: "/images/partenaires/decathlon.svg" },
  { nom: "Kinetik", niveau: "Privilège", src: "/images/partenaires/kinetik.svg" },
  { nom: "UTMB Index", niveau: "Majeur", src: "/images/partenaires/utmb-index.svg" },
  { nom: "Plancoët", niveau: "Majeur", src: "/images/partenaires/plancoet.svg" },
];

export default function Partenaires() {
  return (
    <section id="partenaires" className="bg-creme py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          overline="Merci à tous"
          title="Nos partenaires"
          icon="/images/icones/fichier-13.svg"
          accent="blue"
        />

        <div className="mt-12 overflow-hidden rounded-xl bg-gradient-to-r from-ria-700 to-ria-500">
          <div className="flex flex-wrap items-center justify-between gap-8 px-8 py-10">
            {PARTNERS.map((p) => (
              <div key={p.nom} className="text-center">
                <div className="relative h-9 w-28">
                  <Image src={p.src} alt={p.nom} fill className="object-contain" />
                </div>
                <span className="mt-2 block text-[0.65rem] font-semibold uppercase tracking-widest text-white/70">
                  {p.niveau}
                </span>
              </div>
            ))}

            <ArrowButton href="#partenaires" variant="outline-white">
              Nos partenaires
            </ArrowButton>
          </div>
        </div>
      </div>
    </section>
  );
}
