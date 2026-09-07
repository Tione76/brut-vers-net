import { describe, expect, it } from "vitest";
import { smicNavigation } from "./smic";
import { guidesNavigation } from "@/site/guides/navigation";

describe("navigation header SMIC", () => {
  it("expose un seul sous-menu vers /smic avec le libellé exact", () => {
    expect(smicNavigation).toHaveLength(1);
    expect(smicNavigation[0]?.href).toBe("/smic");
    expect(smicNavigation[0]?.shortTitle).toBe("SMIC: montants brut et net");
  });

  it("n'apparaît plus dans le dropdown Nos guides", () => {
    expect(guidesNavigation.some((item) => item.slug === "smic")).toBe(false);
  });
});
