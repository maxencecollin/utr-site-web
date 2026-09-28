import { setRequestLocale } from "next-intl/server";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ProtoPage from "@/app/components/proto/ProtoPage";
import { traceGpx } from "@/app/components/proto/traceGpx";
import { RAVITOS_80 } from "@/app/components/entrainement/ravitosData";

/* Page de test des prototypes d'animation (GSAP + Lenis). Non liee au site. */
export default async function Proto({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const trace = traceGpx("docs/UTR-80km-relais.gpx", RAVITOS_80.map((r) => r.km), 80);
  return (
    <>
      <Header />
      <ProtoPage trace={trace} />
      <Footer />
    </>
  );
}
