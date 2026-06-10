import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// Interface / corps de texte : Inter
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Grand titre du hero : Comico (police de marque)
const comico = localFont({
  src: "./fonts/Comico-Regular.woff2",
  variable: "--font-comico",
  display: "swap",
});

// Gros titres de section + chiffres : Technor (police variable, axe 200->900)
const technor = localFont({
  src: "./fonts/Technor-Variable.woff2",
  variable: "--font-technor",
  weight: "200 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ultratourdelaria.fr"),
  title: {
    default: "Ultra Tour de la Ria d'Étel",
    template: "%s | Ultra Tour de la Ria d'Étel",
  },
  description:
    "La grande fête du trail nature autour de la Ria d'Étel, en Bretagne. Édition du 16 octobre 2027 : Ultra 80 km, Relais Duo et Trail 33 km en zone Natura 2000.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${comico.variable} ${technor.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
