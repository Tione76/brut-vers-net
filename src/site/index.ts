import { siteConfig } from "./site.config";
import { seoConfig } from "./seo.config";
import { faq } from "./faq";
import Calculator from "./calculator";
import MarginCalculator from "./margin-calculator";

export const config = { ...siteConfig, faq };
export { seoConfig, Calculator, MarginCalculator };
