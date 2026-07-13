# Calculateur salaire Brut vers Net

Documentation interne du simulateur de salaire de **brut-vers-net**.

## Nature du calcul

Ce calculateur fournit une **estimation indicative**. Il ne reproduit pas une fiche de paie, ne détaille pas les cotisations et ne calcule pas le coût employeur.

## Nature des hypothèses

Certaines valeurs du moteur proviennent de textes et barèmes officiels. D'autres sont des **hypothèses techniques** nécessaires pour produire une estimation grand public à partir d'un nombre limité d'entrées.

### Valeurs réglementaires (sources officielles)

- PASS et PMSS
- Assiette CSG/CRDS (abattement forfaitaire)
- Taux CSG déductible, CSG non déductible, CRDS
- Barème PAS (taux neutres)

### Hypothèses techniques (non réglementaires)

- Estimation forfaitaire de la participation employeur à la complémentaire santé (mutuelle)

Pourquoi cette hypothèse est nécessaire :

- La part employeur est imposable et doit être réintégrée dans le net imposable.
- Le moteur ne connaît ni le contrat collectif, ni son coût exact, ni les options, ni les ayants droit.
- Il n'existe pas de relation réglementaire générale permettant de déduire cette part à partir du salaire brut.

## Profils disponibles

Le calculateur est exclusivement destiné aux **salariés**. Trois profils généraux sont proposés, sans sous-catégorie :

| Identifiant | Libellé | Coefficient | Retenues estimées |
|---|---|---:|---|
| `nonExecutive` | Salarié non-cadre | 0,78 | Environ 22 % |
| `executive` | Salarié cadre | 0,75 | Environ 25 % |
| `publicService` | Fonction publique | 0,81 | Environ 19 % |

Les professions libérales et le portage salarial ne sont pas couverts : ils nécessitent généralement des variables différentes (chiffre d'affaires, frais professionnels, frais de gestion, etc.) et feront l'objet de calculateurs dédiés afin de garantir la fiabilité des résultats.

Formules :

- Brut vers Net : `net = brut × coefficient`
- Net vers Brut : `brut = net ÷ coefficient`

## Variables disponibles

### Six champs de salaire

- Brut horaire, brut mensuel, brut annuel
- Net horaire, net mensuel, net annuel

Le dernier champ modifié sert de référence. Les cinq autres valeurs sont recalculées automatiquement.

### Paramètres

| Paramètre | Valeurs | Défaut |
|---|---|---|
| Statut professionnel | 3 profils ci-dessus | Salarié non-cadre |
| Temps de travail | 10 % à 100 % | 100 % |
| Mois de rémunération | 12, 13, 14, 15, 16 | 12 |
| Prélèvement à la source | 0 % à 43 % (pas 0,1 %) | 0 % (auto après saisie) |

## Conversions

Base à temps plein :

- 35 heures par semaine
- 151,67 heures par mois

Heures mensuelles proratisées :

`151,67 × (temps de travail / 100)`

Relations :

- `mensuel = horaire × heures mensuelles`
- `annuel = mensuel × nombre de mois`

## Estimation du revenu net imposable

Le calculateur estime un **revenu net imposable mensuel** (variable interne, jamais affichée) à partir du salaire net et d'éléments typiques d'une fiche de paie.

### Objectif

- Se rapprocher d'une fiche de paie française, sans devenir un logiciel de paie.
- Améliorer la crédibilité du prélèvement à la source en calculant le taux sur une base plus réaliste que le simple net.

### Architecture versionnée

- Version courante : `src/site/salary-calculator/taxable-income/2026/`
- Point d'entrée : `src/site/salary-calculator/taxable-income/index.ts` (exporte la version courante)

### Paramètres centralisés (2026)

Fichier : `src/site/salary-calculator/taxable-income/2026/config.ts`

- **Assiette CSG/CRDS** : abattement forfaitaire de 1,75 %, soit une assiette de 98,25 % et un plafond à 4 PASS (BOSS - Assiette générale).
- **PASS 2026** : 48 060 € (PMSS 4 005 €) (Service-Public.fr - arrêté du 22 décembre 2025).
- **CSG déductible** : 6,80 % (calculée à titre informatif).
- **CSG non déductible** : 2,40 %.
- **CRDS** : 0,50 %.
- **Participation employeur complémentaire santé** : intégrée au revenu imposable (BOFiP - CGI art. 83, 1° quater). Le montant exact dépend du contrat collectif, il n'existe pas de relation générale avec le salaire brut. Le moteur utilise donc une **hypothèse forfaitaire** (montant central) et une fourchette basse/haute de sensibilité.

### Méthode (2026)

1. Estimation de l'assiette CSG/CRDS mensuelle à partir du brut mensuel et d'un plafonnement annuel à 4 PASS.
2. Calcul de la **CSG déductible** (informatif), de la **CSG non déductible** et de la **CRDS** sur cette assiette.
3. Ajout d'une estimation forfaitaire de la participation employeur à la complémentaire santé.
4. Assemblage :

- `net imposable estimé = net + CSG non déductible + CRDS + mutuelle employeur + autres réintégrations (si activées)`

### Fonctions (2026)

Fichier : `src/site/salary-calculator/taxable-income/2026/estimate-taxable-income.ts`

- `estimateCsgBaseMonthly()`
- `estimateDeductibleCsgMonthly()`
- `estimateNonDeductibleCsgMonthly()`
- `estimateCrdsMonthly()`
- `estimateEmployerHealthContributionMonthly()`
- `estimateTaxableAdjustmentsMonthly()`
- `buildTaxableIncomeEstimate()` (fonction principale, retourne un objet détaillé)

### Complémentaire santé (mutuelle) - méthode

- La part employeur est **imposable** et donc réintégrée dans le net imposable (BOFiP, CGI art. 83, 1° quater).
- Le moteur ne connaît pas le contrat collectif réel (coût total, options, ayants droit). Il ne peut donc pas déduire la part employeur exacte.
- Il n'existe pas de relation réglementaire générale permettant de calculer cette part à partir du salaire brut.
- Le moteur utilise une hypothèse forfaitaire `centralMonthlyAmount` et conserve `lowMonthlyAmount` et `highMonthlyAmount` pour des tests de sensibilité internes.

Référence DREES utilisée pour l'ordre de grandeur (traçabilité) :

- **Organisme** : DREES
- **Titre** : "La complémentaire santé d’entreprise des salariés du secteur privé"
- **Publication** : La complémentaire santé, Édition 2024
- **Fiche** : 13
- **Enquête mobilisée** : PSCE 2017
- **Lien** : `https://drees.solidarites-sante.gouv.fr/sites/default/files/2024-07/CS24%20-%20Fiche%2013%20-%20La%20compl%C3%A9mentaire%20sant%C3%A9%20d%E2%80%99entreprise%20des%20salari%C3%A9s%20du%20secteur%20priv%C3%A9.pdf`

Note méthodologique importante :

- Le montant `centralMonthlyAmount` (ex. 40 €/mois) est une **hypothèse technique interne** fondée sur un **ordre de grandeur** issu de cette publication, et non une moyenne officielle 2026.
- Cette valeur n'est pas réglementaire, n'est pas imposée par l'administration, et ne doit pas être interprétée comme une statistique nationale "officielle" applicable à tous les salariés.

## Prélèvement à la source

### Différence taux personnalisé / taux neutre

- **Taux personnalisé** : taux réel transmis par l'administration fiscale, propre à la situation du foyer fiscal. Il ne peut pas être calculé à partir du seul salaire affiché dans le calculateur.
- **Taux neutre estimé** : taux par défaut issu de la grille officielle BOFiP, appliqué ici de façon indicative.

### Source officielle

- **Source** : BOFiP
- **Identifiant** : BOI-BAREME-000037
- **Entrée en vigueur** : 1er mai 2026
- **Référence légale** : article 204 H du Code général des impôts
- **Territoire couvert** : métropole et contribuables domiciliés hors de France
- **Architecture versionnée** :
  - `src/site/salary-calculator/tax/2026/config.ts`
  - `src/site/salary-calculator/tax/2026/neutral-rate.ts`
  - `src/site/salary-calculator/tax/2026/estimate-neutral-rate.ts`
  - `src/site/salary-calculator/tax/index.ts` (export version courante)

Les grilles spécifiques (Guadeloupe, La Réunion, Martinique, Guyane, Mayotte) ne sont pas proposées dans l'interface actuelle.

### Grille métropolitaine 2026

| Base mensuelle | Taux neutre |
|---|---:|
| &lt; 1 635 € | 0 % |
| 1 635 € à 1 698 € | 0,5 % |
| 1 698 € à 1 807 € | 1,3 % |
| 1 807 € à 1 928 € | 2,1 % |
| 1 928 € à 2 060 € | 2,9 % |
| 2 060 € à 2 170 € | 3,5 % |
| 2 170 € à 2 315 € | 4,1 % |
| 2 315 € à 2 738 € | 5,3 % |
| 2 738 € à 3 135 € | 7,5 % |
| 3 135 € à 3 571 € | 9,9 % |
| 3 571 € à 4 019 € | 11,9 % |
| 4 019 € à 4 690 € | 13,8 % |
| 4 690 € à 5 624 € | 15,8 % |
| 5 624 € à 7 037 € | 17,9 % |
| 7 037 € à 8 789 € | 20 % |
| 8 789 € à 12 200 € | 24 % |
| 12 200 € à 16 523 € | 28 % |
| 16 523 € à 25 937 € | 33 % |
| 25 937 € à 55 558 € | 38 % |
| ≥ 55 558 € | 43 % |

### Approximation utilisée

Le calculateur utilise une **estimation du revenu net imposable mensuel** comme approximation technique de la base mensuelle de prélèvement.

Ce montant n'est pas le net imposable exact d'une fiche de paie. L'estimation automatique reste donc indicative, même si le barème employé est officiel.

Fonction : `estimateNeutralWithholdingRate(taxableMonthlyApprox)`.

### Modes auto / manual

| Mode | Comportement |
|---|---|
| `auto` (défaut) | Le curseur suit le taux neutre estimé à partir du net mensuel |
| `manual` | Le taux choisi par l'utilisateur est conservé, même si le salaire change |

Actions :

- Déplacer le curseur → passage en `manual`
- « Utiliser le taux estimé » → retour en `auto`
- Réinitialiser → retour en `auto`, taux à 0 % tant qu'aucun salaire n'est saisi

### Formules après impôt

- `prélèvement mensuel = net imposable estimé mensuel × taux`
- `prélèvement annuel = net imposable estimé annuel × taux`
- `net après impôt = net − prélèvement`

## Schéma du moteur (vue simplifiée)

Brut

↓

Net

↓

Base CSG

↓

CSG déductible (informatif)

↓

CSG non déductible

↓

CRDS

↓

Participation employeur mutuelle (estimation)

↓

Net imposable estimé

↓

Recherche du barème PAS (versionné)

↓

Prélèvement

↓

Net après impôt

## Valeurs par défaut

- Statut : salarié non-cadre
- Temps de travail : 100 %
- Mois : 12
- Prélèvement : 0 % (estimation auto après saisie)
- Champs de salaire : vides

## Mise à jour des coefficients et du barème

1. Coefficients brut/net : `src/site/salary-calculator/config.ts`
2. Barème fiscal : `src/site/salary-calculator/tax/YYYY/`
3. Estimation net imposable : `src/site/salary-calculator/taxable-income/YYYY/`
4. Mettre à jour `SALARY_CALCULATOR_META.updatedAt`, `lastReviewedAt` (barème) et `lastReviewedAt` (taxable-income)
5. Ajuster les tests dans `src/site/salary-calculator/**/*.test.ts`

### Mise à jour annuelle (PAS / tax)

1. Dupliquer `src/site/salary-calculator/tax/2026/` vers `.../2027/`
2. Mettre à jour le barème dans `2027/config.ts` uniquement
3. Faire pointer `src/site/salary-calculator/tax/index.ts` vers la nouvelle version
4. Ajouter/ajuster les tests pour la nouvelle version sans modifier l'ancienne

### Mise à jour annuelle (taxable-income)

1. Dupliquer `src/site/salary-calculator/taxable-income/2026/` vers `.../2027/`
2. Mettre à jour uniquement les constantes et règles dans `2027/config.ts` et `2027/estimate-taxable-income.ts`
3. Faire pointer `src/site/salary-calculator/taxable-income/index.ts` vers la nouvelle version
4. Ajouter/ajuster les tests pour la nouvelle version sans modifier l'ancienne

## Limites connues

- Pas de prise en compte des tranches de cotisations, plafonds, réductions ou exonérations
- Pas de primes, heures supplémentaires, prévoyance ou avantages en nature
- Fonction publique : catégorie générale sans sous-profil
- Arrondis à l'affichage au centime : écart maximal d'un centime en réciprocité
- Prélèvement à la source : taux neutre estimé, pas le taux personnalisé réel
- Base mensuelle approximée via un net imposable estimé (CSG/CRDS + mutuelle employeur estimée), pas le net imposable exact
- Grille métropolitaine uniquement

Dernière mise à jour des coefficients : **13/07/2026**.

Dernière mise à jour du barème fiscal : **13/07/2026** (application au 1er mai 2026).
