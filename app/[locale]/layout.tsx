import type { Metadata, Viewport } from "next";
import { Inter_Tight } from "next/font/google";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { JsonLd } from "./json-ld";
import {
  buildLanguageAlternates,
  buildOrganizationJsonLd,
  buildWebsiteJsonLd,
  siteConfig,
} from "./seo";
import "../globals.css";

const gpsSans = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-gps-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description.en,
  alternates: {
    languages: buildLanguageAlternates(""),
  },
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "Oil and gas field services",
  classification: "Industrial services",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    address: false,
    email: false,
    telephone: false,
  },
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#12396f",
};

export const dynamic = "error";
export const dynamicParams = false;
export const fetchCache = "only-cache";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const organizationJsonLd = buildOrganizationJsonLd(locale);
  const websiteJsonLd = buildWebsiteJsonLd(locale);

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${gpsSans.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-[#12396f] text-white">
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
        {children}
      </body>
    </html>
  );
}
