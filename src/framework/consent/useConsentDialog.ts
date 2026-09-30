"use client";

import { useEffect, type RefObject } from "react";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

function getFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (el) => !el.hasAttribute("disabled") && el.getAttribute("aria-hidden") !== "true",
  );
}

/**
 * Verrouille la page derrière une modale de consentement :
 * scroll, inert, piège de focus, Escape optionnel.
 */
export function useConsentDialog(
  rootRef: RefObject<HTMLElement | null>,
  options: { enabled: boolean; preventEscape?: boolean; onEscape?: () => void },
): void {
  const { enabled, preventEscape = false, onEscape } = options;

  useEffect(() => {
    if (!enabled) return;

    const root = rootRef.current;
    if (!root) return;

    const html = document.documentElement;
    const { body } = document;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.classList.add("cookie-consent-lock");

    const skipInert = new Set(["SCRIPT", "STYLE", "LINK", "META", "TITLE", "NOSCRIPT", "TEMPLATE"]);
    const inertSiblings: HTMLElement[] = [];
    const parent = root.parentElement;
    if (parent) {
      for (const child of Array.from(parent.children)) {
        if (child === root || !(child instanceof HTMLElement)) continue;
        if (skipInert.has(child.tagName)) continue;
        child.setAttribute("inert", "");
        inertSiblings.push(child);
      }
    }

    const dialog = root.querySelector<HTMLElement>("[role='dialog']") ?? root;
    dialog.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (preventEscape) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }
        if (onEscape) {
          event.preventDefault();
          onEscape();
        }
        return;
      }

      if (event.key !== "Tab") return;

      const items = getFocusable(root);
      if (items.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (event.shiftKey) {
        if (active === first || active === dialog || !root.contains(active)) {
          event.preventDefault();
          last.focus();
        }
        return;
      }

      if (active === last || active === dialog || !root.contains(active)) {
        event.preventDefault();
        first.focus();
      }
    };

    const onFocusIn = (event: FocusEvent) => {
      const target = event.target;
      if (!(target instanceof Node) || root.contains(target)) return;
      event.preventDefault();
      const items = getFocusable(root);
      (items[0] ?? dialog).focus();
    };

    document.addEventListener("keydown", onKeyDown, true);
    document.addEventListener("focusin", onFocusIn);

    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      body.classList.remove("cookie-consent-lock");
      for (const sibling of inertSiblings) sibling.removeAttribute("inert");
      document.removeEventListener("keydown", onKeyDown, true);
      document.removeEventListener("focusin", onFocusIn);
      previouslyFocused?.focus?.();
    };
  }, [enabled, preventEscape, onEscape, rootRef]);
}
