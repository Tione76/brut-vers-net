import type { GuideTocGroup } from "./GuideEditorialToc";

/**
 * Configuration visuelle du sommaire par slug de guide.
 * Indices sur buildGuideTocH2 : ensembles consecutifs uniquement, couverture totale.
 * La repartition en colonnes est calculee automatiquement (voir toc-column-balance.ts).
 */
export interface GuideTocConfig {
  groups: GuideTocGroup[];
  /** Override rare : force N groupes entiers a gauche. Preferer l'algo automatique. */
  leftColumnGroups?: number;
}

export const GUIDE_TOC_CONFIG: Record<string, GuideTocConfig> = {
  "prime-activite": {
    groups: [
      { title: "Comprendre la prime", icon: "help", start: 0, end: 4 },
      { title: "Montants et calcul", icon: "calculator", start: 4, end: 8 },
      { title: "Déclarations et démarches", icon: "clipboard", start: 8, end: 12 },
      {
        title: "Vérifier ses droits et aller plus loin",
        icon: "badge",
        start: 12,
        end: 16,
      },
    ],
  },

  smic: {
    groups: [
      { title: "Montants du SMIC", icon: "calculator", start: 0, end: 4 },
      { title: "Brut, net et revalorisation", icon: "help", start: 4, end: 9 },
      { title: "Qui est concerné et comment vérifier", icon: "clipboard", start: 9, end: 12 },
      { title: "Sources et questions fréquentes", icon: "file", start: 12, end: 14 },
      { title: "Pour conclure", icon: "badge", start: 14, end: 15 },
    ],
  },

  "smic-selon-nombre-heures": {
    groups: [
      { title: "Calculer son SMIC selon ses heures", icon: "calculator", start: 0, end: 9 },
      { title: "Temps de travail et règles salariales", icon: "scale", start: 9, end: 14 },
      { title: "Vérifier et comprendre son salaire", icon: "clipboard", start: 14, end: 17 },
      { title: "Questions fréquentes et méthodologie", icon: "file", start: 17, end: 19 },
      { title: "Pour conclure", icon: "badge", start: 19, end: 20 },
    ],
  },

  "smic-hotelier": {
    groups: [
      { title: "Comprendre le SMIC hôtelier", icon: "help", start: 0, end: 3 },
      { title: "Montants et calculs HCR", icon: "calculator", start: 3, end: 8 },
      { title: "Vérifier et aller plus loin", icon: "badge", start: 8, end: 12 },
    ],
  },

  "smic-europe": {
    groups: [
      { title: "Lire et comparer", icon: "chart", start: 0, end: 4 },
      { title: "Les salaires par pays", icon: "scale", start: 4, end: 7 },
      { title: "Comparaisons et limites", icon: "help", start: 7, end: 10 },
      { title: "Questions fréquentes et conclusion", icon: "badge", start: 10, end: 12 },
      { title: "Méthodologie et sources", icon: "file", start: 12, end: 13 },
    ],
  },

  "salaire-minimum-allemagne": {
    groups: [
      { title: "Montant et mensuel", icon: "calculator", start: 0, end: 3 },
      { title: "Comparer et situer", icon: "scale", start: 3, end: 6 },
      { title: "Exceptions et cas particuliers", icon: "help", start: 6, end: 9 },
      { title: "Évolution et recours", icon: "badge", start: 9, end: 11 },
      { title: "FAQ, sources et conclusion", icon: "file", start: 11, end: 14 },
    ],
  },

  "salaire-minimum-suisse": {
    groups: [
      { title: "Cadre et cantons", icon: "scale", start: 0, end: 3 },
      { title: "Genève, Vaud et mensuel", icon: "calculator", start: 3, end: 6 },
      { title: "Règles et frontaliers", icon: "help", start: 6, end: 9 },
      { title: "Net, euros et comparaison", icon: "badge", start: 9, end: 12 },
      { title: "Vérifier, FAQ et sources", icon: "file", start: 12, end: 16 },
    ],
  },

  "evolution-smic": {
    groups: [
      { title: "Vue d'ensemble", icon: "chart", start: 0, end: 2 },
      { title: "Histoire du SMIC par décennies", icon: "file", start: 2, end: 9 },
      { title: "Comprendre les augmentations du SMIC", icon: "help", start: 9, end: 11 },
      { title: "Frise et questions fréquentes", icon: "chart", start: 11, end: 13 },
      { title: "Conclusion et sources", icon: "badge", start: 13, end: 15 },
    ],
  },

  "salaire-interim-calcul-brut-net": {
    groups: [
      { title: "Calculer son salaire en intérim", icon: "calculator", start: 0, end: 5 },
      { title: "Règles de rémunération et vérification", icon: "clipboard", start: 5, end: 9 },
      { title: "Limites, FAQ et estimation", icon: "help", start: 9, end: 12 },
      { title: "Méthodologie et sources", icon: "file", start: 12, end: 13 },
    ],
  },

  "salaire-arret-maladie": {
    groups: [
      { title: "Simulateur et repères", icon: "calculator", start: 0, end: 3 },
      { title: "Indemnisation et calcul du salaire", icon: "help", start: 3, end: 10 },
      { title: "Versement et vérification", icon: "clipboard", start: 10, end: 12 },
      { title: "Limites et méthodologie", icon: "file", start: 12, end: 14 },
      { title: "Questions, estimation et sources", icon: "badge", start: 14, end: 17 },
    ],
  },

  "calcul-ijss-arret-maladie": {
    groups: [
      { title: "Utiliser le calculateur d'IJSS", icon: "calculator", start: 0, end: 2 },
      { title: "Comprendre le calcul des IJSS", icon: "help", start: 2, end: 8 },
      { title: "Conditions et versement des IJSS", icon: "clipboard", start: 8, end: 11 },
      { title: "Exemples et vérification du calcul", icon: "scale", start: 11, end: 14 },
      { title: "Questions fréquentes et estimation", icon: "badge", start: 14, end: 16 },
      { title: "Méthodologie et sources", icon: "file", start: 16, end: 17 },
    ],
  },

  "maintien-salaire-arret-maladie": {
    groups: [
      { title: "Utiliser le calculateur", icon: "calculator", start: 0, end: 2 },
      { title: "Comprendre le maintien de salaire", icon: "help", start: 2, end: 6 },
      { title: "Calcul et situations particulières", icon: "scale", start: 6, end: 12 },
      { title: "Vérification et cas non couverts", icon: "clipboard", start: 12, end: 15 },
      { title: "Questions fréquentes et estimation", icon: "badge", start: 15, end: 17 },
      { title: "Méthodologie et sources", icon: "file", start: 17, end: 18 },
    ],
  },

  "salaire-alternance": {
    groups: [
      { title: "Salaire en contrat d'apprentissage", icon: "users", start: 0, end: 7 },
      { title: "Professionnalisation et règles particulières", icon: "scale", start: 7, end: 12 },
      { title: "Droits et vérification du salaire", icon: "clipboard", start: 12, end: 15 },
      { title: "Sources et questions fréquentes", icon: "file", start: 15, end: 17 },
      { title: "Pour conclure", icon: "badge", start: 17, end: 18 },
    ],
  },

  "salaire-moyen-france": {
    groups: [
      { title: "Les chiffres clés", icon: "chart", start: 0, end: 3 },
      { title: "Les écarts de salaire en France", icon: "users", start: 3, end: 9 },
      { title: "Comparer son salaire", icon: "scale", start: 9, end: 11 },
      { title: "Sources et questions fréquentes", icon: "file", start: 11, end: 13 },
      { title: "Pour conclure", icon: "badge", start: 13, end: 14 },
    ],
  },

  "quel-est-un-bon-salaire-en-france": {
    groups: [
      { title: "Les repères pour évaluer son salaire", icon: "chart", start: 0, end: 7 },
      { title: "Contextualiser son salaire", icon: "users", start: 7, end: 14 },
      { title: "Évaluer sa situation", icon: "help", start: 14, end: 16 },
      { title: "Sources et questions fréquentes", icon: "file", start: 16, end: 18 },
      { title: "Pour aller plus loin", icon: "badge", start: 18, end: 19 },
    ],
  },

  "comment-est-calcule-le-salaire-net": {
    groups: [
      { title: "Comprendre le passage du brut au net", icon: "help", start: 0, end: 4 },
      { title: "Les différences et les exemples concrets", icon: "calculator", start: 4, end: 8 },
      { title: "Questions fréquentes et conclusion", icon: "badge", start: 8, end: 10 },
      { title: "Méthodologie et sources", icon: "file", start: 10, end: 11 },
    ],
  },

  "comment-lire-une-fiche-de-paie": {
    groups: [
      { title: "Lire et comprendre sa fiche de paie", icon: "file", start: 0, end: 6 },
      { title: "Vérification et exemples pratiques", icon: "clipboard", start: 6, end: 9 },
      { title: "Questions fréquentes et conclusion", icon: "badge", start: 9, end: 11 },
      { title: "Méthodologie et sources", icon: "file", start: 11, end: 12 },
    ],
  },

  "comment-calculer-son-salaire-net": {
    groups: [
      { title: "Calculer son salaire net étape par étape", icon: "calculator", start: 0, end: 4 },
      { title: "Comprendre et vérifier son calcul", icon: "help", start: 4, end: 7 },
      { title: "Questions fréquentes et conclusion", icon: "badge", start: 7, end: 9 },
      { title: "Méthodologie et sources", icon: "file", start: 9, end: 10 },
    ],
  },

  "cotisations-salariales-pourquoi-brut-plus-eleve-que-net": {
    groups: [
      { title: "Comprendre les cotisations salariales", icon: "help", start: 0, end: 4 },
      { title: "Différences, erreurs et exemples", icon: "calculator", start: 4, end: 8 },
      { title: "Questions fréquentes et conclusion", icon: "badge", start: 8, end: 10 },
      { title: "Méthodologie et sources", icon: "file", start: 10, end: 11 },
    ],
  },

  "prelevement-a-la-source-quest-ce-que-cest-et-comment-ca-fonctionne": {
    groups: [
      { title: "Comprendre le prélèvement à la source", icon: "help", start: 0, end: 3 },
      { title: "Comprendre et gérer son taux", icon: "clipboard", start: 3, end: 8 },
      { title: "Effets sur le salaire et exemples", icon: "calculator", start: 8, end: 11 },
      { title: "Questions fréquentes et conclusion", icon: "badge", start: 11, end: 13 },
      { title: "Méthodologie et sources", icon: "file", start: 13, end: 14 },
    ],
  },

  "pourquoi-salaire-net-change-septembre-2026": {
    groups: [
      { title: "Comprendre pourquoi le net change", icon: "help", start: 0, end: 6 },
      { title: "Identifier la cause du changement", icon: "clipboard", start: 6, end: 12 },
      { title: "Que faire après un changement ?", icon: "scale", start: 12, end: 16 },
      { title: "Questions fréquentes et à retenir", icon: "badge", start: 16, end: 18 },
      { title: "Méthodologie et sources", icon: "file", start: 18, end: 19 },
    ],
  },

  "prime-de-noel": {
    groups: [
      { title: "Montants et éligibilité", icon: "clipboard", start: 0, end: 2 },
      { title: "Versement et organismes", icon: "clipboard", start: 2, end: 4 },
      {
        title: "Cas particuliers et territoires",
        icon: "scale",
        start: 4,
        end: 7,
      },
      {
        title: "Démarches, questions et sources",
        icon: "badge",
        start: 7,
        end: 12,
      },
    ],
  },

  "solde-de-tout-compte": {
    groups: [
      { title: "Comprendre le document", icon: "help", start: 0, end: 4 },
      {
        title: "Vérifier et selon le départ",
        icon: "clipboard",
        start: 4,
        end: 9,
      },
      {
        title: "CDD, intérim, fiscalité et exemples",
        icon: "calculator",
        start: 9,
        end: 13,
      },
      {
        title: "Délais, signature et recours",
        icon: "scale",
        start: 13,
        end: 17,
      },
      {
        title: "Documents, erreurs et sources",
        icon: "badge",
        start: 17,
        end: 21,
      },
    ],
  },

  "conges-payes": {
    groups: [
      { title: "Comprendre le droit", icon: "help", start: 0, end: 3 },
      {
        title: "Poser, refuser et imposer",
        icon: "clipboard",
        start: 3,
        end: 7,
      },
      {
        title: "Décompte, durée et report",
        icon: "scale",
        start: 7,
        end: 11,
      },
      {
        title: "Questions et sources",
        icon: "badge",
        start: 11,
        end: 14,
      },
    ],
  },

  "solde-conges-payes": {
    groups: [
      { title: "Calculer le solde", icon: "calculator", start: 0, end: 3 },
      { title: "Lire le bulletin", icon: "clipboard", start: 3, end: 6 },
      { title: "Exemples et cas particuliers", icon: "scale", start: 6, end: 11 },
      { title: "Vérifier et conclure", icon: "badge", start: 11, end: 16 },
    ],
  },
};

/** @deprecated Utiliser GUIDE_TOC_CONFIG ; conserve pour les tests et imports existants. */
export const GUIDE_TOC_GROUPS: Record<string, GuideTocGroup[]> = Object.fromEntries(
  Object.entries(GUIDE_TOC_CONFIG).map(([slug, config]) => [slug, config.groups]),
);

export function getGuideTocGroups(slug: string): GuideTocGroup[] | undefined {
  const config = GUIDE_TOC_CONFIG[slug];
  return config?.groups?.length ? config.groups : undefined;
}
