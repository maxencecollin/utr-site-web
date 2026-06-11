import Image from "next/image";
import ArrowButton from "../ArrowButton";

export default function Benevoles() {
  return (
    <section
      id="benevoles"
      className="relative isolate flex min-h-[70vh] items-center overflow-hidden py-24 text-white"
    >
      <Image
        src="/photos/img_2769.jpg"
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-dark-900/55" />

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="max-w-xl">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-white/70">
            Rejoins l&apos;aventure
          </span>
          <div className="mt-3 flex items-center gap-4">
            <Image
              src="/images/icones/benevole.svg"
              alt=""
              width={48}
              height={48}
              className="h-12 w-12 shrink-0 invert"
            />
            <h2 className="titre text-5xl leading-none sm:text-6xl">
              Deviens bénévole
            </h2>
          </div>
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
