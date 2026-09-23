import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/app/components/Header";
import EnvironnementHero from "@/app/components/environnement/EnvironnementHero";
import EntrainementIntro from "@/app/components/entrainement/EntrainementIntro";
import EnvironnementSternes from "@/app/components/environnement/EnvironnementSternes";
import ZonesProtegees from "@/app/components/environnement/ZonesProtegees";
import PatrimoineNaturel from "@/app/components/environnement/PatrimoineNaturel";
import Engagements from "@/app/components/environnement/Engagements";
import Enjeux from "@/app/components/environnement/Enjeux";
import EntrainementRegles from "@/app/components/entrainement/EntrainementRegles";
import Benevoles from "@/app/components/sections/Benevoles";
import CoursePartenaires from "@/app/components/course/CoursePartenaires";
import Footer from "@/app/components/Footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "environnement" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function Environnement({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <EnvironnementHero />
      <EntrainementIntro namespace="environnement" />
      <EnvironnementSternes />
      <ZonesProtegees />
      <PatrimoineNaturel />
      <Engagements />
      <Enjeux />
      <EntrainementRegles />
      <Benevoles />
      <CoursePartenaires />
      <Footer />
    </>
  );
}
