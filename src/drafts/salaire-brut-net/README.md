# BROUILLONS — Salaire brut mensuel → net (1 050 € → 6 000 €)

Série préparée, **non publiée**.

Les fiches reprises strictement du modèle `/quel-salaire-net-mensuel-pour-1000-euros-brut` sont stockées ici sous forme de **données** uniquement.

## Emplacement

```text
src/drafts/salaire-brut-net/
```

## Règles

- Aucune route App Router ne doit importer ce dossier.
- Aucune entrée sitemap / plan du site / navigation / Schema.org public.
- Les montants restent hors de `GROSS_TO_NET_AMOUNTS` (`src/site/salaire-brut-net/config.ts`).
- `generateStaticParams` ne doit pas les inclure tant qu'ils sont en `draft`.
- La fiche pilote 1 000 € reste seule en SSG local ; `PUBLISHED_GROSS_TO_NET_AMOUNTS` reste vide.

## Source de vérité

| Statut | Constante | Fichier |
|--------|-----------|---------|
| SSG pilote (hors sitemap) | `GROSS_TO_NET_AMOUNTS` = `[1000]` | `src/site/salaire-brut-net/config.ts` |
| Indexable / sitemap | `PUBLISHED_GROSS_TO_NET_AMOUNTS` = `[]` | idem |
| Brouillon | `DRAFT_GROSS_TO_NET_AMOUNTS` (1 050 → 6 000, pas 50) | `amounts.ts` |

Préparation d'une fiche : `prepareDraftGrossToNetFiche(montant)`.

## Contenu du dossier

| Fichier | Rôle |
|---------|------|
| `amounts.ts` | Liste des 100 montants brouillon + moitiés de publication |
| `prepare.ts` | Payload complet d'une fiche (modèle 1 000 €) |
| `nearby.ts` | Montants proches (catalogue futur, top 7) |
| `cross-link.ts` | Maillage croisé vers / depuis net → brut |
| `hub.ts` | Hub de série (brouillon) |
| `index-page.ts` / `index-table.ts` | Page index + tableau automatique |
| `publication.ts` | Checklists moitié 1 / moitié 2 |
| `PUBLICATION-PROMPTS.md` | Prompts prêts à coller dans Cursor |

## Publication future

Voir `PUBLICATION_CHECKLIST_HALF_1` / `_HALF_2` dans `publication.ts` et `PUBLICATION-PROMPTS.md`.
