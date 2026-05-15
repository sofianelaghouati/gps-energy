import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { JsonLd } from "../json-ld";
import { PageHero } from "../page-hero";
import { InfoCard, MediaPanel, SectionIntro } from "../redesign-primitives";
import { SiteFooter } from "../site-footer";
import { SiteHeader } from "../site-header";
import { buildBreadcrumbJsonLd, buildPageMetadata, buildWebPageJsonLd } from "../seo";
import { companyKeys } from "../site-data";

type Props = {
  params: Promise<{ locale: string }>;
};

const modelKeys = ["technical", "coordination", "continuity", "market"] as const;
const reasonKeys = ["fit", "speed", "discipline"] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Pages.company" });
  const metadataT = await getTranslations({ locale, namespace: "Metadata" });

  return buildPageMetadata({
    locale: locale as Locale,
    pathname: "/company",
    title: t("metaTitle"),
    description: t("metaDescription"),
    imageAlt: metadataT("ogImageAlt"),
  });
}

export default async function CompanyPage({ params }: Props) {
  const { locale } = await params;
  const currentLocale = locale as Locale;

  setRequestLocale(locale);

  const homeT = await getTranslations("HomePage");
  const pageT = await getTranslations("Pages.company");
  const companyItems = companyKeys.map((key) => ({
    key,
    label: homeT(`companyBand.items.${key}.label`),
    value: homeT(`companyBand.items.${key}.value`),
    copy: homeT(`companyBand.items.${key}.copy`),
  }));
  const modelItems = modelKeys.map((key) => ({
    key,
    title: pageT(`model.items.${key}.title`),
    copy: pageT(`model.items.${key}.copy`),
  }));
  const reasons = reasonKeys.map((key) => ({
    key,
    title: pageT(`reasons.items.${key}.title`),
    copy: pageT(`reasons.items.${key}.copy`),
  }));
  const pageJsonLd = buildWebPageJsonLd({
    locale: currentLocale,
    pathname: "/company",
    name: pageT("metaTitle"),
    description: pageT("metaDescription"),
    type: "AboutPage",
  });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(currentLocale, [
    { name: "GPS Energy" },
    { name: homeT("nav.expertise"), path: "/company" },
  ]);

  return (
    <>
      <JsonLd data={pageJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <main className="overflow-hidden bg-white text-[#06111f]">
        <SiteHeader currentPath="/company" locale={locale} page="company" />
        <PageHero
          backgroundMedia="desertAerial"
          accentMedia="gpsField02"
          galleryMedia={[
            "gpsField01",
            "gpsField03",
            "gpsField04",
            "gpsField05",
          ]}
          eyebrow={pageT("hero.eyebrow")}
          title={pageT("hero.title")}
          copy={pageT("hero.copy")}
          highlights={[
            pageT("hero.highlights.founded"),
            pageT("hero.highlights.people"),
            pageT("hero.highlights.coverage"),
          ]}
        />

        <section className="bg-white px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="border-l-4 border-[#042a54] pl-6 sm:pl-8">
              <SectionIntro
                eyebrow={homeT("companyBand.eyebrow")}
                title={homeT("companyBand.title")}
                copy={homeT("expertise.copy")}
              />
              <div className="mt-10 grid gap-px overflow-hidden border border-[#d9e0e7] bg-[#d9e0e7] sm:grid-cols-2">
                {companyItems.map((item) => (
                  <div key={item.key} className="hover-lift border-t-4 border-t-[#042a54] bg-white p-6">
                    <p className="text-sm font-medium text-[#042a54]">{item.label}</p>
                    <p className="mt-4 text-3xl font-light text-[#042a54]">
                      {item.value}
                    </p>
                    <p className="mt-4 text-sm leading-6 text-[#566373]">
                      {item.copy}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <MediaPanel className="min-h-[620px]" mediaKey="gpsField06" />
          </div>
        </section>

        <section className="bg-[#eaf0f6] px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <SectionIntro
              eyebrow={pageT("model.eyebrow")}
              title={pageT("model.title")}
              wide
            />
            <div className="mt-12 grid gap-px overflow-hidden border border-[#d9e0e7] bg-[#d9e0e7] md:grid-cols-2">
              {modelItems.map((item) => (
                <InfoCard key={item.key} title={item.title} copy={item.copy} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#042a54] px-5 py-20 text-white sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <SectionIntro
              eyebrow={pageT("reasons.eyebrow")}
              title={pageT("reasons.title")}
              invert
              wide
            />
            <div className="mt-12 grid gap-px overflow-hidden border border-white/16 bg-white/16 lg:grid-cols-3">
              {reasons.map((item) => (
                <InfoCard
                  key={item.key}
                  title={item.title}
                  copy={item.copy}
                  invert
                />
              ))}
            </div>
          </div>
        </section>

        <SiteFooter locale={locale} />
      </main>
    </>
  );
}
