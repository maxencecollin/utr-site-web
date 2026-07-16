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
  title: "Relais Duo 80 km — Ultra Tour de la Ria d'Étel",
  description:
    "Le Relais Duo : le Tour de la Ria d'Étel à deux, 50 km puis 30 km avec passage de relais à Sainte-Hélène. Parcours, infos pratiques et inscription. 16 octobre 2027.",
};

// Declinaison marron de la maquette pour le relais
const MARRON = "bg-[#5e3a1c]";

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
    href: "/80km",
    photo: "/photos/_dsc6870-guy.jpg",
    photoPosition: "50% 20%",
    lines: ["80", "KM"],
    legendKey: "legendUltra80",
  },
  {
    href: "/33km",
    photo: "/photos/_dsc6696-girl.jpg",
    photoPosition: "50% 20%",
    lines: ["33", "KM"],
    legendKey: "legendTrail33",
  },
];

export default async function Relais({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("course");
  const tRelais = await getTranslations("courseRelais");

  return (
    <>
      <CourseHero
        titleLines={["RELAIS"]}
        photo="/photos/_dsc6509-girl2.jpg"
        photoAlt={tRelais("heroAlt")}
        photoPosition="50% 25%"
        utmbIndex="20K"
      />
      <CourseEpreuve
        trailing="/ RELAIS"
        photo="/photos/materiel-course.jpg"
        photoAlt={t("altMateriel")}
        hotspots={HOTSPOTS}
        utmbIndex="20K"
      />
      <CourseInfos
        namespace="courseRelais"
        utmbIndex="20K"
        accent={MARRON}
        buttonVariant="brown"
        row1Cols="lg:grid-cols-[210px_290px_1fr]"
      />
      <CourseParcours
        traceUrl="/docs/UTR-80km-relais.gpx"
        legendTrace={tRelais("legendTrace")}
        bgClass={MARRON}
        stravaRouteId="3512364379356723150"
      />
      <CourseEnvironnement />
      <CoursePrepare stripeClass={MARRON} />
      <CourseFestif blur="/photos/blur-marron.jpg" />
      <CourseAutresEpreuves epreuves={AUTRES_EPREUVES} bandClass={MARRON} />
      <CoursePartenaires photo="/photos/blur-marron.jpg" />
      <Footer />
    </>
  );
}
