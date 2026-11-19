"use client";

import { useConsent } from "@/framework/SiteProvider";
import { SIRDATA_DISPLAY_UI_HREF } from "@/framework/consent/sirdata-cmp";

type CmpPreferencesLinkProps = {
  /** Libellé texte uniquement (HTML injecté pour conserver href javascript: détectable par Sirdata). */
  children: string;
  className?: string;
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/**
 * Lien `href=javascript:…displayUI()` rendu en HTML brut.
 * React neutralise sinon les URL `javascript:` ; Sirdata exige ce href synchrone
 * pour le mode « Gérer dans le footer ».
 */
export function CmpPreferencesLink({ children, className }: CmpPreferencesLinkProps) {
  const { openPreferences } = useConsent();
  const classAttr = className ? ` class="${escapeHtml(className)}"` : "";

  return (
    <span
      role="presentation"
      onClick={() => {
        openPreferences();
      }}
      dangerouslySetInnerHTML={{
        __html: `<a href="${SIRDATA_DISPLAY_UI_HREF}"${classAttr}>${escapeHtml(children)}</a>`,
      }}
    />
  );
}
