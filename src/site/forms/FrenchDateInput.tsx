"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  FRENCH_MONTHS,
  FRENCH_WEEKDAYS_SHORT,
  formatIsoToFrenchInput,
  parseFrenchDateInput,
  toIsoDateOnly,
} from "@/site/dates";
import "./french-date.css";

type FrenchDateInputProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  ariaInvalid?: boolean;
  ariaDescribedBy?: string;
};

function todayIso(): string {
  const now = new Date();
  return toIsoDateOnly(now.getFullYear(), now.getMonth() + 1, now.getDate()) ?? "";
}

function mondayIndex(year: number, monthIndex: number): number {
  const weekday = new Date(year, monthIndex, 1).getDay();
  return (weekday + 6) % 7;
}

function daysInMonth(year: number, monthIndex: number): number {
  return new Date(year, monthIndex + 1, 0).getDate();
}

export function FrenchDateInput({
  id,
  value,
  onChange,
  ariaInvalid,
  ariaDescribedBy,
}: FrenchDateInputProps) {
  const [draft, setDraft] = useState(() => (value ? formatIsoToFrenchInput(value) : ""));
  const [focused, setFocused] = useState(false);
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(() => new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState(() => new Date().getMonth());
  const [popoverPos, setPopoverPos] = useState({ top: 0, left: 0, width: 0 });
  const wrapRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const dialogId = useId();

  useEffect(() => {
    if (!focused) {
      setDraft(value ? formatIsoToFrenchInput(value) : "");
    }
  }, [value, focused]);

  useEffect(() => {
    if (!open) return;

    function place() {
      const box = wrapRef.current?.getBoundingClientRect();
      if (!box) return;
      const width = Math.max(box.width, 280);
      const left = Math.min(box.left, window.innerWidth - width - 8);
      setPopoverPos({
        top: box.bottom + 6,
        left: Math.max(8, left),
        width,
      });
    }

    place();

    function onPointerDown(event: MouseEvent) {
      const target = event.target as Node;
      if (wrapRef.current?.contains(target) || popoverRef.current?.contains(target)) {
        return;
      }
      setOpen(false);
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, true);
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place, true);
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function commitDraft(next: string) {
    setDraft(next);
    if (next.trim() === "") {
      onChange("");
      return;
    }
    const iso = parseFrenchDateInput(next);
    if (iso) onChange(iso);
  }

  function handleBlur() {
    setFocused(false);
    if (draft.trim() === "") {
      onChange("");
      setDraft("");
      return;
    }
    const iso = parseFrenchDateInput(draft);
    if (iso) {
      onChange(iso);
      setDraft(formatIsoToFrenchInput(iso));
      return;
    }
    setDraft(value ? formatIsoToFrenchInput(value) : "");
  }

  function openCalendar() {
    const iso = parseFrenchDateInput(value) ?? parseFrenchDateInput(draft);
    if (iso) {
      const [year, month] = iso.split("-").map(Number);
      setViewYear(year!);
      setViewMonth(month! - 1);
    } else {
      const now = new Date();
      setViewYear(now.getFullYear());
      setViewMonth(now.getMonth());
    }
    setOpen(true);
  }

  function selectDay(day: number) {
    const iso = toIsoDateOnly(viewYear, viewMonth + 1, day);
    if (!iso) return;
    onChange(iso);
    setDraft(formatIsoToFrenchInput(iso));
    setOpen(false);
  }

  function shiftMonth(delta: number) {
    const next = new Date(viewYear, viewMonth + delta, 1);
    setViewYear(next.getFullYear());
    setViewMonth(next.getMonth());
  }

  const selectedIso = parseFrenchDateInput(value);
  const today = todayIso();
  const leading = mondayIndex(viewYear, viewMonth);
  const count = daysInMonth(viewYear, viewMonth);
  const monthLabel = `${FRENCH_MONTHS[viewMonth]} ${viewYear}`;

  return (
    <div className="french-date" ref={wrapRef}>
      <input
        id={id}
        type="text"
        autoComplete="off"
        spellCheck={false}
        lang="fr-FR"
        placeholder="jj/mm/aaaa"
        value={draft}
        onChange={(event) => commitDraft(event.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={handleBlur}
        aria-invalid={ariaInvalid || undefined}
        aria-describedby={ariaDescribedBy}
        aria-controls={open ? dialogId : undefined}
      />
      <button
        type="button"
        className="french-date__trigger"
        aria-label="Ouvrir le calendrier"
        aria-expanded={open}
        aria-haspopup="dialog"
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => (open ? setOpen(false) : openCalendar())}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <rect x="2" y="3.5" width="14" height="12.5" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M2 7h14M6 2v3M12 2v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      {open
        ? createPortal(
            <div
              ref={popoverRef}
              id={dialogId}
              className="french-date__popover"
              role="dialog"
              aria-label={`Calendrier, ${monthLabel}`}
              style={{
                top: popoverPos.top,
                left: popoverPos.left,
                width: popoverPos.width,
              }}
            >
              <div className="french-date__nav">
                <button
                  type="button"
                  className="french-date__nav-btn"
                  aria-label="Mois précédent"
                  onClick={() => shiftMonth(-1)}
                >
                  ‹
                </button>
                <p className="french-date__month">{monthLabel}</p>
                <button
                  type="button"
                  className="french-date__nav-btn"
                  aria-label="Mois suivant"
                  onClick={() => shiftMonth(1)}
                >
                  ›
                </button>
              </div>
              <div className="french-date__weekdays" aria-hidden="true">
                {FRENCH_WEEKDAYS_SHORT.map((day, index) => (
                  <span key={`${day}-${index}`}>{day}</span>
                ))}
              </div>
              <div className="french-date__grid" role="grid" aria-label={monthLabel}>
                {Array.from({ length: leading }, (_, index) => (
                  <span key={`pad-${index}`} className="french-date__day french-date__day--empty" />
                ))}
                {Array.from({ length: count }, (_, index) => {
                  const day = index + 1;
                  const iso = toIsoDateOnly(viewYear, viewMonth + 1, day);
                  const selected = iso === selectedIso;
                  const isToday = iso === today;
                  return (
                    <button
                      key={iso ?? day}
                      type="button"
                      role="gridcell"
                      className={[
                        "french-date__day",
                        selected ? "french-date__day--selected" : "",
                        isToday ? "french-date__day--today" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      aria-selected={selected}
                      onClick={() => selectDay(day)}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
