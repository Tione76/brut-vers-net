import Link from "next/link";
import { marginCalculatorFaq } from "./margin-calculator-faq-data";

const CALC_HT_TTC = "/";
const GUIDE_TAUX = "/guides/quels-sont-les-taux-de-tva-en-france";
const GUIDE_FRANCHISE = "/guides/franchise-en-base-de-tva";
const GUIDE_AE = "/guides/tva-et-auto-entrepreneur";
const GUIDE_DEDUCTIBLE = "/guides/tva-deductible-et-tva-collectee";
const GUIDE_FACTURE = "/guides/comment-faire-une-facture-conforme";

/** Réponses FAQ enrichies — clé = question exacte */
const FAQ_ANSWERS: Record<string, React.ReactNode> = {
  "Comment calculer une marge de 30 % ?": (
    <p>
      Multipliez votre prix d&apos;achat HT par <strong>1,30</strong>. Exemple : 80&nbsp;€ HT
      d&apos;achat × 1,30 = 104&nbsp;€ HT de vente, soit 24&nbsp;€ de marge. Saisissez ces
      valeurs dans le calculateur de marge HT / TTC ci-dessus pour obtenir la TVA et le prix TTC
      automatiquement.
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
  "Comment calculer son prix de vente ?": (
    <p>
      Le calcul prix de vente suit deux étapes : d&apos;abord le HT (achat + marge), puis le TTC
      (HT + TVA). Formule : <strong>prix de vente HT = prix d&apos;achat HT × (1 + marge&nbsp;%)</strong>,
      puis ajoutez la TVA. Pour la partie TVA seule, le{" "}
      <Link href={CALC_HT_TTC}>calculateur HT vers TTC</Link> complète utilement cet outil.
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
      Une fois calculé (ex.&nbsp;: 1,40 pour 40&nbsp;% de marge), multipliez chaque prix
      d&apos;achat par ce coefficient pour tarifer votre catalogue en quelques secondes. Le
      calculateur de marge HT / TTC l&apos;affiche automatiquement dans le bloc Indicateurs.
    </p>
  ),
};

/** Contenu éditorial — calculateur de marge HT / TTC (référence SEO) */
export function MarginCalculatorEditorial() {
  return (
    <section id="contenu" className="content-section">
      <div className="content-wrap">
        <div className="prose home-editorial">
          <p className="home-editorial__lead">
            Fixer le bon prix de vente, c&apos;est la différence entre une activité rentable et une
            activité qui travaille à perte. Ce calculateur de marge HT / TTC vous permet de
            passer du prix d&apos;achat au prix TTC en quelques secondes : marge commerciale,
            taux de marge, taux de marque, TVA et coefficient multiplicateur — le tout sans
            tableur ni formule à retenir.
          </p>
          <p>
            Que vous soyez commerçant, artisan, restaurateur, e-commerçant ou indépendant, le{" "}
            <strong>calcul marge</strong> est une opération quotidienne : devis, tarifs catalogue,
            négociation fournisseur, contrôle de rentabilité. Un calcul marge HT mal maîtrisé peut
            effacer votre résultat en quelques semaines, surtout lorsque la TVA et les charges
            fixes s&apos;ajoutent à une marge trop faible.
          </p>
          <p>
            Cette page complète l&apos;outil ci-dessus : elle explique le calcul prix de vente HT,
            le passage au prix TTC et les indicateurs clés, sans remplacer nos guides détaillés sur
            la TVA et la facturation.
          </p>

          <h2>Comment calculer une marge HT ?</h2>
          <p>
            Le calcul marge HT repose sur une logique simple : vous partez de ce que vous payez
            votre fournisseur, vous ajoutez la marge que vous souhaitez réaliser, et vous obtenez
            votre prix de vente hors taxes.
          </p>
          <ul>
            <li>
              <strong>Prix d&apos;achat HT + marge = prix de vente HT</strong>
            </li>
            <li>
              En pourcentage : <strong>prix de vente HT = prix d&apos;achat HT × (1 + marge&nbsp;%)</strong>
            </li>
          </ul>
          <p>
            <strong>Exemple — calcul marge commerciale à 40&nbsp;% :</strong> vous achetez un
            produit 100&nbsp;€ HT. Avec 40&nbsp;% de marge, le prix de vente HT est de
            140&nbsp;€ (100 × 1,40). La marge brute est de 40&nbsp;€. C&apos;est la base de tout{" "}
            <strong>calcul prix de vente</strong> en commerce et en artisanat.
          </p>

          <aside className="prose-callout prose-callout--warning">
            <strong>Attention à la rentabilité</strong>
            <p>
              Une marge qui semble confortable sur un seul produit peut être insuffisante au
              global si vos charges (loyer, personnel, marketing) sont élevées. Calculez régulièrement
              vos taux de marge et de marque pour chaque famille de produits.
            </p>
          </aside>

          <h2>Comment calculer un prix de vente TTC ?</h2>
          <p>
            Une fois le prix de vente HT déterminé, la TVA s&apos;ajoute pour obtenir le montant
            payé par le client. Le <strong>calcul prix de vente TTC</strong> suit cette formule :
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
            <strong>Exemple :</strong> un prix de vente HT de 140&nbsp;€ avec une TVA à
            20&nbsp;% donne 28&nbsp;€ de TVA et un <strong>prix TTC</strong> de 168&nbsp;€.
            Pour convertir un montant HT vers TTC ou l&apos;inverse, notre{" "}
            <Link href={CALC_HT_TTC}>calculateur HT vers TTC</Link> complète ce calculateur de
            marge en isolant la partie TVA.
          </p>
          <p>
            Le taux de TVA dépend de votre activité. Avant de tarifer, vérifiez le taux applicable
            dans le <Link href={GUIDE_TAUX}>guide Les taux de TVA en France</Link>. Si vous êtes en{" "}
            <Link href={GUIDE_FRANCHISE}>franchise en base de TVA</Link>, vous ne facturez pas la
            TVA : le calcul prix de vente TTC ne s&apos;applique alors pas de la même manière.
          </p>

          <h2>Différence entre taux de marge et taux de marque</h2>
          <p>
            Le <strong>calcul taux de marge</strong> et le <strong>calcul taux de marque</strong>{" "}
            mesurent tous deux la rentabilité d&apos;un produit, mais sur des bases différentes.
            Cette confusion est l&apos;une des plus fréquentes en gestion commerciale.
          </p>

          <h3>Le taux de marge</h3>
          <p>
            <strong>Taux de marge = marge ÷ prix d&apos;achat HT × 100</strong>. Il indique
            combien vous gagnez par rapport à ce que vous avez payé. Avec une marge de 40&nbsp;€
            sur un achat à 100&nbsp;€ HT, le taux de marge est de 40&nbsp;%. Les acheteurs et
            responsables approvisionnement l&apos;utilisent souvent pour négocier avec les
            fournisseurs.
          </p>

          <h3>Le taux de marque</h3>
          <p>
            <strong>Taux de marque = marge ÷ prix de vente HT × 100</strong>. Il exprime la part
            de marge dans le prix final. Avec la même marge de 40&nbsp;€ et un prix de vente à
            140&nbsp;€ HT, le taux de marque est de 28,57&nbsp;%. Les commerçants et les
            e-commerçants le préfèrent souvent pour comparer des produits entre eux.
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
            Retenez l&apos;essentiel : un taux de marge de 50&nbsp;% correspond à un taux de marque
            de 33,33&nbsp;%. Les deux indicateurs sont affichés en temps réel dans le calculateur
            ci-dessus.
          </p>

          <h2>Qu&apos;est-ce que le coefficient multiplicateur ?</h2>
          <p>
            Le <strong>coefficient multiplicateur</strong> est le rapport entre le prix de vente HT
            et le prix d&apos;achat HT. Il résume en un seul chiffre la marge appliquée à un
            produit.
          </p>
          <ul>
            <li>
              <strong>Coefficient = prix de vente HT ÷ prix d&apos;achat HT</strong>
            </li>
            <li>
              Avec 40&nbsp;% de marge sur l&apos;achat, le coefficient est <strong>1,40</strong>
            </li>
            <li>
              Avec 100&nbsp;% de marge (le prix de vente double l&apos;achat), le coefficient est{" "}
              <strong>2,00</strong>
            </li>
          </ul>
          <p>
            Les commerçants l&apos;utilisent pour tarifer rapidement un catalogue : il suffit de
            multiplier chaque prix d&apos;achat par le coefficient pour obtenir le prix de vente
            HT. Le calculateur de marge HT / TTC le calcule automatiquement dans le bloc
            Indicateurs.
          </p>
          <p>
            <strong>Exemples :</strong> achat 25&nbsp;€ HT, coefficient 1,60 → vente 40&nbsp;€ HT.
            Achat 12&nbsp;€ HT, coefficient 2,50 → vente 30&nbsp;€ HT. Ajoutez ensuite la TVA pour
            le calcul TVA prix de vente et obtenir le TTC affiché en magasin.
          </p>

          <h2>Pourquoi utiliser un calculateur de marge ?</h2>
          <ul>
            <li>
              <strong>Éviter les erreurs</strong> — un calcul marge HT ou un calcul taux de marque
              fait à la main se trompe facilement, surtout avec plusieurs taux de TVA.
            </li>
            <li>
              <strong>Fixer un prix cohérent</strong> — visualisez en un coup d&apos;œil la marge,
              le taux de marque et le prix TTC avant de publier un tarif.
            </li>
            <li>
              <strong>Gagner du temps</strong> — plus besoin de jongler entre tableur, calculatrice
              et fiches TVA.
            </li>
            <li>
              <strong>Calculer la TVA automatiquement</strong> — le calcul TVA prix de vente est
              intégré : choisissez 20&nbsp;%, 10&nbsp;%, 5,5&nbsp;%, 2,1&nbsp;% ou un taux
              personnalisé.
            </li>
            <li>
              <strong>Résultats immédiats</strong> — chaque modification met à jour marge, HT, TVA
              et TTC sans rechargement.
            </li>
          </ul>
          <p>
            Pour la partie purement TVA (sans marge), le{" "}
            <Link href={CALC_HT_TTC}>calculateur HT vers TTC</Link> reste l&apos;outil adapté. Pour
            la déclaration et le suivi de la taxe, consultez le guide{" "}
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
          <p>
            Les réponses ci-dessous couvrent les questions les plus courantes sur le calcul marge
            HT, le calcul prix de vente et le calcul TVA prix de vente.
          </p>
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
        </div>
      </div>
    </section>
  );
}
