import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { JsonLd } from "../json-ld";
import { PageHero } from "../page-hero";
import { InfoCard, MediaPanel, SectionIntro } from "../redesign-primitives";
import { SiteFooter } from "../site-footer";
import { SiteHeader } from "../site-header";
import { buildBreadcrumbJsonLd, buildPageMetadata, buildWebPageJsonLd } from "../seo";
import { standardKeys } from "../site-data";

type Props = {
  params: Promise<{ locale: string }>;
};

const assuranceKeys = ["quality", "safety", "environment"] as const;
const principleKeys = ["planning", "siteControl", "traceability"] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Pages.standards" });
  const metadataT = await getTranslations({ locale, namespace: "Metadata" });

  return buildPageMetadata({
    locale: locale as Locale,
    pathname: "/standards",
    title: t("metaTitle"),
    description: t("metaDescription"),
    imageAlt: metadataT("ogImageAlt"),
  });
}

export default async function StandardsPage({ params }: Props) {
  const { locale } = await params;
  const currentLocale = locale as Locale;

  setRequestLocale(locale);

  const homeT = await getTranslations("HomePage");
  const pageT = await getTranslations("Pages.standards");
  const standards = standardKeys.map((key) => ({
    key,
    title: homeT(`standardsGrid.items.${key}.title`),
    copy: homeT(`standardsGrid.items.${key}.copy`),
  }));
  const assurance = assuranceKeys.map((key) => ({
    key,
    title: pageT(`assurance.items.${key}.title`),
    copy: pageT(`assurance.items.${key}.copy`),
  }));
  const principles = principleKeys.map((key) => ({
    key,
    title: pageT(`principles.items.${key}.title`),
    copy: pageT(`principles.items.${key}.copy`),
  }));
  const pageJsonLd = buildWebPageJsonLd({
    locale: currentLocale,
    pathname: "/standards",
    name: pageT("metaTitle"),
    description: pageT("metaDescription"),
  });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(currentLocale, [
    { name: "GPS Energy" },
    { name: homeT("nav.safety"), path: "/standards" },
  ]);

  return (
    <>
      <JsonLd data={pageJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <main className="overflow-hidden bg-white text-[#06111f]">
        <SiteHeader currentPath="/standards" locale={locale} page="standards" />
        <PageHero
          backgroundMedia="gasWell"
          accentMedia="gpsField05"
          galleryMedia={[
            "gpsMain",
            "gpsField01",
            "gpsField03",
            "gpsField06",
          ]}
          eyebrow={pageT("hero.eyebrow")}
          title={pageT("hero.title")}
          copy={pageT("hero.copy")}
          highlights={[
            pageT("hero.highlights.quality"),
            pageT("hero.highlights.safety"),
            pageT("hero.highlights.environment"),
          ]}
        />

        <section className="bg-[#eaf0f6] px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="border-l-4 border-[#042a54] pl-6 sm:pl-8">
              <SectionIntro
                eyebrow={homeT("safety.eyebrow")}
                title={homeT("safety.title")}
                copy={homeT("safety.copy")}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
              {standards.map((item) => (
                <InfoCard key={item.key} title={item.title} copy={item.copy} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#042a54] px-5 py-20 text-white sm:px-8 lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <SectionIntro
              eyebrow={pageT("principles.eyebrow")}
              title={pageT("principles.title")}
              copy={pageT("principles.copy")}
              invert
            />
            <div className="grid gap-3">
              {principles.map((item) => (
                <article
                  key={item.key}
                  className="hover-lift border border-white/16 bg-white/[0.04] p-6"
                >
                  <h2 className="text-xl font-light text-white">{item.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-white/72">
                    {item.copy}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <SectionIntro
                eyebrow={pageT("assurance.eyebrow")}
                title={pageT("assurance.title")}
                copy={pageT("assurance.copy")}
              />
              <div className="mt-10 grid gap-px overflow-hidden border border-[#d9e0e7] bg-[#d9e0e7] lg:grid-cols-3">
                {assurance.map((item) => (
                  <InfoCard key={item.key} title={item.title} copy={item.copy} />
                ))}
              </div>
            </div>
            <MediaPanel className="min-h-[560px]" mediaKey="gpsField06" />
          </div>
        </section>

        <SiteFooter locale={locale} />
      </main>
    </>
  );
}
