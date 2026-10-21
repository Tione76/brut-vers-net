import Link from "next/link";

interface NearbyLink {
  href: string;
  label: string;
}

export function Page1650NearbySection({
  headingId,
  heading,
  intro,
  links,
}: {
  headingId: string;
  heading: string;
  intro: string;
  links: NearbyLink[];
}) {
  return (
    <section className="net-gross-1650__nearby" aria-labelledby={headingId}>
      <h2 id={headingId} className="net-gross-1500__h2">
        {heading}
      </h2>
      <p className="net-gross-1650__nearby-intro">{intro}</p>
      <div className="net-gross-1650__nearby-panel">
        <ul className="net-gross-1650__nearby-grid">
          {links.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                prefetch={false}
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
