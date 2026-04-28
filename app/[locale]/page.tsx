import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { CompanyProfileShowcase } from "./company-profile-showcase";
import {
  capabilityKeys,
  companyKeys,
  jetPointKeys,
  serviceKeys,
  standardKeys,
} from "./site-data";
import type { Locale } from "@/i18n/routing";
import { AmbientMedia } from "./ambient-media";
import { HomeAnimations } from "./home-animations";
import { HeroOilScene } from "./hero-oil-scene";
import { JsonLd } from "./json-ld";
import { SaharaMapShowcase } from "./sahara-map-showcase";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import {
  buildWebPageJsonLd,
  buildPageMetadata,
  buildServicesJsonLd,
  getLocalizedPath,
} from "./seo";
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
  const isFrench = locale === "fr";
  const saharaSection = isFrench
    ? {
        eyebrow: "Empreinte saharienne",
        hint: "Survolez la carte",
        intro:
          "GPS Energy opere pour un contexte algerien exigeant. Cette lecture visuelle ancre mieux le site dans le Sahara, avec des references geographiques, des terrains reels et des paysages qui correspondent au marche vise.",
        title: "Une lecture visuelle du Sahara algerien, avec de vraies images du terrain.",
        locations: [
          {
            copy:
              "Hassi Messaoud reste un repere fort pour parler de support de production, de logistique petroliere et de maintenance d'equipements de surface dans le desert algerien.",
            id: "hassi-messaoud",
            imageAlt: "Paysage desertique pres de Hassi Messaoud en Algerie",
            mediaKey: "hassiMessaoud" as const,
            name: "Hassi Messaoud",
            note: "Pole emblematique pour la production, les actifs de surface et l'appui operationnel.",
            stat: "Production hub",
            x: 61,
            y: 40,
          },
          {
            copy:
              "Le Grand Erg Oriental traduit l'echelle du terrain saharien, avec ses longues traverses, ses contraintes de mobilite et la necessite d'une execution sobre et bien preparee.",
            id: "grand-erg",
            imageAlt: "Dune et chameau dans le Grand Erg Oriental en Algerie",
            mediaKey: "grandErgCamel" as const,
            name: "Grand Erg Oriental",
            note: "Un paysage de dunes qui evoque la logistique longue distance et l'acces au terrain.",
            stat: "Desert access",
            x: 58,
            y: 55,
          },
          {
            copy:
              "Le massif du Tassili n'Ajjer renforce l'idee d'un site plus ancre dans le territoire, moins generique, et plus proche de l'environnement reel des operations dans le sud-est algerien.",
            id: "tassili",
            imageAlt: "Dunes et formations rocheuses au Tassili n'Ajjer",
            mediaKey: "tassiliDunes" as const,
            name: "Tassili n'Ajjer",
            note: "Massif saharien du sud-est, entre roche, sable et isolement operationnel.",
            stat: "Southeast Algeria",
            x: 73,
            y: 73,
          },
          {
            copy:
              "La vue aerienne des dunes offre une vision plus large du Sahara algerien et donne au site une respiration visuelle plus premium, plus territoriale et plus credible.",
            id: "central-sahara",
            imageAlt: "Vue aerienne des dunes du Sahara algerien",
            mediaKey: "saharaDrone" as const,
            name: "Central Sahara",
            note: "Une lecture large du territoire saharien, utile pour le ton visuel global du site.",
            stat: "Aerial terrain",
            x: 46,
            y: 64,
          },
        ],
      }
    : {
        eyebrow: "Saharan footprint",
        hint: "Hover the map",
        intro:
          "GPS Energy operates in a demanding Algerian context. This visual block grounds the site in the Sahara with recognizable geography, real terrain references and imagery that feels tied to the market instead of generic oil-and-gas stock.",
        title: "A more tangible reading of the Algerian Sahara, with real terrain imagery.",
        locations: [
          {
            copy:
              "Hassi Messaoud gives the site a stronger link to production support, petroleum logistics and wellhead-related field activity in Algeria's operating landscape.",
            id: "hassi-messaoud",
            imageAlt: "Desert landscape near Hassi Messaoud in Algeria",
            mediaKey: "hassiMessaoud" as const,
            name: "Hassi Messaoud",
            note: "A clear production landmark for field support, surface assets and operational credibility.",
            stat: "Production hub",
            x: 61,
            y: 40,
          },
          {
            copy:
              "The Grand Erg Oriental introduces the scale of Saharan movement, long access corridors and the kind of prepared field logistics that a serious energy-services site should visually imply.",
            id: "grand-erg",
            imageAlt: "Camel and large dune in the Grand Erg Oriental in Algeria",
            mediaKey: "grandErgCamel" as const,
            name: "Grand Erg Oriental",
            note: "Dune territory that speaks to reach, access and movement across southern corridors.",
            stat: "Desert access",
            x: 58,
            y: 55,
          },
          {
            copy:
              "Tassili n'Ajjer gives the site a more distinctive regional signature, pushing it away from generic industry visuals and closer to the real character of southeastern Algeria.",
            id: "tassili",
            imageAlt: "Dunes and rock formations at Tassili n'Ajjer in the Algerian Sahara",
            mediaKey: "tassiliDunes" as const,
            name: "Tassili n'Ajjer",
            note: "A remote sandstone and dune landscape with a strong southeastern Algeria identity.",
            stat: "Southeast Algeria",
            x: 73,
            y: 73,
          },
          {
            copy:
              "An aerial dune view broadens the visual language of the homepage, making the brand feel more rooted in Algerian desert territory and less reliant on abstract corporate surfaces.",
            id: "central-sahara",
            imageAlt: "Aerial view of dunes in the Algerian Sahara",
            mediaKey: "saharaDrone" as const,
            name: "Central Sahara",
            note: "Wide Saharan terrain imagery that gives the homepage a stronger sense of place.",
            stat: "Aerial terrain",
            x: 46,
            y: 64,
          },
        ],
      };
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
      <main className="overflow-hidden bg-[#12396f] text-white">
        <section
          id="top"
          data-hero
          className="relative isolate min-h-[92svh] border-b border-white/10"
        >
          <HeroOilScene />
          <div className="premium-hero-grid" />
          <div className="premium-hero-sheen" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,57,111,0.86)_0%,rgba(18,57,111,0.54)_46%,rgba(11,45,89,0.12)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_28%,rgba(255,107,0,0.16),transparent_24%),radial-gradient(circle_at_58%_16%,rgba(255,180,102,0.1),transparent_20%),radial-gradient(circle_at_28%_72%,rgba(248,251,255,0.06),transparent_28%)]" />
          <SiteHeader currentPath="/" locale={locale} page="home" overlay />
          <div className="relative z-10 mx-auto flex min-h-[92svh] max-w-7xl items-end px-5 pb-12 pt-32 sm:px-8 sm:pb-16 lg:px-10">
            <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
              <div className="max-w-4xl">
                <div
                  data-hero-reveal
                  data-reveal-from="left"
                  className="mb-7 flex items-center gap-4 text-xs font-semibold uppercase text-white/82"
                >
                  <span className="h-px w-12 bg-[#ff9a46]" />
                  <span>{t("hero.eyebrow")}</span>
                </div>

                <p
                  data-hero-reveal
                  data-reveal-from="left"
                  className="text-sm font-semibold uppercase tracking-[0.14em] text-white/82"
                >
                  GPS Energy
                </p>

                <h1
                  data-hero-reveal
                  data-reveal-from="left"
                  className="mt-4 max-w-[21rem] break-words text-[2.35rem] font-semibold uppercase leading-[0.96] text-white drop-shadow-[0_8px_22px_rgba(11,45,89,0.34)] sm:max-w-3xl sm:text-6xl lg:text-[5.25rem]"
                >
                  <span className="block text-white">{t("hero.title")}</span>
                </h1>

                <p
                  data-hero-reveal
                  data-reveal-from="left"
                  className="mt-7 max-w-xl text-base leading-7 text-white/86 sm:text-lg"
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
                    className="premium-button inline-flex min-h-12 items-center justify-center bg-[linear-gradient(135deg,#ffb466_0%,#ff6b00_100%)] px-6 text-sm font-semibold text-white shadow-[0_0_44px_rgba(255,107,0,0.24)] transition hover:bg-white hover:text-[#0b2d59] hover:shadow-[0_0_54px_rgba(255,255,255,0.18)]"
                    data-cursor-label={t("hero.primaryCta")}
                    data-magnetic
                  >
                    <span>{t("hero.primaryCta")}</span>
                  </Link>
                  <Link
                    href={getLocalizedPath(locale as Locale, "/services")}
                    className="premium-button inline-flex min-h-12 items-center justify-center border border-white/18 px-6 text-sm font-semibold text-white transition hover:border-white hover:bg-white hover:text-[#0b2d59]"
                    data-cursor-label={t("hero.secondaryCta")}
                    data-magnetic
                  >
                    <span>{t("hero.secondaryCta")}</span>
                  </Link>
                </div>

                <div
                  data-hero-reveal
                  data-reveal-from="left"
                  className="mt-9 grid max-w-2xl grid-cols-3 gap-2 sm:gap-3"
                  aria-hidden="true"
                >
                  {[
                    siteMedia.algeriaElMerkRig,
                    siteMedia.oilPumpjackPermian,
                    siteMedia.oilWellheadChristmasTree,
                  ].map((media, index) => (
                    <div
                      key={media.alt}
                      className={`relative h-20 overflow-hidden border border-white/14 bg-white/7 shadow-[0_18px_54px_rgba(0,0,0,0.28)] sm:h-28 ${
                        index === 1 ? "translate-y-3" : ""
                      }`}
                    >
                      <Image
                        src={media.image}
                        alt=""
                        fill
                        placeholder="blur"
                        sizes="(min-width: 640px) 210px, 30vw"
                        className="object-cover opacity-78 saturate-[1.08]"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(18,57,111,0.18),transparent_58%,rgba(255,107,0,0.22))]" />
                    </div>
                  ))}
                </div>
              </div>

              <aside
                data-hero-reveal
                data-reveal-from="right"
                className="border-l border-white/16 pl-5 text-white/78 sm:pl-7 lg:border lg:border-white/12 lg:bg-white/[0.045] lg:p-6 lg:shadow-[0_24px_80px_rgba(0,0,0,0.35)] lg:backdrop-blur-md"
              >
                <div
                  data-vertical-line
                  className="mb-6 h-20 w-px bg-gradient-to-b from-[#ff6b00] via-[#ffb466] to-[#12396f]"
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
          className="relative min-h-[180svh] bg-[#edf3fa] text-[#0a203d]"
        >
          <AmbientMedia
            image={siteMedia.algeriaElMerkRig.image}
            imageAlt={siteMedia.algeriaElMerkRig.alt}
            imageClassName="object-cover object-[58%_center] opacity-14"
            overlayClassName="bg-[linear-gradient(90deg,rgba(243,247,252,0.96)_0%,rgba(243,247,252,0.84)_45%,rgba(243,247,252,0.8)_100%)]"
          />
          <div
            data-scroll-panel
            className="sticky top-0 flex min-h-svh items-center px-5 py-16 sm:px-8 lg:px-10"
          >
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
              <div data-scroll-copy className="max-w-xl">
                <p className="text-xs font-semibold uppercase text-[#12396f]">
                  {t("expertise.eyebrow")}
                </p>
                <h2 className="mt-5 max-w-xl text-4xl font-semibold leading-[1.02] sm:text-6xl">
                  {t("expertise.title")}
                </h2>
                <p className="mt-6 max-w-xl text-base leading-7 text-[#526171] sm:text-lg">
                  {t("expertise.copy")}
                </p>
              </div>

              <div className="grid gap-4" data-scroll-visual>
                <CompanyProfileShowcase
                  copy={t("expertise.copy")}
                  eyebrow={t("companyBand.eyebrow")}
                  metrics={companyItems}
                  title={t("companyBand.title")}
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  {companyItems.map((item) => (
                    <article
                      key={item.key}
                      data-premium-card
                      className="border border-black/10 bg-white p-6 shadow-sm"
                    >
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#12396f]">
                        {item.label}
                      </p>
                      <h3 className="mt-5 text-3xl font-semibold text-[#0a203d]">
                        {item.value}
                      </h3>
                      <p className="mt-4 text-sm leading-6 text-[#546273]">
                        {item.copy}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#0b2d59] px-5 py-18 text-white sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <SaharaMapShowcase
              eyebrow={saharaSection.eyebrow}
              hint={saharaSection.hint}
              intro={saharaSection.intro}
              locations={saharaSection.locations}
              title={saharaSection.title}
            />
          </div>
        </section>

        <section
          id="services"
          data-scroll-shell
          className="relative min-h-[180svh] bg-white text-[#0a203d]"
        >
          <AmbientMedia
            image={siteMedia.hero.image}
            imageAlt={siteMedia.hero.alt}
            videoSrc="/pumpjack.webm"
            videoPoster="/hero-wellhead.webp"
            imageClassName="object-cover object-[70%_center] opacity-9"
            videoClassName="object-cover object-center opacity-12 saturate-[0.95]"
            overlayClassName="bg-[linear-gradient(90deg,rgba(255,255,255,0.97)_0%,rgba(255,255,255,0.92)_44%,rgba(255,255,255,0.9)_100%)]"
          />
          <div
            data-scroll-panel
            className="sticky top-0 flex min-h-svh items-center px-5 py-16 sm:px-8 lg:px-10"
          >
            <div className="mx-auto max-w-7xl">
              <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div data-scroll-copy>
                  <p className="text-xs font-semibold uppercase text-[#ff6b00]">
                    {t("nav.services")}
                  </p>
                  <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.04] sm:text-6xl">
                    {t("services.aria")}
                  </h2>
                </div>
                <p
                  data-scroll-copy
                  className="max-w-xl text-sm leading-7 text-[#546273]"
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
                    data-premium-card
                    className="group relative min-h-[320px] overflow-hidden border border-black/10 bg-[#f5f8fc] p-6 shadow-sm"
                  >
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#ff6b00] via-[#ffb466] to-[#12396f]" />
                    <div className="flex items-start justify-between gap-4">
                      <span className="font-mono text-xs text-[#12396f]">
                        0{index + 1}
                      </span>
                      <span className="inline-flex h-10 min-w-10 items-center justify-center border border-black/10 bg-white px-3 text-[0.68rem] font-semibold uppercase text-[#0a203d]">
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
          </div>
        </section>

        <section
          data-scroll-shell
          className="relative min-h-[180svh] bg-[#12396f] text-white"
        >
          <AmbientMedia
            image={siteMedia.algeriaElMerkRigNight.image}
            imageAlt={siteMedia.algeriaElMerkRigNight.alt}
            imageClassName="object-cover object-center opacity-18"
            overlayClassName="bg-[linear-gradient(90deg,rgba(18,57,111,0.92)_0%,rgba(18,57,111,0.82)_45%,rgba(11,45,89,0.78)_100%)]"
          />
          <div
            data-scroll-panel
            className="sticky top-0 flex min-h-svh items-center px-5 py-16 sm:px-8 lg:px-10"
          >
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
              <div data-scroll-copy className="max-w-2xl">
                <p className="text-xs font-semibold uppercase text-[#ff6b00]">
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
                  <article
                    key={item.key}
                    data-premium-card
                    className="bg-[#1a4e88] p-6"
                  >
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
          className="relative min-h-[180svh] bg-[#edf3fa] text-[#0a203d]"
        >
          <AmbientMedia
            image={siteMedia.oilPumpjackPermian.image}
            imageAlt={siteMedia.oilPumpjackPermian.alt}
            imageClassName="object-cover object-[66%_center] opacity-12"
            overlayClassName="bg-[linear-gradient(90deg,rgba(237,243,250,0.96)_0%,rgba(237,243,250,0.9)_46%,rgba(237,243,250,0.86)_100%)]"
          />
          <div
            data-scroll-panel
            className="sticky top-0 flex min-h-svh items-center px-5 py-16 sm:px-8 lg:px-10"
          >
            <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch">
              <div
                data-scroll-copy
                className="border border-black/10 bg-white p-7 shadow-sm sm:p-10"
              >
                <p className="text-xs font-semibold uppercase text-[#ff6b00]">
                  {t("jetPump.eyebrow")}
                </p>
                <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.04] sm:text-6xl">
                  {t("jetPump.title")}
                </h2>
                <p className="mt-6 max-w-2xl text-base leading-7 text-[#546273]">
                  {t("jetPump.copy")}
                </p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2" data-scroll-visual>
                  {jetPoints.map((point) => (
                    <div
                      key={point}
                      data-premium-card
                    className="border border-black/10 bg-[#f5f8fc] px-4 py-4 text-sm font-medium text-[#0a203d]"
                    >
                      {point}
                    </div>
                  ))}
                </div>
              </div>

              <aside
                data-scroll-visual
                data-premium-card
                className="flex flex-col justify-between border border-[#ff6b00]/25 bg-[#12396f] p-7 text-white shadow-[0_24px_80px_rgba(11,45,89,0.24)] sm:p-10"
              >
                <div>
                  <p className="text-xs font-semibold uppercase text-[#ffb466]">
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
          className="relative min-h-[180svh] border-y border-white/10 bg-[#12396f] text-white"
        >
          <AmbientMedia
            image={siteMedia.flareStack.image}
            imageAlt={siteMedia.flareStack.alt}
            imageClassName="object-cover object-[78%_center] opacity-14"
            overlayClassName="bg-[linear-gradient(90deg,rgba(18,57,111,0.92)_0%,rgba(26,78,136,0.82)_50%,rgba(11,45,89,0.82)_100%)]"
          />
          <div
            data-scroll-panel
            className="sticky top-0 flex min-h-svh items-center px-5 py-12 sm:px-8 lg:px-10"
          >
            <div className="mx-auto max-w-7xl">
              <div className="grid gap-6 md:grid-cols-3">
                <div data-scroll-copy className="md:col-span-2">
                  <p className="text-xs font-semibold uppercase text-[#ffb466]">
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
                    data-premium-card
                    className="border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm"
                  >
                    <p className="text-sm font-semibold uppercase text-[#ff9a46]">
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
          className="bg-white px-5 py-14 text-[#0a203d] sm:px-8 lg:px-10"
        >
          <div
            data-section-reveal
            className="mx-auto flex max-w-7xl flex-col gap-6 border-l-4 border-[#ff9a46] pl-6 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-xs font-semibold uppercase text-[#12396f]">
                {t("contact.eyebrow")}
              </p>
              <h2 className="mt-3 text-3xl font-semibold">
                {t("contact.title")}
              </h2>
            </div>
            <Link
              href={getLocalizedPath(locale as Locale, "/contact")}
              className="premium-button inline-flex min-h-12 items-center justify-center bg-[linear-gradient(135deg,#12396f_0%,#ff6b00_130%)] px-6 text-sm font-semibold text-white transition hover:bg-[#ff6b00] hover:text-white"
              data-cursor-label={t("nav.cta")}
              data-magnetic
            >
              <span>{t("nav.cta")}</span>
            </Link>
          </div>
        </section>
        <SiteFooter locale={locale} />
      </main>
    </>
  );
}
