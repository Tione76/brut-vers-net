"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { formatGrossShort } from "./data";
import { grossToNetHubFicheDomId } from "./hub";
import {
  findPublishedGrossNearest,
  parseGrossSearchInput,
} from "./index-table";

interface GrossToNetHubAmountSearchProps {
  amounts: readonly number[];
}

/**
 * Recherche légère : saute vers la fiche publiée exacte ou la plus proche.
 * Aucun recalcul de net.
 */
export function GrossToNetHubAmountSearch({ amounts }: GrossToNetHubAmountSearchProps) {
  const titleId = useId();
  const inputId = useId();
  const statusId = useId();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const highlightTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function clearHighlight() {
    document
      .querySelectorAll(".gross-to-net-hub__fiche--highlight")
      .forEach((node) => node.classList.remove("gross-to-net-hub__fiche--highlight"));
  }

  function highlightAmount(amount: number) {
    clearHighlight();
    const target = document.getElementById(grossToNetHubFicheDomId(amount));
    if (!target) {
      return;
    }
    target.classList.add("gross-to-net-hub__fiche--highlight");
    target.scrollIntoView({ behavior: "smooth", block: "center" });
    if (target instanceof HTMLElement) {
      target.focus({ preventScroll: true });
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
    const parsed = parseGrossSearchInput(query);
    if (parsed === null) {
      setStatus("Indiquez un montant brut, par exemple 2300.");
      return;
    }

    const match = findPublishedGrossNearest(parsed, amounts);
    if (!match) {
      setStatus("Aucun montant publié n'est disponible pour l'instant.");
      return;
    }

    highlightAmount(match.amount);
    const label = formatGrossShort(match.amount);
    if (match.exact) {
      setStatus(`Fiche ${label} mise en évidence.`);
      return;
    }
    setStatus(
      `Montant le plus proche : ${label} (les fiches avancent par pas de 50 €).`,
    );
  }

  return (
    <form className="gross-to-net-hub__search" onSubmit={onSubmit} noValidate>
      <h3 id={titleId} className="net-gross-1500__h2 gross-to-net-hub__search-title">
        Rechercher un salaire brut
      </h3>
      <div className="gross-to-net-hub__search-row">
        <input
          id={inputId}
          className="gross-to-net-hub__search-input"
          type="text"
          inputMode="decimal"
          autoComplete="off"
          placeholder="ex. 2 300"
          value={query}
          aria-labelledby={titleId}
          aria-describedby={statusId}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button type="submit" className="gross-to-net-hub__search-button">
          Trouver
        </button>
      </div>
      <p id={statusId} className="gross-to-net-hub__search-status" role="status" aria-live="polite">
        {status}
      </p>
    </form>
  );
}
