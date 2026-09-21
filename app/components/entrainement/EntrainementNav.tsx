import { useTranslations } from "next-intl";

/* Les cinq parties de la page, dans l'ordre ou elles apparaissent */
const SECTIONS = [
  { id: "coach", labelKey: "navCoach" },
  { id: "ravitos", labelKey: "navRavitos" },
  { id: "nutrition", labelKey: "navNutrition" },
  { id: "materiel", labelKey: "navMateriel" },
  { id: "regles", labelKey: "navRegles" },
] as const;

/*
  Barre d'ancres sous le hero : pastilles en parallelogramme (meme inclinaison
  que les boutons fleches), une par partie de la page.
*/
export default function EntrainementNav() {
  const t = useTranslations("entrainementPage");

  return (
    <nav
      aria-label={t("navAria")}
      className="bg-white pt-12 lg:pt-16"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <ul className="flex flex-wrap items-center gap-3 lg:gap-4">
          {SECTIONS.map(({ id, labelKey }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="group relative inline-block px-5 py-2.5 text-[13px] font-bold uppercase italic tracking-wide text-dark-900 transition-colors hover:text-white lg:text-[15px]"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -skew-x-12 border border-dark-900 transition-colors group-hover:bg-dark-900"
                />
                <span className="relative">{t(labelKey)}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
