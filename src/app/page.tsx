import { config, seoConfig, Calculator } from "@/site";
import { coverToOgInput, HOME_COVER } from "@/site/guides/covers";
import { CalculatorPageLayout } from "@/framework/layouts/CalculatorPageLayout";
import { JsonLd } from "@/framework/JsonLd";
import { buildPageMetadata } from "@/framework/seo/metadata";
import { buildHomeJsonLd } from "@/site/schema";
import { HOME_EDITORIAL_UPDATED_AT } from "@/site/home-editorial-data";

export const metadata = buildPageMetadata(config, seoConfig, {
  title: seoConfig.home.title,
  description: seoConfig.home.description,
  path: "/",
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
          dateModified: HOME_EDITORIAL_UPDATED_AT,
        })}
      />
      <CalculatorPageLayout Calculator={Calculator} />
    </>
  );
}
