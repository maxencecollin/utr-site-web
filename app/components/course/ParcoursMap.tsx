"use client";

import { useEffect, useRef } from "react";
import type { Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";

type Props = {
  /* GPX du parcours : trace (<trkpt>/<rtept>) + waypoints (<wpt>) */
  traceUrl: string;
  /* Prefixes (en minuscules) des noms de waypoints a afficher en marqueurs.
     Les autres (commissaires, secours...) restent hors carte publique. */
  markers?: string[];
  /* Libelle du marqueur depart/arrivee (waypoint "Begin") ; omis = pas de marqueur */
  startLabel?: string;
  className?: string;
};

/* Pin des marqueurs (dessine en SVG, comme la maquette) : vert ravito, orange depart */
const pinSvg = (color: string) => `
<svg width="30" height="40" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg">
  <path d="M15 0C6.7 0 0 6.7 0 15c0 10.5 15 25 15 25s15-14.5 15-25C30 6.7 23.3 0 15 0z" fill="${color}"/>
  <circle cx="15" cy="14.5" r="6" fill="#ffffff"/>
</svg>`;

export default function ParcoursMap({
  traceUrl,
  markers = ["ravitaillement"],
  startLabel,
  className = "",
}: Props) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let map: LeafletMap | undefined;
    let cancelled = false;

    (async () => {
      // Leaflet manipule window : import cote client uniquement
      const L = (await import("leaflet")).default;
      if (cancelled || !container.current) return;

      map = L.map(container.current, {
        scrollWheelZoom: false,
        center: [47.69, -3.14], // Ria d'Etel
        zoom: 12,
      });

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      let doc: Document | null = null;
      try {
        const res = await fetch(traceUrl);
        if (res.ok) {
          doc = new DOMParser().parseFromString(await res.text(), "application/xml");
        }
      } catch {
        doc = null;
      }
      if (cancelled || !map || !doc) return;

      // Trace du parcours
      const points = [...doc.querySelectorAll("rtept, trkpt")]
        .map((el) => [Number(el.getAttribute("lat")), Number(el.getAttribute("lon"))])
        .filter(([lat, lon]) => Number.isFinite(lat) && Number.isFinite(lon)) as [
        number,
        number,
      ][];
      if (points.length) {
        const line = L.polyline(points, {
          color: "#d9822b",
          weight: 4,
        }).addTo(map);
        map.fitBounds(line.getBounds(), { padding: [28, 28] });
      }

      // Marqueurs : ravitaillements (verts) + depart/arrivee (orange)
      const makeIcon = (color: string) =>
        L.divIcon({
          html: pinSvg(color),
          className: "", // pas de style Leaflet par defaut
          iconSize: [30, 40],
          iconAnchor: [15, 40],
          popupAnchor: [0, -40],
        });
      const ravitoIcon = makeIcon("#3ba55d");
      const startIcon = makeIcon("#d9822b");
      [...doc.querySelectorAll("wpt")].forEach((el) => {
        const name = el.querySelector("name")?.textContent ?? "";
        const lat = Number(el.getAttribute("lat"));
        const lon = Number(el.getAttribute("lon"));
        if (!Number.isFinite(lat) || !Number.isFinite(lon) || !map) return;
        if (markers.some((prefix) => name.toLowerCase().startsWith(prefix))) {
          L.marker([lat, lon], { icon: ravitoIcon }).addTo(map).bindPopup(name);
        } else if (startLabel && name.toLowerCase() === "begin") {
          L.marker([lat, lon], { icon: startIcon, zIndexOffset: 100 })
            .addTo(map)
            .bindPopup(startLabel);
        }
      });
    })();

    return () => {
      cancelled = true;
      map?.remove();
    };
    // markers : liste statique passee en dur par les pages (pas de re-render attendu)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [traceUrl]);

  return <div ref={container} className={`z-0 ${className}`} />;
}
