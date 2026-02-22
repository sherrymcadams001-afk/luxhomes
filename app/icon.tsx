import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0C1628, #070D18)",
          borderRadius: "6px",
        }}
      >
        <span
          style={{
            fontSize: "22px",
            fontFamily: "Georgia, serif",
            fontWeight: "bold",
            color: "#C9A96E",
            lineHeight: 1,
          }}
        >
          E
        </span>
      </div>
    ),
    { ...size }
  );
}
