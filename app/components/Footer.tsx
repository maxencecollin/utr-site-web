import Image from "next/image";
import Link from "next/link";

const NAV = [
  { label: "Nos courses", href: "#courses" },
  { label: "Le parcours", href: "#parcours" },
  { label: "Patrimoine", href: "#patrimoine" },
  { label: "Le village", href: "#village" },
  { label: "Bénévoles", href: "#benevoles" },
  { label: "Partenaires", href: "#partenaires" },
];

const LEGAL = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "CGV", href: "/cgv" },
  { label: "Confidentialité", href: "/confidentialite" },
];

export default function Footer() {
  return (
    <footer className="bg-ria-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          <div className="max-w-xs">
            <Image
              src="/images/logos/logo-etire-blanc.svg"
              alt="Ultra Tour de la Ria d'Étel"
              width={128}
              height={62}
            />
            <p className="mt-4 text-sm text-ria-200">
              La grande fête du trail nature autour de la Ria d&apos;Étel,
              en Bretagne. Édition du 16 octobre 2027.
            </p>
            <a
              href="mailto:contact@ultratourdelaria.fr"
              className="mt-4 inline-block text-sm font-semibold text-white underline-offset-4 hover:underline"
            >
              contact@ultratourdelaria.fr
            </a>
          </div>

          <nav className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-ria-100 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/15 pt-6 text-xs text-ria-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Association Ultra Trail de la Ria. Tous
            droits réservés.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {LEGAL.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
