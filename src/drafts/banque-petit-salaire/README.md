# BROUILLON — /banque-petit-salaire

Guide affiliation / comparatif banques pour petits salaires.

## État actuel

- **Exclu** du registre publié (`guides` dans `src/site/guides/registry.ts`).
- Conservé dans `draftGuides` (même fichier).
- En production / build : la route renvoie un **404** réel (`notFound()`).
- Aperçu local uniquement : `npm run dev` puis ouvrir `/banque-petit-salaire`.
- Absent du sitemap, du hub `/guides`, de la recherche interne et des maillages publics.
- Contenu : cartes cliquables, module à onglets, FAQ, méthode/sources, JSON-LD (Article + FAQPage + ItemList + BankAccount).

## Fichiers principaux

- `src/site/banque-petit-salaire/*` (données, cartes, onglets, schema)
- `src/site/guides/data/banque-petit-salaire.ts` (métadonnées draft)
- `src/app/banque-petit-salaire/page.tsx`
- Cover et logos dans `public/images/`

## Republier quand le guide sera prêt

1. Finaliser contenu, SEO et éventuels liens affiliés (`isAffiliate` + `rel="sponsored"`).
2. Dans `src/site/guides/registry.ts` : retirer de `draftGuides`, réintégrer dans `guides`.
3. Dans `page.tsx` : retirer le garde `isDraftPreviewAllowed` / `notFound` production.
4. Remettre le maillage public utile si pertinent (ex. SMIC).
5. Mettre à jour les tests pour le statut publié.
6. Vérifier hub, recherche, sitemap et absence de 404.
