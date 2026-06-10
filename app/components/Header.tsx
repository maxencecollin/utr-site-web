import Image from "next/image";
import Link from "next/link";
import ArrowButton from "./ArrowButton";

const LINKS = [
  { label: "Nos épreuves", href: "#courses" },
  { label: "Nos engagements", href: "#patrimoine" },
];

export default function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <Link href="#top" aria-label="Ultra Tour de la Ria d'Étel — accueil">
          <Image
            src="/images/logos/logo-etire-blanc.svg"
            alt="Ultra Tour de la Ria d'Étel"
            width={112}
            height={54}
            priority
          />
        </Link>

        <ul className="hidden items-center gap-8 text-xs font-bold uppercase tracking-widest text-white md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="transition-opacity hover:opacity-70">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <ArrowButton href="#inscription" variant="blue">
            S&apos;inscrire
          </ArrowButton>
          <button
            type="button"
            className="text-xs font-bold uppercase tracking-widest text-white/80 transition-opacity hover:opacity-100"
          >
            FR
          </button>
        </div>
      </nav>
    </header>
  );
}
