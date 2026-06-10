export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-ria-900 px-6 py-24 text-center text-white">
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-ria-200">
        Ria d&apos;Étel · Bretagne
      </p>

      <h1 className="max-w-3xl font-display text-5xl leading-tight sm:text-7xl">
        Ultra Tour de la Ria d&apos;Étel
      </h1>

      <p className="mt-6 max-w-xl text-lg text-ria-100">
        La grande fête du trail nature autour de la Ria d&apos;Étel, en zone
        Natura 2000.
      </p>

      <div className="mt-10 inline-flex items-center gap-3 rounded-full border border-ria-400/40 bg-ria-800/60 px-6 py-3 text-sm font-medium">
        <span className="h-2 w-2 rounded-full bg-pinede-300" />
        Prochaine édition le 22 mai 2027
      </div>

      <dl className="mt-14 grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { nom: "Ultra", detail: "80 km" },
          { nom: "Relais Duo", detail: "80 km en duo" },
          { nom: "Trail", detail: "30 km" },
        ].map((epreuve) => (
          <div
            key={epreuve.nom}
            className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5"
          >
            <dt className="text-base font-semibold">{epreuve.nom}</dt>
            <dd className="mt-1 text-sm text-ria-200">{epreuve.detail}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-16 text-xs uppercase tracking-widest text-ria-300">
        Site en construction
      </p>
    </main>
  );
}
