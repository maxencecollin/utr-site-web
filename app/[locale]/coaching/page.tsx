import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Header from "@/app/components/Header";
import CoachingHero from "@/app/components/coaching/CoachingHero";
import CoachingPresentation from "@/app/components/coaching/CoachingPresentation";
import CoachingFaq from "@/app/components/coaching/CoachingFaq";
import CoachingOffres from "@/app/components/coaching/CoachingOffres";
import CoachingConseil from "@/app/components/coaching/CoachingConseil";
import CoachingContact from "@/app/components/coaching/CoachingContact";
import CoachingInstagram from "@/app/components/coaching/CoachingInstagram";
import CoursePartenaires from "@/app/components/course/CoursePartenaires";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "Coach Ronan Kervadec — Ultra Tour de la Ria d'Étel",
  description:
    "Prépare l'Ultra Tour de la Ria avec Ronan Kervadec, entraîneur de trail et de triathlon : offres de coaching sur 3 mois, FAQ et conseils.",
};

export default async function Coaching({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <CoachingHero />
      <CoachingPresentation />
      <CoachingFaq />
      <CoachingOffres />
      <CoachingConseil />
      <CoachingContact />
      <CoachingInstagram />
      <CoursePartenaires />
      <Footer />
    </>
  );
}
