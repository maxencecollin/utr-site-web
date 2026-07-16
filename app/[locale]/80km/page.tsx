import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import CourseHero from "@/app/components/course/CourseHero";
import CourseEpreuve, { type Hotspot } from "@/app/components/course/CourseEpreuve";
import CourseInfos from "@/app/components/course/CourseInfos";
import CourseParcours from "@/app/components/course/CourseParcours";
import CourseEnvironnement from "@/app/components/course/CourseEnvironnement";
import CoursePrepare from "@/app/components/course/CoursePrepare";
import CourseFestif from "@/app/components/course/CourseFestif";
import CoursePartenaires from "@/app/components/course/CoursePartenaires";
import CourseAutresEpreuves, {
  type AutreEpreuve,
} from "@/app/components/course/CourseAutresEpreuves";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "Ultra 80 km — Ultra Tour de la Ria d'Étel",
  description:
    "L'Ultra 80 km, le tour complet de la Ria d'Étel en semi-autonomie : parcours, infos pratiques, ravitaillements et inscription. 16 octobre 2027, Locoal-Mendon.",
};

// Page dediee a l'entrainement a venir ; en attendant, ancre de la landing
const HREF_ENTRAINEMENT = "/#entrainement";

const HOTSPOTS: Hotspot[] = [
  { labelKey: "hydratation", href: HREF_ENTRAINEMENT, direction: "right", left: "19%", top: "24%", zoom: { x: 20, y: 26 } },
  { labelKey: "parcoursLabel", href: "#parcours", direction: "down", left: "41.5%", top: "41%", zoom: { x: 43, y: 46 } },
  { labelKey: "equipements", href: HREF_ENTRAINEMENT, direction: "right", left: "15.5%", top: "62%", zoom: { x: 19, y: 70 } },
  { labelKey: "entrainementLabel", href: HREF_ENTRAINEMENT, direction: "right", left: "40%", top: "72.5%", zoom: { x: 39, y: 80 } },
  { labelKey: "dossard", href: "#infos", direction: "down", left: "68%", top: "64.5%", zoom: { x: 70, y: 77 } },
];

const AUTRES_EPREUVES: AutreEpreuve[] = [
  {
    href: "/33km",
    photo: "/photos/_dsc6696-girl.jpg",
    photoPosition: "50% 20%",
    lines: ["33", "KM"],
    legendKey: "legendTrail33",
  },
  {
    href: "/relais",
    photo: "/photos/_dsc6509-girl2.jpg",
    photoPosition: "50% 25%",
    lines: ["REL", "AIS"],
    legendKey: "legendRelais",
  },
];

export default async function Ultra80({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("course");
  const t80 = await getTranslations("course80");

  return (
    <>
      <CourseHero
        titleLines={["80 KM"]}
        photo="/photos/_dsc6870-guy.jpg"
        photoAlt={t80("heroAlt")}
        photoPosition="50% 22%"
        utmbIndex="50K"
      />
      <CourseEpreuve
        trailing="/ 80 KM"
        photo="/photos/materiel-course.jpg"
        photoAlt={t("altMateriel")}
        hotspots={HOTSPOTS}
        utmbIndex="50K"
        captionNamespace="course80"
      />
      <CourseInfos namespace="course80" utmbIndex="50K" />
      <CourseParcours
        traceUrl="/docs/UTR-80km-relais.gpx"
        legendTrace={t80("legendTrace")}
        stravaRouteId="3512364379356723150"
      />
      <CourseEnvironnement />
      <CoursePrepare />
      <CourseFestif />
      <CourseAutresEpreuves epreuves={AUTRES_EPREUVES} />
      <CoursePartenaires />
      <Footer />
    </>
  );
}
