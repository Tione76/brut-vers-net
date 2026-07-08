import { config, seoConfig } from "@/site";
import { getPlanDuSiteSections } from "@/site/public-pages";
import { FaqPageSidebar, GuidePageLayout } from "@/site/guides";
import { SitemapPageContent } from "@/site/sitemap/SitemapPageContent";
import { PageBreadcrumb } from "@/framework/design/components/PageBreadcrumb";
import { JsonLd } from "@/framework/JsonLd";
import { buildPageMetadata } from "@/framework/seo/metadata";
import { buildBreadcrumbSchema, buildWebPageSchema } from "@/framework/seo/json-ld";
import "@/site/guides/guide-page.css";

const page = seoConfig.legal.sitemap;
const path = "/plan-du-site";
const metaDescription = page.metaDescription ?? page.description;

export const metadata = buildPageMetadata(config, seoConfig, {
  title: page.title,
  description: metaDescription,
  path,
});

export default function SitemapPage() {
  const sections = getPlanDuSiteSections();

  return (
    <>
      <JsonLd
        data={[
          buildWebPageSchema(config, page.title, metaDescription, path),
          buildBreadcrumbSchema(config, [
            { name: "Accueil", path: "/" },
            { name: page.title, path },
          ]),
        ]}
      />
      <GuidePageLayout
        title={page.title}
        subtitle={page.description}
        sidebar={<FaqPageSidebar />}
      >
        <PageBreadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: page.title },
          ]}
        />
        <SitemapPageContent sections={sections} />
      </GuidePageLayout>
    </>
  );
}
