import { ILLU as c } from "./tokens";

const STEPS = [
  {
    title: "Franchise en base",
    desc: "CA sous les seuils — pas de TVA facturée ni récupérée",
    color: c.brand,
  },
  {
    title: "Dépassement du seuil de base (N-1)",
    desc: "Assujettissement au 1er janvier de l'année suivante",
    color: "#245a8a",
  },
  {
    title: "Dépassement du seuil majoré (année en cours)",
    desc: "Assujettissement dès le 1er jour du dépassement",
    color: "#c45c00",
  },
  {
    title: "Obligation de facturer la TVA",
    desc: "Prix HT + TVA, mentions et ventilation par taux",
    color: c.brand,
  },
  {
    title: "Déclarations et TVA récupérable",
    desc: "CA3 ou CA12 — déduction de la TVA sur les achats professionnels",
    color: c.success,
  },
] as const;

/** Chronologie franchise → assujettissement */
export function FranchiseExitFlowIllustration() {
  return (
    <div
      className="franchise-timeline"
      role="img"
      aria-label="Chronologie du passage de la franchise en base à l'assujettissement à la TVA"
    >
      <p className="franchise-timeline__title">Que se passe-t-il lors d&apos;un dépassement de seuil ?</p>
      <ol className="franchise-timeline__list">
        {STEPS.map((step, i) => (
          <li key={step.title} className="franchise-timeline__item">
            <span className="franchise-timeline__num" style={{ background: step.color }}>
              {i + 1}
            </span>
            <div className="franchise-timeline__content">
              <p className="franchise-timeline__step-title">{step.title}</p>
              <p className="franchise-timeline__step-desc">{step.desc}</p>
            </div>
            {i < STEPS.length - 1 && (
              <span className="franchise-timeline__connector" aria-hidden="true">
                ↓
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
