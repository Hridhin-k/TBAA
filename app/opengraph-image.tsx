import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/config";

export const dynamic = "force-static";
export const alt = `${siteConfig.name} — Premium Advertising Academy`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#f7f5f1",
          color: "#111111",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#b85c38",
          }}
        >
          Applications open · First batch 2026
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 96,
              fontWeight: 600,
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              marginBottom: 12,
            }}
          >
            The Better
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 96,
              fontWeight: 600,
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              marginBottom: 24,
            }}
          >
            Academy
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 32,
              color: "#666666",
              maxWidth: 600,
              lineHeight: 1.4,
            }}
          >
            Where advertising is taught the way it is made.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            width: 96,
            height: 6,
            backgroundColor: "#b85c38",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
