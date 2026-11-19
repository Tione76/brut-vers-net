"use client";

import Link from "next/link";
import { seoConfig } from "@/site";
import { ContentPageLayout } from "@/framework/layouts/ContentPageLayout";

export default function ErrorPage() {
  return (
    <ContentPageLayout
      meta="Erreur"
      title={seoConfig.legal.error.title}
      subtitle={seoConfig.legal.error.description}
      suppressAds
    >
      <p>
        <Link href="/" className="ds-btn ds-btn--primary">
          Retour à l&apos;accueil
        </Link>
      </p>
    </ContentPageLayout>
  );
}
