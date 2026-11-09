import type { Metadata } from "next";
import { config, seoConfig } from "@/site";
import {
  ACTU_HUB_DESCRIPTION,
  ACTU_HUB_H1,
  ACTU_HUB_PATH,
  ACTU_HUB_TITLE,
  ACTU_RSS_PATH,
  ActuCard,
  getPublishedActuArticles,
} from "@/site/actu";
import "@/site/actu/actu.css";
import { GuidePageLayout } from "@/site/guides";
import { PageBreadcrumb } from "@/framework/design/components/PageBreadcrumb";
import { JsonLd } from "@/framework/JsonLd";
import { buildPageMetadata, getCanonicalUrl } from "@/framework/seo/metadata";
import { buildActuHubJsonLd } from "@/site/schema";

export async function generateMetadata(): Promise<Metadata> {
  const base = buildPageMetadata(config, seoConfig, {
    title: ACTU_HUB_TITLE,
    description: ACTU_HUB_DESCRIPTION,
    path: ACTU_HUB_PATH,
    openGraphType: "website",
  });

  return {
    ...base,
    alternates: {
      ...base.alternates,
      types: {
        "application/rss+xml": getCanonicalUrl(config.url, ACTU_RSS_PATH),
      },
    },
  };
}

export default function ActuHubPage() {
  const articles = getPublishedActuArticles();

  return (
    <>
      <JsonLd
        data={buildActuHubJsonLd({
          name: ACTU_HUB_H1,
          description: ACTU_HUB_DESCRIPTION,
          articles,
        })}
      />
      <GuidePageLayout
        title={ACTU_HUB_H1}
        subtitle="Annonces récentes, sources identifiées, distinction entre annonce et barème applicable."
        prose={false}
      >
        <PageBreadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Actualités" },
          ]}
        />
        <p className="actu-hub-intro">
          Suivez les annonces récentes sur le SMIC, les salaires et le pouvoir
          d&apos;achat. Chaque actualité distingue ce qui a été annoncé, ce qui
          est déjà applicable, et renvoie vers nos guides de référence.
        </p>
        {articles.length === 0 ? (
          <p>Aucune actualité publiée pour le moment.</p>
        ) : (
          <div className="actu-card-list">
            {articles.map((article) => (
              <ActuCard key={article.slug} article={article} />
            ))}
          </div>
        )}
      </GuidePageLayout>
    </>
  );
}
