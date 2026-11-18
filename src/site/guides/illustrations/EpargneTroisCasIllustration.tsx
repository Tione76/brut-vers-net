import {
  CASE_1,
  CASE_1_ANNUAL_EUR,
  CASE_1_SAVED_EUR,
  CASE_2,
  CASE_3,
  CASE_3_LEFT_EUR,
  euro,
} from "@/site/epargner-petit-salaire";

type CaseCard = {
  eyebrow: string;
  title: string;
  situation: string;
  gesture: string;
  resultAmount: string;
  resultLabel: string;
  resultDetail: string;
  neutral?: boolean;
};

const CASES: readonly CaseCard[] = [
  {
    eyebrow: "Cas 1",
    title: CASE_1.title,
    situation: "Avec un petit budget, son compte tient jusqu'à la paie, mais il ne lui reste rien en fin de mois.",
    gesture: `Elle résilie un abonnement inutilisé à ${euro(CASE_1.subscriptionEur)}, baisse son forfait de ${euro(CASE_1.phoneEur)} et dépense ${euro(CASE_1.otherEur)} de moins par mois en se faisant livrer moins souvent. Au total : ${euro(CASE_1_SAVED_EUR)} de dépenses en moins.`,
    resultAmount: euro(CASE_1.toLivretEur),
    resultLabel: "sur le livret",
    resultDetail: `${euro(CASE_1.keepOnAccountEur)} restent sur le compte. Douze versements donnent ${euro(CASE_1_ANNUAL_EUR)}, hors intérêts et avant retraits.`,
  },
  {
    eyebrow: "Cas 2",
    title: CASE_2.title,
    situation: `Il met déjà ${euro(CASE_2.transferEur)} de côté par mois, mais reprend l'argent quand les factures annuelles arrivent.`,
    gesture: `Il réserve ${euro(CASE_2.billsEur)} aux factures prévues (assurance, entretien, cadeaux sur douze mois) et ${euro(CASE_2.emergencyEur)} aux imprévus. Aucun versement supplémentaire n'est créé.`,
    resultAmount: euro(CASE_2.transferEur),
    resultLabel: "versés chaque mois",
    resultDetail: `${euro(CASE_2.billsEur)} pour les factures à venir · ${euro(CASE_2.emergencyEur)} pour les imprévus`,
  },
  {
    eyebrow: "Cas 3",
    title: CASE_3.title,
    situation: `${euro(CASE_3.receivedEur)} reçus et ${euro(CASE_3.countedExpensesEur)} de dépenses déjà comptées.`,
    gesture: `Un trajet de ${euro(CASE_3.tripEur)} et ${euro(CASE_3.healthEur)} de santé s'ajoutent, expressément non compris dans les ${euro(CASE_3.countedExpensesEur)} : ${euro(CASE_3.receivedEur)} − ${euro(CASE_3.countedExpensesEur)} − ${euro(CASE_3.tripEur)} − ${euro(CASE_3.healthEur)} = ${euro(CASE_3_LEFT_EUR)}.`,
    resultAmount: euro(CASE_3_LEFT_EUR),
    resultLabel: "à mettre de côté ce mois-ci",
    resultDetail: "Suite utile : vérifier une aide ou contacter un Point conseil budget.",
    neutral: true,
  },
] as const;

/** Trois cas fictifs empilés : situation, geste, bandeau résultat. */
export function EpargneTroisCasIllustration() {
  return (
    <ul className="eps-cases" aria-label="Trois exemples pour savoir combien mettre de côté">
      {CASES.map((item) => (
        <li key={item.eyebrow} className="eps-case">
          <p className="eps-case__eyebrow">{item.eyebrow}</p>
          <h3 className="eps-case__title">{item.title}</h3>
          <p className="eps-case__situation">{item.situation}</p>
          <p className="eps-case__gesture">{item.gesture}</p>
          <div
            className={
              item.neutral ? "eps-case__result eps-case__result--neutral" : "eps-case__result"
            }
          >
            <p className="eps-case__result-amount">{item.resultAmount}</p>
            <p className="eps-case__result-label">{item.resultLabel}</p>
            <p className="eps-case__result-detail">{item.resultDetail}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
