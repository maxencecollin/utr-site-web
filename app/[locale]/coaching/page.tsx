import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/app/components/Header";
import CoachingHero from "@/app/components/coaching/CoachingHero";
import CoachingPresentation from "@/app/components/coaching/CoachingPresentation";
import CoachingPhilosophie from "@/app/components/coaching/CoachingPhilosophie";
import CoachingFaq from "@/app/components/coaching/CoachingFaq";
import CoachingOffres from "@/app/components/coaching/CoachingOffres";
import CoachingConseil from "@/app/components/coaching/CoachingConseil";
import CoachingContact from "@/app/components/coaching/CoachingContact";
import CoachingInstagram from "@/app/components/coaching/CoachingInstagram";
import CoursePartenaires from "@/app/components/course/CoursePartenaires";
import Footer from "@/app/components/Footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "coaching" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

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
      <CoachingPhilosophie />
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
