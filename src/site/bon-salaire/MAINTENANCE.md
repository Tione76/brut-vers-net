# Maintenance – bon salaire en France

Page : `/quel-est-un-bon-salaire-en-france`

## Mise à jour annuelle (Insee)

1. Ouvrir Insee Première « salaires du secteur privé » (successeur de n° 2079).
2. Mettre à jour `PRIVATE_DISTRIBUTION_2024` (ou renommer l’année) : D1–D9, médiane, P95, P99, moyennes.
3. Mettre à jour PCS, âges, régions si cités (`PRIVATE_PCS_*`, `PRIVATE_AGE_*`, `PRIVATE_REGION_*`).
4. Mettre à jour `BON_SALAIRE_STAT_YEAR`, dates de publication des sources, `verifiedOn`.
5. Mettre à jour `BON_SALAIRE_UPDATED_AT` / `BON_SALAIRE_UPDATED_AT_LABEL`.
6. Relire le guide : formulations « top 10 % », comparaisons 2 000–5 000 € (sans inventer de percentiles).
7. Exécuter `npm test` (tests `bon-salaire` + guide).

## Interdits

- Inventer un percentile entre deux déciles.
- Présenter le champ privé EQTP comme « tous les Français ».
- Convertir net ↔ brut avec un taux maison.
- Mélanger salaire, revenu disponible, niveau de vie, patrimoine.
