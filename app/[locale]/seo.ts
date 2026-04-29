import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gps-energy.com";
const normalizedSiteUrl = rawSiteUrl.replace(/\/$/, "");

export const siteConfig = {
  name: "GPS Energy",
  legalName: "GPS Energy",
  url: normalizedSiteUrl,
  description: {
    en: "GPS Energy is an Algerian oil and gas company delivering integrated field services, Jet Pump artificial lift, wellhead maintenance, logistics and surface production support.",
    fr: "GPS Energy est une societe algerienne oil and gas specialisee dans les services terrain integres, le Jet Pump, la maintenance wellhead, la logistique et le support production.",
  },
  email: "logistic_services@gps-energy.com",
  linkedin: "https://www.linkedin.com/company/gps-energy-dz",
  ogImage: "/hero-wellhead.webp",
  foundingDate: "2021",
  lastUpdated: "2026-04-29",
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

const organizationServiceNames: Record<Locale, string[]> = {
  en: [
    "Jet Pump artificial lift",
    "Welltest and Slickline support",
    "Wellhead maintenance",
    "Petroleum logistics",
    "Surface production support",
  ],
  fr: [
    "Jet Pump artificial lift",
    "Support Welltest et Slickline",
    "Maintenance wellhead",
    "Logistique petroliere",
    "Support production surface",
  ],
};

export function getLocalizedPath(locale: Locale, pathname = "") {
  return `/${locale}${pathname}`;
}

export function getAbsoluteUrl(pathname = "") {
  return new URL(pathname, siteConfig.url).toString();
}

export function buildLanguageAlternates(pathname = "") {
  return {
    en: getAbsoluteUrl(getLocalizedPath("en", pathname)),
    fr: getAbsoluteUrl(getLocalizedPath("fr", pathname)),
    "x-default": getAbsoluteUrl(getLocalizedPath("en", pathname)),
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
  const absoluteUrl = getAbsoluteUrl(localizedPath);
  const absoluteImageUrl = getAbsoluteUrl(siteConfig.ogImage);
  const metadataTitle =
    pathname === "" ? `${title} | ${siteConfig.name}` : title;
  const socialTitle = `${title} | ${siteConfig.name}`;

  return {
    title: metadataTitle,
    description,
    keywords: seoKeywords,
    alternates: {
      canonical: absoluteUrl,
      languages: buildLanguageAlternates(pathname),
    },
    openGraph: {
      type: "website",
      url: absoluteUrl,
      title: socialTitle,
      description,
      siteName: siteConfig.name,
      locale: localeTags[locale],
      alternateLocale: alternateLocaleTags,
      images: [
        {
          url: absoluteImageUrl,
          width: 2200,
          height: 1467,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [absoluteImageUrl],
    },
  };
}

export function buildOrganizationJsonLd(locale: Locale) {
  const localizedDescription = siteConfig.description[locale];

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: getAbsoluteUrl("/gps-energy-logo-transparent.svg"),
    image: getAbsoluteUrl(siteConfig.ogImage),
    description: localizedDescription,
    foundingDate: siteConfig.foundingDate,
    email: siteConfig.email,
    sameAs: [siteConfig.linkedin],
    address: {
      "@type": "PostalAddress",
      addressCountry: "DZ",
    },
    areaServed: {
      "@type": "Country",
      name: locale === "fr" ? "Algerie" : "Algeria",
    },
    serviceArea: {
      "@type": "Country",
      name: locale === "fr" ? "Algerie" : "Algeria",
    },
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 11,
      maxValue: 50,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: siteConfig.email,
        areaServed: "DZ",
        availableLanguage: routing.locales,
      },
      {
        "@type": "ContactPoint",
        contactType: "technical support",
        email: siteConfig.email,
        areaServed: "DZ",
        availableLanguage: routing.locales,
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name:
        locale === "fr"
          ? "Services terrain oil and gas GPS Energy"
          : "GPS Energy oil and gas field services",
      itemListElement: organizationServiceNames[locale].map((name) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name,
          provider: {
            "@id": `${siteConfig.url}#organization`,
          },
          areaServed: "DZ",
        },
      })),
    },
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
    alternateName: "GPS Energy Algeria",
    url: siteConfig.url,
    inLanguage: routing.locales,
    publisher: {
      "@id": `${siteConfig.url}#organization`,
    },
    mainEntityOfPage: getAbsoluteUrl(getLocalizedPath(locale)),
  };
}

type WebPageJsonLdArgs = {
  locale: Locale;
  pathname?: string;
  name: string;
  description: string;
  type?: "WebPage" | "AboutPage" | "CollectionPage" | "ContactPage";
};

export function buildWebPageJsonLd({
  locale,
  pathname = "",
  name,
  description,
  type = "WebPage",
}: WebPageJsonLdArgs) {
  const url = getAbsoluteUrl(getLocalizedPath(locale, pathname));

  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: locale,
    dateModified: siteConfig.lastUpdated,
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: getAbsoluteUrl(siteConfig.ogImage),
    },
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
  const localizedPagePath = getLocalizedPath(locale, "/services");

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${getAbsoluteUrl(localizedPagePath)}#services`,
    name:
      locale === "fr"
        ? "Services terrain GPS Energy"
        : "GPS Energy field services",
    url: getAbsoluteUrl(localizedPagePath),
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        "@id": `${getAbsoluteUrl(localizedPagePath)}#service-${index + 1}`,
        name: service.title,
        description: service.copy,
        serviceType: service.title,
        areaServed: "DZ",
        provider: {
          "@id": `${siteConfig.url}#organization`,
        },
      },
    })),
  };
}
