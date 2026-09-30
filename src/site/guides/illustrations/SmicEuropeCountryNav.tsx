import Link from "next/link";
import { CountryFlag } from "@/site/smic-europe/CountryFlag";
import { COUNTRIES_WITH_SECTIONS, europeCountryHref } from "@/site/smic-europe";

export function SmicEuropeCountryNav() {
  return (
    <nav className="smic-europe-nav" aria-label="Aller à un pays">
      <p className="smic-europe-nav__legend">
        La mention <span className="smic-europe-nav__ue-mark">UE</span> désigne un État membre de
        l'Union européenne.
      </p>
      <ul className="smic-europe-nav__grid">
        {COUNTRIES_WITH_SECTIONS.map((country) => (
          <li key={country.code} className="smic-europe-nav__item">
            <Link className="smic-europe-nav__link" href={europeCountryHref(country.slug)}>
              <CountryFlag code={country.code} />
              <span className="smic-europe-nav__text">
                <span className="smic-europe-nav__name">{country.nameFr}</span>
                {country.group === "eu" ? <span className="smic-europe-nav__ue">UE</span> : null}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
