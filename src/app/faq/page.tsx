import { config, seoConfig } from "@/site";
import { ContentPageLayout } from "@/framework/layouts/ContentPageLayout";
import { JsonLd } from "@/framework/JsonLd";
import { buildPageMetadata } from "@/framework/seo/metadata";
import { buildBreadcrumbSchema, buildFaqSchema, buildWebPageSchema } from "@/framework/seo/json-ld";
import {
  FAQ_PAGE_H1,
  FAQ_PAGE_META,
  getFaqPageSchemaItems,
} from "@/site/faq-page-data";
import { FaqPageContent } from "@/site/FaqPageContent";
import { FaqPageSidebar } from "@/site/guides/GuidePageSidebar";
import "@/site/guides/guide-page.css";

export const metadata = buildPageMetadata(config, seoConfig, {
  title: FAQ_PAGE_META.title,
  description: FAQ_PAGE_META.description,
  path: "/faq",
});

export default function FaqPage() {
  const faqSchemaItems = getFaqPageSchemaItems();

  return (
    <>
      <JsonLd
        data={[
          buildWebPageSchema(config, FAQ_PAGE_META.title, FAQ_PAGE_META.description, "/faq"),
          buildBreadcrumbSchema(config, [
            { name: "Accueil", path: "/" },
            { name: "FAQ TVA", path: "/faq" },
          ]),
          buildFaqSchema(faqSchemaItems),
        ]}
      />
      <ContentPageLayout
        title={FAQ_PAGE_H1}
        prose={false}
        sidebar={<FaqPageSidebar />}
      >
        <FaqPageContent />
      </ContentPageLayout>
    </>
  );
}
