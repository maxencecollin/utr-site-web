"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { CHANTIER_CLE, CHANTIER_EMPREINTE } from "../chantier";

async function empreinte(texte: string) {
  const octets = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(texte));
  return Array.from(new Uint8Array(octets), (o) => o.toString(16).padStart(2, "0")).join("");
}

/*
  Rideau "site en construction". Present dans le HTML de chaque page et visible
  par defaut (donc aussi sans JavaScript) ; la regle CSS
  html[data-chantier="ouvert"] le masque une fois le mot de passe donne.
*/
export default function ChantierVoile() {
  const t = useTranslations("chantier");
  const [valeur, setValeur] = useState("");
  const [erreur, setErreur] = useState(false);

  const valider = async (e: FormEvent) => {
    e.preventDefault();
    if ((await empreinte(valeur.trim())) === CHANTIER_EMPREINTE) {
      try {
        localStorage.setItem(CHANTIER_CLE, CHANTIER_EMPREINTE);
      } catch {
        // Stockage bloque (navigation privee stricte) : le rideau se levera
        // quand meme pour cette page
      }
      document.documentElement.dataset.chantier = "ouvert";
    } else {
      setErreur(true);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="chantier-titre"
      className="chantier-voile fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-dark-900 px-6 py-10 text-white"
    >
      <Image
        src="/photos/img_2638-marin.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[50%_18%] opacity-40"
      />
      <div className="relative w-full max-w-md text-center">
        <Image
          src="/images/logos/logo-etire-blanc.svg"
          alt="Ultra Tour de la Ria d'Étel"
          width={116}
          height={56}
          className="mx-auto h-14 w-auto"
        />
        <h1 id="chantier-titre" className="headline mt-8 text-4xl leading-[1.1] sm:text-5xl">
          {t("titre")}
        </h1>
        <p className="mt-5 text-[16px] leading-[1.6] text-white/90">{t("texte")}</p>

        <form onSubmit={valider} className="mt-8">
          <label htmlFor="chantier-mdp" className="block text-[13px] font-semibold uppercase tracking-wide text-white/80">
            {t("label")}
          </label>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <input
              id="chantier-mdp"
              type="password"
              autoComplete="current-password"
              value={valeur}
              onChange={(e) => {
                setValeur(e.target.value);
                setErreur(false);
              }}
              aria-invalid={erreur}
              aria-describedby={erreur ? "chantier-erreur" : undefined}
              className="min-w-0 flex-1 border border-white/70 bg-white/10 px-4 py-2.5 text-[15px] text-white placeholder:text-white/50 focus:border-white focus:outline-none"
            />
            <button
              type="submit"
              className="relative px-6 py-2.5 text-[14px] font-bold uppercase italic text-white"
            >
              <span aria-hidden="true" className="absolute inset-0 -skew-x-12 bg-[linear-gradient(90deg,#0781dd_0%,#04416f_100%)]" />
              <span className="relative">{t("bouton")}</span>
            </button>
          </div>
          {erreur && (
            <p id="chantier-erreur" role="alert" className="mt-3 text-[14px] text-[#ffb4a8]">
              {t("erreur")}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
