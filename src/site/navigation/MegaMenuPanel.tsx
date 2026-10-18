import Link from "next/link";
import type {
  MainNavMegaPanel,
  MainNavSimplePanel,
  MainNavSpotlightPanel,
} from "./main-nav-data";
import { NavIconBadge } from "./NavIcons";

export function SimpleDropdownPanel({
  panel,
  onNavigate,
}: {
  panel: MainNavSimplePanel;
  onNavigate: () => void;
}) {
  return (
    <ul className="mh-simple-panel">
      {panel.links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="mh-simple-panel__link"
            title={link.title}
            onClick={onNavigate}
          >
            <span className="mh-link-chevron" aria-hidden="true" />
            <span>{link.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function SpotlightPanel({
  panel,
  onNavigate,
}: {
  panel: MainNavSpotlightPanel;
  onNavigate: () => void;
}) {
  return (
    <div className="mh-spotlight">
      <section className="mh-spotlight__main">
        <div className="mh-spotlight__head">
          <NavIconBadge id={panel.icon} variant="circle" />
          <div>
            <p className="mh-mega__column-title">{panel.title}</p>
            <p className="mh-mega__column-desc">{panel.description}</p>
          </div>
        </div>
        <ul className="mh-mega__links">
          {panel.links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="mh-mega__link"
                title={link.title}
                onClick={onNavigate}
              >
                <span className="mh-link-chevron" aria-hidden="true" />
                <span>{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <aside className="mh-mega__cta mh-spotlight__cta">
        <NavIconBadge id={panel.cta.icon} variant="circle" />
        <p className="mh-mega__cta-title">{panel.cta.title}</p>
        <p className="mh-mega__cta-desc">{panel.cta.description}</p>
        <Link
          href={panel.cta.href}
          className="mh-mega__cta-button"
          onClick={onNavigate}
        >
          {panel.cta.buttonLabel}
          <span aria-hidden="true"> →</span>
        </Link>
      </aside>
    </div>
  );
}

export function MegaMenuPanel({
  panel,
  onNavigate,
}: {
  panel: MainNavMegaPanel;
  onNavigate: () => void;
}) {
  const isCalc = panel.layout === "calc";
  const columnIconSize = isCalc ? 36 : undefined;
  const gridClass = [
    "mh-mega__grid",
    panel.cta ? "mh-mega__grid--with-cta" : "",
    isCalc ? "mh-mega__grid--calc" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={`mh-mega${isCalc ? " mh-mega--calc" : ""}`}>
      {panel.intro ? (
        <div className="mh-mega__intro">
          <NavIconBadge id={panel.intro.icon} variant="circle" />
          <div>
            <p className="mh-mega__column-title">{panel.intro.title}</p>
            <p className="mh-mega__column-desc">{panel.intro.description}</p>
          </div>
        </div>
      ) : null}
      <div className={gridClass}>
        {panel.columns.map((column) => (
          <section key={column.id} className="mh-mega__column">
            <div className="mh-mega__column-head">
              <NavIconBadge
                id={column.icon}
                variant="circle"
                size={columnIconSize}
              />
              <div>
                <p className="mh-mega__column-title">{column.title}</p>
                {column.description ? (
                  <p className="mh-mega__column-desc">{column.description}</p>
                ) : null}
              </div>
            </div>
            <ul className="mh-mega__links">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="mh-mega__link"
                    title={link.title}
                    onClick={onNavigate}
                  >
                    <span className="mh-link-chevron" aria-hidden="true" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
        {panel.cta ? (
          <aside className="mh-mega__cta">
            <NavIconBadge id={panel.cta.icon} variant="circle" />
            <p className="mh-mega__cta-title">{panel.cta.title}</p>
            <p className="mh-mega__cta-desc">{panel.cta.description}</p>
            <Link
              href={panel.cta.href}
              className="mh-mega__cta-button"
              onClick={onNavigate}
            >
              {panel.cta.buttonLabel}
              <span aria-hidden="true"> →</span>
            </Link>
          </aside>
        ) : null}
      </div>
    </div>
  );
}
