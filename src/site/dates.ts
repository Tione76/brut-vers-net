export const FRENCH_MONTHS = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
] as const;

export const FRENCH_WEEKDAYS_SHORT = ["L", "M", "M", "J", "V", "S", "D"] as const;

function pad2(value: number): string {
  return String(value).padStart(2, "0");
}

/** Construit une date ISO YYYY-MM-DD si le calendrier civil est valide. */
export function toIsoDateOnly(year: number, month: number, day: number): string | null {
  if (
    !Number.isInteger(year) ||
    !Number.isInteger(month) ||
    !Number.isInteger(day) ||
    year < 1000 ||
    year > 9999 ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31
  ) {
    return null;
  }
  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }
  return `${year}-${pad2(month)}-${pad2(day)}`;
}

/** Affiche une date ISO en jj/mm/aaaa. */
export function formatIsoToFrenchInput(isoDate: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate.trim());
  if (!match) return "";
  const iso = toIsoDateOnly(Number(match[1]), Number(match[2]), Number(match[3]));
  if (!iso) return "";
  return `${match[3]}/${match[2]}/${match[1]}`;
}

/**
 * Interprète une saisie française jj/mm/aaaa.
 * 05/10/2026 = 5 octobre 2026, jamais le 10 mai.
 * Accepte aussi un collage ISO YYYY-MM-DD.
 */
export function parseFrenchDateInput(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  const isoMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(trimmed);
  if (isoMatch) {
    return toIsoDateOnly(Number(isoMatch[1]), Number(isoMatch[2]), Number(isoMatch[3]));
  }

  const compact = /^(\d{2})(\d{2})(\d{4})$/.exec(trimmed);
  if (compact) {
    return toIsoDateOnly(Number(compact[3]), Number(compact[2]), Number(compact[1]));
  }

  const french = /^(\d{1,2})[/.\-](\d{1,2})[/.\-](\d{4})$/.exec(trimmed);
  if (!french) return null;
  return toIsoDateOnly(Number(french[3]), Number(french[2]), Number(french[1]));
}

/**
 * Formate une date calendaire (YYYY-MM-DD) en français long.
 * Interprète la date en local pour rester alignée avec la partie jour du Schema.org.
 */
export function formatLongDateFr(isoDate: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(isoDate);
  if (!match) {
    return new Date(isoDate).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  return new Date(year, month - 1, day).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
