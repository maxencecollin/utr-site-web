"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const NAV = [
  { key: "courses", href: "#courses" },
  { key: "parcours", href: "#parcours" },
  { key: "patrimoine", href: "#patrimoine" },
  { key: "village", href: "#village" },
  { key: "benevoles", href: "#benevoles" },
  { key: "partenaires", href: "#partenaires" },
] as const;

export default function MobileMenu() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Ferme avec Echap
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const switchLocale = (next: string) => {
    setOpen(false);
    if (next !== locale) router.replace(pathname, { locale: next });
  };

  return (
    <div className="md:hidden">
      {/* Bouton burger / croix */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={open}
        className="relative z-10 flex h-10 w-10 items-center justify-center text-white"
      >
        <span className="relative block h-4 w-6">
          <span
            className={`absolute left-0 block h-0.5 w-6 bg-current transition-all duration-300 ${
              open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
            }`}
          />
          <span
            className={`absolute left-0 top-1/2 block h-0.5 w-6 -translate-y-1/2 bg-current transition-opacity duration-200 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute left-0 block h-0.5 w-6 bg-current transition-all duration-300 ${
              open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
            }`}
          />
        </span>
      </button>

      {/* Panneau deroulant (descend du header) */}
      <div
        className={`absolute inset-x-0 top-full overflow-hidden bg-ria-900 text-white shadow-[0_12px_24px_#00000040] transition-[max-height,opacity] duration-300 ${
          open ? "max-h-[85vh] opacity-100" : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col px-6 py-4">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-white/10 py-3 text-lg font-bold italic uppercase tracking-wide text-white transition-colors hover:text-ria-200"
            >
              {t(item.key)}
            </a>
          ))}

          {/* CTA S'inscrire (parallelogramme degrade) */}
          <a
            href="#inscription"
            onClick={() => setOpen(false)}
            className="group relative mt-5 inline-flex items-center justify-center self-start px-6 py-3 text-sm font-bold italic uppercase text-white"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 -skew-x-12 bg-[linear-gradient(90deg,#0781dd_0%,#04416f_100%)]"
            />
            <span className="relative">{t("inscrire")}</span>
          </a>

          {/* Selecteur de langue */}
          <div className="mt-5 flex items-center gap-3 text-base font-semibold uppercase">
            <span aria-hidden="true" className="text-white/50">
              /
            </span>
            {routing.locales.map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => switchLocale(lang)}
                className={
                  lang === locale
                    ? "text-white"
                    : "text-white/55 transition-colors hover:text-white"
                }
              >
                {lang}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}
