import Image from "next/image";
import Link from "next/link";
import type { NetToGrossEstimate } from "./data";
import {
  COTISATIONS_GUIDE_HREF,
  PAGE_1650_ANNUAL_H2,
  PAGE_1650_ANNUAL_SECTION_ID,
  PAGE_1650_HOW_TO_H2,
  PAGE_1650_HOW_TO_SECTION_ID,
  PAGE_1650_END_CTA_H2,
  PAGE_1650_END_CTA_HREF,
  PAGE_1650_END_CTA_LINK_LABEL,
  PAGE_1650_END_CTA_TEXT,
  PAGE_1650_TAX_H2,
  PAGE_1650_TAX_SECTION_ID,
  build1650AnnualFigures,
  build1650ConversionExample,
} from "./page-1650";
import { Page1650InfoIcon } from "./page-1650-icons";

type ProfileEstimates = {
  nonExecutive: NetToGrossEstimate;
  executive: NetToGrossEstimate;
  publicService: NetToGrossEstimate;
};

export function Page1650PedagogySections({ estimates }: { estimates: ProfileEstimates }) {
  const example = build1650ConversionExample();
  const annual = build1650AnnualFigures(estimates);

  return (
    <>
      <section
        id={PAGE_1650_HOW_TO_SECTION_ID}
        className="net-gross-1650__section"
        aria-labelledby="net-gross-1650-how-to-title"
      >
        <h2 id="net-gross-1650-how-to-title" className="net-gross-1500__h2">
          {PAGE_1650_HOW_TO_H2}
        </h2>
        <p>
          Le simulateur convertit le net en brut en divisant le salaire net par un coefficient propre
          à chaque statut. Ces coefficients sont des hypothèses de calcul du site, pas des taux
          légaux universels : {example.nonExecutiveCoefficientLabel} pour un non-cadre,{" "}
          {example.executiveCoefficientLabel} pour un cadre et {example.publicCoefficientLabel} pour
          la fonction publique.
        </p>
        <div className="net-gross-1650__formula">
          <p className="net-gross-1650__formula-kicker">Exemple salarié non-cadre</p>
          <p className="net-gross-1650__formula-eq">
            {example.netMonthly.toLocaleString("fr-FR")} € ÷ {example.coefficientLabel}
          </p>
          <p className="net-gross-1650__formula-result">
            = {example.exactGrossLabel} brut par mois
          </p>
          <p className="net-gross-1650__formula-note">
            Soit environ {example.roundedGrossLabel} brut mensuels après arrondi.
          </p>
        </div>
        <p>
          Les cotisations salariales réelles varient selon la situation du salarié. Pour comprendre
          l&apos;écart entre brut et net, consultez le{" "}
          <Link href={COTISATIONS_GUIDE_HREF}>guide sur les cotisations salariales</Link>. Pour
          affiner le chiffre, utilisez le <Link href="/">calculateur principal brut vers net</Link>.
        </p>
      </section>

      <section
        id={PAGE_1650_ANNUAL_SECTION_ID}
        className="net-gross-1650__section"
        aria-labelledby="net-gross-1650-annual-title"
      >
        <h2 id="net-gross-1650-annual-title" className="net-gross-1500__h2">
          {PAGE_1650_ANNUAL_H2}
        </h2>
        <p>
          Avec {annual.salaryMonths} mensualités identiques : {annual.netMonthly.toLocaleString("fr-FR")}{" "}
          × {annual.salaryMonths} = {annual.netAnnualLabel} net par an avant prélèvement à la source.
          Pour un salarié non-cadre, le brut annuel estimé est d&apos;environ {annual.grossAnnualLabel},
          selon le calcul du site.
        </p>
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
              <p className="net-gross-1650__annual-label">Salaire net annuel</p>
              <p className="net-gross-1650__annual-value">{annual.netAnnualLabel}</p>
              <p className="net-gross-1650__annual-hint">Avant impôt, sur 12 mois</p>
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
              <p className="net-gross-1650__annual-label">Salaire brut annuel estimé</p>
              <p className="net-gross-1650__annual-value">{annual.grossAnnualLabel}</p>
              <p className="net-gross-1650__annual-hint">Exemple pour un salarié non-cadre</p>
            </div>
          </article>
        </div>
        <p className="net-gross-1650__muted">
          Ces montants supposent 12 mensualités identiques, sans 13e mois ni prime supplémentaire.
        </p>
      </section>

      <section
        id={PAGE_1650_TAX_SECTION_ID}
        className="net-gross-1650__section"
        aria-labelledby="net-gross-1650-tax-title"
      >
        <h2 id="net-gross-1650-tax-title" className="net-gross-1500__h2">
          {PAGE_1650_TAX_H2}
        </h2>
        <div className="net-gross-1650__info">
          <span className="net-gross-1650__info-icon" aria-hidden="true">
            <Page1650InfoIcon />
          </span>
          <div className="net-gross-1650__info-copy">
            <p>
              Les 1 650 € nets indiqués sur cette page correspondent au salaire net avant
              prélèvement à la source, c&apos;est-à-dire après les cotisations salariales, mais avant
              la retenue de l&apos;impôt sur le revenu.
            </p>
            <p>
              Le montant effectivement versé sur votre compte bancaire peut être inférieur selon
              votre taux de prélèvement à la source et votre situation fiscale.
            </p>
            <p>
              Pour estimer votre salaire après impôt, utilisez notre{" "}
              <Link href="/">calculateur brut-net</Link> et renseignez votre taux de prélèvement à
              la source.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export function Page1650EndCta() {
  return (
    <section className="net-gross-1650__end-cta" aria-labelledby="net-gross-1650-end-cta-title">
      <h2 id="net-gross-1650-end-cta-title" className="net-gross-1500__h2">
        {PAGE_1650_END_CTA_H2}
      </h2>
      <p>{PAGE_1650_END_CTA_TEXT}</p>
      <Link href={PAGE_1650_END_CTA_HREF} className="net-gross-1650__end-cta-link">
        {PAGE_1650_END_CTA_LINK_LABEL}
      </Link>
    </section>
  );
}
