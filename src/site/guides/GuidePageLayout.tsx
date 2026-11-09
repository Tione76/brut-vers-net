"use client";

import {
  Children,
  cloneElement,
  Fragment,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import { PageBreadcrumb } from "@/framework/design/components/PageBreadcrumb";
import { ShareBlock } from "@/framework/design/components/ShareBlock";
import { SiteShell } from "@/framework/design/components/SiteShell";
import { PageFooter } from "@/framework/design/PageFooter";
import { ActuAuthorMeta } from "@/site/actu/ActuAuthorMeta";
import { GuideAuthorMeta } from "./GuideAuthorMeta";
import { GUIDE_SHARE_SLOT_ID, GuideMastheadShare } from "./GuideMastheadShare";

interface GuidePageLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  sidebar?: ReactNode;
  prose?: boolean;
  /**
   * Navigation rapide (ancres / liens de cocon) :
   * après le fil d'Ariane affiché, avant le premier paragraphe éditorial.
   * Présence = page mixte guide + simulateur : conserver l'en-tête historique.
   */
  headerActions?: ReactNode;
  /** Classe additionnelle sur le bandeau (ex. page auteur). */
  headerClassName?: string;
  /**
   * Libellé d'interface au-dessus du fil d'Ariane.
   * Conservé uniquement pour les pages mixtes (`headerActions`).
   * `undefined` sur une page mixte : « Guide pratique ».
   * `null` / pages hors mixte : aucun libellé.
   */
  kicker?: string | null;
  /**
   * Affiche le H1 du layout (défaut true).
   * Utile quand la page porte son propre H1 dans le contenu (ex. partenaire).
   */
  showTitle?: boolean;
}

function classTokens(className: unknown): string[] {
  if (typeof className !== "string") return [];
  return className.split(/\s+/).filter(Boolean);
}

/** Nom de composant stable malgré la sérialisation RSC (références client). */
function elementTypeName(type: unknown): string | null {
  if (typeof type === "string") return type;
  if (typeof type === "function") {
    const fn = type as { displayName?: string; name?: string };
    return fn.displayName || fn.name || null;
  }
  if (type && typeof type === "object") {
    const ref = type as { displayName?: string; name?: string };
    return ref.displayName || ref.name || null;
  }
  return null;
}

function isBreadcrumbItemList(items: unknown): boolean {
  if (!Array.isArray(items) || items.length === 0) return false;
  return items.every(
    (item) =>
      item != null &&
      typeof item === "object" &&
      "label" in item &&
      typeof (item as { label: unknown }).label === "string",
  );
}

function isBreadcrumbChild(child: ReactElement): boolean {
  if (child.type === PageBreadcrumb) return true;
  const name = elementTypeName(child.type);
  if (name === "PageBreadcrumb") return true;
  /**
   * Enfants issus d'une Server Component : `type === PageBreadcrumb` échoue.
   * PageBreadcrumb n'expose que `items: { label, href? }[]`.
   */
  const props = child.props as {
    items?: unknown;
    updatedAt?: unknown;
    url?: unknown;
    title?: unknown;
  };
  if ("updatedAt" in props || "url" in props || "title" in props) return false;
  return isBreadcrumbItemList(props.items);
}

function isMetaChild(child: ReactElement): boolean {
  if (child.type === GuideAuthorMeta || child.type === ActuAuthorMeta) return true;
  const name = elementTypeName(child.type);
  if (name === "GuideAuthorMeta" || name === "ActuAuthorMeta") return true;
  if (child.type === "p") {
    const props = child.props as { className?: unknown };
    return classTokens(props.className).includes("guide-meta");
  }
  const props = child.props as {
    updatedAt?: unknown;
    publishedAt?: unknown;
    items?: unknown;
    url?: unknown;
  };
  if (typeof props.publishedAt === "string" && !("items" in props) && !("url" in props)) {
    return true;
  }
  return typeof props.updatedAt === "string" && !("items" in props) && !("url" in props);
}

function isShareChild(child: ReactElement): boolean {
  if (child.type === GuideMastheadShare || child.type === ShareBlock) return true;
  const name = elementTypeName(child.type);
  if (name === "GuideMastheadShare" || name === "ShareBlock") return true;
  const props = child.props as { url?: unknown; layout?: unknown; items?: unknown };
  return typeof props.url === "string" && "layout" in props && !("items" in props);
}

/**
 * Remonte un fil d'Ariane placé en tête d'un wrapper DOM (fiches / hubs de série),
 * sans modifier les composants React personnalisés.
 */
function peelLeadingBreadcrumb(wrapper: ReactElement): {
  breadcrumb: ReactElement | null;
  element: ReactElement;
} {
  const props = wrapper.props as { children?: ReactNode };
  const kids = Children.toArray(props.children);
  if (kids.length === 0) {
    return { breadcrumb: null, element: wrapper };
  }

  const first = kids[0];
  if (!isValidElement(first) || !isBreadcrumbChild(first)) {
    return { breadcrumb: null, element: wrapper };
  }

  return {
    breadcrumb: first,
    element: cloneElement(wrapper, undefined, kids.slice(1)),
  };
}

/**
 * Sépare fil d'Ariane, métadonnées et partage du contenu éditorial.
 * Ne descend pas dans les composants React personnalisés.
 */
function splitGuideLayoutChildren(children: ReactNode): {
  breadcrumbs: ReactNode[];
  metas: ReactNode[];
  shares: ReactNode[];
  editorial: ReactNode[];
} {
  const breadcrumbs: ReactNode[] = [];
  const metas: ReactNode[] = [];
  const shares: ReactNode[] = [];
  const editorial: ReactNode[] = [];

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) {
      editorial.push(child);
      return;
    }
    if (isBreadcrumbChild(child)) {
      breadcrumbs.push(child);
      return;
    }
    if (isMetaChild(child)) {
      metas.push(child);
      return;
    }
    if (isShareChild(child)) {
      shares.push(child);
      return;
    }
    if (typeof child.type === "string" || child.type === Fragment) {
      const peeled = peelLeadingBreadcrumb(child);
      if (peeled.breadcrumb) {
        breadcrumbs.push(peeled.breadcrumb);
      }
      editorial.push(peeled.element);
      return;
    }
    editorial.push(child);
  });

  return { breadcrumbs, metas, shares, editorial };
}

/** Layout dédié aux guides : panneau blanc, sans bandeau orange. */
export function GuidePageLayout({
  title,
  subtitle,
  children,
  sidebar,
  prose = true,
  headerActions,
  headerClassName,
  kicker,
  showTitle = true,
}: GuidePageLayoutProps) {
  /** Pages mixtes guide + simulateur : ne pas changer leur en-tête. */
  const isMixedToolGuide = Boolean(headerActions);
  const resolvedKicker = isMixedToolGuide
    ? kicker === undefined
      ? prose && !headerClassName
        ? "Guide pratique"
        : null
      : kicker
    : kicker === undefined
      ? null
      : kicker;

  const { breadcrumbs, metas, shares, editorial } = splitGuideLayoutChildren(children);
  const hasBreadcrumbs = breadcrumbs.length > 0;
  /** Slot desktop pour GuideMastheadShare rendu dans le corps (articles prose). */
  const needsShareSlot = isMixedToolGuide
    ? Boolean(resolvedKicker)
    : prose || shares.length > 0;

  const bodyClass = [
    "article-body",
    "article-body--masthead",
    headerClassName ? "article-body--custom-header" : "",
    !isMixedToolGuide && hasBreadcrumbs ? "article-body--breadcrumb-top" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <SiteShell>
        <main id="main-content" className="article-page" tabIndex={-1}>
          <div className="content-wrap content-wrap--wide">
            <div className={`article-layout${sidebar ? "" : " article-layout--single"}`}>
              <div className={bodyClass}>
                <header className="guide-masthead">
                  {isMixedToolGuide ? (
                    <>
                      {resolvedKicker ? (
                        <div className="guide-masthead-top">
                          <p className="guide-kicker">{resolvedKicker}</p>
                          <div
                            id={GUIDE_SHARE_SLOT_ID}
                            className="guide-masthead-top__share"
                          />
                        </div>
                      ) : null}
                      {/*
                        Mixte : titre → meta → fil d'Ariane, puis CTAs hors en-tête.
                        Disposition historique conservée.
                      */}
                      {showTitle ? <h1 className="guide-header__title">{title}</h1> : null}
                      {subtitle ? (
                        <p className="guide-header__subtitle">{subtitle}</p>
                      ) : null}
                      {metas}
                      {breadcrumbs}
                      {shares}
                    </>
                  ) : (
                    <>
                      {hasBreadcrumbs || needsShareSlot ? (
                        <div className="guide-masthead-top">
                          <div className="guide-masthead-top__trail">
                            {breadcrumbs}
                          </div>
                          {needsShareSlot ? (
                            <div
                              id={GUIDE_SHARE_SLOT_ID}
                              className="guide-masthead-top__share"
                            />
                          ) : null}
                        </div>
                      ) : null}
                      {showTitle ? <h1 className="guide-header__title">{title}</h1> : null}
                      {subtitle ? (
                        <p className="guide-header__subtitle">{subtitle}</p>
                      ) : null}
                      {metas}
                      {shares}
                    </>
                  )}
                </header>

                {headerActions}
                {prose ? <div className="prose">{editorial}</div> : editorial}
              </div>
              {sidebar}
            </div>
          </div>
        </main>
      </SiteShell>
      <PageFooter />
    </>
  );
}
