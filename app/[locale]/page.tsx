import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import {
  capabilityKeys,
  companyKeys,
  jetPointKeys,
  serviceKeys,
  standardKeys,
} from "./site-data";
import type { Locale } from "@/i18n/routing";
import { HomeAnimations } from "./home-animations";
import { HeroOilScene } from "./hero-oil-scene";
import { JsonLd } from "./json-ld";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import {
  buildWebPageJsonLd,
  buildPageMetadata,
  buildServicesJsonLd,
  getLocalizedPath,
} from "./seo";

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
      <HomeAnimations />
      <JsonLd data={pageJsonLd} />
      <JsonLd data={servicesJsonLd} />
      <main className="overflow-hidden bg-[#060608] text-white">
        <section
          id="top"
          data-hero
          className="relative isolate min-h-[92svh] border-b border-white/10"
        >
          <HeroOilScene />
          <div className="premium-hero-grid" />
          <div className="premium-hero-sheen" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,6,8,0.94)_0%,rgba(6,6,8,0.62)_46%,rgba(6,6,8,0.3)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_28%,rgba(255,115,0,0.28),transparent_25%),radial-gradient(circle_at_32%_70%,rgba(86,68,219,0.3),transparent_30%)]" />
          <SiteHeader currentPath="/" locale={locale} page="home" overlay />
          <div className="relative z-10 mx-auto flex min-h-[92svh] max-w-7xl items-end px-5 pb-12 pt-32 sm:px-8 sm:pb-16 lg:px-10">
            <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
              <div className="max-w-4xl">
                <div
                  data-hero-reveal
                  data-reveal-from="left"
                  className="mb-7 flex items-center gap-4 text-xs font-semibold uppercase text-white/70"
                >
                  <span className="h-px w-12 bg-[#ff7908]" />
                  <span>{t("hero.eyebrow")}</span>
                </div>

                <p
                  data-hero-reveal
                  data-reveal-from="left"
                  className="text-sm font-semibold uppercase tracking-[0.26em] text-[#d7d2fb]"
                >
                  GPS Energy
                </p>

                <h1
                  data-hero-reveal
                  data-reveal-from="left"
                  className="mt-4 max-w-3xl text-4xl font-semibold leading-[0.96] text-white sm:text-6xl lg:text-[5.55rem]"
                >
                  <span className="block text-white/88">{t("hero.title")}</span>
                </h1>

                <p
                  data-hero-reveal
                  data-reveal-from="left"
                  className="mt-7 max-w-xl text-base leading-7 text-white/74 sm:text-lg"
                >
                  {t("hero.copy")}
                </p>

                <div
                  data-hero-reveal
                  data-reveal-from="left"
                  className="mt-9 flex flex-col gap-3 sm:flex-row"
                >
                  <Link
                    href={getLocalizedPath(locale as Locale, "/contact")}
                    className="inline-flex min-h-12 items-center justify-center bg-[#ff7908] px-6 text-sm font-semibold text-black shadow-[0_0_44px_rgba(255,121,8,0.24)] transition hover:bg-white hover:shadow-[0_0_54px_rgba(255,255,255,0.18)]"
                  >
                    {t("hero.primaryCta")}
                  </Link>
                  <Link
                    href={getLocalizedPath(locale as Locale, "/services")}
                    className="inline-flex min-h-12 items-center justify-center border border-white/18 px-6 text-sm font-semibold text-white transition hover:border-white hover:bg-white hover:text-black"
                  >
                    {t("hero.secondaryCta")}
                  </Link>
                </div>
              </div>

              <aside
                data-hero-reveal
                data-reveal-from="right"
                className="border-l border-white/16 pl-5 text-white/78 sm:pl-7 lg:border lg:border-white/12 lg:bg-white/[0.045] lg:p-6 lg:shadow-[0_24px_80px_rgba(0,0,0,0.35)] lg:backdrop-blur-md"
              >
                <div
                  data-vertical-line
                  className="mb-6 h-20 w-px bg-gradient-to-b from-[#ff7908] to-[#5b48dc]"
                />
                <p className="max-w-sm text-sm leading-6">
                  {t("hero.sideCopy")}
                </p>
                <dl className="mt-7 grid grid-cols-3 gap-3">
                  <div>
                    <dt className="text-2xl font-semibold text-white">
                      {t("hero.stats.founded.value")}
                    </dt>
                    <dd className="mt-1 text-[0.68rem] uppercase text-white/55">
                      {t("hero.stats.founded.label")}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-2xl font-semibold text-white">
                      {t("hero.stats.iso.value")}
                    </dt>
                    <dd className="mt-1 text-[0.68rem] uppercase text-white/55">
                      {t("hero.stats.iso.label")}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-2xl font-semibold text-white">
                      {t("hero.stats.market.value")}
                    </dt>
                    <dd className="mt-1 text-[0.68rem] uppercase text-white/55">
                      {t("hero.stats.market.label")}
                    </dd>
                  </div>
                </dl>
              </aside>
            </div>
          </div>

        </section>

        <section
          id="expertise"
          data-scroll-shell
          className="relative min-h-[180svh] bg-[#f4f1ec] text-[#101014]"
        >
          <div
            data-scroll-panel
            className="sticky top-0 flex min-h-svh items-center px-5 py-16 sm:px-8 lg:px-10"
          >
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div data-scroll-copy>
                <p className="text-xs font-semibold uppercase text-[#5b48dc]">
                  {t("expertise.eyebrow")}
                </p>
                <h2 className="mt-5 max-w-xl text-4xl font-semibold leading-[1.02] sm:text-6xl">
                  {t("expertise.title")}
                </h2>
                <p className="mt-6 max-w-xl text-base leading-7 text-[#4f4d57] sm:text-lg">
                  {t("expertise.copy")}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2" data-scroll-visual>
                {companyItems.map((item) => (
                  <article
                    key={item.key}
                    className="border border-black/10 bg-white p-6 shadow-sm"
                  >
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#5b48dc]">
                      {item.label}
                    </p>
                    <h3 className="mt-5 text-3xl font-semibold text-[#101014]">
                      {item.value}
                    </h3>
                    <p className="mt-4 text-sm leading-6 text-[#55525c]">
                      {item.copy}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="services"
          data-scroll-shell
          className="relative min-h-[180svh] bg-white text-[#101014]"
        >
          <div
            data-scroll-panel
            className="sticky top-0 flex min-h-svh items-center px-5 py-16 sm:px-8 lg:px-10"
          >
            <div className="mx-auto max-w-7xl">
              <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div data-scroll-copy>
                  <p className="text-xs font-semibold uppercase text-[#ff7908]">
                    {t("nav.services")}
                  </p>
                  <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.04] sm:text-6xl">
                    {t("services.aria")}
                  </h2>
                </div>
                <p
                  data-scroll-copy
                  className="max-w-xl text-sm leading-7 text-[#55525c]"
                >
                  {t("capabilities.intro")}
                </p>
              </div>

              <div
                className="grid gap-4 lg:grid-cols-3"
                aria-label={t("services.aria")}
                data-scroll-visual
              >
                {services.map((service, index) => (
                  <article
                    key={service.key}
                    className="group relative min-h-[320px] overflow-hidden border border-black/10 bg-[#f8f4ee] p-6 shadow-sm"
                  >
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#ff7908] to-[#5b48dc]" />
                    <div className="flex items-start justify-between gap-4">
                      <span className="font-mono text-xs text-[#5b48dc]">
                        0{index + 1}
                      </span>
                      <span className="inline-flex h-10 min-w-10 items-center justify-center border border-black/10 bg-white px-3 text-[0.68rem] font-semibold uppercase text-[#101014]">
                        O&amp;G
                      </span>
                    </div>
                    <h3 className="mt-10 text-2xl font-semibold leading-tight">
                      {service.title}
                    </h3>
                    <p className="mt-5 text-sm leading-6 text-[#55525c]">
                      {service.copy}
                    </p>
                    <p className="mt-8 border-t border-black/10 pt-5 text-sm font-semibold text-[#17151b]">
                      {service.benefit}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          data-scroll-shell
          className="relative min-h-[180svh] bg-[#0a0b10] text-white"
        >
          <div
            data-scroll-panel
            className="sticky top-0 flex min-h-svh items-center px-5 py-16 sm:px-8 lg:px-10"
          >
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
              <div data-scroll-copy className="max-w-2xl">
                <p className="text-xs font-semibold uppercase text-[#ff7908]">
                  {t("capabilities.eyebrow")}
                </p>
                <h2 className="mt-4 text-4xl font-semibold leading-[1.05] sm:text-6xl">
                  {t("capabilities.title")}
                </h2>
              </div>

              <div
                className="grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2 xl:grid-cols-3"
                data-scroll-visual
              >
                {capabilities.map((item) => (
                  <article key={item.key} className="bg-[#0d0f14] p-6">
                    <h3 className="text-xl font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-sm leading-6 text-white/68">
                      {item.copy}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          data-scroll-shell
          className="relative min-h-[180svh] bg-[#f4f1ec] text-[#101014]"
        >
          <div
            data-scroll-panel
            className="sticky top-0 flex min-h-svh items-center px-5 py-16 sm:px-8 lg:px-10"
          >
            <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch">
              <div
                data-scroll-copy
                className="border border-black/10 bg-white p-7 shadow-sm sm:p-10"
              >
                <p className="text-xs font-semibold uppercase text-[#ff7908]">
                  {t("jetPump.eyebrow")}
                </p>
                <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.04] sm:text-6xl">
                  {t("jetPump.title")}
                </h2>
                <p className="mt-6 max-w-2xl text-base leading-7 text-[#55525c]">
                  {t("jetPump.copy")}
                </p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2" data-scroll-visual>
                  {jetPoints.map((point) => (
                    <div
                      key={point}
                      className="border border-black/10 bg-[#f8f4ee] px-4 py-4 text-sm font-medium text-[#17151b]"
                    >
                      {point}
                    </div>
                  ))}
                </div>
              </div>

              <aside
                data-scroll-visual
                className="flex flex-col justify-between border border-[#ff7908]/20 bg-[#111116] p-7 text-white shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:p-10"
              >
                <div>
                  <p className="text-xs font-semibold uppercase text-[#5b48dc]">
                    {t("jetPump.partnershipTitle")}
                  </p>
                  <p className="mt-6 text-lg leading-8 text-white/78">
                    {t("jetPump.partnershipCopy")}
                  </p>
                </div>
                <div className="mt-8 border-t border-white/10 pt-6">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/45">
                    Sonatrach
                  </p>
                  <p className="mt-3 text-2xl font-semibold text-white">
                    Jet Pump
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section
          id="safety"
          data-scroll-shell
          className="relative min-h-[180svh] border-y border-white/10 bg-[#060608] text-white"
        >
          <div
            data-scroll-panel
            className="sticky top-0 flex min-h-svh items-center px-5 py-12 sm:px-8 lg:px-10"
          >
            <div className="mx-auto max-w-7xl">
              <div className="grid gap-6 md:grid-cols-3">
                <div data-scroll-copy className="md:col-span-2">
                  <p className="text-xs font-semibold uppercase text-[#ff7908]">
                    {t("safety.eyebrow")}
                  </p>
                  <h2 className="mt-4 max-w-4xl text-3xl font-semibold leading-tight sm:text-6xl">
                    {t("safety.title")}
                  </h2>
                </div>
                <p
                  data-scroll-copy
                  className="text-sm leading-6 text-white/64"
                >
                  {t("safety.copy")}
                </p>
              </div>
              <div className="mt-10 grid gap-4 md:grid-cols-3" data-scroll-visual>
                {standards.map((item) => (
                  <article
                    key={item.key}
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
          </div>
        </section>

        <section
          id="contact"
          className="bg-white px-5 py-14 text-[#101014] sm:px-8 lg:px-10"
        >
          <div
            data-section-reveal
            className="mx-auto flex max-w-7xl flex-col gap-6 border-l-4 border-[#ff7908] pl-6 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-xs font-semibold uppercase text-[#5b48dc]">
                {t("contact.eyebrow")}
              </p>
              <h2 className="mt-3 text-3xl font-semibold">
                {t("contact.title")}
              </h2>
            </div>
            <Link
              href={getLocalizedPath(locale as Locale, "/contact")}
              className="inline-flex min-h-12 items-center justify-center bg-[#101014] px-6 text-sm font-semibold text-white transition hover:bg-[#ff7908] hover:text-black"
            >
              {t("nav.cta")}
            </Link>
          </div>
        </section>
        <SiteFooter locale={locale} />
      </main>
    </>
  );
}
