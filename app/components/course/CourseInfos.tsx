import { useTranslations } from "next-intl";
import ArrowButton, { type ArrowButtonVariant } from "../ArrowButton";
import UtmbBadge from "./UtmbBadge";

type Props = {
  /* Namespace des contenus specifiques a la course (ex. "course80") */
  namespace: string;
  utmbIndex?: string;
  /* Couleur des cartouches de la grille (classe bg-*), bleu Ria par defaut */
  accent?: string;
  /* Variante du bouton d'inscription */
  buttonVariant?: ArrowButtonVariant;
  /* Colonnes de la premiere rangee (le relais a des valeurs R1/R2 plus larges) */
  row1Cols?: string;
};

/* Etiquette inclinee (Comico 18px blanc sur fond accent, specs XD) + valeur */
function InfoItem({
  label,
  value,
  sub,
  accent,
  children,
}: {
  label: string;
  value?: string;
  sub?: string;
  accent: string;
  children?: React.ReactNode;
}) {
  return (
    <div>
      <dt className="relative inline-block px-3 py-px">
        <span aria-hidden="true" className={`absolute inset-0 -skew-x-12 ${accent}`} />
        <span className="font-comico relative text-[18px] uppercase leading-[28px] text-white">
          {label}
        </span>
      </dt>
      {/* Valeur : Inter bold italic 20px/24px uppercase (specs XD) */}
      <dd className="mt-2.5 text-[20px] font-bold italic uppercase leading-6 text-black">
        {children ?? value}
        {sub && <span className="block">{sub}</span>}
      </dd>
    </div>
  );
}

export default function CourseInfos({
  namespace,
  utmbIndex,
  accent = "bg-ria-500",
  buttonVariant = "blue-gradient",
  row1Cols = "lg:grid-cols-[210px_160px_280px_1fr]",
}: Props) {
  const t = useTranslations(namespace);
  const tCourse = useTranslations("course");
  const tCta = useTranslations("cta");
  // Le relais surcharge certaines etiquettes ("Distances", "Lieux")
  const distanceLabel = t.has("distanceLabel") ? t("distanceLabel") : tCourse("distance");
  const lieuLabel = t.has("lieuLabel") ? t("lieuLabel") : tCourse("lieu");

  return (
    <section id="infos" className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Haut : accroche + reglement a gauche, description + inscription a droite */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_auto] lg:gap-20">
          <div>
            {/* Accroche : Inter Semibold 19px/23px #383838 sur ~344px (specs XD) */}
            <h3 className="max-w-[360px] text-[19px] font-semibold uppercase leading-[23px] text-[#383838]">
              {t("infoTitle")}
            </h3>

            <ul className="mt-4 space-y-1 text-[13px] font-bold uppercase tracking-[1px] text-[#1c1c1c]">
              <li className="flex items-center gap-2">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#1c1c1c]" />
                <a
                  href="/docs/Reglement_Ultra_Tour_Ria_2027.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 hover:text-ria-500"
                >
                  {tCourse("voirReglement")}
                </a>
              </li>
              <li>
                <a
                  href="/docs/Reglement_Ultra_Tour_Ria_2027.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 hover:text-ria-500"
                >
                  {tCourse("conditions")}
                </a>
              </li>
            </ul>
          </div>

          <div className="flex max-w-sm flex-col items-start gap-8">
            <p className="text-[16px] leading-relaxed text-dark-700">
              {t("description")}
            </p>
            <ArrowButton href="#inscription" variant={buttonVariant}>
              {tCta("inscription")}
            </ArrowButton>
          </div>
        </div>

        {/* Grille d'infos pratiques : colonnes resserrees a gauche (positions XD :
            colonnes a 0 / 250 / 450 / 770 px), trait qui s'arrete apres le contenu */}
        <dl className="mt-16">
          <div className={`grid grid-cols-1 gap-6 sm:grid-cols-3 lg:gap-x-10 ${row1Cols}`}>
            <InfoItem accent={accent} label={tCourse("date")} value={t("dateValue")} />
            <InfoItem accent={accent} label={distanceLabel} value={t("distanceValue")} />
            <InfoItem accent={accent} label={lieuLabel} value={t("lieuValue")} />
          </div>
          <span aria-hidden="true" className="mt-6 block h-px w-full max-w-[910px] bg-[#1c1c1c]" />
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-[210px_160px_280px_1fr] lg:gap-x-10">
            <InfoItem accent={accent} label={tCourse("heureDepart")} value={t("departValue")} />
            <InfoItem accent={accent} label={tCourse("tempsLimite")} value={t("limiteValue")} />
            <InfoItem
              accent={accent}
              label={tCourse("retraitDossard")}
              value={t("retraitValue")}
              sub={t("retraitSub")}
            />
            {utmbIndex && (
              <InfoItem accent={accent} label={tCourse("indexUtmb")}>
                <UtmbBadge index={utmbIndex} />
              </InfoItem>
            )}
          </div>
        </dl>
      </div>
    </section>
  );
}
