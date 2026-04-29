import type { MetadataRoute } from "next";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://gps-energy.com").replace(
  /\/$/,
  "",
);
const locales = ["en", "fr"] as const;
const routes = [
  {
    path: "",
    changeFrequency: "weekly",
    priority: 1,
    images: [
      "/hero-wellhead.webp",
      "/unsplash-oilfield-rig-1920.jpg",
      "/algeria-sahara-drone-1920.jpg",
    ],
  },
  {
    path: "/company",
    changeFrequency: "monthly",
    priority: 0.9,
    images: [
      "/roughnecks-1600.jpg",
      "/algeria-el-merk-rig-1280.jpg",
      "/oil-wellhead-christmas-tree-1280.jpg",
    ],
  },
  {
    path: "/services",
    changeFrequency: "monthly",
    priority: 0.9,
    images: [
      "/algeria-el-merk-rig-1280.jpg",
      "/oil-pumpjack-permian-1280.jpg",
      "/natural-gas-wellhead-1280.jpg",
    ],
  },
  {
    path: "/standards",
    changeFrequency: "monthly",
    priority: 0.8,
    images: [
      "/flare-stack-1280.jpg",
      "/algeria-el-merk-rig-night-1280.jpg",
      "/natural-gas-wellhead-1280.jpg",
    ],
  },
  {
    path: "/contact",
    changeFrequency: "monthly",
    priority: 0.8,
    images: [
      "/hero-wellhead.webp",
      "/algeria-sahara-drone-1920.jpg",
      "/algeria-el-merk-rig-night-1280.jpg",
    ],
  },
] as const satisfies Array<{
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
  images: readonly string[];
}>;

function localizedUrl(locale: (typeof locales)[number], path: string) {
  return new URL(`/${locale}${path}`, siteUrl).toString();
}

function absoluteAssetUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.flatMap((route) =>
    locales.map((locale) => ({
      url: localizedUrl(locale, route.path),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: {
          en: localizedUrl("en", route.path),
          fr: localizedUrl("fr", route.path),
          "x-default": localizedUrl("en", route.path),
        },
      },
      images: route.images.map(absoluteAssetUrl),
    })),
  );
}
