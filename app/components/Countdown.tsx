"use client";

import { useEffect, useState } from "react";

// Date de l'edition : 16 octobre 2027
const TARGET = new Date("2027-10-16T08:00:00+02:00").getTime();

type Parts = { jours: number; heures: number; minutes: number; secondes: number };

function computeParts(): Parts {
  const diff = Math.max(0, TARGET - Date.now());
  const totalSeconds = Math.floor(diff / 1000);
  return {
    jours: Math.floor(totalSeconds / 86400),
    heures: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    secondes: totalSeconds % 60,
  };
}

const UNITS: { key: keyof Parts; label: string }[] = [
  { key: "jours", label: "Jours" },
  { key: "heures", label: "Heures" },
  { key: "minutes", label: "Min" },
  { key: "secondes", label: "Sec" },
];

export default function Countdown() {
  // Valeur initiale nulle pour eviter un decalage d'hydratation (SSG)
  const [parts, setParts] = useState<Parts | null>(null);

  useEffect(() => {
    const tick = () => setParts(computeParts());
    // Premier calcul differe hors du corps de l'effet (evite le setState synchrone)
    const raf = requestAnimationFrame(tick);
    const id = setInterval(tick, 1000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(id);
    };
  }, []);

  return (
    <div className="flex items-end gap-3 sm:gap-4">
      {UNITS.map(({ key, label }) => (
        <div key={key} className="text-center">
          <div className="min-w-[3rem] rounded-md border border-white/25 bg-black/25 px-3 py-2 backdrop-blur-sm sm:min-w-[3.5rem]">
            <span className="titre block text-2xl text-white sm:text-3xl">
              {parts ? String(parts[key]).padStart(2, "0") : "--"}
            </span>
          </div>
          <span className="mt-1.5 block text-[0.6rem] font-semibold uppercase tracking-widest text-white/70">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
