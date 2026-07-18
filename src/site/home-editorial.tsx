import {
  buildConversionTableRows,
  buildPracticalCases,
  example15HourlyNonExecutive,
  example2500NonExecutive,
  example36000AnnualNonExecutive,
  formatEditorialEuro,
  HOME_EDITORIAL_UPDATED_AT,
} from "./home-editorial-data";
import { EditorialBenefitItem } from "./editorial-check-icon";
import { CoverFigure } from "@/site/guides/CoverFigure";
import { HOME_COVER } from "@/site/guides/covers";

const conversionRows = buildConversionTableRows();
const practicalCases = buildPracticalCases();
const ex2500 = example2500NonExecutive();
const ex36000 = example36000AnnualNonExecutive();
const ex15 = example15HourlyNonExecutive();

const revisedDateLabel = new Date(HOME_EDITORIAL_UPDATED_AT).toLocaleDateString("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

/** Contenu éditorial page d'accueil */
export function HomeEditorial() {
  return (
    <section id="contenu" className="content-section">
      <div className="content-wrap">
        <div className="prose home-editorial">
          <p className="home-editorial__lead home-editorial__prose">
            Estimez votre salaire Brut vers Net en quelques secondes : conversion horaire,
            mensuelle ou annuelle, dans les deux sens, avec une projection du prélèvement à la
            source. Les résultats restent indicatifs, mais utiles pour comparer une offre,
            préparer un entretien ou situer un ordre de grandeur.
          </p>

          <CoverFigure cover={HOME_COVER} priority />

          <nav className="home-editorial__toc home-editorial__prose" aria-label="Sommaire du guide">
            <p className="home-editorial__toc-title">Dans ce guide</p>
            <ul className="home-editorial__toc-list editorial-list editorial-list--toc">
              <li>
                <a href="#calcul-brut-net">Calculer brut vers net</a>
              </li>
              <li>
                <a href="#comprendre-brut-net">Comprendre le brut et le net</a>
              </li>
              <li>
                <a href="#utiliser-calculateur">Utiliser le calculateur</a>
              </li>
              <li>
                <a href="#exemples-cas-pratiques">Voir des exemples</a>
              </li>
              <li>
                <a href="#prelevement-source">Prélèvement à la source</a>
              </li>
              <li>
                <a href="#limites-utilite">Limites et utilité</a>
              </li>
              <li>
                <a href="#faq">FAQ</a>
              </li>
            </ul>
          </nav>

          <h2 id="calcul-brut-net">Comment calculer son salaire Brut vers Net ?</h2>
          <div className="home-editorial__prose">
            <p>
              Le salaire brut est la rémunération convenue avec l&apos;employeur, avant toute retenue.
              C&apos;est la référence la plus fréquente sur une offre ou un contrat.
            </p>
            <p>
              Le net estimé avant impôt correspond au montant après cotisations salariales. Le net
              après impôt est ce qui reste une fois le prélèvement à la source appliqué.
            </p>
            <p>
              L&apos;écart entre les deux niveaux vient des cotisations prélevées sur la rémunération,
              qui financent la protection sociale (maladie, retraite, chômage).
            </p>

            <h3>Formule simplifiée du simulateur</h3>
            <p>
              Sur une fiche de paie, chaque cotisation est détaillée. Ici, un coefficient indicatif
              par profil suffit : net estimé = brut × coefficient. Pour le sens inverse, on divise
              par le même coefficient.
            </p>
            <p>
              Trois profils sont proposés : salarié non-cadre, salarié cadre et fonction publique.
              Les coefficients sont configurés pour une estimation simple, revus régulièrement, sans
              prétendre reproduire une paie réelle.
            </p>

            <aside className="home-editorial__callout home-editorial__callout--example">
              <strong>Exemple</strong>
              <p>
                Salaire brut mensuel : {formatEditorialEuro(ex2500.grossMonthly)}
                <br />
                Net estimé avant impôt (non-cadre) : {formatEditorialEuro(ex2500.netMonthly)}
                <br />
                Net après impôt : selon le taux saisi dans le simulateur.
              </p>
            </aside>

            <aside className="home-editorial__callout home-editorial__callout--key">
              <strong>À retenir</strong>
              <p>
                Le brut figure au contrat. Le net estimé avant impôt reste soumis au prélèvement à
                la source, qui le réduit encore.
              </p>
            </aside>

            <h3>Convertir un salaire net en brut</h3>
            <p>
              En négociation ou pour comparer des offres, vous pouvez partir du net souhaité : le
              brut équivalent s&apos;affiche selon le profil choisi (cadre, non-cadre, etc.).
            </p>
          </div>

          <h2 id="comprendre-brut-net">Comprendre le brut, le net et le net après impôt</h2>
          <div className="home-editorial__prose">
            <p>
              Bulletin, contrat et simulateur emploient des libellés différents. Les confondre
              fausse les comparaisons. Le tableau ci-dessous clarifie brut, net avant impôt, base
              imposable et net après impôt.
            </p>
          </div>

          <div className="home-editorial__table-wrap home-editorial__wide">
            <table className="home-editorial__table">
              <caption>Brut, net avant impôt, net imposable et net après impôt : où les situer</caption>
              <thead>
                <tr>
                  <th scope="col">Notion</th>
                  <th scope="col">Définition</th>
                  <th scope="col">Où le retrouver ?</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Salaire brut</td>
                  <td>Avant cotisations salariales</td>
                  <td>Contrat, offre d&apos;emploi, fiche de paie</td>
                </tr>
                <tr>
                  <td>Net estimé avant impôt</td>
                  <td>Après cotisations, avant prélèvement à la source</td>
                  <td>Résultat du simulateur ; bulletin (net à payer avant impôt)</td>
                </tr>
                <tr>
                  <td>Net imposable estimé</td>
                  <td>Base fiscale estimée pour calculer le prélèvement</td>
                  <td>
                    Estimation interne du simulateur ; montant exact sur votre bulletin de salaire
                  </td>
                </tr>
                <tr>
                  <td>Net après impôt</td>
                  <td>Après prélèvement à la source</td>
                  <td>Net payé sur votre compte bancaire</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="home-editorial__prose">
            <p>
              Le simulateur affiche un net avant impôt et un net après impôt. Sur un bulletin, la
              ligne « montant net social » est une notion réglementaire précise : ce n&apos;est pas le
              libellé utilisé ici.
            </p>

            <h3>Cotisations prélevées sur le brut</h3>
            <ul className="editorial-list editorial-list--neutral">
              <li>Assurance maladie, maternité, invalidité et décès</li>
              <li>Retraite de base et retraite complémentaire</li>
              <li>Assurance chômage</li>
              <li>CSG et CRDS</li>
              <li>Cotisations liées au statut (cadre, non-cadre, fonction publique)</li>
            </ul>
            <p>
              Deux personnes au même brut peuvent percevoir un net légèrement différent selon leur
              contrat.
            </p>

            <h3>Net avant impôt et net après impôt</h3>
            <p>
              Le net avant impôt reste après cotisations. Le prélèvement à la source s&apos;applique
              ensuite sur une base fiscale propre à votre foyer. Le net après impôt est le montant
              versé après cette retenue.
            </p>

            <aside className="home-editorial__callout home-editorial__callout--warning">
              <strong>Attention</strong>
              <p>
                Le taux de prélèvement dépend de votre situation fiscale. Il ne se déduit pas
                fidèlement du seul salaire brut ou du net avant impôt.
              </p>
            </aside>
          </div>

          <h2 id="utiliser-calculateur">Comment utiliser le calculateur ?</h2>
          <div className="home-editorial__prose">
            <p>
              Le simulateur se trouve en haut de page. Il répond à une question simple : combien
              vais-je toucher, en brut ou en net, à l&apos;horaire, au mois ou à l&apos;année ?
            </p>

            <h3>Parcours recommandé</h3>
            <ul className="editorial-list editorial-list--steps">
              <li>Saisir un montant (brut ou net, horaire, mensuel ou annuel)</li>
              <li>Choisir le statut : non-cadre, cadre ou fonction publique</li>
              <li>Ajuster le temps de travail en cas de temps partiel</li>
              <li>Indiquer le nombre de mois de rémunération (12 à 16)</li>
              <li>Laisser ou modifier le taux de prélèvement à la source</li>
              <li>Lire le net avant impôt et le net après impôt, mensuel et annuel</li>
            </ul>

            <h3>Ce que l&apos;outil permet</h3>
            <ul className="editorial-list editorial-list--checks">
              <EditorialBenefitItem>Conversion brut ↔ net</EditorialBenefitItem>
              <EditorialBenefitItem>
                Calcul salaire horaire, mensuel et annuel synchronisé
              </EditorialBenefitItem>
              <EditorialBenefitItem>Résultat immédiat à chaque modification</EditorialBenefitItem>
              <EditorialBenefitItem>Gratuit, sans création de compte</EditorialBenefitItem>
              <EditorialBenefitItem>Simulation calculée dans votre navigateur</EditorialBenefitItem>
            </ul>

            <h3>Paramètres disponibles</h3>
            <ul className="editorial-list editorial-list--neutral">
              <li>Statut : salarié non-cadre, salarié cadre, fonction publique</li>
              <li>Temps de travail (10 % à 100 %)</li>
              <li>Nombre de mois de rémunération</li>
              <li>Taux de prélèvement à la source (estimation ou saisie manuelle)</li>
            </ul>

            <h3>Salaire horaire et salaire annuel</h3>
            <p>
              Pour un salaire horaire, la base retenue est 151,67 heures par mois à temps plein.
              À titre indicatif, {formatEditorialEuro(ex15.grossHourly)} brut horaire ≈{" "}
              {formatEditorialEuro(ex15.netMonthly)} net mensuel (non-cadre).
            </p>
            <p>
              Pour le salaire annuel, {formatEditorialEuro(ex36000.grossAnnual)} brut sur 12 mois
              ≈ {formatEditorialEuro(ex36000.grossMonthly)} brut mensuels, soit environ{" "}
              {formatEditorialEuro(ex36000.netMonthly)} net avant impôt (non-cadre).
            </p>

            <aside className="home-editorial__callout home-editorial__callout--advice">
              <strong>Conseil pratique</strong>
              <p>
                Pour comparer deux offres, exprimez les deux montants dans la même unité et sur la
                même base de temps de travail.
              </p>
            </aside>
          </div>

          <h2 id="exemples-cas-pratiques">Exemples et cas pratiques</h2>
          <div className="home-editorial__prose">
            <p>
              Trois situations courantes, avec des montants indicatifs. Pour un cas personnel,
              testez vos chiffres dans le simulateur en haut de page.
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
            <h3>Tableau de conversion par niveau de salaire</h3>
            <p>
              Calcul salaire brut net pour des montants mensuels fréquents (non-cadre et cadre).
              Pour la fonction publique, choisissez le profil dédié : estimation générale, hors
              primes spécifiques.
            </p>
          </div>

          <div className="home-editorial__table-wrap home-editorial__wide">
            <table className="home-editorial__table home-editorial__table--conversion">
              <caption>Conversion salaire brut vers net : estimations mensuelles indicatives</caption>
              <thead>
                <tr>
                  <th scope="col">Salaire brut mensuel</th>
                  <th scope="col" className="home-editorial__table-num">
                    Net estimé non-cadre
                  </th>
                  <th scope="col" className="home-editorial__table-num">
                    Net estimé cadre
                  </th>
                </tr>
              </thead>
              <tbody>
                {conversionRows.map((row) => (
                  <tr key={row.grossMonthly}>
                    <td>{formatEditorialEuro(row.grossMonthly)}</td>
                    <td className="home-editorial__table-num">
                      {formatEditorialEuro(row.netNonExecutive)}
                    </td>
                    <td className="home-editorial__table-num">
                      {formatEditorialEuro(row.netExecutive)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="home-editorial__table-note home-editorial__prose">
            Estimations avant prélèvement à la source, calculées avec les coefficients actuels du
            simulateur.
          </p>

          <h2 id="prelevement-source">Comment le prélèvement à la source est-il estimé ?</h2>
          <div className="home-editorial__prose">
            <p>
              L&apos;impôt sur le revenu est prélevé à la source sur les salaires. Le taux dépend de
              votre foyer : revenus, parts fiscales, autres sources, crédits d&apos;impôt. Deux
              salariés au même brut peuvent avoir des taux différents.
            </p>
            <p>
              Le simulateur ne connaît pas votre situation fiscale réelle. Il calcule d&apos;abord une
              base imposable estimée à partir du net avant impôt, puis applique un taux indicatif
              pour afficher un net après impôt.
            </p>
            <p>
              Ce taux par défaut est une approximation : utile pour situer un ordre de grandeur,
              pas pour reproduire votre bulletin. Connaissez-vous votre taux (bulletin, espace
              impots.gouv.fr) ? Remplacez-le dans le curseur : le net après impôt devient alors
              nettement plus proche de ce que vous percevez réellement.
            </p>
            <p>
              À 0 %, vous isolez le net avant impôt et mesurez uniquement l&apos;effet des cotisations
              sociales.
            </p>
          </div>

          <h2 id="limites-utilite">Limites et utilité du calculateur</h2>
          <div className="home-editorial__prose">
            <p>
              L&apos;outil répond à des questions concrètes : combien vais-je toucher, comment comparer
              deux offres, quel brut viser en négociation, quel écart entre temps plein et temps
              partiel. Il ne remplace pas une fiche de paie.
            </p>

            <h3>Limites de l&apos;estimation</h3>
            <ul className="editorial-list editorial-list--limits">
              <li>Coefficients indicatifs, sans détail ligne par ligne des cotisations</li>
              <li>Pas de primes, heures supplémentaires ni avantages en nature</li>
              <li>Pas de cas atypiques (apprenti, plusieurs employeurs, etc.)</li>
              <li>Estimation générale pour la fonction publique, hors indemnités spécifiques</li>
              <li>Taux fiscal indicatif tant que vous n&apos;indiquez pas votre taux réel</li>
            </ul>

            <h3>Situations où l&apos;outil est utile</h3>
            <ul className="editorial-list editorial-list--checks">
              <EditorialBenefitItem>
                Comparer une offre à votre rémunération actuelle
              </EditorialBenefitItem>
              <EditorialBenefitItem>
                Préparer un entretien ou une demande d&apos;augmentation
              </EditorialBenefitItem>
              <EditorialBenefitItem>
                Obtenir un ordre de grandeur à rapprocher d&apos;un bulletin
              </EditorialBenefitItem>
              <EditorialBenefitItem>Estimer un budget à partir d&apos;un futur salaire</EditorialBenefitItem>
              <EditorialBenefitItem>Évaluer un temps partiel face au temps plein</EditorialBenefitItem>
            </ul>

            <aside className="home-editorial__callout home-editorial__callout--limit">
              <strong>Estimation, pas certitude</strong>
              <p>
                Les chiffres facilitent la comparaison et la préparation. Ils ne remplacent pas un
                document officiel ni un conseil personnalisé pour une décision importante.
              </p>
            </aside>

            <p className="home-editorial__updated">
              Contenu révisé le <time dateTime={HOME_EDITORIAL_UPDATED_AT}>{revisedDateLabel}</time>
              . Chiffres alignés sur les coefficients du simulateur au {revisedDateLabel}.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
