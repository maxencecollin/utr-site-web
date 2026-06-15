"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

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

const UNITS: { key: keyof Parts; labelKey: string }[] = [
  { key: "jours", labelKey: "jours" },
  { key: "heures", labelKey: "heures" },
  { key: "minutes", labelKey: "min" },
  { key: "secondes", labelKey: "sec" },
];

export default function Countdown() {
  const t = useTranslations("countdown");
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
    <div className="inline-flex border border-white/80 shadow-[0_3px_6px_#00000029]">
      {UNITS.map(({ key, labelKey }) => (
        <div
          key={key}
          className="flex min-w-[4.25rem] flex-col items-center justify-center border-l border-white/20 px-3 py-2.5 first:border-l-0"
        >
          <span className="text-[0.6rem] font-semibold uppercase tracking-wide text-white/80">
            {t(labelKey)}
          </span>
          <span className="chiffre text-[2rem] leading-none text-white">
            {parts ? String(parts[key]).padStart(2, "0") : "--"}
          </span>
        </div>
      ))}
    </div>
  );
}
