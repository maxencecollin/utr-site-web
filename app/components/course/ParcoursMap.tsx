"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { LatLngBounds, Map as LeafletMap, Marker } from "leaflet";
import "leaflet/dist/leaflet.css";

type Poi = { label: string; lat: number; lon: number };

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
  /* Liste de chapitres cliquables (zoom anime sur chaque point, facon page Apple) */
  chapterLabels?: { overview: string; ravito: string };
  /* Legende posee sur la carte */
  legend?: ReactNode;
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
  chapterLabels,
  legend,
  className = "",
}: Props) {
  const container = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markersRef = useRef<Marker[]>([]);
  const boundsRef = useRef<LatLngBounds | null>(null);
  const [pois, setPois] = useState<Poi[]>([]);
  const [active, setActive] = useState(-1);

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
      mapRef.current = map;
      markersRef.current = [];

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
        boundsRef.current = line.getBounds();
        map.fitBounds(boundsRef.current, { padding: [28, 28] });
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
      const list: Poi[] = [];

      if (startLabel) {
        [...doc.querySelectorAll("wpt")].forEach((el) => {
          if (el.querySelector("name")?.textContent?.toLowerCase() !== "begin") return;
          const lat = Number(el.getAttribute("lat"));
          const lon = Number(el.getAttribute("lon"));
          if (!Number.isFinite(lat) || !Number.isFinite(lon) || !map) return;
          const marker = L.marker([lat, lon], { icon: startIcon, zIndexOffset: 100 })
            .addTo(map)
            .bindPopup(startLabel);
          markersRef.current.push(marker);
          list.push({ label: startLabel, lat, lon });
        });
      }

      const wptDoc = waypointsUrl ? await fetchGpx(waypointsUrl) : doc;
      if (cancelled || !map || !wptDoc) return;
      let numRavito = 0;
      [...wptDoc.querySelectorAll("wpt")].forEach((el) => {
        const name = el.querySelector("name")?.textContent ?? "";
        if (!markers.some((prefix) => name.toLowerCase().startsWith(prefix))) return;
        const lat = Number(el.getAttribute("lat"));
        const lon = Number(el.getAttribute("lon"));
        if (!Number.isFinite(lat) || !Number.isFinite(lon) || !map) return;
        if (points.length && distanceToTrace(lat, lon, points) > 200) return;
        const isRavito = name.toLowerCase().startsWith("ravitaillement");
        const label =
          isRavito && chapterLabels
            ? `${chapterLabels.ravito} ${++numRavito}`
            : name;
        const marker = L.marker([lat, lon], { icon: ravitoIcon })
          .addTo(map)
          .bindPopup(label);
        markersRef.current.push(marker);
        list.push({ label, lat, lon });
      });

      if (!cancelled) setPois(list);
    })();

    return () => {
      cancelled = true;
      mapRef.current = null;
      setPois([]);
      setActive(-1);
      map?.remove();
    };
    // markers/startLabel/chapterLabels : valeurs statiques passees en dur par les pages
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [traceUrl, waypointsUrl]);

  /* Zoom anime vers un point (ou retour a la vue d'ensemble pour index -1) */
  const goTo = (index: number) => {
    const map = mapRef.current;
    if (!map) return;
    setActive(index);
    map.closePopup();
    if (index === -1) {
      if (boundsRef.current) {
        map.flyToBounds(boundsRef.current, { padding: [28, 28], duration: 1.2 });
      }
      return;
    }
    const poi = pois[index];
    if (!poi) return;
    map.flyTo([poi.lat, poi.lon], 15, { duration: 1.3 });
    map.once("moveend", () => markersRef.current[index]?.openPopup());
  };

  const chipBase =
    "w-full border px-4 py-2.5 text-left text-[12px] font-semibold uppercase tracking-[1px] transition-colors";

  const mapNode = (
    <div className="relative min-w-0 flex-1">
      <div ref={container} className={`z-0 ${className}`} />
      {legend}
    </div>
  );

  if (!chapterLabels) return mapNode;

  return (
    <div className="lg:flex lg:items-stretch lg:gap-5">
      {/* Chapitres : zoom anime au clic (facon puces de la page produit Apple) */}
      <ul className="mb-4 flex flex-wrap content-start gap-2 lg:mb-0 lg:w-60 lg:shrink-0 lg:flex-col">
        <li>
          <button
            type="button"
            onClick={() => goTo(-1)}
            className={`${chipBase} ${
              active === -1
                ? "border-white bg-white text-[#1c1c1c]"
                : "border-white/50 bg-white/5 text-white hover:bg-white/15"
            }`}
          >
            {chapterLabels.overview}
          </button>
        </li>
        {pois.map((poi, i) => (
          <li key={`${poi.label}-${i}`}>
            <button
              type="button"
              onClick={() => goTo(i)}
              className={`${chipBase} ${
                active === i
                  ? "border-white bg-white text-[#1c1c1c]"
                  : "border-white/50 bg-white/5 text-white hover:bg-white/15"
              }`}
            >
              {poi.label}
            </button>
          </li>
        ))}
      </ul>
      {mapNode}
    </div>
  );
}
