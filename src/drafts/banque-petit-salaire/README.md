# BROUILLON — /banque-petit-salaire

Guide affiliation banques pour petits salaires. Contenu, SEO et données structurées encore à finaliser.

## État actuel

- **Exclu** du registre publié (`guides` dans `src/site/guides/registry.ts`).
- Conservé dans `draftGuides` (même fichier).
- En production / build : la route renvoie un **404** réel (`notFound()`).
- Aperçu local uniquement : `npm run dev` puis ouvrir `/banque-petit-salaire`.
- Absent du sitemap, du hub `/guides`, de la recherche interne et des maillages publics.

## Fichiers conservés (ne pas supprimer)

- `src/site/guides/data/banque-petit-salaire.ts`
- `src/site/banque-petit-salaire/*` (données, cartes, moteur)
- `src/app/banque-petit-salaire/page.tsx`
- Cover `public/images/covers/guides/banque-petit-salaire.webp`
- Logos `public/images/banques/*`
- Entrées dormantes : `covers.ts`, `toc-groups.ts`, `guides-hub-data.ts`, `sidebar.ts`

## Republier quand le guide sera prêt

1. Finaliser contenu, SEO et schema.
2. Dans `src/site/guides/registry.ts` : retirer le guide de `draftGuides` et le réintégrer dans `guides` (ordre éditorial souhaité).
3. Dans `src/app/banque-petit-salaire/page.tsx` : retirer le garde `isDraftPreviewAllowed` / `notFound` production et recharger via `getGuideBySlug`.
4. Remettre le maillage public utile (ex. bloc internal-link dans `smic.ts` si toujours pertinent).
5. Mettre à jour `src/site/guides/banque-petit-salaire.test.ts` pour réaffirmer publication, sitemap et indexation.
6. Vérifier hub, recherche, sitemap et absence de 404.
