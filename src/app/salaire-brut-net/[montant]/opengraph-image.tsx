import { ImageResponse } from "next/og";
import {
  GROSS_TO_NET_AMOUNTS,
  formatGrossShort,
  parseGrossToNetMontantParam,
} from "@/site/salaire-brut-net";
import { GrossToNetOgImageJsx } from "@/site/salaire-brut-net/og-image-jsx";
import {
  buildGrossToNetOgRenderModel,
  getGrossToNetOgFonts,
  GROSS_TO_NET_OG_CONTENT_TYPE,
  GROSS_TO_NET_OG_SIZE,
} from "@/site/salaire-brut-net/og-image";

export const runtime = "nodejs";
export const alt = "Salaire brut mensuel converti en net";
export const size = GROSS_TO_NET_OG_SIZE;
export const contentType = GROSS_TO_NET_OG_CONTENT_TYPE;

export function generateStaticParams() {
  return GROSS_TO_NET_AMOUNTS.map((montant) => ({
    montant: String(montant),
  }));
}

interface ImageProps {
  params: Promise<{ montant: string }>;
}

/**
 * Image sociale dynamique 1200×630 pour la série
 * « Quel salaire net mensuel pour X € brut ? ».
 * Générée au build (SSG) ; une seule photo source, texte injecté par montant.
 */
export default async function GrossToNetOpenGraphImage({ params }: ImageProps) {
  const { montant: raw } = await params;
  const grossMonthly = parseGrossToNetMontantParam(raw);

  if (grossMonthly === null) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#0f172a",
            color: "#ffffff",
            fontSize: 48,
          }}
        >
          brut-vers-net.fr
        </div>
      ),
      { ...size },
    );
  }

  try {
    const model = await buildGrossToNetOgRenderModel(grossMonthly);
    let fonts: Awaited<ReturnType<typeof getGrossToNetOgFonts>> | null = null;
    try {
      fonts = await getGrossToNetOgFonts();
    } catch {
      fonts = null;
    }

    return new ImageResponse(<GrossToNetOgImageJsx model={model} />, {
      ...size,
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
      },
      ...(fonts
        ? {
            fonts: [
              {
                name: "Source Sans 3",
                data: fonts.regular,
                style: "normal" as const,
                weight: 600 as const,
              },
              {
                name: "Source Sans 3",
                data: fonts.bold,
                style: "normal" as const,
                weight: 700 as const,
              },
            ],
          }
        : {}),
    });
  } catch {
    // Fallback lisible si photo/police indisponibles : carte marque sans photo.
    const headline = `${formatGrossShort(grossMonthly)} BRUT / MOIS`;
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: 72,
            backgroundColor: "#0f172a",
            color: "#ffffff",
          }}
        >
          <div style={{ display: "flex", fontSize: 72, fontWeight: 700 }}>{headline}</div>
          <div style={{ display: "flex", fontSize: 40, marginTop: 16 }}>Combien en net ?</div>
          <div style={{ display: "flex", fontSize: 28, marginTop: 28, color: "#f28539" }}>
            brut-vers-net.fr
          </div>
        </div>
      ),
      { ...size },
    );
  }
}
