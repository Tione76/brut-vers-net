"use client";

import { useRef, useState, type KeyboardEvent, type MouseEvent, type PointerEvent } from "react";
import {
  clampIndex,
  selectionOnClick,
  selectionOnKey,
  visibleIndex,
  type ChartSelection,
} from "@/site/smic-history/chart-selection";
import {
  INFLATION_BASE_LABEL,
  INFLATION_CHART_SUBTITLE,
  INFLATION_CHART_TITLE,
  INFLATION_LAST_POINT,
  INFLATION_PRICE_PATH,
  INFLATION_SMIC_PATH,
  INFLATION_UNIT_LABEL,
  INFLATION_X_TICKS,
  INFLATION_YEAR_GROUPS,
  INFLATION_Y_TICKS,
  SMIC_INFLATION_POINTS,
  inflationIndexAtX,
  inflationIndexForYear,
  inflationYearGroup,
} from "@/site/smic-history/inflation-chart";

/** Le graphique n'apparaît qu'une fois par page : des identifiants stables suffisent. */
const ID = "smic-inflation-chart";
const DESCRIPTION_ID = `${ID}-description`;
const FIRST_POINT = SMIC_INFLATION_POINTS[0]!;
const COUNT = SMIC_INFLATION_POINTS.length;

const RELEASED: ChartSelection = { index: INFLATION_LAST_POINT.index, pinned: false };

export function SmicInflationIllustration() {
  const plotRef = useRef<HTMLDivElement>(null);
  const [selection, setSelection] = useState<ChartSelection>(RELEASED);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const activePoint = SMIC_INFLATION_POINTS[visibleIndex(selection, hoverIndex)]!;
  const selectedPoint = SMIC_INFLATION_POINTS[selection.index]!;
  const quarterOptions = (inflationYearGroup(selectedPoint.year)?.pointIndexes ?? []).map(
    (index) => SMIC_INFLATION_POINTS[index]!,
  );

  function apply(next: ChartSelection) {
    setSelection(next);
    if (!next.pinned) setHoverIndex(null);
  }

  /** Les listes déroulantes verrouillent la même sélection que le clic. */
  function select(index: number) {
    apply({ index: clampIndex(index, COUNT), pinned: true });
  }

  function release() {
    apply(RELEASED);
  }

  function indexFromClientX(clientX: number): number | null {
    const rect = plotRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return null;
    return inflationIndexAtX(((clientX - rect.left) / rect.width) * 100);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || selection.pinned) return;
    setHoverIndex(indexFromClientX(event.clientX));
  }

  function handleClick(event: MouseEvent<HTMLDivElement>) {
    const index = indexFromClientX(event.clientX);
    if (index == null) return;
    apply(selectionOnClick(selection, index, RELEASED, COUNT));
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const next = selectionOnKey(selection, event.key, activePoint.index, RELEASED, COUNT);
    if (next === null) return;
    if (event.key === "Escape") event.stopPropagation();
    else event.preventDefault();
    apply(next);
  }

  return (
    <div className="smic-chart smic-chart--indices">
      <p className="smic-chart__title">{INFLATION_CHART_TITLE}</p>
      <p className="smic-chart__subtitle">{INFLATION_CHART_SUBTITLE}</p>

      <div className="smic-chart__frame">
        <div className="smic-chart__readout-strip">
          <div
            className="smic-chart__readout"
            data-pinned={selection.pinned ? "true" : "false"}
            style={{ left: `${activePoint.x}%`, transform: `translateX(-${activePoint.x}%)` }}
          >
            <p className="smic-chart__readout-range">
              <span className="smic-chart__readout-year">{activePoint.year}</span>
              <span>{activePoint.quarterLabel}</span>
              {selection.pinned && (
                <button type="button" className="smic-chart__close" onClick={release}>
                  Fermer
                </button>
              )}
            </p>
            <ul className="smic-chart__readout-pair">
              <li data-serie="smic">
                <span className="smic-chart__readout-key">
                  <span className="smic-chart__swatch" data-era="smic" />
                  SMIC horaire brut
                </span>
                <span className="smic-chart__readout-num">{activePoint.smicLabel}</span>
              </li>
              <li data-serie="prices">
                <span className="smic-chart__readout-key">
                  <span className="smic-chart__swatch" data-era="prices" />
                  Prix à la consommation
                </span>
                <span className="smic-chart__readout-num">{activePoint.priceLabel}</span>
              </li>
            </ul>
            <p className="smic-chart__readout-meta">
              {activePoint.monthsLabel} · {INFLATION_BASE_LABEL}
            </p>
          </div>
        </div>

        <p className="smic-chart__unit">{INFLATION_UNIT_LABEL}</p>

        <div className="smic-chart__y-axis" aria-hidden="true">
          {INFLATION_Y_TICKS.map((tick) => (
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
          aria-label="Graphique consultable des indices du SMIC horaire brut et des prix à la consommation. Flèches gauche et droite pour parcourir les trimestres, Échap pour libérer la sélection."
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
            {INFLATION_Y_TICKS.map((tick) => (
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
            <path
              className="smic-chart__line smic-chart__line--prices"
              d={INFLATION_PRICE_PATH}
              vectorEffect="non-scaling-stroke"
            />
            <path
              className="smic-chart__line smic-chart__line--smic"
              d={INFLATION_SMIC_PATH}
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <span className="smic-chart__crosshair" style={{ left: `${activePoint.x}%` }} />
          <span
            className="smic-chart__dot"
            data-era="prices"
            style={{ left: `${activePoint.x}%`, top: `${activePoint.yPrice}%` }}
          />
          <span
            className="smic-chart__dot"
            data-era="smic"
            style={{ left: `${activePoint.x}%`, top: `${activePoint.ySmic}%` }}
          />
        </div>

        <div className="smic-chart__x-axis" aria-hidden="true">
          {INFLATION_X_TICKS.map((tick) => (
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
          <span className="smic-chart__swatch" data-era="smic" />
          SMIC horaire brut
        </li>
        <li>
          <span className="smic-chart__swatch" data-era="prices" />
          Prix à la consommation, y compris tabac
        </li>
      </ul>

      <div className="smic-chart__picker">
        <span className="smic-chart__field">
          <label htmlFor={`${ID}-year`}>Année</label>
          <select
            id={`${ID}-year`}
            value={selectedPoint.year}
            onChange={(event) => {
              select(inflationIndexForYear(Number(event.target.value), selectedPoint.quarterNumber));
            }}
          >
            {INFLATION_YEAR_GROUPS.map((group) => (
              <option key={group.year} value={group.year}>
                {group.year}
              </option>
            ))}
          </select>
        </span>
        <span className="smic-chart__field">
          <label htmlFor={`${ID}-quarter`}>Trimestre</label>
          <select
            id={`${ID}-quarter`}
            value={selectedPoint.index}
            onChange={(event) => select(Number(event.target.value))}
          >
            {quarterOptions.map((point) => (
              <option key={point.index} value={point.index}>
                {point.periodLabel}
              </option>
            ))}
          </select>
        </span>
      </div>

      <p className="smic-chart__note">
        Au-dessus de 100, l&apos;indice a augmenté par rapport à mars 1990. Les courbes relient les
        observations trimestrielles publiées par l&apos;Insee : l&apos;encart n&apos;affiche que ces
        observations, jamais un point intermédiaire. Ces nombres sont des indices, pas des montants
        en euros. L&apos;indice des prix présenté ici, y compris tabac et pour l&apos;ensemble des
        ménages, sert à comparer les évolutions historiques. Il est différent de l&apos;indice de
        référence utilisé pour la revalorisation légale du SMIC, qui concerne les ménages du premier
        quintile de niveau de vie et est hors tabac. L&apos;écart entre les deux courbes ne suffit
        pas à conclure sur le pouvoir d&apos;achat, dont les évolutions officielles figurent dans le
        tableau ci-dessous.
      </p>

      <p id={DESCRIPTION_ID} className="sr-only">
        {`Deux courbes d'indices Insee, ${INFLATION_BASE_LABEL}, sur ${SMIC_INFLATION_POINTS.length} trimestres du ${FIRST_POINT.periodLabel} au ${INFLATION_LAST_POINT.periodLabel}. Au ${INFLATION_LAST_POINT.periodLabel}, l'indice du SMIC horaire brut vaut ${INFLATION_LAST_POINT.smicLabel} et celui des prix à la consommation ${INFLATION_LAST_POINT.priceLabel}. Les listes situées sous le graphique permettent de choisir une année puis un trimestre.`}
      </p>
      <p className="sr-only" aria-live="polite">
        {selection.pinned ? activePoint.screenReaderLabel : ""}
      </p>
    </div>
  );
}
