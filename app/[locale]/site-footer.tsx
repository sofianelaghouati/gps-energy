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
    <footer className="bg-white px-5 py-14 text-[#042a54] sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 border-t border-[#d9e0e7] pt-10 lg:grid-cols-[1.1fr_0.8fr_0.9fr]">
        <div className="max-w-md">
          <BrandLogo
            className="h-auto w-[210px] max-w-[78vw]"
            framed
            variant="full"
          />
          <p className="mt-5 max-w-md text-sm leading-7 text-[#566373]">
            {t("footer.summary")}
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-[#042a54]">
            {t("footer.companyTitle")}
          </p>
          <div className="mt-5 grid gap-3 text-sm text-[#566373]">
            <p>{t("footer.companyItems.private")}</p>
            <p>{t("footer.companyItems.founded")}</p>
            <p>{t("footer.companyItems.market")}</p>
          </div>
          <p className="mt-8 text-sm font-semibold text-[#042a54]">
            {t("footer.linksTitle")}
          </p>
          <div className="mt-5 grid gap-3 text-sm text-[#566373]">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={getLocalizedPath(locale as Locale, item.href)}
                className="quiet-link"
              >
                {t(item.labelKey)}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-[#042a54]">
            {t("footer.contactTitle")}
          </p>
          <div className="mt-5 grid gap-5 text-sm text-[#566373]">
            <div>
              <p>{t("footer.emailLabel")}</p>
              <a
                href={`mailto:${t("contact.email")}`}
                className="quiet-link mt-1 inline-block font-medium text-[#042a54]"
              >
                {t("contact.email")}
              </a>
            </div>
            <div>
              <p>{t("footer.linkedinLabel")}</p>
              <a
                href="https://www.linkedin.com/company/gps-energy-dz"
                target="_blank"
                rel="noreferrer"
                className="quiet-link mt-1 inline-block font-medium text-[#042a54]"
              >
                {t("footer.linkedinValue")}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-[#d9e0e7] pt-6 text-sm text-[#566373]">
        {t("footer.copyright")}
      </div>
    </footer>
  );
}
