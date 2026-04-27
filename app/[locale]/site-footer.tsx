import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
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
    <footer className="bg-[#060608] px-5 py-14 text-white sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 border-t border-white/10 pt-10 md:grid-cols-[1.1fr_0.8fr_0.8fr]">
        <div data-section-reveal>
          <div className="flex items-center gap-3">
            <span className="relative flex h-14 w-14 items-center justify-center overflow-hidden border border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.04))] shadow-[0_0_28px_rgba(91,72,220,0.18)]">
              <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,rgba(255,121,8,0.24),transparent_55%),radial-gradient(circle_at_50%_80%,rgba(91,72,220,0.26),transparent_62%)]" />
              <Image
                src="/gps-energy-mark.png"
                alt=""
                width={40}
                height={49}
                className="relative h-11 w-auto"
              />
            </span>
            <div className="leading-none">
              <p className="text-[1.05rem] font-semibold uppercase tracking-[0.22em]">
                GPS
              </p>
              <p className="mt-1 text-[0.82rem] font-medium uppercase tracking-[0.26em] text-[#d7d2fb]">
                Energy
              </p>
            </div>
          </div>
          <p className="mt-6 max-w-md text-sm leading-7 text-white/64">
            {t("footer.summary")}
          </p>
        </div>

        <div data-section-reveal>
          <p className="text-xs font-semibold uppercase text-[#ff7908]">
            {t("footer.companyTitle")}
          </p>
          <div className="mt-5 grid gap-3 text-sm text-white/68">
            <p>{t("footer.companyItems.private")}</p>
            <p>{t("footer.companyItems.founded")}</p>
            <p>{t("footer.companyItems.market")}</p>
          </div>
          <p className="mt-8 text-xs font-semibold uppercase text-[#ff7908]">
            {t("footer.linksTitle")}
          </p>
          <div className="mt-5 grid gap-3 text-sm text-white/68">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={getLocalizedPath(locale as Locale, item.href)}
                className="transition hover:text-white"
              >
                {t(item.labelKey)}
              </Link>
            ))}
          </div>
        </div>

        <div data-section-reveal>
          <p className="text-xs font-semibold uppercase text-[#ff7908]">
            {t("footer.contactTitle")}
          </p>
          <div className="mt-5 grid gap-4 text-sm text-white/68">
            <div>
              <p className="text-white/40">{t("footer.emailLabel")}</p>
              <a
                href={`mailto:${t("contact.email")}`}
                className="mt-1 inline-block text-white transition hover:text-[#ff7908]"
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
                className="mt-1 inline-block text-white transition hover:text-[#ff7908]"
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
