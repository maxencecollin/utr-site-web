import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

/*
  Les protections des sites que longe le parcours.
  Pas de picto pour Natura 2000, le patrimoine mondial et les sites classes :
  ceux de la graphiste reprenaient les logos officiels (UNESCO, Natura 2000,
  monument historique), dont l'usage est soumis a autorisation. Emplacement
  reserve en attendant des pictos originaux (faune, dolmen, chapelle).
  Le lien Natura 2000 pointe sur la fiche INPN FR5300028 "Ria d'Etel" : a
  verifier avant mise en ligne.
*/
export const LIEN_NATURA_2000 = "https://inpn.mnhn.fr/site/natura2000/FR5300028";
/* Fiche explicative des ZNIEFF (Cerema) */
const LIEN_ZNIEFF =
  "https://outil2amenagement.cerema.fr/outils/la-zone-naturelle-dinteret-ecologique-faunistique-et-floristique-znieff";
/* Notice Merimee de la chapelle de Saint-Cado (Belz) */
const LIEN_SAINT_CADO = "https://pop.culture.gouv.fr/notice/merimee/PA00091024";

export default function ZonesProtegees() {
  const t = useTranslations("environnement");
  const locale = useLocale();
  const zones = [
    { titre: "zonesZnieffTitre", texte: "zonesZnieffTexte", picto: "/images/icones/znieff.svg", lien: LIEN_ZNIEFF },
    { titre: "zonesNaturaTitre", texte: "zonesNaturaTexte", picto: null, lien: LIEN_NATURA_2000 },
    {
      titre: "zonesUnescoTitre",
      texte: "zonesUnescoTexte",
      picto: null,
      // Fiche du bien n. 1725 "Megalithes de Carnac et des rives du Morbihan", dans la langue de la page
      lien: `https://whc.unesco.org/${locale}/list/1725/`,
    },
    { titre: "zonesClassesTitre", texte: "zonesClassesTexte", picto: null, lien: LIEN_SAINT_CADO },
  ];
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

        {/* Colonnes plus larges que le conteneur, comme dans la maquette */}
        <ul className="mt-14 grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-x-6 lg:-mx-[74px] lg:grid-cols-4">
          {zones.map((z) => (
            <li key={z.titre} className="flex flex-col items-center">
              {z.picto ? (
                <Image src={z.picto} alt="" width={90} height={90} className="h-[90px] w-auto brightness-0 invert" />
              ) : (
                <span aria-hidden="true" className="block h-[90px]" />
              )}
              <h3 className="titre mt-4 text-[20px] sm:text-[22px]">{t(z.titre)}</h3>
              <span className="mt-3 block h-px w-24 bg-[repeating-linear-gradient(90deg,#ffffff_0,#ffffff_6px,transparent_6px,transparent_11px)]" />
              <p className="mt-4 max-w-[28ch] text-[15px] leading-[1.35] text-white/90">{t(z.texte)}</p>
              {/* Pousse en bas de colonne : les boutons restent alignes quelle que soit la longueur du texte */}
              {z.lien && (
                <a
                  href={z.lien}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-auto flex flex-col items-center gap-2 pt-6 text-[13px] underline underline-offset-4"
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
