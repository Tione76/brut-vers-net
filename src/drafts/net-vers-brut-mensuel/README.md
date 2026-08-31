# BROUILLONS — Net vers brut mensuel (intermédiaires par pas de 10 €)

Les **316 fiches publiées** (46 centaines + vagues 1–6 : 1 510 → 4 490) sont dans
`NET_TO_GROSS_AMOUNTS` (`src/site/salaire-net-brut/config.ts`).

Ce dossier conserve les **135 montants intermédiaires restants** (4 510 → 5 990 hors centaines)
sous forme de **données uniquement**, sans routes publiques.

## Source de vérité

| Statut | Constante | Fichier |
|--------|-----------|---------|
| Publié (316) | `NET_TO_GROSS_AMOUNTS` / `PUBLISHED_NET_TO_GROSS_AMOUNTS` | `config.ts` |
| Brouillon (135) | `DRAFT_NET_TO_GROSS_AMOUNTS` | `amounts.ts` |
| Total futur (451) | `buildFuturePublishedCatalog()` | `amounts.ts` |

Lots restants : `buildDraftNetToGrossPublicationBatches(45)` → 3 lots.
