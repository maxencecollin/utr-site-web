import { useTranslations } from "next-intl";
import PartnersBand from "../PartnersBand";
import CourseSectionHeading from "./CourseSectionHeading";

type Props = {
  /* Fond flou du bandeau (bleu par defaut, vert/marron selon la course) */
  photo?: string;
};

/* En-tete "Nos partenaires" + bandeau logos partage avec la landing */
export default function CoursePartenaires({ photo }: Props) {
  const t = useTranslations("partenaires");
  return (
    <section className="overflow-x-clip bg-white pt-16 lg:pt-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <CourseSectionHeading
          icon="/images/icones/fichier-10.svg?v=2"
          title={t("title")}
          className="mb-8"
        />
      </div>
      <PartnersBand photo={photo} />
    </section>
  );
}
