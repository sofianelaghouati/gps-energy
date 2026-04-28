import Link from "next/link";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { BrandLogo } from "./brand-logo";
import { getLocalizedPath } from "./seo";

type Props = {
  locale: string;
};

const navItems = [
  { href: "/company", labelKey: "nav.expertise" },
  { href: "/services", labelKey: "nav.services" },
  { href: "/standards", labelKey: "nav.safety" },
  { href: "/contact", labelKey: "nav.contact" },
] as const;

export async function SiteFooter({ locale }: Props) {
  const t = await getTranslations("HomePage");

  return (
    <footer className="bg-[#0b2d59] px-5 py-12 text-white sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-8 border-t border-white/10 pt-8 sm:gap-10 sm:pt-10 md:grid-cols-[1.1fr_0.8fr_0.8fr]">
        <div data-section-reveal className="max-w-md">
          <BrandLogo
            className="h-auto w-[190px] max-w-[78vw] sm:w-[238px]"
            framed
            variant="full"
          />
          <p className="mt-4 max-w-md text-sm leading-7 text-white/64 sm:mt-5">
            {t("footer.summary")}
          </p>
        </div>

        <div data-section-reveal>
          <p className="text-xs font-semibold uppercase text-[#ffb466]">
            {t("footer.companyTitle")}
          </p>
          <div className="mt-5 grid gap-3 text-sm text-white/68">
            <p>{t("footer.companyItems.private")}</p>
            <p>{t("footer.companyItems.founded")}</p>
            <p>{t("footer.companyItems.market")}</p>
          </div>
          <p className="mt-8 text-xs font-semibold uppercase text-[#ffb466]">
            {t("footer.linksTitle")}
          </p>
          <div className="mt-5 grid gap-3 text-sm text-white/68">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={getLocalizedPath(locale as Locale, item.href)}
                className="transition hover:text-white"
                data-cursor-label={t(item.labelKey)}
                data-magnetic
                data-premium-nav
              >
                {t(item.labelKey)}
              </Link>
            ))}
          </div>
        </div>

        <div data-section-reveal>
          <p className="text-xs font-semibold uppercase text-[#ffb466]">
            {t("footer.contactTitle")}
          </p>
          <div className="mt-5 grid gap-4 text-sm text-white/68">
            <div>
              <p className="text-white/40">{t("footer.emailLabel")}</p>
              <a
                href={`mailto:${t("contact.email")}`}
                className="mt-1 inline-block text-white transition hover:text-[#ff6b00]"
                data-cursor-label="Email"
                data-magnetic
              >
                {t("contact.email")}
              </a>
            </div>
            <div>
              <p className="text-white/40">{t("footer.linkedinLabel")}</p>
              <a
                href="https://www.linkedin.com/company/gps-energy-dz"
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-block text-white transition hover:text-[#ff6b00]"
                data-cursor-label="LinkedIn"
                data-magnetic
              >
                {t("footer.linkedinValue")}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-sm text-white/42">
        {t("footer.copyright")}
      </div>
    </footer>
  );
}
