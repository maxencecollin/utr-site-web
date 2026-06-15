import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import LegalLayout from "@/app/components/LegalLayout";

export const metadata: Metadata = {
  title: "Mentions légales — Ultra Tour de la Ria d'Étel",
  description:
    "Mentions légales du site de l'Ultra Tour de la Ria d'Étel : éditeur, hébergement, propriété intellectuelle.",
};

export default async function MentionsLegales({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <LegalLayout title="Mentions légales">
      <h2>Éditeur du site</h2>
      <p>Le site Ultra Tour de la Ria est édité par :</p>
      <ul>
        <li>
          <strong>Nom légal :</strong> Association ULTRA TRAIL DE LA RIA
          (Association déclarée)
        </li>
        <li>
          <strong>Numéro RNA :</strong> W561014176
        </li>
        <li>
          <strong>Numéro SIRET :</strong> 100 445 485 00012
        </li>
        <li>
          <strong>Siège social :</strong> 11 rue de l&apos;Éolienne, 56510
          Saint-Pierre-Quiberon
        </li>
        <li>
          <strong>Activité principale :</strong> Organisation d&apos;événements
          et activités de clubs de sports (Code APE 93.12Z). L&apos;association a
          pour but la création et la gestion d&apos;événements sportifs nature
          pour valoriser le patrimoine de la Ria d&apos;Étel.
        </li>
        <li>
          <strong>Responsable de la publication :</strong> Maxence COLLIN
        </li>
        <li>
          <strong>Email :</strong>{" "}
          <a href="mailto:contact@ultratourdelaria.fr">
            contact@ultratourdelaria.fr
          </a>
        </li>
      </ul>

      <h2>Hébergement</h2>
      <p>
        Ce site est hébergé par GitHub Pages, un service de GitHub Inc.
        <br />
        <strong>Adresse :</strong> 88 Colin P Kelly Jr St, San Francisco, CA
        94107, États-Unis
        <br />
        <strong>Site web :</strong>{" "}
        <a
          href="https://pages.github.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          pages.github.com
        </a>
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble du contenu de ce site (textes, images, vidéos, logos,
        etc.) est la propriété exclusive de l&apos;association Ultra Tour de la
        Ria, sauf mention contraire. Toute reproduction, représentation,
        modification, publication ou adaptation de tout ou partie des éléments du
        site est interdite sans l&apos;autorisation écrite préalable de
        l&apos;association.
      </p>

      <h2>Crédits photos</h2>
      <p>
        Les photographies présentes sur ce site sont la propriété de
        l&apos;association Ultra Tour de la Ria ou utilisées avec
        l&apos;autorisation de leurs auteurs respectifs.
      </p>

      <h2>Limitation de responsabilité</h2>
      <p>
        L&apos;association Ultra Tour de la Ria s&apos;efforce d&apos;assurer
        l&apos;exactitude et la mise à jour des informations diffusées sur ce
        site. Toutefois, elle ne peut garantir l&apos;exactitude, la précision ou
        l&apos;exhaustivité des informations mises à disposition. En conséquence,
        l&apos;association décline toute responsabilité pour toute imprécision,
        inexactitude ou omission portant sur des informations disponibles sur ce
        site.
      </p>

      <h2>Contact</h2>
      <p>
        Pour toute question concernant le site ou l&apos;événement, vous pouvez
        nous contacter à l&apos;adresse :{" "}
        <a href="mailto:contact@ultratourdelaria.fr">
          contact@ultratourdelaria.fr
        </a>
      </p>
    </LegalLayout>
  );
}
