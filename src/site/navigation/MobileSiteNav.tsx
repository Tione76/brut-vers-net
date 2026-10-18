"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  isPathMatched,
  type MainNavItem,
} from "./main-nav-data";
import { NavIconBadge } from "./NavIcons";

const MOBILE_MQ = "(max-width: 1099px)";

interface MobileSiteNavProps {
  panelId: string;
  items: MainNavItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  toggleRef: React.RefObject<HTMLButtonElement | null>;
}

export function MobileSiteNav({
  panelId,
  items,
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

    const { body } = document;
    const scrollY = window.scrollY;
    const previous = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      paddingRight: body.style.paddingRight,
    };
    const scrollbarGap = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    if (scrollbarGap > 0) {
      body.style.paddingRight = `${scrollbarGap}px`;
    }

    return () => {
      body.style.overflow = previous.overflow;
      body.style.position = previous.position;
      body.style.top = previous.top;
      body.style.width = previous.width;
      body.style.paddingRight = previous.paddingRight;
      window.scrollTo(0, scrollY);
    };
  }, [open]);

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
    <div className="site-mobile-nav-layer" hidden={!open}>
      <button
        type="button"
        className="site-mobile-nav__backdrop"
        aria-label="Fermer le menu"
        tabIndex={-1}
        onClick={close}
      />
      <div className="site-header__inner site-header__inner--mobile-nav">
        <nav
          ref={rootRef}
          id={panelId}
          className="site-mobile-nav"
          aria-label="Navigation principale"
        >
          <ul className="site-mobile-nav__list">
            {items.map((item) => {
              if (item.kind === "link") {
                const isActive = isPathMatched(pathname, item.matchPaths);
                return (
                  <li key={item.id} className="site-mobile-nav__item">
                    <Link
                      href={item.href}
                      className={`site-mobile-nav__link${isActive ? " is-current" : ""}`}
                      aria-current={isActive ? "page" : undefined}
                      onClick={close}
                    >
                      <span className="site-mobile-nav__link-main">
                        <NavIconBadge id={item.icon} variant="square" />
                        {item.label}
                      </span>
                    </Link>
                  </li>
                );
              }

              const accordionOpen = openAccordionId === item.id;
              const panelControlId = `${panelId}-${item.id}`;
              const sectionActive = isPathMatched(pathname, item.matchPaths);
              const panel = item.panel;

              return (
                <li
                  key={item.id}
                  className={`site-mobile-nav__item site-mobile-nav__item--accordion${accordionOpen ? " is-open" : ""}`}
                >
                  <button
                    type="button"
                    className={`site-mobile-nav__accordion-trigger${sectionActive ? " is-active" : ""}`}
                    aria-expanded={accordionOpen}
                    aria-controls={panelControlId}
                    onClick={() => toggleAccordion(item.id)}
                  >
                    <span className="site-mobile-nav__link-main">
                      <NavIconBadge id={item.icon} variant="square" />
                      {item.label}
                    </span>
                    <span className="site-mobile-nav__chevron" aria-hidden="true" />
                  </button>
                  <div id={panelControlId} hidden={!accordionOpen}>
                    {panel.kind === "simple" || panel.kind === "spotlight" ? (
                      <>
                        <ul className="site-mobile-nav__sublist">
                          {(panel.kind === "simple" ? panel.links : panel.links).map(
                            (link) => (
                              <li key={link.href}>
                                <Link
                                  href={link.href}
                                  className="site-mobile-nav__sublink"
                                  title={link.title}
                                  onClick={close}
                                >
                                  {link.label}
                                </Link>
                              </li>
                            ),
                          )}
                        </ul>
                        {panel.kind === "spotlight" ? (
                          <div className="site-mobile-nav__cta">
                            <p className="site-mobile-nav__cta-title">{panel.cta.title}</p>
                            <p className="site-mobile-nav__cta-desc">
                              {panel.cta.description}
                            </p>
                            <Link
                              href={panel.cta.href}
                              className="site-mobile-nav__cta-button"
                              onClick={close}
                            >
                              {panel.cta.buttonLabel}
                              <span aria-hidden="true"> →</span>
                            </Link>
                          </div>
                        ) : null}
                      </>
                    ) : (
                      <>
                        {panel.intro ? (
                          <p className="site-mobile-nav__intro-desc">
                            {panel.intro.description}
                          </p>
                        ) : null}
                        {panel.columns.map((column) => (
                          <div key={column.id} className="site-mobile-nav__group">
                            <div className="site-mobile-nav__group-head">
                              <NavIconBadge
                                id={column.icon}
                                variant="circle"
                                size={36}
                              />
                              <p className="site-mobile-nav__group-label site-mobile-nav__group-label--inline">
                                {column.title}
                              </p>
                            </div>
                            <ul className="site-mobile-nav__sublist">
                              {column.links.map((link) => (
                                <li key={link.href}>
                                  <Link
                                    href={link.href}
                                    className="site-mobile-nav__sublink"
                                    title={link.title}
                                    onClick={close}
                                  >
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                        {panel.cta ? (
                          <div className="site-mobile-nav__cta">
                            <p className="site-mobile-nav__cta-title">{panel.cta.title}</p>
                            <p className="site-mobile-nav__cta-desc">
                              {panel.cta.description}
                            </p>
                            <Link
                              href={panel.cta.href}
                              className="site-mobile-nav__cta-button"
                              onClick={close}
                            >
                              {panel.cta.buttonLabel}
                              <span aria-hidden="true"> →</span>
                            </Link>
                          </div>
                        ) : null}
                      </>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
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
