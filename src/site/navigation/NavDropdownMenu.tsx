"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";

export interface NavDropdownItem {
  href: string;
  shortTitle: string;
  title: string;
  /** Lien de pied de menu (hub) : séparateur + style distinct. */
  variant?: "hub";
}

interface NavDropdownMenuProps {
  label: string;
  menuAriaLabel: string;
  items: NavDropdownItem[];
}

const MOBILE_MQ = "(max-width: 639px)";

function isItemActive(pathname: string, href: string, exact = false): boolean {
  if (exact || href === "/") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavDropdownMenu({ label, menuAriaLabel, items }: NavDropdownMenuProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const menuId = useId();
  const containerRef = useRef<HTMLLIElement>(null);

  const isSectionActive = items.some((item) =>
    isItemActive(pathname, item.href, item.variant === "hub"),
  );

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MQ);
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  useEffect(() => {
    if (!open || !isMobile) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) close();
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open, isMobile, close]);

  const toggle = () => {
    if (isMobile) setOpen((value) => !value);
  };

  const handleMouseEnter = () => {
    if (!isMobile) setOpen(true);
  };

  const handleMouseLeave = () => {
    if (!isMobile) setOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Escape") {
      close();
      return;
    }
    if (!isMobile && (event.key === "ArrowDown" || event.key === " ")) {
      event.preventDefault();
      setOpen(true);
    }
  };

  const dropdownClass = [
    "site-nav__dropdown",
    open ? "site-nav__dropdown--open" : "",
    isSectionActive ? "site-nav__dropdown--active" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <li
      ref={containerRef}
      className={dropdownClass}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        className={`site-nav__dropdown-trigger${isSectionActive ? " site-nav__link--active" : ""}`}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={menuId}
        aria-current={isSectionActive ? "true" : undefined}
        onClick={toggle}
        onKeyDown={handleKeyDown}
      >
        {label}
        <span className="site-nav__dropdown-chevron" aria-hidden="true">
          ▾
        </span>
      </button>
      <ul id={menuId} className="site-nav__dropdown-menu" role="menu" aria-label={menuAriaLabel}>
        {items.map((item) => {
          const isHub = item.variant === "hub";
          const isActive = isItemActive(pathname, item.href, isHub);
          return (
            <li
              key={item.href}
              role="none"
              className={isHub ? "site-nav__dropdown-item--hub" : undefined}
            >
              <Link
                href={item.href}
                className={[
                  "site-nav__dropdown-link",
                  isHub ? "site-nav__dropdown-link--hub" : "",
                  isActive ? "site-nav__dropdown-link--active" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                role="menuitem"
                title={item.title}
                aria-current={isActive ? "page" : undefined}
                onClick={close}
              >
                <span>{item.shortTitle}</span>
                {isHub ? (
                  <span className="site-nav__dropdown-hub-arrow" aria-hidden="true" />
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </li>
  );
}
