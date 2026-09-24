"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LanguageSelector from "./LanguageSelector";
import MobileMenu from "./MobileMenu";
import { HEADER_LINKS } from "./navLinks";

/* Hauteur de scroll a partir de laquelle le header prend son fond opaque */
const SCROLL_THRESHOLD = 24;

type Props = {
  /* Logo couleur (texte fonce, "RIA" en bleu) tant que le header est transparent :
     pour les heros a ciel clair (page Environnement). Blanc une fois le fond noir. */
  logoFonce?: boolean;
};

export default function Header({ logoFonce = false }: Props) {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll(); // etat correct si la page est rechargee deja defilee
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 transition-colors duration-300 ${
        scrolled ? "bg-dark-900 shadow-[0_2px_16px_#00000040]" : "bg-transparent"
      }`}
    >
      {/* Barre noire plus fine une fois le hero depasse : 76 px au lieu de 96
          (60 au lieu de 80 sur mobile) */}
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between px-4 transition-[padding] duration-300 sm:px-6 lg:px-10 ${
          scrolled ? "py-2.5" : "py-5"
        }`}
      >
        <Link href="/" aria-label="Ultra Tour de la Ria d'Étel — accueil">
          <Image
            src={logoFonce && !scrolled ? "/images/logos/logo-principal-couleur.svg" : "/images/logos/logo-etire-blanc.svg"}
            alt="Ultra Tour de la Ria d'Étel"
            width={116}
            height={56}
            priority
            className="h-9 w-auto md:h-14"
          />
        </Link>

        <div className="flex items-center gap-3 md:gap-6 lg:gap-8">
          <ul className="hidden items-center gap-8 text-sm font-bold italic uppercase text-white lg:flex">
            {HEADER_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-opacity hover:opacity-70">
                  {t(link.key)}
                </Link>
              </li>
            ))}
          </ul>

          {/* S'inscrire : degrade bleu en parallelogramme (toujours visible, compact sur mobile) */}
          <a
            href="#inscription"
            className="group relative px-4 py-2 text-xs font-bold italic uppercase text-white md:px-7 md:py-2 md:text-[18px] md:leading-7"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 -skew-x-12 bg-[linear-gradient(90deg,#0781dd_0%,#04416f_100%)] transition-opacity group-hover:opacity-90"
            />
            <span className="relative">{t("inscrire")}</span>
          </a>

          {/* Selecteur de langue (desktop ; sur mobile il est dans le menu) */}
          <div className="hidden lg:block">
            <LanguageSelector />
          </div>

          {/* Menu burger (mobile uniquement) */}
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}
