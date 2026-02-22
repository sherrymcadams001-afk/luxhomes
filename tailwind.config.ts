import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ── Deep backgrounds (warmer & slightly brighter) ── */
        void: "#070D18",
        navy: {
          DEFAULT: "#0C1628",
          light: "#122040",
          dark: "#050A14",
        },
        charcoal: {
          DEFAULT: "#1C2B4A",
          light: "#273A5C",
          dark: "#0F1828",
        },
        concrete: "#14223A",

        /* ── Text hierarchy ───────────────────────── */
        crisp: "#F8FAFC",
        silver: {
          DEFAULT: "#8899AA",
          light: "#B8C4D0",
          bright: "#E2E8F0",
        },

        /* ── Warm luxury accent ───────────────────── */
        champagne: {
          DEFAULT: "#C9A96E",
          light: "#DFC49A",
          dark: "#A68B4B",
          muted: "#C9A96E",
        },
        accent: "#C9A96E",
      },
      fontFamily: {
        sans: ['"Inter"', "system-ui", "sans-serif"],
        display: ['"Playfair Display"', "Georgia", "serif"],
      },
      animation: {
        "vault-lock": "vaultLock 2s ease-in-out forwards",
        shimmer: "shimmer 3s linear infinite",
        "fade-in": "fadeIn 0.8s ease-out forwards",
        glow: "glow 4s ease-in-out infinite alternate",
        grain: "grain 8s steps(10) infinite",
      },
      keyframes: {
        vaultLock: {
          "0%": { transform: "scaleY(1)", opacity: "1" },
          "50%": { transform: "scaleY(0.02)", opacity: "0.6" },
          "100%": { transform: "scaleY(0)", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glow: {
          "0%": { opacity: "0.4" },
          "100%": { opacity: "0.8" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -10%)" },
          "20%": { transform: "translate(-15%, 5%)" },
          "30%": { transform: "translate(7%, -25%)" },
          "40%": { transform: "translate(-5%, 25%)" },
          "50%": { transform: "translate(-15%, 10%)" },
          "60%": { transform: "translate(15%, 0%)" },
          "70%": { transform: "translate(0%, 15%)" },
          "80%": { transform: "translate(3%, 35%)" },
          "90%": { transform: "translate(-10%, 10%)" },
        },
      },
      backgroundImage: {
        "radial-warm":
          "radial-gradient(ellipse at 30% 0%, rgba(201,169,110,0.07) 0%, transparent 60%)",
        "radial-cool":
          "radial-gradient(ellipse at 70% 100%, rgba(136,153,170,0.05) 0%, transparent 60%)",
        "gradient-luma":
          "linear-gradient(180deg, rgba(18, 32, 64, 0.5) 0%, rgba(7, 13, 24, 0) 100%)",
        "gradient-depth":
          "linear-gradient(168deg, rgba(28, 43, 74, 0.4) 0%, rgba(7, 13, 24, 0.1) 100%)",
      },
      boxShadow: {
        luma: "0 4px 24px rgba(0,0,0,0.3), 0 1px 4px rgba(0,0,0,0.2)",
        "luma-lg": "0 8px 40px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.25)",
        "luma-xl": "0 16px 60px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.3)",
        "inner-glow": "inset 0 1px 0 rgba(255,255,255,0.04), inset 0 0 20px rgba(201,169,110,0.02)",
        "champagne-sm": "0 0 20px rgba(201,169,110,0.08)",
        "champagne-md": "0 0 40px rgba(201,169,110,0.06), 0 0 80px rgba(201,169,110,0.03)",
      },
    },
  },
  plugins: [],
};

export default config;
