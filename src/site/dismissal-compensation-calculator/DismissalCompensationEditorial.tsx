import Link from "next/link";
import { EditorialBenefitItem } from "@/site/editorial-check-icon";
import { CoverFigure } from "@/site/guides/CoverFigure";
import { getCalculatorCover } from "@/site/guides/covers";
import { DismissalCalculatorCta } from "./DismissalCalculatorCta";
import {
  DISMISSAL_CONTENT_REVIEW_DATE,
  dismissalFaq,
  example129Amount,
  example129FirstBracketAmount,
  example129SecondBracketAmount,
  example4YearsAmount,
} from "./dismissal-editorial-data";
import { DISMISSAL_CONFIG } from "./config";

const revisedDateLabel = new Date(DISMISSAL_CONTENT_REVIEW_DATE).toLocaleDateString("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const dismissalCover = getCalculatorCover("indemnite-licenciement");

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
        <div className="prose home-editorial increase-calc-editorial dismissal-editorial">
          <p className="home-editorial__lead home-editorial__prose">
            Vous souhaitez estimer votre indemnité de licenciement ? Ce simulateur calcule une
            estimation du minimum légal à partir de votre salaire brut de référence, de votre
            ancienneté et du motif de la rupture.
          </p>

          <CoverFigure cover={dismissalCover} priority />

          <p className="home-editorial__prose">
            Il s&apos;adresse principalement aux salariés en CDI du secteur privé. Le résultat reste
            indicatif : votre convention collective, votre contrat de travail, certaines interruptions
            de carrière ou une situation particulière peuvent modifier le montant réellement dû. Pour
            retrouver vos rémunérations, consultez en priorité votre{" "}
            <Link href="/guides/comment-lire-une-fiche-de-paie">fiche de paie</Link>.
          </p>

          <nav className="home-editorial__toc home-editorial__prose" aria-label="Sommaire du guide">
            <p className="home-editorial__toc-title">Dans ce guide</p>
            <ul className="home-editorial__toc-list editorial-list editorial-list--toc">
              <li>
                <a href="#calculateur">Estimez immédiatement votre indemnité</a>
              </li>
              <li>
                <a href="#comment-calculer-indemnite">Comment calculer l&apos;indemnité ?</a>
              </li>
              <li>
                <a href="#qui-peut-recevoir">Qui peut recevoir une indemnité légale ?</a>
              </li>
              <li>
                <a href="#salaire-reference">Quel salaire est retenu ?</a>
              </li>
              <li>
                <a href="#anciennete">Comment calculer l&apos;ancienneté ?</a>
              </li>
              <li>
                <a href="#moins-de-10-ans">Indemnité jusqu&apos;à 10 ans</a>
              </li>
              <li>
                <a href="#plus-de-10-ans">Indemnité après 10 ans</a>
              </li>
              <li>
                <a href="#convention-collective">Convention collective</a>
              </li>
              <li>
                <a href="#montants-exclus">Montants non inclus</a>
              </li>
              <li>
                <a href="#quand-estimation-a-verifier">
                  Situations nécessitant une vérification
                </a>
              </li>
              <li>
                <a href="#exemples-indemnite">Exemples de calcul</a>
              </li>
              <li>
                <a href="#en-resume">En résumé</a>
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
              Pour retrouver les rémunérations à renseigner, consultez en priorité vos bulletins de
              salaire. Si votre rémunération varie en raison d&apos;heures supplémentaires
              régulières, notre{" "}
              <Link href="/calculateurs/salaire-heures-supplementaires">
                calculateur dédié aux heures supplémentaires
              </Link>{" "}
              peut vous aider à mieux comprendre leur impact.
            </p>
            <p className="dismissal-editorial__sources">
              Références : Code du travail (articles L.1234-9, R.1234-2, L.1226-14, L.1226-16) et
              fiche Service-Public « Indemnité de licenciement du salarié en CDI ».
            </p>
          </div>

          <h2 id="qui-peut-recevoir" className="home-editorial__section-spaced">
            Qui peut recevoir une indemnité légale de licenciement ?
          </h2>
          <div className="home-editorial__prose">
            <p>
              Dans le cas général, un salarié en CDI du secteur privé doit justifier d&apos;au moins{" "}
              {DISMISSAL_CONFIG.minSeniorityMonths} mois d&apos;ancienneté ininterrompue au service
              du même employeur pour bénéficier de l&apos;indemnité légale de licenciement.
            </p>
            <p>
              Une faute grave ou une faute lourde prive en principe de cette indemnité dans le cas
              général. À l&apos;inverse, une inaptitude d&apos;origine professionnelle liée à un
              accident du travail ou à une maladie professionnelle peut ouvrir droit à une indemnité
              spéciale correspondant en principe au double de l&apos;indemnité légale, sauf
              disposition plus favorable. Le salaire de référence obéit alors à une règle
              particulière. L&apos;équivalent du préavis peut constituer une autre somme due et
              n&apos;est pas inclus dans le montant principal du calculateur.
            </p>
            <p>
              Votre convention collective, votre contrat ou un usage peut prévoir une règle plus
              favorable. Les CDD et la fonction publique restent hors du périmètre de ce simulateur.
            </p>
          </div>

          <h2 id="salaire-reference" className="home-editorial__section-spaced">
            Quel salaire est utilisé pour calculer l&apos;indemnité ?
          </h2>
          <div className="home-editorial__prose">
            <p>
              Dans le cas général, le salaire de référence retenu correspond à la formule la plus
              avantageuse pour le salarié :
            </p>
            <ul className="editorial-list editorial-list--limits">
              <li>la moyenne mensuelle brute des 12 derniers mois précédant le licenciement ;</li>
              <li>ou le tiers de la rémunération brute des 3 derniers mois.</li>
            </ul>
            <p>
              Certaines primes annuelles ou exceptionnelles peuvent être prises en compte au prorata.
              Le salaire de référence est exprimé en{" "}
              <Link href="/guides/comment-est-calcule-le-salaire-net">salaire brut</Link>.
            </p>
            <p>
              Des règles particulières peuvent s&apos;appliquer lorsque les derniers mois ont été
              affectés par un arrêt de travail, un temps partiel thérapeutique, une alternance entre
              temps plein et temps partiel ou une inaptitude d&apos;origine professionnelle. Le
              simulateur ne prétend pas résoudre automatiquement tous ces cas.
            </p>
          </div>

          <h2 id="anciennete" className="home-editorial__section-spaced">
            Comment calculer l&apos;ancienneté ?
          </h2>
          <div className="home-editorial__prose">
            <p>
              L&apos;ancienneté retenue pour le calcul est généralement déterminée jusqu&apos;à la
              date effective de rupture, souvent à la fin du préavis, même lorsque celui-ci
              n&apos;est pas exécuté dans certains cas. Les années complètes et les mois complets
              supplémentaires sont pris en compte. Les simples jours incomplets ne doivent pas être
              assimilés automatiquement à un mois complet.
            </p>
            <p>
              Une interruption, un changement de temps de travail ou une suspension du contrat peut
              toutefois nécessiter un calcul adapté.
            </p>
          </div>

          <h2 id="moins-de-10-ans" className="home-editorial__section-spaced">
            Comment calculer l&apos;indemnité avec moins de 10 ans d&apos;ancienneté ?
          </h2>
          <div className="home-editorial__prose">
            <p>
              Jusqu&apos;à 10 ans, l&apos;indemnité légale correspond à :
            </p>
            <p>
              <strong>Indemnité = salaire de référence × 1/4 × ancienneté</strong>
            </p>
            <p>
              Les mois complets supplémentaires sont proratisés. Exemple : avec 2 000 € de référence
              et 4 ans d&apos;ancienneté, l&apos;estimation légale est de {example4YearsAmount}.
            </p>
          </div>

          <h2 id="plus-de-10-ans" className="home-editorial__section-spaced">
            Comment calculer l&apos;indemnité après 10 ans d&apos;ancienneté ?
          </h2>
          <div className="home-editorial__prose">
            <p>Au-delà de 10 ans, le calcul se fait en deux tranches distinctes :</p>
            <p>
              <strong>
                Part correspondant aux 10 premières années = salaire de référence × 1/4 × 10
              </strong>
            </p>
            <p>
              <strong>
                Part correspondant à l&apos;ancienneté au-delà de 10 ans = salaire de référence ×
                1/3 × nombre d&apos;années et de mois complets au-delà de 10 ans
              </strong>
            </p>
            <p>
              Les mois complets au-delà de 10 ans sont également pris en compte proportionnellement.
              Exemple : avec 2 500 € de référence et 12 ans et 9 mois, l&apos;estimation légale est
              d&apos;environ {example129Amount}.
            </p>
          </div>

          <h2 id="convention-collective" className="home-editorial__section-spaced">
            La convention collective peut-elle prévoir davantage ?
          </h2>
          <div className="home-editorial__prose">
            <p>
              Oui. Le minimum légal n&apos;empêche pas l&apos;application d&apos;une indemnité
              conventionnelle, contractuelle ou issue d&apos;un usage plus favorable. Le simulateur
              calcule uniquement le minimum légal estimé. Consultez votre convention collective,
              votre contrat de travail ou les pratiques de votre entreprise pour vérifier si un
              montant supérieur est prévu.
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
              <EditorialBenefitItem>
                Autres sommes éventuellement dues lors de la rupture
              </EditorialBenefitItem>
            </ul>
            <p>
              Ces sommes sont distinctes de l&apos;indemnité légale estimée sur cette page. Le solde
              de tout compte et les documents de rupture restent nécessaires pour connaître
              l&apos;ensemble des montants dus.
            </p>
          </div>

          <h2 id="quand-estimation-a-verifier" className="home-editorial__section-spaced">
            Quand l&apos;estimation doit-elle être vérifiée ?
          </h2>
          <div className="home-editorial__prose">
            <p>
              Certaines situations peuvent modifier l&apos;ancienneté prise en compte ou le salaire
              de référence. C&apos;est notamment le cas en présence de périodes à temps plein et à
              temps partiel, d&apos;un arrêt maladie récent, d&apos;un temps partiel thérapeutique,
              d&apos;un congé parental ou d&apos;une autre suspension du contrat.
            </p>
            <p>
              Dans ces situations, le calculateur conserve un montant indicatif mais affiche une
              alerte afin d&apos;éviter qu&apos;il soit interprété comme un résultat définitif.
            </p>
            <ul className="editorial-list editorial-list--limits">
              <li>
                temps plein / temps partiel : calcul proportionnel selon les périodes ;
              </li>
              <li>
                arrêt ou temps partiel thérapeutique : salaire de référence parfois recherché avant
                la période ;
              </li>
              <li>suspension ou interruption : effet variable selon sa nature.</li>
            </ul>
          </div>

          <h2 id="exemples-indemnite" className="home-editorial__section-spaced">
            Exemples de calcul d&apos;indemnité de licenciement
          </h2>
          <div className="home-editorial__prose">
            <div className="dismissal-editorial-examples">
              <aside className="dismissal-example-card">
                <p className="dismissal-example-card__heading">Salarié avec moins de 10 ans</p>
                <dl className="dismissal-example-card__details">
                  <div>
                    <dt>Salaire brut de référence</dt>
                    <dd>2 000 € / mois</dd>
                  </div>
                  <div>
                    <dt>Ancienneté</dt>
                    <dd>4 ans</dd>
                  </div>
                  <div>
                    <dt>Calcul</dt>
                    <dd>2 000 × 1/4 × 4</dd>
                  </div>
                </dl>
                <p className="dismissal-example-card__total">
                  <span>Indemnité légale estimée</span>
                  <strong>{example4YearsAmount}</strong>
                </p>
              </aside>
              <aside className="dismissal-example-card">
                <p className="dismissal-example-card__heading">Salarié avec plus de 10 ans</p>
                <dl className="dismissal-example-card__details">
                  <div>
                    <dt>Salaire brut de référence</dt>
                    <dd>2 500 € / mois</dd>
                  </div>
                  <div>
                    <dt>Ancienneté</dt>
                    <dd>12 ans et 9 mois</dd>
                  </div>
                  <div>
                    <dt>Part des 10 premières années</dt>
                    <dd>{example129FirstBracketAmount}</dd>
                  </div>
                  <div>
                    <dt>Part au-delà de 10 ans</dt>
                    <dd>{example129SecondBracketAmount}</dd>
                  </div>
                </dl>
                <p className="dismissal-example-card__total">
                  <span>Total estimé</span>
                  <strong>{example129Amount}</strong>
                </p>
              </aside>
            </div>
            <p className="dismissal-editorial__examples-note">
              Ces exemples correspondent à une situation standard et au minimum légal estimé.
              Reproduisez votre propre situation dans le calculateur et vérifiez votre convention
              collective, votre contrat de travail ou les usages applicables dans votre entreprise.
            </p>
          </div>

          <h2 id="en-resume" className="home-editorial__section-spaced">
            En résumé
          </h2>
          <div className="home-editorial__prose">
            <div className="home-editorial__summary-checks">
              <p className="home-editorial__summary-checks-title">À retenir</p>
              <ul className="editorial-list editorial-list--checks">
                <EditorialBenefitItem>
                  Le calculateur estime le minimum légal.
                </EditorialBenefitItem>
                <EditorialBenefitItem>
                  Le salaire de référence le plus favorable est retenu dans le cas standard.
                </EditorialBenefitItem>
                <EditorialBenefitItem>
                  Les mois complets d&apos;ancienneté sont pris en compte proportionnellement.
                </EditorialBenefitItem>
                <EditorialBenefitItem>
                  La convention collective peut être plus favorable.
                </EditorialBenefitItem>
                <EditorialBenefitItem>
                  Le préavis, les congés payés et les autres sommes restent distincts.
                </EditorialBenefitItem>
                <EditorialBenefitItem>
                  Une situation particulière peut nécessiter une vérification.
                </EditorialBenefitItem>
                <EditorialBenefitItem>
                  Le calculateur ne remplace pas l&apos;analyse complète du dossier.
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
            <time dateTime={DISMISSAL_CONTENT_REVIEW_DATE}>{revisedDateLabel}</time>. Estimation
            indicative du minimum légal, hors situations particulières.
          </p>
        </div>
      </div>
    </section>
  );
}

export { dismissalFaq };
