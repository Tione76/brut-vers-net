"use client";

import Link from "next/link";
import { useConsent } from "@/framework/SiteProvider";
import type { NavLink } from "@/framework/types";

export interface SiteTool {
  title: string;
  href: string;
}

interface SiteFooterProps {
  brandName: string;
  footerDescription: string;
  tools: SiteTool[];
  footerLinks: NavLink[];
}

function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

export function SiteFooter({
  brandName,
  footerDescription,
  tools,
  footerLinks,
}: SiteFooterProps) {
  const { openPreferences } = useConsent();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="content-wrap">
        <div className="site-footer__main">
          <div className="site-footer__brand">
            <p className="site-footer__name">{brandName}</p>
            <p className="site-footer__desc">{footerDescription}</p>
          </div>

          {tools.length > 0 && (
            <div className="site-footer__tools">
              <p className="site-footer__heading">Autres ressources</p>
              <ul className="site-footer__tool-links">
                {tools.map((tool) => (
                  <li key={tool.href}>
                    {isExternalHref(tool.href) ? (
                      <a
                        href={tool.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {tool.title}
                      </a>
                    ) : (
                      <Link href={tool.href}>{tool.title}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <nav className="site-footer__legal" aria-label="Informations légales">
          {footerLinks.map((link, i) => (
            <span key={link.href} className="site-footer__legal-item">
              {i > 0 && (
                <span className="site-footer__sep" aria-hidden="true">
                  •
                </span>
              )}
              <Link href={link.href}>{link.label}</Link>
            </span>
          ))}
          <span className="site-footer__legal-item">
            <span className="site-footer__sep" aria-hidden="true">
              •
            </span>
            <button type="button" onClick={openPreferences}>
              Gérer les cookies
            </button>
          </span>
        </nav>

        <p className="site-footer__copy">
          © {year} {brandName}. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
