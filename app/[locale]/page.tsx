import { setRequestLocale } from "next-intl/server";
import Hero from "@/app/components/sections/Hero";
import Courses from "@/app/components/sections/Courses";
import Parcours from "@/app/components/sections/Parcours";
import Patrimoine from "@/app/components/sections/Patrimoine";
import Festival from "@/app/components/sections/Festival";
import Entrainement from "@/app/components/sections/Entrainement";
import Benevoles from "@/app/components/sections/Benevoles";
import Partenaires from "@/app/components/sections/Partenaires";
import Footer from "@/app/components/Footer";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Courses />
      <Parcours />
      <Patrimoine />
      <Festival />
      <Entrainement />
      <Benevoles />
      <Partenaires />
      <Footer />
    </>
  );
}
