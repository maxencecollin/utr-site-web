import Image from "next/image";
import Link from "next/link";

const LINKS = [
  { label: "Nos épreuves", href: "#courses" },
  { label: "Nos engagements", href: "#patrimoine" },
];

export default function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <Link href="#top" aria-label="Ultra Tour de la Ria d'Étel — accueil">
          <Image
            src="/images/logos/logo-etire-blanc.svg"
            alt="Ultra Tour de la Ria d'Étel"
            width={116}
            height={56}
            priority
          />
        </Link>

        <div className="flex items-center gap-6 lg:gap-8">
          <ul className="hidden items-center gap-6 text-sm font-bold italic uppercase text-white md:flex lg:gap-8">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-opacity hover:opacity-70">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* S'inscrire : degrade bleu, Inter bold italic, sans fleche */}
          <Link
            href="#inscription"
            className="rounded-md bg-[linear-gradient(90deg,#0781dd_0%,#04416f_100%)] px-5 py-2.5 text-sm font-bold italic uppercase text-white transition-opacity hover:opacity-90"
          >
            S&apos;inscrire
          </Link>

          <button
            type="button"
            className="text-base font-semibold uppercase text-white/90 transition-opacity hover:opacity-100"
          >
            FR
          </button>
        </div>
      </nav>
    </header>
  );
}
