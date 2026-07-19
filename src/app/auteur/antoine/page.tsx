import { config, seoConfig } from "@/site";
import { SITE_AUTHOR } from "@/site/author";
import { AuthorPageContent } from "@/site/author-page-content";
import { FaqPageSidebar, GuidePageLayout } from "@/site/guides";
import { PageBreadcrumb } from "@/framework/design/components/PageBreadcrumb";
import { JsonLd } from "@/framework/JsonLd";
import { buildPageMetadata } from "@/framework/seo/metadata";
import { buildAuthorJsonLd } from "@/site/schema";
import { isPathIndexable } from "@/site/public-pages";
import "@/site/guides/guide-page.css";

const path = SITE_AUTHOR.path;

export const metadata = buildPageMetadata(config, seoConfig, {
  title: SITE_AUTHOR.metaTitle,
  description: SITE_AUTHOR.metaDescription,
  path,
  robots: isPathIndexable(path) ? undefined : { index: false, follow: false },
});

export default function AuthorPage() {
  return (
    <>
      <JsonLd data={buildAuthorJsonLd()} />
      <GuidePageLayout
        title={SITE_AUTHOR.name}
        subtitle={SITE_AUTHOR.pageSubtitle}
        sidebar={<FaqPageSidebar />}
        prose={false}
      >
        <PageBreadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: SITE_AUTHOR.name },
          ]}
        />
        <AuthorPageContent />
      </GuidePageLayout>
    </>
  );
}
