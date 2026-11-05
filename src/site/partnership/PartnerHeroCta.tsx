"use client";

import type { MouseEvent } from "react";

type PartnerHeroCtaProps = {
  href: string;
  children: string;
};

/** CTA hero : défilement doux vers le formulaire, respect de prefers-reduced-motion. */
export function PartnerHeroCta({ href, children }: PartnerHeroCtaProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (!href.startsWith("#")) return;
    const id = href.slice(1);
    const target = document.getElementById(id);
    if (!target) return;

    event.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    if (typeof target.focus === "function") {
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    }
  }

  return (
    <a href={href} className="partner-hero__cta" onClick={handleClick}>
      {children}
    </a>
  );
}
