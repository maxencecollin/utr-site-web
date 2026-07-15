"use client";

import { useEffect } from "react";

type Props = {
  /* Identifiant de l'itineraire public Strava (strava.com/routes/<id>) */
  routeId: string;
  className?: string;
};

const EMBED_SCRIPT = "https://strava-embeds.com/embed.js";

/*
  Carte Strava officielle (embed d'itineraire) : le script strava-embeds.com
  remplace le placeholder par la carte + profil d'elevation.
*/
export default function StravaRoute({ routeId, className = "" }: Props) {
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
    <div className={className}>
      <div
        className="strava-embed-placeholder"
        data-embed-type="route"
        data-embed-id={routeId}
        data-style="standard"
        data-full-width="true"
      />
    </div>
  );
}
