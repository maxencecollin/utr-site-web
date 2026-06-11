import Image from "next/image";

type Accent = "dark" | "green" | "brown" | "blue";

const TITLE_COLOR: Record<Accent, string> = {
  dark: "text-dark-900",
  green: "text-pinede-500",
  brown: "text-sable-600",
  blue: "text-ria-500",
};

const OVERLINE_COLOR: Record<Accent, string> = {
  dark: "text-dark-500",
  green: "text-pinede-500",
  brown: "text-sable-600",
  blue: "text-ria-500",
};

type Props = {
  overline: string;
  title: string;
  icon: string;
  accent?: Accent;
  trailing?: React.ReactNode;
  className?: string;
};

export default function SectionHeading({
  overline,
  title,
  icon,
  accent = "dark",
  trailing,
  className = "",
}: Props) {
  return (
    <div className={`flex items-start gap-4 ${className}`}>
      {/* Picto de section */}
      <Image src={icon} alt="" width={44} height={44} className="mt-1 h-11 w-11 shrink-0" />

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-3">
          <span
            className={`text-[0.7rem] font-bold uppercase tracking-[0.25em] ${OVERLINE_COLOR[accent]}`}
          >
            {overline}
          </span>
          <span className="h-px flex-1 border-t border-dashed border-dark-300" />
          {trailing}
        </div>
        <h2 className={`titre mt-1 text-4xl ${TITLE_COLOR[accent]}`}>{title}</h2>
      </div>
    </div>
  );
}
