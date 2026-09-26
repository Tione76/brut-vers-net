import { ImageResponse } from "next/og";
import { GrossToNetOgImageJsx } from "@/site/salaire-brut-net/og-image-jsx";
import {
  buildGrossToNetStaticOgRenderModel,
  getGrossToNetOgFonts,
  GROSS_TO_NET_OG_CONTENT_TYPE,
  GROSS_TO_NET_OG_SIZE,
} from "@/site/salaire-brut-net/og-image";

export const runtime = "nodejs";
export const alt = "Salaires bruts mensuels convertis en net";
export const size = GROSS_TO_NET_OG_SIZE;
export const contentType = GROSS_TO_NET_OG_CONTENT_TYPE;

/**
 * Une seule image 1200×630 pour toute la série /salaire-brut-net/[montant].
 * Les titres et descriptions de partage restent propres à chaque fiche.
 */
export default async function GrossToNetSeriesOpenGraphImage() {
  try {
    const model = await buildGrossToNetStaticOgRenderModel({
      headline: "SALAIRES BRUTS → NET",
      question: "Tous les montants mensuels",
    });
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
          <div style={{ display: "flex", fontSize: 64, fontWeight: 700 }}>SALAIRES BRUTS → NET</div>
          <div style={{ display: "flex", fontSize: 36, marginTop: 16 }}>
            Tous les montants mensuels
          </div>
          <div style={{ display: "flex", fontSize: 28, marginTop: 28, color: "#f28539" }}>
            brut-vers-net.fr
          </div>
        </div>
      ),
      { ...size },
    );
  }
}
