import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GPS Energy",
    short_name: "GPS Energy",
    description:
      "Integrated oil and gas field services focused on Jet Pump, wellhead maintenance, logistics and production support.",
    id: "/en",
    start_url: "/en",
    scope: "/",
    lang: "en",
    dir: "ltr",
    display: "standalone",
    orientation: "portrait",
    background_color: "#12396f",
    theme_color: "#12396f",
    categories: ["business", "productivity", "utilities"],
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/gps-energy-logo-transparent.svg?v=blue-orange-performance",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
