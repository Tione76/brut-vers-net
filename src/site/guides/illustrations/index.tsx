import type { ReactElement } from "react";
import { CalculSalaireNetEtapesIllustration } from "./CalculSalaireNetEtapesIllustration";
import { CalculSalaireNetSchemaIllustration } from "./CalculSalaireNetSchemaIllustration";
import { CotisationsSalarialesDestinationsIllustration } from "./CotisationsSalarialesDestinationsIllustration";
import { FicheDePaieZonesIllustration } from "./FicheDePaieZonesIllustration";
import { HeuresSupplementairesFichePaieIllustration } from "./HeuresSupplementairesFichePaieIllustration";
import { PrelevementSourceFichePaieIllustration } from "./PrelevementSourceFichePaieIllustration";
import { PrelevementSourceParcoursIllustration } from "./PrelevementSourceParcoursIllustration";
import { BonSalaireComfortMatrixIllustration } from "./BonSalaireComfortMatrixIllustration";
import { BonSalaireDistributionIllustration } from "./BonSalaireDistributionIllustration";
import { SalaireMoyenEvolutionIllustration } from "./SalaireMoyenEvolutionIllustration";
import { SmicDecadeNav } from "./SmicDecadeNav";
import { SmicHourlyStepChart } from "./SmicHourlyStepChart";
import { SmicInflationIllustration } from "./SmicInflationIllustration";
import { SmicTimelineIllustration } from "./SmicTimelineIllustration";
import { SmicYearJump } from "./SmicYearJump";

const ILLUSTRATIONS: Record<string, () => ReactElement> = {
  "bon-salaire-distribution-scale": BonSalaireDistributionIllustration,
  "bon-salaire-comfort-matrix": BonSalaireComfortMatrixIllustration,
  "fiche-de-paie-zones": FicheDePaieZonesIllustration,
  "calcul-salaire-net-schema": CalculSalaireNetSchemaIllustration,
  "calcul-salaire-net-etapes": CalculSalaireNetEtapesIllustration,
  "cotisations-salariales-destinations": CotisationsSalarialesDestinationsIllustration,
  "prelevement-source-fiche-paie": PrelevementSourceFichePaieIllustration,
  "prelevement-source-parcours": PrelevementSourceParcoursIllustration,
  "heures-supplementaires-fiche-paie": HeuresSupplementairesFichePaieIllustration,
  "salaire-moyen-evolution-eqtp": SalaireMoyenEvolutionIllustration,
  "smic-history-hourly-chart": SmicHourlyStepChart,
  "smic-history-inflation-chart": SmicInflationIllustration,
  "smic-history-decade-nav": SmicDecadeNav,
  "smic-history-year-jump": SmicYearJump,
  "smic-history-timeline": SmicTimelineIllustration,
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
