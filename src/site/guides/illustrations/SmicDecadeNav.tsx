import { DECADE_NAV } from "@/site/smic-history";

export function SmicDecadeNav() {
  return (
    <nav className="smic-decade-nav" aria-label="Navigation rapide par décennie">
      <ul className="smic-decade-nav__list">
        {DECADE_NAV.map((item) => (
          <li key={item.id}>
            <a className="smic-decade-nav__link" href={`#${item.yearAnchor}`}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
