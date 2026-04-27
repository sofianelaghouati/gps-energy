import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { HomeAnimations } from "../home-animations";
import { JsonLd } from "../json-ld";
import { PageHero } from "../page-hero";
import { SiteFooter } from "../site-footer";
import { SiteHeader } from "../site-header";
import { buildBreadcrumbJsonLd, buildPageMetadata, buildWebPageJsonLd } from "../seo";
import { standardKeys } from "../site-data";

type Props = {
  params: Promise<{ locale: string }>;
};

const assuranceKeys = ["quality", "safety", "environment"] as const;

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
      <HomeAnimations />
      <JsonLd data={pageJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <main className="overflow-hidden bg-[#060608] text-white">
        <SiteHeader currentPath="/standards" locale={locale} page="standards" />
        <PageHero
          eyebrow={pageT("hero.eyebrow")}
          title={pageT("hero.title")}
          copy={pageT("hero.copy")}
          highlights={[
            pageT("hero.highlights.quality"),
            pageT("hero.highlights.safety"),
            pageT("hero.highlights.environment"),
          ]}
        />

        <section className="border-b border-white/10 bg-[#060608] px-5 py-18 text-white sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div data-section-reveal data-reveal-from="left" className="max-w-3xl">
              <p className="text-xs font-semibold uppercase text-[#ff7908]">
                {homeT("safety.eyebrow")}
              </p>
              <h2 className="mt-4 text-4xl font-semibold leading-[1.02] sm:text-6xl">
                {homeT("safety.title")}
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-7 text-white/68">
                {homeT("safety.copy")}
              </p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {standards.map((item) => (
                <article
                  key={item.key}
                  data-section-reveal
                  data-reveal-from={standards.indexOf(item) % 2 === 0 ? "left" : "right"}
                  className="border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm"
                >
                  <p className="text-sm font-semibold uppercase text-[#ff7908]">
                    {item.title}
                  </p>
                  <p className="mt-4 text-sm leading-6 text-white/68">
                    {item.copy}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f4f1ec] px-5 py-18 text-[#101014] sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div data-section-reveal data-reveal-from="left" className="max-w-3xl">
              <p className="text-xs font-semibold uppercase text-[#5b48dc]">
                {pageT("assurance.eyebrow")}
              </p>
              <h2 className="mt-4 text-4xl font-semibold leading-[1.02] sm:text-6xl">
                {pageT("assurance.title")}
              </h2>
            </div>
            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {assurance.map((item) => (
                <article
                  key={item.key}
                  data-section-reveal
                  data-reveal-from={assurance.indexOf(item) % 2 === 0 ? "left" : "right"}
                  className="border border-black/10 bg-white p-7 shadow-sm"
                >
                  <h3 className="text-2xl font-semibold">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#55525c]">
                    {item.copy}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <SiteFooter locale={locale} />
      </main>
    </>
  );
}
