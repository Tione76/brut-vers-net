import { config, seoConfig } from "@/site";
import { FaqPageSidebar, GuidePageLayout } from "@/site/guides";
import { PrivacyPolicyContent } from "@/site/legal/privacy-policy-content";
import { PageBreadcrumb } from "@/framework/design/components/PageBreadcrumb";
import { JsonLd } from "@/framework/JsonLd";
import { buildPageMetadata } from "@/framework/seo/metadata";
import { buildWebPageJsonLd } from "@/site/schema";
import "@/site/guides/guide-page.css";

const page = seoConfig.legal.privacy;
const path = "/politique-de-confidentialite";
const metaDescription = page.metaDescription ?? page.description;

export const metadata = buildPageMetadata(config, seoConfig, {
  title: page.title,
  description: metaDescription,
  path,
});

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={buildWebPageJsonLd({
          path,
          name: page.title,
          description: metaDescription,
          breadcrumbs: [
            { name: "Accueil", path: "/" },
            { name: page.title, path },
          ],
        })}
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
        <p className="guide-meta">
          <em>Dernière mise à jour : juillet 2026</em>
        </p>
        <PrivacyPolicyContent />
      </GuidePageLayout>
    </>
  );
}
