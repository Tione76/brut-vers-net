"use client";

import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageBreadcrumbProps {
  items: BreadcrumbItem[];
}

function HomeIcon() {
  return (
    <svg
      className="guide-breadcrumb__home"
      width="14"
      height="14"
      viewBox="0 0 16 16"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M2.5 7.2 8 2.4l5.5 4.8V13a1 1 0 0 1-1 1H9.2V10H6.8v4H3.5a1 1 0 0 1-1-1V7.2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Fil d'Ariane visuel : réutilisable sur guides, calculateurs, FAQ, etc. */
export function PageBreadcrumb({ items }: PageBreadcrumbProps) {
  return (
    <nav aria-label="Fil d'Ariane" className="guide-breadcrumb">
      <ol>
        {items.map((item, index) => {
          const isHome = item.label === "Accueil" && item.href === "/";
          return (
            <li key={`${item.label}-${index}`} className="guide-breadcrumb__item">
              {index > 0 && (
                <span className="guide-breadcrumb__sep" aria-hidden="true">
                  ›
                </span>
              )}
              {item.href ? (
                <Link href={item.href}>
                  {isHome ? <HomeIcon /> : null}
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page">{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
