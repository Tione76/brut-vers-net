"use client";

import type { ComponentType, ReactNode } from "react";
import { CalculatorProvider, useCalculatorSlot } from "@/framework/SiteProvider";
import { AdSlot } from "@/framework/AdSlot";
import { SiteShell } from "@/framework/design/components/SiteShell";
import { ShareBlock, type ShareBlockProps } from "@/framework/design/components/ShareBlock";
import { PageFooter } from "@/framework/design/PageFooter";

interface ToolCalculatorPageLayoutProps {
  h1: string;
  subtitle?: string;
  disclaimer?: string;
  Calculator: ComponentType;
  editorial: ReactNode;
  sidebar: ReactNode;
  breadcrumb?: ReactNode;
  /** Ligne « Par Antoine · X min · Dernière mise à jour » (sous le fil d'Ariane). */
  authorMeta?: ReactNode;
  variant?: "default" | "margin";
  share: ShareBlockProps;
}

function CalculatorHero({
  Calculator,
  variant,
  disclaimer,
}: {
  Calculator: ComponentType;
  variant?: "default" | "margin";
  disclaimer?: string;
}) {
  const { result } = useCalculatorSlot();
  const isMargin = variant === "margin";

  return (
    <div className={`calc-tool${isMargin ? " calc-tool--margin" : ""}`}>
      <div className="calc-columns">
        <div className="calc-col calc-col--inputs" data-clarity-mask="true">
          <p className="calc-col-title">Vos données</p>
          <Calculator />
        </div>
        <div
          className={`calc-col calc-col--results${isMargin ? " margin-calc-results" : ""}`}
          id="resultat"
          aria-live="polite"
          aria-atomic="true"
          data-clarity-mask="true"
        >
          {!isMargin && <p className="calc-col-title">Résultats</p>}
          {result ?? (
            <div className="result-primary">
              <p className="result-primary-label">En attente</p>
              <p className="result-primary-value">-</p>
              <p className="result-details">Renseignez le formulaire pour voir les résultats.</p>
            </div>
          )}
        </div>
      </div>
      <p className="calc-disclaimer">
        {disclaimer ??
          "Le calculateur est actuellement en cours de développement."}
      </p>
    </div>
  );
}

function ToolCalculatorPageInner({
  h1,
  subtitle,
  disclaimer,
  Calculator,
  editorial,
  sidebar,
  breadcrumb,
  authorMeta,
  variant = "default",
  share,
}: ToolCalculatorPageLayoutProps) {
  const isMargin = variant === "margin";

  return (
    <>
      <SiteShell>
      <section
        className={`tool-header tool-header--tool-page tool-header--with-share${isMargin ? " tool-header--margin-page" : ""}`}
      >
        <div className="tool-header__inner">
          <h1 className="tool-header__title tool-header__title--sentence">{h1}</h1>
          {subtitle ? <p className="tool-header__subtitle">{subtitle}</p> : null}
          <div className="calc-stage" id="calculateur">
            <CalculatorHero
              Calculator={Calculator}
              variant={variant}
              disclaimer={disclaimer}
            />
          </div>
          <div className="tool-header__share">
            <ShareBlock {...share} variant="onLight" layout="rail" />
          </div>
        </div>
      </section>

      <main id="main-content" className="content-main">
        <div className="content-wrap content-wrap--wide home-with-sidebar">
          <div className="article-layout">
            <div className="home-with-sidebar__main">
              {breadcrumb}
              {authorMeta}
              {editorial}
              <div className="content-wrap">
                <AdSlot position="after-result" />
              </div>
            </div>
            <aside className="article-sidebar" aria-label="Guides et outils">
              {sidebar}
            </aside>
          </div>
        </div>
        </main>
      </SiteShell>

      <div className="content-wrap">
        <AdSlot position="before-footer" />
      </div>

      <PageFooter />
    </>
  );
}

export function ToolCalculatorPageLayout(props: ToolCalculatorPageLayoutProps) {
  return (
    <CalculatorProvider>
      <ToolCalculatorPageInner {...props} />
    </CalculatorProvider>
  );
}
