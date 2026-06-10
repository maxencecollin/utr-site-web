import Header from "../Header";
import Countdown from "../Countdown";
import ArrowButton from "../ArrowButton";
import Placeholder from "../Placeholder";

const PARTNERS = ["Sponsor 1", "Sponsor 2", "Sponsor 3", "Sponsor 4"];

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
      <div className="flex flex-1 flex-col items-center justify-center gap-8 px-6 pt-24 text-center">
        <h1 className="headline -rotate-[5deg] text-5xl leading-[1.15] sm:text-6xl">
          Un ultra au
          <br />
          Cœur du Morbihan
        </h1>

        {/* Badge date : chiffres en Technor 600, mois en Inter Bold (specs XD) */}
        <span className="inline-flex -rotate-[5deg] items-baseline gap-[5px] rounded-md bg-ria-500 px-4 py-1.5 uppercase leading-[26px] text-white">
          <span className="font-technor text-[21px] font-semibold tracking-[1.05px]">16</span>
          <span className="text-[18px] font-bold tracking-[0.9px]">octobre</span>
          <span className="font-technor text-[21px] font-semibold tracking-[1.05px]">2027</span>
        </span>

        <Countdown />
      </div>

      {/* Bas de hero : actions + partenaires */}
      <div className="mx-auto w-full max-w-7xl px-6 pb-8 lg:px-10">
        <div className="flex items-end justify-between gap-4">
          <ArrowButton href="#courses" variant="outline-white" direction="down">
            Nos épreuves
          </ArrowButton>

          <ul className="hidden items-center gap-8 opacity-90 lg:flex">
            {PARTNERS.map((name) => (
              <li key={name}>
                <Placeholder
                  label={name}
                  tone="dark"
                  className="h-8 w-16 border-0 bg-white/10 text-[0.55rem]"
                />
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
