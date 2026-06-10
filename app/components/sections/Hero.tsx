import Header from "../Header";
import Countdown from "../Countdown";
import ArrowButton from "../ArrowButton";
import Placeholder from "../Placeholder";

const PARTNERS = ["Decathlon", "Kinetik", "Brieuc", "UTMB Index"];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-screen flex-col overflow-hidden text-white"
    >
      {/* Fond : photo plein cadre (placeholder) + voile sombre */}
      <Placeholder
        label="Photo hero — coureur"
        tone="dark"
        className="absolute inset-0 -z-20 h-full w-full border-0"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-dark-900/40 via-dark-900/30 to-dark-900/70" />

      <Header />

      {/* Contenu central */}
      <div className="flex flex-1 flex-col items-center justify-center gap-7 px-6 pt-24 text-center">
        <h1 className="titre max-w-4xl text-4xl leading-[1.05] sm:text-6xl lg:text-7xl">
          Un ultra au cœur
          <br />
          du Morbihan
        </h1>

        <span className="rounded-md bg-ria-500 px-4 py-1.5 text-xs font-bold uppercase tracking-widest">
          16 octobre 2027
        </span>

        <Countdown />
      </div>

      {/* Bas de hero : actions + partenaires */}
      <div className="mx-auto w-full max-w-7xl px-6 pb-8 lg:px-10">
        <div className="flex items-end justify-between gap-4">
          <ArrowButton href="#courses" variant="outline-white" direction="down">
            Nos épreuves
          </ArrowButton>

          <ul className="hidden items-center gap-6 opacity-80 lg:flex">
            {PARTNERS.map((name) => (
              <li
                key={name}
                className="text-[0.7rem] font-bold uppercase tracking-widest"
              >
                {name}
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
