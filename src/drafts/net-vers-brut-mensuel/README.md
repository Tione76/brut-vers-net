# BROUILLONS — Net vers brut mensuel (intermédiaires par pas de 10 €)

Les **451 fiches publiées** (46 centaines + vagues 1–9 : 1 510 → 5 990) sont dans
`NET_TO_GROSS_AMOUNTS` (`src/site/salaire-net-brut/config.ts`).

Ce dossier ne conserve **plus aucun brouillon** : la série 1 500 → 6 000 (pas de 10 €)
est complète.

## Source de vérité

| Statut | Constante | Fichier |
|--------|-----------|---------|
| Publié (451) | `NET_TO_GROSS_AMOUNTS` / `PUBLISHED_NET_TO_GROSS_AMOUNTS` | `config.ts` |
| Brouillon (0) | `DRAFT_NET_TO_GROSS_AMOUNTS` | `amounts.ts` |
| Total (451) | `buildFuturePublishedCatalog()` | `amounts.ts` |

Lots restants : `buildDraftNetToGrossPublicationBatches(45)` → 0 lot.
