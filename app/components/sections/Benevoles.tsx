import Placeholder from "../Placeholder";
import ArrowButton from "../ArrowButton";

export default function Benevoles() {
  return (
    <section
      id="benevoles"
      className="relative isolate flex min-h-[70vh] items-center overflow-hidden py-24 text-white"
    >
      <Placeholder
        label="Photo bénévoles"
        tone="dark"
        className="absolute inset-0 -z-20 h-full w-full border-0"
      />
      <div className="absolute inset-0 -z-10 bg-dark-900/55" />

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="max-w-xl">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-white/70">
            Rejoins l&apos;aventure
          </span>
          <h2 className="titre mt-3 text-5xl leading-none sm:text-6xl">
            Deviens bénévole
          </h2>
          <p className="mt-5 text-lg text-white/85">
            L&apos;événement n&apos;existe que grâce à ses bénévoles. Rejoins une
            équipe passionnée et vis la course de l&apos;intérieur.
          </p>
          <div className="mt-8">
            <ArrowButton href="#benevoles" variant="outline-white">
              Devenir bénévole
            </ArrowButton>
          </div>
        </div>
      </div>
    </section>
  );
}
