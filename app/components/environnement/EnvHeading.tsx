import Image from "next/image";

type Props = {
  overline: string;
  titre: string;
  /* Picto et titre alignes a droite (section "Les enjeux") */
  aDroite?: boolean;
};

/*
  En-tete vert des sections claires de la page Environnement : picto feuille,
  cartouche Comico vert, titre, pointilles en pleine largeur d'ecran.
*/
export default function EnvHeading({ overline, titre, aDroite = false }: Props) {
  const picto = (
    <Image
      src="/images/icones/patrimoine.svg?v=2"
      alt=""
      width={60}
      height={56}
      className="h-12 w-auto shrink-0 sm:h-14"
    />
  );
  return (
    <div>
      <div className={`flex items-end gap-5 ${aDroite ? "justify-end text-right" : ""}`}>
        {!aDroite && picto}
        <div>
          <span className="font-comico inline-block bg-pinede-500 px-3 py-1 text-[12px] uppercase leading-[20px] tracking-[6px] text-white sm:text-[13px]">
            {overline}
          </span>
          <h2 className="titre mt-2 text-2xl text-[#1c1c1c] sm:text-4xl">{titre}</h2>
        </div>
        {aDroite && picto}
      </div>
      <span className="mx-[calc(50%-50vw)] mt-4 block h-[2px] bg-[repeating-linear-gradient(90deg,#797979_0,#797979_11px,transparent_11px,transparent_20px)]" />
    </div>
  );
}
