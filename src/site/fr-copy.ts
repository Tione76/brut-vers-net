/** Pluriel français : 0 et tout nombre autre que ±1 prennent le pluriel. */
export function formatCountNoun(
  count: number,
  singular: string,
  plural: string,
): string {
  const rounded = Math.trunc(count);
  return `${rounded} ${Math.abs(rounded) === 1 ? singular : plural}`;
}

export function formatYearsFr(years: number): string {
  return formatCountNoun(years, "an", "ans");
}

export function formatDaysFr(days: number): string {
  return formatCountNoun(days, "jour", "jours");
}

export function formatCalendarDaysFr(days: number): string {
  return formatCountNoun(days, "jour calendaire", "jours calendaires");
}

export function formatCompletedYearsFr(years: number): string {
  return formatCountNoun(years, "an révolu", "ans révolus");
}
