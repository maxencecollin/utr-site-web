"use client";

import { useDefilementDoux } from "./useDefilementDoux";
import ProtoMateriel from "./ProtoMateriel";
import ProtoRavitos from "./ProtoRavitos";
import type { TraceSvg } from "./traceGpx";

/* Enchaine les deux prototypes, avec du texte avant/apres pour juger l'entree et la sortie */
function Pause({ texte }: { texte: string }) {
  return (
    <div className="flex h-[70vh] items-center justify-center bg-white px-6 text-center">
      <p className="titre max-w-xl text-2xl text-dark-400">{texte}</p>
    </div>
  );
}

export default function ProtoPage({ trace }: { trace: TraceSvg }) {
  useDefilementDoux();
  return (
    <main>
      <div className="flex h-[80vh] items-end bg-dark-900 px-6 pb-16 text-white lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <p className="font-comico text-[13px] uppercase tracking-[6px] text-white/60">Prototype</p>
          <h1 className="titre mt-2 text-4xl sm:text-6xl">Nouveau moteur d&apos;animation</h1>
          <p className="mt-4 max-w-2xl text-white/80">
            GSAP ScrollTrigger + Lenis. Défile à ton rythme : rien n&apos;est bloqué, et à l&apos;arrêt la vue
            s&apos;aimante doucement sur l&apos;élément le plus proche.
          </p>
        </div>
      </div>
      <Pause texte="1. L'animation du matériel, à l'identique, sur le nouveau moteur" />
      <ProtoMateriel />
      <Pause texte="2. Les ravitos : le tracé réel du 80 km se dessine au fil du défilement" />
      <ProtoRavitos trace={trace} />
      <Pause texte="Fin des prototypes" />
    </main>
  );
}
