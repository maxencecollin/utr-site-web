import type { Metadata } from "next";
import LegalLayout from "../components/LegalLayout";

export const metadata: Metadata = {
  title: "Conditions générales de vente — Ultra Tour de la Ria d'Étel",
  description:
    "Conditions générales de vente de l'Ultra Tour de la Ria d'Étel : inscriptions via Klikego, règlement, assurance.",
};

export default function CGV() {
  return (
    <LegalLayout title="Conditions générales de vente">
      <h2>Inscriptions via Klikego</h2>
      <p>
        Les inscriptions à l&apos;Ultra Tour de la Ria sont gérées exclusivement
        par la plateforme <strong>Klikego</strong>. En vous inscrivant à
        l&apos;événement, vous acceptez les conditions générales de vente de
        Klikego.
      </p>

      <div className="rounded-xl border border-ria-200 bg-ria-50 p-6">
        <p>
          Lors de votre inscription sur Klikego, vous aurez accès aux conditions
          générales de vente complètes qui régissent :
        </p>
        <ul className="mt-3">
          <li>Les modalités d&apos;inscription et de paiement</li>
          <li>Les conditions d&apos;annulation et de remboursement</li>
          <li>Le transfert de dossard</li>
          <li>La protection des données personnelles</li>
        </ul>
      </div>

      <h2>Règlement de l&apos;épreuve</h2>
      <p>
        En vous inscrivant à l&apos;Ultra Tour de la Ria, vous vous engagez
        également à respecter le{" "}
        <a
          href="/docs/Reglement_Ultra_Trail_Ria_2027.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          règlement de l&apos;épreuve
        </a>
        .
      </p>

      <h2>Contact</h2>
      <p>
        Pour toute question concernant votre inscription, vous pouvez contacter :
        <br />
        <br />
        <strong>Klikego</strong> : directement via leur plateforme pour les
        questions techniques liées à l&apos;inscription
        <br />
        <br />
        <strong>Association Ultra Tour de la Ria</strong> :{" "}
        <a href="mailto:contact@ultratourdelaria.fr">
          contact@ultratourdelaria.fr
        </a>{" "}
        pour les questions relatives à l&apos;événement
      </p>

      <h2>Assurance</h2>
      <p>
        L&apos;organisation de l&apos;Ultra Tour de la Ria est couverte par une
        assurance responsabilité civile. Les participants sont invités à vérifier
        leur propre couverture d&apos;assurance pour la pratique du trail running.
        Une licence FFA ou une assurance individuelle couvrant la pratique du
        trail est recommandée.
      </p>
    </LegalLayout>
  );
}
