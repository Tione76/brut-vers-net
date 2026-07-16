import Link from "next/link";
import { EditorialBenefitItem } from "@/site/editorial-check-icon";
import { DismissalCalculatorCta } from "./DismissalCalculatorCta";
import {
  DISMISSAL_EDITORIAL_UPDATED_AT,
  dismissalFaq,
  example129Amount,
  example4YearsAmount,
} from "./dismissal-editorial-data";
import { DISMISSAL_CONFIG } from "./config";

const revisedDateLabel = new Date(DISMISSAL_EDITORIAL_UPDATED_AT).toLocaleDateString("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

function DismissalFaqContent() {
  return (
    <div className="faq-list">
      {dismissalFaq.map((item) => (
        <details key={item.question} className="faq-item">
          <summary className="faq-item__summary">
            <span>{item.question}</span>
            <span className="faq-chevron" aria-hidden="true">
              ▾
            </span>
          </summary>
          <div className="faq-item__body">
            <p>{item.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}

export function DismissalCompensationEditorial() {
  return (
    <section id="contenu" className="content-section">
      <div className="content-wrap">
        <div className="prose home-editorial increase-calc-editorial">
          <p className="home-editorial__lead home-editorial__prose">
            Vous souhaitez estimer votre indemnité de licenciement ? Ce simulateur calcule le
            montant minimal de l&apos;indemnité légale à partir de votre salaire brut de référence
            et de votre ancienneté.
          </p>
          <p className="home-editorial__prose">
            Le résultat est indicatif. Votre{" "}
            <Link href="/guides/comment-lire-une-fiche-de-paie">fiche de paie</Link>, votre
            convention collective ou un usage d&apos;entreprise peuvent prévoir davantage.
          </p>

          <nav className="home-editorial__toc home-editorial__prose" aria-label="Sommaire du guide">
            <p className="home-editorial__toc-title">Dans ce guide</p>
            <ul className="home-editorial__toc-list editorial-list editorial-list--toc">
              <li>
                <a href="#calculateur">Estimez immédiatement votre indemnité</a>
              </li>
              <li>
                <a href="#comment-calculer-indemnite">
                  Comment calculer une indemnité de licenciement ?
                </a>
              </li>
              <li>
                <a href="#qui-peut-recevoir">Qui peut recevoir une indemnité légale ?</a>
              </li>
              <li>
                <a href="#salaire-reference">Quel salaire est utilisé pour le calcul ?</a>
              </li>
              <li>
                <a href="#anciennete">Comment calculer l&apos;ancienneté ?</a>
              </li>
              <li>
                <a href="#moins-de-10-ans">Quelle indemnité avec moins de 10 ans d&apos;ancienneté ?</a>
              </li>
              <li>
                <a href="#plus-de-10-ans">Quelle indemnité après 10 ans d&apos;ancienneté ?</a>
              </li>
              <li>
                <a href="#convention-collective">
                  La convention collective peut-elle prévoir davantage ?
                </a>
              </li>
              <li>
                <a href="#montants-exclus">Quels montants ne sont pas inclus ?</a>
              </li>
              <li>
                <a href="#exemples-indemnite">Exemples de calcul d&apos;indemnité de licenciement</a>
              </li>
              <li>
                <a href="#faq-indemnite-licenciement">Questions fréquentes</a>
              </li>
            </ul>
          </nav>

          <h2 id="comment-calculer-indemnite" className="home-editorial__section-spaced">
            Comment calculer une indemnité de licenciement ?
          </h2>
          <div className="home-editorial__prose">
            <p>
              Le calcul légal repose sur deux éléments : le salaire mensuel de référence et
              l&apos;ancienneté chez l&apos;employeur. Le simulateur applique ensuite les
              coefficients prévus par le Code du travail.
            </p>
            <p>
              Pour affiner votre salaire brut de départ, vous pouvez aussi utiliser le{" "}
              <Link href="/">calculateur Brut vers Net</Link> ou le{" "}
              <Link href="/calculateurs/salaire-heures-supplementaires">
                calculateur d&apos;heures supplémentaires
              </Link>{" "}
              si votre rémunération varie.
            </p>
          </div>

          <h2 id="qui-peut-recevoir" className="home-editorial__section-spaced">
            Qui peut recevoir une indemnité légale de licenciement ?
          </h2>
          <div className="home-editorial__prose">
            <p>
              Dans le cas général, l&apos;indemnité légale est ouverte aux salariés en CDI du
              secteur privé justifiant d&apos;au moins{" "}
              {DISMISSAL_CONFIG.minSeniorityMonths} mois d&apos;ancienneté ininterrompue chez le
              même employeur.
            </p>
            <p>
              Une faute grave ou une faute lourde prive en principe de cette indemnité. À
              l&apos;inverse, une inaptitude d&apos;origine professionnelle peut ouvrir droit à une
              indemnité spéciale minimale.
            </p>
          </div>

          <h2 id="salaire-reference" className="home-editorial__section-spaced">
            Quel salaire est utilisé pour calculer l&apos;indemnité ?
          </h2>
          <div className="home-editorial__prose">
            <p>
              Le droit retient le salaire de référence le plus favorable au salarié, en comparant
              notamment :
            </p>
            <ul className="editorial-list">
              <li>la moyenne mensuelle brute des 12 derniers mois ;</li>
              <li>la moyenne mensuelle brute des 3 derniers mois.</li>
            </ul>
            <p>
              Les primes annuelles ou exceptionnelles peuvent entrer dans cette moyenne, souvent
              au prorata. Pour comprendre la différence entre brut et{" "}
              <Link href="/guides/comment-calculer-son-salaire-net">salaire net</Link>, consultez
              nos guides.
            </p>
          </div>

          <h2 id="anciennete" className="home-editorial__section-spaced">
            Comment calculer l&apos;ancienneté ?
          </h2>
          <div className="home-editorial__prose">
            <p>
              L&apos;ancienneté prise en compte pour le montant est généralement calculée jusqu&apos;à
              la fin du préavis, même lorsqu&apos;il n&apos;est pas effectué dans certains cas. Les
              années complètes et les mois complets supplémentaires sont retenus.
            </p>
          </div>

          <h2 id="moins-de-10-ans" className="home-editorial__section-spaced">
            Quelle indemnité avec moins de 10 ans d&apos;ancienneté ?
          </h2>
          <div className="home-editorial__prose">
            <p>
              Jusqu&apos;à 10 ans, l&apos;indemnité légale correspond à un quart de mois de salaire
              de référence par année d&apos;ancienneté. Exemple : 2 000 € de référence et 4 ans
              donnent environ {example4YearsAmount}.
            </p>
          </div>

          <h2 id="plus-de-10-ans" className="home-editorial__section-spaced">
            Quelle indemnité après 10 ans d&apos;ancienneté ?
          </h2>
          <div className="home-editorial__prose">
            <p>
              Au-delà de 10 ans, le calcul se fait en deux tranches : 1/4 de mois jusqu&apos;à 10
              ans, puis 1/3 de mois pour chaque année (et mois complets) suivante. Avec 2 500 € de
              référence et 12 ans et 9 mois, l&apos;estimation est d&apos;environ{" "}
              {example129Amount}.
            </p>
          </div>

          <h2 id="convention-collective" className="home-editorial__section-spaced">
            La convention collective peut-elle prévoir davantage ?
          </h2>
          <div className="home-editorial__prose">
            <p>
              Oui. Le minimum légal n&apos;empêche pas une indemnité conventionnelle, contractuelle
              ou d&apos;usage plus favorable. Si vous connaissez ce montant, le simulateur le
              compare à l&apos;estimation légale et retient le plus élevé.
            </p>
          </div>

          <h2 id="montants-exclus" className="home-editorial__section-spaced">
            Quels montants ne sont pas inclus dans cette estimation ?
          </h2>
          <div className="home-editorial__prose">
            <ul className="editorial-list editorial-list--checks">
              <EditorialBenefitItem>
                Indemnité compensatrice de préavis
              </EditorialBenefitItem>
              <EditorialBenefitItem>
                Indemnité compensatrice de congés payés
              </EditorialBenefitItem>
              <EditorialBenefitItem>
                Dommages et intérêts ou indemnité prud&apos;homale
              </EditorialBenefitItem>
              <EditorialBenefitItem>
                Fiscalité détaillée de l&apos;indemnité
              </EditorialBenefitItem>
            </ul>
            <p>
              Ces éléments restent distincts. Une{" "}
              <Link href="/calculateurs/augmentation-salaire">
                simulation d&apos;augmentation de salaire
              </Link>{" "}
              ou le guide des{" "}
              <Link href="/guides/cotisations-salariales-pourquoi-brut-plus-eleve-que-net">
                cotisations salariales
              </Link>{" "}
              peuvent aider à situer votre rémunération globale, mais ne remplacent pas l&apos;étude
              du dossier de rupture.
            </p>
          </div>

          <h2 id="exemples-indemnite" className="home-editorial__section-spaced">
            Exemples de calcul d&apos;indemnité de licenciement
          </h2>
          <div className="home-editorial__prose">
            <p>
              Voici des simulations indicatives. Les montants dépendent de votre salaire de
              référence réel et de votre convention collective.
            </p>
            <ul className="editorial-list">
              <li>
                2 000 € de référence et 4 ans d&apos;ancienneté : environ {example4YearsAmount}.
              </li>
              <li>
                2 500 € de référence et 12 ans et 9 mois : environ {example129Amount}.
              </li>
            </ul>
          </div>

          <h2 id="en-resume" className="home-editorial__section-spaced">
            En résumé
          </h2>
          <div className="home-editorial__prose">
            <div className="home-editorial__summary-checks">
              <p className="home-editorial__summary-checks-title">À retenir</p>
              <ul className="editorial-list editorial-list--checks">
                <EditorialBenefitItem>
                  La moyenne de salaire la plus favorable est retenue.
                </EditorialBenefitItem>
                <EditorialBenefitItem>
                  Les mois complets d&apos;ancienneté comptent proportionnellement.
                </EditorialBenefitItem>
                <EditorialBenefitItem>
                  La convention collective peut être plus avantageuse que le minimum légal.
                </EditorialBenefitItem>
                <EditorialBenefitItem>
                  Préavis et congés payés restent distincts de cette estimation.
                </EditorialBenefitItem>
                <EditorialBenefitItem>
                  Le calculateur ne remplace pas l&apos;étude de votre dossier.
                </EditorialBenefitItem>
              </ul>
            </div>
          </div>

          <DismissalCalculatorCta />

          <h2 id="faq-indemnite-licenciement" className="home-editorial__section-spaced">
            Questions fréquentes
          </h2>
          <DismissalFaqContent />

          <p className="home-editorial__updated home-editorial__prose">
            Contenu vérifié le{" "}
            <time dateTime={DISMISSAL_EDITORIAL_UPDATED_AT}>{revisedDateLabel}</time>. Estimation
            indicative du minimum légal, hors situations particulières.
          </p>
        </div>
      </div>
    </section>
  );
}

export { dismissalFaq };
