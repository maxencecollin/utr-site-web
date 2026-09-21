import Image from "next/image";
import { useTranslations } from "next-intl";
import PartnersBand from "../PartnersBand";

type Props = {
  /* Fond flou du bandeau (bleu par defaut, vert/marron selon la course) */
  photo?: string;
};

/*
  En-tete "Nos partenaires" + bandeau logos partage avec la landing.
  Meme en-tete que la landing (cartouche noir "Merci a tous" + titre), les
  maquettes des pages interieures le reprennent a l'identique.
*/
export default function CoursePartenaires({ photo }: Props) {
  const t = useTranslations("partenaires");
  return (
    <section className="overflow-x-clip bg-white pt-16 lg:pt-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-8 flex items-start gap-5">
          <Image
            src="/images/icones/fichier-10.svg?v=2"
            alt=""
            width={68}
            height={60}
            className="h-[52px] w-auto shrink-0"
          />
          <div className="min-w-0 flex-1">
            <span className="font-comico inline-block bg-black px-3 py-1 text-[13px] uppercase leading-[21px] tracking-[7px] text-white">
              {t("overline")}
            </span>
            <h2 className="titre mt-2 text-2xl text-[#2c2c2c] sm:text-3xl">{t("title")}</h2>
            {/* Pointilles en pleine largeur d'ecran (maquette) */}
            <span className="mx-[calc(50%-50vw)] mt-3 block h-[2px] bg-[repeating-linear-gradient(90deg,#101010_0,#101010_11px,transparent_11px,transparent_20px)]" />
          </div>
        </div>
      </div>
      <PartnersBand photo={photo} />
    </section>
  );
}
