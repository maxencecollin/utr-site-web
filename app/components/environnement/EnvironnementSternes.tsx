import { useTranslations } from "next-intl";
import PhotoScotchee from "./PhotoScotchee";

/* Grande photo des sternes sous le chapeau de la page */
export default function EnvironnementSternes() {
  const t = useTranslations("environnement");
  return (
    <div className="bg-white pb-16 lg:pb-24">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <PhotoScotchee
          src="/photos/env-sternes.jpg"
          alt={t("sternesAlt")}
          ratio="1125/338"
          sizes="(min-width: 1200px) 1125px, 100vw"
          rotation={-0.6}
          legende={t("sternesLegende")}
        />
      </div>
    </div>
  );
}
