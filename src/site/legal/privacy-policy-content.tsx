import Link from "next/link";
import { GuideInlineToc } from "@/site/guides";
import { PRIVACY_POLICY_TOC } from "./privacy-policy-toc";

/** Contenu éditorial de la page /politique-de-confidentialite */
export function PrivacyPolicyContent() {
  return (
    <>
      <div className="guide-intro">
        <p>
          La présente politique de confidentialité explique comment <strong>HT-VERS-TTC.FR</strong>{" "}
          traite les données personnelles des visiteurs et des personnes qui nous contactent. Elle
          est rédigée en lien avec le fonctionnement réel du site : calculateurs gratuits, guides
          pratiques, formulaire de contact, mesure d&apos;audience et outils d&apos;analyse SEO
          utilisés par l&apos;éditeur.
        </p>
      </div>

      <GuideInlineToc entries={PRIVACY_POLICY_TOC} />

      <section id="responsable-traitement" className="guide-section">
        <h2>Responsable du traitement</h2>
        <p>
          Le responsable du traitement des données personnelles collectées via le site{" "}
          <strong>HT-VERS-TTC.FR</strong> est :
        </p>
        <p>
          <strong>Antoine Denis</strong>
          <br />
          Particulier, éditeur du site
          <br />
          <a href="mailto:contact@ht-vers-ttc.fr">contact@ht-vers-ttc.fr</a>
        </p>
        <p>
          Pour les coordonnées complètes de l&apos;éditeur, vous pouvez consulter nos{" "}
          <Link href="/mentions-legales">mentions légales</Link>.
        </p>
      </section>

      <section id="donnees-collectees" className="guide-section">
        <h2>Données collectées</h2>
        <p>
          Selon votre utilisation du site, les données personnelles suivantes peuvent être traitées :
        </p>
        <ul>
          <li>
            <strong>Données transmises via le formulaire de contact</strong> : nom, adresse e-mail,
            sujet choisi et contenu du message ;
          </li>
          <li>
            <strong>Données de navigation</strong> : pages consultées, type d&apos;appareil,
            navigateur, durée de visite, provenance approximative, uniquement si vous acceptez les
            cookies analytiques (Google Analytics 4) ;
          </li>
          <li>
            <strong>Préférences de consentement</strong> : choix relatifs aux cookies analytiques et
            publicitaires, mémorisés localement dans votre navigateur.
          </li>
        </ul>
        <p>
          Les calculateurs du site (conversion HT/TTC, calcul de TVA, marge commerciale, etc.)
          fonctionnent localement dans votre navigateur. Ils ne nécessitent pas de création de
          compte et ne collectent pas les montants que vous saisissez à des fins de profilage.
        </p>
      </section>

      <section id="formulaire-contact" className="guide-section">
        <h2>Formulaire de contact</h2>
        <p>
          Lorsque vous utilisez la <Link href="/contact">page Contact</Link>, les informations
          saisies (nom, adresse e-mail, sujet et message) sont transmises à l&apos;éditeur afin de
          traiter votre demande.
        </p>
        <p>
          L&apos;envoi du message s&apos;effectue via une route sécurisée du site, qui fait appel au
          service <strong>Resend</strong> pour la délivrance de l&apos;e-mail à l&apos;adresse{" "}
          <strong>contact@ht-vers-ttc.fr</strong>. Resend agit en tant que sous-traitant technique
          pour l&apos;acheminement du message. La clé d&apos;API utilisée pour cet envoi est stockée
          côté serveur et n&apos;est jamais exposée dans le navigateur.
        </p>
        <p>
          Votre adresse e-mail peut être renseignée en tant qu&apos;adresse de réponse
          (<code>reply-to</code>) afin que l&apos;éditeur puisse vous répondre directement.
        </p>
      </section>

      <section id="finalites" className="guide-section">
        <h2>Finalités des traitements</h2>
        <p>Les données personnelles sont traitées pour les finalités suivantes :</p>
        <ul>
          <li>répondre aux demandes envoyées via le formulaire de contact ;</li>
          <li>assurer le fonctionnement technique du site et la sécurité de la plateforme ;</li>
          <li>mémoriser vos choix en matière de cookies et de consentement ;</li>
          <li>
            mesurer l&apos;audience et améliorer les contenus, les calculateurs et l&apos;expérience
            utilisateur, uniquement après acceptation des cookies analytiques ;
          </li>
          <li>
            analyser les performances de référencement du site, via des outils utilisés par
            l&apos;éditeur (Google Search Console, Ahrefs Webmaster Tools).
          </li>
        </ul>
      </section>

      <section id="bases-legales" className="guide-section">
        <h2>Bases légales</h2>
        <p>Conformément au RGPD, les traitements reposent sur les bases légales suivantes :</p>
        <ul>
          <li>
            <strong>Intérêt légitime</strong> : fonctionnement du site, sécurité, mémorisation des
            préférences de consentement, réponse aux demandes manifestement liées à l&apos;activité
            du site ;
          </li>
          <li>
            <strong>Consentement</strong> : dépôt et lecture des cookies analytiques et publicitaires,
            notamment via Google Analytics 4 et Google AdSense ;
          </li>
          <li>
            <strong>Exécution de mesures précontractuelles</strong> ou{" "}
            <strong>intérêt légitime</strong> : traitement des messages reçus via le formulaire de
            contact, selon la nature de la demande.
          </li>
        </ul>
        <p>
          Vous pouvez retirer votre consentement à tout moment pour les traitements qui en dépendent,
          sans affecter la licéité des opérations effectuées avant ce retrait.
        </p>
      </section>

      <section id="duree-conservation" className="guide-section">
        <h2>Durée de conservation</h2>
        <p>Les données sont conservées pendant des durées proportionnées aux finalités poursuivies :</p>
        <ul>
          <li>
            <strong>Messages de contact</strong> : conservés le temps nécessaire au traitement de la
            demande, puis archivés ou supprimés selon les obligations applicables et les besoins de
            preuve raisonnables ;
          </li>
          <li>
            <strong>Données analytiques (Google Analytics 4)</strong> : selon la configuration du
            service et les durées définies par Google, lorsque vous avez accepté les cookies
            analytiques ;
          </li>
          <li>
            <strong>Préférences de consentement</strong> : conservées localement dans votre navigateur
            jusqu&apos;à modification, suppression des données du site ou effacement du stockage local.
          </li>
        </ul>
        <p>
          Pour le détail des durées liées aux cookies, consultez la page{" "}
          <Link href="/gestion-des-cookies">Gestion des cookies</Link>.
        </p>
      </section>

      <section id="destinataires" className="guide-section">
        <h2>Destinataires des données</h2>
        <p>Les données personnelles peuvent être communiquées aux destinataires suivants :</p>

        <figure className="guide-table-wrap">
          <div className="guide-table-scroll">
            <table className="guide-table">
              <thead>
                <tr>
                  <th scope="col">Destinataire</th>
                  <th scope="col">Rôle</th>
                  <th scope="col">Données concernées</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Antoine Denis (éditeur)</td>
                  <td>Responsable du traitement</td>
                  <td>Messages de contact, demandes des utilisateurs</td>
                </tr>
                <tr>
                  <td>Resend</td>
                  <td>Sous-traitant (envoi d&apos;e-mails)</td>
                  <td>Nom, e-mail, sujet et contenu du message de contact</td>
                </tr>
                <tr>
                  <td>Vercel Inc.</td>
                  <td>Hébergeur du site</td>
                  <td>Données techniques de connexion et journaux serveur</td>
                </tr>
                <tr>
                  <td>Google (Analytics, AdSense)</td>
                  <td>Mesure d&apos;audience et publicité (si consentement)</td>
                  <td>Données de navigation et cookies associés</td>
                </tr>
              </tbody>
            </table>
          </div>
        </figure>

        <p>
          Les données ne sont pas vendues à des tiers. Elles ne sont transmises à des partenaires
          que dans la mesure nécessaire au fonctionnement du site ou avec votre consentement lorsque
          celui-ci est requis.
        </p>
      </section>

      <section id="securite" className="guide-section">
        <h2>Sécurité des données</h2>
        <p>
          L&apos;éditeur met en œuvre des mesures techniques et organisationnelles raisonnables pour
          protéger les données personnelles contre la perte, l&apos;accès non autorisé, la
          divulgation ou l&apos;altération.
        </p>
        <p>Ces mesures incluent notamment :</p>
        <ul>
          <li>l&apos;accès HTTPS au site ;</li>
          <li>le stockage des secrets (clé API Resend) exclusivement côté serveur ;</li>
          <li>la limitation des traitements aux finalités décrites dans cette politique ;</li>
          <li>le respect du mécanisme de consentement avant chargement des outils analytiques et publicitaires.</li>
        </ul>
        <p>
          Aucune mesure de sécurité ne peut toutefois garantir une protection absolue. En cas de
          doute sur la sécurité d&apos;un échange, privilégiez un contact direct par e-mail en
          n&apos;incluant que les informations strictement nécessaires.
        </p>
      </section>

      <section id="hebergement" className="guide-section">
        <h2>Hébergement du site</h2>
        <p>
          Le site <strong>HT-VERS-TTC.FR</strong> est hébergé par <strong>Vercel Inc.</strong>,
          440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis.
        </p>
        <p>
          L&apos;hébergement peut impliquer le traitement de données techniques (adresses IP, journaux
          d&apos;accès, horodatages) nécessaires à la mise à disposition et à la sécurité du service.
          Pour plus d&apos;informations sur l&apos;hébergeur, consultez nos{" "}
          <Link href="/mentions-legales">mentions légales</Link>.
        </p>
      </section>

      <section id="google-analytics" className="guide-section">
        <h2>Google Analytics</h2>
        <p>
          Le site peut utiliser <strong>Google Analytics 4</strong> afin de mesurer l&apos;audience
          de manière agrégée et d&apos;améliorer progressivement les contenus proposés.
        </p>
        <aside className="prose-callout prose-callout--legal">
          <strong>Point important</strong>
          <br />
          Google Analytics 4 n&apos;est chargé qu&apos;après votre acceptation des cookies
          analytiques via le bandeau de consentement. Sans ce consentement, aucune mesure d&apos;audience
          par ce service n&apos;est activée sur votre navigateur.
        </aside>
        <p>
          Google peut traiter certaines données de navigation (pages vues, type d&apos;appareil,
          événements de consultation) conformément à sa propre politique de confidentialité. Le site
          utilise Google Consent Mode pour transmettre vos choix de consentement à Google avant tout
          chargement des scripts de mesure.
        </p>
        <p>
          Pour le détail des cookies et traceurs associés, reportez-vous à la page{" "}
          <Link href="/gestion-des-cookies">Gestion des cookies</Link>.
        </p>
      </section>

      <section id="google-search-console" className="guide-section">
        <h2>Google Search Console</h2>
        <p>
          L&apos;éditeur utilise <strong>Google Search Console</strong> pour analyser la visibilité
          du site dans les résultats de recherche Google : pages indexées, performances de
          consultation, erreurs d&apos;exploration et requêtes associées au site.
        </p>
        <p>
          Cet outil est utilisé <strong>uniquement par l&apos;éditeur</strong> dans un cadre
          d&apos;administration et d&apos;optimisation éditoriale. Il ne dépose{" "}
          <strong>aucun cookie</strong> sur le navigateur des visiteurs de{" "}
          <strong>HT-VERS-TTC.FR</strong> et ne constitue pas un traceur au sens de la navigation
          sur le site.
        </p>
      </section>

      <section id="ahrefs" className="guide-section">
        <h2>Ahrefs Webmaster Tools</h2>
        <p>
          L&apos;éditeur peut utiliser <strong>Ahrefs Webmaster Tools</strong> (version gratuite)
          pour analyser le référencement du site : liens entrants, pages explorées, problèmes
          techniques susceptibles d&apos;affecter l&apos;indexation et la qualité perçue par les
          moteurs de recherche.
        </p>
        <p>
          Comme Google Search Console, cet outil sert exclusivement à l&apos;éditeur pour piloter la
          stratégie éditoriale et technique du site. Il ne dépose{" "}
          <strong>aucun cookie</strong> chez les visiteurs et n&apos;interagit pas directement avec
          leur navigation sur <strong>HT-VERS-TTC.FR</strong>.
        </p>
      </section>

      <section id="cookies" className="guide-section">
        <h2>Cookies</h2>
        <p>
          Le site utilise des cookies et technologies similaires pour son fonctionnement, la
          mémorisation de vos préférences et, sous réserve de votre accord, la mesure d&apos;audience
          et l&apos;affichage de publicités.
        </p>
        <p>
          L&apos;ensemble des informations relatives aux cookies, aux catégories concernées, aux
          services tiers (Google Analytics 4, Google AdSense, Google Consent Mode) et aux modalités
          de gestion de votre consentement est détaillé sur la page dédiée :
        </p>
        <p>
          <Link href="/gestion-des-cookies">
            <strong>Gestion des cookies</strong>
          </Link>
        </p>
      </section>

      <section id="droits-utilisateurs" className="guide-section">
        <h2>Vos droits</h2>
        <p>
          Conformément au Règlement général sur la protection des données (RGPD) et à la loi
          « Informatique et Libertés », vous disposez des droits suivants sur vos données
          personnelles :
        </p>
        <ul>
          <li>droit d&apos;accès ;</li>
          <li>droit de rectification ;</li>
          <li>droit à l&apos;effacement ;</li>
          <li>droit à la limitation du traitement ;</li>
          <li>droit d&apos;opposition ;</li>
          <li>droit à la portabilité, lorsque applicable ;</li>
          <li>droit de retirer votre consentement à tout moment pour les traitements fondés sur celui-ci.</li>
        </ul>
        <p>
          Vous pouvez également introduire une réclamation auprès de la CNIL (
          <a href="https://www.cnil.fr" rel="noopener noreferrer">
            www.cnil.fr
          </a>
          ) si vous estimez que vos droits ne sont pas respectés.
        </p>
        <p>
          Pour exercer vos droits, contactez l&apos;éditeur à l&apos;adresse indiquée ci-dessous en
          précisant l&apos;objet de votre demande et, si nécessaire, un moyen de vous identifier.
        </p>
      </section>

      <section id="contact" className="guide-section">
        <h2>Contact</h2>
        <p>
          Pour toute question relative à cette politique de confidentialité ou à l&apos;exercice de vos
          droits, vous pouvez contacter l&apos;éditeur :
        </p>
        <p>
          <a href="mailto:contact@ht-vers-ttc.fr">
            <strong>contact@ht-vers-ttc.fr</strong>
          </a>
        </p>
        <p>
          Vous pouvez également utiliser notre <Link href="/contact">page Contact</Link> pour nous
          adresser un message.
        </p>
      </section>
    </>
  );
}
