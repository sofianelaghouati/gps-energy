import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { AmbientMedia } from "../ambient-media";
import { CompanyProfileShowcase } from "../company-profile-showcase";
import { HomeAnimations } from "../home-animations";
import { JsonLd } from "../json-ld";
import { PageHero } from "../page-hero";
import { SiteFooter } from "../site-footer";
import { SiteHeader } from "../site-header";
import { buildBreadcrumbJsonLd, buildPageMetadata, buildWebPageJsonLd } from "../seo";
import { companyKeys } from "../site-data";
import { siteMedia } from "../site-media";

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
      <HomeAnimations />
      <JsonLd data={pageJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <main className="overflow-hidden bg-[#12396f] text-white">
        <SiteHeader currentPath="/company" locale={locale} page="company" />
        <PageHero
          backgroundMedia="roughnecks"
          accentMedia="hero"
          galleryMedia={[
            "algeriaElMerkRig",
            "oilWellheadChristmasTree",
            "naturalGasWell",
            "saharaDrone",
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

        <section className="relative bg-[#edf3fa] px-5 py-18 text-[#0a203d] sm:px-8 lg:px-10">
          <AmbientMedia
            image={siteMedia.algeriaElMerkRig.image}
            imageAlt={siteMedia.algeriaElMerkRig.alt}
            imageClassName="object-cover object-[58%_center] opacity-12"
            overlayClassName="bg-[linear-gradient(90deg,rgba(237,243,250,0.96)_0%,rgba(237,243,250,0.9)_48%,rgba(237,243,250,0.86)_100%)]"
          />
          <div className="relative mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
              <div
                data-section-reveal
                data-reveal-from="left"
                className="max-w-3xl"
              >
                <p className="text-xs font-semibold uppercase text-[#12396f]">
                  {homeT("companyBand.eyebrow")}
                </p>
                <h2 className="mt-4 text-4xl font-semibold leading-[1.02] sm:text-6xl">
                  {homeT("companyBand.title")}
                </h2>
                <p className="mt-6 max-w-2xl text-base leading-7 text-[#546273] sm:text-lg">
                  {homeT("expertise.copy")}
                </p>
              </div>
              <div data-section-reveal data-reveal-from="right">
                <CompanyProfileShowcase
                  copy={pageT("hero.copy")}
                  eyebrow={homeT("companyBand.eyebrow")}
                  metrics={companyItems}
                  title={pageT("hero.title")}
                />
              </div>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {companyItems.map((item, index) => (
                <article
                  key={item.key}
                  data-section-reveal
                  data-premium-card
                  data-reveal-from={index % 2 === 0 ? "left" : "right"}
                  className="border border-black/10 bg-white p-6 shadow-sm"
                >
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#12396f]">
                    {item.label}
                  </p>
                  <h3 className="mt-5 text-3xl font-semibold">{item.value}</h3>
                  <p className="mt-4 text-sm leading-6 text-[#546273]">
                    {item.copy}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative bg-white px-5 py-18 text-[#0a203d] sm:px-8 lg:px-10">
          <AmbientMedia
            image={siteMedia.oilWellheadChristmasTree.image}
            imageAlt={siteMedia.oilWellheadChristmasTree.alt}
            imageClassName="object-cover object-[74%_center] opacity-8"
            overlayClassName="bg-[linear-gradient(90deg,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0.94)_48%,rgba(255,255,255,0.9)_100%)]"
          />
          <div className="relative mx-auto max-w-7xl">
            <div data-section-reveal data-reveal-from="left" className="max-w-3xl">
              <p className="text-xs font-semibold uppercase text-[#ff9a46]">
                {pageT("model.eyebrow")}
              </p>
              <h2 className="mt-4 text-4xl font-semibold leading-[1.02] sm:text-6xl">
                {pageT("model.title")}
              </h2>
            </div>
            <div className="mt-10 grid gap-4 lg:grid-cols-2">
              {modelItems.map((item, index) => (
                <article
                  key={item.key}
                  data-section-reveal
                  data-premium-card
                  data-reveal-from={index % 2 === 0 ? "left" : "right"}
                  className="border border-black/10 bg-[#f5f8fc] p-7 shadow-sm"
                >
                  <h3 className="text-2xl font-semibold">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#546273]">
                    {item.copy}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative border-y border-white/10 bg-[#0f3f74] px-5 py-18 text-white sm:px-8 lg:px-10">
          <AmbientMedia
            image={siteMedia.algeriaElMerkRigNight.image}
            imageAlt={siteMedia.algeriaElMerkRigNight.alt}
            imageClassName="object-cover object-center opacity-18"
            overlayClassName="bg-[linear-gradient(90deg,rgba(15,63,116,0.94)_0%,rgba(18,57,111,0.86)_52%,rgba(11,45,89,0.82)_100%)]"
          />
          <div className="relative mx-auto max-w-7xl">
            <div data-section-reveal data-reveal-from="left" className="max-w-3xl">
              <p className="text-xs font-semibold uppercase text-[#ff9a46]">
                {pageT("reasons.eyebrow")}
              </p>
              <h2 className="mt-4 text-4xl font-semibold leading-[1.02] sm:text-6xl">
                {pageT("reasons.title")}
              </h2>
            </div>
            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {reasons.map((item, index) => (
                <article
                  key={item.key}
                  data-section-reveal
                  data-premium-card
                  data-reveal-from={index % 2 === 0 ? "left" : "right"}
                  className="border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm"
                >
                  <h3 className="text-2xl font-semibold">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/68">
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
