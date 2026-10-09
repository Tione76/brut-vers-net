import type { NetToGrossEstimate } from "./data";
import { formatNetShort } from "./data";
import {
  Page1650BriefcaseIcon,
  Page1650LandmarkIcon,
  Page1650UserIcon,
} from "./page-1650-icons";

const PROFILE_ICON = {
  nonExecutive: Page1650UserIcon,
  executive: Page1650BriefcaseIcon,
  publicService: Page1650LandmarkIcon,
} as const;

export function Page1650ResultCards({ cards }: { cards: NetToGrossEstimate[] }) {
  return (
    <div className="net-gross-1650__result-grid">
      {cards.map((estimate) => {
        const Icon = PROFILE_ICON[estimate.profile];
        return (
          <article key={estimate.profile} className="net-gross-1650__result-card">
            <header className="net-gross-1650__result-head">
              <span className="net-gross-1650__result-icon" aria-hidden="true">
                <Icon />
              </span>
              <h3 className="net-gross-1650__result-title">{estimate.profileLabel}</h3>
            </header>
            <p className="net-gross-1650__result-amount">
              {formatNetShort(Math.round(estimate.grossMonthly))}
            </p>
            <p className="net-gross-1650__result-caption">Brut mensuel estimé</p>
            <div className="net-gross-1650__result-annual">
              <p className="net-gross-1650__result-annual-value">
                {formatNetShort(Math.round(estimate.grossAnnual))} / an
              </p>
              <p className="net-gross-1650__result-annual-label">Brut annuel estimé</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
