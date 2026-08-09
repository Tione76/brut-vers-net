"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { formatNetShort } from "./data";
import {
  findPublishedNetNearest,
  netToGrossIndexRowId,
  parseNetSearchInput,
} from "./index-table";

interface NetToGrossIndexTableSearchProps {
  amounts: readonly number[];
}

/**
 * Navigation rapide dans le tableau Index (aucun recalcul).
 */
export function NetToGrossIndexTableSearch({ amounts }: NetToGrossIndexTableSearchProps) {
  const titleId = useId();
  const inputId = useId();
  const statusId = useId();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const highlightTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function clearHighlight() {
    document
      .querySelectorAll(".gross-to-net-index__row--highlight")
      .forEach((node) => node.classList.remove("gross-to-net-index__row--highlight"));
  }

  function highlightRow(amount: number) {
    clearHighlight();
    const row = document.getElementById(netToGrossIndexRowId(amount));
    if (!row) {
      return;
    }
    row.classList.add("gross-to-net-index__row--highlight");
    row.scrollIntoView({ behavior: "smooth", block: "center" });
    if (row instanceof HTMLElement) {
      row.focus({ preventScroll: true });
    }
    if (highlightTimerRef.current) {
      clearTimeout(highlightTimerRef.current);
    }
    highlightTimerRef.current = setTimeout(() => {
      clearHighlight();
    }, 3200);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = parseNetSearchInput(query);
    if (parsed === null) {
      setStatus("Indiquez un montant net, par exemple 2300.");
      return;
    }

    const match = findPublishedNetNearest(parsed, amounts);
    if (!match) {
      setStatus("Aucun montant publié n'est disponible pour l'instant.");
      return;
    }

    highlightRow(match.amount);
    const label = formatNetShort(match.amount);
    if (match.exact) {
      setStatus(`Ligne ${label} sélectionnée.`);
      return;
    }
    setStatus(
      `Montant le plus proche : ${label} (les valeurs du tableau avancent par pas de 100 €).`,
    );
  }

  return (
    <form className="gross-to-net-index__search" onSubmit={onSubmit} noValidate>
      <h3 id={titleId} className="net-gross-1500__h2 gross-to-net-index__search-title">
        Rechercher un salaire net
      </h3>
      <div className="gross-to-net-index__search-row">
        <input
          id={inputId}
          className="gross-to-net-index__search-input"
          type="text"
          inputMode="decimal"
          autoComplete="off"
          placeholder="ex. 2 300"
          value={query}
          aria-labelledby={titleId}
          aria-describedby={statusId}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button type="submit" className="gross-to-net-index__search-button">
          Trouver
        </button>
      </div>
      <p id={statusId} className="gross-to-net-index__search-status" role="status" aria-live="polite">
        {status}
      </p>
    </form>
  );
}
