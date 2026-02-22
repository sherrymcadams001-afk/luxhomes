import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import Navigation from "@/components/Navigation";

export const runtime = "edge";

const SITE_URL = "https://envyhomes.co.za";
const SITE_NAME = "ENVY Luxury Homes";
const SITE_TITLE = "ENVY Luxury Homes — Ultra-Luxury South African Real Estate";
const SITE_DESCRIPTION =
  "Covet the exceptional. South Africa's most exclusive luxury estates in Clifton, Camps Bay, and Sandton. Private viewings by appointment.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "luxury homes",
    "South Africa",
    "Clifton",
    "Camps Bay",
    "Sandton",
    "real estate",
    "villa",
    "estate",
    "luxury rental",
    "Cape Town",
    "Johannesburg",
    "ultra luxury",
    "penthouse",
    "exclusive property",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    creator: "@envyluxuryhomes",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // WhatsApp and iMessage use OG tags above; these additional entries cover edge cases
  other: {
    "og:locale": "en_ZA",
    "og:site_name": SITE_NAME,
    "og:type": "website",
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#070D18",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon",
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#070D18" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="preload" href="/vid.mp4" as="video" type="video/mp4" />
      </head>
      <body className="min-h-screen bg-void text-crisp antialiased grain-overlay overflow-x-hidden">
        <StoreProvider>
          {/* Skip to content link for keyboard/screen reader users */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:px-4 focus:py-2 focus:bg-champagne focus:text-void focus:text-sm focus:font-semibold focus:outline-none"
          >
            Skip to main content
          </a>
          <Navigation />
          <main id="main-content" className="pt-[72px] min-h-[calc(100vh-72px)]" style={{ paddingLeft: 'env(safe-area-inset-left)', paddingRight: 'env(safe-area-inset-right)' }}>{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}

function Footer() {
  return (
    <footer
      className="relative"
      style={{ borderTop: "1px solid rgba(201,169,110,0.08)" }}
    >
      {/* Warm ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(201,169,110,0.03) 0%, transparent 60%)",
        }}
      />
      <div className="relative bg-navy-dark/80 backdrop-blur-sm">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h4 className="text-crisp font-display text-lg tracking-wide mb-4">
                ENVY
              </h4>
              <p className="text-silver-light text-sm leading-relaxed max-w-sm">
                Curated luxury stays across South Africa&apos;s most
                sought-after locations. Clifton. Camps Bay. Sandton.
              </p>
            </div>
            <div>
              <h5 className="text-champagne text-[11px] tracking-[0.25em] uppercase mb-4">
                Contact
              </h5>
              <div className="space-y-2 text-sm text-silver-light">
                <p>concierge@envyhomes.co.za</p>
                <p>+27 21 000 0000</p>
                <p>7 Middle Road, Morningside, Sandton, 2191</p>
              </div>
            </div>
            <div>
              <h5 className="text-champagne text-[11px] tracking-[0.25em] uppercase mb-4">
                Legal
              </h5>
              <div className="space-y-2 text-sm text-silver-light">
                <p>Privacy Policy</p>
                <p>Terms of Service</p>
                <p>POPIA Compliance</p>
              </div>
            </div>
          </div>
          <div
            className="mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
            style={{ borderTop: "1px solid rgba(201,169,110,0.06)" }}
          >
            <p className="text-[11px] text-silver tracking-widest">
              © 2026 ENVY LUXURY HOMES. ALL RIGHTS RESERVED.
            </p>
            <p className="text-[11px] text-champagne/40 tracking-widest">
              TRUST · TRADITION · EXCELLENCE
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
