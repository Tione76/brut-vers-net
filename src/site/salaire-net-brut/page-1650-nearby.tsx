import Link from "next/link";
import {
  PAGE_1650_NEARBY_H2,
  PAGE_1650_NEARBY_INTRO,
} from "./page-1650";

interface NearbyLink {
  href: string;
  label: string;
}

export function Page1650NearbySection({
  headingId,
  links,
}: {
  headingId: string;
  links: NearbyLink[];
}) {
  return (
    <section className="net-gross-1650__nearby" aria-labelledby={headingId}>
      <h2 id={headingId} className="net-gross-1500__h2">
        {PAGE_1650_NEARBY_H2}
      </h2>
      <p className="net-gross-1650__nearby-intro">{PAGE_1650_NEARBY_INTRO}</p>
      <div className="net-gross-1650__nearby-panel">
        <ul className="net-gross-1650__nearby-grid">
          {links.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="net-gross-1650__nearby-card"
                aria-label={`${item.label} net en brut`}
              >
                <span className="net-gross-1650__nearby-amount">{item.label}</span>
                <span className="net-gross-1650__nearby-hint">net → brut</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
