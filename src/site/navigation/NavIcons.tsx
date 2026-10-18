import type { MainNavIconId } from "./main-nav-data";

const NAV_ICON_BASE = "/icons/nav";

/**
 * Mapping id + variante → fichier réel dans public/icons/nav/
 * (noms préfixés du pack fourni, distincts de l'audit initial).
 */
const NAV_ICON_SRC: Record<
  Exclude<MainNavIconId, "search" | "rights">,
  { square?: string; circle?: string }
> = {
  calculator: {
    square: `${NAV_ICON_BASE}/01-nav-calculateurs.svg`,
    circle: `${NAV_ICON_BASE}/16-mega-tous-nos-outils.svg`,
  },
  coins: {
    square: `${NAV_ICON_BASE}/02-nav-smic.svg`,
    circle: `${NAV_ICON_BASE}/14-mega-montants-calculs-smic.svg`,
  },
  briefcase: {
    square: `${NAV_ICON_BASE}/03-nav-salaires-emploi.svg`,
    circle: `${NAV_ICON_BASE}/07-mega-situations-professionnelles.svg`,
  },
  shield: {
    square: `${NAV_ICON_BASE}/04-nav-aides-droits.svg`,
    circle: `${NAV_ICON_BASE}/12-mega-droits-des-salaries.svg`,
  },
  book: {
    square: `${NAV_ICON_BASE}/05-nav-tous-les-guides.svg`,
    circle: `${NAV_ICON_BASE}/13-mega-comprendre-vos-droits.svg`,
  },
  euro: {
    circle: `${NAV_ICON_BASE}/06-mega-remuneration.svg`,
  },
  document: {
    circle: `${NAV_ICON_BASE}/08-mega-fiche-de-paie.svg`,
  },
  chart: {
    circle: `${NAV_ICON_BASE}/09-mega-calcul-rapide.svg`,
  },
  hand: {
    circle: `${NAV_ICON_BASE}/10-mega-aides-sociales.svg`,
  },
  medical: {
    circle: `${NAV_ICON_BASE}/11-mega-arret-maladie.svg`,
  },
  calcRemuneration: {
    circle: `${NAV_ICON_BASE}/17-mega-salaire-remuneration.svg`,
  },
  calcSickLeave: {
    circle: `${NAV_ICON_BASE}/18-mega-arret-maladie-calculateurs.svg`,
  },
  calcContract: {
    circle: `${NAV_ICON_BASE}/19-mega-fin-de-contrat.svg`,
  },
};

/** Alias : "rights" n'est plus utilisé dans les données ; même rendu que shield. */
function resolveIconSrc(
  id: MainNavIconId,
  variant: "square" | "circle",
): string | null {
  if (id === "search") return null;
  const key = id === "rights" ? "shield" : id;
  const entry = NAV_ICON_SRC[key];
  if (!entry) return null;
  return entry[variant] ?? entry.circle ?? entry.square ?? null;
}

/** Loupe outline (pas de ui-search.svg dans le pack). */
export function NavIcon({
  id,
  className,
  size = 18,
}: {
  id: MainNavIconId;
  className?: string;
  size?: number;
}) {
  if (id !== "search") {
    const src = resolveIconSrc(id, "square");
    if (src) {
      return (
        // eslint-disable-next-line @next/next/no-img-element -- SVG décoratif local, dimensions fixes
        <img
          src={src}
          alt=""
          width={size}
          height={size}
          className={className}
          aria-hidden="true"
          decoding="async"
        />
      );
    }
  }

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.1}
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="10.5" cy="10.5" r="6.2" />
      <path d="M15.2 15.2 20 20" strokeLinecap="round" />
    </svg>
  );
}

export function NavIconBadge({
  id,
  variant = "square",
  size,
  className = "",
}: {
  id: MainNavIconId;
  variant?: "square" | "circle";
  /** Taille d'affichage en px (défaut : 30 carré / 44 cercle). */
  size?: number;
  className?: string;
}) {
  const src = resolveIconSrc(id, variant);
  const resolvedSize = size ?? (variant === "circle" ? 44 : 30);
  const sizeClass =
    size === 36 ? " mh-icon-badge--circle-sm" : "";

  if (!src) {
    return (
      <span
        className={`mh-icon-badge mh-icon-badge--${variant}${sizeClass}${className ? ` ${className}` : ""}`}
        aria-hidden="true"
        style={size && size !== 36 ? { width: size, height: size } : undefined}
      >
        <NavIcon id={id} size={variant === "circle" ? 22 : 16} />
      </span>
    );
  }

  return (
    <span
      className={`mh-icon-badge mh-icon-badge--${variant}${sizeClass}${className ? ` ${className}` : ""}`}
      aria-hidden="true"
      style={size && size !== 36 ? { width: size, height: size } : undefined}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- SVG pack local, object-fit contain */}
      <img
        src={src}
        alt=""
        width={resolvedSize}
        height={resolvedSize}
        className="mh-icon-badge__img"
        decoding="async"
        draggable={false}
      />
    </span>
  );
}

export function getNavIconSrc(
  id: MainNavIconId,
  variant: "square" | "circle",
): string | null {
  return resolveIconSrc(id, variant);
}
