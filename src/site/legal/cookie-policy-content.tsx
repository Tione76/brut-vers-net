import Link from "next/link";
import { CookiePreferencesPanel } from "@/framework/CookiePreferencesPanel";
import { GuideInlineToc } from "@/site/guides";
import { CONSENT_STORAGE_KEY } from "@/framework/consent/storage";
import { COOKIE_POLICY_TOC } from "./cookie-policy-toc";

/** Contenu éditorial de la page /gestion-des-cookies */
export function CookiePolicyContent() {
  return (
    <>
      <div className="guide-intro">
        <p>
          Cette page décrit comment <strong>HT-VERS-TTC.FR</strong> utilise les cookies et
          technologies similaires, et comment vous pouvez gérer vos préférences. Elle est rédigée
          en lien direct avec le bandeau de consentement affiché sur le site et avec les services
          réellement utilisés (Google Analytics 4, Microsoft Clarity, Google AdSense, Google Consent Mode).
        </p>
      </div>

      <GuideInlineToc entries={COOKIE_POLICY_TOC} />

      <section id="quest-ce-quun-cookie" className="guide-section">
        <h2>Qu&apos;est-ce qu&apos;un cookie ?</h2>
        <p>
          Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette,
          smartphone) lors de la consultation d&apos;un site internet. Il permet au site de
          mémoriser certaines informations pendant une visite ou d&apos;une visite à l&apos;autre.
        </p>
        <p>
          Sur <strong>HT-VERS-TTC.FR</strong>, nous distinguons trois grandes familles de cookies
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
        <h2>Les cookies utilisés sur HT-VERS-TTC.FR</h2>
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
                  <td>Fonctionnement du site, bandeau cookies, mémorisation des préférences</td>
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
            Ces cookies et traceurs locaux sont indispensables au fonctionnement de{" "}
            <strong>HT-VERS-TTC.FR</strong>. Ils permettent notamment :
          </p>
          <ul>
            <li>de mémoriser votre choix de consentement (acceptation, refus ou personnalisation) ;</li>
            <li>d&apos;afficher ou de masquer le bandeau de cookies en fonction de votre décision ;</li>
            <li>de conserver vos préférences analytiques et publicitaires entre vos visites.</li>
          </ul>
          <p>
            Vos préférences sont enregistrées localement dans votre navigateur, via{" "}
            <code>localStorage</code>, sous la clé <code>{CONSENT_STORAGE_KEY}</code>. Ce stockage
            n&apos;est pas un cookie au sens strict, mais il remplit la même fonction pratique :
            retenir vos choix sans vous redemander à chaque page.
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
            Lorsque vous acceptez les cookies analytiques, le site peut charger{" "}
            <strong>Google Analytics 4</strong> et <strong>Microsoft Clarity</strong> afin de
            mesurer l&apos;audience de manière agrégée et d&apos;analyser l&apos;expérience de
            navigation (cartes de chaleur, enregistrements de session anonymisés).
          </p>
          <aside className="prose-callout prose-callout--legal">
            <strong>Point important</strong>
            <br />
            Google Analytics 4 et Microsoft Clarity ne sont jamais chargés sans votre accord. Tant
            que vous n&apos;avez pas accepté les cookies analytiques, aucun script de mesure
            d&apos;audience n&apos;est exécuté sur votre navigateur.
          </aside>
          <p>Ces cookies permettent notamment de :</p>
          <ul>
            <li>mesurer le nombre de visites et de pages vues ;</li>
            <li>identifier les contenus et calculateurs les plus consultés ;</li>
            <li>comprendre comment les visiteurs naviguent sur le site ;</li>
            <li>améliorer progressivement les guides, les outils et l&apos;expérience utilisateur.</li>
          </ul>
          <p>
            Le site utilise <strong>Google Consent Mode</strong> : les signaux de consentement sont
            transmis à Google avant tout chargement des outils de mesure. Par défaut, le stockage
            analytique est refusé. Il n&apos;est activé qu&apos;après votre acceptation explicite
            via le bandeau ou le panneau de préférences.
          </p>
        </div>

        <div className="guide-subsection">
          <h3>Cookies publicitaires</h3>
          <p>
            Le site est conçu pour pouvoir afficher des publicités via{" "}
            <strong>Google AdSense</strong>. Ces annonces peuvent être personnalisées en fonction
            de votre navigation, sous réserve de votre consentement.
          </p>
          <p>Concrètement :</p>
          <ul>
            <li>aucun cookie publicitaire n&apos;est déposé tant que vous n&apos;avez pas accepté cette catégorie ;</li>
            <li>le script AdSense n&apos;est chargé qu&apos;après accord sur les cookies publicitaires ;</li>
            <li>Google Consent Mode pilote également ce comportement, en bloquant le stockage publicitaire tant que le consentement n&apos;est pas accordé.</li>
          </ul>
          <p>
            Même si certaines zones publicitaires ne sont pas encore actives au moment de votre
            lecture, cette politique décrit le fonctionnement prévu afin de garantir la transparence
            dès l&apos;activation du service.
          </p>
        </div>
      </section>

      <section id="bandeau-consentement" className="guide-section">
        <h2>Fonctionnement du bandeau de consentement</h2>
        <p>
          Lors de votre première visite sur <strong>HT-VERS-TTC.FR</strong>, un bandeau maison
          s&apos;affiche en bas de l&apos;écran. Il vous informe de l&apos;utilisation des cookies
          et vous propose trois options :
        </p>
        <ul>
          <li><strong>Tout accepter</strong> : activation des cookies analytiques et publicitaires ;</li>
          <li><strong>Tout refuser</strong> : seuls les cookies strictement nécessaires restent actifs ;</li>
          <li><strong>Personnaliser</strong> : ouverture d&apos;un panneau détaillé pour choisir catégorie par catégorie.</li>
        </ul>
        <p>
          Le panneau de personnalisation distingue clairement les cookies nécessaires (non
          désactivables), les cookies analytiques et les cookies publicitaires. Vous pouvez modifier
          votre décision à tout moment, sans limite de durée.
        </p>
        <p>
          Un bouton <strong>« Gérer les cookies »</strong> est également disponible dans le pied de
          page du site. Il rouvre le panneau de préférences à la demande, y compris après un choix
          initial.
        </p>
        <aside className="prose-callout prose-callout--hint">
          <strong>À retenir</strong>
          <br />
          Tant qu&apos;aucun choix n&apos;a été enregistré, Google Consent Mode maintient le refus
          par défaut pour les cookies analytiques et publicitaires. Aucun outil de mesure ou de
          publicité tiers n&apos;est chargé dans ce cas.
        </aside>
      </section>

      <section id="modifier-consentement" className="guide-section">
        <h2>Comment modifier son consentement</h2>
        <p>Vous disposez de plusieurs moyens pour ajuster vos préférences :</p>

        <div className="guide-subsection">
          <h3>Depuis le site HT-VERS-TTC.FR</h3>
          <p>
            Cliquez sur le bouton <strong>« Gérer les cookies »</strong> en bas de page, ou utilisez
            le panneau ci-dessous pour rouvrir vos préférences à tout moment :
          </p>
          <CookiePreferencesPanel />
        </div>

        <div className="guide-subsection">
          <h3>Depuis votre navigateur</h3>
          <p>
            Vous pouvez également supprimer les cookies et données locales déjà enregistrés via les
            paramètres de votre navigateur. Cette action effacera notamment la mémorisation de votre
            consentement : le bandeau pourra réapparaître lors d&apos;une prochaine visite.
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
          consentement sur <strong>HT-VERS-TTC.FR</strong>.
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
                  <td>Bandeau maison + stockage local</td>
                  <td>Mémorisation de vos choix de consentement</td>
                  <td>Données en localStorage (<code>{CONSENT_STORAGE_KEY}</code>)</td>
                  <td>Non (strictement nécessaire)</td>
                </tr>
                <tr>
                  <td>Google Analytics 4</td>
                  <td>Mesure d&apos;audience, statistiques de navigation</td>
                  <td>Cookies analytiques Google (ex. <code>_ga</code>, <code>_ga_*</code>)</td>
                  <td>Oui</td>
                </tr>
                <tr>
                  <td>Google AdSense</td>
                  <td>Affichage de publicités, y compris personnalisées</td>
                  <td>Cookies publicitaires Google</td>
                  <td>Oui</td>
                </tr>
                <tr>
                  <td>Google Consent Mode</td>
                  <td>Transmission des signaux de consentement aux services Google</td>
                  <td>Aucun cookie déposé en tant que tel</td>
                  <td>Non (mécanisme technique de pilotage)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </figure>

        <p>
          <strong>Google Search Console</strong> et <strong>Ahrefs Webmaster Tools</strong> peuvent
          être utilisés par l&apos;éditeur pour analyser la visibilité du site dans les moteurs de
          recherche. Ces outils ne déposent aucun cookie chez les visiteurs de{" "}
          <strong>HT-VERS-TTC.FR</strong>. Ils ne figurent donc pas dans le tableau ci-dessus.
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
          Vos préférences de consentement sont mémorisées localement dans votre navigateur jusqu&apos;à
          ce que vous les modifiiez, que vous supprimiez les données du site ou que vous effaciez
          le stockage local. Tant que ce choix est conservé, le bandeau ne vous sera pas redemandé
          à chaque visite.
        </p>
        <p>
          Les cookies déposés par Google Analytics 4 ou Google AdSense, lorsqu&apos;ils sont
          autorisés, suivent les durées définies par Google pour chaque cookie. Ces durées peuvent
          évoluer ; nous vous invitons à consulter la documentation de Google pour le détail le plus
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
            les <strong>cookies strictement nécessaires</strong> (dont la mémorisation du
            consentement) reposent sur l&apos;<strong>intérêt légitime</strong> de l&apos;éditeur
            à assurer le bon fonctionnement du site et le respect de vos choix ;
          </li>
          <li>
            les <strong>cookies analytiques</strong> et <strong>cookies publicitaires</strong>{" "}
            nécessitent votre <strong>consentement préalable</strong>, recueilli via le bandeau ou le
            panneau de préférences.
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
          Pour toute question relative aux cookies, au bandeau de consentement ou à l&apos;utilisation
          de vos données sur <strong>HT-VERS-TTC.FR</strong>, vous pouvez contacter l&apos;éditeur :
        </p>
        <p>
          <a href="mailto:contact@ht-vers-ttc.fr">
            <strong>contact@ht-vers-ttc.fr</strong>
          </a>
        </p>
        <p>
          Vous pouvez aussi utiliser notre <Link href="/contact">page Contact</Link> pour nous
          adresser un message.
        </p>
      </section>
    </>
  );
}
