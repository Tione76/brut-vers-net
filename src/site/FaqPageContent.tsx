import Link from "next/link";
import { faqPageCategories, FAQ_PAGE_INTRO } from "./faq-page-data";

const CALC = "/";
const GUIDE_TAUX = "/guides/quels-sont-les-taux-de-tva-en-france";
const GUIDE_FRANCHISE = "/guides/franchise-en-base-de-tva";
const GUIDE_AE = "/guides/tva-et-auto-entrepreneur";
const GUIDE_DEDUCTIBLE = "/guides/tva-deductible-et-tva-collectee";
const GUIDE_FACTURE = "/guides/comment-faire-une-facture-conforme";

/** Réponses enrichies avec maillage interne — clé = question exacte */
const FAQ_ANSWERS: Record<string, React.ReactNode> = {
  "Comment passer d'un prix HT à un prix TTC ?": (
    <p>
      Multipliez le montant hors taxes par (1 + taux de TVA), ou ajoutez le montant de TVA au
      prix HT. Exemple à 20&nbsp;%&nbsp;: 100&nbsp;€ HT × 1,20 = 120&nbsp;€ TTC. Utilisez le{" "}
      <Link href={CALC}>calculateur HT vers TTC</Link> pour obtenir le résultat instantanément
      selon le taux applicable à votre opération.
    </p>
  ),
  "Comment calculer la TVA à partir d'un montant HT ?": (
    <p>
      Multipliez le montant HT par le taux de TVA en décimal. À 20&nbsp;%&nbsp;: TVA = HT ×
      0,20. Pour 250&nbsp;€ HT, la TVA est de 50&nbsp;€ et le TTC de 300&nbsp;€. Le{" "}
      <Link href={CALC}>calculateur HT vers TTC</Link> calcule automatiquement la TVA et le TTC
      à partir de votre montant hors taxes.
    </p>
  ),
  "Quelle est la formule pour convertir HT vers TTC ?": (
    <p>
      La formule est <strong>TTC = HT × (1 + taux de TVA)</strong>. Avec un taux de
      10&nbsp;%, un prix HT de 200&nbsp;€ devient 220&nbsp;€ TTC (200 × 1,10). Cette formule
      s&apos;applique quel que soit le taux — consultez notre{" "}
      <Link href={GUIDE_TAUX}>guide sur les taux de TVA en France</Link> pour choisir le bon.
    </p>
  ),
  "Quelle est la différence entre HT, TVA et TTC ?": (
    <p>
      Le <strong>HT</strong> (hors taxes) est le montant facturé avant taxe. La{" "}
      <strong>TVA</strong> est l&apos;impôt calculé sur ce montant. Le <strong>TTC</strong>{" "}
      (toutes taxes comprises) est le total payé par le client&nbsp;: HT + TVA. Pour approfondir
      la mécanique collectée / déductible, voir le{" "}
      <Link href={GUIDE_DEDUCTIBLE}>guide TVA déductible et TVA collectée</Link>.
    </p>
  ),
  "Que signifie prix hors taxes ?": (
    <p>
      Un prix hors taxes (HT) est un montant qui n&apos;inclut pas la TVA. C&apos;est le tarif de
      base utilisé par les professionnels assujettis pour établir devis et{" "}
      <Link href={GUIDE_FACTURE}>factures conformes</Link> avant d&apos;ajouter la taxe. Le client
      paiera ensuite le prix TTC correspondant.
    </p>
  ),
  "Que signifie prix toutes taxes comprises ?": (
    <p>
      Un prix toutes taxes comprises (TTC) inclut la TVA. C&apos;est le montant final affiché en
      magasin ou payé par le client. Pour retrouver le HT, divisez par (1 + taux de TVA) — le{" "}
      <Link href={CALC}>calculateur TTC vers HT</Link> effectue ce calcul inverse en un clic.
    </p>
  ),
  "Comment passer d'un prix TTC à un prix HT ?": (
    <p>
      Divisez le montant TTC par (1 + taux de TVA). Exemple à 20&nbsp;%&nbsp;: 120&nbsp;€ TTC ÷
      1,20 = 100&nbsp;€ HT. Sélectionnez le mode «&nbsp;TTC vers HT&nbsp;» dans le{" "}
      <Link href={CALC}>calculateur HT vers TTC</Link> pour obtenir le montant hors taxes
      automatiquement.
    </p>
  ),
  "Quelle est la formule pour retrouver le HT à partir du TTC ?": (
    <p>
      <strong>HT = TTC ÷ (1 + taux de TVA)</strong>. À 5,5&nbsp;%, un article à
      105,50&nbsp;€ TTC correspond à 100&nbsp;€ HT (105,50 ÷ 1,055). La TVA incluse est la
      différence entre TTC et HT — vérifiez vos calculs avec le{" "}
      <Link href={CALC}>simulateur HT ↔ TTC</Link>.
    </p>
  ),
  "Comment calculer une TVA à 20 % ?": (
    <p>
      TVA = montant HT × 0,20. Pour 100&nbsp;€ HT, la TVA est de 20&nbsp;€ et le TTC de
      120&nbsp;€. C&apos;est le taux normal, applicable à la majorité des biens et services. Le{" "}
      <Link href={GUIDE_TAUX}>guide des taux de TVA</Link> précise les activités concernées.
    </p>
  ),
  "Comment calculer une TVA à 10 % ?": (
    <p>
      TVA = montant HT × 0,10. Pour 100&nbsp;€ HT, la TVA est de 10&nbsp;€ et le TTC de
      110&nbsp;€. Ce taux intermédiaire concerne la restauration, certains travaux de rénovation
      et le transport de voyageurs — voir le{" "}
      <Link href={GUIDE_TAUX}>détail par activité dans notre guide</Link>.
    </p>
  ),
  "Comment calculer une TVA à 5,5 % ?": (
    <p>
      TVA = montant HT × 0,055. Pour 100&nbsp;€ HT, la TVA est de 5,50&nbsp;€ et le TTC de
      105,50&nbsp;€. Ce taux réduit s&apos;applique à l&apos;alimentation de base, aux livres et à
      l&apos;énergie. Consultez le{" "}
      <Link href={GUIDE_TAUX}>guide complet des taux de TVA en France</Link>.
    </p>
  ),
  "Comment calculer une TVA à 2,1 % ?": (
    <p>
      TVA = montant HT × 0,021. Pour 100&nbsp;€ HT, la TVA est de 2,10&nbsp;€ et le TTC de
      102,10&nbsp;€. Ce taux super-réduit concerne les médicaments remboursables, la presse et
      les licences audiovisuelles — détail dans le{" "}
      <Link href={GUIDE_TAUX}>guide des taux de TVA</Link>.
    </p>
  ),
  "Quel taux de TVA appliquer en France ?": (
    <p>
      Le taux dépend de la nature du bien ou du service&nbsp;: 20&nbsp;% (normal), 10&nbsp;%, 5,5&nbsp;%
      ou 2,1&nbsp;%. En cas de doute, consultez le{" "}
      <Link href={GUIDE_TAUX}>guide complet sur les taux de TVA en France</Link> qui détaille les
      cas par métier, produit et territoire (métropole, DOM…).
    </p>
  ),
  "Quand utiliser le taux normal de TVA à 20 % ?": (
    <p>
      Le taux de 20&nbsp;% s&apos;applique par défaut lorsqu&apos;aucun taux réduit ou intermédiaire
      n&apos;est prévu par la loi. La plupart des prestations de services et ventes de biens y sont
      soumis. Pour les exceptions, référez-vous au{" "}
      <Link href={GUIDE_TAUX}>guide des taux de TVA</Link>.
    </p>
  ),
  "Quand utiliser le taux réduit de TVA à 5,5 % ?": (
    <p>
      Le taux de 5,5&nbsp;% concerne une liste précise&nbsp;: denrées alimentaires de base, livres,
      abonnements gaz et électricité, certains travaux d&apos;efficacité énergétique… Vérifiez que
      votre activité entre dans le périmètre légal via le{" "}
      <Link href={GUIDE_TAUX}>guide des taux de TVA en France</Link>.
    </p>
  ),
  "Peut-on avoir plusieurs taux de TVA sur une même facture ?": (
    <p>
      Oui. Si une facture comporte des lignes à des taux différents (travaux à 10&nbsp;% et
      fournitures à 20&nbsp;%, par exemple), chaque ligne doit indiquer son taux, son HT et sa
      TVA. Le{" "}
      <Link href={GUIDE_FACTURE}>guide pour rédiger une facture conforme</Link> explique comment
      ventiler correctement plusieurs taux.
    </p>
  ),
  "Comment indiquer la TVA sur une facture ?": (
    <p>
      Une facture conforme mentionne le montant HT, le taux de TVA, le montant de TVA par taux et
      le total TTC. En cas de plusieurs taux, ventilez chaque part clairement. Toutes les mentions
      obligatoires sont détaillées dans le{" "}
      <Link href={GUIDE_FACTURE}>guide facture conforme</Link>, avec des exemples pratiques.
    </p>
  ),
  "Un auto-entrepreneur doit-il facturer la TVA ?": (
    <p>
      En principe, non s&apos;il bénéficie de la{" "}
      <Link href={GUIDE_FRANCHISE}>franchise en base de TVA</Link> et n&apos;a pas dépassé les
      seuils de chiffre d&apos;affaires. Il facture alors en HT sans TVA avec la mention «&nbsp;TVA
      non applicable, art. 293 B du CGI&nbsp;». Pour les règles spécifiques aux micro-entrepreneurs,
      voir le <Link href={GUIDE_AE}>guide TVA et auto-entrepreneur</Link>.
    </p>
  ),
  "Qu'est-ce que la franchise en base de TVA ?": (
    <p>
      La franchise en base permet aux petites entreprises de ne pas facturer ni collecter la TVA
      tant que leur chiffre d&apos;affaires reste sous certains plafonds (37&nbsp;500&nbsp;€ ou
      85&nbsp;000&nbsp;€ selon l&apos;activité). Pas de TVA collectée, pas de TVA déductible. Le{" "}
      <Link href={GUIDE_FRANCHISE}>guide franchise en base de TVA</Link> détaille seuils, mentions
      et conséquences du dépassement.
    </p>
  ),
  "Quelle différence entre TVA collectée et TVA déductible ?": (
    <p>
      La <strong>TVA collectée</strong> est celle facturée à vos clients sur vos ventes. La{" "}
      <strong>TVA déductible</strong> est celle payée sur vos achats professionnels et
      récupérable. La TVA due à l&apos;État correspond, en simplifié, à collectée − déductible.
      Approfondissez avec le{" "}
      <Link href={GUIDE_DEDUCTIBLE}>guide TVA déductible et TVA collectée</Link>.
    </p>
  ),
};

export function FaqPageContent() {
  return (
    <div className="faq-page">
      <p className="faq-page__intro">{FAQ_PAGE_INTRO}</p>

      {faqPageCategories.map((category) => (
        <section key={category.title} className="faq-page__category">
          <h2 className="faq-page__category-title">{category.title}</h2>
          <div className="faq-list faq-list--flush">
            {category.items.map((item) => (
              <details key={item.question} className="faq-item">
                <summary className="faq-item__summary">
                  <h3 className="faq-item__question">{item.question}</h3>
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
        </section>
      ))}

    </div>
  );
}
