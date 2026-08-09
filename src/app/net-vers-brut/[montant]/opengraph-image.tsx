import { ImageResponse } from "next/og";
import {
  NET_TO_GROSS_AMOUNTS,
  formatNetShort,
  parseNetToGrossMontantParam,
} from "@/site/salaire-net-brut";
import {
  buildNetToGrossOgRenderModel,
  getNetToGrossOgFonts,
  NET_TO_GROSS_OG_CONTENT_TYPE,
  NET_TO_GROSS_OG_SIZE,
} from "@/site/salaire-net-brut/og-image";
import { GrossToNetOgImageJsx } from "@/site/salaire-brut-net/og-image-jsx";

export const runtime = "nodejs";
export const alt = "Salaire net mensuel converti en brut";
export const size = NET_TO_GROSS_OG_SIZE;
export const contentType = NET_TO_GROSS_OG_CONTENT_TYPE;

export function generateStaticParams() {
  return NET_TO_GROSS_AMOUNTS.map((montant) => ({
    montant: String(montant),
  }));
}

interface ImageProps {
  params: Promise<{ montant: string }>;
}

/**
 * Image sociale 1200×630 pour la série « Combien gagner brut pour X € net ? ».
 */
export default async function NetToGrossOpenGraphImage({ params }: ImageProps) {
  const { montant: raw } = await params;
  const netMonthly = parseNetToGrossMontantParam(raw);

  if (netMonthly === null) {
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
    const model = await buildNetToGrossOgRenderModel(netMonthly);
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
    const headline = `${formatNetShort(netMonthly)} NET / MOIS`;
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
          <div style={{ display: "flex", fontSize: 40, marginTop: 16 }}>Combien en brut ?</div>
          <div style={{ display: "flex", fontSize: 28, marginTop: 28, color: "#f28539" }}>
            brut-vers-net.fr
          </div>
        </div>
      ),
      { ...size },
    );
  }
}
