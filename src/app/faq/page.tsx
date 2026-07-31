import { config, seoConfig } from "@/site";
import { JsonLd } from "@/framework/JsonLd";
import { buildPageMetadata, getCanonicalUrl } from "@/framework/seo/metadata";
import {
  FAQ_PAGE_H1,
  FAQ_PAGE_META,
  FAQ_PAGE_SUBTITLE,
  getFaqPageSchemaItems,
} from "@/site/faq-page-data";
import { FaqPageContent } from "@/site/FaqPageContent";
import { coverToOgInput, FAQ_COVER } from "@/site/guides/covers";
import { FaqPageSidebar, GuidePageLayout } from "@/site/guides";
import { PageBreadcrumb } from "@/framework/design/components/PageBreadcrumb";
import { buildWebPageJsonLd } from "@/site/schema";
import "@/site/guides/guide-page.css";

const path = "/faq";

export const metadata = buildPageMetadata(config, seoConfig, {
  title: FAQ_PAGE_META.title,
  description: FAQ_PAGE_META.description,
  path,
  ogImage: coverToOgInput(FAQ_COVER),
});

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={buildWebPageJsonLd({
          path,
          name: FAQ_PAGE_META.title,
          description: FAQ_PAGE_META.description,
          breadcrumbs: [
            { name: "Accueil", path: "/" },
            { name: "FAQ", path },
          ],
          cover: FAQ_COVER,
          faq: getFaqPageSchemaItems(),
        })}
      />
      <GuidePageLayout
        title={FAQ_PAGE_H1}
        subtitle={FAQ_PAGE_SUBTITLE}
        prose={false}
        sidebar={<FaqPageSidebar />}
      >
        <PageBreadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "FAQ" },
          ]}
        />
        <FaqPageContent
          share={{
            url: getCanonicalUrl(config.url, path),
            title: FAQ_PAGE_META.title,
            description: FAQ_PAGE_META.description,
          }}
        />
      </GuidePageLayout>
    </>
  );
}
