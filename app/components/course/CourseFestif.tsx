import { useTranslations } from "next-intl";
import Festival from "../sections/Festival";
import CourseSectionHeading from "./CourseSectionHeading";

type Props = {
  /* Fond flou de droite de la section village (bleu par defaut) */
  blur?: string;
};

/* En-tete "Locoal festif" + section village de la landing */
export default function CourseFestif({ blur }: Props) {
  const t = useTranslations("course");
  return (
    <section className="overflow-x-clip">
      <div className="mx-auto max-w-7xl px-6 pt-16 lg:px-10 lg:pt-20">
        <CourseSectionHeading
          icon="/images/icones/fichier-15.svg"
          title={t("festifTitle")}
          className="mb-8"
        />
      </div>
      <Festival blur={blur} />
    </section>
  );
}
