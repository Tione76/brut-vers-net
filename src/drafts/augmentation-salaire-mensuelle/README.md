# BROUILLONS — Augmentation mensuelle de salaire (60 € → 500 €)

Série préparée, **non publiée**.

Les fiches reprises strictement du modèle `/augmentation-salaire-mensuelle-50-euros-brut` sont stockées ici sous forme de **données** uniquement.

## Emplacement

```text
src/drafts/augmentation-salaire-mensuelle/
```

## Règles

- Aucune route App Router ne doit importer ce dossier.
- Aucune entrée sitemap / plan du site / navigation / Schema.org public.
- Les montants restent hors de `MONTHLY_INCREASE_AMOUNTS` (`src/site/augmentation-salaire-mensuelle/config.ts`).
- `generateStaticParams` ne doit pas les inclure tant qu'ils sont en `draft`.

## Source de vérité

| Statut | Constante | Fichier |
|--------|-----------|---------|
| Publié | `MONTHLY_INCREASE_AMOUNTS` / `PUBLISHED_MONTHLY_INCREASE_AMOUNTS` | `src/site/augmentation-salaire-mensuelle/config.ts` |
| Brouillon | `DRAFT_MONTHLY_INCREASE_AMOUNTS` | `amounts.ts` |

Préparation d'une fiche : `prepareDraftMonthlyIncreaseFiche(montant)`.

## Publication future

Voir `PUBLICATION_CHECKLIST` dans `publication.ts` et le prompt de publication fourni en fin de tâche de préparation.
