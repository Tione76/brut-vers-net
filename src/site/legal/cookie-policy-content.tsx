import Link from "next/link";
import { CookiePreferencesPanel } from "@/framework/CookiePreferencesPanel";
import { GuideInlineToc } from "@/site/guides";
import type { GuideTocGroup } from "@/site/guides/GuideEditorialToc";
import { COOKIE_POLICY_TOC } from "./cookie-policy-toc";

const COOKIE_TOC_GROUPS: GuideTocGroup[] = [
  { title: "Cookies et consentement", icon: "help", start: 0, end: 4 },
  { title: "Utilisation des données et droits", icon: "badge", start: 4, end: 9 },
];

/** Contenu éditorial de la page /gestion-des-cookies */
export function CookiePolicyContent() {
  return (
    <>
      <div className="guide-intro">
        <p>
          Cette page décrit comment <strong>BRUT-VERS-NET.FR</strong> utilise les cookies et
          technologies similaires, et comment vous pouvez gérer vos préférences. Elle est rédigée
          en lien avec la plate-forme de consentement <strong>Sirdata ABconsent</strong> (CMP n°92
          du Transparency &amp; Consent Framework de l&apos;IAB Europe) et avec les services
          réellement utilisés (Google Consent Mode, Google Analytics 4, Microsoft Clarity, Google
          AdSense).
        </p>
      </div>

      <GuideInlineToc
        entries={COOKIE_POLICY_TOC}
        groups={COOKIE_TOC_GROUPS}
        title="Explorer cette page"
      />

      <section id="quest-ce-quun-cookie" className="guide-section">
        <h2>Qu&apos;est-ce qu&apos;un cookie ?</h2>
        <p>
          Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette,
          smartphone) lors de la consultation d&apos;un site internet. Il permet au site de
          mémoriser certaines informations pendant une visite ou d&apos;une visite à l&apos;autre.
        </p>
        <p>
          Sur <strong>BRUT-VERS-NET.FR</strong>, nous distinguons trois grandes familles de cookies
          et traceurs, selon leur finalité :
        </p>
        <ul>
          <li>
            <strong>les cookies strictement nécessaires</strong> : indispensables au bon
            fonctionnement du site et à la mémorisation de vos choix en matière de consentement ;
          </li>
          <li>
            <strong>les cookies analytiques</strong> : utilisés pour mesurer l&apos;audience et
            améliorer le contenu, uniquement si vous les acceptez ;
          </li>
          <li>
            <strong>les cookies publicitaires</strong> : liés à l&apos;affichage de publicités,
            notamment via Google AdSense, uniquement si vous les acceptez.
          </li>
        </ul>
        <p>
          Nous veillons à expliquer ces catégories de manière claire, sans jargon juridique
          inutile, afin que vous puissiez faire un choix éclairé.
        </p>
      </section>

      <section id="cookies-utilises" className="guide-section">
        <h2>Les cookies utilisés sur BRUT-VERS-NET.FR</h2>
        <p>
          Le tableau ci-dessous résume les catégories de cookies susceptibles d&apos;être utilisées
          sur le site. Le détail des services associés est présenté plus loin dans cette page.
        </p>

        <figure className="guide-table-wrap">
          <div className="guide-table-scroll">
            <table className="guide-table">
              <thead>
                <tr>
                  <th scope="col">Catégorie</th>
                  <th scope="col">Finalité principale</th>
                  <th scope="col">Consentement requis</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Strictement nécessaires</td>
                  <td>Fonctionnement du site et mémorisation des préférences de consentement</td>
                  <td>Non</td>
                </tr>
                <tr>
                  <td>Analytiques</td>
                  <td>Mesure d&apos;audience via Google Analytics 4 et Microsoft Clarity</td>
                  <td>Oui</td>
                </tr>
                <tr>
                  <td>Publicitaires</td>
                  <td>Affichage de publicités via Google AdSense</td>
                  <td>Oui</td>
                </tr>
              </tbody>
            </table>
          </div>
        </figure>

        <div className="guide-subsection">
          <h3>Cookies strictement nécessaires</h3>
          <p>
            Ces cookies et traceurs sont indispensables au fonctionnement de{" "}
            <strong>BRUT-VERS-NET.FR</strong>. Ils permettent notamment de mémoriser votre choix de
            consentement recueilli via Sirdata ABconsent.
          </p>
          <p>
            Ces éléments ne nécessitent pas de consentement préalable, car ils sont strictement
            nécessaires au respect de vos choix et au fonctionnement du dispositif de gestion des
            cookies.
          </p>
        </div>

        <div className="guide-subsection">
          <h3>Cookies analytiques</h3>
          <p>
            Lorsque vous acceptez la mesure d&apos;audience dans l&apos;interface Sirdata, le site
            peut charger <strong>Google Analytics 4</strong> et <strong>Microsoft Clarity</strong>{" "}
            afin de mesurer l&apos;audience de manière agrégée et d&apos;analyser l&apos;expérience
            de navigation.
          </p>
          <aside className="prose-callout prose-callout--legal">
            <strong>Point important</strong>
            <br />
            Google Analytics 4 et Microsoft Clarity ne sont jamais chargés sans votre accord sur la
            mesure d&apos;audience. Tant que ce consentement n&apos;est pas accordé, aucun script
            de mesure d&apos;audience n&apos;est exécuté sur votre navigateur. Un retrait de
            consentement arrête la collecte, y compris après navigation interne.
          </aside>
          <p>
            Le site s&apos;appuie sur <strong>Google Consent Mode</strong> (signaux émis par Sirdata)
            pour les services Google. Pour <strong>Microsoft Clarity</strong>, le même choix
            analytique (et publicitaire le cas échéant) est transmis via la{" "}
            <strong>Clarity Consent API V2</strong>.
          </p>
        </div>

        <div className="guide-subsection">
          <h3>Cookies publicitaires</h3>
          <p>
            Le site est conçu pour pouvoir afficher des publicités via{" "}
            <strong>Google AdSense</strong>. Ces annonces peuvent être personnalisées en fonction
            de votre navigation, sous réserve de votre consentement recueilli par Sirdata. En cas
            de refus, AdSense peut éventuellement servir des annonces limitées si Google les juge
            éligibles au regard du TCF et de Consent Mode.
          </p>
          <p>
            Le script technique AdSense charge les emplacements publicitaires manuels du site. La
            diffusion reste soumise à votre choix et à l&apos;activation éditoriale du site. Les
            annonces automatiques et les ancres ne sont pas activées.
          </p>
        </div>
      </section>

      <section id="bandeau-consentement" className="guide-section">
        <h2>Fonctionnement du message de consentement</h2>
        <p>
          Lors de votre première visite sur <strong>BRUT-VERS-NET.FR</strong> (visiteurs concernés
          par les réglementations européennes), une fenêtre Sirdata ABconsent s&apos;affiche. Elle
          vous informe de l&apos;utilisation des cookies et des partenaires, et vous propose
          notamment de continuer sans accepter, de tout accepter ou de personnaliser vos choix.
        </p>
        <p>
          Sur l&apos;offre Essentials, cette interface présente aussi les demandes de consentement
          propres à Sirdata et à ses partenaires, telles qu&apos;elles figurent dans la
          configuration Sirdata. Vous pouvez les accepter ou les refuser librement, indépendamment
          des choix relatifs aux services du site.
        </p>
        <p>
          Vos choix sont enregistrés par Sirdata ABconsent (CMP n°92) conformément au Transparency
          &amp; Consent Framework de l&apos;IAB Europe. Un lien{" "}
          <strong>« Gérer les cookies »</strong> est disponible dans le pied de page du site, ainsi
          que sur cette page, pour rouvrir l&apos;interface.
        </p>
        <aside className="prose-callout prose-callout--hint">
          <strong>À retenir</strong>
          <br />
          Tant qu&apos;aucun choix n&apos;a été enregistré, Google Consent Mode maintient le refus
          par défaut pour le stockage analytique et publicitaire. Aucun outil de mesure d&apos;audience
          n&apos;est chargé dans ce cas, et les requêtes de diffusion AdSense restent en pause.
        </aside>
      </section>

      <section id="modifier-consentement" className="guide-section">
        <h2>Comment modifier son consentement</h2>
        <p>Vous disposez de plusieurs moyens pour ajuster vos préférences :</p>

        <div className="guide-subsection">
          <h3>Depuis le site BRUT-VERS-NET.FR</h3>
          <p>
            Cliquez sur le lien <strong>« Gérer les cookies »</strong> en bas de page, ou utilisez
            le contrôle ci-dessous pour rouvrir Sirdata ABconsent :
          </p>
          <CookiePreferencesPanel />
        </div>

        <div className="guide-subsection">
          <h3>Depuis votre navigateur</h3>
          <p>
            Vous pouvez également supprimer les cookies et données du site via les paramètres de
            votre navigateur. Cette action peut entraîner la réapparition du message de
            consentement lors d&apos;une prochaine visite.
          </p>
          <p>Guides officiels des principaux navigateurs :</p>
          <ul>
            <li>
              <a
                href="https://support.google.com/chrome/answer/95647"
                rel="noopener noreferrer"
              >
                Google Chrome
              </a>
            </li>
            <li>
              <a
                href="https://support.mozilla.org/fr/kb/activer-desactiver-cookies"
                rel="noopener noreferrer"
              >
                Mozilla Firefox
              </a>
            </li>
            <li>
              <a
                href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac"
                rel="noopener noreferrer"
              >
                Safari
              </a>
            </li>
            <li>
              <a
                href="https://support.microsoft.com/fr-fr/microsoft-edge/supprimer-les-cookies-dans-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                rel="noopener noreferrer"
              >
                Microsoft Edge
              </a>
            </li>
          </ul>
        </div>
      </section>

      <section id="services-utilises" className="guide-section">
        <h2>Services utilisés</h2>
        <p>
          Le tableau suivant présente les principaux services tiers liés aux cookies ou au
          consentement sur <strong>BRUT-VERS-NET.FR</strong>.
        </p>

        <figure className="guide-table-wrap">
          <div className="guide-table-scroll">
            <table className="guide-table">
              <thead>
                <tr>
                  <th scope="col">Service</th>
                  <th scope="col">Finalité</th>
                  <th scope="col">Cookies / traceurs</th>
                  <th scope="col">Consentement requis</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Sirdata ABconsent (CMP n°92)</td>
                  <td>
                    Recueil et mémorisation de vos choix (TCF IAB Europe), y compris les demandes
                    Essentials de Sirdata et de ses partenaires
                  </td>
                  <td>Cookies / stockage gérés par Sirdata pour le consentement</td>
                  <td>Non (strictement nécessaire au dispositif)</td>
                </tr>
                <tr>
                  <td>Google Consent Mode</td>
                  <td>Transmission des signaux de consentement aux services Google</td>
                  <td>Aucun cookie déposé en tant que tel</td>
                  <td>Non (mécanisme technique de pilotage)</td>
                </tr>
                <tr>
                  <td>Google Analytics 4</td>
                  <td>Mesure d&apos;audience, statistiques de navigation</td>
                  <td>Cookies analytiques Google (ex. <code>_ga</code>, <code>_ga_*</code>)</td>
                  <td>Oui</td>
                </tr>
                <tr>
                  <td>Microsoft Clarity</td>
                  <td>Analyse anonyme de l&apos;usage (cartes thermiques, sessions)</td>
                  <td>Cookies Clarity (ex. <code>_clck</code>, <code>_clsk</code>)</td>
                  <td>Oui</td>
                </tr>
                <tr>
                  <td>Google AdSense</td>
                  <td>Affichage de publicités (personnalisées ou limitées selon vos choix)</td>
                  <td>Cookies publicitaires Google</td>
                  <td>Oui (personnalisation) ; limitées selon signaux TCF</td>
                </tr>
              </tbody>
            </table>
          </div>
        </figure>

        <p>
          <strong>Google Search Console</strong> et <strong>Ahrefs Webmaster Tools</strong> peuvent
          être utilisés par l&apos;éditeur pour analyser la visibilité du site dans les moteurs de
          recherche. Ces outils ne déposent aucun cookie chez les visiteurs de{" "}
          <strong>BRUT-VERS-NET.FR</strong>. Ils ne figurent donc pas dans le tableau ci-dessus.
        </p>
        <p>
          Pour en savoir plus sur le traitement des données personnelles, consultez également nos{" "}
          <Link href="/mentions-legales">mentions légales</Link> et notre page{" "}
          <Link href="/contact">Contact</Link>.
        </p>
      </section>

      <section id="duree-conservation" className="guide-section">
        <h2>Durée de conservation</h2>
        <p>
          La durée de conservation varie selon le type de cookie ou de traceur concerné. Il n&apos;existe
          pas une durée unique pour l&apos;ensemble des cookies du site.
        </p>
        <p>
          Vos préférences de consentement sont mémorisées par Sirdata ABconsent jusqu&apos;à ce que
          vous les modifiiez, que vous rouvriez l&apos;interface via « Gérer les cookies », ou que
          vous effaciez les données du site dans votre navigateur. La durée par défaut côté Sirdata
          suit en principe les recommandations de la CNIL (environ 180 jours), sous réserve des
          réglages du portail.
        </p>
        <p>
          Les cookies déposés par Google Analytics 4, Microsoft Clarity ou Google AdSense,
          lorsqu&apos;ils sont autorisés, suivent les durées définies par chaque éditeur. Ces durées
          peuvent évoluer ; nous vous invitons à consulter leur documentation pour le détail le plus
          à jour.
        </p>
      </section>

      <section id="base-legale" className="guide-section">
        <h2>Base légale</h2>
        <p>
          Le traitement par cookies obéit à des règles différentes selon leur finalité :
        </p>
        <ul>
          <li>
            les <strong>cookies strictement nécessaires</strong> (dont le dispositif de
            consentement Sirdata) reposent sur l&apos;<strong>intérêt légitime</strong> de
            l&apos;éditeur à assurer le bon fonctionnement du site et le respect de vos choix ;
          </li>
          <li>
            les <strong>cookies analytiques</strong> et <strong>cookies publicitaires</strong>{" "}
            nécessitent votre <strong>consentement préalable</strong>, recueilli via Sirdata
            ABconsent.
          </li>
        </ul>
        <p>
          Vous pouvez retirer votre consentement à tout moment, sans que cela affecte la licéité des
          traitements effectués avant ce retrait.
        </p>
      </section>

      <section id="vos-droits" className="guide-section">
        <h2>Vos droits</h2>
        <p>
          Selon la réglementation applicable en matière de protection des données personnelles, vous
          disposez de droits sur vos informations (accès, rectification, effacement, opposition,
          limitation, etc.).
        </p>
        <p>
          Pour connaître le détail des traitements, les durées de conservation applicables aux
          données personnelles et les modalités d&apos;exercice de vos droits, consultez notre{" "}
          <Link href="/politique-de-confidentialite">
            <strong>Politique de confidentialité</strong>
          </Link>
          .
        </p>
        <p>
          Vous pouvez également consulter nos <Link href="/mentions-legales">mentions légales</Link>{" "}
          pour les coordonnées de l&apos;éditeur du site.
        </p>
      </section>

      <section id="contact" className="guide-section">
        <h2>Contact</h2>
        <p>
          Pour toute question relative aux cookies, au message de consentement ou à l&apos;utilisation
          de vos données sur <strong>BRUT-VERS-NET.FR</strong>, vous pouvez contacter l&apos;éditeur :
        </p>
        <p>
          <a href="mailto:brut.vers.net@gmail.com">
            <strong>brut.vers.net@gmail.com</strong>
          </a>
        </p>
        <p>
          Vous pouvez également utiliser notre <Link href="/contact">page Contact</Link>.
        </p>
      </section>
    </>
  );
}
