# BROUILLONS — Net vers brut mensuel (intermédiaires par pas de 10 €)

Les **226 fiches publiées** (46 centaines + vagues 1–4 : 1 510 → 3 490) sont dans
`NET_TO_GROSS_AMOUNTS` (`src/site/salaire-net-brut/config.ts`).

Ce dossier conserve les **225 montants intermédiaires restants** (3 510 → 5 990 hors centaines)
sous forme de **données uniquement**, sans routes publiques.

## Source de vérité

| Statut | Constante | Fichier |
|--------|-----------|---------|
| Publié (226) | `NET_TO_GROSS_AMOUNTS` / `PUBLISHED_NET_TO_GROSS_AMOUNTS` | `config.ts` |
| Brouillon (225) | `DRAFT_NET_TO_GROSS_AMOUNTS` | `amounts.ts` |
| Total futur (451) | `buildFuturePublishedCatalog()` | `amounts.ts` |

Lots restants : `buildDraftNetToGrossPublicationBatches(45)` → 5 lots.
