import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import LanguageSelector from "./LanguageSelector";
import MobileMenu from "./MobileMenu";

const LINKS = [
  { key: "epreuves", href: "#courses" },
  { key: "engagements", href: "#patrimoine" },
] as const;

export default function Header() {
  const t = useTranslations("nav");
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-10">
        <Link href="#top" aria-label="Ultra Tour de la Ria d'Étel — accueil">
          <Image
            src="/images/logos/logo-etire-blanc.svg"
            alt="Ultra Tour de la Ria d'Étel"
            width={116}
            height={56}
            priority
            className="h-9 w-auto md:h-14"
          />
        </Link>

        <div className="flex items-center gap-3 md:gap-6 lg:gap-8">
          <ul className="hidden items-center gap-6 text-sm font-bold italic uppercase text-white md:flex lg:gap-8">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-opacity hover:opacity-70">
                  {t(link.key)}
                </Link>
              </li>
            ))}
          </ul>

          {/* S'inscrire : degrade bleu en parallelogramme (toujours visible, compact sur mobile) */}
          <Link
            href="#inscription"
            className="group relative px-4 py-2 text-xs font-bold italic uppercase text-white md:px-5 md:py-2.5 md:text-sm"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 -skew-x-12 bg-[linear-gradient(90deg,#0781dd_0%,#04416f_100%)] transition-opacity group-hover:opacity-90"
            />
            <span className="relative">{t("inscrire")}</span>
          </Link>

          {/* Selecteur de langue (desktop ; sur mobile il est dans le menu) */}
          <div className="hidden md:block">
            <LanguageSelector />
          </div>

          {/* Menu burger (mobile uniquement) */}
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}
