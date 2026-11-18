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
import { SmicEuropeCountryNav } from "./SmicEuropeCountryNav";
import { SmicEuropeTableLetterNav } from "./SmicEuropeTableLetterNav";
import { SoldeCongesCompteurIllustration } from "./SoldeCongesCompteurIllustration";
import { EpargneCombienIllustration } from "./EpargneCombienIllustration";
import { EpargneConfusionsIllustration } from "./EpargneConfusionsIllustration";
import { EpargneFriseIllustration } from "./EpargneFriseIllustration";
import { EpargneLivretsIllustration } from "./EpargneLivretsIllustration";
import { EpargneMargeIllustration } from "./EpargneMargeIllustration";
import { EpargneOrientationIllustration } from "./EpargneOrientationIllustration";
import { EpargnePlanIllustration } from "./EpargnePlanIllustration";
import { EpargneProvisionsIllustration } from "./EpargneProvisionsIllustration";
import { EpargneTroisCasIllustration } from "./EpargneTroisCasIllustration";

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
  "smic-europe-country-nav": SmicEuropeCountryNav,
  "smic-europe-table-letter-nav": SmicEuropeTableLetterNav,
  "solde-conges-lecture-compteur": SoldeCongesCompteurIllustration,
  "epargne-orientation": EpargneOrientationIllustration,
  "epargne-marge-mensuelle": EpargneMargeIllustration,
  "epargne-confusions": EpargneConfusionsIllustration,
  "epargne-provisions": EpargneProvisionsIllustration,
  "epargne-combien": EpargneCombienIllustration,
  "epargne-trois-cas": EpargneTroisCasIllustration,
  "epargne-frise": EpargneFriseIllustration,
  "epargne-livrets": EpargneLivretsIllustration,
  "epargne-plan": EpargnePlanIllustration,
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
