import type { MetadataRoute } from "next";
import { CHANTIER_ACTIF } from "./chantier";

// Genere a l'export statique
export const dynamic = "force-static";

/* Tant que le site est en construction, les moteurs sont tenus a l'ecart */
export default function robots(): MetadataRoute.Robots {
  return CHANTIER_ACTIF
    ? { rules: { userAgent: "*", disallow: "/" } }
    : { rules: { userAgent: "*", allow: "/" } };
}
