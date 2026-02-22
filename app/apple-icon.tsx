import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
          borderRadius: "32px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Diamond shape using rotated square */}
          <div
            style={{
              width: "80px",
              height: "80px",
              border: "4px solid #C9A96E",
              transform: "rotate(45deg)",
              position: "absolute",
              top: "30px",
            }}
          />
          <span
            style={{
              fontSize: "72px",
              fontFamily: "Georgia, serif",
              fontWeight: "bold",
              color: "#C9A96E",
              lineHeight: 1,
              marginTop: "8px",
            }}
          >
            E
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
