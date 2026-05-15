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
    ? "absolute inset-x-0 top-0 z-30 border-b border-[#d9e0e7] bg-[#eef1f4]/95 backdrop-blur-md"
    : "sticky top-0 z-30 border-b border-[#d9e0e7] bg-[#eef1f4]/95 backdrop-blur-md";

  return (
    <div className={wrapperClass}>
      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8 lg:px-10">
        <Link
          href={getLocalizedPath(locale as Locale)}
          className="button-hover flex items-center"
          aria-label={t("brand.homeAria")}
        >
          <span className="relative block w-[94px] sm:w-[108px]">
            <BrandLogo className="h-auto w-full" framed preload variant="compact" />
          </span>
        </Link>

        <nav
          className="hidden items-center gap-8 text-sm font-medium text-[#042a54] md:flex"
          aria-label={t("nav.aria")}
        >
          {navItems.map((item) => {
            const active = page === item.key;

            return (
              <Link
                key={item.href}
                href={getLocalizedPath(locale as Locale, item.href)}
                aria-current={active ? "page" : undefined}
                className={`nav-link quiet-link block px-2 py-2 ${
                  active ? "text-[#042a54]" : "text-[#042a54]/86"
                }`}
              >
                {t(item.labelKey)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <div
            className="flex items-center border border-[#d9e0e7] bg-[#f3f5f7] text-xs font-medium"
            aria-label={t("nav.language")}
          >
            {(["fr", "en"] as const).map((item) => (
              <Link
                key={item}
                href={getLocalizedPath(item, currentPath === "/" ? "" : currentPath)}
                className={`px-3 py-2 ${
                  locale === item ? "bg-[#042a54] text-white" : "text-[#566373]"
                }`}
              >
                {item.toUpperCase()}
              </Link>
            ))}
          </div>
          <Link
            href={getLocalizedPath(locale as Locale, "/contact")}
            className="button-hover border border-[#042a54] px-5 py-3 text-sm font-medium text-[#042a54] hover:bg-[#042a54] hover:text-white"
          >
            {t("nav.cta")} →
          </Link>
        </div>

        <details className="mobile-menu-trigger group fixed right-5 top-4 z-[60] flex">
          <summary
            className="flex h-11 w-11 cursor-pointer list-none items-center justify-center border border-[#d9e0e7] bg-white shadow-sm"
            aria-label={t("nav.mobile")}
          >
            <span className="sr-only">{t("nav.mobile")}</span>
            <span className="flex flex-col gap-1.5">
              <span className="block h-px w-5 bg-[#042a54]" />
              <span className="block h-px w-5 bg-[#042a54]" />
              <span className="block h-px w-5 bg-[#042a54]" />
            </span>
          </summary>
          <div className="absolute right-0 mt-3 w-[min(86vw,320px)] border border-[#d9e0e7] bg-white p-4 shadow-2xl shadow-black/10">
            <div className="grid gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={getLocalizedPath(locale as Locale, item.href)}
                  aria-current={page === item.key ? "page" : undefined}
                  className={`border px-4 py-3 text-sm ${
                    page === item.key
                      ? "border-[#042a54] bg-white font-medium text-[#042a54]"
                      : "border-[#d9e0e7] text-[#042a54]"
                  }`}
                >
                  {t(item.labelKey)}
                </Link>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between gap-3">
              <div className="flex border border-[#d9e0e7] bg-[#f3f5f7] text-xs font-medium">
                {(["fr", "en"] as const).map((item) => (
                  <Link
                    key={item}
                    href={getLocalizedPath(item, currentPath === "/" ? "" : currentPath)}
                    className={`px-3 py-2 ${
                      locale === item ? "bg-[#042a54] text-white" : "text-[#566373]"
                    }`}
                  >
                    {item.toUpperCase()}
                  </Link>
                ))}
              </div>
              <Link
                href={getLocalizedPath(locale as Locale, "/contact")}
                className="bg-[#042a54] px-4 py-2 text-sm font-medium text-white"
              >
                {t("nav.cta")}
              </Link>
            </div>
          </div>
        </details>
      </header>
    </div>
  );
}
