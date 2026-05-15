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
      "/gps/gps-main.jpeg",
      "/gps/gps-field-01.jpeg",
      "/gps/gps-field-02.jpeg",
    ],
  },
  {
    path: "/company",
    changeFrequency: "monthly",
    priority: 0.9,
    images: [
      "/gps/gps-field-02.jpeg",
      "/gps/gps-main.jpeg",
      "/gps/gps-field-06.jpeg",
    ],
  },
  {
    path: "/services",
    changeFrequency: "monthly",
    priority: 0.9,
    images: [
      "/gps/gps-field-01.jpeg",
      "/gps/gps-field-03.jpeg",
      "/gps/gps-field-04.jpeg",
    ],
  },
  {
    path: "/standards",
    changeFrequency: "monthly",
    priority: 0.8,
    images: [
      "/gps/gps-field-04.jpeg",
      "/gps/gps-field-05.jpeg",
      "/gps/gps-field-06.jpeg",
    ],
  },
  {
    path: "/contact",
    changeFrequency: "monthly",
    priority: 0.8,
    images: [
      "/gps/gps-main.jpeg",
      "/gps/gps-field-01.jpeg",
      "/gps/gps-field-05.jpeg",
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
          "x-default": localizedUrl("fr", route.path),
        },
      },
      images: route.images.map(absoluteAssetUrl),
    })),
  );
}
