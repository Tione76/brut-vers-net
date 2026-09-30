import { buildTableLetterIndex } from "@/site/smic-europe";

export function SmicEuropeTableLetterNav() {
  const letters = buildTableLetterIndex();

  return (
    <nav className="smic-europe-table-letters" aria-label="Aller directement au pays dans le tableau">
      <p className="smic-europe-table-letters__label">Aller directement au pays</p>
      <div className="smic-europe-table-letters__list">
        {letters.map((item) => (
          <a key={item.id} className="smic-europe-table-letters__link" href={`#${item.id}`}>
            {item.letter}
          </a>
        ))}
      </div>
    </nav>
  );
}
