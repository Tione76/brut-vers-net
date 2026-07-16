import type { ReactElement } from "react";
import { CalculSalaireNetEtapesIllustration } from "./CalculSalaireNetEtapesIllustration";
import { CalculSalaireNetSchemaIllustration } from "./CalculSalaireNetSchemaIllustration";
import { CotisationsSalarialesDestinationsIllustration } from "./CotisationsSalarialesDestinationsIllustration";
import { FicheDePaieZonesIllustration } from "./FicheDePaieZonesIllustration";
import { HeuresSupplementairesFichePaieIllustration } from "./HeuresSupplementairesFichePaieIllustration";
import { PrelevementSourceFichePaieIllustration } from "./PrelevementSourceFichePaieIllustration";
import { PrelevementSourceParcoursIllustration } from "./PrelevementSourceParcoursIllustration";

const ILLUSTRATIONS: Record<string, () => ReactElement> = {
  "fiche-de-paie-zones": FicheDePaieZonesIllustration,
  "calcul-salaire-net-schema": CalculSalaireNetSchemaIllustration,
  "calcul-salaire-net-etapes": CalculSalaireNetEtapesIllustration,
  "cotisations-salariales-destinations": CotisationsSalarialesDestinationsIllustration,
  "prelevement-source-fiche-paie": PrelevementSourceFichePaieIllustration,
  "prelevement-source-parcours": PrelevementSourceParcoursIllustration,
  "heures-supplementaires-fiche-paie": HeuresSupplementairesFichePaieIllustration,
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
