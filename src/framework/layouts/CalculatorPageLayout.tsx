"use client";

import type { ComponentType } from "react";
import Link from "next/link";
import { useSite, CalculatorProvider } from "@/framework/SiteProvider";
import { AdSlot } from "@/framework/AdSlot";
import { SiteNav } from "@/framework/design/components/SiteNav";
import { HeaderCurveDown } from "@/framework/design/components/Curves";
import { PageFooter } from "@/framework/design/PageFooter";
import { HomePageSidebar } from "@/site/guides/GuidePageSidebar";
import { hasSidebarContent } from "@/site/guides/sidebar";
import { HomeEditorial } from "@/site/home-editorial";
import { HomeFaqContent } from "@/site/home-faq";
import "@/framework/design/index.css";
import "@/site/guides/guide-page.css";

interface CalculatorPageLayoutProps {
  Calculator: ComponentType;
}

function CalculatorHero({ Calculator }: { Calculator: ComponentType }) {
  return (
    <div className="calc-tool calc-tool--salary">
      <Calculator />
      <p className="calc-disclaimer">
        Cette simulation fournit une estimation indicative. Le montant réel peut varier selon votre
        situation, votre contrat, votre régime et les retenues appliquées.
      </p>
    </div>
  );
}

function CalculatorPageInner({ Calculator }: CalculatorPageLayoutProps) {
  const site = useSite();
  const showSidebar = hasSidebarContent({ pageType: "home", currentPath: "/" });

  return (
    <>
      <section className="tool-header tool-header--salary-compact">
        <SiteNav
          siteName={site.name}
          nav={site.navigation.header}
          logo={site.logo}
          guidesNavigation={site.guidesNavigation}
          toolsNavigation={site.toolsNavigation}
        />
        <div className="tool-header__inner">
          <h1 className="tool-header__title tool-header__title--sentence">{site.home.h1}</h1>
          <div className="calc-stage">
            <CalculatorHero Calculator={Calculator} />
          </div>
        </div>
        <HeaderCurveDown />
      </section>

      <main id="main-content" className="content-main">
        <div className="content-wrap content-wrap--wide home-with-sidebar">
          <div className={`article-layout${showSidebar ? "" : " article-layout--single"}`}>
            <div className="home-with-sidebar__main">
              <HomeEditorial />

        {site.blogPosts.length > 0 && (
          <section id="blog" className="content-section content-section--border">
            <div className="content-wrap">
              <div className="section-heading">
                <div>
                  <p className="section-eyebrow section-eyebrow--dark">Blog</p>
                  <h2 className="section-title section-title--dark">Derniers articles</h2>
                </div>
              </div>
              <div className="blog-grid">
                {site.blogPosts.map((post) => (
                  <article key={post.title} className="blog-card">
                    <div className="blog-card__thumb">
                      <span className="blog-card__meta">
                        {post.date} · {post.readTime}
                      </span>
                    </div>
                    <div className="blog-card__body">
                      <h3 className="blog-card__title">
                        <Link href={post.href}>{post.title}</Link>
                      </h3>
                      <p className="blog-card__excerpt">{post.excerpt}</p>
                      <Link href={post.href} className="blog-card__cta">
                        Lire l&apos;article →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        <div className="content-wrap">
          <AdSlot position="after-result" />
        </div>

        <section id="faq" className="content-section content-section--border">
          <div className="content-wrap">
            <p className="section-eyebrow section-eyebrow--dark">FAQ</p>
            <h2 className="section-title section-title--dark">
              Questions fréquentes sur le salaire Brut vers Net
            </h2>
            <HomeFaqContent />
          </div>
        </section>
            </div>
            {showSidebar && <HomePageSidebar />}
          </div>
        </div>
      </main>

      <div className="content-wrap">
        <AdSlot position="before-footer" />
      </div>

      <PageFooter />
    </>
  );
}

export function CalculatorPageLayout({ Calculator }: CalculatorPageLayoutProps) {
  return (
    <CalculatorProvider>
      <CalculatorPageInner Calculator={Calculator} />
    </CalculatorProvider>
  );
}
