/**
 * Sources officielles du calculateur d'augmentation de salaire
 * (même présentation que la page d'accueil, vérifiées le 20 octobre 2026).
 */

export const INCREASE_SOURCES_VERIFIED_AT = "2026-10-20";

export const INCREASE_SOURCES_VERIFIED_AT_LABEL = new Date(
  INCREASE_SOURCES_VERIFIED_AT,
).toLocaleDateString("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export interface IncreaseOfficialSource {
  org: string;
  title: string;
  href: string;
  note: string;
}

export const INCREASE_OFFICIAL_SOURCES: readonly IncreaseOfficialSource[] = [
  {
    org: "Service-Public Entreprendre",
    title: "Salaire, primes et avantages (F2301)",
    href: "https://entreprendre.service-public.gouv.fr/vosdroits/F2301",
    note: "Négociation salariale, fixation et modification du salaire, primes et treizième mois.",
  },
  {
    org: "URSSAF - Mon-entreprise",
    title: "Simulateur salaire brut / net",
    href: "https://mon-entreprise.urssaf.fr/simulateurs/salaire-brut-net",
    note: "Référence pour les cotisations et la conversion brut/net (estimations indicatives).",
  },
  {
    org: "Service-Public",
    title: "CSG et CRDS sur les revenus d'activité et de remplacement (F2971)",
    href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2971",
    note: "Assiettes CSG/CRDS, parts déductibles et non déductibles, incidence sur le net imposable.",
  },
  {
    org: "Service-Public",
    title: "Prélèvement à la source : obligations de l'employeur (F34732)",
    href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F34732",
    note: "Taux personnalisé, taux non personnalisé et rôle de l'employeur.",
  },
  {
    org: "BOFiP - DGFiP",
    title: "Grilles des taux par défaut du prélèvement à la source (BOI-BAREME-000037)",
    href: "https://bofip.impots.gouv.fr/bofip/11255-PGP.html/identifiant=BOI-BAREME-000037-20260706",
    note: "Grille métropole applicable à compter du 1er mai 2026 (vérifiée le 20 octobre 2026).",
  },
] as const;
