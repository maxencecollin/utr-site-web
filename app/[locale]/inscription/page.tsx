import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/app/components/Header";
import InscriptionAttente from "@/app/components/inscription/InscriptionAttente";
import Footer from "@/app/components/Footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "inscription" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function Inscription({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <InscriptionAttente />
      <Footer />
    </>
  );
}
