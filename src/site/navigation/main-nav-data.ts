import { getGuideBySlug } from "@/site/guides/registry";
import { getGuidePublicPath } from "@/site/guides/paths";
import { seoConfig } from "@/site/seo.config";
import { getAllCalculators } from "./calculators-registry";
import { SMIC_HISTORY_PATH } from "@/site/smic-history/constants";

export type MainNavIconId =
  | "calculator"
  | "coins"
  | "briefcase"
  | "shield"
  | "book"
  | "euro"
  | "document"
  | "chart"
  | "rights"
  | "medical"
  | "hand"
  | "search"
  | "calcRemuneration"
  | "calcSickLeave"
  | "calcContract";

export type MainNavLink = {
  href: string;
  label: string;
  title?: string;
};

export type MainNavColumn = {
  id: string;
  title: string;
  description: string;
  icon: MainNavIconId;
  links: MainNavLink[];
};

export type MainNavCta = {
  title: string;
  description: string;
  buttonLabel: string;
  href: string;
  icon: MainNavIconId;
};

export type MainNavMegaIntro = {
  title: string;
  description: string;
  icon: MainNavIconId;
};

export type MainNavMegaPanel = {
  kind: "mega";
  /** Disposition spéciale Calculateurs : 2+1 colonnes + CTA. */
  layout?: "default" | "calc";
  intro?: MainNavMegaIntro;
  columns: MainNavColumn[];
  cta?: MainNavCta;
};

/** Panneau 2 zones : liste éditoriale + CTA (SMIC, Calculateurs). */
export type MainNavSpotlightPanel = {
  kind: "spotlight";
  title: string;
  description: string;
  icon: MainNavIconId;
  links: MainNavLink[];
  cta: MainNavCta;
};

export type MainNavSimplePanel = {
  kind: "simple";
  links: MainNavLink[];
};

export type MainNavPanel =
  | MainNavMegaPanel
  | MainNavSpotlightPanel
  | MainNavSimplePanel;

export type MainNavItem =
  | {
      id: string;
      label: string;
      icon: MainNavIconId;
      kind: "dropdown";
      panel: MainNavPanel;
      matchPaths: string[];
    }
  | {
      id: string;
      label: string;
      icon: MainNavIconId;
      kind: "link";
      href: string;
      matchPaths: string[];
    };

function guideHref(slug: string, fallback: string): string {
  const guide = getGuideBySlug(slug);
  return guide ? getGuidePublicPath(guide) : fallback;
}

const CALCULATORS_HUB = seoConfig.toolsHub.path;
const GUIDES_HUB = seoConfig.guidesHub.path;

function calcEntry(id: string) {
  const entry = getAllCalculators().find((calc) => calc.id === id);
  if (!entry) {
    throw new Error(`Calculateur introuvable pour le menu : ${id}`);
  }
  return entry;
}

function buildCalculatorsPanel(): MainNavMegaPanel {
  const brutVersNet = calcEntry("brut-vers-net");
  const augmentation = calcEntry("augmentation-salaire");
  const heuresSup = calcEntry("salaire-heures-supplementaires");
  const arretMaladie = calcEntry("salaire-arret-maladie");
  const ijss = calcEntry("calcul-ijss-arret-maladie");
  const maintien = calcEntry("maintien-salaire-arret-maladie");
  const licenciement = calcEntry("indemnite-licenciement");

  return {
    kind: "mega",
    layout: "calc",
    intro: {
      title: "Calculateurs",
      description: "Simulez votre salaire et vos droits en quelques clics.",
      icon: "calculator",
    },
    columns: [
      {
        id: "salaire-remuneration",
        title: "Salaire & rémunération",
        description: "Convertissez et simulez votre rémunération",
        icon: "calcRemuneration",
        links: [
          {
            href: brutVersNet.path,
            label: "Salaire brut vers net",
            title: brutVersNet.title,
          },
          {
            href: augmentation.path,
            label: "Augmentation de salaire",
            title: augmentation.title,
          },
          {
            href: heuresSup.path,
            label: "Heures supplémentaires",
            title: heuresSup.title,
          },
        ],
      },
      {
        id: "arret-maladie-calc",
        title: "Arrêt maladie",
        description: "Estimez vos revenus pendant un arrêt",
        icon: "calcSickLeave",
        links: [
          {
            href: arretMaladie.path,
            label: "Salaire en arrêt maladie",
            title: arretMaladie.title,
          },
          {
            href: ijss.path,
            label: "Indemnités journalières (IJSS)",
            title: ijss.title,
          },
          {
            href: maintien.path,
            label: "Maintien de salaire",
            title: maintien.title,
          },
        ],
      },
      {
        id: "fin-de-contrat",
        title: "Fin de contrat",
        description: "Estimez vos indemnités de départ",
        icon: "calcContract",
        links: [
          {
            href: licenciement.path,
            label: "Indemnité de licenciement",
            title: licenciement.title,
          },
        ],
      },
    ],
    cta: {
      title: "Tous nos outils",
      description: "Accédez à l'ensemble de nos calculateurs.",
      buttonLabel: "Voir tous les outils",
      href: CALCULATORS_HUB,
      icon: "calculator",
    },
  };
}

function buildSmicPanel(): MainNavSpotlightPanel {
  return {
    kind: "spotlight",
    title: "SMIC",
    description: "Tout sur le salaire minimum en France et en Europe.",
    icon: "coins",
    links: [
      {
        href: "/smic",
        label: "SMIC : montants brut et net",
        title: "SMIC 2026 : quel est le montant brut et net ?",
      },
      {
        href: "/smic-selon-nombre-heures",
        label: "SMIC selon le nombre d'heures",
        title: "SMIC selon le nombre d'heures : brut et net de 10 h à 44 h",
      },
      {
        href: "/smic-hotelier",
        label: "SMIC hôtelier (HCR)",
        title: "SMIC hôtelier 2026 : grille HCR et salaires à 35 h et 39 h",
      },
      {
        href: SMIC_HISTORY_PATH,
        label: "Évolution du SMIC depuis 1950",
        title: "Évolution du SMIC depuis 1950",
      },
      {
        href: "/smic-europe",
        label: "SMIC en Europe",
        title: "SMIC en Europe",
      },
    ],
    cta: {
      title: "Consulter le SMIC actuel",
      description:
        "Retrouvez les montants brut et net du salaire minimum et les principales règles applicables.",
      buttonLabel: "Voir les montants du SMIC",
      href: "/smic",
      icon: "euro",
    },
  };
}

function buildSalairesEmploiPanel(): MainNavMegaPanel {
  return {
    kind: "mega",
    columns: [
      {
        id: "remuneration",
        title: "Rémunération",
        description: "Comprendre votre salaire et son calcul",
        icon: "euro",
        links: [
          {
            href: guideHref("salaire-moyen-france", "/salaire-moyen-france"),
            label: "Salaire moyen en France",
          },
          {
            href: guideHref(
              "quel-est-un-bon-salaire-en-france",
              "/quel-est-un-bon-salaire-en-france",
            ),
            label: "Qu'est-ce qu'un bon salaire ?",
          },
          {
            href: guideHref(
              "comment-est-calcule-le-salaire-net",
              "/guides/comment-est-calcule-le-salaire-net",
            ),
            label: "Salaire brut et net",
          },
          {
            href: guideHref(
              "comment-calculer-son-salaire-net",
              "/guides/comment-calculer-son-salaire-net",
            ),
            label: "Calculer son salaire net",
          },
        ],
      },
      {
        id: "situations",
        title: "Situations professionnelles",
        description: "Gérer votre parcours professionnel",
        icon: "briefcase",
        links: [
          {
            href: guideHref(
              "salaire-interim-calcul-brut-net",
              "/salaire-interim-calcul-brut-net",
            ),
            label: "Salaire en intérim",
          },
          {
            href: guideHref("salaire-alternance", "/salaire-alternance"),
            label: "Salaire en alternance",
          },
          {
            href: "/calculateurs/salaire-heures-supplementaires",
            label: "Heures supplémentaires",
          },
          {
            href: "/calculateurs/augmentation-salaire",
            label: "Augmentation de salaire",
          },
        ],
      },
      {
        id: "fiche-paie",
        title: "Fiche de paie",
        description: "Comprendre votre bulletin de salaire",
        icon: "document",
        links: [
          {
            href: guideHref(
              "comment-lire-une-fiche-de-paie",
              "/guides/comment-lire-une-fiche-de-paie",
            ),
            label: "Lire une fiche de paie",
          },
          {
            href: guideHref(
              "cotisations-salariales-pourquoi-brut-plus-eleve-que-net",
              "/guides/cotisations-salariales-pourquoi-brut-plus-eleve-que-net",
            ),
            label: "Cotisations salariales",
          },
          {
            href: guideHref(
              "prelevement-a-la-source-quest-ce-que-cest-et-comment-ca-fonctionne",
              "/guides/prelevement-a-la-source-quest-ce-que-cest-et-comment-ca-fonctionne",
            ),
            label: "Prélèvement à la source",
          },
        ],
      },
    ],
    cta: {
      title: "Besoin d'un calcul rapide ?",
      description: "Accédez directement à nos calculateurs de salaire.",
      buttonLabel: "Voir les calculateurs",
      href: CALCULATORS_HUB,
      icon: "chart",
    },
  };
}

function buildAidesDroitsPanel(): MainNavMegaPanel {
  return {
    kind: "mega",
    columns: [
      {
        id: "aides-sociales",
        title: "Aides sociales",
        description: "Comprendre les aides liées au revenu",
        icon: "hand",
        links: [
          {
            href: guideHref("prime-activite", "/prime-activite"),
            label: "Prime d'activité",
          },
          {
            href: guideHref("prime-de-noel", "/prime-de-noel"),
            label: "Prime de Noël",
          },
        ],
      },
      {
        id: "arret-maladie",
        title: "Arrêt maladie",
        description: "Estimer vos revenus pendant un arrêt",
        icon: "medical",
        links: [
          {
            href: guideHref("salaire-arret-maladie", "/salaire-arret-maladie"),
            label: "Salaire en arrêt maladie",
          },
          {
            href: guideHref("calcul-ijss-arret-maladie", "/calcul-ijss-arret-maladie"),
            label: "Indemnités journalières IJSS",
          },
          {
            href: guideHref(
              "maintien-salaire-arret-maladie",
              "/maintien-salaire-arret-maladie",
            ),
            label: "Maintien de salaire",
          },
        ],
      },
      {
        id: "droits-salaries",
        title: "Droits des salariés",
        description: "Outils et guides pour vos droits",
        icon: "shield",
        links: [
          {
            href: guideHref("solde-de-tout-compte", "/solde-de-tout-compte"),
            label: "Solde de tout compte",
          },
          {
            href: "/calculateurs/indemnite-licenciement",
            label: "Indemnité de licenciement",
          },
          {
            href: "/calculateurs/salaire-heures-supplementaires",
            label: "Heures supplémentaires",
          },
          {
            href: guideHref(
              "pourquoi-salaire-net-change-septembre-2026",
              "/pourquoi-salaire-net-change-septembre-2026",
            ),
            label: "Pourquoi mon net a changé ?",
          },
        ],
      },
    ],
    cta: {
      title: "Comprendre vos droits",
      description:
        "Accédez à nos guides et outils pour mieux comprendre votre situation.",
      buttonLabel: "Explorer les guides",
      href: GUIDES_HUB,
      icon: "book",
    },
  };
}

/**
 * Source unique de la navigation principale (desktop + mobile).
 * Ordre et libellés alignés sur la maquette header.
 */
export function getMainNavItems(): MainNavItem[] {
  return [
    {
      id: "calculateurs",
      label: "Calculateurs",
      icon: "calculator",
      kind: "dropdown",
      panel: buildCalculatorsPanel(),
      matchPaths: ["/", "/nos-outils", "/calculateurs"],
    },
    {
      id: "smic",
      label: "SMIC",
      icon: "coins",
      kind: "dropdown",
      panel: buildSmicPanel(),
      matchPaths: [
        "/smic",
        "/smic-selon-nombre-heures",
        "/smic-hotelier",
        "/evolution-smic",
        "/smic-europe",
      ],
    },
    {
      id: "salaires-emploi",
      label: "Salaires & emploi",
      icon: "briefcase",
      kind: "dropdown",
      panel: buildSalairesEmploiPanel(),
      matchPaths: [
        "/salaire-moyen-france",
        "/quel-est-un-bon-salaire-en-france",
        "/guides/comment-est-calcule-le-salaire-net",
        "/guides/comment-calculer-son-salaire-net",
        "/salaire-interim-calcul-brut-net",
        "/salaire-alternance",
        "/guides/comment-lire-une-fiche-de-paie",
        "/guides/cotisations-salariales-pourquoi-brut-plus-eleve-que-net",
        "/guides/prelevement-a-la-source-quest-ce-que-cest-et-comment-ca-fonctionne",
        "/salaire-brut-mensuel-en-net",
        "/salaire-net-mensuel-en-brut",
        "/tableau-salaire-brut-mensuel-en-net",
        "/tableau-salaire-net-mensuel-en-brut",
      ],
    },
    {
      id: "aides-droits",
      label: "Aides & droits",
      icon: "shield",
      kind: "dropdown",
      panel: buildAidesDroitsPanel(),
      matchPaths: [
        "/prime-activite",
        "/prime-de-noel",
        "/salaire-arret-maladie",
        "/calcul-ijss-arret-maladie",
        "/maintien-salaire-arret-maladie",
        "/pourquoi-salaire-net-change-septembre-2026",
        "/solde-de-tout-compte",
        "/calculateurs/indemnite-licenciement",
      ],
    },
    {
      id: "tous-les-guides",
      label: "Tous les guides",
      icon: "book",
      kind: "link",
      href: GUIDES_HUB,
      matchPaths: [GUIDES_HUB],
    },
  ];
}

export function isPathMatched(pathname: string, matchPaths: string[]): boolean {
  return matchPaths.some((path) => {
    if (path === "/") return pathname === "/";
    return pathname === path || pathname.startsWith(`${path}/`);
  });
}

/** Liste plate des liens pour tests et mobile accordéons. */
export function flattenMainNavLinks(items: MainNavItem[] = getMainNavItems()): MainNavLink[] {
  const links: MainNavLink[] = [];
  for (const item of items) {
    if (item.kind === "link") {
      links.push({ href: item.href, label: item.label });
      continue;
    }
    if (item.panel.kind === "simple") {
      links.push(...item.panel.links);
      continue;
    }
    if (item.panel.kind === "spotlight") {
      links.push(...item.panel.links);
      links.push({
        href: item.panel.cta.href,
        label: item.panel.cta.buttonLabel,
      });
      continue;
    }
    for (const column of item.panel.columns) {
      links.push(...column.links);
    }
    if (item.panel.cta) {
      links.push({
        href: item.panel.cta.href,
        label: item.panel.cta.buttonLabel,
      });
    }
  }
  return links;
}
