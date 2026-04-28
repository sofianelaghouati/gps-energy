import Link from "next/link";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { BrandLogo } from "./brand-logo";
import { getLocalizedPath } from "./seo";
import type { SitePageKey } from "./site-data";

type Props = {
  currentPath: "/" | "/company" | "/services" | "/standards" | "/contact";
  locale: string;
  page: SitePageKey;
  overlay?: boolean;
};

const navItems = [
  { key: "company", href: "/company", labelKey: "nav.expertise" },
  { key: "services", href: "/services", labelKey: "nav.services" },
  { key: "standards", href: "/standards", labelKey: "nav.safety" },
  { key: "contact", href: "/contact", labelKey: "nav.contact" },
] as const;

export async function SiteHeader({
  currentPath,
  locale,
  page,
  overlay = false,
}: Props) {
  const t = await getTranslations("HomePage");
  const wrapperClass = overlay
    ? "absolute inset-x-0 top-0 z-30 border-b border-white/10 bg-[#12396f]/76 backdrop-blur-md"
    : "sticky top-0 z-30 border-b border-white/10 bg-[#12396f]/96 backdrop-blur-md";

  return (
    <div className={wrapperClass}>
      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-2.5 sm:px-8 sm:py-3 lg:px-10">
        <Link
          href={getLocalizedPath(locale as Locale)}
          className="group flex items-center"
          data-cursor-label="Home"
          data-magnetic
          aria-label={t("brand.homeAria")}
        >
          <span className="relative block w-[86px] sm:w-[96px] lg:w-[110px]">
            <BrandLogo
              className="h-auto w-full transition duration-300 group-hover:scale-[1.02]"
              framed
              preload
              variant="compact"
            />
          </span>
        </Link>

        <nav
          className="hidden items-center gap-7 text-sm uppercase tracking-[0.08em] text-white/74 md:flex"
          aria-label={t("nav.aria")}
        >
          {navItems.map((item) => {
            const active = page === item.key;

            return (
              <Link
                key={item.href}
                href={getLocalizedPath(locale as Locale, item.href)}
                className={`transition ${
                  active ? "text-white" : "hover:text-white"
                }`}
                data-cursor-label={t(item.labelKey)}
                data-magnetic
                data-premium-nav
              >
                {t(item.labelKey)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <div
            className="flex items-center border border-white/15 bg-white/7 text-xs font-medium uppercase tracking-[0.12em]"
            aria-label={t("nav.language")}
          >
            {(["en", "fr"] as const).map((item) => (
              <Link
                key={item}
                href={getLocalizedPath(item, currentPath === "/" ? "" : currentPath)}
                className={`px-3 py-2 transition ${
                  locale === item
                    ? "bg-white text-[#0b2d59]"
                    : "text-white/65 hover:text-white"
                }`}
                data-cursor-label={item.toUpperCase()}
                data-magnetic
              >
                {item}
              </Link>
            ))}
          </div>
          <Link
            href={getLocalizedPath(locale as Locale, "/contact")}
            className="premium-button bg-[linear-gradient(135deg,#ffb466_0%,#ff6b00_100%)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-white hover:text-[#0b2d59]"
            data-cursor-label={t("nav.cta")}
            data-magnetic
          >
            <span>{t("nav.cta")}</span>
          </Link>
        </div>

        <details className="mobile-menu-trigger group fixed right-5 top-4 z-[60] flex">
          <summary
            className="flex h-11 w-11 cursor-pointer list-none items-center justify-center border border-white/20 bg-[linear-gradient(135deg,#ffb466_0%,#ff6b00_100%)] shadow-[0_14px_34px_rgba(11,45,89,0.34)]"
            data-cursor-label="Menu"
            aria-label={t("nav.mobile")}
          >
            <span className="sr-only">{t("nav.mobile")}</span>
            <span className="flex flex-col gap-1.5">
              <span className="block h-px w-5 bg-white" />
              <span className="block h-px w-5 bg-white" />
              <span className="block h-px w-5 bg-white" />
            </span>
          </summary>
          <div className="absolute right-0 mt-3 w-[min(86vw,320px)] border border-white/12 bg-[#0b2d59]/98 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl">
            <div className="grid gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={getLocalizedPath(locale as Locale, item.href)}
                  className={`border px-4 py-3 text-sm uppercase tracking-[0.08em] ${
                    page === item.key
                      ? "border-white/18 bg-white/8 text-white"
                      : "border-white/8 text-white/78"
                  }`}
                  data-magnetic
                >
                  {t(item.labelKey)}
                </Link>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between gap-3">
              <div className="flex border border-white/10 text-xs uppercase tracking-[0.12em]">
                <Link
                  href={getLocalizedPath("en", currentPath === "/" ? "" : currentPath)}
                  className={`px-3 py-2 ${
                    locale === "en" ? "bg-white text-[#0b2d59]" : "text-white/65"
                  }`}
                  data-magnetic
                >
                  EN
                </Link>
                <Link
                  href={getLocalizedPath("fr", currentPath === "/" ? "" : currentPath)}
                  className={`px-3 py-2 ${
                    locale === "fr" ? "bg-white text-[#0b2d59]" : "text-white/65"
                  }`}
                  data-magnetic
                >
                  FR
                </Link>
              </div>
              <Link
                href={getLocalizedPath(locale as Locale, "/contact")}
                className="premium-button bg-[linear-gradient(135deg,#ffb466_0%,#ff6b00_100%)] px-4 py-2 text-sm font-semibold uppercase tracking-[0.08em] text-white"
                data-magnetic
              >
                <span>{t("nav.cta")}</span>
              </Link>
            </div>
          </div>
        </details>
      </header>
    </div>
  );
}
