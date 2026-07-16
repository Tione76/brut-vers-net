import type { FamilySituation } from "./personnalise/types";

export function needsSpouse(situation: FamilySituation): boolean {
  return situation === "married" || situation === "pacs";
}
