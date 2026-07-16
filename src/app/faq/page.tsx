import { config, seoConfig } from "@/site";
import { JsonLd } from "@/framework/JsonLd";
import { buildPageMetadata } from "@/framework/seo/metadata";
import { buildBreadcrumbSchema, buildWebPageSchema } from "@/framework/seo/json-ld";
import {
  FAQ_PAGE_H1,
  FAQ_PAGE_META,
  FAQ_PAGE_SUBTITLE,
} from "@/site/faq-page-data";
import { FaqPageContent } from "@/site/FaqPageContent";
import { coverToOgInput, coverToSchemaImage, FAQ_COVER } from "@/site/guides/covers";
import { FaqPageSidebar, GuidePageLayout } from "@/site/guides";
import { PageBreadcrumb } from "@/framework/design/components/PageBreadcrumb";
import "@/site/guides/guide-page.css";

const NOINDEX = { index: false, follow: false } as const;

export const metadata = buildPageMetadata(config, seoConfig, {
  title: FAQ_PAGE_META.title,
  description: FAQ_PAGE_META.description,
  path: "/faq",
  ogImage: coverToOgInput(FAQ_COVER),
  robots: NOINDEX,
});

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={[
          buildWebPageSchema(
            config,
            FAQ_PAGE_META.title,
            FAQ_PAGE_META.description,
            "/faq",
            coverToSchemaImage(FAQ_COVER),
          ),
          buildBreadcrumbSchema(config, [
            { name: "Accueil", path: "/" },
            { name: "FAQ Brut vers Net", path: "/faq" },
          ]),
        ]}
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
        <FaqPageContent />
      </GuidePageLayout>
    </>
  );
}
