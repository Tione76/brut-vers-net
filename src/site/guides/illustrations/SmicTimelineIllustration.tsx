import { SMIC_HISTORY_EDITORIAL_YEAR, formatEuro } from "@/site/smic-history";
import { CURRENT_LEGAL_RATE } from "@/site/smic-history/series";
import { formatFrenchDate } from "@/site/smic-history/format";

const MILESTONES = [
  { year: "1950", text: "Création du SMIG, avec des zones géographiques." },
  { year: "1952", text: "Indexation du SMIG sur les prix." },
  { year: "1968", text: "Forte hausse du SMIG et rapprochement des régimes." },
  { year: "1970", text: "La loi du 2 janvier crée le SMIC." },
  { year: "1982", text: "Durée légale ramenée à 39 heures." },
  { year: "2000-2005", text: "Passage aux 35 heures et convergence des garanties mensuelles." },
  { year: "2002", text: "Mise en circulation de l'euro fiduciaire." },
  { year: "2010", text: "La revalorisation annuelle passe au 1er janvier." },
  { year: "2021-2022", text: "Plusieurs revalorisations automatiques liées à l'inflation." },
  {
    year: String(SMIC_HISTORY_EDITORIAL_YEAR),
    text: `Dernier taux officiel : ${formatEuro(CURRENT_LEGAL_RATE.hourlyGross ?? 0)} brut de l'heure au ${CURRENT_LEGAL_RATE.effectiveDate ? formatFrenchDate(CURRENT_LEGAL_RATE.effectiveDate) : ""}.`,
  },
] as const;

export function SmicTimelineIllustration() {
  return (
    <nav className="smic-timeline" aria-label="Frise chronologique du salaire minimum">
      <ol className="smic-timeline__list">
        {MILESTONES.map((item) => (
          <li key={item.year} className="smic-timeline__item">
            <p className="smic-timeline__year">{item.year}</p>
            <p className="smic-timeline__text">{item.text}</p>
          </li>
        ))}
      </ol>
    </nav>
  );
}
