import { describe, expect, it } from "vitest";
import { buildHeaderNavEntries } from "./header-nav";
import { smicNavigation } from "./smic";
import { toolsNavigation } from "./tools";
import { guidesNavigation } from "@/site/guides/navigation";
import { mapGuidesToNavItems } from "./guide-nav-items";

describe("buildHeaderNavEntries", () => {
  it("conserve l'ordre et les libellés du header (outils, SMIC, guides, FAQ)", () => {
    const entries = buildHeaderNavEntries({
      toolsNavigation,
      guidesNavigation,
      flatLinks: [{ label: "FAQ", href: "/faq" }],
    });

    expect(entries.map((entry) => entry.label)).toEqual([
      "Nos outils",
      "SMIC",
      "Nos guides",
      "FAQ",
    ]);

    const tools = entries[0];
    const smic = entries[1];
    const guides = entries[2];
    const faq = entries[3];

    expect(tools.kind).toBe("dropdown");
    expect(smic.kind).toBe("dropdown");
    expect(guides.kind).toBe("dropdown");
    expect(faq.kind).toBe("link");

    if (tools.kind === "dropdown") {
      expect(tools.items).toEqual(toolsNavigation);
    }
    if (smic.kind === "dropdown") {
      expect(smic.items).toEqual(smicNavigation);
    }
    if (guides.kind === "dropdown") {
      expect(guides.items).toEqual(mapGuidesToNavItems(guidesNavigation));
    }
    if (faq.kind === "link") {
      expect(faq.href).toBe("/faq");
    }
  });

  it("omet les dropdowns vides sans changer FAQ", () => {
    const entries = buildHeaderNavEntries({
      toolsNavigation: [],
      guidesNavigation: [],
      flatLinks: [{ label: "FAQ", href: "/faq" }],
    });

    expect(entries.map((entry) => entry.label)).toEqual(["SMIC", "FAQ"]);
  });
});
