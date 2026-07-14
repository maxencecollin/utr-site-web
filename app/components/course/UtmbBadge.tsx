import Image from "next/image";

type Props = {
  /* Categorie d'index UTMB : "50K", "20K"... (le SVG correspondant doit exister dans /images/logos/) */
  index: string;
  /* Variante blanche (texte et M blancs, pour les fonds photo sombres) */
  white?: boolean;
  className?: string;
};

/* Badge UTMB Index officiel (SVG maquette : cartouche orange + M marine) */
export default function UtmbBadge({ index, white = false, className = "" }: Props) {
  return (
    <Image
      src={`/images/logos/index-${index.toLowerCase()}${white ? "-blanc" : ""}.svg`}
      alt={`UTMB Index ${index}`}
      width={677}
      height={219}
      className={`h-8 w-auto ${className}`}
    />
  );
}
