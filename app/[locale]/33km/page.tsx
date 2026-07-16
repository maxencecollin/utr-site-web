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
  title: "Trail 33 km — Ultra Tour de la Ria d'Étel",
  description:
    "Le 33 de la Ria, un trail entre sentiers techniques et paysages emblématiques de la Ria d'Étel : parcours, infos pratiques et inscription. 16 octobre 2027, Sainte-Hélène.",
};

// Declinaison verte de la maquette pour le 33 km
const VERT = "bg-[#4a5a20]";

// Page dediee a l'entrainement a venir ; en attendant, ancre de la landing
const HREF_ENTRAINEMENT = "/#entrainement";

const HOTSPOTS: Hotspot[] = [
  { labelKey: "hydratation", href: HREF_ENTRAINEMENT, direction: "right", left: "19%", top: "24%" },
  { labelKey: "parcoursLabel", href: "#parcours", direction: "down", left: "41.5%", top: "41%" },
  { labelKey: "equipements", href: HREF_ENTRAINEMENT, direction: "right", left: "15.5%", top: "62%" },
  { labelKey: "entrainementLabel", href: HREF_ENTRAINEMENT, direction: "right", left: "40%", top: "72.5%" },
  { labelKey: "dossard", href: "#infos", direction: "down", left: "68%", top: "64.5%" },
];

const AUTRES_EPREUVES: AutreEpreuve[] = [
  {
    href: "/80km",
    photo: "/photos/_dsc6870-guy.jpg",
    photoPosition: "50% 20%",
    lines: ["80", "KM"],
    legendKey: "legendUltra80",
  },
  {
    href: "/relais",
    photo: "/photos/_dsc6509-girl2.jpg",
    photoPosition: "50% 25%",
    lines: ["REL", "AIS"],
    legendKey: "legendRelais",
  },
];

export default async function Trail33({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("course");
  const t33 = await getTranslations("course33");

  return (
    <>
      <CourseHero
        titleLines={["33 KM"]}
        photo="/photos/_dsc6696-girl.jpg"
        photoAlt={t33("heroAlt")}
        photoPosition="50% 20%"
        utmbIndex="20K"
      />
      <CourseEpreuve
        trailing="/ 33 KM"
        photo="/photos/materiel-course.jpg"
        photoAlt={t("altMateriel")}
        hotspots={HOTSPOTS}
        utmbIndex="20K"
      />
      <CourseInfos
        namespace="course33"
        utmbIndex="20K"
        accent={VERT}
        buttonVariant="green"
      />
      <CourseParcours
        traceUrl="/docs/UTR-33km.gpx"
        waypointsUrl="/docs/UTR-80km-relais.gpx"
        legendTrace={t33("legendTrace")}
        bgClass={VERT}
        stravaRouteId="3512367351976300948"
      />
      <CourseEnvironnement />
      <CoursePrepare stripeClass={VERT} />
      <CourseFestif blur="/photos/blur-vert.jpg" />
      <CourseAutresEpreuves epreuves={AUTRES_EPREUVES} bandClass={VERT} />
      <CoursePartenaires photo="/photos/blur-vert.jpg" />
      <Footer />
    </>
  );
}
