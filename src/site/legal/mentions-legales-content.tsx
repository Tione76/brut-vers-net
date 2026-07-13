import Link from "next/link";

/** Contenu éditorial de la page /mentions-legales */
export function MentionsLegalesContent() {
  return (
    <>
      <section className="guide-section">
        <h2>Éditeur du site</h2>
        <p>
          Le site <strong>BRUT-VERS-NET.FR</strong>, accessible à l&apos;adresse :
        </p>
        <p>
          <a href="https://brut-vers-net.fr">https://brut-vers-net.fr</a>
        </p>
        <p>est édité par :</p>
        <p>
          <strong>Antoine Denis</strong>
        </p>
        <p>Statut : Particulier</p>
        <p>Adresse électronique :</p>
        <p>
          <a href="mailto:contact@brut-vers-net.fr">
            <strong>contact@brut-vers-net.fr</strong>
          </a>
        </p>
        <p>Une page Contact est disponible à l&apos;adresse :</p>
        <p>
          <Link href="/contact">/contact</Link>
        </p>
      </section>

      <section className="guide-section">
        <h2>Directeur de la publication</h2>
        <p>Antoine Denis</p>
      </section>

      <section className="guide-section">
        <h2>Nom de domaine</h2>
        <p>Le nom de domaine est enregistré auprès de :</p>
        <p>
          OVH SAS
          <br />
          2 rue Kellermann
          <br />
          59100 Roubaix
          <br />
          France
        </p>
        <p>
          <a href="https://www.ovhcloud.com/fr/" rel="noopener noreferrer">
            https://www.ovhcloud.com/fr/
          </a>
        </p>
      </section>

      <section className="guide-section">
        <h2>Hébergement</h2>
        <p>Le site est hébergé par :</p>
        <p>
          Vercel Inc.
          <br />
          440 N Barranca Avenue #4133
          <br />
          Covina, CA 91723
          <br />
          États-Unis
        </p>
        <p>
          <a href="https://vercel.com" rel="noopener noreferrer">
            https://vercel.com
          </a>
        </p>
      </section>

      <section className="guide-section">
        <h2>Objet du site</h2>
        <p>
          BRUT-VERS-NET.FR met gratuitement à disposition d&apos;outils et de contenus
          pédagogiques consacrés au salaire brut et au salaire net.
        </p>
        <p>Les contenus publiés ont une vocation pédagogique et informative.</p>
      </section>

      <section className="guide-section">
        <h2>Avertissement</h2>
        <p>Les informations diffusées sur le site sont fournies à titre informatif.</p>
        <p>
          Malgré le soin apporté à leur rédaction et aux calculateurs proposés, elles ne
          constituent pas un conseil fiscal, comptable, juridique ou professionnel personnalisé.
        </p>
        <p>
          Les utilisateurs restent responsables de l&apos;utilisation qu&apos;ils font des
          informations publiées ainsi que des résultats obtenus.
        </p>
        <p>
          En cas de doute ou de situation particulière, il est recommandé de consulter un
          professionnel compétent.
        </p>
      </section>

      <section className="guide-section">
        <h2>Calculateurs</h2>
        <p>Les calculateurs proposés sur le site permettent notamment :</p>
        <ul>
          <li>d&apos;estimer un salaire net à partir d&apos;un salaire brut ;</li>
          <li>de comparer des scénarios de rémunération.</li>
        </ul>
        <p>
          Les résultats sont calculés automatiquement à partir des informations saisies par
          l&apos;utilisateur.
        </p>
        <p>
          Malgré les vérifications effectuées, aucune garantie absolue ne peut être donnée pour les
          situations particulières ou les évolutions réglementaires.
        </p>
      </section>

      <section className="guide-section">
        <h2>Propriété intellectuelle</h2>
        <p>
          L&apos;ensemble du contenu du site (textes, calculateurs, guides, illustrations, images,
          composants, structure, design et éléments graphiques) est protégé par le droit de la
          propriété intellectuelle.
        </p>
        <p>Toute reproduction totale ou partielle sans autorisation préalable est interdite.</p>
      </section>

      <section className="guide-section">
        <h2>Données personnelles</h2>
        <p>
          Certaines données personnelles peuvent être collectées lors de l&apos;utilisation du
          formulaire de contact.
        </p>
        <p>
          Le site utilise également Google Analytics afin de mesurer son audience.
        </p>
        <p>
          Pour connaître le détail des traitements de données personnelles, consulter la page :
        </p>
        <p>
          <Link href="/politique-de-confidentialite">
            <strong>Politique de confidentialité</strong>
          </Link>
        </p>
      </section>

      <section className="guide-section">
        <h2>Cookies</h2>
        <p>Le site utilise des cookies nécessaires à son fonctionnement.</p>
        <p>Google Analytics est utilisé pour mesurer l&apos;audience.</p>
        <p>
          Le site pourra également utiliser Google AdSense afin d&apos;afficher des publicités
          personnalisées.
        </p>
        <p>Toutes les informations relatives aux cookies sont détaillées dans :</p>
        <p>
          <Link href="/gestion-des-cookies">
            <strong>Gestion des cookies</strong>
          </Link>
        </p>
      </section>

      <section className="guide-section">
        <h2>Responsabilité</h2>
        <p>
          L&apos;éditeur met tout en œuvre pour assurer l&apos;exactitude et la mise à jour des
          informations publiées.
        </p>
        <p>
          Toutefois, il ne saurait être tenu responsable des erreurs, omissions, indisponibilités
          temporaires du site ou des conséquences liées à l&apos;utilisation des contenus.
        </p>
      </section>

      <section className="guide-section">
        <h2>Liens externes</h2>
        <p>Le site peut contenir des liens vers des sites tiers.</p>
        <p>
          L&apos;éditeur ne peut être tenu responsable du contenu ou du fonctionnement de ces
          sites.
        </p>
      </section>

      <section className="guide-section">
        <h2>Contact</h2>
        <p>Pour toute question concernant le site :</p>
        <p>
          <a href="mailto:contact@brut-vers-net.fr">contact@brut-vers-net.fr</a>
        </p>
        <p>ou via la page :</p>
        <p>
          <Link href="/contact">/contact</Link>
        </p>
      </section>
    </>
  );
}
