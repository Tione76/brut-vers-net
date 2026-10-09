# Manifeste de la vague 1 : refonte net → brut

Ce fichier décrit la répartition réellement implémentée. Ne pas déployer sans validation explicite.

## Totaux

- Série publiée : **451** fiches, de 1 500 € à 6 000 €, pas de 10 €.
- Groupe refondu : **226** fiches.
- Groupe témoin : **225** fiches.
- Exception : **1 650 €** (déjà publiée le 9 octobre 2026, conservée dans le groupe refondu).
- Témoin forcé : **6 000 €**.

## Groupe refondu (226)

- Tous les montants `1 500, 1 520, 1 540, …, 5 980`.
- Plus **1 650 €**.

Source unique : `src/site/salaire-net-brut/redesign-wave.ts` (`getRedesignWave1Amounts()`).

Échantillon de contrôle : 1 500, 1 520, 1 640, 1 650, 1 660, 2 000, 3 500, 5 980.

## Groupe témoin (225)

- Tous les montants `1 510, 1 530, 1 550, …, 5 990`, **sauf 1 650 €**.
- Plus **6 000 €**.

Échantillon de contrôle : 1 510, 1 630, 1 670, 5 990, 6 000.

## Dates

- `datePublished` : 2026-07-15 (inchangée pour toute la série).
- `dateModified` des fiches refondues : 2026-10-09.
- `dateModified` des fiches témoins : 2026-07-15.

Si la publication de cette vague a lieu un autre jour, actualiser `REDESIGN_WAVE1_DATE_MODIFIED` avant le déploiement, sans modifier `datePublished`.

## Chevauchements de tableaux

Les tableaux refondus (N−5 à N+4, euro par euro) ne se chevauchent pas entre eux.

Les fiches témoins conservent l’ancien tableau ±50 € / ±100 €. Des montants publiés (par exemple 1 560 €) apparaissent à la fois comme ligne courante d’une fiche refondue et comme ligne voisine d’une fiche témoin. Ces chevauchements sont hérités : les témoins n’ont pas été modifiés.
