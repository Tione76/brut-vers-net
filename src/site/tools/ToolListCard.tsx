import Link from "next/link";
import type { CalculatorEntry } from "../navigation/calculators-registry";
import { GuideCoverImage } from "../guides/GuideCoverImage";
import { getToolHubTeaser } from "./tools-hub-data";

interface ToolListCardProps {
  tool: CalculatorEntry;
}

/** Carte calculateur premium : hub /nos-outils */
export function ToolListCard({ tool }: ToolListCardProps) {
  const teaser = getToolHubTeaser(tool.id) ?? tool.description;

  return (
    <Link href={tool.path} className="tool-list-card tool-list-card--featured">
      <span className="tool-list-card__badge">Outil gratuit</span>
      <span className="tool-list-card__cover">
        <GuideCoverImage
          cover={tool.cover}
          decorative
          className="tool-list-card__cover-img"
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 380px"
        />
      </span>
      <span className="tool-list-card__body">
        <span className="tool-list-card__title">{tool.shortTitle}</span>
        <span className="tool-list-card__desc">{teaser}</span>
        <span className="tool-list-card__cta">Ouvrir l&apos;outil →</span>
      </span>
    </Link>
  );
}
