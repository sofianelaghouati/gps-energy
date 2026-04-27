import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GPS Energy",
    short_name: "GPS Energy",
    description:
      "Integrated oil and gas field services focused on Jet Pump, wellhead maintenance, logistics and production support.",
    start_url: "/en",
    display: "standalone",
    background_color: "#060608",
    theme_color: "#060608",
  };
}
