import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";

export const siteConfig = {
  name: "GPS Energy",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://gps-energy.com",
  description: {
    en: "GPS Energy is an Algerian oil and gas company delivering integrated field services, Jet Pump artificial lift, wellhead maintenance, logistics and surface production support.",
    fr: "GPS Energy est une societe algerienne oil and gas specialisee dans les services terrain integres, le Jet Pump, la maintenance wellhead, la logistique et le support production.",
  },
  email: "logistic_services@gps-energy.com",
  linkedin: "https://www.linkedin.com/company/gps-energy-dz",
  ogImage: "/hero-wellhead.webp",
} as const;

const localeTags: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
};

const seoKeywords = [
  "GPS Energy",
  "oil and gas services Algeria",
  "Jet Pump artificial lift",
  "wellhead maintenance",
  "welltest slickline",
  "surface production support",
  "petroleum logistics Algeria",
];

export function getLocalizedPath(locale: Locale, pathname = "") {
  return `/${locale}${pathname}`;
}

export function getAbsoluteUrl(pathname = "") {
  return new URL(pathname, siteConfig.url).toString();
}

export function buildLanguageAlternates(pathname = "") {
  return {
    en: getLocalizedPath("en", pathname),
    fr: getLocalizedPath("fr", pathname),
  };
}

type BuildPageMetadataArgs = {
  locale: Locale;
  pathname?: string;
  title: string;
  description: string;
  imageAlt: string;
};

export function buildPageMetadata({
  locale,
  pathname = "",
  title,
  description,
  imageAlt,
}: BuildPageMetadataArgs): Metadata {
  const localizedPath = getLocalizedPath(locale, pathname);
  const alternateLocaleTags = routing.locales
    .filter((item) => item !== locale)
    .map((item) => localeTags[item]);

  return {
    title,
    description,
    keywords: seoKeywords,
    alternates: {
      canonical: localizedPath,
      languages: buildLanguageAlternates(pathname),
    },
    openGraph: {
      type: "website",
      url: localizedPath,
      title,
      description,
      siteName: siteConfig.name,
      locale: localeTags[locale],
      alternateLocale: alternateLocaleTags,
      images: [
        {
          url: siteConfig.ogImage,
          width: 2200,
          height: 1467,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteConfig.ogImage],
    },
  };
}

export function buildOrganizationJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: getAbsoluteUrl("/gps-energy-logo.png"),
    image: getAbsoluteUrl(siteConfig.ogImage),
    description: siteConfig.description[locale],
    foundingDate: "2021",
    email: siteConfig.email,
    sameAs: [siteConfig.linkedin],
    areaServed: {
      "@type": "Country",
      name: locale === "fr" ? "Algerie" : "Algeria",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: siteConfig.email,
        areaServed: "DZ",
        availableLanguage: routing.locales,
      },
    ],
    knowsAbout: [
      "Jet Pump artificial lift",
      "Wellhead maintenance",
      "Welltest",
      "Slickline",
      "Surface production support",
      "Petroleum logistics",
    ],
  };
}

export function buildWebsiteJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}#website`,
    name: siteConfig.name,
    url: getAbsoluteUrl(getLocalizedPath(locale)),
    inLanguage: locale,
    publisher: {
      "@id": `${siteConfig.url}#organization`,
    },
  };
}

type WebPageJsonLdArgs = {
  locale: Locale;
  pathname?: string;
  name: string;
  description: string;
};

export function buildWebPageJsonLd({
  locale,
  pathname = "",
  name,
  description,
}: WebPageJsonLdArgs) {
  const url = getAbsoluteUrl(getLocalizedPath(locale, pathname));

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: locale,
    isPartOf: {
      "@id": `${siteConfig.url}#website`,
    },
    about: {
      "@id": `${siteConfig.url}#organization`,
    },
  };
}

type BreadcrumbItem = {
  name: string;
  path?: string;
};

export function buildBreadcrumbJsonLd(
  locale: Locale,
  items: BreadcrumbItem[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getAbsoluteUrl(getLocalizedPath(locale, item.path ?? "")),
    })),
  };
}

export function buildServicesJsonLd(
  locale: Locale,
  services: Array<{ title: string; copy: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name:
      locale === "fr"
        ? "Services terrain GPS Energy"
        : "GPS Energy field services",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.title,
        description: service.copy,
        areaServed: "DZ",
        provider: {
          "@id": `${siteConfig.url}#organization`,
        },
      },
    })),
  };
}
