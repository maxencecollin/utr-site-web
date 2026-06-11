import Image from "next/image";
import Header from "../Header";
import Countdown from "../Countdown";
import ArrowButton from "../ArrowButton";

const PARTNERS = [
  { nom: "Decathlon", src: "/images/partenaires/decathlon.svg" },
  { nom: "Kinetik", src: "/images/partenaires/kinetik.svg" },
  { nom: "UTMB Index", src: "/images/partenaires/utmb-index.svg" },
  { nom: "Plancoët", src: "/images/partenaires/plancoet.svg" },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-screen flex-col overflow-hidden text-white"
    >
      {/* Fond : photo plein cadre + voile sombre */}
      <Image
        src="/photos/img_2638-marin.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-dark-900/40 via-dark-900/30 to-dark-900/70" />

      <Header />

      {/* Contenu central */}
      <div className="flex flex-1 flex-col items-center justify-center gap-8 px-6 pt-24 text-center">
        <h1 className="headline -rotate-[5deg] text-5xl leading-[1.15] sm:text-6xl">
          Un ultra au
          <br />
          Cœur du Morbihan
        </h1>

        {/* Badge date : parallelogramme bleu incline, chiffres Technor 600 + mois Inter Bold */}
        <span className="inline-block -rotate-[5deg]">
          <span className="relative inline-flex items-baseline gap-[5px] px-4 py-1.5 uppercase leading-[26px] text-white">
            <span aria-hidden="true" className="absolute inset-0 -skew-x-12 bg-ria-500" />
            <span className="relative font-technor text-[21px] font-semibold tracking-[1.05px]">
              16
            </span>
            <span className="relative text-[18px] font-bold tracking-[0.9px]">octobre</span>
            <span className="relative font-technor text-[21px] font-semibold tracking-[1.05px]">
              2027
            </span>
          </span>
        </span>

        <Countdown />
      </div>

      {/* Bas de hero : actions + partenaires */}
      <div className="mx-auto w-full max-w-7xl px-6 pb-8 lg:px-10">
        <div className="flex items-end justify-between gap-4">
          <ArrowButton href="#courses" variant="outline-white" direction="down">
            Nos épreuves
          </ArrowButton>

          <ul className="hidden items-center gap-8 lg:flex">
            {PARTNERS.map((p) => (
              <li key={p.nom} className="relative h-7 w-24 opacity-90">
                <Image src={p.src} alt={p.nom} fill className="object-contain" />
              </li>
            ))}
          </ul>

          <ArrowButton href="#inscription" variant="outline-white">
            Inscription 2027
          </ArrowButton>
        </div>
      </div>
    </section>
  );
}
