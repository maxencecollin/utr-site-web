import Link from "next/link";

type Variant =
  | "blue"
  | "green"
  | "brown"
  | "dark"
  | "outline-dark"
  | "outline-white";

type Direction = "right" | "up" | "down";

const VARIANTS: Record<Variant, string> = {
  blue: "bg-ria-500 text-white hover:bg-ria-600",
  green: "bg-pinede-500 text-white hover:bg-pinede-600",
  brown: "bg-sable-500 text-white hover:bg-sable-600",
  dark: "bg-dark-900 text-white hover:bg-dark-700",
  "outline-dark":
    "border border-dark-900 text-dark-900 hover:bg-dark-900 hover:text-white",
  "outline-white":
    "border border-white text-white hover:bg-white hover:text-dark-900",
};

const ROTATION: Record<Direction, string> = {
  right: "",
  up: "-rotate-90",
  down: "rotate-90",
};

type Props = {
  children: React.ReactNode;
  href: string;
  variant?: Variant;
  direction?: Direction;
  className?: string;
};

export default function ArrowButton({
  children,
  href,
  variant = "blue",
  direction = "right",
  className = "",
}: Props) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-3 rounded-md py-2 pl-5 pr-2 text-xs font-semibold uppercase tracking-wide transition-colors ${VARIANTS[variant]} ${className}`}
    >
      <span>{children}</span>
      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-current">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={`h-3.5 w-3.5 ${ROTATION[direction]}`}
          aria-hidden="true"
        >
          <path
            d="M5 12h14M13 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}
