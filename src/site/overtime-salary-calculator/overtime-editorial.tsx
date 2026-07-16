import Link from "next/link";
import { EditorialBenefitItem } from "@/site/editorial-check-icon";
import { GuideIllustration } from "@/site/guides/illustrations";
import { OvertimeCalculatorCta } from "./OvertimeCalculatorCta";
import {
  buildOvertimePracticalCases,
  eightPlusTwoGross,
  eightPlusTwoNet,
  exampleOneHourAt25,
  exampleTenHoursNonExecutive,
  formatEditorialEuro,
  OVERTIME_EDITORIAL_UPDATED_AT,
  overtimeFaq,
  tenHoursGross,
  tenHoursNet,
} from "./overtime-editorial-data";
import { OVERTIME_CONFIG_2026 } from "./overtime/2026/config";
import { MONTHLY_HOURS_REFERENCE } from "./config";

const revisedDateLabel = new Date(OVERTIME_EDITORIAL_UPDATED_AT).toLocaleDateString("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const oneHour = exampleOneHourAt25();
const tenHours = exampleTenHoursNonExecutive();
const practicalCases = buildOvertimePracticalCases();

function OvertimeFaqContent() {
  return (
    <div className="faq-list">
      {overtimeFaq.map((item) => (
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

export function OvertimeSalaryEditorial() {
  return (
    <>
      <section id="contenu" className="content-section">
        <div className="content-wrap">
          <div className="prose home-editorial increase-calc-editorial">
            <p className="home-editorial__lead home-editorial__prose">
              Vous avez effectué des heures supplémentaires et souhaitez savoir combien elles vont
              réellement vous rapporter ? Ce calculateur d&apos;heures supplémentaires estime le
              montant brut et net de vos heures majorées, puis votre nouveau salaire mensuel.
            </p>
            <p className="home-editorial__prose">
              La simulation s&apos;adresse aux salariés à temps plein du secteur privé sur une base
              de 35 heures. Le résultat reste indicatif : votre{" "}
              <Link href="/guides/comment-lire-une-fiche-de-paie">fiche de paie</Link> fait toujours
              foi.
            </p>
            <p className="home-editorial__prose">
              Notre simulateur applique les principales règles en vigueur pour les salariés à temps
              plein du secteur privé afin de fournir une estimation rapide. En quelques secondes,
              vous pouvez vérifier si le montant figurant sur votre fiche de paie est cohérent.
            </p>

            <nav className="home-editorial__toc home-editorial__prose" aria-label="Sommaire du guide">
              <p className="home-editorial__toc-title">Dans ce guide</p>
              <ul className="home-editorial__toc-list editorial-list editorial-list--toc">
                <li>
                  <a href="#calculateur">Estimez immédiatement vos heures supplémentaires</a>
                </li>
                <li>
                  <a href="#comment-calculer-salaire-heures-sup">
                    Comment calculer son salaire avec des heures supplémentaires ?
                  </a>
                </li>
                <li>
                  <a href="#comment-calculer-taux-horaire-hs">
                    Comment calculer le taux horaire d&apos;une heure supplémentaire ?
                  </a>
                </li>
                <li>
                  <a href="#majoration-25-ou-50">
                    Heures supplémentaires à 25 % ou à 50 % : quelle différence ?
                  </a>
                </li>
                <li>
                  <a href="#brut-vers-net-heures-sup">
                    Comment convertir une heure supplémentaire brute en net ?
                  </a>
                </li>
                <li>
                  <a href="#exemples-heures-sup">Exemples de calcul d&apos;heures supplémentaires</a>
                </li>
                <li>
                  <a href="#heures-sup-imposables">
                    Les heures supplémentaires sont-elles imposables ?
                  </a>
                </li>
                <li>
                  <a href="#pourquoi-resultat-varie">
                    Pourquoi le montant réel de vos heures supplémentaires peut-il varier ?
                  </a>
                </li>
                <li>
                  <a href="#faq-heures-supplementaires">Questions fréquentes</a>
                </li>
              </ul>
            </nav>

            <h2 id="comment-calculer-salaire-heures-sup" className="home-editorial__section-spaced">
              Comment calculer son salaire avec des heures supplémentaires ?
            </h2>
            <div className="home-editorial__prose">
              <p>
                Pour un calcul salaire avec heures supplémentaires, partez de votre salaire
                habituel hors heures majorées. Obtenez ensuite le taux horaire brut, appliquez la
                majoration (25 %, 50 % ou le taux de votre entreprise), puis estimez le net.
              </p>
              <p>
                Ce simulateur d&apos;heures supplémentaires suit exactement ce parcours. Vous
                recopiez les heures déjà classées à 25 % et à 50 % sur votre relevé ou votre bulletin,
                sans reconstruire un emploi du temps complet.
              </p>
            </div>

            <h2 id="comment-calculer-taux-horaire-hs" className="home-editorial__section-spaced">
              Comment calculer le taux horaire d&apos;une heure supplémentaire ?
            </h2>
            <div className="home-editorial__prose">
              <p>
                Pour un temps plein à 35 heures, la durée mensualisée de référence est de{" "}
                {MONTHLY_HOURS_REFERENCE} heures. Le calcul d&apos;une heure supplémentaire commence
                ainsi :
              </p>
              <p>
                <strong>
                  taux horaire brut = salaire brut mensuel de base ÷ {MONTHLY_HOURS_REFERENCE}
                </strong>
              </p>
              <p>
                Une heure majorée à 25 % vaut ensuite <strong>taux horaire × 1,25</strong>. Avec un
                salaire de 2 500 € brut mensuel, le taux horaire est d&apos;environ{" "}
                {formatEditorialEuro(oneHour.hourly)}. Une heure à 25 % vaut alors environ{" "}
                {formatEditorialEuro(oneHour.grossHour)} brut.
              </p>
              <p>
                C&apos;est ce montant brut qui sert de base avant d&apos;estimer combien rapporte
                une heure supplémentaire en net.
              </p>
            </div>

            <h2 id="majoration-25-ou-50" className="home-editorial__section-spaced">
              Heures supplémentaires à 25 % ou à 50 % : quelle différence ?
            </h2>
            <div className="home-editorial__prose">
              <p>
                Les heures supplémentaires sont décomptées <strong>semaine par semaine</strong>. En
                l&apos;absence d&apos;accord différent, les huit premières heures supplémentaires de
                la semaine sont généralement majorées de 25 %, puis les suivantes de 50 %.
              </p>
              <p>
                C&apos;est pourquoi le calculateur demande deux quantités séparées sur le mois,
                plutôt que de répartir automatiquement un total. Vous reprenez simplement la
                répartition déjà faite par votre employeur.
              </p>
            </div>

            <GuideIllustration
              id="heures-supplementaires-fiche-paie"
              caption="Exemple simplifié : le salaire de base, puis les heures supplémentaires majorées à 25 % et à 50 %."
            />

            <h2 id="brut-vers-net-heures-sup" className="home-editorial__section-spaced">
              Comment convertir une heure supplémentaire brute en net ?
            </h2>
            <div className="home-editorial__prose">
              <p>
                Une heure supplémentaire brute ne se transforme pas en net avec le même coefficient
                moyen que le salaire ordinaire. Les heures supplémentaires bénéficient d&apos;une{" "}
                <Link href="/guides/cotisations-salariales-pourquoi-brut-plus-eleve-que-net">
                  réduction de cotisations salariales
                </Link>
                .
              </p>
              <p>
                L&apos;Urssaf présente notamment un taux maximal de réduction de{" "}
                {(OVERTIME_CONFIG_2026.maxEmployeeContributionReliefRate * 100).toLocaleString(
                  "fr-FR",
                )}{" "}
                % dans son exemple 2026. Le calculateur estime donc un gain net distinct du gain
                brut, avant prélèvement à la source.
              </p>
              <p>
                Pour une estimation globale de votre rémunération hors heures, utilisez aussi le{" "}
                <Link href="/">calculateur Brut vers Net</Link>.
              </p>
            </div>

            <h2 id="exemples-heures-sup" className="home-editorial__section-spaced">
              Exemples de calcul d&apos;heures supplémentaires
            </h2>
            <div className="home-editorial__prose">
              <p>
                Voici quelques simulations indicatives pour vous donner un ordre de grandeur. Les
                montants peuvent varier selon votre convention collective, votre rémunération et
                votre fiche de paie.
              </p>
              <p>
                <strong>Combien représentent 10 heures supplémentaires en net ?</strong> Sur une
                base de 2 500 € brut mensuel et 10 heures majorées à 25 %, l&apos;estimation est
                d&apos;environ {tenHoursGross} brut et {tenHoursNet} net avant prélèvement à la
                source
                {tenHours
                  ? `, pour un nouveau salaire brut d'environ ${formatEditorialEuro(tenHours.newGrossMonthly)}`
                  : ""}
                .
              </p>
              <p>
                Avec 8 heures à 25 % et 2 heures à 50 % sur la même base, le gain s&apos;élève à
                environ {eightPlusTwoGross} brut et {eightPlusTwoNet} net. Pour comparer l&apos;effet
                d&apos;une hausse permanente de salaire, voir aussi le{" "}
                <Link href="/calculateurs/augmentation-salaire">
                  simulateur d&apos;augmentation de salaire
                </Link>
                .
              </p>
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
                </article>
              ))}
            </div>

            <div className="home-editorial__prose">
              <p>
                Ces exemples sont des ordres de grandeur. Saisissez vos propres montants dans le
                calculateur en haut de page pour une simulation adaptée à votre situation.
              </p>
            </div>

            <h2 id="heures-sup-imposables" className="home-editorial__section-spaced">
              Les heures supplémentaires sont-elles imposables ?
            </h2>
            <div className="home-editorial__prose">
              <p>
                Elles peuvent être exonérées d&apos;impôt sur le revenu dans la limite du plafond
                annuel applicable (
                {formatEditorialEuro(OVERTIME_CONFIG_2026.incomeTaxExemptionAnnualCeiling)} de
                rémunération nette imposable selon la documentation consultée, mise à jour au{" "}
                {revisedDateLabel}).
              </p>
              <p>
                Le traitement exact dépend du cumul déjà perçu dans l&apos;année. Pour comprendre le
                mécanisme du prélèvement, consultez le{" "}
                <Link href="/guides/prelevement-a-la-source-quest-ce-que-cest-et-comment-ca-fonctionne">
                  guide sur le prélèvement à la source
                </Link>
                .
              </p>
            </div>

            <h2 id="pourquoi-resultat-varie" className="home-editorial__section-spaced">
              Pourquoi le montant réel de vos heures supplémentaires peut-il varier ?
            </h2>
            <div className="home-editorial__prose">
              <p>
                Plusieurs éléments peuvent écarter cette estimation de votre fiche de paie réelle :
              </p>
              <ul className="editorial-list editorial-list--checks">
                <EditorialBenefitItem>
                  Convention collective ou accord d&apos;entreprise différent
                </EditorialBenefitItem>
                <EditorialBenefitItem>
                  Primes intégrées dans la base de calcul
                </EditorialBenefitItem>
                <EditorialBenefitItem>
                  Annualisation ou organisation du temps de travail
                </EditorialBenefitItem>
                <EditorialBenefitItem>Régimes d&apos;équivalence</EditorialBenefitItem>
                <EditorialBenefitItem>
                  Plafonds d&apos;exonération déjà atteints
                </EditorialBenefitItem>
                <EditorialBenefitItem>
                  Particularités figurant sur votre fiche de paie
                </EditorialBenefitItem>
              </ul>
              <p>
                Pour comprendre la composition du{" "}
                <Link href="/guides/comment-calculer-son-salaire-net">salaire net</Link>,
                reportez-vous aussi aux guides dédiés. Le calculateur reste un outil
                d&apos;estimation, pas un remplacement de la paie officielle.
              </p>
            </div>

            <h2 id="en-resume" className="home-editorial__section-spaced">
              En résumé : ce qu&apos;il faut retenir sur le calcul des heures supplémentaires
            </h2>
            <div className="home-editorial__prose">
              <p>
                Une simulation heures supplémentaires utile commence toujours par le salaire de
                base, le taux horaire et la majoration réellement appliquée. Le net estimé intègre
                ensuite la réduction de cotisations, avant prélèvement à la source.
              </p>

              <div className="home-editorial__summary-checks">
                <p className="home-editorial__summary-checks-title">À retenir</p>
                <ul className="editorial-list editorial-list--checks">
                  <EditorialBenefitItem>
                    Le taux horaire de base se calcule en divisant le brut mensuel par{" "}
                    {MONTHLY_HOURS_REFERENCE}.
                  </EditorialBenefitItem>
                  <EditorialBenefitItem>
                    Les majorations légales sont en général de 25 % puis 50 %, semaine par semaine.
                  </EditorialBenefitItem>
                  <EditorialBenefitItem>
                    Le net des heures supplémentaires intègre une réduction de cotisations
                    salariales.
                  </EditorialBenefitItem>
                  <EditorialBenefitItem>
                    L&apos;exonération d&apos;impôt est plafonnée : le résultat principal reste avant
                    prélèvement à la source.
                  </EditorialBenefitItem>
                  <EditorialBenefitItem>
                    La fiche de paie reste la référence face à toute estimation en ligne.
                  </EditorialBenefitItem>
                </ul>
              </div>
            </div>

            <OvertimeCalculatorCta />

            <h2 id="faq-heures-supplementaires" className="home-editorial__section-spaced">
              Questions fréquentes sur le calculateur d&apos;heures supplémentaires
            </h2>
            <OvertimeFaqContent />

            <p className="home-editorial__updated home-editorial__prose">
              Contenu vérifié le{" "}
              <time dateTime={OVERTIME_EDITORIAL_UPDATED_AT}>{revisedDateLabel}</time>. Sources :
              Service-Public (heures supplémentaires, imposition) et Urssaf (réduction de
              cotisations salariales). Montants indicatifs, hors primes et situations particulières.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export { overtimeFaq };
