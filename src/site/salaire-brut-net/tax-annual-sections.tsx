import Image from "next/image";
import Link from "next/link";
import { Page1650InfoIcon } from "@/site/salaire-net-brut/page-1650-icons";
import {
  GROSS_TO_NET_TAX_CALCULATOR_LABEL,
  GROSS_TO_NET_TAX_H2,
  GROSS_TO_NET_TAX_SECTION_ID,
  buildGrossToNetAnnualCopy,
  buildGrossToNetTaxParagraphs,
  splitGrossToNetTaxCalculatorParagraph,
} from "./content";
import type { GrossToNetEstimate } from "./data";

type ProfileEstimates = {
  nonExecutive: GrossToNetEstimate;
  executive: GrossToNetEstimate;
  publicService: GrossToNetEstimate;
};

export function GrossToNetTaxSection({ titleId }: { titleId: string }) {
  const paragraphs = buildGrossToNetTaxParagraphs();
  const calculatorParts = splitGrossToNetTaxCalculatorParagraph(paragraphs[2]);

  return (
    <section
      id={GROSS_TO_NET_TAX_SECTION_ID}
      className="net-gross-1650__section"
      aria-labelledby={titleId}
    >
      <h2 id={titleId} className="net-gross-1500__h2">
        {GROSS_TO_NET_TAX_H2}
      </h2>
      <div className="net-gross-1650__info">
        <span className="net-gross-1650__info-icon" aria-hidden="true">
          <Page1650InfoIcon />
        </span>
        <div className="net-gross-1650__info-copy">
          <p>{paragraphs[0]}</p>
          <p>{paragraphs[1]}</p>
          <p>
            {calculatorParts ? (
              <>
                {calculatorParts.before}
                <Link href="/">{GROSS_TO_NET_TAX_CALCULATOR_LABEL}</Link>
                {calculatorParts.after}
              </>
            ) : (
              paragraphs[2]
            )}
          </p>
        </div>
      </div>
    </section>
  );
}

export function GrossToNetAnnualSection({
  grossMonthly,
  estimates,
  titleId,
}: {
  grossMonthly: number;
  estimates: ProfileEstimates;
  titleId: string;
}) {
  const copy = buildGrossToNetAnnualCopy(grossMonthly, estimates);

  return (
    <section
      id={copy.sectionId}
      className="net-gross-1650__section"
      aria-labelledby={titleId}
    >
      <h2 id={titleId} className="net-gross-1500__h2">
        {copy.h2}
      </h2>
      {copy.paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 48)}>{paragraph}</p>
      ))}
      <div className="net-gross-1650__annual-panel">
        <article className="net-gross-1650__annual-card">
          <span className="net-gross-1650__annual-icon" aria-hidden="true">
            <Image
              src="/images/calculator/pictogram-coins-clean.webp"
              alt=""
              width={214}
              height={184}
              decoding="async"
            />
          </span>
          <div className="net-gross-1650__annual-copy">
            <p className="net-gross-1650__annual-label">{copy.grossCard.label}</p>
            <p className="net-gross-1650__annual-value">{copy.grossCard.value}</p>
            <p className="net-gross-1650__annual-hint">{copy.grossCard.hint}</p>
          </div>
        </article>
        <article className="net-gross-1650__annual-card">
          <span className="net-gross-1650__annual-icon" aria-hidden="true">
            <Image
              src="/images/calculator/pictogram-calendar-clean.webp"
              alt=""
              width={190}
              height={194}
              decoding="async"
            />
          </span>
          <div className="net-gross-1650__annual-copy">
            <p className="net-gross-1650__annual-label">{copy.netCard.label}</p>
            <p className="net-gross-1650__annual-value">{copy.netCard.value}</p>
            <p className="net-gross-1650__annual-hint">{copy.netCard.hint}</p>
          </div>
        </article>
      </div>
    </section>
  );
}
