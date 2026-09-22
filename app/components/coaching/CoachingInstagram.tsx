import Image from "next/image";
import { useTranslations } from "next-intl";

const PROFIL = "https://www.instagram.com/kervadovic/";

/*
  "Suis-moi sur Instagram".

  Les vignettes sont statiques : le site est exporte en statique et un vrai
  flux Instagram demanderait un service tiers et un jeton Meta a renouveler.
  Ce sont des photos de Ronan tirees de l'export de la graphiste, a remplacer
  par ses publications reelles.
*/
const VIGNETTES = ["/photos/insta-1.jpg", "/photos/insta-2.jpg", "/photos/insta-3.jpg"];

export default function CoachingInstagram() {
  const t = useTranslations("coaching");

  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
        {/* Glyphe Instagram dessine (aucun picto dans les assets) */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="mx-auto h-7 w-7 text-[#1c1c1c]"
          aria-hidden="true"
        >
          <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="4.6" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="17.6" cy="6.4" r="1.2" fill="currentColor" />
        </svg>

        <h2 className="titre mt-4 text-xl text-[#2c2c2c] sm:text-3xl">{t("instaTitre")}</h2>
        <p className="titre mt-1 text-lg text-[#2c2c2c] sm:text-2xl">{t("instaCompte")}</p>

        <ul className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
          {VIGNETTES.map((src) => (
            <li key={src}>
              <a
                href={PROFIL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("instaLien")}
                className="group relative block aspect-square overflow-hidden"
              >
                <Image
                  src={src}
                  alt={t("instaAlt")}
                  fill
                  sizes="(min-width: 640px) 30vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-dark-900/0 transition-colors duration-300 group-hover:bg-dark-900/25"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
