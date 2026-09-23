import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  /* Proportions du cadre, ex. "900/1350" */
  ratio: string;
  sizes: string;
  /* Rotation du cadre en degres (legere, facon photo posee) */
  rotation?: number;
  /* Legende Comico avec repere vert (ex. nom de l'espece) */
  legende?: string;
  /* Cadrage de la photo (object-position) */
  position?: string;
  className?: string;
  /* Classes de la legende (decalage quand une photo voisine la recouvre) */
  legendeClassName?: string;
};

/*
  Photo posee sur la page : cadre legerement incline, ombre, bout de scotch
  en haut, legende avec le repere vert. Meme traitement que la section
  Patrimoine de la landing.
*/
export default function PhotoScotchee({
  src,
  alt,
  ratio,
  sizes,
  rotation = -1,
  legende,
  position,
  className = "",
  legendeClassName = "",
}: Props) {
  return (
    <figure className={className} style={{ transform: `rotate(${rotation}deg)` }}>
      <div className="relative">
        <div
          className="relative w-full overflow-hidden shadow-[2px_4px_10px_#00000040]"
          style={{ aspectRatio: ratio }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            className="object-cover"
            style={position ? { objectPosition: position } : undefined}
          />
        </div>
        <Image
          src="/images/deco/scotch.png"
          alt=""
          width={96}
          height={29}
          className="absolute -top-3 left-1/2 w-[88px] -translate-x-1/2 -rotate-3 opacity-[0.3]"
        />
      </div>
      {legende && (
        <figcaption
          className={`font-comico mt-3 flex items-center gap-2 text-[12px] uppercase leading-5 tracking-wide text-[#1c1c1c] sm:text-[13px] ${legendeClassName}`}
        >
          <Image src="/images/icones/pin.svg?v=2" alt="" width={16} height={16} className="h-4 w-4" />
          {legende}
        </figcaption>
      )}
    </figure>
  );
}
