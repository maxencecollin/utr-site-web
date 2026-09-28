"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

type Props = {
  /* Identifiant de l'itineraire public Strava (strava.com/routes/<id>) */
  routeId: string;
  className?: string;
};

const EMBED_SCRIPT = "https://strava-embeds.com/embed.js";

/*
  Carte Strava officielle (embed d'itineraire) : le script strava-embeds.com
  remplace le placeholder par la carte + profil d'elevation.

  La carte garde pour elle la molette (zoom) : sans protection, le defilement
  de la page se bloquait des que le pointeur passait dessus. Un calque la
  couvre donc tant qu'on ne clique pas dessus, et revient quand on la quitte.
*/
export default function StravaRoute({ routeId, className = "" }: Props) {
  const t = useTranslations("course");
  const [active, setActive] = useState(false);

  useEffect(() => {
    // Le script scanne les placeholders au chargement ; on le (re)charge a chaque montage
    const script = document.createElement("script");
    script.src = EMBED_SCRIPT;
    script.async = true;
    document.body.appendChild(script);
    return () => {
      script.remove();
    };
  }, [routeId]);

  return (
    <div className={`group relative ${className}`} onMouseLeave={() => setActive(false)}>
      <div
        className="strava-embed-placeholder"
        data-embed-type="route"
        data-embed-id={routeId}
        data-style="standard"
        data-full-width="true"
      />
      {!active && (
        <button
          type="button"
          onClick={() => setActive(true)}
          className="absolute inset-0 z-10 flex cursor-pointer items-end justify-center pb-6"
        >
          <span className="rounded-full bg-dark-900/80 px-4 py-2 text-[13px] font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100 [@media(hover:none)]:opacity-100">
            {t("stravaActiver")}
          </span>
        </button>
      )}
    </div>
  );
}
