import type { Metadata } from "next";
import LegalLayout from "../components/LegalLayout";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Ultra Tour de la Ria d'Étel",
  description:
    "Politique de confidentialité de l'Ultra Tour de la Ria d'Étel : données collectées, cookies, droits RGPD.",
};

export default function Confidentialite() {
  return (
    <LegalLayout title="Politique de confidentialité">
      <p>
        L&apos;association Ultra Tour de la Ria accorde une grande importance à la
        protection de vos données personnelles. Cette politique de
        confidentialité vous informe sur la manière dont vos données sont
        collectées et utilisées.
      </p>

      <h2>Responsable du traitement</h2>
      <p>
        Le responsable du traitement des données est :
        <br />
        <strong>Association Ultra Tour de la Ria</strong>
        <br />
        11 rue de l&apos;Éolienne, 56510 Saint-Pierre-Quiberon
        <br />
        Email :{" "}
        <a href="mailto:contact@ultratourdelaria.fr">
          contact@ultratourdelaria.fr
        </a>
      </p>

      <h2>Données collectées sur ce site</h2>
      <p>
        Ce site vitrine ne collecte aucune donnée personnelle directement. Aucun
        formulaire de contact, aucune inscription à une newsletter et aucun
        cookie de suivi n&apos;est utilisé sur ce site.
      </p>

      <h2>Inscriptions à l&apos;événement</h2>
      <p>
        Les inscriptions à l&apos;Ultra Tour de la Ria sont gérées par la
        plateforme <strong>Klikego</strong>. Lorsque vous vous inscrivez à
        l&apos;événement, vos données personnelles sont collectées et traitées
        par Klikego conformément à leur propre politique de confidentialité. Nous
        vous invitons à consulter les conditions de Klikego lors de votre
        inscription.
        <br />
        <br />
        Les données d&apos;inscription transmises à l&apos;association Ultra Tour
        de la Ria sont utilisées uniquement pour l&apos;organisation de
        l&apos;événement : gestion des dossards, communication relative à la
        course, résultats, etc.
      </p>

      <h2>Cookies</h2>
      <p>
        Ce site n&apos;utilise pas de cookies de suivi ou de cookies
        publicitaires. Seuls des cookies techniques essentiels au fonctionnement
        du site peuvent être utilisés par l&apos;hébergeur (GitHub Pages).
      </p>

      <h2>Vos droits</h2>
      <p>
        Conformément au Règlement Général sur la Protection des Données (RGPD),
        vous disposez des droits suivants concernant vos données personnelles :
      </p>
      <ul>
        <li>Droit d&apos;accès à vos données</li>
        <li>Droit de rectification</li>
        <li>Droit à l&apos;effacement</li>
        <li>Droit à la limitation du traitement</li>
        <li>Droit à la portabilité des données</li>
        <li>Droit d&apos;opposition</li>
      </ul>
      <p>
        Pour exercer ces droits, vous pouvez nous contacter à l&apos;adresse :{" "}
        <a href="mailto:contact@ultratourdelaria.fr">
          contact@ultratourdelaria.fr
        </a>
      </p>

      <h2>Modification de la politique</h2>
      <p>
        Cette politique de confidentialité peut être modifiée à tout moment. La
        date de dernière mise à jour est indiquée ci-dessous.
        <br />
        <br />
        <strong>Dernière mise à jour :</strong> Janvier 2027
      </p>
    </LegalLayout>
  );
}
