import Link from "next/link";

/** Introduction éditoriale du hub /nos-outils */
export function ToolsHubEditorial() {
  return (
    <div className="tools-hub-editorial">
      <section className="tools-hub-section tools-hub-section--intro" aria-label="Présentation des outils">
        <p>
          Tous nos simulateurs sont gratuits et accessibles sans création de compte. Vous pouvez
          lancer un calcul en quelques secondes, depuis un ordinateur ou un téléphone.
        </p>
        <p>
          Ils s&apos;adressent aux salariés, aux demandeurs d&apos;emploi et aux employeurs qui
          souhaitent mieux comprendre une rémunération, préparer une offre ou vérifier un ordre de
          grandeur avant une discussion. Pour{" "}
          <Link href="/">calculer votre salaire brut en net</Link>, commencez par notre outil
          principal.
        </p>
        <p>
          Les estimations s&apos;appuient sur les règles françaises actuelles. Elles restent
          indicatives : votre fiche de paie, votre convention collective ou votre situation
          personnelle peuvent produire un résultat différent.
        </p>
        <p>
          Pour aller plus loin, consultez nos guides afin de{" "}
          <Link href="/guides/comment-lire-une-fiche-de-paie">comprendre une fiche de paie</Link>,{" "}
          <Link href="/guides/cotisations-salariales-pourquoi-brut-plus-eleve-que-net">
            mieux comprendre les cotisations salariales
          </Link>{" "}
          ou{" "}
          <Link href="/guides/prelevement-a-la-source-quest-ce-que-cest-et-comment-ca-fonctionne">
            anticiper le prélèvement à la source
          </Link>
          . De nouveaux outils seront ajoutés progressivement ; vous pouvez aussi parcourir{" "}
          <Link href="/guides">tous nos guides</Link>.
        </p>
      </section>
    </div>
  );
}

export function ToolsHubWhySection() {
  return (
    <section
      className="tools-hub-section tools-hub-section--tinted"
      aria-labelledby="tools-hub-why-title"
    >
      <h2 id="tools-hub-why-title">Pourquoi utiliser nos simulateurs ?</h2>
      <p>
        Un outil de simulation ne remplace pas un bulletin officiel, mais il aide à y voir plus
        clair avant de décider. Voici ce que vous pouvez en attendre :
      </p>
      <ul className="tools-hub-benefits">
        <li>obtenir rapidement une estimation claire à partir de vos propres montants ;</li>
        <li>préparer une négociation salariale avec des repères concrets en euros nets ;</li>
        <li>
          anticiper l&apos;effet d&apos;une augmentation ou d&apos;heures supplémentaires sur votre
          rémunération ;
        </li>
        <li>
          mieux comprendre les écarts entre salaire brut, salaire net et prélèvement à la source.
        </li>
      </ul>
      <p>
        Les outils sont régulièrement vérifiés et adaptés afin de rester cohérents avec les
        principales règles françaises applicables. Les résultats restent toutefois indicatifs :
        ils ne remplacent pas une fiche de paie, un calcul officiel ou un conseil professionnel.
      </p>
    </section>
  );
}
