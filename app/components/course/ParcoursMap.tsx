"use client";

import { useEffect, useRef } from "react";
import type { Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";

type Props = {
  /* GPX du parcours : trace (<trkpt>/<rtept>) + waypoints (<wpt>) */
  traceUrl: string;
  /* GPX contenant les waypoints (ravitos...) si different de la trace
     (ex. 33 km : ravitos du GPX 80, filtres par proximite avec la trace) */
  waypointsUrl?: string;
  /* Prefixes (en minuscules) des noms de waypoints a afficher en marqueurs.
     Les autres (commissaires, secours...) restent hors carte publique. */
  markers?: string[];
  /* Libelle du marqueur depart/arrivee (waypoint "Begin") ; omis = pas de marqueur */
  startLabel?: string;
  className?: string;
};

/* Distance approximative (m) entre un point et la trace */
function distanceToTrace(lat: number, lon: number, trace: [number, number][]) {
  const cos = Math.cos((lat * Math.PI) / 180);
  let min = Infinity;
  for (const [tlat, tlon] of trace) {
    const dLat = (tlat - lat) * 111320;
    const dLon = (tlon - lon) * 111320 * cos;
    const d = dLat * dLat + dLon * dLon;
    if (d < min) min = d;
  }
  return Math.sqrt(min);
}

/* Pin des marqueurs (dessine en SVG, comme la maquette) : vert ravito, orange depart */
const pinSvg = (color: string) => `
<svg width="30" height="40" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg">
  <path d="M15 0C6.7 0 0 6.7 0 15c0 10.5 15 25 15 25s15-14.5 15-25C30 6.7 23.3 0 15 0z" fill="${color}"/>
  <circle cx="15" cy="14.5" r="6" fill="#ffffff"/>
</svg>`;

export default function ParcoursMap({
  traceUrl,
  waypointsUrl,
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

      const fetchGpx = async (url: string) => {
        try {
          const res = await fetch(url);
          if (!res.ok) return null;
          return new DOMParser().parseFromString(await res.text(), "application/xml");
        } catch {
          return null;
        }
      };

      const doc = await fetchGpx(traceUrl);
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

      // Marqueurs : ravitaillements (verts) + depart/arrivee (orange).
      // Le depart vient toujours du GPX de la trace ; les autres marqueurs
      // peuvent venir d'un GPX distinct, filtres par proximite avec la trace
      // (ecarte les points des autres courses).
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

      if (startLabel) {
        [...doc.querySelectorAll("wpt")].forEach((el) => {
          if (el.querySelector("name")?.textContent?.toLowerCase() !== "begin") return;
          const lat = Number(el.getAttribute("lat"));
          const lon = Number(el.getAttribute("lon"));
          if (!Number.isFinite(lat) || !Number.isFinite(lon) || !map) return;
          L.marker([lat, lon], { icon: startIcon, zIndexOffset: 100 })
            .addTo(map)
            .bindPopup(startLabel);
        });
      }

      const wptDoc = waypointsUrl ? await fetchGpx(waypointsUrl) : doc;
      if (cancelled || !map || !wptDoc) return;
      [...wptDoc.querySelectorAll("wpt")].forEach((el) => {
        const name = el.querySelector("name")?.textContent ?? "";
        if (!markers.some((prefix) => name.toLowerCase().startsWith(prefix))) return;
        const lat = Number(el.getAttribute("lat"));
        const lon = Number(el.getAttribute("lon"));
        if (!Number.isFinite(lat) || !Number.isFinite(lon) || !map) return;
        if (points.length && distanceToTrace(lat, lon, points) > 200) return;
        L.marker([lat, lon], { icon: ravitoIcon }).addTo(map).bindPopup(name);
      });
    })();

    return () => {
      cancelled = true;
      map?.remove();
    };
    // markers/startLabel : valeurs statiques passees en dur par les pages
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [traceUrl, waypointsUrl]);

  return <div ref={container} className={`z-0 ${className}`} />;
}
