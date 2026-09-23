import { Fragment } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { CATEGORIES, EPREUVES, KIT_CANICULE, type Materiel } from "./materielData";

/* Pastille hexagonale marquant une epreuve concernee (maquette) */
function Pastille({ titre }: { titre: string }) {
  return (
    <svg viewBox="0 0 24 24" className="mx-auto h-3 w-3 fill-white" role="img" aria-label={titre}>
      <title>{titre}</title>
      <polygon points="12,1 22,6.5 22,17.5 12,23 2,17.5 2,6.5" />
    </svg>
  );
}

export default function EntrainementMateriel() {
  const t = useTranslations("entrainementPage");

  return (
    <section
      id="materiel"
      className="relative isolate overflow-hidden py-16 text-white lg:py-20"
    >
      {/* Fond bleu flou pleine largeur */}
      <Image
        src="/photos/fond-bleu-flou.jpg"
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-[#0b2543]/55" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* En-tete : picto haltere, cartouche noir, titre */}
        <div className="flex items-end gap-5">
          <Image
            src="/images/icones/fichier-12.svg"
            alt=""
            width={68}
            height={60}
            className="h-12 w-auto shrink-0 brightness-0 invert"
          />
          <div>
            <span className="font-comico inline-block bg-dark-900 px-3 py-1 text-[13px] uppercase leading-[21px] tracking-[6px] text-white">
              {t("materielOverline")}
            </span>
            <h2 className="titre mt-2 text-2xl sm:text-4xl">{t("materielTitle")}</h2>
          </div>
        </div>
        {/* Pointilles en pleine largeur d'ecran, comme les en-tetes des pages de course */}
        <span className="mx-[calc(50%-50vw)] mt-4 block h-[2px] bg-[repeating-linear-gradient(90deg,#ffffff_0,#ffffff_11px,transparent_11px,transparent_20px)] opacity-80" />

        <p className="mt-6 max-w-[62ch] text-[15px] leading-[1.6] text-white/90">
          {t("materielIntro")}
        </p>

        {/* Le tableau est trop large pour un telephone : il defile, on le dit */}
        <p className="mt-8 text-[13px] italic text-white/70 sm:hidden">
          {t("materielGlisser")}
        </p>

        <div className="mt-4 overflow-x-auto sm:mt-10">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <caption className="sr-only">{t("materielTitle")}</caption>
            <thead>
              <tr className="font-comico text-[13px] uppercase tracking-[1px] sm:text-[15px]">
                <th scope="col" className="border border-white/70 px-4 py-3 text-left font-normal">
                  {t("materielColonneMateriel")}
                </th>
                {EPREUVES.map((e) => (
                  <th
                    key={e.cle}
                    scope="col"
                    className="w-[13%] border border-white/70 px-3 py-3 text-center font-normal"
                  >
                    {t(e.labelKey)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CATEGORIES.map((cat) => (
                <Fragment key={cat.labelKey}>
                  {/* Intertitre de categorie, horizontal et aligne a gauche */}
                  <tr>
                    <th
                      scope="colgroup"
                      colSpan={EPREUVES.length + 1}
                      className="border border-white/70 bg-white/10 px-4 py-2 text-left font-normal"
                    >
                      <span className="font-comico text-[12px] uppercase tracking-[3px] sm:text-[13px]">
                        {t(cat.labelKey)}
                      </span>
                    </th>
                  </tr>
                  {cat.items.map((item) => (
                    <tr key={item.labelKey}>
                      <th scope="row" className="border border-white/70 px-4 py-3 font-normal">
                        <span className="block text-[14px] font-bold uppercase leading-[1.2] sm:text-[15px]">
                          {t(item.labelKey)}
                        </span>
                        {item.detailKey && (
                          <span className="mt-0.5 block text-[12px] font-normal normal-case leading-[1.35] text-white/75">
                            {t(item.detailKey)}
                          </span>
                        )}
                      </th>
                      {EPREUVES.map((e) => (
                        <td key={e.cle} className="border border-white/70 px-3 py-3 text-center">
                          {item[e.cle as keyof Materiel] ? (
                            <Pastille titre={`${t(e.labelKey)} : ${t("materielObligatoire")}`} />
                          ) : (
                            <span className="sr-only">—</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Complements declenches par l'organisation */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-14">
          <div>
            <h3 className="font-comico text-[15px] uppercase tracking-[2px] sm:text-[17px]">
              {t("materielCaniculeTitre")}
            </h3>
            <p className="mt-2 text-[14px] leading-[1.55] text-white/85">
              {t("materielCaniculeIntro")}
            </p>
            <ul className="mt-3 space-y-1.5">
              {KIT_CANICULE.map((cle) => (
                <li key={cle} className="flex items-start gap-2.5 text-[14px] text-white/90">
                  <span aria-hidden="true" className="mt-[7px] block h-1.5 w-1.5 shrink-0 bg-white" />
                  {t(cle)}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-[14px] leading-[1.55] text-white/85 lg:pt-10">
            {t("materielIntemperies")}
          </p>
        </div>
      </div>
    </section>
  );
}
