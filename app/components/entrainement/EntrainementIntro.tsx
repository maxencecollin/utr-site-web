import { useTranslations } from "next-intl";

/*
  Chapeau de page : titre a gauche, texte a droite (maquette XD).
  La puce sous le titre renvoie au reglement PDF.
  Partage par les pages Entrainement et Environnement (meme mise en page,
  memes cles de traduction dans leur namespace).
*/
export default function EntrainementIntro({
  namespace = "entrainementPage",
}: {
  namespace?: "entrainementPage" | "environnement";
}) {
  const t = useTranslations(namespace);

  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
        <div>
          {/* Droit et non italique, contrairement aux titres de section (.titre) */}
          <h2 className="text-2xl font-extrabold uppercase leading-[1.25] text-[#2c2c2c] sm:text-3xl lg:text-[34px]">
            {t("introTitle")}
          </h2>

          {/* Puce + edition + lien reglement, en Comico espace (maquette) */}
          <p className="font-comico mt-6 flex flex-wrap items-center gap-x-2 text-[13px] uppercase tracking-[2px] text-[#2c2c2c]">
            <span aria-hidden="true">&bull;</span>
            <span>{t("introEdition")}</span>
            <span aria-hidden="true">&ndash;</span>
            <a
              href="/docs/Reglement_Ultra_Tour_Ria_2027.pdf"
              className="underline underline-offset-4 transition-opacity hover:opacity-70"
            >
              {t("introReglement")}
            </a>
          </p>
        </div>

        <div className="space-y-5 text-[17px] leading-[1.6] text-dark-700 lg:pt-1">
          <p>{t("introText1")}</p>
          <p>{t("introText2")}</p>
        </div>
      </div>
    </section>
  );
}
