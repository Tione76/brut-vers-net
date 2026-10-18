"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { NavIcon } from "./NavIcons";
import { buildSearchIndex, searchSite, type SearchEntry } from "./site-search-index";

export function SiteSearch({
  onOpenChange,
}: {
  onOpenChange?: (open: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const dialogId = useId();
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const index = useMemo(() => buildSearchIndex(), []);
  const results = useMemo(() => searchSite(query, index), [query, index]);

  const setOpenSafe = useCallback(
    (next: boolean) => {
      setOpen(next);
      onOpenChange?.(next);
      if (!next) setQuery("");
    },
    [onOpenChange],
  );

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 20);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpenSafe(false);
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (rootRef.current?.contains(target)) return;
      setOpenSafe(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open, setOpenSafe]);

  return (
    <div className="mh-search" ref={rootRef}>
      <button
        type="button"
        className={`mh-search__trigger${open ? " is-open" : ""}`}
        aria-expanded={open}
        aria-controls={dialogId}
        aria-haspopup="dialog"
        aria-label={open ? "Fermer la recherche" : "Rechercher sur le site"}
        onClick={() => setOpenSafe(!open)}
      >
        <NavIcon id="search" size={18} />
      </button>

      <div
        id={dialogId}
        className="mh-search__panel"
        role="dialog"
        aria-label="Recherche"
        aria-modal="false"
        hidden={!open}
      >
        <label className="mh-search__label" htmlFor={inputId}>
          Rechercher un calculateur ou un guide
        </label>
        <input
          ref={inputRef}
          id={inputId}
          type="search"
          className="mh-search__input"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Ex. : SMIC, prime d'activité, heures sup…"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
        />
        <SearchResults
          query={query}
          results={results}
          onNavigate={() => setOpenSafe(false)}
        />
      </div>
    </div>
  );
}

function SearchResults({
  query,
  results,
  onNavigate,
}: {
  query: string;
  results: SearchEntry[];
  onNavigate: () => void;
}) {
  if (query.trim().length < 2) {
    return (
      <p className="mh-search__hint">
        Saisissez au moins 2 caractères pour lancer la recherche.
      </p>
    );
  }

  if (results.length === 0) {
    return (
      <p className="mh-search__empty" role="status">
        Aucun résultat pour « {query.trim()} ».
      </p>
    );
  }

  return (
    <ul className="mh-search__results" role="listbox" aria-label="Résultats">
      {results.map((entry) => (
        <li key={entry.href}>
          <Link
            href={entry.href}
            className="mh-search__result"
            onClick={onNavigate}
          >
            <span className="mh-search__result-cat">{entry.category}</span>
            <span className="mh-search__result-title">{entry.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
