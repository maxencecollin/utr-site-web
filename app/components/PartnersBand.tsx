import Image from "next/image";
import { useTranslations } from "next-intl";
import ArrowButton from "./ArrowButton";

const PARTNERS = [
  { nom: "Decathlon", niveauKey: "officiel", src: "/images/partenaires/decathlon.svg", w: 313, h: 203 },
  { nom: "Kinetik", niveauKey: "privilege", src: "/images/partenaires/kinetik.svg", w: 171, h: 159 },
  { nom: "UTMB Index", niveauKey: "majeur", src: "/images/partenaires/utmb-index.svg", w: 185, h: 44 },
  { nom: "Plancoët", niveauKey: "majeur", src: "/images/partenaires/plancoet.svg", w: 216, h: 101 },
];

type Props = {
  /* Fond flou du bandeau ; bleu par defaut, vert/marron sur les pages de course */
  photo?: string;
};

/* Bandeau pleine largeur : logos + niveaux + bouton.
   Partage entre la section Partenaires de la landing et les pages de course. */
export default function PartnersBand({ photo = "/photos/994.jpg" }: Props) {
  const t = useTranslations("partenaires");
  return (
    <div className="relative isolate overflow-hidden">
      <Image
        src={photo}
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="relative mx-auto max-w-[88rem] px-6 lg:px-10">
        {/* Logos + bouton centres ensemble, separes par des filets blancs inclines (65px, 1px) */}
        <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-10 py-20">
          {PARTNERS.map((p, i) => (
            <div key={p.nom} className="flex items-center gap-x-7">
              {i > 0 && (
                <span aria-hidden="true" className="hidden h-[65px] w-px -skew-x-12 bg-white/50 lg:block" />
              )}
              <div className="text-center">
                <Image
                  src={p.src}
                  alt={p.nom}
                  width={p.w}
                  height={p.h}
                  className="mx-auto h-14 w-auto"
                />
                <span className="mt-4 block text-[13px] font-bold uppercase tracking-[2px] text-white/85">
                  {t(p.niveauKey)}
                </span>
              </div>
            </div>
          ))}

          <ArrowButton href="/#partenaires" variant="outline-white" textSize="text-[14px]">
            {t("title")}
          </ArrowButton>
        </div>
      </div>
    </div>
  );
}
