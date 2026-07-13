"use client";

import type { ReactNode } from "react";
import { useSite } from "@/framework/SiteProvider";
import { SiteNav } from "@/framework/design/components/SiteNav";
import { HeaderCurveDown } from "@/framework/design/components/Curves";
import { PageFooter } from "@/framework/design/PageFooter";
import "@/framework/design/index.css";
import "./guide-page.css";

interface GuidePageLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  sidebar?: ReactNode;
  prose?: boolean;
}

/** Layout dédié aux guides : header hero, sans nom de site au-dessus du H1 */
export function GuidePageLayout({
  title,
  subtitle,
  children,
  sidebar,
  prose = true,
}: GuidePageLayoutProps) {
  const site = useSite();

  return (
    <>
      <section className="guide-header">
        <SiteNav
          siteName={site.name}
          nav={site.navigation.header}
          logo={site.logo}
          guidesNavigation={site.guidesNavigation}
          toolsNavigation={site.toolsNavigation}
        />
        <div className="guide-header__inner">
          <h1 className="guide-header__title">{title}</h1>
          <p className="guide-header__subtitle">{subtitle}</p>
        </div>
        <HeaderCurveDown />
      </section>

      <main id="main-content" className="article-page">
        <div className="content-wrap content-wrap--wide">
          <div className={`article-layout${sidebar ? "" : " article-layout--single"}`}>
            <div className={prose ? "article-body prose" : "article-body"}>{children}</div>
            {sidebar}
          </div>
        </div>
      </main>

      <PageFooter />
    </>
  );
}
