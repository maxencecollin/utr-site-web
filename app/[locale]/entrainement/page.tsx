import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/app/components/Header";
import EntrainementHero from "@/app/components/entrainement/EntrainementHero";
import EntrainementNav from "@/app/components/entrainement/EntrainementNav";
import EntrainementIntro from "@/app/components/entrainement/EntrainementIntro";
import CoachRonan from "@/app/components/entrainement/CoachRonan";
import EntrainementRavitos from "@/app/components/entrainement/EntrainementRavitos";
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

  return (
    <>
      <Header />
      <EntrainementHero />
      <EntrainementNav />
      <EntrainementIntro />
      <CoachRonan />
      <EntrainementRavitos />
      <EntrainementNutrition />
      <EntrainementMateriel />
      <EntrainementRegles />
      <CoursePartenaires />
      <Footer />
    </>
  );
}
