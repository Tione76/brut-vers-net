# Maintenance : page `/salaire-moyen-france`

Procédure pour mettre à jour l'article après une nouvelle publication officielle.

## 1. Où chercher

1. Insee Première « Les salaires dans le secteur privé en … »
2. Tableaux Insee : salaires nets EQTP par PCS / régions (`statistiques/2012733` ou successeur)
3. Insee Première FPE / FPT / FPH (fonction publique)
4. « L'essentiel sur… les salaires » + séries longues (indice euros constants)
5. Ne pas utiliser un site concurrent comme source primaire

## 2. Vérifier qu'une nouvelle donnée remplace l'ancienne

Contrôler : titre, organisme, URL, date de publication, année statistique, champ, EQTP, brut/net, moyenne/médiane, inclusions (apprentis, Mayotte).

Distinguer date de publication et année statistique. Une page mise à jour peut reprendre les mêmes millésimes.

Si le champ change (ex. intégration des apprentis), documenter la rupture dans `data.ts` et dans la section méthodologie.

## 3. Mettre à jour les objets

Fichier unique : `src/site/salaire-moyen/data.ts`

- `PRIVATE_*` (ou renommer l'année dans les constantes)
- `PRIVATE_PCS_*`, `PRIVATE_SECTORS_*`, `PRIVATE_AGE_*`, `PRIVATE_REGIONS_*`
- `PRIVATE_NET_MEAN_INDEX_CONSTANT` + `PRIVATE_HISTORY_FACTS` (points officiels uniquement, sans interpolation)
- `PUBLIC_*`
- `SALAIRE_MOYEN_SOURCES` (URL, dates, année)
- `SALAIRE_MOYEN_STAT_YEAR`, `SALAIRE_MOYEN_UPDATED_AT*`
- éventuellement `SALAIRE_MOYEN_EDITORIAL_YEAR` / H1 si l'année éditoriale change
- Title evergreen : ne pas y mettre d'année ni « par métier » sans section métier fiable
- `STATS` : garder les identifiants stables alignés sur les montants affichés

## 4. Propagation automatique

Le guide `src/site/guides/data/salaire-moyen-france.ts` consomme `SALAIRE_MOYEN_LABELS`, `PRIVATE_REGIONS_*` et les constantes. Cartes, tableaux, FAQ et graphique d'évolution se mettent à jour via ces libellés.

Illustration : `SalaireMoyenEvolutionIllustration` lit `PRIVATE_NET_MEAN_INDEX_CONSTANT`.

## 5. Contrôles

1. Relire les FAQ et paragraphes chiffrés (pas de chiffres orphelins hors `data.ts`)
2. Relancer `npm test` (notamment `data.test.ts` et `salaire-moyen-france.test.ts`)
3. `npm run check:css-injection` + `npm run lint` + `npm run build`
4. Inspecter le HTML : Title, H1, canonical, Schema, absence d'anciennes valeurs
5. Vérifier le sommaire compact aussi sur `/smic` (composant partagé)

## 6. Interdits

- Ne pas dériver un brut moyen à partir d'un net avec un taux générique
- Ne pas présenter une PCS comme un métier
- Ne pas dater artificiellement les statistiques avec l'année du H1
- Ne pas inventer de points historiques intermédiaires
- Ne pas inventer d'URL de licence photo pour la cover
- Ne pas mettre `dateModified` à la date de build
