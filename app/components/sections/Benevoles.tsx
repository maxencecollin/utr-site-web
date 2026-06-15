import Image from "next/image";
import ArrowButton from "../ArrowButton";

/*
  Section construite aux specs XD (section 1440x694) :
  positions en pourcentages, typo en vw pour rester proportionnelle au cadre.
*/
export default function Benevoles() {
  return (
    <section id="benevoles" className="relative isolate overflow-hidden text-white">
      <div className="relative aspect-[1440/694] w-full">
        <Image
          src="/photos/img_2769.jpg"
          alt="Bénévoles reflétés dans les lunettes d'un coureur"
          fill
          priority={false}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-dark-900/25" />

        {/* Surtitre (Comico 24px/37px) a left 368 / top 197 */}
        <span className="font-comico absolute left-[25.56%] top-[28.4%] text-[1.667vw] uppercase leading-[2.569vw]">
          Rejoins l&apos;aventure
        </span>

        {/* Filet sous le surtitre (left 363, width 1105 -> bord droit), 2px */}
        <span
          aria-hidden="true"
          className="absolute left-[25.2%] right-0 top-[34.15%] h-0.5 bg-white"
        />

        {/* Picto poignee de main (~84x74) a gauche, centre verticalement sur le titre */}
        <Image
          src="/images/icones/fichier-13.svg?v=2"
          alt=""
          width={84}
          height={74}
          className="absolute left-[11.5%] top-[46%] h-[7.5vw] w-auto -translate-y-1/2"
        />

        {/* Separateur entre picto et titre (left 300, top 6354, height 92, 2px),
            legerement incline facon italique comme le titre */}
        <span
          aria-hidden="true"
          className="absolute left-[21.3%] top-[39.3%] h-[6.39vw] w-0.5 -skew-x-12 bg-white"
        />

        {/* Titre (Inter 800 italic 49px/54px) a left 340 / top 263 */}
        <h2 className="titre absolute left-[23.6%] top-[37.9%] text-[3.403vw] leading-[3.75vw]">
          Deviens
          <br />
          bénévole
        </h2>

        {/* Filet sous le titre (depuis le bord gauche jusqu'a 40.5%), 2px */}
        <span
          aria-hidden="true"
          className="absolute left-0 top-[60.1%] h-0.5 w-[40.5%] bg-white"
        />

        {/* Bouton (cadre 290x54 a left 325 / top 6540) */}
        <div className="absolute left-[22.57%] top-[66.1%]">
          <ArrowButton href="#benevoles" variant="outline-white" textSize="text-[15px]">
            Devenir bénévole
          </ArrowButton>
        </div>
      </div>
    </section>
  );
}
