import Image from "next/image";
import { useTranslations } from "next-intl";

/* Les trois principes, chacun avec sa pastille numerotee */
const PRINCIPES = [
  { fort: "philo1Fort", suite: "philo1Suite" },
  { fort: "philo2Fort", suite: "philo2Suite" },
  { fort: "philo3Fort", suite: "philo3Suite" },
] as const;

/* Pastille hexagonale numerotee (brun clair sur fond brun) */
function Numero({ n }: { n: number }) {
  return (
    <span className="relative mx-auto flex h-[56px] w-[56px] items-center justify-center sm:h-[68px] sm:w-[68px]">
      <svg viewBox="0 0 40 40" aria-hidden="true" className="absolute inset-0 h-full w-full">
        <polygon points="20,1 37,10.5 37,29.5 20,39 3,29.5 3,10.5" fill="#78492d" />
      </svg>
      <span className="font-comico relative text-[32px] leading-none text-white sm:text-[40px]">{n}</span>
    </span>
  );
}

/* "Ma philosophie d'entrainement repose sur 3 principes" */
export default function CoachingPhilosophie() {
  const t = useTranslations("coaching");

  return (
    <section className="relative isolate overflow-hidden bg-[#4c3325] py-16 text-white lg:py-24">
      <Image
        src="/images/deco/topographie.svg"
        alt=""
        width={1600}
        height={900}
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-[0.07]"
      />

      <div className="mx-auto max-w-6xl px-6 text-center lg:px-10">
        <Image
          src="/images/icones/fichier-12.svg"
          alt=""
          width={68}
          height={60}
          className="mx-auto h-11 w-auto brightness-0 invert"
        />
        <h2 className="font-comico mx-auto mt-5 max-w-[34ch] text-[24px] uppercase leading-[1.25] sm:text-[38px]">
          {t("philosophieTitre")}
        </h2>
        <span className="mt-6 block h-[2px] bg-[repeating-linear-gradient(90deg,#ffffff_0,#ffffff_11px,transparent_11px,transparent_20px)] opacity-70" />

        <ul className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-10">
          {PRINCIPES.map((p, i) => (
            <li key={p.fort}>
              <Numero n={i + 1} />
              <p className="mt-5 text-[20px] font-extrabold italic leading-[1.25] sm:text-[25px]">
                {t(p.fort)}
              </p>
              <p className="mx-auto mt-2 max-w-[30ch] text-[16px] leading-[1.4] text-white/90 sm:text-[17px]">
                {t(p.suite)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
