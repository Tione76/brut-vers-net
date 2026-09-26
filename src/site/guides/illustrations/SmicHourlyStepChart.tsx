"use client";

import { useRef, useState, type KeyboardEvent, type MouseEvent, type PointerEvent } from "react";
import {
  SMIC_CHART_CONVERSION_RATE_LABEL,
  SMIC_CHART_ERA_CLIPS,
  SMIC_CHART_EURO_X,
  SMIC_CHART_LAST_STEP,
  SMIC_CHART_LINE_PATH,
  SMIC_CHART_SUBTITLE,
  SMIC_CHART_TITLE,
  SMIC_CHART_X_TICKS,
  SMIC_CHART_YEAR_GROUPS,
  SMIC_CHART_Y_TICKS,
  SMIC_HOURLY_STEPS,
  chartYearGroup,
  stepIndexAtX,
} from "@/site/smic-history/chart";

/** Le graphique n'apparaît qu'une fois par page : des identifiants stables suffisent. */
const ID = "smic-hourly-chart";
const DESCRIPTION_ID = `${ID}-description`;
const FIRST_STEP = SMIC_HOURLY_STEPS[0]!;
const LAST_INDEX = SMIC_HOURLY_STEPS.length - 1;

type Selection = { index: number; year: number; pinned: boolean };

const DEFAULT_SELECTION: Selection = {
  index: SMIC_CHART_LAST_STEP.index,
  year: SMIC_CHART_LAST_STEP.year,
  pinned: false,
};

function clampIndex(index: number): number {
  return Math.min(LAST_INDEX, Math.max(0, index));
}

export function SmicHourlyStepChart() {
  const plotRef = useRef<HTMLDivElement>(null);
  const [selection, setSelection] = useState<Selection>(DEFAULT_SELECTION);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const activeStep = SMIC_HOURLY_STEPS[selection.pinned ? selection.index : hoverIndex ?? selection.index]!;
  const selectedStep = SMIC_HOURLY_STEPS[selection.index]!;
  const yearValue = selectedStep.yearsCovered.includes(selection.year)
    ? selection.year
    : selectedStep.year;
  const dateOptions = (chartYearGroup(yearValue)?.stepIndexes ?? [selectedStep.index]).map(
    (index) => SMIC_HOURLY_STEPS[index]!,
  );

  function select(index: number, year?: number) {
    const step = SMIC_HOURLY_STEPS[clampIndex(index)]!;
    setSelection({ index: step.index, year: year ?? step.year, pinned: true });
  }

  function release() {
    setSelection(DEFAULT_SELECTION);
    setHoverIndex(null);
  }

  function indexFromClientX(clientX: number): number | null {
    const rect = plotRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return null;
    return stepIndexAtX(((clientX - rect.left) / rect.width) * 100);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || selection.pinned) return;
    setHoverIndex(indexFromClientX(event.clientX));
  }

  function handleClick(event: MouseEvent<HTMLDivElement>) {
    const index = indexFromClientX(event.clientX);
    if (index == null) return;
    if (selection.pinned && selection.index === index) release();
    else select(index);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      if (!selection.pinned) return;
      event.stopPropagation();
      release();
      return;
    }
    const moves: Record<string, number | undefined> = {
      ArrowLeft: activeStep.index - 1,
      ArrowRight: activeStep.index + 1,
      Home: 0,
      End: LAST_INDEX,
    };
    const next = moves[event.key];
    if (next === undefined) return;
    event.preventDefault();
    select(next);
  }

  return (
    <div className="smic-chart">
      <p className="smic-chart__title">{SMIC_CHART_TITLE}</p>
      <p className="smic-chart__subtitle">{SMIC_CHART_SUBTITLE}</p>

      <div className="smic-chart__frame">
        <div className="smic-chart__readout-strip">
          <div
            className="smic-chart__readout"
            data-era={activeStep.era}
            data-pinned={selection.pinned ? "true" : "false"}
            style={{ left: `${activeStep.x}%`, transform: `translateX(-${activeStep.x}%)` }}
          >
            <p className="smic-chart__readout-range">
              <span>{activeStep.rangeLabel}</span>
              {activeStep.changeLabel && (
                <span className="smic-chart__readout-change">{activeStep.changeLabel}</span>
              )}
              {selection.pinned && (
                <button type="button" className="smic-chart__close" onClick={release}>
                  Fermer
                </button>
              )}
            </p>
            <p className="smic-chart__readout-value">
              {activeStep.hourlyLabel}
              <span> de l&apos;heure</span>
            </p>
            <p className="smic-chart__readout-meta">{activeStep.secondaryLabel}</p>
          </div>
        </div>

        <p className="smic-chart__unit">€ brut de l&apos;heure</p>

        <div className="smic-chart__y-axis" aria-hidden="true">
          {SMIC_CHART_Y_TICKS.map((tick) => (
            <span key={tick.value} className="smic-chart__y-tick" style={{ top: `${tick.y}%` }}>
              {tick.label}
            </span>
          ))}
        </div>

        <div
          ref={plotRef}
          className="smic-chart__plot"
          role="group"
          tabIndex={0}
          aria-label="Graphique consultable du SMIC horaire brut. Flèches gauche et droite pour parcourir les revalorisations, Échap pour libérer la sélection."
          aria-describedby={DESCRIPTION_ID}
          onPointerMove={handlePointerMove}
          onPointerLeave={() => setHoverIndex(null)}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
        >
          <svg
            className="smic-chart__svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <clipPath id={`${ID}-clip-francs`} clipPathUnits="userSpaceOnUse">
                <rect
                  x={SMIC_CHART_ERA_CLIPS.francs.x}
                  y="0"
                  width={SMIC_CHART_ERA_CLIPS.francs.width}
                  height="100"
                />
              </clipPath>
              <clipPath id={`${ID}-clip-euros`} clipPathUnits="userSpaceOnUse">
                <rect
                  x={SMIC_CHART_ERA_CLIPS.euros.x}
                  y="0"
                  width={SMIC_CHART_ERA_CLIPS.euros.width}
                  height="100"
                />
              </clipPath>
            </defs>
            {SMIC_CHART_Y_TICKS.map((tick) => (
              <line
                key={tick.value}
                className="smic-chart__grid-line"
                data-base={tick.base ? "true" : "false"}
                x1="0"
                x2="100"
                y1={tick.y}
                y2={tick.y}
                vectorEffect="non-scaling-stroke"
              />
            ))}
            <line
              className="smic-chart__euro-line"
              x1={SMIC_CHART_EURO_X}
              x2={SMIC_CHART_EURO_X}
              y1="0"
              y2="100"
              vectorEffect="non-scaling-stroke"
            />
            <path
              className="smic-chart__line smic-chart__line--francs"
              d={SMIC_CHART_LINE_PATH}
              clipPath={`url(#${ID}-clip-francs)`}
              vectorEffect="non-scaling-stroke"
            />
            <path
              className="smic-chart__line smic-chart__line--euros"
              d={SMIC_CHART_LINE_PATH}
              clipPath={`url(#${ID}-clip-euros)`}
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <span className="smic-chart__euro-label" style={{ left: `${SMIC_CHART_EURO_X}%` }}>
            Passage à l&apos;euro
          </span>
          <span className="smic-chart__crosshair" style={{ left: `${activeStep.x}%` }} />
          <span
            className="smic-chart__dot"
            data-era={activeStep.era}
            style={{ left: `${activeStep.x}%`, top: `${activeStep.y}%` }}
          />
        </div>

        <div className="smic-chart__x-axis" aria-hidden="true">
          {SMIC_CHART_X_TICKS.map((tick) => (
            <span
              key={tick.year}
              className="smic-chart__x-tick"
              data-minor={tick.minor ? "true" : "false"}
              style={{ left: `${tick.x}%`, transform: `translateX(-${tick.x}%)` }}
            >
              {tick.label}
            </span>
          ))}
        </div>
      </div>

      <ul className="smic-chart__legend">
        <li>
          <span className="smic-chart__swatch" data-era="francs" />
          Montants fixés en francs, convertis en euros
        </li>
        <li>
          <span className="smic-chart__swatch" data-era="euros" />
          Montants publiés en euros
        </li>
      </ul>

      <div className="smic-chart__picker">
        <span className="smic-chart__field">
          <label htmlFor={`${ID}-year`}>Année</label>
          <select
            id={`${ID}-year`}
            value={yearValue}
            onChange={(event) => {
              const year = Number(event.target.value);
              select(chartYearGroup(year)?.stepIndexes[0] ?? selection.index, year);
            }}
          >
            {SMIC_CHART_YEAR_GROUPS.map((group) => (
              <option key={group.year} value={group.year}>
                {group.year}
              </option>
            ))}
          </select>
        </span>
        <span className="smic-chart__field">
          <label htmlFor={`${ID}-date`}>Date d&apos;effet</label>
          <select
            id={`${ID}-date`}
            value={selectedStep.index}
            onChange={(event) => select(Number(event.target.value), yearValue)}
          >
            {dateOptions.map((step) => (
              <option key={step.index} value={step.index}>
                {step.effectiveLabel}
                {step.year === yearValue ? "" : " (taux maintenu)"}
              </option>
            ))}
          </select>
        </span>
      </div>

      <p className="smic-chart__note">
        La courbe relie les taux successifs à leurs dates d&apos;effet : entre deux dates, elle ne
        représente aucun taux légal intermédiaire, elle ne fait que lier deux montants publiés. Un
        montant reste d&apos;ailleurs applicable jusqu&apos;à l&apos;entrée en vigueur du suivant.
        Avant 2002, le SMIC était fixé en francs et la courbe bleue utilise le taux officiel de
        conversion ({SMIC_CHART_CONVERSION_RATE_LABEL}). Ce n&apos;est ni un euro versé à
        l&apos;époque, ni une valeur en euros constants.{" "}
        <a href="#tableau-smic">Toutes les valeurs figurent dans le tableau par année.</a>
      </p>

      <p id={DESCRIPTION_ID} className="sr-only">
        {`Courbe du SMIC horaire brut passant par les ${SMIC_HOURLY_STEPS.length} taux publiés par l'Insee à leurs dates d'entrée en vigueur. Le premier vaut ${FIRST_STEP.hourlyLabel} de l'heure le ${FIRST_STEP.effectiveLabel}, avant le passage à l'euro. Le dernier vaut ${SMIC_CHART_LAST_STEP.hourlyLabel} de l'heure depuis le ${SMIC_CHART_LAST_STEP.effectiveLabel}. Entre deux dates, la courbe n'indique aucun taux légal intermédiaire. Les listes situées sous le graphique permettent de choisir une année puis une date d'effet. Le tableau du SMIC par année, plus bas sur la page, liste toutes les valeurs.`}
      </p>
      <p className="sr-only" aria-live="polite">
        {selection.pinned ? activeStep.screenReaderLabel : ""}
      </p>
    </div>
  );
}
