import Link from "next/link";
import { EditorialBenefitItem } from "@/site/editorial-check-icon";
import { PasCalculatorCta } from "./PasCalculatorCta";
import {
  buildPasPracticalCases,
  buildPasQuickReferenceRows,
  PAS_EDITORIAL_UPDATED_AT,
  pasFaq,
} from "./pas-editorial-data";

const practicalCases = buildPasPracticalCases();
const quickReferenceRows = buildPasQuickReferenceRows();

const revisedDateLabel = new Date(PAS_EDITORIAL_UPDATED_AT).toLocaleDateString("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

function PasFaqContent() {
  return (
    <div className="faq-list">
      {pasFaq.map((item) => (
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

export function PasEditorial() {
  return (
    <>
      <section id="contenu" className="content-section">
        <div className="content-wrap">
          <div className="prose home-editorial increase-calc-editorial pas-calc-editorial">
            <p className="home-editorial__lead home-editorial__prose">
              Le prélèvement à la source réduit chaque mois le montant versé sur votre compte. Ce
              calculateur estime le taux applicable, le montant prélevé et votre{" "}
              <Link href="/guides/comment-calculer-son-salaire-net">salaire net</Link> réellement
              perçu après impôt, à partir des mêmes règles que le{" "}
              <Link href="/">calculateur Brut vers Net</Link>.
            </p>

            <nav className="home-editorial__toc home-editorial__prose" aria-label="Sommaire du guide">
              <p className="home-editorial__toc-title">Dans ce guide</p>
              <ul className="home-editorial__toc-list editorial-list editorial-list--toc">
                <li>
                  <a href="#pourquoi-calculer">Pourquoi calculer son prélèvement ?</a>
                </li>
                <li>
                  <a href="#a-qui-sadresse">À qui s&apos;adresse ce calculateur ?</a>
                </li>
                <li>
                  <a href="#fonctionnement">Fonctionnement du calculateur</a>
                </li>
                <li>
                  <a href="#comprendre-pas">Comprendre le prélèvement à la source</a>
                </li>
                <li>
                  <a href="#net-diminue">Pourquoi le net diminue</a>
                </li>
                <li>
                  <a href="#exemples">Exemples concrets</a>
                </li>
                <li>
                  <a href="#reperes">Repères rapides</a>
                </li>
                <li>
                  <a href="#reduire-taux">Réduire son taux</a>
                </li>
                <li>
                  <a href="#estimation">Pourquoi c&apos;est une estimation</a>
                </li>
                <li>
                  <a href="#en-resume">En résumé</a>
                </li>
                <li>
                  <a href="#faq">FAQ</a>
                </li>
              </ul>
            </nav>

            <h2 id="pourquoi-calculer">Pourquoi calculer son prélèvement à la source ?</h2>
            <div className="home-editorial__prose">
              <p>
                Sur une fiche de paie, plusieurs montants se succèdent : salaire brut, cotisations
                salariales, net avant impôt, puis prélèvement à la source. Le dernier maillon est
                souvent le plus mal compris, car il dépend de votre situation fiscale et non
                seulement de votre employeur.
              </p>
              <p>
                Calculer son prélèvement à la source permet de savoir combien sera retenu chaque
                mois, d&apos;anticiper le salaire réellement versé, et de comparer un taux neutre
                estimé avec le taux affiché sur votre bulletin. C&apos;est utile avant une
                embauche, une augmentation ou un changement de poste.
              </p>
              <p>
                Beaucoup de salariés raisonnent encore uniquement en brut. Or, deux propositions
                identiques en brut peuvent produire des nets versés différents selon le taux
                appliqué, le nombre de mois rémunérés ou le statut professionnel. Visualiser le
                prélèvement évite les mauvaises surprises le jour du virement.
              </p>
              <p>
                Ce simulateur ne remplace pas l&apos;espace impots.gouv.fr. Il traduit une
                rémunération en ordre de grandeur : taux, montant mensuel, montant annuel et net
                après prélèvement. L&apos;objectif est pédagogique : comprendre le mécanisme, puis
                affiner avec vos documents officiels.
              </p>
            </div>

            <h2 id="a-qui-sadresse">À qui s&apos;adresse ce calculateur ?</h2>
            <div className="home-editorial__prose">
              <p>
                Le calculateur s&apos;adresse à toute personne rémunérée en France qui souhaite
                estimer l&apos;impact du prélèvement à la source sur son salaire. Les profils
                couverts reprennent ceux du reste du site.
              </p>
              <ul className="editorial-list editorial-list--checks">
                <EditorialBenefitItem>
                  Salariés du privé, cadres et non-cadres.
                </EditorialBenefitItem>
                <EditorialBenefitItem>
                  Agents de la fonction publique.
                </EditorialBenefitItem>
                <EditorialBenefitItem>
                  Personnes en changement d&apos;emploi ou en négociation d&apos;un nouveau contrat.
                </EditorialBenefitItem>
                <EditorialBenefitItem>
                  Salariés qui préparent une augmentation et veulent voir l&apos;effet sur le net
                  versé.
                </EditorialBenefitItem>
              </ul>
              <aside className="home-editorial__callout home-editorial__callout--warning">
                <strong>Bon à savoir</strong>
                <p>
                  Si vous connaissez déjà votre taux personnel, passez en mode personnalisé. Sinon,
                  laissez le mode automatique : le simulateur propose un taux neutre estimé à partir
                  de votre rémunération.
                </p>
              </aside>
            </div>

            <h2 id="fonctionnement">Comment fonctionne le calculateur ?</h2>
            <div className="home-editorial__prose">
              <p>
                Le parcours reprend la logique du calculateur Brut vers Net, puis met l&apos;accent
                sur le prélèvement à la source. Voici les étapes du formulaire.
              </p>
              <ul className="editorial-list editorial-list--steps">
                <li>
                  Indiquez votre salaire (brut mensuel, brut annuel ou net mensuel avant impôt).
                </li>
                <li>Choisissez votre statut : non-cadre, cadre ou fonction publique.</li>
                <li>Ajustez le temps de travail avec le curseur (de 10 % à 100 %).</li>
                <li>Précisez le nombre de mois rémunérés (12 à 16).</li>
                <li>
                  Conservez le taux automatique ou saisissez votre taux personnalisé via le curseur.
                </li>
              </ul>
              <p>
                Le moteur calcule d&apos;abord le brut et le net avant prélèvement, estime un net
                imposable simplifié, applique le taux, puis affiche le montant prélevé et le salaire
                après impôt. Les champs mensuels et annuels restent synchronisés.
              </p>
              <p>
                Si vous ne connaissez que votre net, activez l&apos;option dédiée : le simulateur
                reconstitue un brut estimé, comme sur les autres calculateurs du site. Vous pouvez
                ensuite ajuster le taux pour coller à votre fiche de paie.
              </p>
              <aside className="home-editorial__callout home-editorial__callout--key">
                <strong>À retenir</strong>
                <p>
                  Le prélèvement à la source porte sur le net imposable, pas sur le brut. C&apos;est
                  pourquoi le montant retenu n&apos;équivaut jamais au brut multiplié par le taux.
                </p>
              </aside>
            </div>

            <h2 id="comprendre-pas" className="home-editorial__section-spaced">
              Comprendre le prélèvement à la source
            </h2>
            <div className="home-editorial__prose">
              <h3>Qu&apos;est-ce que le prélèvement à la source ?</h3>
              <p>
                Le prélèvement à la source est un acompte d&apos;impôt sur le revenu collecté chaque
                mois par l&apos;employeur. Il n&apos;est pas une cotisation sociale : les
                cotisations financent la protection sociale, tandis que le prélèvement anticipe
                l&apos;impôt dû à l&apos;État.
              </p>
              <p>
                Depuis son généralisation, la plupart des revenus salariaux sont concernés. Le
                montant apparaît clairement sur le bulletin, souvent à proximité du net imposable et
                du net à payer. Comprendre cette ligne, c&apos;est comprendre pourquoi le virement
                bancaire diffère du net avant impôt.
              </p>
              <p>
                Pour aller plus loin, consultez notre guide dédié au{" "}
                <Link href="/guides/prelevement-a-la-source-quest-ce-que-cest-et-comment-ca-fonctionne">
                  prélèvement à la source
                </Link>
                .
              </p>

              <h3>Comment est calculé le taux ?</h3>
              <p>
                En pratique, l&apos;administration fiscale transmet un taux à votre employeur à
                partir de votre situation déclarée. En l&apos;absence de taux personnel, un taux
                neutre peut s&apos;appliquer selon le niveau de revenu du mois. Ce calculateur
                estime un taux neutre à partir d&apos;un net imposable simplifié, cohérent avec le
                reste du site.
              </p>
              <p>
                Le montant prélevé résulte ensuite d&apos;une multiplication simple : base taxable
                multipliée par le taux. C&apos;est pourquoi modifier le curseur de taux change
                immédiatement le montant affiché, sans recalculer les cotisations sociales.
              </p>

              <h3>Pourquoi le taux change-t-il ?</h3>
              <p>
                Une variation de revenus, un changement de foyer fiscal ou une actualisation
                demandée sur impots.gouv.fr peut modifier le taux. Même sans changement de taux, une
                hausse de salaire augmente souvent le montant prélevé, car la base taxable
                progresse.
              </p>
              <p>
                Après une déclaration annuelle, un crédit d&apos;impôt ou une régularisation peut
                aussi faire évoluer le taux pour les mois suivants. Le simulateur permet de tester
                plusieurs hypothèses avant que ces ajustements n&apos;apparaissent sur votre paie.
              </p>

              <h3>Quelle différence entre taux personnalisé et taux neutre ?</h3>
              <p>
                Le taux personnalisé reflète votre situation fiscale. Le taux neutre est un barème
                forfaitaire, utile lorsque l&apos;employeur ne dispose pas encore de votre taux. Le
                mode automatique du simulateur s&apos;inspire de cette logique neutre. Le mode
                personnalisé vous laisse appliquer le pourcentage de votre choix.
              </p>
              <p>
                Si vous venez d&apos;être embauché, le taux neutre peut s&apos;appliquer
                temporairement. Dès que votre taux personnel est transmis, le montant prélevé peut
                évoluer à la hausse ou à la baisse. D&apos;où l&apos;intérêt de simuler les deux
                situations.
              </p>

              <h3>Pourquoi mon taux est-il différent de celui de mon collègue ?</h3>
              <p>
                Deux salariés au même brut peuvent avoir des foyers fiscaux différents, d&apos;autres
                revenus, ou un taux individualisé au sein du couple. Le prélèvement à la source
                n&apos;est donc pas un pourcentage unique pour tout le monde.
              </p>
              <p>
                Un collègue célibataire et un collègue en couple avec enfants ne partagent pas
                forcément la même pression fiscale mensuelle, même à poste équivalent. Le
                calculateur illustre l&apos;effet du taux ; il ne reconstitue pas le foyer fiscal
                complet.
              </p>
            </div>

            <h2 id="net-diminue" className="home-editorial__section-spaced">
              Pourquoi mon salaire net diminue-t-il après prélèvement ?
            </h2>
            <div className="home-editorial__prose">
              <p>
                Le passage du{" "}
                <Link href="/guides/comment-est-calcule-le-salaire-net">salaire brut</Link> au net
                avant impôt s&apos;explique surtout par les{" "}
                <Link href="/guides/cotisations-salariales-pourquoi-brut-plus-eleve-que-net">
                  cotisations salariales
                </Link>
                . Ensuite, le prélèvement à la source retire encore une partie du net imposable.
              </p>
              <p>
                Résultat : le montant crédité sur votre compte (net après prélèvement) est inférieur
                au net avant impôt. Ce n&apos;est pas une erreur de paie : c&apos;est l&apos;impôt
                collecté à la source. Le simulateur affiche ces deux niveaux pour clarifier
                l&apos;écart.
              </p>
              <p>
                En négociation salariale, raisonner uniquement en brut peut surestimer le gain
                réel. Une hausse de 200 € brut ne se retrouve jamais intégralement après cotisations
                et prélèvement. Le même principe vaut pour une offre d&apos;embauche exprimée en
                annuel brut.
              </p>
              <aside className="home-editorial__callout home-editorial__callout--example">
                <strong>Exemple concret</strong>
                <p>
                  Sur un salaire de 2 500 € brut, le net avant prélèvement dépend de votre statut.
                  Avec un taux de 6 %, le montant prélevé chaque mois représente une fraction du net
                  imposable estimé, pas 6 % du brut. Testez le scénario dans le formulaire pour
                  obtenir les chiffres exacts du moteur.
                </p>
              </aside>
            </div>

            <h2 id="exemples" className="home-editorial__section-spaced">
              Exemples concrets
            </h2>
            <div className="home-editorial__prose">
              <p>
                Quelques simulations indicatives. Les montants sont calculés avec le même moteur que
                le haut de page. Adaptez ensuite vos propres chiffres.
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
                  <p className="home-editorial__case-hint">{item.calculatorHint}</p>
                </article>
              ))}
            </div>

            <h2 id="reperes" className="home-editorial__section-spaced">
              Repères rapides
            </h2>
            <div className="home-editorial__prose">
              <p>
                Tableau indicatif pour un salarié non-cadre à temps plein, rémunéré sur 12 mois, avec
                taux neutre automatique.
              </p>
              <div className="home-editorial__table-wrap home-editorial__wide">
                <table className="home-editorial__table">
                  <thead>
                    <tr>
                      <th scope="col">Salaire brut</th>
                      <th scope="col" className="home-editorial__table-num">
                        Net avant impôt
                      </th>
                      <th scope="col" className="home-editorial__table-num">
                        Taux
                      </th>
                      <th scope="col" className="home-editorial__table-num">
                        Montant prélevé
                      </th>
                      <th scope="col" className="home-editorial__table-num">
                        Net après impôt
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {quickReferenceRows.map((row) => (
                      <tr key={row.gross}>
                        <td>{row.gross}</td>
                        <td className="home-editorial__table-num">{row.netBefore}</td>
                        <td className="home-editorial__table-num">{row.rate}</td>
                        <td className="home-editorial__table-num">{row.withholding}</td>
                        <td className="home-editorial__table-num">{row.netAfter}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="home-editorial__table-note">
                Montants indicatifs. Votre résultat dépend de votre statut, de vos cotisations, de
                votre temps de travail et de votre taux réel.
              </p>
            </div>

            <h2 id="reduire-taux" className="home-editorial__section-spaced">
              Comment réduire son taux de prélèvement ?
            </h2>
            <div className="home-editorial__prose">
              <p>
                Il n&apos;existe pas de « astuce » magique. En revanche, certaines situations
                permettent une actualisation du taux auprès de l&apos;administration fiscale. Voici
                les cas les plus fréquents, à titre informatif uniquement.
              </p>
              <ul className="editorial-list editorial-list--checks">
                <EditorialBenefitItem>
                  Modulation du taux (hausse ou baisse) via impots.gouv.fr, sous conditions.
                </EditorialBenefitItem>
                <EditorialBenefitItem>
                  Changement de situation : mariage, PACS, divorce, naissance.
                </EditorialBenefitItem>
                <EditorialBenefitItem>
                  Baisse durable de revenus (chômage, temps partiel, fin de contrat).
                </EditorialBenefitItem>
                <EditorialBenefitItem>
                  Choix d&apos;un taux individualisé au sein du couple, selon les revenus de chacun.
                </EditorialBenefitItem>
              </ul>
              <p>
                Une modulation à la baisse n&apos;efface pas l&apos;impôt dû : elle ajuste
                seulement le rythme des acomptes. En fin d&apos;année ou après déclaration, une
                régularisation peut intervenir si trop peu ou trop d&apos;impôt a été prélevé.
              </p>
              <p>
                Ce site ne fournit pas de conseil fiscal personnalisé. Pour une démarche officielle,
                utilisez uniquement les services de l&apos;administration fiscale.
              </p>
              <aside className="home-editorial__callout home-editorial__callout--advice">
                <strong>Conseil pratique</strong>
                <p>
                  Avant de demander une modulation, simulez l&apos;effet d&apos;un taux plus bas ou
                  plus haut dans le curseur. Vous verrez immédiatement l&apos;impact sur le montant
                  prélevé et sur le net versé.
                </p>
              </aside>
            </div>

            <h2 id="estimation" className="home-editorial__section-spaced">
              Pourquoi ce calcul reste une estimation ?
            </h2>
            <div className="home-editorial__prose">
              <p>
                Le simulateur ne connaît pas l&apos;intégralité de votre dossier fiscal. Il ne
                prend pas en compte, par exemple :
              </p>
              <ul className="editorial-list editorial-list--checks">
                <EditorialBenefitItem>Les autres revenus du foyer.</EditorialBenefitItem>
                <EditorialBenefitItem>Les revenus fonciers ou exceptionnels.</EditorialBenefitItem>
                <EditorialBenefitItem>Les crédits et réductions d&apos;impôt.</EditorialBenefitItem>
                <EditorialBenefitItem>
                  La situation familiale complète (enfants, pension alimentaire, etc.).
                </EditorialBenefitItem>
              </ul>
              <p>
                Les hypothèses de cotisations sont également simplifiées : elles suivent les profils
                du site (cadre, non-cadre, fonction publique) sans reproduire chaque ligne de votre
                convention collective. Les primes variables, avantages en nature ou régularisations
                ponctuelles peuvent aussi faire diverger le résultat.
              </p>
              <p>
                Votre{" "}
                <Link href="/guides/comment-lire-une-fiche-de-paie">fiche de paie</Link> et votre
                espace fiscal restent les références. Le calculateur sert à comprendre un ordre de
                grandeur avant une décision ou une négociation.
              </p>
            </div>

            <h2 id="en-resume" className="home-editorial__section-spaced">
              En résumé
            </h2>
            <div className="home-editorial__prose">
              <p>
                Le prélèvement à la source est un acompte d&apos;impôt, distinct des cotisations
                salariales. Son montant dépend du taux appliqué et de la base taxable. Pour estimer
                votre salaire réellement versé, il faut regarder le net après prélèvement, pas
                seulement le brut ou le net avant impôt.
              </p>
              <p>
                Ce calculateur reprend le moteur Brut vers Net pour rester cohérent avec les autres
                outils du site, y compris le{" "}
                <Link href="/calculateurs/augmentation-salaire">
                  calculateur d&apos;augmentation de salaire
                </Link>
                .
              </p>
              <div className="home-editorial__summary-checks">
                <p className="home-editorial__summary-checks-title">À retenir</p>
                <ul className="editorial-list editorial-list--checks">
                  <EditorialBenefitItem>
                    Distinguer cotisations sociales et prélèvement à la source.
                  </EditorialBenefitItem>
                  <EditorialBenefitItem>
                    Comparer taux neutre estimé et taux personnel.
                  </EditorialBenefitItem>
                  <EditorialBenefitItem>
                    Regarder le montant prélevé mensuel et annuel.
                  </EditorialBenefitItem>
                  <EditorialBenefitItem>
                    Vérifier le salaire après prélèvement (net versé).
                  </EditorialBenefitItem>
                  <EditorialBenefitItem>
                    Contrôler le résultat avec sa fiche de paie.
                  </EditorialBenefitItem>
                </ul>
              </div>
            </div>

            <PasCalculatorCta />

            <p className="home-editorial__updated home-editorial__prose">
              Guide révisé le{" "}
              <time dateTime={PAS_EDITORIAL_UPDATED_AT}>{revisedDateLabel}</time>. Montants
              indicatifs, hors situation fiscale complète.
            </p>
          </div>
        </div>
      </section>

      <section id="faq" className="content-section content-section--border increase-editorial-faq">
        <div className="content-wrap">
          <p className="section-eyebrow section-eyebrow--dark">FAQ</p>
          <h2 className="section-title section-title--dark">
            Questions fréquentes sur le prélèvement à la source
          </h2>
          <PasFaqContent />
        </div>
      </section>
    </>
  );
}

export { pasFaq };
