import Image from "next/image";
import { useTranslations } from "next-intl";
import ArrowButton from "../ArrowButton";

/*
  Section construite aux specs XD (canvas 1440px, section 1440x696, top 4473) :
  positions converties en pourcentages de la section, typo en valeurs absolues.
  La photo de fete (calque 1020x1486 demarrant a y 4050) est posee en darken
  par-dessus le flou bleu, ce qui cree la jonction en diagonale de la maquette.
*/
type Props = {
  /* Fond flou de droite : bleu par defaut, decline par les pages de course */
  blur?: string;
};

export default function Festival({ blur = "/photos/994.jpg" }: Props) {
  const t = useTranslations("festival");
  const tNav = useTranslations("nav");
  return (
    <section id="village" className="relative isolate overflow-hidden text-white">
      {/* DESKTOP/TABLETTE (md+) : composition pleine aux specs XD */}
      <div className="relative hidden aspect-[1440/696] w-full md:block">
        {/* 1. Flou en pleine largeur, sous tout le reste */}
        <Image
          src={blur}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />

        {/* 2. Photo de fete par-dessus le bleu */}
        <div
          aria-hidden="true"
          className="absolute left-0 top-0 h-full w-[70.83%]"
          style={{
            backgroundImage: "url(/photos/real_-jansen-d3gfrvatsd0-unsplash.jpg)",
            backgroundSize: "auto 106%",
            backgroundPosition: "25% 60%",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* 3. Couche de flou pur a droite : bord gauche en diagonale
              (repousse vers la droite en haut, au bord de la couche en bas) */}
        <div className="absolute right-0 top-0 h-full w-[44%] [clip-path:polygon(25%_0,100%_0,100%_100%,0_100%)]">
          <Image
            src={blur}
            alt=""
            fill
            sizes="47vw"
            className="object-cover"
          />
        </div>

        {/* Titre geant : Inter 800 italic ~195px/184px a 1440 -> unites vw,
            lignes decalees individuellement comme sur la maquette */}
        {/* ~216px a 1440 (spec XD 233 jugee un peu grosse) ; interligne cale pour que les
            capitales de LO touchent le haut de la section et la ligne de base de TIF le bas */}
        <h2 className="titre absolute left-[39.03%] top-[-0.79vw] text-[15vw] leading-[12.48vw]">
          <span className="block pl-[1.2vw]">Lo</span>
          <span className="block">coal</span>
          <span className="block">fes</span>
          <span className="block pl-[8.9vw]">tif</span>
        </h2>

        {/* Pin + badge Locoal Mendon (Comico 15px/21px #317598 sur blanc) */}
        <Image
          src="/images/icones/pin.svg?v=2"
          alt=""
          width={20}
          height={30}
          className="absolute left-[70.9%] top-[15.52%] h-[30px] w-[20px] brightness-0 invert"
        />
        <span className="font-comico absolute left-[73.06%] top-[14.94%] bg-white px-1.5 py-px text-[15px] uppercase leading-[21px] text-[#317598]">
          Locoal
          <br />
          Mendon
        </span>

        {/* Paragraphe (Inter medium 16px/20px, 217px de large) */}
        <p className="absolute left-[72.43%] top-[53.45%] w-[217px] text-[16px] font-medium leading-5">
          {t("text")}
        </p>

        {/* Pictos buvette + secours (28px, blancs) */}
        <div className="absolute left-[72.92%] top-[67.96%] flex items-center gap-1">
          <Image
            src="/images/icones/fichier-15.svg"
            alt={t("altBuvette")}
            width={29}
            height={28}
            className="h-7 w-auto brightness-0 invert"
          />
          <Image
            src="/images/icones/fichier-14.svg"
            alt={t("altAssistance")}
            width={29}
            height={28}
            className="h-7 w-auto brightness-0 invert"
          />
        </div>

        {/* Bande blanche : 10px de haut, file jusqu'au bord droit */}
        <span
          aria-hidden="true"
          className="absolute left-[78.68%] right-0 top-[70.69%] h-2.5 bg-white"
        />

        {/* Bouton Le village (Inter 600 17px) */}
        <div className="absolute left-[78.3%] top-[83.9%]">
          <ArrowButton href="#village" variant="outline-white" textSize="text-[17px]">
            {tNav("village")}
          </ArrowButton>
        </div>
      </div>

      {/* MOBILE (<md) : photo de fete + contenu empile, lisible */}
      <div className="relative isolate md:hidden">
        <Image
          src="/photos/real_-jansen-d3gfrvatsd0-unsplash.jpg"
          alt={t("altPhoto")}
          fill
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-dark-900/55" />

        <div className="px-6 py-16">
          <h2 className="titre text-5xl leading-[0.9]">
            Locoal
            <br />
            festif
          </h2>

          <div className="mt-5 flex items-center gap-2">
            <Image
              src="/images/icones/pin.svg?v=2"
              alt=""
              width={18}
              height={27}
              className="h-6 w-auto brightness-0 invert"
            />
            <span className="font-comico bg-white px-2 py-0.5 text-[13px] uppercase leading-tight text-[#317598]">
              Locoal-Mendon
            </span>
          </div>

          <p className="mt-5 max-w-sm text-[15px] font-medium leading-relaxed">
            {t("text")}
          </p>

          <div className="mt-5 flex items-center gap-2">
            <Image
              src="/images/icones/fichier-15.svg"
              alt={t("altBuvette")}
              width={29}
              height={28}
              className="h-7 w-auto brightness-0 invert"
            />
            <Image
              src="/images/icones/fichier-14.svg"
              alt={t("altAssistance")}
              width={29}
              height={28}
              className="h-7 w-auto brightness-0 invert"
            />
          </div>

          <div className="mt-8">
            <ArrowButton href="#village" variant="outline-white">
              {tNav("village")}
            </ArrowButton>
          </div>
        </div>
      </div>
    </section>
  );
}
