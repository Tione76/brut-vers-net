import { siteConfig } from "./site.config";
import { seoConfig } from "./seo.config";
import { faq } from "./faq";
import { toolsNavigation } from "./navigation/tools";
import Calculator from "./calculator";

export const config = { ...siteConfig, faq, toolsNavigation };
export { seoConfig, Calculator };
