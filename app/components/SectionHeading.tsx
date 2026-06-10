type Accent = "dark" | "green" | "brown" | "blue";

const TITLE_COLOR: Record<Accent, string> = {
  dark: "text-dark-900",
  green: "text-pinede-500",
  brown: "text-sable-600",
  blue: "text-ria-500",
};

const ICON_COLOR: Record<Accent, string> = {
  dark: "border-dark-900 text-dark-900",
  green: "border-pinede-500 text-pinede-500",
  brown: "border-sable-600 text-sable-600",
  blue: "border-ria-500 text-ria-500",
};

type Props = {
  overline: string;
  title: string;
  accent?: Accent;
  trailing?: React.ReactNode;
  className?: string;
};

export default function SectionHeading({
  overline,
  title,
  accent = "dark",
  trailing,
  className = "",
}: Props) {
  return (
    <div className={`flex items-start gap-4 ${className}`}>
      {/* Icone de section (placeholder, en attendant les pictos de la maquette) */}
      <span
        className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-md border-2 ${ICON_COLOR[accent]}`}
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
          <path
            d="M4 18l5-9 4 6 3-4 4 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-3">
          <span className="text-[0.7rem] font-bold uppercase tracking-[0.25em] text-dark-500">
            {overline}
          </span>
          <span className="h-px flex-1 border-t border-dashed border-dark-300" />
          {trailing}
        </div>
        <h2
          className={`titre mt-1 text-3xl sm:text-4xl lg:text-5xl ${TITLE_COLOR[accent]}`}
        >
          {title}
        </h2>
      </div>
    </div>
  );
}
