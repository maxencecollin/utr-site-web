import Image from "next/image";
import { useTranslations } from "next-intl";
import PartnersBand from "../PartnersBand";

export default function Partenaires() {
  const t = useTranslations("partenaires");
  return (
    <section id="partenaires" className="bg-white pb-24 pt-20 lg:pb-32 lg:pt-24">
      {/* En-tete : ermine + cartouche Comico noir + titre + pointilles */}
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex items-start gap-5">
          <Image
            src="/images/icones/fichier-10.svg?v=2"
            alt=""
            width={68}
            height={60}
            className="h-[60px] w-[68px] shrink-0"
          />

          <div className="min-w-0 flex-1">
            <span className="font-comico inline-block bg-black px-3 py-1 text-[15px] uppercase leading-[23px] tracking-[9px] text-white">
              {t("overline")}
            </span>
            <h2 className="titre mt-2 text-[24px] leading-[30px] text-[#2c2c2c] sm:text-[46px] sm:leading-[56px]">
              {t("title")}
            </h2>
            <span className="mt-2 block h-[2px] bg-[repeating-linear-gradient(90deg,#101010_0,#101010_11px,transparent_11px,transparent_20px)]" />
          </div>
        </div>
      </div>

      {/* Bandeau bleu pleine largeur avec les logos */}
      <div className="mt-12">
        <PartnersBand />
      </div>
    </section>
  );
}
