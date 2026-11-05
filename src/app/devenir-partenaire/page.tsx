import { config, seoConfig } from "@/site";
import { GuidePageLayout } from "@/site/guides";
import { PageBreadcrumb } from "@/framework/design/components/PageBreadcrumb";
import { JsonLd } from "@/framework/JsonLd";
import { buildPageMetadata } from "@/framework/seo/metadata";
import { buildWebPageJsonLd } from "@/site/schema";
import { PartnershipPageContent } from "@/site/partnership/PartnershipPageContent";
import "@/site/partnership/partnership-page.css";

const path = "/devenir-partenaire";
const page = seoConfig.legal.partnership;

export const metadata = buildPageMetadata(config, seoConfig, {
  title: page.title,
  description: page.description,
  path,
});

export default function DevenirPartenairePage() {
  return (
    <>
      <JsonLd
        data={buildWebPageJsonLd({
          path,
          name: page.h1,
          description: page.description,
          breadcrumbs: [
            { name: "Accueil", path: "/" },
            { name: "Devenir partenaire", path },
          ],
        })}
      />
      <GuidePageLayout
        title={page.h1}
        subtitle=""
        prose={false}
        kicker={null}
        showTitle={false}
      >
        <PageBreadcrumb
          items={[{ label: "Accueil", href: "/" }, { label: "Devenir partenaire" }]}
        />
        <PartnershipPageContent />
      </GuidePageLayout>
    </>
  );
}
