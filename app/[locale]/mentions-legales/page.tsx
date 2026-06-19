import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import LegalLayout from "@/app/components/LegalLayout";

export const metadata: Metadata = {
  title: "Mentions légales — Ultra Tour de la Ria d'Étel",
  description:
    "Mentions légales du site de l'Ultra Tour de la Ria d'Étel : éditeur, hébergement, propriété intellectuelle.",
};

// Mise en forme inline des messages (gras, liens, sauts de ligne)
const tags = {
  b: (chunks: ReactNode) => <strong>{chunks}</strong>,
  mail: (chunks: ReactNode) => (
    <a href="mailto:contact@ultratourdelaria.fr">{chunks}</a>
  ),
  host: (chunks: ReactNode) => (
    <a href="https://pages.github.com" target="_blank" rel="noopener noreferrer">
      {chunks}
    </a>
  ),
  br: () => <br />,
};

const EDITOR_ITEMS = [
  "itemLegalName",
  "itemRna",
  "itemSiret",
  "itemAddress",
  "itemActivity",
  "itemPublisher",
  "itemEmail",
] as const;

export default async function MentionsLegales({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("legal.mentions");
  const tLegal = await getTranslations("legal");

  return (
    <LegalLayout title={tLegal("mentionsTitle")}>
      <h2>{t("editorHeading")}</h2>
      <p>{t("editorIntro")}</p>
      <ul>
        {EDITOR_ITEMS.map((key) => (
          <li key={key}>{t.rich(key, tags)}</li>
        ))}
      </ul>

      <h2>{t("hostingHeading")}</h2>
      <p>{t.rich("hostingBody", tags)}</p>

      <h2>{t("ipHeading")}</h2>
      <p>{t("ipBody")}</p>

      <h2>{t("photoHeading")}</h2>
      <p>{t("photoBody")}</p>

      <h2>{t("liabilityHeading")}</h2>
      <p>{t("liabilityBody")}</p>

      <h2>{t("contactHeading")}</h2>
      <p>{t.rich("contactBody", tags)}</p>
    </LegalLayout>
  );
}
