# BROUILLONS — Salaire brut mensuel → net

Série **complète publiée** (1 000 € → 6 000 €, pas de 50 €).

Les helpers de ce dossier restent disponibles pour l'historique et les tests anti-fuite.
`DRAFT_GROSS_TO_NET_AMOUNTS` est volontairement vide.

## Emplacement

```text
src/drafts/salaire-brut-net/
```

## Règles

- Aucune route App Router ne doit importer ce dossier.
- Source de vérité publique : `GROSS_TO_NET_AMOUNTS` / `PUBLISHED_GROSS_TO_NET_AMOUNTS`
  dans `src/site/salaire-brut-net/config.ts`.

## Source de vérité

| Statut | Constante | Fichier |
|--------|-----------|---------|
| SSG + sitemap | `GROSS_TO_NET_AMOUNTS` = 1 000 → 6 000 (101) | `src/site/salaire-brut-net/config.ts` |
| Indexable | `PUBLISHED_GROSS_TO_NET_AMOUNTS` = alias | idem |
| Brouillon | `DRAFT_GROSS_TO_NET_AMOUNTS` = `[]` | `amounts.ts` |

## Contenu du dossier

| Fichier | Rôle |
|---------|------|
| `amounts.ts` | Liste brouillon (vide après vague 2) |
| `prepare.ts` | Payload historique d'une fiche |
| `nearby.ts` | Montants proches (catalogue futur) |
| `cross-link.ts` | Maillage croisé vers / depuis net → brut |
| `hub.ts` / `index-page.ts` | Helpers brouillon Hub / Index |
| `publication.ts` | Checklists moitié 1 / moitié 2 |
| `PUBLICATION-PROMPTS.md` | Prompts de publication |

## Publication

Vague 1 et vague 2 effectuées. Voir `assertSeriesFullyPublished()` dans `publication.ts`.
