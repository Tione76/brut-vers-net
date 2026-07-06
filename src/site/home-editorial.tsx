import Link from "next/link";

const GUIDE_TAUX = "/guides/quels-sont-les-taux-de-tva-en-france";
const GUIDE_FRANCHISE = "/guides/franchise-en-base-de-tva";
const GUIDE_AE = "/guides/tva-et-auto-entrepreneur";
const GUIDE_DEDUCTIBLE = "/guides/tva-deductible-et-tva-collectee";
const GUIDE_FACTURE = "/guides/comment-faire-une-facture-conforme";

/** Contenu éditorial page d'accueil — optimisé « HT vers TTC », distinct des guides détaillés */
export function HomeEditorial() {
  return (
    <section id="contenu" className="content-section">
      <div className="content-wrap">
        <div className="prose home-editorial">
          <p className="home-editorial__lead">
            Vous devez passer un devis, une facture ou un prix catalogue du hors taxes vers le
            toutes taxes comprises ? Ce calculateur HT vers TTC vous donne le montant TTC, la TVA
            et le détail du calcul en quelques secondes — sans inscription, directement dans votre
            navigateur.
          </p>

          <h2>Comment convertir un prix HT vers TTC ?</h2>
          <p>
            Convertir un montant HT vers TTC, c&apos;est ajouter la taxe sur la valeur ajoutée
            (TVA) au prix hors taxes. Concrètement : vous partez du montant HT, vous appliquez le
            taux de TVA adapté à votre produit ou service, et vous obtenez le prix TTC que paiera
            votre client.
          </p>
          <p>
            L&apos;opération inverse — passer un prix TTC vers HT — est tout aussi courante lorsque
            vous recevez un montant toutes taxes comprises et que vous devez isoler la part hors
            taxes pour votre comptabilité. Les deux sens sont disponibles dans le simulateur
            ci-dessus.
          </p>

          <h2>Comment fonctionne un calcul HT vers TTC ?</h2>
          <p>
            Un calcul HT vers TTC repose sur une seule formule. Le montant TTC correspond au
            montant HT multiplié par (1 + taux de TVA). Le montant de TVA, lui, est la différence
            entre le TTC et le HT — ou, de façon équivalente, le HT multiplié par le taux.
          </p>

          <h3>La formule du calcul HT vers TTC</h3>
          <ul>
            <li>
              <strong>TTC = HT × (1 + taux de TVA)</strong>
            </li>
            <li>
              <strong>TVA = TTC − HT</strong> (ou HT × taux de TVA)
            </li>
            <li>
              <strong>HT = TTC ÷ (1 + taux de TVA)</strong> pour un calcul TTC vers HT
            </li>
          </ul>
          <p>
            Le calculateur HT vers TTC applique automatiquement ces formules selon le sens choisi
            et le taux sélectionné. Saisissez votre montant&nbsp;: le résultat se met à jour
            instantanément.
          </p>
          <p>
            Les montants affichés font l&apos;objet d&apos;un arrondi arithmétique au centime
            d&apos;euro, conformément aux pratiques habituelles de facturation.
          </p>

          <h2>Différence entre HT, TVA et TTC</h2>
          <p>
            Le <strong>prix HT</strong> (hors taxes) est le montant facturé avant application de
            la TVA. C&apos;est la base sur laquelle repose tout calcul HT vers TTC.
          </p>
          <p>
            La <strong>TVA</strong> est la taxe collectée par l&apos;entreprise assujettie et
            reversée au Trésor public. Son montant dépend du taux applicable. Pour en savoir plus
            sur la TVA collectée et la TVA déductible, consultez notre{" "}
            <Link href={GUIDE_DEDUCTIBLE}>guide TVA déductible et TVA collectée</Link>.
          </p>
          <p>
            Le <strong>prix TTC</strong> (toutes taxes comprises) est le montant final payé par
            l&apos;acheteur. C&apos;est le résultat d&apos;un passage HT vers TTC réussi.
          </p>

          <aside className="prose-callout prose-callout--advice">
            <strong>Bon à savoir</strong>
            <p>
              Sur une facture conforme, le montant HT, le taux de TVA, le montant de TVA et le
              total TTC doivent apparaître clairement. Notre{" "}
              <Link href={GUIDE_FACTURE}>guide pour rédiger une facture conforme</Link> détaille
              ces mentions obligatoires.
            </p>
          </aside>

          <h2>Les principaux taux de TVA en France métropolitaine</h2>
          <p>
            Le taux choisi conditionne tout calcul HT vers TTC. En France métropolitaine, les
            taux les plus utilisés sont&nbsp;:
          </p>
          <table>
            <thead>
              <tr>
                <th>Taux</th>
                <th>Usage principal</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>20&nbsp;%</td>
                <td>Taux normal — majorité des biens et services</td>
              </tr>
              <tr>
                <td>10&nbsp;%</td>
                <td>Restauration sur place, certains travaux de rénovation, transports de voyageurs…</td>
              </tr>
              <tr>
                <td>5,5&nbsp;%</td>
                <td>Alimentation de base, livres, énergie, accessibilité…</td>
              </tr>
              <tr>
                <td>2,1&nbsp;%</td>
                <td>Médicaments remboursables par la Sécurité sociale, presse, licences audiovisuelles…</td>
              </tr>
            </tbody>
          </table>
          <p>
            La Corse et certains territoires d&apos;outre-mer (DOM) disposent de régimes et de
            taux spécifiques. Pour les identifier selon votre territoire et votre activité,
            consultez le{" "}
            <Link href={GUIDE_TAUX}>guide sur les taux de TVA en France</Link>.
          </p>

          <h2>Exemples de conversion HT vers TTC</h2>
          <p>
            Voici des conversions à 20&nbsp;% (taux normal en France métropolitaine) pour
            visualiser un calcul HT vers TTC courant&nbsp;:
          </p>
          <table>
            <thead>
              <tr>
                <th>Montant HT</th>
                <th>TVA (20&nbsp;%)</th>
                <th>Montant TTC</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>100&nbsp;€</td>
                <td>20,00&nbsp;€</td>
                <td>120,00&nbsp;€</td>
              </tr>
              <tr>
                <td>500&nbsp;€</td>
                <td>100,00&nbsp;€</td>
                <td>600,00&nbsp;€</td>
              </tr>
              <tr>
                <td>1&nbsp;000&nbsp;€</td>
                <td>200,00&nbsp;€</td>
                <td>1&nbsp;200,00&nbsp;€</td>
              </tr>
            </tbody>
          </table>
          <p>
            Exemple inverse — calcul TTC vers HT à 20&nbsp;%&nbsp;: un prix TTC de 120,00&nbsp;€
            correspond à 100,00&nbsp;€ HT (TVA&nbsp;: 20,00&nbsp;€). Utilisez le mode
            «&nbsp;TTC vers HT&nbsp;» du calculateur pour convertir un montant avec un autre
            taux.
          </p>

          <h2>Calcul TTC vers HT : l&apos;opération inverse</h2>
          <p>
            Passer un prix TTC vers HT revient à retirer la TVA incluse dans le montant. La
            formule est <strong>HT = TTC ÷ (1 + taux)</strong>. C&apos;est indispensable quand
            vous recevez un montant toutes taxes comprises — devis client, ticket de caisse,
            facture fournisseur — et que vous devez retrouver le hors taxes.
          </p>
          <p>
            Le calcul manuel sur des montants comme 119,99&nbsp;€ TTC expose à des erreurs
            d&apos;arrondi au centime. Le simulateur ci-dessus applique la formule et l&apos;arrondi
            de façon cohérente pour vous.
          </p>

          <h2>Pourquoi utiliser un calculateur HT vers TTC ?</h2>
          <ul>
            <li>
              <strong>Gain de temps</strong> — conversion immédiate, sans tableur ni calculatrice.
            </li>
            <li>
              <strong>Fiabilité</strong> — la formule est appliquée correctement, quel que soit
              le taux (20&nbsp;%, 10&nbsp;%, 5,5&nbsp;% ou 2,1&nbsp;%).
            </li>
            <li>
              <strong>Gratuité</strong> — aucune inscription, aucune donnée conservée&nbsp;: vos
              calculs restent privés.
            </li>
            <li>
              <strong>Polyvalence</strong> — devis, facturation, négociation commerciale ou
              simple vérification d&apos;un prix catalogue.
            </li>
          </ul>
          <p>
            Cette page réunit l&apos;outil de conversion et les repères essentiels. Pour la
            franchise, la facturation ou les déclarations, nos guides détaillés approfondissent
            chaque sujet.
          </p>

          <h2>Entreprises assujetties et franchise en base de TVA</h2>
          <p>
            Le calcul HT vers TTC concerne les professionnels <strong>assujettis à la TVA</strong>{" "}
            qui facturent la taxe sur leurs ventes. À l&apos;inverse, la{" "}
            <strong>franchise en base de TVA</strong> (article&nbsp;293&nbsp;B du CGI) permet à
            certaines entreprises — tant que leur chiffre d&apos;affaires reste sous les seuils
            légaux — de ne pas facturer la TVA sur leurs prestations. Ce régime concerne de
            nombreux micro-entrepreneurs, mais aussi d&apos;autres entreprises individuelles ou
            sociétés qui remplissent les conditions. Dans ce cas, vos tarifs sont en principe
            exprimés sans TVA distincte à ajouter. Consultez notre{" "}
            <Link href={GUIDE_FRANCHISE}>guide franchise en base de TVA</Link> pour connaître les
            seuils et les obligations.
          </p>
          <p>
            Si vous exercez en micro-entreprise, le guide{" "}
            <Link href={GUIDE_AE}>TVA et auto-entrepreneur</Link> précise les règles selon votre
            activité.
          </p>
          <p>
            Lorsque vous êtes assujetti, chaque vente génère de la TVA collectée&nbsp;; vos achats
            professionnels peuvent donner lieu à de la TVA déductible. Le calculateur HT vers TTC
            vous aide à chiffrer vos prix de vente&nbsp;; la déclaration et le suivi relèvent
            d&apos;une comptabilité structurée — voir notre guide{" "}
            <Link href={GUIDE_DEDUCTIBLE}>TVA déductible et TVA collectée</Link>.
          </p>

          <p className="home-editorial__updated">
            <time dateTime="2026-07-01">Dernière mise à jour : juillet 2026</time>
          </p>
        </div>
      </div>
    </section>
  );
}
