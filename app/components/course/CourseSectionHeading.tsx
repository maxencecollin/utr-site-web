import Image from "next/image";

type Props = {
  icon: string;
  title: string;
  /* Texte a droite de la ligne de titre (ex. "/ 80 KM") */
  trailing?: string;
  /* Picto et titre a droite (ex. "Prepare ta course", "Nos autres epreuves") */
  align?: "left" | "right";
  /* Sur fond sombre (ex. "Le parcours") */
  tone?: "dark" | "light";
  /* false : les pointilles s'arretent aux bords du conteneur au lieu de filer sur tout l'ecran */
  bleed?: boolean;
  className?: string;
};

/*
  En-tete de section des pages de course (maquette XD) :
  picto hexagonal + "/" + titre Inter Extrabold Italic, pointilles en dessous.
  Different des en-tetes de la landing (pas de cartouche Comico).
*/
export default function CourseSectionHeading({
  icon,
  title,
  trailing,
  align = "left",
  tone = "dark",
  bleed = true,
  className = "",
}: Props) {
  const text = tone === "dark" ? "text-[#1c1c1c]" : "text-white";
  const dashes =
    tone === "dark"
      ? "bg-[repeating-linear-gradient(90deg,#101010_0,#101010_11px,transparent_11px,transparent_20px)]"
      : "bg-[repeating-linear-gradient(90deg,#ffffff_0,#ffffff_11px,transparent_11px,transparent_20px)]";

  // Pictos toujours monochromes dans ces en-tetes (noir sur clair, blanc sur sombre)
  const picto = (
    <Image
      src={icon}
      alt=""
      width={52}
      height={48}
      className={`h-11 w-auto shrink-0 ${tone === "light" ? "brightness-0 invert" : "brightness-0"}`}
    />
  );
  const slash = (
    <span aria-hidden="true" className={`titre text-3xl ${text}`}>
      /
    </span>
  );

  return (
    <div className={className}>
      <div
        className={`flex items-center gap-4 ${align === "right" ? "justify-end" : ""}`}
      >
        {align === "left" && (
          <>
            {picto}
            {slash}
          </>
        )}
        <h2 className={`titre text-2xl sm:text-3xl ${text}`}>{title}</h2>
        {align === "left" && trailing && (
          <span className={`titre ml-auto text-lg sm:text-2xl ${text}`}>
            {trailing}
          </span>
        )}
        {align === "right" && (
          <>
            {slash}
            {picto}
          </>
        )}
      </div>
      {/* Pointilles en pleine largeur d'ecran (debordent du conteneur centre, maquette XD),
          ou limites au conteneur si bleed est desactive */}
      <span
        className={`${bleed ? "mx-[calc(50%-50vw)]" : ""} mt-4 block h-[2px] ${dashes}`}
      />
    </div>
  );
}
