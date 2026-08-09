import { ImageResponse } from "next/og";
import { GrossToNetOgImageJsx } from "@/site/salaire-brut-net/og-image-jsx";
import {
  buildNetToGrossStaticOgRenderModel,
  getNetToGrossOgFonts,
  NET_TO_GROSS_OG_CONTENT_TYPE,
  NET_TO_GROSS_OG_SIZE,
} from "@/site/salaire-net-brut/og-image";

export const runtime = "nodejs";
export const alt = "Salaires nets mensuels convertis en brut";
export const size = NET_TO_GROSS_OG_SIZE;
export const contentType = NET_TO_GROSS_OG_CONTENT_TYPE;

export default async function NetToGrossHubOpenGraphImage() {
  try {
    const model = await buildNetToGrossStaticOgRenderModel({
      headline: "SALAIRES NETS → BRUT",
      question: "Tous les montants mensuels",
    });
    let fonts: Awaited<ReturnType<typeof getNetToGrossOgFonts>> | null = null;
    try {
      fonts = await getNetToGrossOgFonts();
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
          <div style={{ display: "flex", fontSize: 64, fontWeight: 700 }}>SALAIRES NETS → BRUT</div>
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
