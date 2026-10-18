"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from "react";
import type { NavLink } from "@/framework/types";
import type { GuideNavItem } from "@/site/guides/navigation";
import type { ToolNavItem } from "@/site/navigation/tools";
import {
  getMainNavItems,
  isPathMatched,
  type MainNavItem,
} from "@/site/navigation/main-nav-data";
import { NavIconBadge } from "@/site/navigation/NavIcons";
import {
  MegaMenuPanel,
  SimpleDropdownPanel,
  SpotlightPanel,
} from "@/site/navigation/MegaMenuPanel";
import {
  MobileNavToggle,
  MobileSiteNav,
} from "@/site/navigation/MobileSiteNav";
import { SiteSearch } from "@/site/navigation/SiteSearch";

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

/** Fermeture seule : délai confortable à la sortie réelle du header. */
const HOVER_CLOSE_DELAY_MS = 180;
const DESKTOP_MQ = "(min-width: 1100px)";
const FINE_HOVER_MQ = "(hover: hover) and (pointer: fine)";

/**
 * Identité temporaire en texte (proportions maquette).
 * Remplacer par <Image> sur public/logo.svg quand le fichier définitif est prêt.
 */
function BrandMark() {
  return (
    <span className="site-brand__mark">
      <span className="site-brand__name">
        <span className="site-brand__brut">BRUT</span>
        <span className="site-brand__rest">-VERS-NET</span>
      </span>
      <span className="site-brand__tagline">Salaires, droits et simulateurs</span>
    </span>
  );
}

function DesktopNavItem({
  item,
  openId,
  openMenu,
  closeMenu,
  hoverEnabled,
}: {
  item: MainNavItem;
  openId: string | null;
  openMenu: (id: string) => void;
  closeMenu: () => void;
  hoverEnabled: boolean;
}) {
  const pathname = usePathname();
  const panelId = useId();
  const isOpen = openId === item.id;
  const isCurrent = isPathMatched(pathname, item.matchPaths);

  if (item.kind === "link") {
    return (
      <li className="mh-item">
        <Link
          href={item.href}
          className={`mh-link${isCurrent ? " is-current" : ""}`}
          aria-current={isCurrent ? "page" : undefined}
          onPointerEnter={(event) => {
            if (hoverEnabled && event.pointerType === "mouse") closeMenu();
          }}
        >
          <NavIconBadge id={item.icon} variant="square" />
          {item.label}
        </Link>
      </li>
    );
  }

  const panelKind = item.panel.kind;
  const isCalcLayout =
    panelKind === "mega" && item.panel.kind === "mega" && item.panel.layout === "calc";

  return (
    <li className={`mh-item mh-item--${panelKind}${isOpen ? " is-open" : ""}`}>
      <button
        type="button"
        className={`mh-trigger${isOpen ? " is-open" : ""}${isCurrent ? " is-current" : ""}`}
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-haspopup="true"
        onPointerEnter={(event) => {
          /* Souris fine uniquement : le tactile reste au clic. */
          if (hoverEnabled && event.pointerType === "mouse") openMenu(item.id);
        }}
        onClick={() => (isOpen ? closeMenu() : openMenu(item.id))}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            closeMenu();
            return;
          }
          if (event.key === "ArrowDown" || event.key === " ") {
            event.preventDefault();
            openMenu(item.id);
          }
        }}
      >
        <NavIconBadge id={item.icon} variant="square" />
        {item.label}
        <span className="mh-trigger__chevron" aria-hidden="true" />
      </button>
      <div
        id={panelId}
        className={`mh-panel mh-panel--${panelKind}${isCalcLayout ? " mh-panel--calc" : ""}`}
        hidden={!isOpen}
      >
        <div className="mh-panel__card">
          {panelKind === "mega" ? (
            <MegaMenuPanel panel={item.panel} onNavigate={closeMenu} />
          ) : panelKind === "spotlight" ? (
            <SpotlightPanel panel={item.panel} onNavigate={closeMenu} />
          ) : (
            <SimpleDropdownPanel panel={item.panel} onNavigate={closeMenu} />
          )}
        </div>
      </div>
    </li>
  );
}

export function SiteNav({ siteName }: SiteNavProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [hoverEnabled, setHoverEnabled] = useState(false);
  const mobilePanelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navItems = useMemo(() => getMainNavItems(), []);

  const cancelClose = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const closeMenu = useCallback(() => {
    cancelClose();
    setOpenId(null);
  }, [cancelClose]);

  /** Ouverture immédiate : remplace l'éventuel menu déjà ouvert (pas de timer par item). */
  const openMenu = useCallback(
    (id: string) => {
      cancelClose();
      setOpenId(id);
    },
    [cancelClose],
  );

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimerRef.current = setTimeout(() => {
      setOpenId(null);
      closeTimerRef.current = null;
    }, HOVER_CLOSE_DELAY_MS);
  }, [cancelClose]);

  useEffect(() => () => cancelClose(), [cancelClose]);

  useEffect(() => {
    setMobileOpen(false);
    closeMenu();
  }, [pathname, closeMenu]);

  useEffect(() => {
    const desktopMq = window.matchMedia(DESKTOP_MQ);
    const hoverMq = window.matchMedia(FINE_HOVER_MQ);
    const sync = () => {
      setIsDesktop(desktopMq.matches);
      setHoverEnabled(desktopMq.matches && hoverMq.matches);
    };
    sync();
    desktopMq.addEventListener("change", sync);
    hoverMq.addEventListener("change", sync);
    return () => {
      desktopMq.removeEventListener("change", sync);
      hoverMq.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!openId || !isDesktop) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      const root = document.querySelector(".site-header");
      if (root && !root.contains(target)) closeMenu();
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [openId, isDesktop, closeMenu]);

  return (
    <div className={`site-header-bar${mobileOpen ? " site-header-bar--menu-open" : ""}`}>
      <div className="site-header__inner site-header__inner--chrome">
        <header
          className={`site-header${openId ? " is-menu-open" : ""}`}
          onPointerEnter={(event) => {
            if (hoverEnabled && event.pointerType === "mouse") cancelClose();
          }}
          onPointerLeave={(event) => {
            if (hoverEnabled && event.pointerType === "mouse") scheduleClose();
          }}
        >
          <Link
            href="/"
            className="site-brand"
            aria-label={`${siteName}, accueil`}
            onClick={() => setMobileOpen(false)}
            onPointerEnter={(event) => {
              if (hoverEnabled && event.pointerType === "mouse") closeMenu();
            }}
          >
            <BrandMark />
            <span className="site-brand__divider" aria-hidden="true" />
          </Link>

          <nav aria-label="Navigation principale" className="site-nav site-nav--desktop">
            <ul>
              {navItems.map((item) => (
                <DesktopNavItem
                  key={item.id}
                  item={item}
                  openId={openId}
                  openMenu={openMenu}
                  closeMenu={closeMenu}
                  hoverEnabled={hoverEnabled}
                />
              ))}
            </ul>
          </nav>

          <div
            className="site-header__actions"
            onPointerEnter={(event) => {
              if (hoverEnabled && event.pointerType === "mouse") closeMenu();
            }}
          >
            <SiteSearch onOpenChange={(open) => open && closeMenu()} />
            <MobileNavToggle
              open={mobileOpen}
              panelId={mobilePanelId}
              buttonRef={toggleRef as RefObject<HTMLButtonElement | null>}
              onToggle={() => setMobileOpen((value) => !value)}
            />
          </div>
        </header>
      </div>

      <MobileSiteNav
        panelId={mobilePanelId}
        items={navItems}
        open={mobileOpen}
        onOpenChange={setMobileOpen}
        toggleRef={toggleRef}
      />
    </div>
  );
}
