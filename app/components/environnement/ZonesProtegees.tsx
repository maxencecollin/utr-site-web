import Image from "next/image";
import { useTranslations } from "next-intl";

/*
  Les trois protections traversees par le parcours.
  TODO : pictos ZNIEFF / Natura 2000 / sites classes a recevoir de la graphiste
  (emplacement reserve), et liens officiels ZNIEFF et sites classes a fournir.
  Le lien Natura 2000 pointe sur la fiche INPN FR5300028 "Ria d'Etel" : a
  verifier avant mise en ligne.
*/
export const LIEN_NATURA_2000 = "https://inpn.mnhn.fr/site/natura2000/FR5300028";

const ZONES = [
  { titre: "zonesZnieffTitre", texte: "zonesZnieffTexte", lien: null },
  { titre: "zonesNaturaTitre", texte: "zonesNaturaTexte", lien: LIEN_NATURA_2000 },
  { titre: "zonesClassesTitre", texte: "zonesClassesTexte", lien: null },
] as const;

export default function ZonesProtegees() {
  const t = useTranslations("environnement");
  return (
    <section className="relative isolate overflow-hidden py-20 text-white lg:py-28">
      <Image src="/photos/env-zones.jpg" alt={t("zonesAlt")} fill sizes="100vw" className="-z-20 object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0b2a3c]/55 via-[#0b2a3c]/45 to-[#0b3a2a]/75" />

      <div className="mx-auto max-w-6xl px-6 text-center lg:px-10">
        <Image
          src="/images/icones/patrimoine.svg?v=2"
          alt=""
          width={60}
          height={56}
          className="mx-auto h-12 w-auto brightness-0 invert"
        />
        <p className="font-comico mt-4 text-[13px] uppercase tracking-[7px]">{t("zonesOverline")}</p>
        <h2 className="titre mt-1 text-3xl sm:text-5xl">{t("zonesTitre")}</h2>
        <span className="mx-auto mt-4 block h-[2px] max-w-xl bg-[repeating-linear-gradient(90deg,#ffffff_0,#ffffff_11px,transparent_11px,transparent_20px)] opacity-70" />
        <p className="mx-auto mt-5 max-w-[56ch] text-[16px] leading-[1.55] text-white/90">{t("zonesIntro")}</p>

        <ul className="mt-14 grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-10">
          {ZONES.map((z) => (
            <li key={z.titre} className="flex flex-col items-center">
              {/* Emplacement du picto, en attente de l'export */}
              <span aria-hidden="true" className="block h-16 w-16" />
              <h3 className="titre mt-4 text-[20px] sm:text-[22px]">{t(z.titre)}</h3>
              <span className="mt-3 block h-px w-24 bg-[repeating-linear-gradient(90deg,#ffffff_0,#ffffff_6px,transparent_6px,transparent_11px)]" />
              <p className="mt-4 max-w-[30ch] text-[15px] leading-[1.5] text-white/90">{t(z.texte)}</p>
              {z.lien && (
                <a
                  href={z.lien}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-6 flex flex-col items-center gap-2 text-[13px] underline underline-offset-4"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white transition-colors group-hover:bg-white group-hover:text-[#0b3a2a]">
                    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {t("zonesVisiter")}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
