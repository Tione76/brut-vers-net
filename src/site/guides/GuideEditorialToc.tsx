import type { GuideTocEntry } from "./types";
import {
  planTocColumns,
  toBalanceBlocks,
  type BalanceBlock,
} from "./toc-column-balance";

const DEFAULT_TOC_TITLE = "Explorer ce guide";
const DEFAULT_TOC_LEDE = "Accédez directement à la rubrique qui vous intéresse.";

export type GuideTocGroupIcon =
  | "help"
  | "calculator"
  | "clipboard"
  | "badge"
  | "chart"
  | "scale"
  | "file"
  | "users";

/** Découpage visuel : indices sur la liste TOC existante, sans recopier les ancres. */
export interface GuideTocGroup {
  title: string;
  icon: GuideTocGroupIcon;
  start: number;
  end: number;
}

type TocBlock =
  | { kind: "group"; title: string; icon: GuideTocGroupIcon; start: number; end: number }
  | { kind: "loose"; start: number; end: number };

function ListIcon() {
  return (
    <svg
      className="guide-toc__icon-svg"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      className="guide-toc__chevron-svg"
      viewBox="0 0 16 16"
      width="14"
      height="14"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M6 3.5 11 8l-5 4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      className="guide-toc__toggle-svg"
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M3.5 6 8 10.5 12.5 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GroupIcon({ name }: { name: GuideTocGroupIcon }) {
  const common = {
    className: "guide-toc__group-icon-svg",
    viewBox: "0 0 24 24",
    width: 17,
    height: 17,
    fill: "none",
    "aria-hidden": true as const,
    focusable: false as const,
  };

  if (name === "calculator") {
    return (
      <svg {...common}>
        <rect x="5" y="3.5" width="14" height="17" rx="2" stroke="currentColor" strokeWidth="1.75" />
        <path
          d="M8 8h8M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (name === "clipboard") {
    return (
      <svg {...common}>
        <path
          d="M9 4.5h6M8 4.5H6.5A1.5 1.5 0 0 0 5 6v13.5A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H16"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="9" y="3" width="6" height="3" rx="1" stroke="currentColor" strokeWidth="1.75" />
        <path d="M8.5 11h7M8.5 15h5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "badge") {
    return (
      <svg {...common}>
        <path
          d="M8.5 11.2 11 13.7l4.8-5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 21s7.5-3.8 7.5-10.2V6.2L12 3.5 4.5 6.2v4.6C4.5 17.2 12 21 12 21Z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === "chart") {
    return (
      <svg {...common}>
        <path
          d="M4.5 19.5h15M7 16.5V10M12 16.5V7M17 16.5v-4"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === "scale") {
    return (
      <svg {...common}>
        <path
          d="M12 3.5v17M5.5 8.5h13M7.5 8.5 5 14.5h5L7.5 8.5Zm9 0L14 14.5h5L16.5 8.5Z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === "file") {
    return (
      <svg {...common}>
        <path
          d="M8 3.5h6.5L18.5 8v11.5A1.5 1.5 0 0 1 17 21H8a1.5 1.5 0 0 1-1.5-1.5v-15A1.5 1.5 0 0 1 8 3.5Z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        <path d="M14.5 3.5V8H18.5M9 12h6M9 16h4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "users") {
    return (
      <svg {...common}>
        <path
          d="M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20M15.5 7.5a2.75 2.75 0 1 1-5.5 0 2.75 2.75 0 0 1 5.5 0ZM20 20v-1.2a2.8 2.8 0 0 0-2-2.68M16.75 4.7a2.4 2.4 0 0 1 0 4.6"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M9.6 9.4a2.4 2.4 0 1 1 3.3 2.22c-.7.3-1.15.8-1.15 1.58V14"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path d="M12 17.2h.01" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function formatRubriqueCount(count: number): string {
  return `${count}\u00a0rubrique${count > 1 ? "s" : ""}`;
}

function formatIndex(index: number): string {
  return String(index + 1).padStart(2, "0");
}

/** @deprecated Conservé pour compatibilité des tests ; préférer planTocColumns. */
export function splitBlocksIntoColumns(
  blocks: TocBlock[],
  columnCount = 2,
  leftBlockCount?: number,
): TocBlock[][] {
  if (blocks.length === 0) return [];
  if (columnCount <= 1) return [blocks];
  if (leftBlockCount != null && leftBlockCount > 0 && leftBlockCount < blocks.length) {
    return [blocks.slice(0, leftBlockCount), blocks.slice(leftBlockCount)];
  }
  const plan = planTocColumns(toBalanceBlocks(blocks), []);
  // Sans titres, fallback quantité.
  if (blocks.length === 1 && blocks[0].kind === "loose") {
    const block = blocks[0];
    const size = block.end - block.start;
    if (size <= 1) return [blocks];
    const mid = block.start + Math.ceil(size / 2);
    return [
      [{ kind: "loose", start: block.start, end: mid }],
      [{ kind: "loose", start: mid, end: block.end }],
    ];
  }
  void plan;
  const total = blocks.reduce((sum, block) => sum + (block.end - block.start), 0);
  const target = Math.ceil(total / columnCount);
  const columns: TocBlock[][] = [[], []];
  let columnIndex = 0;
  let filled = 0;
  for (const block of blocks) {
    if (columnIndex < 1 && filled > 0 && filled >= target) {
      columnIndex = 1;
      filled = 0;
    }
    columns[columnIndex].push(block);
    filled += block.end - block.start;
  }
  return columns.filter((column) => column.length > 0);
}

/** Valide et normalise les groupes, comble les trous avec des rubriques indépendantes. */
export function buildTocBlocks(
  entryCount: number,
  groups?: GuideTocGroup[],
): TocBlock[] {
  if (entryCount <= 0) return [];

  const cleaned =
    groups
      ?.filter((group) => group.end > group.start)
      .map((group) => ({
        ...group,
        start: Math.max(0, Math.min(group.start, entryCount)),
        end: Math.max(0, Math.min(group.end, entryCount)),
      }))
      .filter((group) => group.end > group.start)
      .sort((a, b) => a.start - b.start) ?? [];

  if (cleaned.length === 0) {
    return [{ kind: "loose", start: 0, end: entryCount }];
  }

  const blocks: TocBlock[] = [];
  let cursor = 0;

  for (const group of cleaned) {
    if (group.start < cursor) continue;
    if (group.start > cursor) {
      blocks.push({ kind: "loose", start: cursor, end: group.start });
    }
    blocks.push({
      kind: "group",
      title: group.title,
      icon: group.icon,
      start: group.start,
      end: group.end,
    });
    cursor = group.end;
  }

  if (cursor < entryCount) {
    blocks.push({ kind: "loose", start: cursor, end: entryCount });
  }

  return blocks;
}

function TocEntry({ entry, index }: { entry: GuideTocEntry; index: number }) {
  return (
    <li>
      <a href={`#${entry.id}`} className="guide-toc__entry">
        <span className="guide-toc__index" aria-hidden="true">
          {formatIndex(index)}
        </span>
        <span className="guide-toc__label">{entry.title}</span>
        <span className="guide-toc__chevron" aria-hidden="true">
          <ChevronRightIcon />
        </span>
      </a>
    </li>
  );
}

function TocBlockView({
  block,
  entries,
  headingId,
}: {
  block: BalanceBlock;
  entries: GuideTocEntry[];
  headingId: string;
}) {
  const slice = entries.slice(block.start, block.end);
  const list = (
    <ol className="guide-toc__list" start={block.start + 1}>
      {slice.map((entry, offset) => (
        <TocEntry key={entry.id} entry={entry} index={block.start + offset} />
      ))}
    </ol>
  );

  if (block.kind === "loose") {
    // Suite d'une catégorie coupée, ou sommaire plat : liens seuls, sans bandeau.
    return <div className="guide-toc__group guide-toc__group--loose">{list}</div>;
  }

  return (
    <div className="guide-toc__group" role="group" aria-labelledby={headingId}>
      <p id={headingId} className="guide-toc__group-heading">
        <span className="guide-toc__group-icon" aria-hidden="true">
          <GroupIcon name={block.icon} />
        </span>
        <span className="guide-toc__group-title">{block.title}</span>
      </p>
      {list}
    </div>
  );
}

function renderBlocks(
  blocks: BalanceBlock[],
  entries: GuideTocEntry[],
  idPrefix: string,
) {
  let groupCounter = 0;
  return blocks.map((block) => {
    const headingId =
      block.kind === "group"
        ? `${idPrefix}-groupe-${++groupCounter}`
        : `${idPrefix}-loose-${block.start}`;
    return (
      <TocBlockView
        key={`${block.kind}-${block.start}-${block.end}`}
        block={block}
        entries={entries}
        headingId={headingId}
      />
    );
  });
}

/** Sommaire éditorial orange : design de référence (ex. /prime-activite). */
export function GuideEditorialToc({
  entries,
  groups,
  leftColumnGroups,
  id = "sommaire",
  title = DEFAULT_TOC_TITLE,
  lede = DEFAULT_TOC_LEDE,
}: {
  entries: GuideTocEntry[];
  groups?: GuideTocGroup[];
  /**
   * Override optionnel : force une coupure après N blocs sources (catégories entières).
   * Sans override, l'équilibrage automatique s'applique.
   */
  leftColumnGroups?: number;
  id?: string;
  title?: string;
  lede?: string;
}) {
  const countLabel = formatRubriqueCount(entries.length);
  const sourceBlocks = buildTocBlocks(entries.length, groups);
  const balanceBlocks = toBalanceBlocks(sourceBlocks);
  const hasAnyGroup = balanceBlocks.some((block) => block.kind === "group");

  const plan =
    leftColumnGroups != null &&
    leftColumnGroups > 0 &&
    leftColumnGroups < balanceBlocks.length
      ? {
          left: balanceBlocks.slice(0, leftColumnGroups),
          right: balanceBlocks.slice(leftColumnGroups),
          split: false,
          imbalance: 0,
        }
      : planTocColumns(balanceBlocks, entries);

  const columns = [plan.left, plan.right].filter((column) => column.length > 0);

  return (
    <nav id={id} className="guide-toc guide-toc--editorial" aria-label={title}>
      <div className="guide-toc__head">
        <div className="guide-toc__head-main">
          <span className="guide-toc__icon" aria-hidden="true">
            <ListIcon />
          </span>
          <div className="guide-toc__head-copy">
            <p className="guide-toc__heading">{title}</p>
            {lede ? <p className="guide-toc__lede">{lede}</p> : null}
          </div>
        </div>
        <p className="guide-toc__count">{countLabel}</p>
      </div>

      <details className="guide-toc__mobile">
        <summary>
          <span className="guide-toc__icon" aria-hidden="true">
            <ListIcon />
          </span>
          <span className="guide-toc__summary-copy">
            <span className="guide-toc__heading">{title}</span>
            <span className="guide-toc__count">{countLabel}</span>
          </span>
          <span className="guide-toc__toggle" aria-hidden="true">
            <ChevronDownIcon />
          </span>
        </summary>
      </details>

      {/* Mobile : ordre naturel, catégories non coupées, un bandeau par catégorie. */}
      <div
        className={
          hasAnyGroup
            ? "guide-toc__groups guide-toc__groups--stack"
            : "guide-toc__groups guide-toc__groups--stack guide-toc__groups--flat"
        }
      >
        {renderBlocks(balanceBlocks, entries, `${id}-stack`)}
      </div>

      {/* Desktop : colonnes équilibrées ; catégorie coupée = bandeau à gauche seulement. */}
      <div
        className={
          hasAnyGroup
            ? "guide-toc__groups guide-toc__groups--columns"
            : "guide-toc__groups guide-toc__groups--columns guide-toc__groups--flat"
        }
      >
        {columns.map((column, columnIndex) => (
          <div key={`toc-col-${columnIndex}`} className="guide-toc__column">
            {renderBlocks(column, entries, `${id}-col${columnIndex}`)}
          </div>
        ))}
      </div>
    </nav>
  );
}
