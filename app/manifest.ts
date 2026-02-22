import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ENVY Luxury Homes",
    short_name: "ENVY",
    description:
      "South Africa's most exclusive luxury estates in Clifton, Camps Bay, and Sandton.",
    start_url: "/",
    display: "standalone",
    background_color: "#070D18",
    theme_color: "#070D18",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
