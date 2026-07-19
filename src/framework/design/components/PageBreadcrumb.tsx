import Link from "next/link";
import "./page-breadcrumb.css";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageBreadcrumbProps {
  items: BreadcrumbItem[];
}

/** Fil d'Ariane visuel : réutilisable sur guides, calculateurs, FAQ, etc. */
export function PageBreadcrumb({ items }: PageBreadcrumbProps) {
  return (
    <nav aria-label="Fil d'Ariane" className="guide-breadcrumb">
      <ol>
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="guide-breadcrumb__item">
            {index > 0 && (
              <span className="guide-breadcrumb__sep" aria-hidden="true">
                ›
              </span>
            )}
            {item.href ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
