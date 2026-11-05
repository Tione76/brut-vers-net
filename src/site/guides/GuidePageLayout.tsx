"use client";

import {
  Children,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import { PageBreadcrumb } from "@/framework/design/components/PageBreadcrumb";
import { ShareBlock } from "@/framework/design/components/ShareBlock";
import { SiteShell } from "@/framework/design/components/SiteShell";
import { PageFooter } from "@/framework/design/PageFooter";
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
   */
  headerActions?: ReactNode;
  /** Classe additionnelle sur le bandeau (ex. page auteur). */
  headerClassName?: string;
  /**
   * Libellé d'interface au-dessus du fil d'Ariane.
   * `undefined` : « Guide pratique » sur les articles en prose.
   * `null` : aucun libellé (hubs, pages légales, contact).
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

function isBreadcrumbChild(child: ReactElement): boolean {
  return child.type === PageBreadcrumb;
}

function isMetaChild(child: ReactElement): boolean {
  if (child.type === GuideAuthorMeta) return true;
  if (child.type === "p") {
    const props = child.props as { className?: unknown };
    return classTokens(props.className).includes("guide-meta");
  }
  return false;
}

function isShareChild(child: ReactElement): boolean {
  return child.type === GuideMastheadShare || child.type === ShareBlock;
}

/**
 * Sépare fil d'Ariane, métadonnées et partage directs du contenu éditorial.
 * Ne descend pas dans les composants imbriqués (ex. partage rendu par GuideArticle).
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
  const resolvedKicker =
    kicker === undefined
      ? prose && !headerClassName
        ? "Guide pratique"
        : null
      : kicker;
  const showMastheadTop = Boolean(resolvedKicker);
  const { breadcrumbs, metas, shares, editorial } = splitGuideLayoutChildren(children);
  const hasQuickNav = Boolean(headerActions);

  const bodyClass = [
    "article-body",
    "article-body--masthead",
    headerClassName ? "article-body--custom-header" : "",
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
                  {showMastheadTop ? (
                    <div className="guide-masthead-top">
                      <p className="guide-kicker">{resolvedKicker}</p>
                      <div id={GUIDE_SHARE_SLOT_ID} className="guide-masthead-top__share" />
                    </div>
                  ) : null}
                  {/*
                    Sans navigation rapide : fil d'Ariane sous le kicker (en-tête validé).
                    Avec headerActions : titre → meta → fil d'Ariane, puis boutons juste après.
                  */}
                  {hasQuickNav ? null : breadcrumbs}
                  {showTitle ? <h1 className="guide-header__title">{title}</h1> : null}
                  {subtitle ? <p className="guide-header__subtitle">{subtitle}</p> : null}
                  {metas}
                  {hasQuickNav ? breadcrumbs : null}
                  {shares}
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
