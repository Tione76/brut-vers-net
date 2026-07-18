import Link from "next/link";
import { CoverFigure } from "./CoverFigure";
import { GUIDES_HUB_COVER } from "./covers";

/** Introduction éditoriale du hub /guides */
export function GuidesHubEditorial() {
  return (
    <div className="guides-hub-editorial">
      <section
        className="guides-hub-section guides-hub-section--intro"
        aria-label="Présentation des guides"
      >
        <p>
          Nos guides ont été rédigés pour rendre compréhensibles les notions parfois complexes
          liées au salaire et à la fiche de paie. L&apos;objectif est de clarifier chaque étape, du
          salaire brut au montant réellement perçu.
        </p>

        <CoverFigure cover={GUIDES_HUB_COVER} priority />

        <p>
          Ils s&apos;adressent aux salariés, aux personnes qui recherchent un emploi, aux employeurs,
          aux étudiants, et plus largement à toute personne souhaitant mieux comprendre sa
          rémunération.
        </p>
        <p>
          Chaque article privilégie un langage simple, des exemples concrets et des explications
          progressives, sans jargon inutile. Vous pouvez par exemple apprendre à{" "}
          <Link href="/guides/comment-lire-une-fiche-de-paie">lire une fiche de paie</Link>,{" "}
          <Link href="/guides/cotisations-salariales-pourquoi-brut-plus-eleve-que-net">
            comprendre les cotisations salariales
          </Link>{" "}
          ou{" "}
          <Link href="/guides/prelevement-a-la-source-quest-ce-que-cest-et-comment-ca-fonctionne">
            anticiper le prélèvement à la source
          </Link>
          .
        </p>
        <p>
          Ces guides complètent nos simulateurs : après la lecture, vous pouvez{" "}
          <Link href="/">calculer votre salaire brut en net</Link>,{" "}
          <Link href="/calculateurs/augmentation-salaire">simuler une augmentation de salaire</Link>
          ,{" "}
          <Link href="/calculateurs/salaire-heures-supplementaires">
            estimer l&apos;impact des heures supplémentaires
          </Link>{" "}
          ou{" "}
          <Link href="/calculateurs/indemnite-licenciement">
            estimer une indemnité de licenciement
          </Link>
          . Pour une vue d&apos;ensemble des outils, consultez aussi{" "}
          <Link href="/nos-outils">tous nos simulateurs</Link>.
        </p>
      </section>
    </div>
  );
}

export function GuidesHubWhySection() {
  return (
    <section
      className="guides-hub-section guides-hub-section--tinted"
      aria-labelledby="guides-hub-why-title"
    >
      <h2 id="guides-hub-why-title">Pourquoi consulter nos guides ?</h2>
      <p>
        Bien comprendre sa rémunération commence souvent par les bons repères. Nos articles vous
        aident à passer d&apos;une intuition floue à une lecture plus claire de votre situation.
      </p>
      <ul className="guides-hub-benefits">
        <li>comprendre plus facilement une fiche de paie ;</li>
        <li>savoir à quoi correspondent les cotisations ;</li>
        <li>mieux préparer une négociation salariale ;</li>
        <li>comprendre le prélèvement à la source ;</li>
        <li>éviter les erreurs d&apos;interprétation de son salaire ;</li>
        <li>disposer d&apos;informations claires avant d&apos;utiliser les simulateurs.</li>
      </ul>
      <p>
        Les guides sont régulièrement enrichis afin de suivre les principales évolutions de la
        réglementation française. Pour aller plus loin sur le fond, commencez par le guide sur{" "}
        <Link href="/guides/comment-est-calcule-le-salaire-net">
          la différence entre salaire brut et salaire net
        </Link>{" "}
        ou par{" "}
        <Link href="/guides/comment-calculer-son-salaire-net">
          le calcul pas à pas du salaire net
        </Link>
        .
      </p>
    </section>
  );
}
