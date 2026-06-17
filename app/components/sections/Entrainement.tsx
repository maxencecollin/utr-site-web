import Image from "next/image";
import { useTranslations } from "next-intl";
import ArrowButton from "../ArrowButton";

export default function Entrainement() {
  const t = useTranslations("entrainement");
  const THEMES = t.raw("categories") as string[];
  return (
    <section id="entrainement" className="overflow-hidden bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* En-tete : picto + cartouche Comico marron + titre + pointilles */}
        <div className="flex items-start gap-5">
          <Image
            src="/images/icones/fichier-12.svg"
            alt=""
            width={68}
            height={60}
            className="h-[60px] w-[68px] shrink-0"
          />

          <div className="min-w-0 flex-1">
            <span className="font-comico inline-block bg-sable-500 px-3 py-1 text-[15px] uppercase leading-[23px] tracking-[9px] text-white">
              {t("overline")}
            </span>
            <h2 className="titre mt-2 text-3xl text-[#2c2c2c] sm:text-4xl">
              {t("title")}
            </h2>
            {/* Pointilles plus espaces que border-dashed (tirets 11px, trous 9px) */}
            <span className="mt-3 block h-[2px] bg-[repeating-linear-gradient(90deg,#797979_0,#797979_11px,transparent_11px,transparent_20px)]" />

            {/* Categories : Comico marron, separees par des "/" */}
            <ul className="font-comico mt-5 flex flex-wrap items-center gap-x-3 text-[16px] uppercase leading-5 text-sable-500">
              {THEMES.map((theme, i) => (
                <li key={theme} className="flex items-center gap-x-3">
                  {i > 0 && <span aria-hidden="true">/</span>}
                  {theme}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Photo scotchee + traits marrons + bloc texte aligne a droite */}
        <div className="mt-14 grid grid-cols-1 items-center gap-12 lg:grid-cols-[55%_1fr]">
          <div className="relative">
            {/* Bandes marrons #6F4126 (12px, specs XD) qui passent sous la photo :
                une a gauche depuis le bord de l'ecran, deux a droite vers le texte */}
            <span
              aria-hidden="true"
              className="absolute right-[75.2%] top-[21%] h-3 w-screen -rotate-1 bg-[#6f4126]"
            />
            <span
              aria-hidden="true"
              className="absolute left-[80.4%] top-[68.4%] h-3 w-[276px] -rotate-1 bg-[#6f4126]"
            />
            <span
              aria-hidden="true"
              className="absolute left-[82.7%] top-[77.6%] h-3 w-[276px] -rotate-1 bg-[#6f4126]"
            />

            {/* Photo 665x456 (specs XD), legerement inclinee ;
                cadrage : jambes et chaussures sur fond de ciel */}
            <div
              className="relative aspect-[665/456] w-full -rotate-1 shadow-[0_3px_6px_#00000029]"
              role="img"
              aria-label={t("altPhoto")}
              style={{
                backgroundImage:
                  "url(/photos/venti-views--uyedjt31zy-unsplash.jpg)",
                backgroundSize: "auto 190%",
                backgroundPosition: "42% 54%",
                backgroundRepeat: "no-repeat",
              }}
            />

            {/* Scotchs : coin haut-gauche + coin bas-droit (specs XD) */}
            <Image
              src="/images/deco/scotch.png"
              alt=""
              width={91}
              height={29}
              className="absolute -left-5 -top-3.5 w-[91px] -rotate-[37deg] opacity-[0.16] shadow-[0_3px_6px_#00000029]"
            />
            <Image
              src="/images/deco/scotch.png"
              alt=""
              width={96}
              height={29}
              className="absolute -bottom-2 -right-5 w-[96px] -rotate-[29deg] opacity-[0.16] shadow-[0_3px_6px_#00000029]"
            />
          </div>

          <div className="flex flex-col items-start text-left lg:items-end lg:text-right">
            <h3 className="titre text-xl text-[#2c2c2c]">
              {t("subtitle1")}
              <br />
              {t("subtitle2")}
            </h3>
            <p className="mt-4 max-w-sm text-dark-700">{t("text")}</p>
            <p className="mt-1 font-bold italic text-dark-800">{t("ready")}</p>
            <div className="mt-8">
              <ArrowButton href="#entrainement" variant="brown">
                {t("button")}
              </ArrowButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
