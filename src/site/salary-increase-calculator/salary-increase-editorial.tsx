import Link from "next/link";
import { EditorialBenefitItem } from "@/site/editorial-check-icon";
import { IncreaseCalculatorCta } from "./IncreaseCalculatorCta";
import {
  buildIncreasePracticalCases,
  buildQuickReferenceRows,
  example200NonExecutive,
  example200Executive,
  example5PercentNonExecutive,
  format200EuroNetRange,
  formatEditorialEuro,
  SALARY_INCREASE_EDITORIAL_UPDATED_AT,
  salaryIncreaseFaq,
} from "./salary-increase-editorial-data";

const practicalCases = buildIncreasePracticalCases();
const quickReferenceRows = buildQuickReferenceRows();
const ex200 = example200NonExecutive();
const ex200Exec = example200Executive();
const ex5 = example5PercentNonExecutive();
const net200Range = format200EuroNetRange();

const revisedDateLabel = new Date(SALARY_INCREASE_EDITORIAL_UPDATED_AT).toLocaleDateString("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

function SalaryIncreaseFaqContent() {
  return (
    <div className="faq-list">
      {salaryIncreaseFaq.map((item) => (
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

export function SalaryIncreaseEditorial() {
  return (
    <>
      <section id="contenu" className="content-section">
        <div className="content-wrap">
          <div className="prose home-editorial increase-calc-editorial">
            <p className="home-editorial__lead home-editorial__prose">
              Une augmentation annoncée en{" "}
              <Link href="/guides/comment-est-calcule-le-salaire-net">salaire brut</Link> ne se
              traduit jamais euro pour euro sur votre compte. Ce simulateur d&apos;augmentation de
              salaire estime votre gain{" "}
              <Link href="/guides/comment-calculer-son-salaire-net">salaire net</Link> réel, avant
              et après prélèvement à la source, pour comprendre combien vous gagnerez vraiment en
              plus chaque mois et sur l&apos;année.
            </p>

            <nav className="home-editorial__toc home-editorial__prose" aria-label="Sommaire du guide">
              <p className="home-editorial__toc-title">Dans ce guide</p>
              <ul className="home-editorial__toc-list editorial-list editorial-list--toc">
                <li>
                  <a href="#introduction-augmentation">Introduction</a>
                </li>
                <li>
                  <a href="#a-qui-sadresse">À qui s&apos;adresse ce calculateur ?</a>
                </li>
                <li>
                  <a href="#fonctionnement-calculateur">Fonctionnement du calculateur</a>
                </li>
                <li>
                  <a href="#comprendre-augmentation">Comprendre son augmentation</a>
                </li>
                <li>
                  <a href="#exemples-cas-pratiques">Exemples concrets</a>
                </li>
                <li>
                  <a href="#reperes-rapides">Repères rapides</a>
                </li>
                <li>
                  <a href="#bien-negocier">Bien négocier</a>
                </li>
                <li>
                  <a href="#en-resume">En résumé</a>
                </li>
                <li>
                  <a href="#faq">FAQ</a>
                </li>
              </ul>
            </nav>

            <h2 id="introduction-augmentation">Pourquoi simuler une augmentation de salaire ?</h2>
            <div className="home-editorial__prose">
              <p>
                Lors d&apos;un entretien annuel ou d&apos;une proposition d&apos;embauche, on vous parle
                souvent en brut : +200 €, +5 %, revalorisation sur 13 mois. Pourtant, ce qui compte au
                quotidien, c&apos;est le net réellement versé après cotisations et prélèvement à la
                source.
              </p>
              <p>
                Ce calculateur d&apos;augmentation de salaire compare votre situation avant et après la
                hausse. Vous obtenez le gain net mensuel, le{" "}
                <Link href="/guides/comment-calculer-son-salaire-net">salaire annuel</Link> estimé selon
                vos mois de rémunération, et une vision claire de l&apos;impact du prélèvement à la
                source.
              </p>
              <p>
                L&apos;objectif : traduire une promesse en chiffres concrets, sans attendre le prochain
                bulletin. Les résultats restent une estimation, mais suffisamment précise pour préparer
                une négociation ou vérifier si une augmentation de 100 €, 200 € ou 300 € brut vaut le
                coup.
              </p>
            </div>

            <h2 id="a-qui-sadresse">À qui s&apos;adresse ce calculateur ?</h2>
            <div className="home-editorial__prose">
              <p>
                Ce simulateur s&apos;adresse à toute personne qui souhaite estimer le gain réel d&apos;une
                revalorisation, que ce soit en euros ou en pourcentage. Il couvre les situations les
                plus courantes sans remplacer votre bulletin.
              </p>

              <ul className="editorial-list editorial-list--checks">
                <EditorialBenefitItem>
                  Salarié du privé, cadre ou non-cadre, avec des profils de cotisations distincts.
                </EditorialBenefitItem>
                <EditorialBenefitItem>
                  Agent de la fonction publique souhaitant comparer une hausse avant signature.
                </EditorialBenefitItem>
                <EditorialBenefitItem>
                  Préparation d&apos;un entretien annuel, d&apos;une négociation salariale ou d&apos;une
                  promotion.
                </EditorialBenefitItem>
                <EditorialBenefitItem>
                  Changement de poste lorsque l&apos;on compare une offre chiffrée en brut à son
                  salaire actuel.
                </EditorialBenefitItem>
              </ul>

              <aside className="home-editorial__callout home-editorial__callout--warning">
                <strong>Bon à savoir</strong>
                <p>
                  Vous pouvez partir de votre salaire net actuel : le simulateur reconstitue un brut
                  estimé, applique l&apos;augmentation, puis recalcule le nouveau net avec la même
                  logique que le{" "}
                  <Link href="/">calculateur Brut vers Net</Link>.
                </p>
              </aside>
            </div>

            <h2 id="fonctionnement-calculateur">Comment fonctionne le calculateur ?</h2>
            <div className="home-editorial__prose">
              <p>
                Le simulateur reprend la logique du{" "}
                <Link href="/">calculateur Brut vers Net</Link> et l&apos;applique à une hausse de
                rémunération. Voici les étapes, dans l&apos;ordre du formulaire.
              </p>

              <ul className="editorial-list editorial-list--steps">
                <li>Indiquez votre salaire actuel (brut mensuel, brut annuel ou net mensuel).</li>
                <li>
                  Choisissez le type d&apos;augmentation : montant fixe en euros ou pourcentage (5 %,
                  10 %, etc.).
                </li>
                <li>
                  Saisissez l&apos;augmentation : les champs mensuel et annuel se synchronisent
                  automatiquement.
                </li>
                <li>Sélectionnez votre statut : non-cadre, cadre ou fonction publique.</li>
                <li>
                  Précisez le nombre de mois de rémunération (12 à 16) pour le calcul annuel.
                </li>
                <li>
                  Ajustez le taux de prélèvement à la source pour voir le net réellement versé.
                </li>
              </ul>

              <h3>Comment calculer son nouveau salaire après une augmentation ?</h3>
              <p>
                Le moteur part de votre rémunération actuelle, applique la hausse sur le brut, puis
                estime le nouveau net avant et après prélèvement. Le gain affiché est la différence
                entre l&apos;ancienne et la nouvelle situation, mois par mois et sur l&apos;année.
              </p>

              <h3>Comment calculer une augmentation en pourcentage ?</h3>
              <p>
                Choisissez le mode « En pourcentage », saisissez la valeur (5, 10, etc.) et votre
                salaire actuel. Le simulateur calcule d&apos;abord le supplément brut mensuel, puis
                en déduit le gain net. Sur 2 500 € brut, +5 % représentent 125 € brut de plus par
                mois, soit environ {ex5 ? formatEditorialEuro(ex5.gain.netMonthly) : "98 €"} net
                avant prélèvement pour un non-cadre (estimation).
              </p>

              <aside className="home-editorial__callout home-editorial__callout--key">
                <strong>À retenir</strong>
                <p>
                  Une simulation d&apos;augmentation de salaire brut en net se fait toujours en
                  comparant deux situations complètes, pas en convertissant directement le montant
                  brut annoncé.
                </p>
              </aside>
            </div>

            <h2 id="comprendre-augmentation" className="home-editorial__section-spaced">
              Comprendre son augmentation de salaire
            </h2>
            <div className="home-editorial__prose">
              <h3>Pourquoi le brut et le net sont différents</h3>
              <p>
                Le salaire brut inclut les cotisations salariales. Le net avant prélèvement à la
                source est ce qui reste après ces retenues. Le net après prélèvement est le montant
                réellement versé sur votre compte.
              </p>
              <p>
                Une augmentation de salaire brut augmente aussi la base soumise aux cotisations.
                C&apos;est pourquoi +200 € brut ne produit pas +200 € net : sur 2 500 € de base, une
                hausse de 200 € brut représente généralement {net200Range}, selon votre statut
                (estimation).
              </p>

              <h3>Quelle différence entre augmentation brute et augmentation nette ?</h3>
              <p>
                L&apos;augmentation brute est celle annoncée par l&apos;employeur (+200 € ou +5 % sur le
                brut). L&apos;augmentation nette est ce qui reste après cotisations, puis après
                prélèvement à la source. C&apos;est cette seconde valeur qui mesure votre pouvoir
                d&apos;achat réel.
              </p>

              <h3>Pourquoi deux salariés peuvent obtenir un gain différent</h3>
              <p>
                Un cadre et un non-cadre n&apos;ont pas les mêmes taux de cotisations moyens. À
                augmentation brute identique, le gain net peut varier. Même logique entre fonction
                publique et salarié du privé.
              </p>
              {ex200 && ex200Exec ? (
                <aside className="home-editorial__callout home-editorial__callout--example">
                  <strong>Exemple concret</strong>
                  <p>
                    +200 € brut / mois sur 2 500 € de base : environ{" "}
                    {formatEditorialEuro(ex200.gain.netMonthly)} net avant prélèvement pour un
                    non-cadre, environ {formatEditorialEuro(ex200Exec.gain.netMonthly)} pour un
                    cadre. Même promesse en brut, gain net différent.
                  </p>
                </aside>
              ) : null}

              <h3>L&apos;impact des cotisations salariales</h3>
              <p>
                Maladie, retraite, chômage, CSG-CRDS : les{" "}
                <Link href="/guides/cotisations-salariales-pourquoi-brut-plus-eleve-que-net">
                  cotisations salariales
                </Link>{" "}
                financent la protection sociale et réduisent le net par rapport au brut. Elles
                s&apos;appliquent aussi sur la part de salaire issue de l&apos;augmentation.
              </p>

              <h3>L&apos;impact du prélèvement à la source</h3>
              <p>
                Le{" "}
                <Link href="/guides/prelevement-a-la-source-quest-ce-que-cest-et-comment-ca-fonctionne">
                  prélèvement à la source
                </Link>{" "}
                porte sur le net imposable. Une hausse de salaire peut augmenter le montant prélevé
                chaque mois, même si votre taux reste stable. Le simulateur affiche le gain avant et
                après prélèvement pour isoler cet effet.
              </p>

              <h3>Une augmentation augmente-t-elle les impôts ?</h3>
              <p>
                En pratique, oui : plus votre rémunération nette imposable augmente, plus le
                prélèvement à la source prélevé chaque mois tend à monter. Ce n&apos;est pas une
                cotisation sociale, mais un impôt sur le revenu prélevé à la source. Le gain net
                après prélèvement reste donc inférieur au net avant impôt.
              </p>

              <h3>Pourquoi le calcul reste une estimation</h3>
              <p>
                Ce simulateur ne reproduit pas votre{" "}
                <Link href="/guides/comment-lire-une-fiche-de-paie">fiche de paie</Link> ligne par
                ligne. Primes exceptionnelles, tickets restaurant, mutuelle, épargne salariale ou
                régimes particuliers peuvent modifier le résultat réel. Il sert surtout à obtenir un
                ordre de grandeur fiable avant de signer ou de négocier.
              </p>
            </div>

            <h2 id="exemples-cas-pratiques" className="home-editorial__section-spaced">
              Exemples et cas pratiques
            </h2>
            <div className="home-editorial__prose">
              <p>
                Quelques simulations indicatives sur 2 500 € brut mensuels (non-cadre, 12 mois).
                Pour votre situation, saisissez vos propres montants dans le calculateur en haut de
                page.
              </p>
              {ex5 ? (
                <p>
                  À titre de repère : une augmentation de 5 % sur cette base représente environ{" "}
                  {formatEditorialEuro(ex5.gain.grossMonthly)} brut / mois et{" "}
                  {formatEditorialEuro(ex5.gain.netMonthly)} net avant prélèvement / mois.
                </p>
              ) : null}
            </div>

            <div className="home-editorial__cases home-editorial__wide">
              {practicalCases.map((item) => (
                <article key={item.title} className="home-editorial__case-card">
                  <h3>{item.title}</h3>
                  <dl className="home-editorial__case-dl">
                    <div>
                      <dt>Situation</dt>
                      <dd>{item.situation}</dd>
                    </div>
                    <div>
                      <dt>À saisir</dt>
                      <dd>{item.input}</dd>
                    </div>
                    <div>
                      <dt>Estimation</dt>
                      <dd>{item.estimate}</dd>
                    </div>
                    <div>
                      <dt>À vérifier</dt>
                      <dd>{item.verify}</dd>
                    </div>
                  </dl>
                  <p className="home-editorial__case-hint">{item.calculatorHint}</p>
                </article>
              ))}
            </div>

            <h2 id="reperes-rapides" className="home-editorial__section-spaced">
              Repères rapides : combien représente une augmentation de salaire ?
            </h2>
            <div className="home-editorial__prose">
              <div className="home-editorial__table-wrap home-editorial__wide">
                <table className="home-editorial__table">
                  <thead>
                    <tr>
                      <th scope="col">Augmentation brute</th>
                      <th scope="col" className="home-editorial__table-num">
                        Estimation nette avant prélèvement
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {quickReferenceRows.map((row) => (
                      <tr key={row.grossLabel}>
                        <td>{row.grossLabel}</td>
                        <td className="home-editorial__table-num">{row.netEstimate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="home-editorial__table-note">
                Ces montants sont donnés à titre indicatif pour un salarié non-cadre rémunéré sur 12
                mois. Votre résultat dépend notamment de votre statut, de vos cotisations et de votre
                taux de prélèvement.
              </p>
            </div>

            <h2 id="bien-negocier" className="home-editorial__section-spaced">
              Bien négocier son augmentation
            </h2>
            <div className="home-editorial__prose">
              <h3>Comment négocier une augmentation de salaire ?</h3>
              <p>
                Avant d&apos;accepter ou de demander une revalorisation, traduisez la proposition en
                net après prélèvement. Comparez le gain annuel sur vos mois réellement payés, pas
                seulement le supplément mensuel. Cela évite de surestimer une promesse formulée en
                brut.
              </p>

              <ul className="editorial-list editorial-list--checks">
                <EditorialBenefitItem>
                  Raisonnez en net après prélèvement, pas seulement en brut annoncé.
                </EditorialBenefitItem>
                <EditorialBenefitItem>
                  Pensez au nombre de mois réellement payés (12, 13, 14 mois).
                </EditorialBenefitItem>
                <EditorialBenefitItem>
                  Intégrez les primes et avantages : une hausse de base n&apos;est pas toujours
                  comparable à une prime exceptionnelle.
                </EditorialBenefitItem>
                <EditorialBenefitItem>
                  Regardez l&apos;impact annuel : une petite hausse mensuelle pèse davantage sur
                  une année complète.
                </EditorialBenefitItem>
              </ul>

              <aside className="home-editorial__callout home-editorial__callout--advice">
                <strong>Conseil pratique</strong>
                <p>
                  Comparez plusieurs scénarios dans le simulateur : +100 €, +200 €, +5 % ou +10 %.
                  Vous verrez immédiatement lequel correspond le mieux à votre objectif net.
                </p>
              </aside>
            </div>

            <h2 id="en-resume" className="home-editorial__section-spaced">
              En résumé
            </h2>
            <div className="home-editorial__prose">
              <p>
                Une augmentation ne doit jamais être analysée uniquement en brut. Le montant
                réellement perçu dépend des cotisations salariales, du prélèvement à la source, de
                votre statut professionnel et du nombre de mois rémunérés sur l&apos;année.
              </p>
              <p>
                Ce calculateur permet d&apos;obtenir une estimation fiable de votre gain net, mois par
                mois et sur l&apos;année, avant une négociation, une promotion ou un changement de
                poste. Pour affiner le{" "}
                <Link href="/guides/comment-calculer-son-salaire-net">calcul du salaire net</Link>,
                complétez avec votre fiche de paie une fois la décision actée.
              </p>

              <div className="home-editorial__summary-checks">
                <p className="home-editorial__summary-checks-title">À retenir</p>
                <ul className="editorial-list editorial-list--checks">
                  <EditorialBenefitItem>Toujours raisonner en gain net.</EditorialBenefitItem>
                  <EditorialBenefitItem>Comparer plusieurs scénarios.</EditorialBenefitItem>
                  <EditorialBenefitItem>Tenir compte des cotisations.</EditorialBenefitItem>
                  <EditorialBenefitItem>Vérifier l&apos;impact annuel.</EditorialBenefitItem>
                  <EditorialBenefitItem>
                    Contrôler le résultat avec sa fiche de paie.
                  </EditorialBenefitItem>
                </ul>
              </div>
            </div>

            <IncreaseCalculatorCta />

            <p className="home-editorial__updated home-editorial__prose">
              Guide révisé le <time dateTime={SALARY_INCREASE_EDITORIAL_UPDATED_AT}>{revisedDateLabel}</time>
              . Montants indicatifs, hors primes et avantages spécifiques.
            </p>
          </div>
        </div>
      </section>

      <section id="faq" className="content-section content-section--border increase-editorial-faq">
        <div className="content-wrap">
          <p className="section-eyebrow section-eyebrow--dark">FAQ</p>
          <h2 className="section-title section-title--dark">
            Questions fréquentes sur l&apos;augmentation de salaire
          </h2>
          <SalaryIncreaseFaqContent />
        </div>
      </section>
    </>
  );
}

export { salaryIncreaseFaq };
