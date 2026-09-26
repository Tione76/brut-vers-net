"use client";

import { SMIC_HISTORY_YEARS, yearAnchor } from "@/site/smic-history";

const SELECT_ID = "smic-year-jump";

export function SmicYearJump() {
  function goToYear(year: string) {
    if (!year) return;
    const id = yearAnchor(Number(year));
    const hash = `#${id}`;
    if (window.location.hash !== hash) {
      window.location.hash = id;
    }
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(id)?.scrollIntoView({
      block: "start",
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }

  return (
    <nav className="smic-year-jump" aria-label="Aller à une année du tableau">
      <p className="smic-year-jump__hint">
        Pour une année précise, choisissez-la ici : la page s&apos;ouvre sur la première ligne de
        cette année. Inutile de lire l&apos;article en entier.
      </p>
      <span className="smic-year-jump__field">
        <label htmlFor={SELECT_ID}>Aller à l&apos;année</label>
        <select
          id={SELECT_ID}
          defaultValue=""
          onChange={(event) => goToYear(event.target.value)}
        >
          <option value="" disabled>
            1950 à 2026
          </option>
          {SMIC_HISTORY_YEARS.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </span>
    </nav>
  );
}
