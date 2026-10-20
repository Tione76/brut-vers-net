/**
 * Sources officielles de la page d'accueil (vérifiées le 20 octobre 2026).
 * Présentation alignée sur les bibliographies des guides récents.
 */

export const HOME_SOURCES_VERIFIED_AT = "2026-10-20";

export const HOME_SOURCES_VERIFIED_AT_LABEL = new Date(HOME_SOURCES_VERIFIED_AT).toLocaleDateString(
  "fr-FR",
  { day: "numeric", month: "long", year: "numeric" },
);

export interface HomeOfficialSource {
  org: string;
  title: string;
  href: string;
  /** Période ou précision réglementaire affichée. */
  note: string;
}

export const HOME_OFFICIAL_SOURCES: readonly HomeOfficialSource[] = [
  {
    org: "URSSAF - Mon-entreprise",
    title: "Simulateur salaire brut / net",
    href: "https://mon-entreprise.urssaf.fr/simulateurs/salaire-brut-net",
    note: "Référence pour la conversion brut/net et les cotisations (estimations indicatives).",
  },
  {
    org: "Service-Public",
    title: "CSG et CRDS sur les revenus d'activité et de remplacement (F2971)",
    href: "https://www.service-public.fr/particuliers/vosdroits/F2971",
    note: "Taux CSG/CRDS, part déductible et non déductible, assiette 98,25 %.",
  },
  {
    org: "Service-Public",
    title: "Durée légale du travail à temps plein (F1911)",
    href: "https://www.service-public.fr/particuliers/vosdroits/F1911",
    note: "35 heures hebdomadaires et 151,67 heures mensuelles.",
  },
  {
    org: "Service-Public",
    title: "Prélèvement à la source : obligations de l'employeur (F34732)",
    href: "https://www.service-public.fr/particuliers/vosdroits/F34732",
    note: "Taux personnalisé, taux neutre et rôle de l'employeur.",
  },
  {
    org: "Service-Public",
    title: "Cotisations salariales du fonctionnaire (F468)",
    href: "https://www.service-public.fr/particuliers/vosdroits/F468",
    note: "Particularités des retenues dans la fonction publique.",
  },
  {
    org: "BOFiP - DGFiP",
    title: "Grilles des taux par défaut du prélèvement à la source (BOI-BAREME-000037)",
    href: "https://bofip.impots.gouv.fr/bofip/11255-PGP.html/identifiant=BOI-BAREME-000037-20260706",
    note: "Grille métropole applicable à compter du 1er mai 2026 (vérifiée le 20 octobre 2026).",
  },
  {
    org: "Légifrance",
    title: "Code général des impôts, article 204 H",
    href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000038122085",
    note: "Texte réglementaire des grilles de taux non personnalisés (III de l'article).",
  },
  {
    org: "Légifrance",
    title: "Loi n° 2026-103 du 19 février 2026 de finances pour 2026",
    href: "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000053508155/",
    note: "Indexation des limites de tranches PAS (art. 4), applicable aux revenus à compter du 1er mai 2026.",
  },
] as const;

/** Bloc sources officielles (placé après la FAQ sur la page d'accueil). */
export function HomeOfficialSourcesSection() {
  return (
    <section id="sources-officielles" className="content-section content-section--border">
      <div className="content-wrap">
        <div className="prose home-editorial">
          <h2>Sources officielles et références</h2>
          <div className="home-editorial__prose">
            <p>
              Sources officielles vérifiées le {HOME_SOURCES_VERIFIED_AT_LABEL}. Elles documentent
              les règles de cotisations, la durée légale du travail, le prélèvement à la source et
              la grille des taux non personnalisés. Elles ne constituent pas une certification de
              Brut vers Net par ces administrations.
            </p>
            {HOME_OFFICIAL_SOURCES.map((source) => (
              <p key={source.href} className="guide-internal-link">
                {source.org} :{" "}
                <a href={source.href} rel="noopener noreferrer" target="_blank">
                  {source.title}
                </a>
                . {source.note}
              </p>
            ))}
            <aside className="home-editorial__callout home-editorial__callout--limit">
              <strong>Périmètre réglementaire couvert</strong>
              <p>
                Grille métropolitaine des taux non personnalisés à compter du 1er mai 2026. Les
                grilles Guadeloupe / La Réunion / Martinique et Guyane / Mayotte ne sont pas
                appliquées ici. Les coefficients brut/net restent des estimations internes du
                simulateur.
              </p>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
