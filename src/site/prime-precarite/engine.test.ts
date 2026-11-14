import { describe, expect, it } from "vitest";
import {
  leaveBaseWithPrecarite,
  leaveIndemnityTenth,
  precariteGross,
  totalContractGross,
} from "./data";

describe("calculs prime de précarité", () => {
  it("calcule les exemples du guide", () => {
    const base = totalContractGross(2000, 6);
    expect(base).toBe(12000);
    expect(precariteGross(base, 0.1)).toBe(1200);
    expect(precariteGross(base, 0.06)).toBe(720);
    expect(leaveBaseWithPrecarite(12000, 1200)).toBe(13200);
    expect(leaveIndemnityTenth(13200)).toBe(1320);
    expect(1200 + 1320).toBe(2520);
    expect(3 * 2000 + 3 * 2200).toBe(12600);
    expect(precariteGross(12600, 0.1)).toBe(1260);
    expect(precariteGross(totalContractGross(1500, 6), 0.1)).toBe(900);
    expect(precariteGross(totalContractGross(2000, 3), 0.1)).toBe(600);
  });
});
