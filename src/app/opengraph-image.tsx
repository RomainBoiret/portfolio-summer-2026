import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";
import { en } from "@/i18n/dictionaries/en";

export const alt = `${siteConfig.name} - ${en.meta.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#F3EBE0",
          color: "#12182A",
          padding: "80px",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 64,
            height: 4,
            background: "#C9A227",
            marginBottom: 36,
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 800,
            letterSpacing: "-0.05em",
            lineHeight: 0.95,
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 28,
            color: "#5A5366",
          }}
        >
          {en.site.tagline}
        </div>
      </div>
    ),
    { ...size },
  );
}
