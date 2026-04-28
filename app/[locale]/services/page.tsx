import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { AmbientMedia } from "../ambient-media";
import { HomeAnimations } from "../home-animations";
import { JsonLd } from "../json-ld";
import { PageHero } from "../page-hero";
import { SiteFooter } from "../site-footer";
import { SiteHeader } from "../site-header";
import {
  buildBreadcrumbJsonLd,
  buildPageMetadata,
  buildServicesJsonLd,
  buildWebPageJsonLd,
} from "../seo";
import {
  capabilityKeys,
  jetPointKeys,
  serviceKeys,
} from "../site-data";
import { siteMedia } from "../site-media";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Pages.services" });
  const metadataT = await getTranslations({ locale, namespace: "Metadata" });

  return buildPageMetadata({
    locale: locale as Locale,
    pathname: "/services",
    title: t("metaTitle"),
    description: t("metaDescription"),
    imageAlt: metadataT("ogImageAlt"),
  });
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  const currentLocale = locale as Locale;

  setRequestLocale(locale);

  const homeT = await getTranslations("HomePage");
  const pageT = await getTranslations("Pages.services");
  const services = serviceKeys.map((key) => ({
    key,
    title: homeT(`services.${key}.title`),
    copy: homeT(`services.${key}.copy`),
    benefit: homeT(`services.${key}.benefit`),
  }));
  const capabilities = capabilityKeys.map((key) => ({
    key,
    title: homeT(`capabilities.items.${key}.title`),
    copy: homeT(`capabilities.items.${key}.copy`),
  }));
  const jetPoints = jetPointKeys.map((key) => homeT(`jetPump.points.${key}`));
  const pageJsonLd = buildWebPageJsonLd({
    locale: currentLocale,
    pathname: "/services",
    name: pageT("metaTitle"),
    description: pageT("metaDescription"),
  });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(currentLocale, [
    { name: "GPS Energy" },
    { name: homeT("nav.services"), path: "/services" },
  ]);
  const servicesJsonLd = buildServicesJsonLd(currentLocale, services);

  return (
    <>
      <HomeAnimations />
      <JsonLd data={pageJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={servicesJsonLd} />
      <main className="overflow-hidden bg-[#12396f] text-white">
        <SiteHeader currentPath="/services" locale={locale} page="services" />
        <PageHero
          backgroundMedia="algeriaElMerkRig"
          accentMedia="oilWellheadChristmasTree"
          galleryMedia={[
            "oilPumpjackPermian",
            "naturalGasWell",
            "hero",
            "algeriaElMerkRigNight",
          ]}
          eyebrow={pageT("hero.eyebrow")}
          title={pageT("hero.title")}
          copy={pageT("hero.copy")}
          highlights={[
            pageT("hero.highlights.lift"),
            pageT("hero.highlights.wellsite"),
            pageT("hero.highlights.maintenance"),
          ]}
        />

        <section className="relative bg-[#edf3fa] px-5 py-18 text-[#0a203d] sm:px-8 lg:px-10">
          <AmbientMedia
            image={siteMedia.oilPumpjackPermian.image}
            imageAlt={siteMedia.oilPumpjackPermian.alt}
            imageClassName="object-cover object-[64%_center] opacity-12"
            overlayClassName="bg-[linear-gradient(90deg,rgba(237,243,250,0.97)_0%,rgba(237,243,250,0.91)_48%,rgba(237,243,250,0.88)_100%)]"
          />
          <div className="relative mx-auto max-w-7xl">
            <div data-section-reveal data-reveal-from="left" className="max-w-3xl">
              <p className="text-xs font-semibold uppercase text-[#ff9a46]">
                {pageT("core.eyebrow")}
              </p>
              <h2 className="mt-4 text-4xl font-semibold leading-[1.02] sm:text-6xl">
                {pageT("core.title")}
              </h2>
            </div>
            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {services.map((service, index) => (
                <article
                  key={service.key}
                  data-section-reveal
                  data-premium-card
                  data-reveal-from={services.indexOf(service) % 2 === 0 ? "left" : "right"}
                  className="relative overflow-hidden border border-black/10 bg-white p-6 shadow-sm"
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#ffb466] to-[#12396f]" />
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-mono text-xs text-[#12396f]">
                      0{index + 1}
                    </span>
                    <span className="inline-flex h-10 min-w-10 items-center justify-center border border-black/10 bg-[#f3f7fb] px-3 text-[0.68rem] font-semibold uppercase">
                      O&amp;G
                    </span>
                  </div>
                  <h3 className="mt-10 text-2xl font-semibold leading-tight">
                    {service.title}
                  </h3>
                  <p className="mt-5 text-sm leading-6 text-[#546273]">
                    {service.copy}
                  </p>
                  <p className="mt-8 border-t border-black/10 pt-5 text-sm font-semibold text-[#0a203d]">
                    {service.benefit}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative bg-white px-5 py-18 text-[#0a203d] sm:px-8 lg:px-10">
          <AmbientMedia
            image={siteMedia.naturalGasWell.image}
            imageAlt={siteMedia.naturalGasWell.alt}
            imageClassName="object-cover object-[76%_center] opacity-9"
            overlayClassName="bg-[linear-gradient(90deg,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0.94)_50%,rgba(255,255,255,0.9)_100%)]"
          />
          <div className="relative mx-auto max-w-7xl">
            <div data-section-reveal data-reveal-from="left" className="max-w-3xl">
              <p className="text-xs font-semibold uppercase text-[#12396f]">
                {pageT("support.eyebrow")}
              </p>
              <h2 className="mt-4 text-4xl font-semibold leading-[1.02] sm:text-6xl">
                {pageT("support.title")}
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-7 text-[#546273]">
                {pageT("support.copy")}
              </p>
            </div>
            <div className="mt-10 grid gap-px overflow-hidden border border-black/10 bg-black/10 md:grid-cols-2 xl:grid-cols-3">
              {capabilities.map((item) => (
                <article
                  key={item.key}
                  data-section-reveal
                  data-premium-card
                  data-reveal-from={capabilities.indexOf(item) % 2 === 0 ? "left" : "right"}
                  className="bg-[#f5f8fc] p-6"
                >
                  <h3 className="text-2xl font-semibold text-[#0a203d]">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-[#546273]">
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
            overlayClassName="bg-[linear-gradient(90deg,rgba(15,63,116,0.94)_0%,rgba(18,57,111,0.84)_50%,rgba(11,45,89,0.8)_100%)]"
          />
          <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div
              data-section-reveal
              data-reveal-from="left"
              className="border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm sm:p-10"
            >
              <p className="text-xs font-semibold uppercase text-[#ff9a46]">
                {pageT("focus.eyebrow")}
              </p>
              <h2 className="mt-4 text-4xl font-semibold leading-[1.04] sm:text-6xl">
                {pageT("focus.title")}
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-7 text-white/68">
                {pageT("focus.copy")}
              </p>
            </div>

            <div className="grid gap-3" data-section-reveal data-reveal-from="right">
              {jetPoints.map((point) => (
                <div
                  key={point}
                  data-premium-card
                  className="border border-white/10 bg-black/20 px-5 py-4 text-sm font-medium text-white"
                >
                  {point}
                </div>
              ))}
            </div>
          </div>
        </section>

        <SiteFooter locale={locale} />
      </main>
    </>
  );
}
