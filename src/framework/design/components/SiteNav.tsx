"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { NavLink } from "@/framework/types";
import type { GuideNavItem } from "@/site/guides/navigation";
import type { ToolNavItem } from "@/site/navigation/tools";
import { GuidesNavMenu } from "@/site/navigation/GuidesNavMenu";
import { ToolsNavMenu } from "@/site/navigation/ToolsNavMenu";
import { SmicNavMenu } from "@/site/navigation/SmicNavMenu";
import { buildHeaderNavEntries } from "@/site/navigation/header-nav";
import {
  MobileNavToggle,
  MobileSiteNav,
} from "@/site/navigation/MobileSiteNav";

export interface SiteLogo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface SiteNavProps {
  siteName: string;
  nav: NavLink[];
  logo?: SiteLogo;
  toolsNavigation?: ToolNavItem[];
  guidesNavigation?: GuideNavItem[];
}

function NavItem({ link }: { link: NavLink }) {
  const pathname = usePathname();
  const isActive =
    link.href === "/" ? pathname === "/" : pathname === link.href || pathname.startsWith(`${link.href}/`);

  return (
    <li>
      {link.external ? (
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="site-nav__link"
        >
          {link.label}
        </a>
      ) : (
        <Link
          href={link.href}
          className={`site-nav__link${isActive ? " site-nav__link--active" : ""}`}
          aria-current={isActive ? "page" : undefined}
        >
          {link.label}
        </Link>
      )}
    </li>
  );
}

export function SiteNav({ siteName, nav, logo, toolsNavigation, guidesNavigation }: SiteNavProps) {
  const pathname = usePathname();
  const showTools = toolsNavigation && toolsNavigation.length > 0;
  const showGuides = guidesNavigation && guidesNavigation.length > 0;
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobilePanelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);

  const mobileEntries = useMemo(
    () =>
      buildHeaderNavEntries({
        toolsNavigation,
        guidesNavigation,
        flatLinks: nav,
      }),
    [toolsNavigation, guidesNavigation, nav],
  );

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <div className={`site-header-bar${mobileOpen ? " site-header-bar--menu-open" : ""}`}>
      <div className="site-header__inner">
        <header className="site-header">
          <Link href="/" className="site-brand" onClick={() => setMobileOpen(false)}>
            {logo ? (
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className="site-brand__logo"
                sizes="(max-width: 639px) 115px, 138px"
                decoding="async"
                priority
              />
            ) : (
              siteName
            )}
          </Link>
          <nav aria-label="Navigation principale" className="site-nav site-nav--desktop">
            <ul>
              {showTools && <ToolsNavMenu key="tools-nav" items={toolsNavigation} />}
              <SmicNavMenu key="smic-nav" />
              {showGuides && <GuidesNavMenu key="guides-nav" items={guidesNavigation} />}
              {nav.map((link) => (
                <NavItem key={link.href} link={link} />
              ))}
            </ul>
          </nav>
          <MobileNavToggle
            open={mobileOpen}
            panelId={mobilePanelId}
            buttonRef={toggleRef}
            onToggle={() => setMobileOpen((value) => !value)}
          />
        </header>
      </div>
      <div className="site-header__inner site-header__inner--mobile-nav">
        <MobileSiteNav
          panelId={mobilePanelId}
          entries={mobileEntries}
          open={mobileOpen}
          onOpenChange={setMobileOpen}
          toggleRef={toggleRef}
        />
      </div>
    </div>
  );
}
