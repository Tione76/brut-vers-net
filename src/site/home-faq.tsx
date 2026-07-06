import type { ReactNode } from "react";
import Link from "next/link";
import { faq } from "./faq";

const GUIDE_TAUX = "/guides/quels-sont-les-taux-de-tva-en-france";

/** Réponses FAQ page d'accueil — maillage interne */
const FAQ_ANSWERS: Record<string, ReactNode> = {
  "Comment convertir un montant HT vers TTC ?": (
    <p>
      Multipliez le montant HT par (1 + taux de TVA). Exemple : 100&nbsp;€ HT à
      20&nbsp;% donnent 120&nbsp;€ TTC, dont 20&nbsp;€ de TVA. Saisissez votre montant dans le
      calculateur ci-dessus : le résultat se met à jour instantanément.
    </p>
  ),
  "Comment passer un prix TTC vers HT ?": (
    <p>
      Divisez le montant TTC par (1 + taux de TVA). Exemple : 120&nbsp;€ TTC à 20&nbsp;% =
      100&nbsp;€ HT. Sélectionnez le mode «&nbsp;TTC vers HT&nbsp;» dans le calculateur pour
      effectuer ce calcul automatiquement.
    </p>
  ),
  "Quelle est la formule du calcul HT vers TTC ?": (
    <p>
      TTC = HT × (1 + taux de TVA). Le montant de TVA = TTC − HT (ou HT × taux). Pour un calcul
      TTC vers HT : HT = TTC ÷ (1 + taux). Le calculateur applique ces formules selon le sens
      choisi et arrondit les montants au centime d&apos;euro.
    </p>
  ),
  "Quels taux de TVA utiliser pour un calcul HT vers TTC ?": (
    <p>
      En France métropolitaine, les principaux taux sont 20&nbsp;% (normal), 10&nbsp;%, 5,5&nbsp;%
      et 2,1&nbsp;%. Le taux dépend du bien ou du service vendu. La Corse et certains DOM
      appliquent des régimes particuliers. Consultez notre{" "}
      <Link href={GUIDE_TAUX}>guide sur les taux de TVA en France</Link> pour choisir le bon
      taux avant de convertir HT vers TTC.
    </p>
  ),
  "Ce calculateur HT vers TTC est-il gratuit ?": (
    <p>
      Oui. Le calculateur HT vers TTC et le calcul TTC vers HT sont entièrement gratuits, sans
      inscription. Les calculs sont effectués dans votre navigateur&nbsp;: aucun montant
      n&apos;est transmis ni conservé.
    </p>
  ),
  "Puis-je convertir plusieurs montants HT vers TTC à la suite ?": (
    <p>
      Oui. Modifiez le montant ou le taux&nbsp;: le résultat se met à jour aussitôt. Vous pouvez
      enchaîner autant de conversions HT vers TTC ou TTC vers HT que nécessaire, par exemple pour
      comparer plusieurs devis.
    </p>
  ),
};

/** FAQ page d'accueil — accordéons avec liens internes */
export function HomeFaqContent() {
  return (
    <div className="faq-list">
      {faq.map((item) => (
        <details key={item.question} className="faq-item">
          <summary className="faq-item__summary">
            <span>{item.question}</span>
            <span className="faq-chevron" aria-hidden="true">
              ▾
            </span>
          </summary>
          <div className="faq-item__body">
            {FAQ_ANSWERS[item.question] ?? <p>{item.answer}</p>}
          </div>
        </details>
      ))}
    </div>
  );
}
