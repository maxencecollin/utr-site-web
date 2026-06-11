import Image from "next/image";
import ArrowButton from "../ArrowButton";

export default function Festival() {
  return (
    <section
      id="village"
      className="relative isolate flex min-h-[80vh] items-center overflow-hidden py-24 text-white"
    >
      <Image
        src="/photos/real_-jansen-d3gfrvatsd0-unsplash.jpg"
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-dark-900/60" />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 lg:grid-cols-2 lg:px-10">
        <h2 className="titre text-6xl leading-[0.95] sm:text-7xl lg:text-8xl">
          Locoal
          <br />
          Festif
        </h2>

        <div className="max-w-md lg:justify-self-end">
          <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ria-200">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
            </svg>
            Locoal-Mendon
          </span>
          <p className="mt-4 text-lg text-white/90">
            Le centre névralgique conçu comme un lieu d&apos;échange et de
            convivialité pour tous les participants.
          </p>
          <div className="mt-8">
            <ArrowButton href="#village" variant="outline-white">
              Le village
            </ArrowButton>
          </div>
        </div>
      </div>
    </section>
  );
}
