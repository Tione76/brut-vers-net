import type { GrossToNetOgRenderModel } from "./og-image";

/**
 * Composition visuelle ImageResponse (Satori).
 * Flexbox uniquement ; marges de sécurité confortables.
 */
export function GrossToNetOgImageJsx({ model }: { model: GrossToNetOgRenderModel }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#0f172a",
      }}
    >
      {/* ImageResponse / Satori n’accepte pas next/image */}
      {/* eslint-disable-next-line @next/next/no-img-element -- data URL pour next/og */}
      <img
        src={model.backgroundDataUrl}
        alt=""
        width={1200}
        height={630}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundImage:
            "linear-gradient(105deg, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.78) 42%, rgba(15,23,42,0.42) 72%, rgba(15,23,42,0.28) 100%)",
        }}
      />

      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "64px 72px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "96px",
            height: "8px",
            borderRadius: "999px",
            backgroundColor: model.orange,
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "980px",
            gap: "18px",
          }}
        >
          <div
            style={{
              display: "flex",
              color: "#ffffff",
              fontSize: "78px",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              fontFamily: "Source Sans 3",
            }}
          >
            {model.headline}
          </div>
          <div
            style={{
              display: "flex",
              color: "#ffffff",
              fontSize: "42px",
              fontWeight: 600,
              lineHeight: 1.2,
              fontFamily: "Source Sans 3",
            }}
          >
            {model.question}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              color: model.orange,
              fontSize: "28px",
              fontWeight: 600,
              letterSpacing: "0.02em",
              fontFamily: "Source Sans 3",
            }}
          >
            {model.brand}
          </div>
          <div
            style={{
              display: "flex",
              color: "rgba(232, 234, 237, 0.72)",
              fontSize: "18px",
              fontWeight: 600,
              fontFamily: "Source Sans 3",
            }}
          >
            {model.credit}
          </div>
        </div>
      </div>
    </div>
  );
}
