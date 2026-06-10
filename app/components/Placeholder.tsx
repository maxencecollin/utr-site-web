type Props = {
  label?: string;
  className?: string;
  tone?: "light" | "dark";
};

/*
  Bloc image temporaire, en attendant les photos definitives.
  A remplacer par <Image> une fois les visuels fournis.
*/
export default function Placeholder({
  label = "Photo à venir",
  className = "",
  tone = "light",
}: Props) {
  const toneClasses =
    tone === "dark"
      ? "bg-dark-800 text-white/50 border-white/15"
      : "bg-dark-100 text-dark-400 border-dark-300";

  return (
    <div
      className={`flex items-center justify-center overflow-hidden border border-dashed ${toneClasses} ${className}`}
      role="img"
      aria-label={label}
    >
      <span className="px-4 text-center text-[0.7rem] font-semibold uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}
