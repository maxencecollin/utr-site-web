import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Police d'affichage / titres
const comico = localFont({
  src: "./fonts/Comico-Regular.woff2",
  variable: "--font-comico",
  display: "swap",
});

// Police de corps
const futura = localFont({
  src: [
    { path: "./fonts/Futura-Medium.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Futura-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-futura",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ultratourdelaria.fr"),
  title: {
    default: "Ultra Tour de la Ria d'Étel",
    template: "%s | Ultra Tour de la Ria d'Étel",
  },
  description:
    "La grande fête du trail nature autour de la Ria d'Étel, en Bretagne. Édition du 22 mai 2027 : Ultra 80 km, Relais Duo et Trail 30 km en zone Natura 2000.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${comico.variable} ${futura.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
