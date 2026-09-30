import type { NavDropdownItem } from "./NavDropdownMenu";
import {
  SMIC_HISTORY_H1,
  SMIC_HISTORY_PATH,
} from "@/site/smic-history/constants";

/** Sous-menus du dropdown header « SMIC » (enrichi au fil des pages pilier). */
export const smicNavigation: NavDropdownItem[] = [
  {
    href: "/smic",
    shortTitle: "SMIC: montants brut et net",
    title: "SMIC 2026 : quel est le montant brut et net ?",
  },
  {
    href: "/smic-selon-nombre-heures",
    shortTitle: "SMIC selon le nombre d'heures",
    title: "SMIC selon le nombre d'heures : brut et net de 10 h à 44 h",
  },
  {
    href: "/smic-hotelier",
    shortTitle: "SMIC hôtelier (HCR)",
    title: "SMIC hôtelier 2026 : grille HCR et salaires à 35 h et 39 h",
  },
  {
    href: SMIC_HISTORY_PATH,
    shortTitle: "Évolution du SMIC depuis 1950",
    title: SMIC_HISTORY_H1,
  },
];
