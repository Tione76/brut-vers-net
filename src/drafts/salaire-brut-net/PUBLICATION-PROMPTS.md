# Prompts de publication — série salaire brut mensuel → net

Deux prompts prêts à coller dans Cursor. **Ne rien publier tant que vous n'avez pas validé le pilote et lancé explicitement l'un de ces prompts.**

Décisions figées :
- Nom du Hub : **Tous les salaires bruts mensuels convertis en net**
- Vague 1 = Hub + Index + helpers + maillage + fiches **1 000 € → 3 500 €**
- Vague 2 = **uniquement** les fiches restantes **3 550 € → 6 000 €** (Hub et Index déjà en ligne)

---

## Prompt n°1 — Première publication (Hub + Index + fiches 1 000 → 3 500)

```text
# Publier la première vague de la série « Salaire brut mensuel → net »

## Contexte

La fiche pilote 1 000 € est validée. Les brouillons sont prêts dans :
`src/drafts/salaire-brut-net/`

Cette première publication doit faire découvrir à Google **toute l'architecture** de la série dès le départ : Hub, Index, helpers, maillage, et les premières fiches.

## Périmètre obligatoire (vague 1)

1. **Hub de la série** (à publier immédiatement)
   - Nom / H1 / title : **Tous les salaires bruts mensuels convertis en net**
   - URL : `DRAFT_GROSS_TO_NET_HUB_PATH` (`/salaire-brut-mensuel-en-net`)
   - Créer la route App Router (+ rewrite si besoin)
   - Contenu depuis `prepareDraftGrossToNetHub()` / `buildDraftGrossToNetHubSeo()`
   - Enregistrer dans `public-pages.ts` (indexable)
   - Schema.org, breadcrumb, auteur, partage, FAQ alignés sur le hub brouillon

2. **Page Index** (à publier immédiatement avec le Hub)
   - URL : `DRAFT_GROSS_TO_NET_INDEX_PATH` (`/tableau-salaire-brut-mensuel-en-net`)
   - Créer la route App Router
   - Tableau via `buildGrossToNetIndexRows` / `prepareDraftGrossToNetIndexPage`
   - Breadcrumb parent = Hub (« Tous les salaires bruts mensuels convertis en net »)
   - Enregistrer dans `public-pages.ts` (indexable)

3. **Fiches 1 000 € → 3 500 €**
   - Publier le pilote **1 000 €** (ajouter à `PUBLISHED_GROSS_TO_NET_AMOUNTS`)
   - Ajouter `DRAFT_GROSS_TO_NET_AMOUNTS_HALF_1` (1 050 → 3 500, pas de 50 €) à `GROSS_TO_NET_AMOUNTS`
   - Aligner `PUBLISHED_GROSS_TO_NET_AMOUNTS` sur tous les montants publiés (SSG + sitemap)
   - Enregistrer la série dans `public-pages.ts` (comme net→brut)

4. **Helpers + maillage**
   - Brancher « Montants proches » sur le catalogue publié (réutiliser `getPreparedNearbyAmounts`)
   - Afficher le maillage croisé `getInverseNetToGrossLink` uniquement si non null
   - Aucun lien cassé

5. **Brouillons restants**
   - Retirer de `DRAFT_GROSS_TO_NET_AMOUNTS` les montants de la moitié 1
   - Conserver uniquement la moitié 2 (3 550 → 6 000) en brouillon
   - Mettre à jour `assertDraftsNotPublished` / tests

## Contraintes

- Reprendre strictement le template de la fiche 1 000 € (aucune dérive éditoriale)
- Ne pas modifier Net → Brut ni Augmentation mensuelle (sauf lecture pour le maillage croisé)
- Ne pas modifier les coefficients / formules
- Ne pas publier les fiches 3 550 → 6 000
- Suivre `PUBLICATION_CHECKLIST_HALF_1`

## Vérifications automatiques

- sitemap contient **Hub + Index + fiches 1 000 → 3 500**
- generateStaticParams = montants publiés uniquement
- titles / meta / canonical / Schema / FAQ sync
- Hub : title + H1 = « Tous les salaires bruts mensuels convertis en net »
- montants proches sans auto-lien
- hub / index listent les fiches déjà publiées
- lint / test / build OK
- aucun commit / push sauf demande explicite

## Rapport attendu

Fichiers créés/modifiés, nombre de fiches publiées, URLs Hub/Index, confirmation architecture complète indexable, résultats lint/test/build.
```

---

## Prompt n°2 — Seconde publication (fiches 3 550 → 6 000 uniquement)

```text
# Publier la seconde vague de la série « Salaire brut mensuel → net »

## Contexte

La première vague est déjà en ligne :
- Hub « Tous les salaires bruts mensuels convertis en net »
- Page Index
- Helpers + maillage
- Fiches 1 000 € → 3 500 €

Les brouillons restants sont dans `src/drafts/salaire-brut-net/` (`DRAFT_GROSS_TO_NET_AMOUNTS_HALF_2`).

## Périmètre (vague 2 uniquement)

1. Ajouter `DRAFT_GROSS_TO_NET_AMOUNTS_HALF_2` (3 550 → 6 000) à `GROSS_TO_NET_AMOUNTS`
2. Aligner `PUBLISHED_GROSS_TO_NET_AMOUNTS`
3. Vider `DRAFT_GROSS_TO_NET_AMOUNTS` (série complète)
4. **Ne pas recréer** le Hub ni l'Index : ils doivent se compléter automatiquement via le catalogue
5. Les montants proches doivent couvrir toute la série
6. Vérifier le maillage croisé sur un échantillon (bas / milieu / haut de gamme)
7. Suivre `PUBLICATION_CHECKLIST_HALF_2`

## Contraintes

- Aucune dérive vs template 1 000 €
- Ne pas modifier Net → Brut / Augmentation / coefficients
- Ne pas republier ni renommer le Hub / l'Index
- lint / test / build obligatoires
- aucun commit / push sauf demande explicite

## Vérifications

- 101 fiches SSG (1 000 → 6 000, pas 50)
- sitemap / plan du site complets
- Hub + Index à 101 entrées (auto)
- nearby = 7 voisins (sauf extrémités)
- pas de liens cassés, pas d'auto-lien
- FAQ visible = FAQPage sur un échantillon

## Rapport attendu

Nombre total de fiches, fichiers touchés, résultats lint/test/build, confirmation série complète.
```
