"use client";

import Link from "next/link";
import { CmpPreferencesLink } from "@/framework/CmpPreferencesLink";
import type { NavLink } from "@/framework/types";

interface SiteFooterProps {
  brandName: string;
  footerDescription: string;
  footerLinks: NavLink[];
}

function FooterBrandName({ name }: { name: string }) {
  if (name.startsWith("BRUT")) {
    return (
      <>
        <span className="site-footer__name-accent">BRUT</span>
        <span className="site-footer__name-rest">{name.slice(4)}</span>
      </>
    );
  }

  return name;
}

export function SiteFooter({
  brandName,
  footerDescription,
  footerLinks,
}: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="content-wrap content-wrap--wide">
        <div className="site-footer__brand">
          <p className="site-footer__name">
            <FooterBrandName name={brandName} />
          </p>
          <p className="site-footer__tagline">Salaires, droits et simulateurs</p>
          <p className="site-footer__desc">{footerDescription}</p>
        </div>

        <nav className="site-footer__legal" aria-label="Informations légales">
          {footerLinks.map((link) => (
            <span key={link.href} className="site-footer__legal-item">
              <Link href={link.href}>{link.label}</Link>
              <span className="site-footer__sep" aria-hidden="true">
                •
              </span>
            </span>
          ))}
          <span className="site-footer__legal-item">
            <CmpPreferencesLink>Gérer les cookies</CmpPreferencesLink>
          </span>
        </nav>

        <p className="site-footer__copy">
          © {year} {brandName}. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
