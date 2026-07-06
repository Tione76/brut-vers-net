import type { ReactNode } from "react";
import Link from "next/link";
import { MarginPricingFlowIllustration } from "./illustrations/MarginPricingFlowIllustration";
import { marginCalculatorFaq } from "./margin-calculator-faq-data";

const CALC_HT_TTC = "/";
const GUIDE_TAUX = "/guides/quels-sont-les-taux-de-tva-en-france";
const GUIDE_FRANCHISE = "/guides/franchise-en-base-de-tva";
const GUIDE_AE = "/guides/tva-et-auto-entrepreneur";
const GUIDE_DEDUCTIBLE = "/guides/tva-deductible-et-tva-collectee";
const GUIDE_FACTURE = "/guides/comment-faire-une-facture-conforme";

/** Réponses FAQ enrichies — clé = question exacte */
const FAQ_ANSWERS: Record<string, ReactNode> = {
  "Comment fixer son prix de vente ?": (
    <p>
      Commencez par le <strong>coût d&apos;achat HT</strong> (fournisseur et frais
      d&apos;approvisionnement), appliquez le <strong>taux de marge</strong> visé pour obtenir le
      prix de vente HT, puis ajoutez la TVA. Contrôlez que le prix TTC final reste cohérent avec
      votre marché et couvre vos charges fixes — loyer, salaires, marketing.
    </p>
  ),
  "Comment calculer une marge de 30 % ?": (
    <p>
      Multipliez votre prix d&apos;achat HT par <strong>1,30</strong>. Exemple : 100&nbsp;€ HT
      d&apos;achat × 1,30 = 130&nbsp;€ HT de vente, soit 30&nbsp;€ de marge. Saisissez ces valeurs
      dans le calculateur ci-dessus pour obtenir la TVA et le prix TTC automatiquement.
    </p>
  ),
  "Quelle différence entre bénéfice et marge ?": (
    <p>
      La <strong>marge commerciale</strong> ne concerne qu&apos;un produit ou une prestation :
      prix de vente HT moins prix d&apos;achat HT. Le <strong>bénéfice</strong> est le résultat
      global de l&apos;entreprise après toutes les charges (loyer, salaires, impôts…). Une marge
      de 40&nbsp;% sur un article peut coexister avec une activité déficitaire si les frais fixes
      sont trop élevés.
    </p>
  ),
  "Quel prix de vente choisir ?": (
    <p>
      Votre <strong>prix de vente</strong> doit couvrir le coût d&apos;achat, dégager une marge
      suffisante et rester acceptable pour vos clients. Comparez votre taux de marque à celui de
      votre secteur, vérifiez le taux de TVA applicable dans le{" "}
      <Link href={GUIDE_TAUX}>guide sur les taux de TVA</Link>, puis testez plusieurs scénarios
      dans le calculateur avant de publier un tarif.
    </p>
  ),
  "Comment calculer son prix de vente ?": (
    <p>
      Le <strong>calcul prix de vente</strong> suit deux étapes : d&apos;abord le HT (achat +
      marge), puis le TTC (HT + TVA). Formule :{" "}
      <strong>prix de vente HT = prix d&apos;achat HT × (1 + taux de marge&nbsp;%)</strong>. Pour
      la partie TVA seule, le <Link href={CALC_HT_TTC}>calculateur HT vers TTC</Link> complète cet
      outil.
    </p>
  ),
  "Quel taux de marge viser ?": (
    <p>
      Le taux dépend de votre métier et de vos charges. En grande distribution, les marges sont
      faibles ; en artisanat ou e-commerce de niche, elles peuvent être plus élevées. Comparez
      votre taux de marque à celui de votre secteur et vérifiez que le prix TTC final reste
      compétitif. Les{" "}
      <Link href={GUIDE_AE}>règles TVA pour auto-entrepreneurs</Link> influencent aussi le prix
      affiché au client.
    </p>
  ),
  "Comment ajouter la TVA à un prix de vente ?": (
    <p>
      TVA = prix de vente HT × taux de TVA, puis TTC = HT + TVA. À 20&nbsp;%&nbsp;: 150&nbsp;€ HT
      + 30&nbsp;€ = 180&nbsp;€ TTC. Le taux applicable dépend de votre activité — consultez le{" "}
      <Link href={GUIDE_TAUX}>guide sur les taux de TVA en France</Link> avant de fixer vos
      tarifs.
    </p>
  ),
  "Comment retrouver le prix TTC ?": (
    <p>
      Additionnez le prix de vente HT et la TVA. Si vous partez d&apos;un montant TTC connu et
      souhaitez isoler le HT, utilisez le mode inverse du{" "}
      <Link href={CALC_HT_TTC}>calculateur HT vers TTC</Link> (TTC vers HT).
    </p>
  ),
  "Qu'est-ce que la marge commerciale ?": (
    <p>
      C&apos;est l&apos;écart entre ce que vous vendez (HT) et ce que vous achetez (HT). Le{" "}
      <strong>calcul marge commerciale</strong> est le point de départ de tout calcul prix de
      vente. Sur une <Link href={GUIDE_FACTURE}>facture conforme</Link>, le client voit le TTC ;
      la marge, elle, se calcule toujours sur les montants hors taxes.
    </p>
  ),
  "Comment utiliser le coefficient multiplicateur ?": (
    <p>
      Le calculateur affiche le <strong>coefficient multiplicateur HT</strong> (ex.&nbsp;: 1,40
      pour 40&nbsp;% de taux de marge). Multipliez chaque prix d&apos;achat HT par ce coefficient
      pour tarifer votre catalogue. Certains secteurs utilisent un coefficient TTC — ne le
      confondez pas avec le coefficient HT affiché ici.
    </p>
  ),
};

/** Contenu éditorial — calculateur de marge HT / TTC */
export function MarginCalculatorEditorial() {
  return (
    <section id="contenu" className="content-section">
      <div className="content-wrap">
        <div className="prose home-editorial">
          <p className="home-editorial__lead">
            Fixer le bon prix de vente, c&apos;est la différence entre une activité rentable et une
            activité qui travaille à perte. Ce <strong>calculateur prix de vente</strong> part de
            votre coût d&apos;achat HT pour déterminer le prix de revente, la marge commerciale,
            la TVA et le prix TTC — sans tableur ni formule à retenir.
          </p>
          <p>
            Commerçant, artisan, restaurateur, photographe ou e-commerçant : le{" "}
            <strong>calcul prix de vente HT</strong> est une opération quotidienne (devis, catalogue,
            négociation fournisseur). Un taux de marge mal calibré peut effacer votre résultat en
            quelques semaines, surtout lorsque la TVA et les charges fixes s&apos;ajoutent à une
            marge trop faible.
          </p>

          <figure className="guide-illustration">
            <MarginPricingFlowIllustration />
            <figcaption>
              Du prix d&apos;achat HT au prix TTC : taux de marge sur l&apos;achat, puis TVA.
            </figcaption>
          </figure>

          <h2>Comment calculer une marge HT ?</h2>
          <p>
            Le <strong>calcul marge commerciale</strong> repose sur une logique simple : vous
            partez de ce que vous payez, vous ajoutez le taux de marge souhaité, et vous obtenez
            votre prix de vente hors taxes.
          </p>
          <ul>
            <li>
              <strong>Prix d&apos;achat HT + marge = prix de vente HT</strong>
            </li>
            <li>
              En pourcentage :{" "}
              <strong>prix de vente HT = prix d&apos;achat HT × (1 + taux de marge&nbsp;%)</strong>
            </li>
          </ul>
          <p>
            Le <strong>taux de marge</strong> saisi dans le calculateur est calculé sur le prix
            d&apos;achat HT — ce n&apos;est pas le taux de marque, qui se rapporte au prix de
            vente.
          </p>
          <p>
            Pour un <strong>calcul prix de vente</strong> représentatif, intégrez dans le coût
            d&apos;achat HT les frais directement liés à l&apos;acquisition : transport, douane,
            assurance, frais d&apos;approvisionnement… Sans ces éléments, le taux de marge affiché
            peut surestimer votre rentabilité réelle.
          </p>
          <p>
            <strong>Exemple — taux de marge de 40&nbsp;% :</strong> achat 100&nbsp;€ HT, taux de
            marge 40&nbsp;% → vente 140&nbsp;€ HT (100 × 1,40). Marge brute : 40&nbsp;€.
          </p>

          <h2>Comment calculer un prix de vente TTC ?</h2>
          <p>
            Une fois le <strong>prix de vente HT</strong> déterminé, la TVA s&apos;ajoute pour
            obtenir le montant payé par le client :
          </p>
          <ul>
            <li>
              <strong>Prix HT + TVA = prix TTC</strong>
            </li>
            <li>
              <strong>TVA = prix de vente HT × taux de TVA</strong>
            </li>
          </ul>
          <p>
            <strong>Exemple :</strong> prix de vente HT 140&nbsp;€, TVA 20&nbsp;% → 28&nbsp;€ de
            TVA, soit 168&nbsp;€ TTC. Pour convertir HT vers TTC ou l&apos;inverse, le{" "}
            <Link href={CALC_HT_TTC}>calculateur HT vers TTC</Link> isole la partie TVA.
          </p>
          <p>
            Le taux dépend de votre activité — consultez le{" "}
            <Link href={GUIDE_TAUX}>guide sur les taux de TVA en France</Link>. En{" "}
            <Link href={GUIDE_FRANCHISE}>franchise en base de TVA</Link>, vous ne facturez pas la
            TVA : le passage au TTC ne s&apos;applique alors pas de la même manière.
          </p>

          <h2>Différence entre taux de marge et taux de marque</h2>
          <p>
            Ces deux indicateurs mesurent la rentabilité d&apos;un produit, mais sur des bases
            différentes — c&apos;est l&apos;une des confusions les plus fréquentes en gestion
            commerciale.
          </p>

          <h3>Le taux de marge</h3>
          <p>
            <strong>Taux de marge = marge ÷ prix d&apos;achat HT × 100</strong>. Il indique ce que
            vous gagnez par rapport à ce que vous avez payé. Marge de 40&nbsp;€ sur un achat à
            100&nbsp;€ HT → taux de marge de 40&nbsp;%.
          </p>

          <h3>Le taux de marque</h3>
          <p>
            <strong>Taux de marque = marge ÷ prix de vente HT × 100</strong>. Il exprime la part
            de marge dans le prix final. Même marge de 40&nbsp;€, vente à 140&nbsp;€ HT → taux de
            marque de 28,57&nbsp;%.
          </p>

          <table>
            <thead>
              <tr>
                <th>Indicateur</th>
                <th>Formule</th>
                <th>Exemple (achat 100&nbsp;€, vente 140&nbsp;€)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Taux de marge</td>
                <td>Marge ÷ achat HT × 100</td>
                <td>40&nbsp;%</td>
              </tr>
              <tr>
                <td>Taux de marque</td>
                <td>Marge ÷ vente HT × 100</td>
                <td>28,57&nbsp;%</td>
              </tr>
            </tbody>
          </table>
          <p>
            Un taux de marge de 50&nbsp;% correspond à un taux de marque de 33,33&nbsp;%. Les deux
            indicateurs sont affichés en temps réel dans le calculateur.
          </p>

          <h2>Qu&apos;est-ce que le coefficient multiplicateur HT ?</h2>
          <p>
            Le <strong>coefficient multiplicateur HT</strong> est le rapport entre le prix de vente
            HT et le prix d&apos;achat HT. Avec un taux de marge de 40&nbsp;% sur l&apos;achat, le
            coefficient HT est <strong>1,40</strong> ; avec 100&nbsp;% de marge, il est{" "}
            <strong>2,00</strong>.
          </p>
          <p>
            Il permet de tarifer rapidement un catalogue : multipliez chaque prix d&apos;achat HT
            par le coefficient pour obtenir le prix de vente HT. Le calculateur l&apos;affiche dans
            le bloc Indicateurs.
          </p>
          <p>
            <strong>Coefficient HT et coefficient TTC :</strong> ce calculateur affiche le
            coefficient HT (vente HT ÷ achat HT). Dans certains secteurs — notamment la grande
            distribution — on utilise plutôt un <strong>coefficient TTC</strong> (vente TTC ÷ achat
            HT). Les deux logiques coexistent ; ne les confondez pas lorsque vous comparez vos
            tarifs à ceux de votre métier.
          </p>

          <h2>Exemples par métier</h2>
          <p>
            Voici des scénarios simplifiés pour visualiser un <strong>calcul prix de revente</strong>{" "}
            selon votre activité. Les taux de marge et de TVA sont donnés à titre indicatif.
          </p>

          <h3>Commerçant (boutique)</h3>
          <p>
            Achat fournisseur 50&nbsp;€ HT, taux de marge 60&nbsp;% → vente 80&nbsp;€ HT. TVA
            20&nbsp;% : 16&nbsp;€ → <strong>96&nbsp;€ TTC</strong> en rayon.
          </p>

          <h3>Artisan (matériaux)</h3>
          <p>
            Matériaux 200&nbsp;€ HT, taux de marge 50&nbsp;% → vente 300&nbsp;€ HT. TVA 10&nbsp;%
            (certains travaux) : 30&nbsp;€ → <strong>330&nbsp;€ TTC</strong> facturés au client.
          </p>

          <h3>Photographe (tirages)</h3>
          <p>
            Coût tirages 80&nbsp;€ HT, taux de marge 150&nbsp;% → vente 200&nbsp;€ HT. TVA
            20&nbsp;% : 40&nbsp;€ → <strong>240&nbsp;€ TTC</strong> pour le client final.
          </p>

          <h3>Restaurateur (ingrédients)</h3>
          <p>
            Coût matière 4&nbsp;€ HT, taux de marge 250&nbsp;% → vente 14&nbsp;€ HT. TVA 10&nbsp;%
            (restauration sur place) : 1,40&nbsp;€ → <strong>15,40&nbsp;€ TTC</strong> à l&apos;assiette.
          </p>

          <h3>E-commerce</h3>
          <p>
            Achat grossiste 15&nbsp;€ HT, taux de marge 80&nbsp;% → vente 27&nbsp;€ HT. TVA
            20&nbsp;% : 5,40&nbsp;€ → <strong>32,40&nbsp;€ TTC</strong> affiché sur la boutique en
            ligne.
          </p>

          <aside className="prose-callout prose-callout--advice">
            <strong>À retenir</strong>
            <ul>
              <li>
                <strong>Prix de vente HT = achat HT × (1 + taux de marge&nbsp;%)</strong>
              </li>
              <li>
                Le taux de marge se calcule sur l&apos;achat ; le taux de marque, sur la vente.
              </li>
              <li>
                Le coefficient affiché est un <strong>coefficient HT</strong> (vente HT ÷ achat
                HT).
              </li>
              <li>
                La marge d&apos;un produit ne reflète pas le bénéfice global de l&apos;entreprise.
              </li>
            </ul>
          </aside>

          <aside className="prose-callout prose-callout--warning">
            <strong>Erreurs fréquentes</strong>
            <ul>
              <li>
                Confondre <strong>taux de marge</strong> et <strong>taux de marque</strong> (40&nbsp;%
                de marge ≠ 40&nbsp;% de marque).
              </li>
              <li>
                Oublier transport, douane ou frais d&apos;approvisionnement dans le coût
                d&apos;achat HT.
              </li>
              <li>
                Appliquer un coefficient TTC du secteur comme s&apos;il s&apos;agissait d&apos;un
                coefficient HT.
              </li>
              <li>
                Négliger les charges fixes (loyer, salaires) lors du choix du prix de vente.
              </li>
              <li>
                Utiliser un taux de TVA inadapté à l&apos;activité ou au produit vendu.
              </li>
            </ul>
          </aside>

          <h2>Pourquoi utiliser ce calculateur de marge ?</h2>
          <ul>
            <li>
              <strong>Fiabilité</strong> — formules appliquées correctement, montants arrondis au
              centime.
            </li>
            <li>
              <strong>Vision complète</strong> — marge, taux de marge, taux de marque, coefficient
              HT et prix TTC en un seul écran.
            </li>
            <li>
              <strong>Rapidité</strong> — chaque modification met à jour les résultats
              instantanément.
            </li>
            <li>
              <strong>TVA intégrée</strong> — 20&nbsp;%, 10&nbsp;%, 5,5&nbsp;%, 2,1&nbsp;% ou
              taux personnalisé.
            </li>
            <li>
              <strong>Gratuité</strong> — sans inscription, calculs effectués dans votre
              navigateur.
            </li>
          </ul>
          <p>
            Pour la partie purement TVA (sans marge), le{" "}
            <Link href={CALC_HT_TTC}>calculateur HT vers TTC</Link> reste l&apos;outil adapté. Pour
            la déclaration et le suivi, consultez le guide{" "}
            <Link href={GUIDE_DEDUCTIBLE}>TVA déductible et TVA collectée</Link> et, si vous
            débutez, le guide <Link href={GUIDE_AE}>TVA et auto-entrepreneur</Link>.
          </p>

          <aside className="prose-callout prose-callout--advice">
            <strong>Bon à savoir</strong>
            <p>
              Sur vos factures, le prix HT, le taux de TVA, le montant de TVA et le total TTC
              doivent figurer clairement. Notre{" "}
              <Link href={GUIDE_FACTURE}>guide pour rédiger une facture conforme</Link> détaille
              ces mentions obligatoires.
            </p>
          </aside>

          <h2 id="faq-marge">Questions fréquentes sur le calcul de marge</h2>
          <div className="faq-list faq-list--flush">
            {marginCalculatorFaq.map((item) => (
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

          <p className="home-editorial__updated">
            <time dateTime="2026-07-01">Dernière mise à jour : juillet 2026</time>
          </p>
        </div>
      </div>
    </section>
  );
}
