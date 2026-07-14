import type { ReactElement } from "react";
import { FicheDePaieZonesIllustration } from "./FicheDePaieZonesIllustration";

const ILLUSTRATIONS: Record<string, () => ReactElement> = {
  "fiche-de-paie-zones": FicheDePaieZonesIllustration,
};

export function GuideIllustration({ id, caption }: { id: string; caption?: string }) {
  const Illustration = ILLUSTRATIONS[id];

  if (!Illustration) {
    return (
      <figure className="guide-illustration">
        <div className="prose-figure__placeholder" aria-hidden="true">
          Illustration à venir : {id}
        </div>
        {caption && <figcaption>{caption}</figcaption>}
      </figure>
    );
  }

  return (
    <figure className="guide-illustration">
      <Illustration />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
