# BROUILLONS — Net vers brut mensuel (3 100 € → 6 000 €)

Série préparée, **non publiée**.

Les fiches reprises strictement du modèle `/combien-gagner-brut-mensuel-pour-1500-net` sont stockées ici sous forme de **données** uniquement.

## Emplacement

```text
src/drafts/net-vers-brut-mensuel/
```

## Règles

- Aucune route App Router ne doit importer ce dossier.
- Aucune entrée sitemap / plan du site / navigation / Schema.org public.
- Les montants restent hors de `NET_TO_GROSS_AMOUNTS` (`src/site/salaire-net-brut/config.ts`).
- `generateStaticParams` ne doit pas les inclure tant qu'ils sont en `draft`.

## Source de vérité

| Statut | Constante | Fichier |
|--------|-----------|---------|
| Publié | `NET_TO_GROSS_AMOUNTS` / `PUBLISHED_NET_TO_GROSS_AMOUNTS` | `src/site/salaire-net-brut/config.ts` |
| Brouillon | `DRAFT_NET_TO_GROSS_AMOUNTS` | `amounts.ts` |

Préparation d'une fiche : `prepareDraftNetToGrossFiche(montant)`.

## Publication future

Voir `PUBLICATION_CHECKLIST` dans `publication.ts` et le prompt de publication fourni en fin de tâche de préparation.
