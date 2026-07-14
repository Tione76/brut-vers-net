import {
  estimateNetMonthlyFromGross,
  example2500NonExecutive,
  formatEditorialEuro,
} from "../../home-editorial-data";

export const ex2500 = example2500NonExecutive();
export const exBrut = formatEditorialEuro(ex2500.grossMonthly);
export const exNet = formatEditorialEuro(ex2500.netMonthly);
export const exCotisations = formatEditorialEuro(ex2500.grossMonthly - ex2500.netMonthly);

export const ex3000Gross = 3000;
export const ex3000NetNonExecutive = formatEditorialEuro(
  estimateNetMonthlyFromGross(ex3000Gross, "nonExecutive"),
);
export const ex3000NetExecutive = formatEditorialEuro(
  estimateNetMonthlyFromGross(ex3000Gross, "executive"),
);
