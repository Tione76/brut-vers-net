import Image from "next/image";
import Link from "next/link";
import type { NetToGrossEstimate } from "./data";
import {
  COTISATIONS_GUIDE_HREF,
  PAGE_1650_END_CTA_H2,
  PAGE_1650_END_CTA_LINK_LABEL,
  PAGE_1650_END_CTA_TEXT,
  PAGE_1650_TAX_SECTION_ID,
  buildRedesignAnnualFigures,
  buildRedesignAnnualH2,
  buildRedesignConversionExample,
  buildRedesignEndCtaHref,
  buildRedesignHowToH2,
  buildRedesignTaxH2,
  formatRedesignEuro,
  redesignAnnualSectionId,
  redesignHowToSectionId,
} from "./page-1650";
import { Page1650InfoIcon } from "./page-1650-icons";

type ProfileEstimates = {
  nonExecutive: NetToGrossEstimate;
  executive: NetToGrossEstimate;
  publicService: NetToGrossEstimate;
};

export function Page1650PedagogySections({
  netMonthly,
  estimates,
}: {
  netMonthly: number;
  estimates: ProfileEstimates;
}) {
  const example = buildRedesignConversionExample(netMonthly);
  const annual = buildRedesignAnnualFigures(netMonthly, estimates);
  const netLabel = formatRedesignEuro(netMonthly);
  const howToTitleId = `net-gross-${netMonthly}-how-to-title`;
  const annualTitleId = `net-gross-${netMonthly}-annual-title`;
  const taxTitleId = `net-gross-${netMonthly}-tax-title`;

  return (
    <>
      <section
        id={redesignHowToSectionId(netMonthly)}
        className="net-gross-1650__section"
        aria-labelledby={howToTitleId}
      >
        <h2 id={howToTitleId} className="net-gross-1500__h2">
          {buildRedesignHowToH2(netMonthly)}
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
        id={redesignAnnualSectionId(netMonthly)}
        className="net-gross-1650__section"
        aria-labelledby={annualTitleId}
      >
        <h2 id={annualTitleId} className="net-gross-1500__h2">
          {buildRedesignAnnualH2(netMonthly)}
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
        aria-labelledby={taxTitleId}
      >
        <h2 id={taxTitleId} className="net-gross-1500__h2">
          {buildRedesignTaxH2(netMonthly)}
        </h2>
        <div className="net-gross-1650__info">
          <span className="net-gross-1650__info-icon" aria-hidden="true">
            <Page1650InfoIcon />
          </span>
          <div className="net-gross-1650__info-copy">
            <p>
              Les {netLabel} nets indiqués sur cette page correspondent au salaire net avant
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

export function Page1650EndCta({ netMonthly }: { netMonthly: number }) {
  const titleId = `net-gross-${netMonthly}-end-cta-title`;
  return (
    <section className="net-gross-1650__end-cta" aria-labelledby={titleId}>
      <h2 id={titleId} className="net-gross-1500__h2">
        {PAGE_1650_END_CTA_H2}
      </h2>
      <p>{PAGE_1650_END_CTA_TEXT}</p>
      <Link href={buildRedesignEndCtaHref(netMonthly)} className="net-gross-1650__end-cta-link">
        {PAGE_1650_END_CTA_LINK_LABEL}
      </Link>
    </section>
  );
}
