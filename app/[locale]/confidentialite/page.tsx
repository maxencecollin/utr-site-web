import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import LegalLayout from "@/app/components/LegalLayout";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Ultra Tour de la Ria d'Étel",
  description:
    "Politique de confidentialité de l'Ultra Tour de la Ria d'Étel : données collectées, cookies, droits RGPD.",
};

const tags = {
  b: (chunks: ReactNode) => <strong>{chunks}</strong>,
  mail: (chunks: ReactNode) => (
    <a href="mailto:contact@ultratourdelaria.fr">{chunks}</a>
  ),
  br: () => <br />,
};

const RIGHTS = ["right1", "right2", "right3", "right4", "right5", "right6"] as const;

export default async function Confidentialite({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("legal.confidentialite");
  const tLegal = await getTranslations("legal");

  return (
    <LegalLayout title={tLegal("confidentialiteTitle")}>
      <p>{t("intro")}</p>

      <h2>{t("controllerHeading")}</h2>
      <p>{t.rich("controllerBody", tags)}</p>

      <h2>{t("dataHeading")}</h2>
      <p>{t("dataBody")}</p>

      <h2>{t("registrationHeading")}</h2>
      <p>{t.rich("registrationBody", tags)}</p>

      <h2>{t("embedsHeading")}</h2>
      <p>{t.rich("embedsBody", tags)}</p>

      <h2>{t("cookiesHeading")}</h2>
      <p>{t("cookiesBody")}</p>

      <h2>{t("rightsHeading")}</h2>
      <p>{t("rightsIntro")}</p>
      <ul>
        {RIGHTS.map((key) => (
          <li key={key}>{t(key)}</li>
        ))}
      </ul>
      <p>{t.rich("rightsContact", tags)}</p>

      <h2>{t("updateHeading")}</h2>
      <p>{t.rich("updateBody", tags)}</p>
    </LegalLayout>
  );
}
