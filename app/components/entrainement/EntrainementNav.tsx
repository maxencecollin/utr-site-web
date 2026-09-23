"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { useTranslations } from "next-intl";

/* Les cinq parties de la page, dans l'ordre ou elles apparaissent */
const SECTIONS = [
  { id: "coach", labelKey: "navCoach" },
  { id: "ravitos", labelKey: "navRavitos" },
  { id: "nutrition", labelKey: "navNutrition" },
  { id: "materiel", labelKey: "navMateriel" },
  { id: "regles", labelKey: "navRegles" },
] as const;

/*
  Barre d'onglets de la page, collee sous le header pendant le defilement
  (retour de l'asso) : pastilles en parallelogramme, l'onglet de la partie en
  cours est rempli. Sur mobile, une seule ligne qui defile horizontalement.
*/
export default function EntrainementNav() {
  const t = useTranslations("entrainementPage");
  const navRef = useRef<HTMLElement>(null);
  const listeRef = useRef<HTMLUListElement>(null);
  const [actif, setActif] = useState<string | null>(null);

  // Hauteur occupee en haut de l'ecran par le header fixe et cette barre une
  // fois collee (sa position "top" + sa hauteur), qu'elle le soit deja ou non
  const decalage = () => {
    const nav = navRef.current;
    return nav ? parseFloat(getComputedStyle(nav).top) + nav.offsetHeight : 0;
  };

  useEffect(() => {
    const surScroll = () => {
      const seuil = decalage() + 8;
      let courant: string | null = null;
      for (const { id } of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= seuil) courant = id;
      }
      setActif(courant);
    };
    surScroll();
    window.addEventListener("scroll", surScroll, { passive: true });
    window.addEventListener("resize", surScroll);
    return () => {
      window.removeEventListener("scroll", surScroll);
      window.removeEventListener("resize", surScroll);
    };
  }, []);

  // Sur mobile, garde l'onglet actif visible dans la ligne qui defile
  useEffect(() => {
    const liste = listeRef.current;
    const lien = liste?.querySelector<HTMLElement>(`[data-onglet="${actif}"]`);
    if (!liste || !lien) return;
    const gauche = lien.offsetLeft - liste.offsetLeft - 24;
    liste.scrollTo({ left: gauche, behavior: "smooth" });
  }, [actif]);

  /* Saut vers une partie en tenant compte du header et de la barre collee.
     Sur grand ecran les ravitos s'epinglent en haut de l'ecran et leur marge
     haute degage deja la barre : on vise le tout debut de leur conteneur. */
  const aller = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    const epingle = id === "ravitos" && window.matchMedia("(min-width: 1024px)").matches;
    const cible = el.getBoundingClientRect().top + window.scrollY - (epingle ? 0 : decalage());
    window.scrollTo({ top: cible + 1, behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <>
      <div aria-hidden="true" className="h-10 bg-white lg:h-14" />
      <nav
        ref={navRef}
        aria-label={t("navAria")}
        className="sticky top-20 z-20 border-b border-dark-100 bg-white/95 backdrop-blur md:top-24"
      >
        <div className="mx-auto max-w-7xl lg:px-10">
          <ul
            ref={listeRef}
            className="flex items-center gap-3 overflow-x-auto px-6 py-2.5 [scrollbar-width:none] lg:flex-wrap lg:gap-4 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
          >
            {SECTIONS.map(({ id, labelKey }) => {
              const estActif = actif === id;
              return (
                <li key={id} className="shrink-0">
                  <a
                    href={`#${id}`}
                    data-onglet={id}
                    onClick={(e) => aller(e, id)}
                    aria-current={estActif ? "location" : undefined}
                    className={`group relative inline-block whitespace-nowrap px-4 py-1.5 text-[12px] font-bold uppercase italic tracking-wide transition-colors lg:px-5 lg:text-[14px] ${
                      estActif ? "text-white" : "text-dark-900 hover:text-white"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute inset-0 -skew-x-12 border border-dark-900 transition-colors ${
                        estActif ? "bg-dark-900" : "group-hover:bg-dark-900"
                      }`}
                    />
                    <span className="relative">{t(labelKey)}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
}
