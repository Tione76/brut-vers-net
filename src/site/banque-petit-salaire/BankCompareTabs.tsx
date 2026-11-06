"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import {
  BANK_FAQ_ITEMS,
  BANK_GUIDE_SOURCES as S,
  BANK_GUIDE_SOURCES_VERIFIED_AT_LABEL,
  BANK_NEED_BLOCKS,
  BANK_OFFERS,
  UNUSED_SCENARIO_MONTHS,
  getBankOffer,
  offerAnnualLabel,
  offerMonthlyLabel,
  offerUnusedMonthlyLabel,
  offerUnusedThreeMonthsLabel,
  type BankOffer,
  type BankOfferId,
} from "./data";
import { BankCard } from "./BankOfferCards";
import "./bank-cards.css";

export const BANK_TAB_IDS = [
  "detail",
  "frais",
  "besoins",
  "ouvrir",
  "faq",
] as const;

export type BankTabId = (typeof BANK_TAB_IDS)[number];

const TAB_LABELS: Record<BankTabId, string> = {
  detail: "Les offres en détail",
  frais: "Comparer les frais",
  besoins: "Choisir selon mes besoins",
  ouvrir: "Ouvrir ou changer de compte",
  faq: "Questions fréquentes",
};

const BANK_ANCHORS = new Set(BANK_OFFERS.map((offer) => offer.decryptAnchor));

function tabFromHash(hash: string): { tab: BankTabId; scrollId?: string } | null {
  const raw = hash.replace(/^#/, "");
  if (!raw) return null;
  if ((BANK_TAB_IDS as readonly string[]).includes(raw)) {
    return { tab: raw as BankTabId };
  }
  if (BANK_ANCHORS.has(raw)) {
    return { tab: "detail", scrollId: raw };
  }
  if (BANK_FAQ_ITEMS.some((item) => item.id === raw)) {
    return { tab: "faq", scrollId: raw };
  }
  return null;
}

function OfferAnalysis({ offer }: { offer: BankOffer }) {
  return (
    <section
      id={offer.decryptAnchor}
      className="bp-analysis"
      aria-labelledby={`${offer.decryptAnchor}-title`}
    >
      <h3 id={`${offer.decryptAnchor}-title`} className="bp-analysis__title">
        {offer.analysisTitle}
      </h3>
      <p>{offer.whyInSelection}</p>
      <p>
        Au quotidien, {offer.bankName}
        {offer.formerName ? ` (anciennement ${offer.formerName})` : ""} propose la formule{" "}
        <strong>{offer.offerName}</strong> avec une carte {offer.cardName} ({offer.debitType}).{" "}
        {offer.cardCondition} {offer.incomeCondition}. {offer.domiciliation}.
      </p>

      <div className="bp-analysis__card">
        <BankCard offer={offer} compact showUnderstandLink={false} />
      </div>

      <h4 className="bp-analysis__subtitle">Ce qu&apos;il faut savoir avant de choisir</h4>
      <ul className="bp-analysis__limits">
        <li>
          <strong>Frais possibles :</strong> {offer.unusedFeeLabel}
        </li>
        <li>
          <strong>Premier versement :</strong> {offer.initialDeposit}
        </li>
        <li>
          <strong>Chèques / espèces :</strong> {offer.checkDeposit} {offer.cashDeposit}
        </li>
        <li>
          <strong>Ouverture :</strong> {offer.needsExistingAccount}
        </li>
        <li>
          <strong>Carte :</strong> {offer.debitType}. {offer.limit}
        </li>
      </ul>

      <p className="bp-analysis__decide">
        <strong>À envisager si…</strong> {offer.considerIf}
      </p>
      <p className="bp-analysis__decide">
        <strong>À comparer avec une autre offre si…</strong> {offer.compareIf}
      </p>
    </section>
  );
}

function DetailPanel() {
  return (
    <div className="bp-panel-body">
      <h2 className="bp-panel__heading">
        Quatre offres bancaires analysées pour les petits salaires
      </h2>
      <p>
        Même ordre alphabétique que les cartes ci-dessus. Ce n&apos;est pas un classement : chaque
        fiche décrit ce que la formule coûte, ce qu&apos;elle demande et ce qu&apos;elle permet.
      </p>
      {BANK_OFFERS.map((offer) => (
        <OfferAnalysis key={offer.id} offer={offer} />
      ))}
    </div>
  );
}

function FeesPanel() {
  return (
    <div className="bp-panel-body">
      <h2 className="bp-panel__heading">Comparer les frais récurrents</h2>
      <p>
        Tableau synthétique à partir des brochures et pages produit consultées le{" "}
        {BANK_GUIDE_SOURCES_VERIFIED_AT_LABEL}. Distinguez bien gratuité sous conditions et forfait
        toujours dû.
      </p>

      <div className="bp-table-wrap" role="region" aria-label="Tableau comparatif des frais">
        <table className="bp-table">
          <thead>
            <tr>
              <th scope="col">Banque et formule</th>
              <th scope="col">Tarif mensuel habituel</th>
              <th scope="col">Condition de gratuité</th>
              <th scope="col">Si condition non respectée</th>
              <th scope="col">Premier versement</th>
              <th scope="col">Dépôt de chèques</th>
              <th scope="col">Dépôt d&apos;espèces</th>
            </tr>
          </thead>
          <tbody>
            {BANK_OFFERS.map((offer) => (
              <tr key={offer.id}>
                <th scope="row">
                  <a href={`#${offer.decryptAnchor}`}>{offer.shortLabel}</a>
                </th>
                <td data-label="Tarif mensuel habituel">{offerMonthlyLabel(offer)}</td>
                <td data-label="Condition de gratuité">{offer.freeCondition}</td>
                <td data-label="Si condition non respectée">{offer.unusedFeeLabel}</td>
                <td data-label="Premier versement">{offer.initialDepositShort}</td>
                <td data-label="Dépôt de chèques">{offer.checkDepositShort}</td>
                <td data-label="Dépôt d'espèces">{offer.cashDepositShort}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="bp-panel__subheading">Frais de non-utilisation, retraits et incidents</h3>
      <ul>
        <li>
          <strong>Non-utilisation :</strong> Fosfo facture 3&nbsp;€ sans paiement carte dans le mois
          civil (un retrait ne compte pas). Hello One facture 6&nbsp;€ sans paiement ni retrait.
          Welcome récente (commandée depuis le 27 février 2026) n&apos;applique pas cette pénalité.
          Pratiq+ facture 3,90&nbsp;€ chaque mois, usage ou non.
        </li>
        <li>
          <strong>Retraits hors réseau :</strong> BoursoBank et Fortuneo décrivent des retraits en
          euros sans quota publié. Hello One est gratuit surtout dans le réseau Cash Services et BNP
          Paribas. Hors de ce périmètre, des frais peuvent s&apos;appliquer.
        </li>
        <li>
          <strong>Options et incidents :</strong> découvert, opposition, refabrication de carte ou
          rejets de prélèvement relèvent des brochures tarifaires. Un petit salaire n&apos;annule
          pas ces frais éventuels.
        </li>
      </ul>

      <h3 className="bp-panel__subheading">Exemple sur {UNUSED_SCENARIO_MONTHS} mois</h3>
      <p>
        Hypothèses : compte individuel, carte de la formule présentée, pas de découvert, pas
        d&apos;incident, paiements et retraits uniquement en euros. Les primes de bienvenue ne sont{" "}
        <strong>pas</strong> déduites ici : ce sont des montants ponctuels, sous conditions.
      </p>
      <ul>
        {BANK_OFFERS.map((offer) => (
          <li key={`scenario-${offer.id}`}>
            <strong>{offer.shortLabel}</strong> :{" "}
            {offer.monthlyIfConditionsMetCents === 0 && offer.unusedMonthlyCents === 0
              ? `${offerUnusedThreeMonthsLabel(offer)} sur ${UNUSED_SCENARIO_MONTHS} mois avec la Welcome récente (0 € / mois).`
              : offer.monthlyIfConditionsMetCents === 0
                ? `si la condition est respectée chaque mois : ${offerAnnualLabel(offer)} / an ; si elle ne l'est jamais : ${offerUnusedMonthlyLabel(offer)} / mois, soit ${offerUnusedThreeMonthsLabel(offer)} sur ${UNUSED_SCENARIO_MONTHS} mois.`
                : `${offerMonthlyLabel(offer)} chaque mois, soit ${offerAnnualLabel(offer)} / an (${offerUnusedThreeMonthsLabel(offer)} sur ${UNUSED_SCENARIO_MONTHS} mois).`}
          </li>
        ))}
      </ul>

      <h3 className="bp-panel__subheading">Une prime de bienvenue doit-elle décider de votre choix&nbsp;?</h3>
      <p>
        Une prime est un bonus ponctuel, souvent soumis à ouverture, versements, usage de la carte
        ou mobilité bancaire. Elle ne remplace pas le coût récurrent du compte. Vérifiez le montant
        réellement accessible avec <em>votre</em> parcours (par exemple chez BoursoBank, le maximum
        de 180&nbsp;€ cumule plusieurs étapes, dont EasyMove). Chez Fortuneo, la prime Fosfo publiée
        sur la page des offres spéciales (30&nbsp;€ avec code BIENVENUEFTO) ne doit pas être confondue
        avec celle de la carte Gold.
      </p>
    </div>
  );
}

function NeedsPanel() {
  return (
    <div className="bp-panel-body">
      <h2 className="bp-panel__heading">Choisir selon mes besoins</h2>
      <ul className="bp-needs">
        {BANK_NEED_BLOCKS.map((item) => (
          <li key={item.id} className="bp-need" id={item.id}>
            <p className="bp-need__title">{item.need}</p>
            <p className="bp-need__answer">{item.answer}</p>
            <p className="bp-need__links">
              Voir :{" "}
              {item.relatedOfferIds.map((id, index) => {
                const offer = getBankOffer(id as BankOfferId);
                return (
                  <span key={id}>
                    {index > 0 ? ", " : null}
                    <a href={`#${offer.decryptAnchor}`}>{offer.shortLabel}</a>
                  </span>
                );
              })}
              .
            </p>
          </li>
        ))}
      </ul>

      <h2 className="bp-panel__heading">
        Peut-on ouvrir un compte en ligne avec le SMIC ou moins de 2 000&nbsp;€ par mois&nbsp;?
      </h2>
      <h3 className="bp-panel__subheading">Gagner le SMIC : quelles conditions regarder&nbsp;?</h3>
      <p>
        Les quatre formules présentées n&apos;imposent pas de revenu minimum publié. Cela ne
        signifie pas une ouverture automatique : la banque vérifie identité, résidence et peut
        refuser. Regardez surtout cotisation, condition d&apos;usage de la carte et premier
        versement.
      </p>
      <h3 className="bp-panel__subheading">Temps partiel et revenus variables : que vérifier&nbsp;?</h3>
      <p>
        Distinguez revenu minimum (absent ici), justificatifs demandés, éventuelle domiciliation
        (non exigée pour ces offres) et usage de la carte qui conditionne la gratuité chez Fosfo et
        Hello One. Un revenu irrégulier n&apos;empêche pas a priori la souscription, mais peut
        compliquer un découvert ou certains plafonds.
      </p>
      <h3 className="bp-panel__subheading">
        Moins de 2 000&nbsp;€ nets : faut-il forcément une offre sans condition de revenus&nbsp;?
      </h3>
      <p>
        Non. Le seuil de 2 000&nbsp;€ n&apos;est pas une règle bancaire universelle. Il sert ici de
        repère de budget. Une offre « sans revenu minimum » n&apos;est ni « sans contrôle » ni une
        garantie d&apos;ouverture. Si une autre formule de la même banque exige 1 500&nbsp;€ ou
        2 200&nbsp;€ de revenus (ex. Hello Prime, Fortuneo Gold), elle sort du périmètre de ce
        comparatif.
      </p>
    </div>
  );
}

function OpenPanel() {
  return (
    <div className="bp-panel-body">
      <h2 className="bp-panel__heading">Ouvrir ou changer de compte</h2>
      <ol className="bp-steps">
        <li>
          <strong>Vérifier la formule et ses conditions.</strong> Relisez cotisation, condition
          d&apos;usage, premier versement et éventuelle prime avant de signer.
        </li>
        <li>
          <strong>Préparer les justificatifs.</strong> Pièce d&apos;identité, justificatif de
          domicile, parfois un RIB français. Les listes exactes figurent sur les parcours
          d&apos;ouverture.
        </li>
        <li>
          <strong>Ouvrir le compte et effectuer le versement éventuellement demandé.</strong> Ce
          versement n&apos;est en général pas un frais : l&apos;argent reste sur le compte.
        </li>
        <li>
          <strong>Organiser les virements et prélèvements récurrents.</strong> La mobilité bancaire
          (mandat de transfert) aide à prévenir les émetteurs, mais ne couvre pas tout et n&apos;est
          pas obligatoire. Voir{" "}
          <a href={S.servicePublicMobilite.href} rel="noopener noreferrer" target="_blank">
            {S.servicePublicMobilite.label}
          </a>
          .
        </li>
        <li>
          <strong>Vérifier la transition avant de fermer l&apos;ancien compte.</strong> Attendez la
          réception de la carte, le bon fonctionnement des prélèvements et un solde stable.
        </li>
      </ol>

      <h3 className="bp-panel__subheading">Petit salaire, fragilité, refus et droit au compte</h3>
      <p>
        Un salaire au SMIC ou un temps partiel ne donne pas automatiquement accès à l&apos;offre
        clientèle fragile ni au droit au compte. La fragilité financière suit des critères
        réglementaires décrits par la{" "}
        <a href={S.bdfOffreFragile.href} rel="noopener noreferrer" target="_blank">
          Banque de France
        </a>
        . Un refus d&apos;ouverture n&apos;est pas la même chose qu&apos;une interdiction bancaire.
        Si aucune banque n&apos;accepte d&apos;ouvrir un compte de dépôt, la procédure de{" "}
        <a href={S.servicePublicDroitAuCompte.href} rel="noopener noreferrer" target="_blank">
          droit au compte
        </a>{" "}
        peut être engagée via la Banque de France.
      </p>
    </div>
  );
}

function FaqPanel() {
  return (
    <div className="bp-panel-body">
      <h2 className="bp-panel__heading">Questions fréquentes</h2>
      <div className="bp-faq">
        {BANK_FAQ_ITEMS.map((item) => (
          <section key={item.id} id={item.id} className="bp-faq__item">
            <h3 className="bp-faq__question">{item.question}</h3>
            <p className="bp-faq__answer">{item.answer}</p>
          </section>
        ))}
      </div>
    </div>
  );
}

const PANEL_CONTENT: Record<BankTabId, ReactNode> = {
  detail: <DetailPanel />,
  frais: <FeesPanel />,
  besoins: <NeedsPanel />,
  ouvrir: <OpenPanel />,
  faq: <FaqPanel />,
};

export function BankCompareTabs() {
  const baseId = useId();
  const [enhanced, setEnhanced] = useState(false);
  const [active, setActive] = useState<BankTabId>("detail");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const selectTab = useCallback((tab: BankTabId, scrollId?: string, pushHash = true) => {
    setActive(tab);
    if (pushHash && typeof window !== "undefined") {
      const next = scrollId ? `#${scrollId}` : `#${tab}`;
      window.history.replaceState(null, "", next);
    }
    if (scrollId) {
      window.requestAnimationFrame(() => {
        document.getElementById(scrollId)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, []);

  useEffect(() => {
    setEnhanced(true);
    const parsed = tabFromHash(window.location.hash);
    if (parsed) {
      selectTab(parsed.tab, parsed.scrollId, false);
    }

    const onHash = () => {
      const next = tabFromHash(window.location.hash);
      if (next) selectTab(next.tab, next.scrollId, false);
    };
    window.addEventListener("hashchange", onHash);

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest<HTMLAnchorElement>("a[data-bp-open-tab], a[href^='#']");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      const openTab = link.getAttribute("data-bp-open-tab") as BankTabId | null;
      const scrollTo = link.getAttribute("data-bp-scroll-to") ?? href.replace(/^#/, "");
      const parsed = openTab
        ? { tab: openTab, scrollId: scrollTo || undefined }
        : tabFromHash(href);
      if (!parsed) return;
      if (link.closest(".bp-tabs") || link.classList.contains("bp-card__understand") || BANK_ANCHORS.has(scrollTo) || (BANK_TAB_IDS as readonly string[]).includes(scrollTo)) {
        event.preventDefault();
        selectTab(parsed.tab, parsed.scrollId ?? (scrollTo || undefined));
      }
    };
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("hashchange", onHash);
      document.removeEventListener("click", onClick);
    };
  }, [selectTab]);

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = BANK_TAB_IDS.length - 1;
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = index === last ? 0 : index + 1;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = index === 0 ? last : index - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;
    else return;
    event.preventDefault();
    const tab = BANK_TAB_IDS[next]!;
    selectTab(tab);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="bp-tabs" data-enhanced={enhanced ? "true" : "false"}>
      <div
        className="bp-tabs__list-wrap"
        role="presentation"
      >
        <div
          className="bp-tabs__list"
          role="tablist"
          aria-label="Sections du comparatif bancaire"
        >
          {BANK_TAB_IDS.map((tabId, index) => {
            const selected = active === tabId;
            return (
              <button
                key={tabId}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                type="button"
                role="tab"
                id={`${baseId}-tab-${tabId}`}
                className={`bp-tabs__tab${selected ? " is-active" : ""}`}
                aria-selected={selected}
                aria-controls={`${baseId}-panel-${tabId}`}
                tabIndex={enhanced ? (selected ? 0 : -1) : 0}
                onClick={() => selectTab(tabId)}
                onKeyDown={(event) => onTabKeyDown(event, index)}
              >
                {TAB_LABELS[tabId]}
              </button>
            );
          })}
        </div>
      </div>

      {BANK_TAB_IDS.map((tabId) => {
        const selected = active === tabId;
        return (
          <div
            key={tabId}
            role="tabpanel"
            id={`${baseId}-panel-${tabId}`}
            aria-labelledby={`${baseId}-tab-${tabId}`}
            className="bp-tabs__panel"
            hidden={enhanced ? !selected : false}
            tabIndex={0}
          >
            {PANEL_CONTENT[tabId]}
          </div>
        );
      })}
    </div>
  );
}
