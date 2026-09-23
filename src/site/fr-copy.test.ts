import { describe, expect, it } from "vitest";
import { formatLongDateFr } from "./dates";
import {
  formatCalendarDaysFr,
  formatCompletedYearsFr,
  formatDaysFr,
  formatYearsFr,
} from "./fr-copy";

describe("libellés français dynamiques", () => {
  it("singularise et pluralise les années et les jours", () => {
    expect(formatYearsFr(1)).toBe("1 an");
    expect(formatYearsFr(4)).toBe("4 ans");
    expect(formatYearsFr(0)).toBe("0 ans");
    expect(formatDaysFr(1)).toBe("1 jour");
    expect(formatDaysFr(118)).toBe("118 jours");
    expect(formatCalendarDaysFr(1)).toBe("1 jour calendaire");
    expect(formatCalendarDaysFr(118)).toBe("118 jours calendaires");
    expect(formatCompletedYearsFr(1)).toBe("1 an révolu");
    expect(formatCompletedYearsFr(4)).toBe("4 ans révolus");
  });

  it("formate les dates ISO en français long", () => {
    expect(formatLongDateFr("2026-09-27")).toBe("27 septembre 2026");
    expect(formatLongDateFr("2026-09-14")).toBe("14 septembre 2026");
  });
});
