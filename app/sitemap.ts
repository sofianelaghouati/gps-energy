import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gps-energy.com";
const locales = ["en", "fr"] as const;
const routes = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/company", changeFrequency: "monthly", priority: 0.9 },
  { path: "/services", changeFrequency: "monthly", priority: 0.9 },
  { path: "/standards", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
] as const satisfies Array<{
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
}>;

function localizedUrl(locale: (typeof locales)[number], path: string) {
  return new URL(`/${locale}${path}`, siteUrl).toString();
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
        },
      },
      ...(route.path === ""
        ? { images: [new URL("/hero-wellhead.webp", siteUrl).toString()] }
        : {}),
    })),
  );
}
