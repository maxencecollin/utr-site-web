import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
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
    <html lang="fr" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
