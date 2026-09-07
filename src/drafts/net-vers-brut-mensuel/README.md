# BROUILLONS — Net vers brut mensuel (intermédiaires par pas de 10 €)

Les **406 fiches publiées** (46 centaines + vagues 1–8 : 1 510 → 5 490) sont dans
`NET_TO_GROSS_AMOUNTS` (`src/site/salaire-net-brut/config.ts`).

Ce dossier conserve les **45 montants intermédiaires restants** (5 510 → 5 990 hors centaines)
sous forme de **données uniquement**, sans routes publiques.

## Source de vérité

| Statut | Constante | Fichier |
|--------|-----------|---------|
| Publié (406) | `NET_TO_GROSS_AMOUNTS` / `PUBLISHED_NET_TO_GROSS_AMOUNTS` | `config.ts` |
| Brouillon (45) | `DRAFT_NET_TO_GROSS_AMOUNTS` | `amounts.ts` |
| Total futur (451) | `buildFuturePublishedCatalog()` | `amounts.ts` |

Lots restants : `buildDraftNetToGrossPublicationBatches(45)` → 1 lot.
