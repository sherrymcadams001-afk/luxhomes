import { ImageResponse } from "next/og";

export const alt = "ENVY Luxury Homes — Ultra-Luxury South African Real Estate";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0C1628 0%, #070D18 60%, #0C1628 100%)",
          position: "relative",
        }}
      >
        {/* Warm gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 30% 50%, rgba(201,169,110,0.08) 0%, transparent 60%)",
          }}
        />

        {/* Top border accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, transparent 10%, #C9A96E 50%, transparent 90%)",
          }}
        />

        {/* Diamond icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              border: "3px solid #C9A96E",
              transform: "rotate(45deg)",
            }}
          />
        </div>

        {/* Brand name */}
        <h1
          style={{
            fontSize: "96px",
            fontFamily: "Georgia, serif",
            letterSpacing: "0.2em",
            color: "#F8FAFC",
            lineHeight: 1,
            margin: 0,
          }}
        >
          ENVY
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "18px",
            letterSpacing: "0.5em",
            color: "#C9A96E",
            textTransform: "uppercase",
            marginTop: "12px",
          }}
        >
          Luxury Homes
        </p>

        {/* Divider */}
        <div
          style={{
            width: "120px",
            height: "1px",
            background: "linear-gradient(90deg, transparent, #C9A96E, transparent)",
            marginTop: "40px",
            marginBottom: "24px",
          }}
        />

        {/* Tagline */}
        <p
          style={{
            fontSize: "22px",
            color: "#ABB5C4",
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            maxWidth: "700px",
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          South Africa&apos;s most coveted addresses — Clifton, Camps Bay &amp; Sandton
        </p>

        {/* Bottom accent */}
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            display: "flex",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <span
            style={{
              fontSize: "11px",
              letterSpacing: "0.4em",
              color: "rgba(201,169,110,0.4)",
              textTransform: "uppercase",
            }}
          >
            envyhomes.co.za
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
