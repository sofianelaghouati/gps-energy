import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { JsonLd } from "../json-ld";
import { PageHero } from "../page-hero";
import { InfoCard, SectionIntro } from "../redesign-primitives";
import { SiteFooter } from "../site-footer";
import { SiteHeader } from "../site-header";
import { buildBreadcrumbJsonLd, buildPageMetadata, buildWebPageJsonLd } from "../seo";

type Props = {
  params: Promise<{ locale: string }>;
};

const topicKeys = ["jetPump", "wellhead", "welltest", "logistics"] as const;
const cardKeys = ["email", "coverage", "linkedin"] as const;
const requestKeys = ["scope", "site", "timing"] as const;

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
  const requestItems = requestKeys.map((key) => ({
    key,
    title: pageT(`request.items.${key}.title`),
    copy: pageT(`request.items.${key}.copy`),
  }));
  const pageJsonLd = buildWebPageJsonLd({
    locale: currentLocale,
    pathname: "/contact",
    name: pageT("metaTitle"),
    description: pageT("metaDescription"),
    type: "ContactPage",
  });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(currentLocale, [
    { name: "GPS Energy" },
    { name: homeT("nav.contact"), path: "/contact" },
  ]);

  return (
    <>
      <JsonLd data={pageJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <main className="overflow-hidden bg-white text-[#06111f]">
        <SiteHeader currentPath="/contact" locale={locale} page="contact" />
        <PageHero
          backgroundMedia="industryRig"
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
            pageT("hero.highlights.email"),
            pageT("hero.highlights.coverage"),
            pageT("hero.highlights.services"),
          ]}
        />

        <section className="bg-white px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="border-l-4 border-[#042a54] pl-6 sm:pl-8">
              <SectionIntro
                eyebrow={pageT("approach.eyebrow")}
                title={pageT("approach.title")}
                copy={pageT("approach.copy")}
              />
            </div>
            <div className="grid gap-6 text-base leading-8 text-[#3e4a59]">
              <p>{pageT("approach.detail")}</p>
              <p>{pageT("approach.followup")}</p>
            </div>
          </div>
        </section>

        <section className="bg-[#eaf0f6] px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-px overflow-hidden border border-[#d9e0e7] bg-[#d9e0e7] lg:grid-cols-3">
            <article className="hover-lift border-t-4 border-t-[#042a54] bg-white p-8">
              <p className="text-sm font-medium text-[#042a54]">{cards[0]?.title}</p>
              <a
                href={`mailto:${homeT("contact.email")}`}
                className="quiet-link mt-6 block text-2xl font-light text-[#042a54]"
              >
                {homeT("contact.email")}
              </a>
              <p className="mt-5 text-sm leading-7 text-[#566373]">
                {cards[0]?.copy}
              </p>
            </article>

            <InfoCard
              eyebrow={cards[1]?.title}
              title="Algeria"
              copy={cards[1]?.copy ?? ""}
            />

            <article className="hover-lift border-t-4 border-t-[#042a54] bg-white p-8">
              <p className="text-sm font-medium text-[#042a54]">{cards[2]?.title}</p>
              <a
                href="https://www.linkedin.com/company/gps-energy-dz"
                target="_blank"
                rel="noreferrer"
                className="quiet-link mt-6 block text-2xl font-light text-[#042a54]"
              >
                GPS ENERGY
              </a>
              <p className="mt-5 text-sm leading-7 text-[#566373]">
                {cards[2]?.copy}
              </p>
            </article>
          </div>
        </section>

        <section className="bg-white px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <SectionIntro
              eyebrow={pageT("request.eyebrow")}
              title={pageT("request.title")}
              copy={pageT("request.copy")}
              wide
            />
            <div className="mt-10 grid gap-px overflow-hidden border border-[#d9e0e7] bg-[#d9e0e7] lg:grid-cols-3">
              {requestItems.map((item) => (
                <InfoCard key={item.key} title={item.title} copy={item.copy} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#042a54] px-5 py-20 text-white sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <SectionIntro
              eyebrow={pageT("topics.eyebrow")}
              title={pageT("topics.title")}
              invert
              wide
            />
            <div className="mt-12 grid gap-3 md:grid-cols-2">
              {topics.map((item) => (
                <div
                  key={item}
                  className="hover-lift border border-white/16 bg-white/[0.04] px-5 py-4 text-base font-medium text-white"
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
