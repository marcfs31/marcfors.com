import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${SITE_NAME} — Frontend software engineer`;

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(180deg, #141924 0%, #10141c 55%)",
          color: "#efe6d2",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, color: "#d4b07a", fontSize: 22, letterSpacing: 6, textTransform: "uppercase" }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              border: "2px solid #d4b07a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: 12, height: 12, borderRadius: 12, background: "#7dcf9a" }} />
          </div>
          {SITE_NAME}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 88, lineHeight: 1, letterSpacing: -2 }}>{SITE_NAME}</div>
          <div style={{ fontSize: 36, color: "#c9bba0" }}>Frontend software engineer</div>
          <div style={{ fontSize: 22, color: "#7dcf9a", letterSpacing: 3, textTransform: "uppercase" }}>
            Open to work · Barcelona
          </div>
        </div>
      </div>
    ),
    size,
  );
}
