import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GPS Energy",
    short_name: "GPS Energy",
    description:
      "Services terrain oil and gas integres pour la production, l'integrite des puits et le support operationnel.",
    id: "/fr",
    start_url: "/fr",
    scope: "/",
    lang: "fr",
    dir: "ltr",
    display: "standalone",
    orientation: "portrait",
    background_color: "#ffffff",
    theme_color: "#042a54",
    categories: ["business", "productivity", "utilities"],
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/gps-energy-logo.png",
        sizes: "1280x1191",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
