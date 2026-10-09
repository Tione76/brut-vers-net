# Mission Cursor : seconde vague de refonte SEO (fiches net → brut restantes)

Ce prompt est autonome. Il doit fonctionner même si le projet est repris après deux mois, sans le contexte de la première vague.

Ne rien committer, pousser ou déployer sans autorisation explicite.

## Contexte

Le site [brut-vers-net.fr](https://www.brut-vers-net.fr) est un site Next.js 15 (App Router, SSG) de conversion salaire net ↔ brut.

La série concernée compte **451 fiches** :

- URL publique : `/combien-gagner-brut-mensuel-pour-{montant}-net`
- Rewrite interne : `/net-vers-brut/[montant]`
- Montants publiés : 1 500 € à 6 000 €, pas de 10 €
- Catalogue : `NET_TO_GROSS_AMOUNTS` dans `src/site/salaire-net-brut/config.ts`

Une première vague a déjà modernisé **226 fiches** selon le modèle validé de :

`https://www.brut-vers-net.fr/combien-gagner-brut-mensuel-pour-1650-net`

Les **225 fiches restantes** sont encore dans l’ancienne version. Elles constituent le groupe témoin SEO. Cette mission consiste à leur appliquer **exactement** le même modèle, sans dégrader les 226 fiches déjà modernisées.

## Objectif

Mettre à jour uniquement les 225 fiches encore en ancienne version.

Après cette vague :

- 451 / 451 fiches utilisent le modèle refondu.
- Les URL, slugs, canonicals et redirections restent inchangés.
- Aucune page n’est en `noindex` involontaire.
- Les pages restent SSG.

## Comment identifier les deux groupes

La source de vérité actuelle est `src/site/salaire-net-brut/redesign-wave.ts`.

- Groupe déjà modernisé : `isNetToGrossRedesign(netMonthly) === true`  
  soit 1 500, 1 520, … 5 980, plus l’exception 1 650. Total 226.
- Groupe à moderniser maintenant : `getControlWave1Amounts()`  
  soit 1 510, 1 530, … 5 990 (sauf 1 650), plus 6 000. Total 225.

Ne pas recalculer une autre répartition. Vérifier ces totaux sur les montants réellement publiés (`NET_TO_GROSS_AMOUNTS.length === 451`) avant de modifier le code.

Échantillon obligatoire :

- Déjà modernisées (ne pas les casser) : 1 500, 1 520, 1 640, 1 650, 1 660, 2 000, 3 500, 5 980
- À moderniser : 1 510, 1 530, 1 550, 1 630, 1 670, 5 990, 6 000

## Modèle à reproduire

Le modèle visuel, éditorial, SEO et Schema.org est celui de 1 650 €, déjà factorisé :

- Sélection / dates : `src/site/salaire-net-brut/redesign-wave.ts`
- Copy, FAQ, JSON-LD, tableaux N−5 à N+4 : `src/site/salaire-net-brut/page-1650.ts`
- Rendu : `src/site/salaire-net-brut/page-1500.tsx` branché par `isNetToGrossRedesign`
- CSS : `src/site/salaire-net-brut/page-1650.css` (classe `.net-gross-1650`)
- Sidebar courte : `src/site/salaire-net-brut/page-1650-sidebar.tsx`
- Route : `src/app/net-vers-brut/[montant]/page.tsx`

Ne pas créer 225 fichiers de composants. Étendre le booléen `isNetToGrossRedesign` (ou le remplacer par « toute la série ») pour que les 225 fiches restantes empruntent le même chemin.

Cette factorisation ne doit pas modifier visuellement les 226 fiches déjà modernisées.

## Travail à faire

1. Faire passer `isNetToGrossRedesign` à vrai pour **tous** les montants de `NET_TO_GROSS_AMOUNTS`, ou supprimer le groupe témoin une fois les totaux vérifiés.
2. Conserver le modèle SEO :

   - Title : `{montant} net en brut : calcul et conversion`
   - H1 : `{montant} net en brut : combien ça fait ?`
   - Meta : `{montant} net en brut : découvrez le salaire brut estimé pour un non-cadre, un cadre ou la fonction publique. Tableau et calculateur gratuits.`
   - Pas d’année dans le title ni la meta
   - Une seule H1
   - Canonical auto-référente, URL inchangée
   - `og:type = website`
   - `og:url` identique à la canonical

3. JSON-LD : reprendre `buildRedesignPageJsonLd`

   - Types : WebPage, BreadcrumbList, Organization, WebSite, Person, ImageObject, FAQPage
   - WebPage : `publisher` Organization, `hasPart` FAQ, **pas** de `about: Organization`, **pas** de `mainEntity` FAQ
   - Identifiants locaux propres à chaque fiche (`#webpage`, `#breadcrumb`, `#primaryimage`, `#faq`)
   - Identifiants globaux stables (`#website`, `#organization`, `#author`)
   - FAQ JSON-LD identique à la FAQ visible
   - Aucune fiche ne doit pointer vers 1 650 € par erreur

4. Dates

   - `datePublished` : conserver la date historique de chaque fiche (série : 2026-07-15, constante `REDESIGN_DATE_PUBLISHED` / `NET_TO_GROSS_UPDATED_AT`)
   - `dateModified` : uniquement pour les **225 fiches réellement modifiées dans cette seconde vague**, avec la **date réelle de publication** de cette vague
   - Ne **pas** réécrire `dateModified` des 226 fiches déjà modernisées (elles restent au 2026-10-09, sauf si une correction éditoriale réelle le justifie)
   - Ne pas utiliser la date de build

5. Tableaux de voisinage : pour N, afficher N−5 à N+4 (10 lignes, ligne N mise en avant)

   - Deux fiches ne doivent jamais partager le même montant dans ces tableaux
   - Avec toute la série au pas de 10 €, les plages se touchent (ex. 1 510 → 1 505–1 514 et 1 520 → 1 515–1 524) sans se recouvrir
   - Vérifier l’absence de chevauchement sur les 451 fiches

6. Maillage « Comparez les salaires nets proches de… » : 7 voisins publiés, hors page courante, URL existantes

7. Sidebar : 6 liens, calculateur prérempli `/?net={montant}&profil=non-cadre`

8. CTA final : « Vous souhaitez convertir un autre montant ? » / « Calculer mon salaire net en brut »

9. Calculs : coefficients existants 0,78 / 0,75 / 0,81, `estimateGrossMonthlyFromNet`, jamais de PAS fictif, toujours présenter des estimations

10. Charte : aucun tiret cadratin (U+2014)

## Isolation des 226 fiches déjà modernisées

Vérifier par tests que 1 500, 1 650, 2 000, 5 980 conservent :

- title, H1, meta, canonical
- JSON-LD WebPage `hasPart` + `publisher`
- `datePublished` 2026-07-15
- `dateModified` 2026-10-09
- tableau N−5 à N+4
- sidebar à 6 liens

## Tests et build

Mettre à jour les tests de `redesign-wave.test.ts` et `page-1650.test.ts` : il ne doit plus rester de groupe témoin.

Couvrir notamment : 1 500, 1 510, 1 520, 1 640, 1 650, 1 660, 2 000, 3 500, 5 980, 5 990, 6 000.

Exécuter :

- tests Vitest pertinents
- ESLint
- `npm run build`

Ne pas généraliser d’autres séries (brut → net, primes, augmentations).

## Rapport attendu

1. Nombre de fiches réellement passées au modèle refondu dans cette vague
2. Confirmation que les 226 de la vague 1 sont intactes
3. Dates `datePublished` / `dateModified` appliquées
4. Résultat des tests et du build
5. Anomalies SEO éventuelles

Ne pas déployer avant validation explicite.
