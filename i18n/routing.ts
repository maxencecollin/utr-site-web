import { defineRouting } from "next-intl/routing";

// Trois langues, francais par defaut. URLs toujours prefixees (/fr, /en, /es) :
// structure identique en export statique (GitHub Pages) et plus tard sur serveur.
export const routing = defineRouting({
  locales: ["fr", "en", "es"],
  defaultLocale: "fr",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
