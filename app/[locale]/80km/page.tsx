import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import CourseHero from "@/app/components/course/CourseHero";
import CourseEpreuve, { type Hotspot } from "@/app/components/course/CourseEpreuve";
import CourseInfos from "@/app/components/course/CourseInfos";
import CourseParcours from "@/app/components/course/CourseParcours";
import CourseEnvironnement from "@/app/components/course/CourseEnvironnement";
import CoursePrepare from "@/app/components/course/CoursePrepare";
import CourseSectionHeading from "@/app/components/course/CourseSectionHeading";
import CourseAutresEpreuves, {
  type AutreEpreuve,
} from "@/app/components/course/CourseAutresEpreuves";
import Festival from "@/app/components/sections/Festival";
import PartnersBand from "@/app/components/PartnersBand";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "Ultra 80 km — Ultra Tour de la Ria d'Étel",
  description:
    "L'Ultra 80 km, le tour complet de la Ria d'Étel en semi-autonomie : parcours, infos pratiques, ravitaillements et inscription. 16 octobre 2027, Locoal-Mendon.",
};

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

function FestifSection() {
  const t = useTranslations("course");
  return (
    <section className="overflow-x-clip">
      <div className="mx-auto max-w-7xl px-6 pt-16 lg:px-10 lg:pt-20">
        <CourseSectionHeading
          icon="/images/icones/fichier-15.svg"
          title={t("festifTitle")}
          className="mb-8"
        />
      </div>
      <Festival />
    </section>
  );
}

function PartenairesSection() {
  const t = useTranslations("partenaires");
  return (
    <section className="overflow-x-clip bg-white pt-16 lg:pt-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <CourseSectionHeading
          icon="/images/icones/fichier-10.svg?v=2"
          title={t("title")}
          className="mb-8"
        />
      </div>
      <PartnersBand />
    </section>
  );
}

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
      />
      <CourseInfos namespace="course80" utmbIndex="50K" />
      <CourseParcours
        traceUrl="/docs/UTR-80km-relais.gpx"
        legendTrace={t80("legendTrace")}
      />
      <CourseEnvironnement />
      <CoursePrepare />
      <FestifSection />
      <CourseAutresEpreuves epreuves={AUTRES_EPREUVES} />
      <PartenairesSection />
      <Footer />
    </>
  );
}
