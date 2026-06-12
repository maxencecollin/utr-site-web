import Link from "next/link";

type Variant =
  | "blue"
  | "green"
  | "brown"
  | "dark"
  | "outline-dark"
  | "outline-white";

type Direction = "right" | "up" | "down";

// Couche de fond (parallelogramme incline)
const LAYER: Record<Variant, string> = {
  blue: "bg-ria-500 group-hover:bg-ria-600",
  green:
    "bg-[linear-gradient(90deg,#86b13a_0%,#3c4c1f_100%)] group-hover:brightness-110",
  brown: "bg-sable-500 group-hover:bg-sable-600",
  dark: "bg-dark-900 group-hover:bg-dark-700",
  "outline-dark": "border border-dark-900 group-hover:bg-dark-900",
  "outline-white": "border border-white group-hover:bg-white",
};

// Couleur du texte / de la fleche
const TEXT: Record<Variant, string> = {
  blue: "text-white",
  green: "text-white",
  brown: "text-white",
  dark: "text-white",
  "outline-dark": "text-dark-900 group-hover:text-white",
  "outline-white": "text-white group-hover:text-dark-900",
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
  /* Taille du texte : 14px par defaut (specs XD hero), surchargable par section */
  textSize?: string;
  className?: string;
};

export default function ArrowButton({
  children,
  href,
  variant = "blue",
  direction = "right",
  textSize = "text-[14px]",
  className = "",
}: Props) {
  return (
    <Link
      href={href}
      className={`group relative inline-flex items-center gap-3 py-2 pl-5 pr-2 ${textSize} font-semibold uppercase tracking-wide transition-colors ${TEXT[variant]} ${className}`}
    >
      {/* Fond en parallelogramme (angles vifs, cotes inclines facon italique) */}
      <span
        aria-hidden="true"
        className={`absolute inset-0 -skew-x-12 transition-colors ${LAYER[variant]}`}
      />
      <span className="relative">{children}</span>
      <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-current">
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
