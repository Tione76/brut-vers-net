"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import type { HeaderNavEntry } from "./header-nav";

const MOBILE_MQ = "(max-width: 639px)";

function isItemActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

interface MobileSiteNavProps {
  panelId: string;
  entries: HeaderNavEntry[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  toggleRef: React.RefObject<HTMLButtonElement | null>;
}

export function MobileSiteNav({
  panelId,
  entries,
  open,
  onOpenChange,
  toggleRef,
}: MobileSiteNavProps) {
  const pathname = usePathname();
  const rootRef = useRef<HTMLElement>(null);
  const [openAccordionId, setOpenAccordionId] = useState<string | null>(null);

  const close = useCallback(() => onOpenChange(false), [onOpenChange]);

  useEffect(() => {
    if (!open) setOpenAccordionId(null);
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MQ);
    const onChange = () => {
      if (!mq.matches) close();
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [close]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close, toggleRef]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (rootRef.current?.contains(target)) return;
      if (toggleRef.current?.contains(target)) return;
      close();
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open, close, toggleRef]);

  const toggleAccordion = (id: string) => {
    setOpenAccordionId((current) => (current === id ? null : id));
  };

  return (
    <nav
      ref={rootRef}
      id={panelId}
      className="site-mobile-nav"
      aria-label="Navigation principale"
      hidden={!open}
    >
      <ul className="site-mobile-nav__list">
        {entries.map((entry) => {
          if (entry.kind === "link") {
            const isActive = isItemActive(pathname, entry.href);
            return (
              <li key={entry.id} className="site-mobile-nav__item">
                {entry.external ? (
                  <a
                    href={entry.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="site-mobile-nav__link"
                    onClick={close}
                  >
                    {entry.label}
                  </a>
                ) : (
                  <Link
                    href={entry.href}
                    className={`site-mobile-nav__link${isActive ? " site-mobile-nav__link--active" : ""}`}
                    aria-current={isActive ? "page" : undefined}
                    onClick={close}
                  >
                    {entry.label}
                  </Link>
                )}
              </li>
            );
          }

          const accordionOpen = openAccordionId === entry.id;
          const panelControlId = `${panelId}-${entry.id}`;
          const sectionActive = entry.items.some((item) =>
            isItemActive(pathname, item.href),
          );

          return (
            <li
              key={entry.id}
              className={`site-mobile-nav__item site-mobile-nav__item--accordion${accordionOpen ? " is-open" : ""}`}
            >
              <button
                type="button"
                className={`site-mobile-nav__accordion-trigger${sectionActive ? " is-active" : ""}`}
                aria-expanded={accordionOpen}
                aria-controls={panelControlId}
                onClick={() => toggleAccordion(entry.id)}
              >
                <span>{entry.label}</span>
                <span className="site-mobile-nav__chevron" aria-hidden="true" />
              </button>
              <ul
                id={panelControlId}
                className="site-mobile-nav__sublist"
                hidden={!accordionOpen}
              >
                {entry.items.map((item) => {
                  const isActive = isItemActive(pathname, item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`site-mobile-nav__sublink${isActive ? " site-mobile-nav__sublink--active" : ""}`}
                        title={item.title}
                        aria-current={isActive ? "page" : undefined}
                        onClick={close}
                      >
                        {item.shortTitle}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function MobileNavToggle({
  open,
  panelId,
  onToggle,
  buttonRef,
}: {
  open: boolean;
  panelId: string;
  onToggle: () => void;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
}) {
  return (
    <button
      ref={buttonRef}
      type="button"
      className={`site-nav__toggle${open ? " site-nav__toggle--open" : ""}`}
      aria-expanded={open}
      aria-controls={panelId}
      aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
      onClick={onToggle}
    >
      <span className="site-nav__toggle-box" aria-hidden="true">
        <span className="site-nav__toggle-bar" />
        <span className="site-nav__toggle-bar" />
        <span className="site-nav__toggle-bar" />
      </span>
    </button>
  );
}
