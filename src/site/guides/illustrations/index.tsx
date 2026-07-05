import type { GuideIllustrationId } from "../types";
import { AeFranchiseLimitsIllustration } from "./AeFranchiseLimitsIllustration";
import { AeInvoiceComparisonIllustration } from "./AeInvoiceComparisonIllustration";
import { AeVatStatusIllustration } from "./AeVatStatusIllustration";
import { CreditNoteIllustration } from "./CreditNoteIllustration";
import { ExampleInvoiceServiceIllustration } from "./ExampleInvoiceServiceIllustration";
import { FranchiseComparisonIllustration } from "./FranchiseComparisonIllustration";
import { FranchiseChecklistIllustration } from "./FranchiseChecklistIllustration";
import { FranchiseDecisionTreeIllustration } from "./FranchiseDecisionTreeIllustration";
import { FranchiseExitFlowIllustration } from "./FranchiseExitFlowIllustration";
import { FranchiseHowItWorksIllustration } from "./FranchiseHowItWorksIllustration";
import { FranchiseInvoiceAnnotatedIllustration } from "./FranchiseInvoiceAnnotatedIllustration";
import { FranchiseThresholdsIllustration } from "./FranchiseThresholdsIllustration";
import { InvoiceStructureIllustration } from "./InvoiceStructureIllustration";
import { VatCalculationIllustration } from "./VatCalculationIllustration";
import { VatDeclarationCycleIllustration } from "./VatDeclarationCycleIllustration";
import { VatFlowDiagramIllustration } from "./VatFlowDiagramIllustration";
import { VatNetBalanceIllustration } from "./VatNetBalanceIllustration";
import { VatB2bB2cIllustration } from "./VatB2bB2cIllustration";
import { VatInvoiceAnnotatedIllustration } from "./VatInvoiceAnnotatedIllustration";
import { VatMixedInvoiceIllustration } from "./VatMixedInvoiceIllustration";
import { VatRateSelectionIllustration } from "./VatRateSelectionIllustration";
import { VatRateTimelineIllustration } from "./VatRateTimelineIllustration";
import { VatRatesDomIllustration } from "./VatRatesDomIllustration";
import { VatRatesPyramidIllustration } from "./VatRatesPyramidIllustration";
import { VatTerritoryFlowIllustration } from "./VatTerritoryFlowIllustration";

const ILLUSTRATIONS: Record<GuideIllustrationId, React.ComponentType> = {
  "invoice-structure": InvoiceStructureIllustration,
  "example-invoice-service": ExampleInvoiceServiceIllustration,
  "vat-calculation": VatCalculationIllustration,
  "credit-note": CreditNoteIllustration,
  "vat-rates-pyramid": VatRatesPyramidIllustration,
  "vat-rates-dom": VatRatesDomIllustration,
  "vat-rate-selection": VatRateSelectionIllustration,
  "vat-invoice-annotated": VatInvoiceAnnotatedIllustration,
  "vat-territory-flow": VatTerritoryFlowIllustration,
  "vat-rate-timeline": VatRateTimelineIllustration,
  "vat-mixed-invoice": VatMixedInvoiceIllustration,
  "vat-b2b-b2c": VatB2bB2cIllustration,
  "franchise-thresholds": FranchiseThresholdsIllustration,
  "franchise-comparison": FranchiseComparisonIllustration,
  "franchise-exit-flow": FranchiseExitFlowIllustration,
  "franchise-how-it-works": FranchiseHowItWorksIllustration,
  "franchise-decision-tree": FranchiseDecisionTreeIllustration,
  "franchise-invoice-annotated": FranchiseInvoiceAnnotatedIllustration,
  "franchise-checklist": FranchiseChecklistIllustration,
  "ae-vat-status": AeVatStatusIllustration,
  "ae-franchise-limits": AeFranchiseLimitsIllustration,
  "ae-invoice-comparison": AeInvoiceComparisonIllustration,
  "vat-flow-diagram": VatFlowDiagramIllustration,
  "vat-net-balance": VatNetBalanceIllustration,
  "vat-declaration-cycle": VatDeclarationCycleIllustration,
};

export function GuideIllustration({ id, caption }: { id: GuideIllustrationId; caption?: string }) {
  const Component = ILLUSTRATIONS[id];
  return (
    <figure className="guide-illustration">
      <Component />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
