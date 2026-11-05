"use client";

import type { ReactNode } from "react";
import { CompactPageHeader } from "@/framework/design/components/CompactPageHeader";
import { SiteShell } from "@/framework/design/components/SiteShell";
import { PageFooter } from "@/framework/design/PageFooter";

interface ContentPageLayoutProps {
  meta?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  sidebar?: ReactNode;
  prose?: boolean;
}

/** Template officiel : articles, guides, légal, FAQ, 404, etc. */
export function ContentPageLayout({
  meta,
  title,
  subtitle,
  children,
  sidebar,
  prose = true,
}: ContentPageLayoutProps) {
  return (
    <>
      <SiteShell>
        <CompactPageHeader meta={meta} title={title} subtitle={subtitle} />
        <main id="main-content" className="article-page">
          <div className="content-wrap content-wrap--wide">
            <div className="article-layout">
              <div className={prose ? "article-body prose" : "article-body"}>{children}</div>
              {sidebar && (
                <aside className="article-sidebar" aria-label="Contenu complémentaire">
                  {sidebar}
                </aside>
              )}
            </div>
          </div>
        </main>
      </SiteShell>
      <PageFooter />
    </>
  );
}
