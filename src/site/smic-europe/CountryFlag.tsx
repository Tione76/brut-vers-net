/**
 * Drapeaux SVG locaux 20×15, sans fetch ni dépendance.
 * Fichiers : public/images/flags/{iso}.svg (Drapeauxdespays.fr, domaine public).
 * Décoratifs : le nom du pays reste le texte accessible.
 */

const FLAG_ISO: Record<string, string> = { EL: "GR" };

const FLAG_CODES = new Set([
  "AD",
  "AL",
  "AM",
  "AT",
  "AZ",
  "BA",
  "BE",
  "BG",
  "BY",
  "CH",
  "CY",
  "CZ",
  "DE",
  "DK",
  "EE",
  "ES",
  "FI",
  "FR",
  "GB",
  "GE",
  "GR",
  "HR",
  "HU",
  "IE",
  "IS",
  "IT",
  "LI",
  "LT",
  "LU",
  "LV",
  "MC",
  "MD",
  "ME",
  "MK",
  "MT",
  "NL",
  "NO",
  "PL",
  "PT",
  "RO",
  "RS",
  "SE",
  "SI",
  "SK",
  "SM",
  "TR",
  "UA",
  "VA",
  "XK",
]);

export function flagIso(code: string): string {
  return FLAG_ISO[code] ?? code;
}

export function flagSrc(code: string): string {
  return `/images/flags/${flagIso(code).toLowerCase()}.svg`;
}

export function CountryFlag({
  code,
  variant = "inline",
}: {
  code: string;
  variant?: "inline" | "section";
}) {
  const isSection = variant === "section";
  return (
    // eslint-disable-next-line @next/next/no-img-element -- SVG locaux, pas d'optimisation next/image
    <img
      className={isSection ? "country-flag country-flag--section" : "country-flag"}
      src={flagSrc(code)}
      width={isSection ? 88 : 20}
      height={isSection ? 66 : 15}
      alt=""
      aria-hidden="true"
      decoding="async"
    />
  );
}

export function hasCountryFlag(code: string): boolean {
  return FLAG_CODES.has(flagIso(code).toUpperCase());
}
