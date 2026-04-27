import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/en",
        permanent: true,
      },
    ];
  },
  async headers() {
    const immutableAssetHeaders = [
      {
        key: "Cache-Control",
        value: "public, max-age=31536000, immutable",
      },
    ];

    return [
      {
        source: "/hero-wellhead.webp",
        headers: immutableAssetHeaders,
      },
      {
        source: "/pumpjack.webm",
        headers: immutableAssetHeaders,
      },
      {
        source: "/roughnecks-1600.jpg",
        headers: immutableAssetHeaders,
      },
      {
        source: "/flare-stack-1280.jpg",
        headers: immutableAssetHeaders,
      },
      {
        source: "/gps-energy-logo.png",
        headers: immutableAssetHeaders,
      },
      {
        source: "/gps-energy-mark.png",
        headers: immutableAssetHeaders,
      },
      {
        source: "/gps-energy-logo-premium.svg",
        headers: immutableAssetHeaders,
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
