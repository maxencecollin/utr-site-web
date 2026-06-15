"use client";

import { useEffect, useRef, useState } from "react";

const LANGS = ["FR", "EN", "ES"];

export default function LanguageSelector() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("FR");
  const ref = useRef<HTMLDivElement>(null);

  // Ferme le menu au clic exterieur ou a la touche Echap
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1.5 text-base font-semibold uppercase text-white transition-opacity hover:opacity-80"
      >
        <span aria-hidden="true" className="text-white/90">
          /
        </span>
        {current}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-40 mt-3 min-w-[4.5rem] bg-dark-900/95 py-1 text-base font-semibold uppercase shadow-[0_6px_16px_#00000040] backdrop-blur-sm"
        >
          {LANGS.map((lang) => (
            <li key={lang} role="option" aria-selected={lang === current}>
              <button
                type="button"
                onClick={() => {
                  setCurrent(lang);
                  setOpen(false);
                }}
                className={`block w-full px-4 py-1.5 text-left transition-colors hover:bg-white/10 ${
                  lang === current ? "text-white" : "text-white/60 hover:text-white"
                }`}
              >
                {lang}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
