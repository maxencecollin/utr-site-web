import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Countdown from "../Countdown";
import ArrowButton from "../ArrowButton";

/*
  Page d'attente des inscriptions, tant que la page Klikego n'existe pas.
  Aucun tarif ni date : ceux du reglement sont provisoires.
*/
const EPREUVES = [
  { href: "/80km", titre: "carte80", legende: "legendUltra80", photo: "/photos/_dsc6870-guy.jpg" },
  { href: "/relais", titre: "carteRelais", legende: "legendRelais", photo: "/photos/_dsc6509-girl2.jpg" },
  { href: "/33km", titre: "carte33", legende: "legendTrail33", photo: "/photos/_dsc6696-girl.jpg" },
] as const;

const REGLEMENT = "/docs/Reglement_Ultra_Tour_Ria_2027.pdf";
const EMAIL = "contact@ultratourdelaria.fr";

export default function InscriptionAttente() {
  const t = useTranslations("inscription");
  const tCourses = useTranslations("courses");

  return (
    <>
      <section className="relative isolate flex min-h-[85vh] flex-col overflow-hidden text-white">
        <Image
          src="/photos/vue-aerienne-ria.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-dark-900/55 via-dark-900/30 to-dark-900/65" />

        <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 pb-10 pt-28 text-center">
          <h1 className="headline text-4xl leading-[1.1] sm:text-6xl lg:text-[70px]">
            {t("titreLigne1")}
            <br />
            {t("titreLigne2")}
          </h1>
          <span className="relative inline-block px-4 py-1.5">
            <span aria-hidden="true" className="absolute inset-0 -skew-x-12 bg-ria-500" />
            <span className="relative text-[15px] font-bold uppercase tracking-[2px]">{t("badge")}</span>
          </span>
          <p className="mt-2 max-w-[52ch] text-[17px] leading-[1.55] text-white/90">{t("texte")}</p>
          <div className="mt-6">
            <Countdown />
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="text-center">
            <span className="font-comico inline-block bg-dark-900 px-3 py-1 text-[13px] uppercase leading-[21px] tracking-[7px] text-white">
              {t("attenteOverline")}
            </span>
            <h2 className="titre mt-3 text-3xl text-dark-900 sm:text-5xl">{t("attenteTitre")}</h2>
          </div>

          <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {EPREUVES.map((e) => (
              <li key={e.href}>
                <Link href={e.href} className="group relative block aspect-[16/10] overflow-hidden text-white sm:aspect-[4/5]">
                  <Image
                    src={e.photo}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-dark-900/10 to-transparent" />
                  <span className="absolute inset-x-0 bottom-0 p-6">
                    <span className="font-comico block text-[13px] uppercase tracking-[5px]">
                      {tCourses(e.legende)}
                    </span>
                    <span className="titre mt-1 block text-[26px]">{t(e.titre)}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <ArrowButton href={REGLEMENT} variant="outline-dark">
              {t("reglement")}
            </ArrowButton>
            <ArrowButton href="/entrainement" variant="outline-dark">
              {t("preparer")}
            </ArrowButton>
          </div>

          <p className="mt-10 text-center text-[15px] text-dark-700">
            {t("question")}{" "}
            <a href={`mailto:${EMAIL}`} className="font-semibold underline underline-offset-4">
              {EMAIL}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
