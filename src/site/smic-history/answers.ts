import { SMIC_HISTORY_EDITORIAL_YEAR } from "./constants";
import {
  emptyCell,
  formatEuro,
  formatFrancs,
  formatFrenchDate,
  formatPercent,
} from "./format";
import { entriesForYear, firstEntryForYear } from "./series";
import type { SmicHistoryEntry, YearAnswer } from "./types";

function hourlyLabel(entry: SmicHistoryEntry): string {
  if (entry.hourlyGross == null) return emptyCell();
  if (entry.currency === "FRF") return formatFrancs(entry.hourlyGross);
  if (entry.currency === "FRF_OLD") return `${formatFrancs(entry.hourlyGross, 0)} (anciens francs)`;
  return formatEuro(entry.hourlyGross);
}

function monthlyLabel(entry: SmicHistoryEntry): string | null {
  if (entry.monthlyGross == null) return null;
  const amount =
    entry.currency === "FRF" ? formatFrancs(entry.monthlyGross) : formatEuro(entry.monthlyGross);
  return `${amount} brut`;
}

function durationPhrase(entry: SmicHistoryEntry): string {
  if (entry.weeklyHours === 35) return "pour 35 heures hebdomadaires";
  if (entry.weeklyHours === 39) return "pour 39 heures hebdomadaires (169 h / mois)";
  if (entry.weeklyHours === 40) return "pour 40 heures hebdomadaires";
  return "selon la durée de référence de l'époque";
}

function legalRows(year: number): SmicHistoryEntry[] {
  return entriesForYear(year).filter(
    (entry) => entry.seriesKind === "legal" || entry.seriesKind === "continuation",
  );
}

function buildLegalYearText(year: number, rows: SmicHistoryEntry[]): string {
  if (rows.length === 1) {
    const entry = rows[0]!;
    const date = entry.effectiveDate ? formatFrenchDate(entry.effectiveDate) : String(year);
    const monthly = monthlyLabel(entry);
    const monthlyPhrase = monthly
      ? ` ${durationPhrase(entry)}, cela correspondait à ${monthly} par mois.`
      : ` Le montant mensuel n'est pas publié sur la même base que le SMIC actuel.`;
    if (entry.seriesKind === "continuation") {
      return `Pendant toute l'année ${year}, le taux applicable est resté de ${hourlyLabel(entry)} brut de l'heure, taux entré en vigueur le ${date}.${monthlyPhrase} Aucun nouveau taux n'est entré en vigueur en ${year}.`;
    }
    const extra = entry.note?.includes("35 heures")
      ? ` ${entry.note}`
      : " Aucun autre changement de taux n'est intervenu cette année-là.";
    return `En ${year}, le SMIC horaire brut est passé à ${hourlyLabel(entry)} le ${date}.${monthlyPhrase}${extra}`.trim();
  }

  const parts = rows.map((entry, index) => {
    const date = entry.effectiveDate ? formatFrenchDate(entry.effectiveDate) : "";
    const prefix = index === 0 ? "de" : index === rows.length - 1 ? "puis de" : "de";
    return `${prefix} ${hourlyLabel(entry)} à partir du ${date}`;
  });
  return `En ${year}, il n'existait pas un montant unique valable toute l'année. Le SMIC horaire brut était ${parts.join(", ")}. Tous ces montants sont bruts.`;
}

export function buildYearAnswer(year: number): YearAnswer {
  const heading =
    year === SMIC_HISTORY_EDITORIAL_YEAR
      ? `Quel est le SMIC en ${year} ?`
      : year < 1970
        ? `Quel était le salaire minimum en ${year} ?`
        : `Quel était le SMIC en ${year} ?`;

  if (year === 1950) {
    const entry = firstEntryForYear(1950)!;
    return {
      year,
      heading,
      text: `En 1950, le SMIC n'existait pas encore. Le premier salaire minimum national français, appelé SMIG, est créé par la loi du 11 février 1950. ${entry.note} Ces montants sont exprimés en anciens francs.`,
    };
  }

  if (year === 1960) {
    const entry = firstEntryForYear(1960)!;
    return {
      year,
      heading,
      text: `En 1960, le SMIC n'existait pas encore sous ce nom. Le salaire minimum applicable était le SMIG. L'Insee publie, pour cette année, une moyenne annuelle de ${formatEuro(entry.hourlyGross!)} brut de l'heure après conversion en euros (série SMIC39). Ce chiffre n'est pas le taux du Journal officiel et n'exprime pas le pouvoir d'achat actuel.`,
    };
  }

  if (year === 1970) {
    const entry = firstEntryForYear(1970)!;
    return {
      year,
      heading,
      text: `Le SMIC est créé par la loi du 2 janvier 1970. Pour 1970, l'Insee ne publie pas un taux unique à une date d'effet : elle retient une moyenne annuelle de ${formatEuro(entry.hourlyGross!)} brut de l'heure (série SMIC39). Ce chiffre est un équivalent en euros, déjà converti par l'Insee. Ce n'est ni un taux légal applicable à une date précise, ni un salaire qui aurait été versé en euros à l'époque.`,
    };
  }

  if (year < 1980) {
    const entry = firstEntryForYear(year);
    if (!entry || entry.hourlyGross == null) {
      return {
        year,
        heading,
        text: `Pour ${year}, les archives officielles mobilisées ici ne fournissent pas un taux légal unique à une date d'effet. ${year < 1970 ? "Le salaire minimum s'appelait alors le SMIG." : "Le SMIC existait déjà, mais la série Insee 1375188 des taux à date d'effet commence en 1980."}`,
      };
    }
    return {
      year,
      heading,
      text: `${year < 1970 ? `En ${year}, le SMIC n'existait pas encore sous ce nom. Le salaire minimum applicable était le SMIG.` : `En ${year}, le salaire minimum applicable était le SMIC.`} L'Insee publie une moyenne annuelle de ${formatEuro(entry.hourlyGross)} brut de l'heure après conversion en euros (série SMIC39, ${entry.weeklyHours} h). Ce n'est ni un taux du Journal officiel à une date précise, ni une valeur en euros constants.`,
    };
  }

  const rows = legalRows(year);
  if (year === 2002) {
    const july = rows.find((entry) => entry.effectiveDate === "2002-07-01");
    const previous = firstEntryForYear(2001);
    return {
      year,
      heading,
      text: `En 2002, le SMIC horaire brut déjà applicable depuis le 1er juillet 2001 (${previous ? hourlyLabel(previous) : "6,67 €"}) continue au 1er janvier, date de mise en circulation de l'euro fiduciaire. À compter du ${july?.effectiveDate ? formatFrenchDate(july.effectiveDate) : "1er juillet 2002"}, le SMIC horaire brut s'élève à ${july ? hourlyLabel(july) : "6,83 €"}. Le montant mensuel publié par l'Insee pour 169 h est alors de ${july?.monthlyGross != null ? formatEuro(july.monthlyGross) : emptyCell()} brut. Le passage à l'euro est une conversion monétaire, pas une mesure de pouvoir d'achat.`,
    };
  }

  return {
    year,
    heading,
    text: buildLegalYearText(year, rows),
  };
}

export function hourlyCell(entry: SmicHistoryEntry): string {
  if (entry.year === 1950) return "64 à 78 F selon les zones";
  if (entry.hourlyGross == null) return emptyCell();
  if (entry.currency === "FRF") return `${formatFrancs(entry.hourlyGross)} brut`;
  return `${hourlyLabel(entry)} brut`;
}

export function monthlyCell(entry: SmicHistoryEntry): string {
  if (entry.monthlyGross == null) return emptyCell();
  const amount =
    entry.currency === "FRF" ? formatFrancs(entry.monthlyGross) : formatEuro(entry.monthlyGross);
  return `${amount} brut`;
}

export function changeCell(entry: SmicHistoryEntry): string {
  if (entry.changePercent == null) return emptyCell();
  if (entry.changePercent === 0) return "inchangé";
  return formatPercent(entry.changePercent);
}

export function dateCell(entry: SmicHistoryEntry): string {
  if (entry.seriesKind === "insee-annual-average") return "moyenne annuelle";
  if (entry.effectiveDate) return formatFrenchDate(entry.effectiveDate);
  return emptyCell();
}
