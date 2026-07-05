const ITEMS = [
  "Mention art. 293 B du CGI sur chaque facture",
  "Aucune ligne ni montant de TVA",
  "CA suivi vs seuils de base et majoré",
  "TVA sur achats = charge (pas de déduction)",
  "Pas de déclaration CA3/CA12 en franchise",
  "Anticipation avant dépassement du seuil majoré",
] as const;

/** Checklist visuelle franchise en base */
export function FranchiseChecklistIllustration() {
  return (
    <div
      className="franchise-checklist-visual"
      role="img"
      aria-label="Checklist visuelle des points de vigilance en franchise en base de TVA"
    >
      <p className="franchise-checklist-visual__title">Checklist franchise en base</p>
      <ul className="franchise-checklist-visual__list">
        {ITEMS.map((item) => (
          <li key={item}>
            <span className="franchise-checklist-visual__mark" aria-hidden="true">✓</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
