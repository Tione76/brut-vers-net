import Link from "next/link";
import { config, seoConfig } from "@/site";
import { ContentPageLayout } from "@/framework/layouts/ContentPageLayout";
import { buildPageMetadata } from "@/framework/seo/metadata";

export const metadata = buildPageMetadata(config, seoConfig, {
  title: seoConfig.legal.notFound.title,
  description: seoConfig.legal.notFound.description,
  path: "/404",
  robots: { index: false, follow: true },
  noCanonical: true,
});

export default function NotFound() {
  return (
    <ContentPageLayout
      meta="Erreur"
      title={seoConfig.legal.notFound.title}
      subtitle={seoConfig.legal.notFound.description}
      suppressAds
    >
      <p>
        <Link href="/" className="ds-btn ds-btn--primary">
          Retour à l&apos;accueil
        </Link>
      </p>
      <p>
        Consultez le <Link href="/plan-du-site">plan du site</Link> pour trouver la page
        recherchée.
      </p>
    </ContentPageLayout>
  );
}
