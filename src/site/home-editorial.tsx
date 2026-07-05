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
            et le taux sélectionné. Vous n&apos;avez rien à retenir : saisissez votre montant,
            cliquez sur Calculer, le résultat s&apos;affiche instantanément.
          </p>

          <h2>Différence entre HT, TVA et TTC</h2>
          <p>
            Le <strong>prix HT</strong> (hors taxes) est le montant facturé avant application de
            la TVA. C&apos;est la base sur laquelle repose tout calcul HT vers TTC.
          </p>
          <p>
            La <strong>TVA</strong> est la taxe collectée par l&apos;entreprise et reversée à
            l&apos;État. Son montant dépend du taux applicable. Pour en savoir plus sur la TVA
            collectée et la TVA déductible, consultez notre{" "}
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

          <h2>Les principaux taux de TVA en France</h2>
          <p>
            Le taux choisi conditionne tout calcul HT vers TTC. En France métropolitaine, les
            taux les plus utilisés sont :
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
                <td>Restauration, travaux de rénovation, transports de voyageurs…</td>
              </tr>
              <tr>
                <td>5,5&nbsp;%</td>
                <td>Alimentation de base, livres, énergie, accessibilité…</td>
              </tr>
              <tr>
                <td>2,1&nbsp;%</td>
                <td>Médicaments remboursables, presse, licences audiovisuelles…</td>
              </tr>
            </tbody>
          </table>
          <p>
            Chaque activité a son taux : se tromper fausse le calcul HT vers TTC. Le{" "}
            <Link href={GUIDE_TAUX}>guide complet sur les taux de TVA en France</Link> recense
            les cas par métier et par territoire.
          </p>

          <h2>Exemples de conversion HT vers TTC</h2>
          <p>
            Voici des conversions rapides à 20&nbsp;% (taux normal) pour visualiser un calcul HT
            vers TTC courant :
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
                <td>20&nbsp;€</td>
                <td>120&nbsp;€</td>
              </tr>
              <tr>
                <td>500&nbsp;€</td>
                <td>100&nbsp;€</td>
                <td>600&nbsp;€</td>
              </tr>
              <tr>
                <td>1&nbsp;000&nbsp;€</td>
                <td>200&nbsp;€</td>
                <td>1&nbsp;200&nbsp;€</td>
              </tr>
            </tbody>
          </table>
          <p>
            Exemple inverse — calcul TTC vers HT à 20&nbsp;% : un prix TTC de 120&nbsp;€
            correspond à 100&nbsp;€ HT (TVA : 20&nbsp;€). Utilisez le mode «&nbsp;TTC vers
            HT&nbsp;» du calculateur pour convertir un montant TTC vers HT avec un autre taux.
          </p>

          <h2>Calcul TTC vers HT : l&apos;opération inverse</h2>
          <p>
            Passer un prix TTC vers HT revient à retirer la TVA incluse dans le montant. La
            formule est <strong>HT = TTC ÷ (1 + taux)</strong>. C&apos;est indispensable quand
            vous recevez un montant toutes taxes comprises — devis client, ticket de caisse,
            facture fournisseur — et que vous devez retrouver le hors taxes.
          </p>
          <p>
            Un calculateur TTC vers HT évite les erreurs d&apos;arrondi : diviser par 1,20 à la
            main sur un montant TTC de 119,99&nbsp;€ peut sembler simple, mais la moindre
            décimale mal placée fausse votre comptabilité. Le simulateur ci-dessus gère ces
            arrondis pour vous.
          </p>

          <h2>Pourquoi utiliser un calculateur HT vers TTC ?</h2>
          <ul>
            <li>
              <strong>Gain de temps</strong> — convertir HT vers TTC ou TTC vers HT en un clic,
              sans tableur ni calculatrice.
            </li>
            <li>
              <strong>Fiabilité</strong> — la formule est appliquée correctement, quel que soit
              le taux (20&nbsp;%, 10&nbsp;%, 5,5&nbsp;% ou 2,1&nbsp;%).
            </li>
            <li>
              <strong>Gratuité</strong> — aucune inscription, aucune donnée conservée : le
              calcul TVA HT vers TTC reste privé.
            </li>
            <li>
              <strong>Polyvalence</strong> — devis, facturation, négociation commerciale ou
              simple vérification d&apos;un prix catalogue.
            </li>
          </ul>
          <p>
            Que vous cherchiez un calculateur HT vers TTC, un outil pour convertir un montant HT
            vers TTC ou un calculateur TVA fiable, cette page centralise l&apos;essentiel. Les
            sujets complexes — franchise, facturation, déclaration — sont traités dans nos guides
            détaillés.
          </p>

          <h2>Pour les entreprises et auto-entrepreneurs</h2>
          <p>
            En activité, le passage HT vers TTC intervient à chaque devis et chaque facture.
            Assurez-vous d&apos;appliquer le bon taux et de respecter les règles de facturation.
            Les auto-entrepreneurs en franchise en base ne facturent pas la TVA : le calcul HT
            vers TTC ne s&apos;applique alors pas de la même manière — renseignez-vous sur la{" "}
            <Link href={GUIDE_FRANCHISE}>franchise en base de TVA</Link> et sur la{" "}
            <Link href={GUIDE_AE}>TVA et l&apos;auto-entrepreneur</Link> avant de convertir vos
            montants.
          </p>
          <p>
            Si vous êtes assujetti à la TVA, chaque vente génère de la TVA collectée ; vos achats
            professionnels peuvent générer de la TVA déductible. Le calculateur HT vers TTC vous
            aide à chiffrer vos ventes ; la déclaration et le suivi relèvent d&apos;une
            comptabilité structurée — voir notre guide{" "}
            <Link href={GUIDE_DEDUCTIBLE}>TVA déductible et TVA collectée</Link>.
          </p>
        </div>
      </div>
    </section>
  );
}
