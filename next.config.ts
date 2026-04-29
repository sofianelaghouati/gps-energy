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
    const securityHeaders = [
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      },
      {
        key: "X-Content-Type-Options",
        value: "nosniff",
      },
      {
        key: "X-DNS-Prefetch-Control",
        value: "on",
      },
      {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin",
      },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=()",
      },
    ];
    const immutableAssetHeaders = [
      {
        key: "Cache-Control",
        value: "public, max-age=31536000, immutable",
      },
    ];

    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/sitemap.xml",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/robots.txt",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
          },
        ],
      },
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
        source: "/algeria-el-merk-rig-1280.jpg",
        headers: immutableAssetHeaders,
      },
      {
        source: "/algeria-el-merk-rig-night-1280.jpg",
        headers: immutableAssetHeaders,
      },
      {
        source: "/natural-gas-wellhead-1280.jpg",
        headers: immutableAssetHeaders,
      },
      {
        source: "/oil-pumpjack-permian-1280.jpg",
        headers: immutableAssetHeaders,
      },
      {
        source: "/oil-wellhead-christmas-tree-1280.jpg",
        headers: immutableAssetHeaders,
      },
      {
        source: "/algeria-sahara-drone-1920.jpg",
        headers: immutableAssetHeaders,
      },
      {
        source: "/grand-erg-camel-4608.jpg",
        headers: immutableAssetHeaders,
      },
      {
        source: "/hassi-messaoud-desert-768.jpg",
        headers: immutableAssetHeaders,
      },
      {
        source: "/tassili-dunes-4032.jpg",
        headers: immutableAssetHeaders,
      },
      {
        source: "/gps-energy-logo-transparent.svg",
        headers: immutableAssetHeaders,
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
