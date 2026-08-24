/**
 * État de la série Net → Brut mensuel après vague 2 des intermédiaires (pas de 10 €).
 *
 * - Publiés : 136 (46 centaines + 90 intermédiaires 1 510 → 2 490)
 * - Brouillons : 315 (2 510 → 5 990 hors centaines)
 *
 * Publication d'un lot : déplacer des montants de DRAFT_NET_TO_GROSS_AMOUNTS
 * vers NET_TO_GROSS_AMOUNTS (batch publié dans config.ts), puis retirer ces montants des brouillons.
 */

import { NET_TO_GROSS_AMOUNTS, PUBLISHED_NET_TO_GROSS_AMOUNTS } from "@/site/salaire-net-brut/config";
import {
  DRAFT_NET_TO_GROSS_AMOUNTS,
  buildFuturePublishedCatalog,
} from "./amounts";

export const PUBLICATION_CHECKLIST = [
  "Choisir le prochain lot via buildDraftNetToGrossPublicationBatches(45)[0]",
  "Ajouter ces montants au batch publié dans config.ts (ordre croissant du catalogue)",
  "Retirer ces montants de DRAFT_NET_TO_GROSS_AMOUNTS (amounts.ts)",
  "Vérifier generateStaticParams / sitemap / Hub / Index / Nearby (automatiques via la liste publiée)",
  "Mettre à jour les tests de comptage published/draft",
  "Lancer lint, tests et build",
] as const;

const EXPECTED_PUBLISHED_COUNT = 136;
const EXPECTED_DRAFT_COUNT = 315;
const EXPECTED_TOTAL = 451;

/** Vérifie que les 46 centaines restent présentes dans le catalogue publié. */
export function assertPublishedHundredsIntact(): void {
  if (PUBLISHED_NET_TO_GROSS_AMOUNTS !== NET_TO_GROSS_AMOUNTS) {
    throw new Error("PUBLISHED_NET_TO_GROSS_AMOUNTS doit rester l'alias de NET_TO_GROSS_AMOUNTS.");
  }
  for (let i = 0; i < 46; i += 1) {
    const hundred = 1500 + i * 100;
    if (!(NET_TO_GROSS_AMOUNTS as readonly number[]).includes(hundred)) {
      throw new Error(`La centaine publiée ${hundred} manque au catalogue.`);
    }
  }
  if (NET_TO_GROSS_AMOUNTS[0] !== 1500 || NET_TO_GROSS_AMOUNTS[NET_TO_GROSS_AMOUNTS.length - 1] !== 6000) {
    throw new Error("Le catalogue publié doit commencer à 1 500 € et finir à 6 000 €.");
  }
}

/** Vérifie l'état published/draft après les vagues d'intermédiaires déjà publiées. */
export function assertTenEuroIntermediatesPrepared(): void {
  if (NET_TO_GROSS_AMOUNTS.length !== EXPECTED_PUBLISHED_COUNT) {
    throw new Error(
      `Attendu ${EXPECTED_PUBLISHED_COUNT} montants publiés, reçu ${NET_TO_GROSS_AMOUNTS.length}.`,
    );
  }
  if (DRAFT_NET_TO_GROSS_AMOUNTS.length !== EXPECTED_DRAFT_COUNT) {
    throw new Error(
      `Attendu ${EXPECTED_DRAFT_COUNT} brouillons restants, reçu ${DRAFT_NET_TO_GROSS_AMOUNTS.length}.`,
    );
  }
  if (DRAFT_NET_TO_GROSS_AMOUNTS[0] !== 2510 || DRAFT_NET_TO_GROSS_AMOUNTS[EXPECTED_DRAFT_COUNT - 1] !== 5990) {
    throw new Error("Les brouillons restants doivent aller de 2 510 € à 5 990 €.");
  }

  const published = new Set<number>(NET_TO_GROSS_AMOUNTS as readonly number[]);
  for (let i = 0; i < DRAFT_NET_TO_GROSS_AMOUNTS.length; i += 1) {
    const amount = DRAFT_NET_TO_GROSS_AMOUNTS[i]!;
    if (amount % 10 !== 0) {
      throw new Error(`Brouillon non multiple de 10 : ${amount}.`);
    }
    if (amount % 100 === 0) {
      throw new Error(`Brouillon multiple de 100 (déjà publié) : ${amount}.`);
    }
    if (published.has(amount)) {
      throw new Error(`Le brouillon ${amount} est déjà publié.`);
    }
    if (i > 0) {
      const prev = DRAFT_NET_TO_GROSS_AMOUNTS[i - 1]!;
      const expectedGap = amount % 100 === 10 ? 20 : 10;
      if (amount - prev !== expectedGap) {
        throw new Error(`Trou ou écart inattendu entre ${prev} et ${amount}.`);
      }
    }
  }

  for (const amount of [1510, 1990, 2010, 2250, 2490] as const) {
    if (!published.has(amount)) {
      throw new Error(`Le montant déjà publié ${amount} manque au catalogue.`);
    }
  }

  const future = buildFuturePublishedCatalog();
  if (future.length !== EXPECTED_TOTAL) {
    throw new Error(`Attendu ${EXPECTED_TOTAL} montants totaux, reçu ${future.length}.`);
  }
  if (future[0] !== 1500 || future[EXPECTED_TOTAL - 1] !== 6000) {
    throw new Error("Le catalogue futur doit aller de 1 500 € à 6 000 €.");
  }
  for (let i = 0; i < future.length; i += 1) {
    if (future[i] !== 1500 + i * 10) {
      throw new Error(`Trou dans la séquence globale à l'index ${i} : ${future[i]}.`);
    }
  }
}

/**
 * Vérifie : centaines intactes + état drafts/publiés cohérent + aucun brouillon dans le publié.
 */
export function assertDraftsNotPublished(): void {
  assertPublishedHundredsIntact();
  assertTenEuroIntermediatesPrepared();
}

/**
 * @deprecated Alias conservé : vérifie les centaines + l'état courant published/draft.
 */
export function assertExtendedSeriesPublished(): void {
  assertDraftsNotPublished();
}
