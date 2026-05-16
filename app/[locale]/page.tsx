import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { AmbientMedia } from "./ambient-media";
import { JsonLd } from "./json-ld";
import {
  InfoCard,
  MediaPanel,
  SectionIntro,
  TextLink,
} from "./redesign-primitives";
import { ServiceCarousel } from "./service-carousel";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import {
  buildPageMetadata,
  buildServicesJsonLd,
  buildWebPageJsonLd,
  getLocalizedPath,
} from "./seo";
import {
  capabilityKeys,
  companyKeys,
  jetPointKeys,
  serviceKeys,
  standardKeys,
} from "./site-data";
import { siteMedia } from "./site-media";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return buildPageMetadata({
    locale: locale as Locale,
    title: t("title"),
    description: t("description"),
    imageAlt: t("ogImageAlt"),
  });
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const currentLocale = locale as Locale;

  setRequestLocale(locale);

  const t = await getTranslations("HomePage");
  const services = serviceKeys.map((key) => ({
    href: getLocalizedPath(currentLocale, `/services#${key}`),
    key,
    title: t(`services.${key}.title`),
    copy: t(`services.${key}.copy`),
    benefit: t(`services.${key}.benefit`),
  }));
  const companyItems = companyKeys.map((key) => ({
    key,
    label: t(`companyBand.items.${key}.label`),
    value: t(`companyBand.items.${key}.value`),
    copy: t(`companyBand.items.${key}.copy`),
  }));
  const capabilities = capabilityKeys.map((key) => ({
    key,
    title: t(`capabilities.items.${key}.title`),
    copy: t(`capabilities.items.${key}.copy`),
  }));
  const standards = standardKeys.map((key) => ({
    key,
    title: t(`standardsGrid.items.${key}.title`),
    copy: t(`standardsGrid.items.${key}.copy`),
  }));
  const jetPoints = jetPointKeys.map((key) => t(`jetPump.points.${key}`));
  const servicesJsonLd = buildServicesJsonLd(currentLocale, services);
  const pageJsonLd = buildWebPageJsonLd({
    locale: currentLocale,
    name: t("hero.title"),
    description: t("hero.copy"),
  });

  return (
    <>
      <JsonLd data={pageJsonLd} />
      <JsonLd data={servicesJsonLd} />
      <main className="overflow-hidden bg-white text-[#06111f]">
        <section id="top" className="relative min-h-[92svh] overflow-hidden bg-[#042a54] text-white">
          <AmbientMedia
            heroMedia
            image={siteMedia.fieldWellheadHero.image}
            imageAlt={siteMedia.fieldWellheadHero.alt}
            preload
            imageClassName="object-cover object-[58%_center] opacity-68"
            overlayClassName="bg-[linear-gradient(90deg,rgba(4,42,84,0.86)_0%,rgba(4,42,84,0.62)_48%,rgba(4,42,84,0.24)_100%)]"
          />
          <SiteHeader currentPath="/" locale={locale} page="home" overlay />
          <div className="relative z-10 mx-auto flex min-h-[92svh] max-w-7xl items-end px-5 pb-16 pt-32 sm:px-8 lg:px-10">
            <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
              <div className="max-w-4xl">
                <p className="text-sm font-semibold text-white/76">
                  {t("hero.eyebrow")}
                </p>
                <h1 className="mt-6 max-w-4xl text-5xl font-light leading-[1.02] text-white sm:text-6xl lg:text-[5.4rem]">
                  {t("hero.title")}
                </h1>
                <p className="mt-8 max-w-2xl text-lg leading-8 text-white/78">
                  {t("hero.copy")}
                </p>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <TextLink
                    href={getLocalizedPath(currentLocale, "/contact")}
                    invert
                  >
                    {t("hero.primaryCta")}
                  </TextLink>
                  <TextLink
                    href={getLocalizedPath(currentLocale, "/services")}
                    invert
                  >
                    {t("hero.secondaryCta")}
                  </TextLink>
                </div>
              </div>

              <aside className="hover-lift overflow-hidden border border-white/20 bg-white/[0.08] text-white/82 backdrop-blur-md">
                <div className="group image-card relative h-72 border-b border-white/16">
                  <Image
                    src={siteMedia.gpsMain.image}
                    alt={siteMedia.gpsMain.alt}
                    fill
                    placeholder="blur"
                    priority
                    sizes="(min-width: 1024px) 340px, 92vw"
                    className="image-hover object-cover object-[58%_center]"
                  />
                </div>
                <div className="p-6">
                  <p className="text-sm leading-7">{t("hero.sideCopy")}</p>
                  <div className="mt-5 grid grid-cols-2 gap-2" aria-hidden="true">
                    {[siteMedia.gpsField01, siteMedia.gpsCraneWellheadCover].map((item) => (
                      <div
                        key={item.alt}
                        className="group image-card relative h-24 overflow-hidden border border-white/16"
                      >
                        <Image
                          src={item.image}
                          alt=""
                          fill
                          placeholder="blur"
                          sizes="160px"
                          className="image-hover object-cover"
                        />
                      </div>
                    ))}
                  </div>
                <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-white/16 pt-6">
                  {[
                    ["founded", t("hero.stats.founded.value"), t("hero.stats.founded.label")],
                    ["iso", t("hero.stats.iso.value"), t("hero.stats.iso.label")],
                    ["market", t("hero.stats.market.value"), t("hero.stats.market.label")],
                  ].map(([key, value, label]) => (
                    <div key={key}>
                      <dt className="text-3xl font-light text-white">{value}</dt>
                      <dd className="mt-2 text-xs text-white/58">{label}</dd>
                    </div>
                  ))}
                </dl>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section id="services" className="bg-[#eaf0f6] px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <SectionIntro
                eyebrow={t("nav.services")}
                title={t("services.aria")}
                copy={t("capabilities.intro")}
                wide
              />
              <TextLink href={getLocalizedPath(currentLocale, "/services")}>
                {t("hero.secondaryCta")}
              </TextLink>
            </div>

            <ServiceCarousel
              countLabel={t("services.countLabel")}
              nextLabel={t("services.nextLabel")}
              previousLabel={t("services.previousLabel")}
              services={services}
            />
          </div>
        </section>

        <section className="bg-white px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="border-l-4 border-[#042a54] pl-6 sm:pl-8">
              <SectionIntro
                eyebrow={t("expertise.eyebrow")}
                title={t("expertise.title")}
                copy={t("expertise.copy")}
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
            <MediaPanel
              className="min-h-[520px]"
              mediaKey="gpsField01"
              priority
            />
          </div>
        </section>

        <section className="bg-[#042a54] px-5 py-20 text-white sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <SectionIntro
              eyebrow={t("capabilities.eyebrow")}
              title={t("capabilities.title")}
              copy={t("capabilities.intro")}
              invert
              wide
            />
            <div className="mt-12 grid gap-px overflow-hidden border border-white/16 bg-white/16 md:grid-cols-2 xl:grid-cols-3">
              {capabilities.map((item) => (
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

        <section className="bg-[#eaf0f6] px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
            <div className="border border-[#c9d7e5] border-t-4 border-t-[#042a54] bg-white p-8 sm:p-10">
              <SectionIntro
                eyebrow={t("jetPump.eyebrow")}
                title={t("jetPump.title")}
                copy={t("jetPump.copy")}
              />
              <div className="mt-9 grid gap-3 sm:grid-cols-2">
                {jetPoints.map((point) => (
                  <div
                    key={point}
                    className="hover-lift border border-[#d9e0e7] bg-[#f3f5f7] px-4 py-4 text-sm font-medium text-[#042a54]"
                  >
                    {point}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-5">
              <MediaPanel className="min-h-[280px]" mediaKey="gpsField02" />
              <InfoCard
                eyebrow={t("jetPump.partnershipTitle")}
                title="Sonatrach / Jet Pump"
                copy={t("jetPump.partnershipCopy")}
              />
            </div>
          </div>
        </section>

        <section className="bg-[#dfe9f3] px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <SectionIntro
              eyebrow={t("safety.eyebrow")}
              title={t("safety.title")}
              copy={t("safety.copy")}
            />
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
              {standards.map((item) => (
                <InfoCard key={item.key} title={item.title} copy={item.copy} />
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="bg-white px-5 py-16 sm:px-8 lg:px-10">
          <div className="mx-auto flex max-w-7xl flex-col gap-8 border-t border-[#d9e0e7] pt-12 lg:flex-row lg:items-center lg:justify-between">
            <SectionIntro
              eyebrow={t("contact.eyebrow")}
              title={t("contact.title")}
              copy={t("contact.email")}
            />
            <TextLink href={getLocalizedPath(currentLocale, "/contact")}>
              {t("nav.cta")}
            </TextLink>
          </div>
        </section>

        <SiteFooter locale={locale} />
      </main>
    </>
  );
}
