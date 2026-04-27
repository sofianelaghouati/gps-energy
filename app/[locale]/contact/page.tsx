import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { HomeAnimations } from "../home-animations";
import { JsonLd } from "../json-ld";
import { PageHero } from "../page-hero";
import { SiteFooter } from "../site-footer";
import { SiteHeader } from "../site-header";
import { buildBreadcrumbJsonLd, buildPageMetadata, buildWebPageJsonLd } from "../seo";

type Props = {
  params: Promise<{ locale: string }>;
};

const topicKeys = ["jetPump", "wellhead", "welltest", "logistics"] as const;
const cardKeys = ["email", "coverage", "linkedin"] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Pages.contact" });
  const metadataT = await getTranslations({ locale, namespace: "Metadata" });

  return buildPageMetadata({
    locale: locale as Locale,
    pathname: "/contact",
    title: t("metaTitle"),
    description: t("metaDescription"),
    imageAlt: metadataT("ogImageAlt"),
  });
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const currentLocale = locale as Locale;

  setRequestLocale(locale);

  const homeT = await getTranslations("HomePage");
  const pageT = await getTranslations("Pages.contact");
  const cards = cardKeys.map((key) => ({
    key,
    title: pageT(`cards.${key}.title`),
    copy: pageT(`cards.${key}.copy`),
  }));
  const topics = topicKeys.map((key) => pageT(`topics.items.${key}`));
  const pageJsonLd = buildWebPageJsonLd({
    locale: currentLocale,
    pathname: "/contact",
    name: pageT("metaTitle"),
    description: pageT("metaDescription"),
  });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(currentLocale, [
    { name: "GPS Energy" },
    { name: homeT("nav.contact"), path: "/contact" },
  ]);

  return (
    <>
      <HomeAnimations />
      <JsonLd data={pageJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <main className="overflow-hidden bg-[#557da5] text-white">
        <SiteHeader currentPath="/contact" locale={locale} page="contact" />
        <PageHero
          backgroundMedia="hero"
          eyebrow={pageT("hero.eyebrow")}
          title={pageT("hero.title")}
          copy={pageT("hero.copy")}
          highlights={[
            pageT("hero.highlights.email"),
            pageT("hero.highlights.coverage"),
            pageT("hero.highlights.services"),
          ]}
        />

        <section className="bg-[#e7eff6] px-5 py-18 text-[#17334d] sm:px-8 lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-3">
            <article
              data-section-reveal
              data-premium-card
              data-reveal-from="left"
              className="border border-black/10 bg-white p-7 shadow-sm"
            >
              <p className="text-xs font-semibold uppercase text-[#557da5]">
                {cards[0]?.title}
              </p>
              <a
                href={`mailto:${homeT("contact.email")}`}
                className="mt-5 block text-2xl font-semibold text-[#17334d] hover:text-[#a38356]"
              >
                {homeT("contact.email")}
              </a>
              <p className="mt-4 text-sm leading-7 text-[#546273]">
                {cards[0]?.copy}
              </p>
            </article>

            <article
              data-section-reveal
              data-premium-card
              data-reveal-from="right"
              className="border border-black/10 bg-white p-7 shadow-sm"
            >
              <p className="text-xs font-semibold uppercase text-[#557da5]">
                {cards[1]?.title}
              </p>
              <p className="mt-5 text-2xl font-semibold text-[#17334d]">Algeria</p>
              <p className="mt-4 text-sm leading-7 text-[#546273]">
                {cards[1]?.copy}
              </p>
            </article>

            <article
              data-section-reveal
              data-premium-card
              data-reveal-from="left"
              className="border border-black/10 bg-white p-7 shadow-sm"
            >
              <p className="text-xs font-semibold uppercase text-[#557da5]">
                {cards[2]?.title}
              </p>
              <a
                href="https://www.linkedin.com/company/gps-energy-dz"
                target="_blank"
                rel="noreferrer"
                className="mt-5 block text-2xl font-semibold text-[#17334d] hover:text-[#a38356]"
              >
                GPS ENERGY
              </a>
              <p className="mt-4 text-sm leading-7 text-[#546273]">
                {cards[2]?.copy}
              </p>
            </article>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#365f84] px-5 py-18 text-white sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div data-section-reveal data-reveal-from="left" className="max-w-3xl">
              <p className="text-xs font-semibold uppercase text-[#a38356]">
                {pageT("topics.eyebrow")}
              </p>
              <h2 className="mt-4 text-4xl font-semibold leading-[1.02] sm:text-6xl">
                {pageT("topics.title")}
              </h2>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {topics.map((item, index) => (
                <div
                  key={item}
                  data-section-reveal
                  data-premium-card
                  data-reveal-from={index % 2 === 0 ? "left" : "right"}
                  className="border border-white/10 bg-white/[0.03] px-5 py-4 text-base font-medium text-white/88"
                >
                  {item}
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
