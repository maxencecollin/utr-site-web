import Image from "next/image";
import { useTranslations } from "next-intl";
import ArrowButton from "../ArrowButton";
import { EMAIL_RONAN } from "./coachingData";

/*
  "Me contacter".

  La maquette prevoit un formulaire, mais le site est exporte en statique : il
  n'y a pas de serveur pour recevoir les messages. On renvoie donc vers la
  messagerie du visiteur (choix valide avec Maxence).
*/
export default function CoachingContact() {
  const t = useTranslations("coaching");

  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden bg-[#462d1e] py-16 text-white lg:py-24"
    >
      <Image
        src="/images/deco/topographie.svg"
        alt=""
        width={1600}
        height={900}
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-[0.07]"
      />

      <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
        <h2 className="titre text-2xl sm:text-4xl">{t("contactTitre")}</h2>
        <p className="mx-auto mt-5 max-w-[46ch] text-[16px] leading-[1.6] text-white/90">
          {t("contactTexte")}
        </p>
        <div className="mt-8 flex justify-center">
          <ArrowButton href={`mailto:${EMAIL_RONAN}`} variant="outline-white">
            {t("contactCta")}
          </ArrowButton>
        </div>
      </div>
    </section>
  );
}
