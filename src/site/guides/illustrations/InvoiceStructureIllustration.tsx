import { ILLU as c } from "./tokens";

/** Anatomie d'une facture — 4 zones numérotées */
export function InvoiceStructureIllustration() {
  const zones = [
    { n: "1", title: "En-tête", desc: "Vendeur · Client · N° · Date", y: 48, h: 88 },
    { n: "2", title: "Lignes", desc: "Désignation · Qté · Prix HT", y: 152, h: 120 },
    { n: "3", title: "Totaux", desc: "HT · TVA · TTC", y: 288, h: 72, x: 380, w: 300 },
    { n: "4", title: "Paiement", desc: "Échéance · RIB · Pénalités", y: 288, h: 72, x: 40, w: 320 },
  ];

  return (
    <svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Anatomie d'une facture conforme en 4 zones">
      <rect width="720" height="400" fill={c.surfaceAlt} />
      <rect x="32" y="24" width="656" height="352" rx="8" fill={c.surface} stroke={c.border} strokeWidth="1.5" />

      {zones.map((z) => (
        <g key={z.n}>
          <rect
            x={z.x ?? 40}
            y={z.y}
            width={z.w ?? 620}
            height={z.h}
            rx="6"
            fill={c.brandLight}
            stroke={c.brandMuted}
            strokeWidth="1"
            strokeDasharray="5 3"
          />
          <circle cx={(z.x ?? 40) + 20} cy={z.y + 22} r="14" fill={c.brand} />
          <text x={(z.x ?? 40) + 20} y={z.y + 27} textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700" fontFamily={c.font}>
            {z.n}
          </text>
          <text x={(z.x ?? 40) + 44} y={z.y + 20} fill={c.brand} fontSize="13" fontWeight="700" fontFamily={c.font}>
            {z.title}
          </text>
          <text x={(z.x ?? 40) + 44} y={z.y + 38} fill={c.textMuted} fontSize="11" fontFamily={c.font}>
            {z.desc}
          </text>
        </g>
      ))}

      {/* Mini lignes dans zone 2 */}
      <rect x="56" y="196" width="588" height="22" fill={c.brand} opacity="0.08" rx="3" />
      <rect x="56" y="226" width="588" height="22" fill={c.surface} stroke={c.borderLight} rx="3" />
      <rect x="56" y="256" width="588" height="22" fill={c.surface} stroke={c.borderLight} rx="3" />
    </svg>
  );
}
