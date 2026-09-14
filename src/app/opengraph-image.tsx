import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = "Accent Characters — copy & paste accent letters";
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
          background: "#f7f4ed",
          color: "#171310",
          padding: 64,
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: 12,
              background: "#171310",
              color: "#f7f4ed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
            }}
          >
            ä
          </div>
          <div style={{ fontSize: 34, fontWeight: 600, display: "flex" }}>Accent Characters</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 86, fontWeight: 700, lineHeight: 1.02, letterSpacing: -2 }}>
            Accent letters,
          </div>
          <div style={{ display: "flex", fontSize: 86, fontWeight: 700, lineHeight: 1.02, letterSpacing: -2 }}>
            <span style={{ color: "#ff4d00", fontStyle: "italic" }}>copy</span>
            <span> &amp; paste — instantly.</span>
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 30, color: "#575046" }}>
            à á â ã ä å æ ç é è ê ë í î ï ñ ó ô õ ö ø ß ù ú û ü ý þ ÿ · 600+ characters · ALT codes included
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#575046" }}>
          <span>{site.url.replace("https://", "")}</span>
          <span>A–Z accent letter reference</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
