import { PartnerGallery } from "./PartnerGallery";
import { PartnerHeroCta } from "./PartnerHeroCta";
import { PartnerHeroDevices } from "./PartnerHeroDevices";
import { PartnershipForm } from "./PartnershipForm";

type FormatIcon = "layout" | "banner" | "link" | "custom";

const FORMAT_BLOCKS: readonly {
  title: string;
  text: string;
  icon: FormatIcon;
}[] = [
  {
    title: "Habillage publicitaire",
    text: "Un dispositif visible autour du contenu sur ordinateur, avec un bandeau supérieur et des espaces latéraux aux couleurs de votre marque. Une déclinaison mobile peut compléter la campagne.",
    icon: "layout",
  },
  {
    title: "Bannières et encarts",
    text: "Des formats placés en haut de page, dans une colonne latérale ou entre les sections d'un article, avec une présentation adaptée à chaque écran.",
    icon: "banner",
  },
  {
    title: "Liens et affiliation",
    text: "Des liens texte, des liens vers vos produits ou services et des boutons de découverte peuvent être intégrés dans des contenus pertinents, lorsque l'offre présente un intérêt pour nos lecteurs.",
    icon: "link",
  },
  {
    title: "Opérations sur mesure",
    text: "Vous avez un lancement, une offre ou un besoin particulier ? Nous pouvons étudier ensemble une combinaison de formats et de pages adaptée à votre projet.",
    icon: "custom",
  },
] as const;

function FormatIconSvg({ name }: { name: FormatIcon }) {
  const common = {
    className: "partnership-page__format-icon-svg",
    viewBox: "0 0 24 24",
    width: 22,
    height: 22,
    fill: "none",
    "aria-hidden": true as const,
    focusable: false as const,
  };

  if (name === "layout") {
    return (
      <svg {...common}>
        <rect x="3.5" y="4" width="17" height="16" rx="2" stroke="currentColor" strokeWidth="1.7" />
        <path d="M3.5 8h17M9 8v12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "banner") {
    return (
      <svg {...common}>
        <rect x="3.5" y="5" width="17" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
        <rect x="3.5" y="13" width="10" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    );
  }

  if (name === "link") {
    return (
      <svg {...common}>
        <path
          d="M10 14a4 4 0 0 0 5.66 0l2.12-2.12a4 4 0 0 0-5.66-5.66L11 7.34"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path
          d="M14 10a4 4 0 0 0-5.66 0L6.22 12.12a4 4 0 1 0 5.66 5.66L13 16.66"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path
        d="M12 4.5 13.6 9.4 18.5 11 13.6 12.6 12 17.5 10.4 12.6 5.5 11 10.4 9.4 12 4.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M18 15.5 18.7 17.3 20.5 18 18.7 18.7 18 20.5 17.3 18.7 15.5 18 17.3 17.3 18 15.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EnvelopeIcon() {
  return (
    <svg
      className="partnership-page__form-icon-svg"
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="m4.5 7.5 7.5 5.5 7.5-5.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PartnershipPageContent() {
  return (
    <div className="partnership-page">
      <section className="partner-hero" aria-labelledby="partner-hero-title">
        <div className="partner-hero__copy">
          <p className="partner-hero__eyebrow">Publicité &amp; partenariats</p>
          <h1 id="partner-hero-title" className="partner-hero__title">
            Devenir partenaire de Brut-vers-net.fr
          </h1>
          <p className="partner-hero__intro">
            Faites connaître votre marque auprès de lecteurs qui s&apos;informent sur leur salaire,
            leur budget et leurs droits.
          </p>
          <p className="partner-hero__intro partner-hero__intro--secondary">
            Des formats de visibilité sur ordinateur et mobile, adaptés à votre campagne.
          </p>
          <p className="partner-hero__actions">
            <PartnerHeroCta href="#proposition">Proposer un partenariat</PartnerHeroCta>
          </p>
        </div>
        <div className="partner-hero__visual">
          <PartnerHeroDevices />
        </div>
      </section>

      <section className="partnership-page__section" aria-labelledby="formats-title">
        <h2 id="formats-title" className="partnership-page__heading">
          Des formats adaptés à votre campagne
        </h2>
        <div className="partnership-page__formats">
          {FORMAT_BLOCKS.map((block) => (
            <article key={block.title} className="partnership-page__format">
              <div className="partnership-page__format-icon" aria-hidden="true">
                <FormatIconSvg name={block.icon} />
              </div>
              <div className="partnership-page__format-body">
                <h3>{block.title}</h3>
                <p>{block.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="partnership-page__section" aria-labelledby="gallery-title">
        <h2 id="gallery-title" className="partnership-page__heading">
          Visualisez votre présence sur le site
        </h2>
        <PartnerGallery />
        <p className="partnership-page__note">
          Banque Démo est une marque fictive utilisée uniquement pour ces illustrations.
        </p>
      </section>

      <section className="partnership-page__section partnership-page__collab" aria-labelledby="collab-title">
        <h2 id="collab-title" className="partnership-page__heading partnership-page__heading--accent">
          Une collaboration claire
        </h2>
        <p className="partnership-page__lede">
          Chaque proposition est étudiée selon sa pertinence pour les lecteurs et les possibilités
          du site. Les contenus publicitaires ou sponsorisés sont identifiés, et les liens
          d&apos;affiliation peuvent donner lieu à une rémunération. Les modalités sont convenues
          avant toute mise en ligne.
        </p>
      </section>

      <section
        id="proposition"
        className="partnership-page__section partnership-page__section--form"
        aria-labelledby="form-title"
      >
        <div className="partnership-page__form-layout">
          <div className="partnership-page__form-intro">
            <div className="partnership-page__form-icon" aria-hidden="true">
              <EnvelopeIcon />
            </div>
            <h2 id="form-title" className="partnership-page__heading">
              Parlons de votre projet
            </h2>
            <p className="partnership-page__lede">
              Présentez votre activité et les grandes lignes de votre campagne. Nous étudierons
              ensemble les formats adaptés.
            </p>
          </div>
          <div className="partnership-form-panel">
            <PartnershipForm />
          </div>
        </div>
      </section>
    </div>
  );
}
