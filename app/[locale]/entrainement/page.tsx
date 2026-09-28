import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/app/components/Header";
import EntrainementHero from "@/app/components/entrainement/EntrainementHero";
import EntrainementNav from "@/app/components/entrainement/EntrainementNav";
import EntrainementIntro from "@/app/components/entrainement/EntrainementIntro";
import CoachRonan from "@/app/components/entrainement/CoachRonan";
import EntrainementRavitos from "@/app/components/entrainement/EntrainementRavitos";
import { traceGpx } from "@/app/components/entrainement/traceGpx";
import { EPREUVES } from "@/app/components/entrainement/ravitosData";
import EntrainementNutrition from "@/app/components/entrainement/EntrainementNutrition";
import EntrainementMateriel from "@/app/components/entrainement/EntrainementMateriel";
import EntrainementRegles from "@/app/components/entrainement/EntrainementRegles";
import CoursePartenaires from "@/app/components/course/CoursePartenaires";
import Footer from "@/app/components/Footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "entrainementPage" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function Entrainement({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  // Traces GPX lus a la construction : un par epreuve de l'onglet des ravitos
  const traces = EPREUVES.map((e) => traceGpx(e.gpx, e.ravitos.map((r) => r.km), e.km));

  return (
    <>
      <Header />
      <EntrainementHero />
      <EntrainementNav />
      <EntrainementIntro />
      <CoachRonan />
      <EntrainementRavitos traces={traces} />
      <EntrainementNutrition />
      <EntrainementMateriel />
      <EntrainementRegles />
      <CoursePartenaires />
      <Footer />
    </>
  );
}
