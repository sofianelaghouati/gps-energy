import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { JsonLd } from "../json-ld";
import { PageHero } from "../page-hero";
import { InfoCard, MediaPanel, SectionIntro, TextLink } from "../redesign-primitives";
import { SiteFooter } from "../site-footer";
import { SiteHeader } from "../site-header";
import {
  buildBreadcrumbJsonLd,
  buildPageMetadata,
  buildServicesJsonLd,
  buildWebPageJsonLd,
} from "../seo";
import { capabilityKeys, jetPointKeys, serviceKeys } from "../site-data";

type Props = {
  params: Promise<{ locale: string }>;
};

const serviceDetailPointKeys = ["first", "second", "third"] as const;

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
    detail: pageT(`details.${key}.body`),
    points: serviceDetailPointKeys.map((pointKey) =>
      pageT(`details.${key}.points.${pointKey}`),
    ),
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
    type: "CollectionPage",
  });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(currentLocale, [
    { name: "GPS Energy" },
    { name: homeT("nav.services"), path: "/services" },
  ]);
  const servicesJsonLd = buildServicesJsonLd(currentLocale, services);

  return (
    <>
      <JsonLd data={pageJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={servicesJsonLd} />
      <main className="overflow-hidden bg-white text-[#06111f]">
        <SiteHeader currentPath="/services" locale={locale} page="services" />
        <PageHero
          backgroundMedia="pumpjackField"
          accentMedia="gpsMain"
          galleryMedia={[
            "gpsField02",
            "gpsField03",
            "gpsField04",
            "gpsField05",
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

        <section className="bg-[#eaf0f6] px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <SectionIntro
              eyebrow={pageT("core.eyebrow")}
              title={pageT("core.title")}
              copy={pageT("core.copy")}
              wide
            />
            <div className="mt-12 grid gap-5">
              {services.map((service, index) => (
                <article
                  key={service.key}
                  id={service.key}
                  className="hover-lift scroll-mt-28 border border-[#c9d7e5] border-l-4 border-l-[#042a54] bg-white p-6 shadow-sm sm:p-8 lg:grid lg:grid-cols-[0.82fr_1.18fr] lg:gap-12"
                >
                  <div>
                    <p className="text-sm font-medium text-[#042a54]">
                      0{index + 1}
                    </p>
                    <h2 className="mt-5 text-4xl font-light leading-[1.08] text-[#06111f] sm:text-5xl">
                      {service.title}
                    </h2>
                    <p className="mt-6 text-base leading-7 text-[#566373]">
                      {service.copy}
                    </p>
                  </div>
                  <div className="mt-10 lg:mt-0">
                    <p className="text-lg leading-8 text-[#263242]">
                      {service.detail}
                    </p>
                    <div className="mt-8 grid gap-px overflow-hidden border border-[#d9e0e7] bg-[#d9e0e7] sm:grid-cols-3">
                      {service.points.map((point) => (
                        <div
                          key={point}
                          className="hover-lift bg-[#f7f9fb] p-5 text-sm leading-6 text-[#263242]"
                        >
                          {point}
                        </div>
                      ))}
                    </div>
                    <p className="mt-7 border-t border-[#d9e0e7] pt-5 text-sm font-medium leading-6 text-[#042a54]">
                      {service.benefit}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#042a54] px-5 py-16 sm:px-8 lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
            <MediaPanel className="min-h-[360px]" mediaKey="gpsMain" priority />
            <MediaPanel className="min-h-[360px]" mediaKey="gpsField04" />
            <MediaPanel className="min-h-[360px]" mediaKey="wellheadDetail" />
          </div>
        </section>

        <section className="bg-white px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div className="border-l-4 border-[#042a54] pl-6 sm:pl-8">
              <SectionIntro
                eyebrow={pageT("support.eyebrow")}
                title={pageT("support.title")}
                copy={pageT("support.copy")}
              />
              <div className="mt-8">
                <TextLink href={`/${currentLocale}#services`}>
                  {pageT("support.backToCarousel")}
                </TextLink>
              </div>
              <div className="mt-10 grid gap-px overflow-hidden border border-[#d9e0e7] bg-[#d9e0e7] sm:grid-cols-2">
                {capabilities.map((item) => (
                  <InfoCard key={item.key} title={item.title} copy={item.copy} />
                ))}
              </div>
            </div>
            <MediaPanel className="min-h-[620px]" mediaKey="gpsField03" />
          </div>
        </section>

        <section className="bg-[#042a54] px-5 py-20 text-white sm:px-8 lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <SectionIntro
              eyebrow={pageT("focus.eyebrow")}
              title={pageT("focus.title")}
              copy={pageT("focus.copy")}
              invert
            />
            <div className="grid content-start gap-3">
              {jetPoints.map((point) => (
                <div
                  key={point}
                  className="border border-white/16 bg-white/[0.04] px-5 py-4 text-base font-medium text-white"
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
