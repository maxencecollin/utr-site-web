import Image from "next/image";
import { useTranslations } from "next-intl";
import ArrowButton from "../ArrowButton";

/*
  Les quatre regles, chacune avec sa variante du motif Locoal
  (fichier-29 a 32, les quatre declinaisons livrees par la graphiste).
*/
const REGLES = [
  { icone: "/images/icones/fichier-29.svg", titre: "reglesDechetsTitre", texte: "reglesDechetsTexte" },
  { icone: "/images/icones/fichier-30.svg", titre: "reglesBalisageTitre", texte: "reglesBalisageTexte" },
  { icone: "/images/icones/fichier-31.svg", titre: "reglesPrivesTitre", texte: "reglesPrivesTexte" },
  { icone: "/images/icones/fichier-32.svg", titre: "reglesBiodiversiteTitre", texte: "reglesBiodiversiteTexte" },
] as const;

export default function EntrainementRegles() {
  const t = useTranslations("entrainementPage");

  return (
    <section
      id="regles"
      className="relative isolate overflow-hidden py-16 text-[#1c1c1c] lg:py-24"
    >
      {/* Fond papier pleine largeur */}
      <Image
        src="/images/deco/papier-fond.jpg"
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p className="font-comico text-[13px] uppercase tracking-[7px] sm:text-[14px]">
          {t("reglesOverline")}
        </p>
        <h2 className="titre mt-2 text-2xl sm:text-4xl">{t("reglesTitle")}</h2>
        {/* Pointilles limites au texte (maquette), pas en pleine largeur */}
        <span className="mt-4 block h-[2px] max-w-3xl bg-[repeating-linear-gradient(90deg,#797979_0,#797979_11px,transparent_11px,transparent_20px)]" />

        <p className="mt-6 max-w-[64ch] text-[15px] leading-[1.6] text-dark-700">
          {t("reglesIntro")}
        </p>

        <ul className="mt-12 grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-2">
          {REGLES.map((regle) => (
            <li key={regle.titre} className="flex items-start gap-5">
              <Image
                src={regle.icone}
                alt=""
                width={40}
                height={48}
                className="h-10 w-auto shrink-0 brightness-0"
              />
              <div>
                <h3 className="titre text-[17px] sm:text-[19px]">{t(regle.titre)}</h3>
                <p className="mt-2 max-w-[42ch] text-[15px] leading-[1.55] text-dark-700">
                  {t(regle.texte)}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-14 flex justify-center">
          <ArrowButton
            href="/docs/Reglement_Ultra_Tour_Ria_2027.pdf"
            variant="outline-dark"
            textSize="text-[15px]"
          >
            {t("reglesCta")}
          </ArrowButton>
        </div>
      </div>
    </section>
  );
}
