import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import LegalLayout from "@/app/components/LegalLayout";

export const metadata: Metadata = {
  title: "Conditions générales de vente — Ultra Tour de la Ria d'Étel",
  description:
    "Conditions générales de vente de l'Ultra Tour de la Ria d'Étel : inscriptions via Klikego, règlement, assurance.",
};

const tags = {
  b: (chunks: ReactNode) => <strong>{chunks}</strong>,
  mail: (chunks: ReactNode) => (
    <a href="mailto:contact@ultratourdelaria.fr">{chunks}</a>
  ),
  reg: (chunks: ReactNode) => (
    <a
      href="/docs/Reglement_Ultra_Trail_Ria_2027.pdf"
      target="_blank"
      rel="noopener noreferrer"
    >
      {chunks}
    </a>
  ),
  br: () => <br />,
};

export default async function CGV({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("legal.cgv");
  const tLegal = await getTranslations("legal");

  return (
    <LegalLayout title={tLegal("cgvTitle")}>
      <h2>{t("klikegoHeading")}</h2>
      <p>{t.rich("klikegoBody", tags)}</p>

      <div className="rounded-xl border border-ria-200 bg-ria-50 p-6">
        <p>{t("boxIntro")}</p>
        <ul className="mt-3">
          <li>{t("boxItem1")}</li>
          <li>{t("boxItem2")}</li>
          <li>{t("boxItem3")}</li>
          <li>{t("boxItem4")}</li>
        </ul>
      </div>

      <h2>{t("reglementHeading")}</h2>
      <p>{t.rich("reglementBody", tags)}</p>

      <h2>{t("contactHeading")}</h2>
      <p>{t.rich("contactBody", tags)}</p>

      <h2>{t("insuranceHeading")}</h2>
      <p>{t("insuranceBody")}</p>
    </LegalLayout>
  );
}
