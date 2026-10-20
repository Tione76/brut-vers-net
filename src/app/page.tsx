import { config, seoConfig, Calculator } from "@/site";
import { coverToOgInput, HOME_COVER } from "@/site/guides/covers";
import { GuideAuthorMeta } from "@/site/guides";
import { CalculatorPageLayout } from "@/framework/layouts/CalculatorPageLayout";
import { JsonLd } from "@/framework/JsonLd";
import { buildPageMetadata, getCanonicalUrl } from "@/framework/seo/metadata";
import { buildHomeJsonLd } from "@/site/schema";
import {
  CALCULATOR_EDITORIAL_UPDATED_AT,
  computeCalculatorEditorialReadingTime,
} from "@/site/calculator-editorial-meta";

const path = "/";
const homeReadingTime = computeCalculatorEditorialReadingTime([
  "src/site/home-editorial.tsx",
  "src/site/home-editorial-data.ts",
  "src/site/home-faq.tsx",
  "src/site/home-faq-data.ts",
  "src/site/home-official-sources.tsx",
]);

export const metadata = buildPageMetadata(config, seoConfig, {
  title: seoConfig.home.title,
  description: seoConfig.home.description,
  path,
  ogImage: coverToOgInput(HOME_COVER),
});

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={buildHomeJsonLd({
          name: seoConfig.home.title,
          description: seoConfig.home.description,
          cover: HOME_COVER,
          faq: config.faq,
          dateModified: CALCULATOR_EDITORIAL_UPDATED_AT,
        })}
      />
      <CalculatorPageLayout
        Calculator={Calculator}
        authorMeta={
          <GuideAuthorMeta
            updatedAt={CALCULATOR_EDITORIAL_UPDATED_AT}
            readingTime={homeReadingTime}
          />
        }
        share={{
          url: getCanonicalUrl(config.url, path),
          title: seoConfig.home.title,
          description: seoConfig.home.description,
          heading: "Partager ce calculateur",
          nativeLabel: "Partager ce calculateur",
        }}
      />
    </>
  );
}
