import Image from "next/image";
import Link from "next/link";
import Footer from "./Footer";

type Props = {
  title: string;
  children: React.ReactNode;
};

export default function LegalLayout({ title, children }: Props) {
  return (
    <>
      {/* En-tete simple : logo (retour accueil) + lien retour */}
      <header className="border-b border-dark-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <Link href="/" aria-label="Ultra Tour de la Ria d'Étel — accueil">
            <Image
              src="/images/logos/logo-etire-noir.svg"
              alt="Ultra Tour de la Ria d'Étel"
              width={116}
              height={56}
              priority
            />
          </Link>
          <Link
            href="/"
            className="text-sm font-bold italic uppercase text-dark-700 transition-opacity hover:opacity-70"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </header>

      <main className="bg-white">
        <div className="mx-auto max-w-3xl px-6 py-16 lg:py-20">
          <h1 className="titre text-4xl text-[#2c2c2c]">{title}</h1>
          <span className="mt-4 block h-[2px] w-24 bg-ria-500" />

          {/* Contenu : styles appliques aux elements enfants */}
          <div
            className="mt-10 space-y-5 leading-relaxed text-dark-700
              [&_a]:text-ria-500 [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-ria-600
              [&_h2]:mb-2 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:italic [&_h2]:uppercase [&_h2]:text-[#2c2c2c]
              [&_li]:mt-1 [&_strong]:font-semibold [&_strong]:text-dark-900
              [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6"
          >
            {children}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
