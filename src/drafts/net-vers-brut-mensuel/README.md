# BROUILLONS — Net vers brut mensuel (intermédiaires par pas de 10 €)

Les **91 fiches publiées** (46 centaines + vague 1 : 1 510 → 1 990) sont dans
`NET_TO_GROSS_AMOUNTS` (`src/site/salaire-net-brut/config.ts`).

Ce dossier conserve les **360 montants intermédiaires restants** (2 010 → 5 990 hors centaines)
sous forme de **données uniquement**, sans routes publiques.

## Emplacement

```text
src/drafts/net-vers-brut-mensuel/
```

## Source de vérité

| Statut | Constante | Fichier |
|--------|-----------|---------|
| Publié (91) | `NET_TO_GROSS_AMOUNTS` / `PUBLISHED_NET_TO_GROSS_AMOUNTS` | `config.ts` |
| Brouillon (360) | `DRAFT_NET_TO_GROSS_AMOUNTS` | `amounts.ts` |
| Total futur (451) | `buildFuturePublishedCatalog()` | `amounts.ts` |

Lots restants : `buildDraftNetToGrossPublicationBatches(45)` → 8 lots.

## Publication future

Voir `PUBLICATION_CHECKLIST` dans `publication.ts`.
