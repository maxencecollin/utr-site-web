import Image from "next/image";
import { useTranslations } from "next-intl";

/*
  Engagements eco-responsables de l'organisation.
  TODO : pictos zero dechet, produits locaux et covoiturage a recevoir ;
  l'emplacement est reserve pour que la mise en page ne bouge pas a leur arrivee.
*/
const ENGAGEMENTS = [
  { titre: "engDechetTitre", texte: "engDechetTexte", picto: null },
  { titre: "engSignaTitre", texte: "engSignaTexte", picto: "/images/icones/signalisation.svg" },
  { titre: "engLocauxTitre", texte: "engLocauxTexte", picto: null },
  { titre: "engCovoitTitre", texte: "engCovoitTexte", picto: null },
] as const;

export default function Engagements() {
  const t = useTranslations("environnement");
  return (
    <section id="engagements" className="relative isolate overflow-hidden py-20 text-white lg:py-28">
      <Image src="/photos/env-engagements.jpg" alt={t("engAlt")} fill sizes="100vw" className="-z-20 object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-dark-900/70 via-dark-900/45 to-dark-900/15" />

      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="text-center">
          <Image
            src="/images/icones/patrimoine.svg?v=2"
            alt=""
            width={60}
            height={56}
            className="mx-auto h-12 w-auto brightness-0 invert"
          />
          <p className="font-comico mt-4 text-[13px] uppercase tracking-[7px]">{t("engOverline")}</p>
          <h2 className="titre mt-1 text-3xl sm:text-5xl">{t("engTitre")}</h2>
          <span className="mx-auto mt-4 block h-[2px] max-w-xl bg-[repeating-linear-gradient(90deg,#ffffff_0,#ffffff_11px,transparent_11px,transparent_20px)] opacity-70" />
          <p className="mx-auto mt-5 max-w-[56ch] text-[16px] leading-[1.55] text-white/90">{t("engIntro")}</p>
        </div>

        <ul className="mt-14 max-w-[440px] space-y-7 lg:-ml-8">
          {ENGAGEMENTS.map((e) => (
            <li key={e.titre} className="flex items-start gap-5">
              {/* Emplacement du picto (vide tant que la graphiste ne l'a pas livre) */}
              <span className="flex h-[72px] w-[72px] shrink-0 items-center justify-center sm:h-[90px] sm:w-[90px]">
                {e.picto && (
                  <Image src={e.picto} alt="" width={56} height={56} className="h-[72px] w-auto brightness-0 invert sm:h-[84px]" />
                )}
              </span>
              <div className="flex-1">
                <h3 className="titre text-[18px] sm:text-[21px]">{t(e.titre)}</h3>
                <span className="mt-2 block h-px bg-white/60" />
                <p className="mt-2.5 text-[15px] leading-[1.35] text-white/90">{t(e.texte)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
