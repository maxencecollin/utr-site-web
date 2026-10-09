import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/app/components/Header";
import InfosPratiquesAttente from "@/app/components/infos-pratiques/InfosPratiquesAttente";
import Footer from "@/app/components/Footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "infosPratiques" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function InfosPratiques({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <InfosPratiquesAttente />
      <Footer />
    </>
  );
}
