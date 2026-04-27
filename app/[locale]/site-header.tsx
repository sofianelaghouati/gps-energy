import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
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
    ? "absolute inset-x-0 top-0 z-30 border-b border-white/10 bg-black/20 backdrop-blur-md"
    : "sticky top-0 z-30 border-b border-white/10 bg-[#060608]/95 backdrop-blur-md";

  return (
    <div className={wrapperClass}>
      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
        <Link
          href={getLocalizedPath(locale as Locale)}
          className="group flex items-center gap-3"
          aria-label={t("brand.homeAria")}
        >
          <span className="relative flex h-14 w-14 items-center justify-center overflow-hidden border border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.04))] shadow-[0_0_28px_rgba(91,72,220,0.18)]">
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,rgba(255,121,8,0.24),transparent_55%),radial-gradient(circle_at_50%_80%,rgba(91,72,220,0.26),transparent_62%)]" />
            <Image
              src="/gps-energy-mark.png"
              alt=""
              width={40}
              height={49}
              priority
              className="relative h-11 w-auto transition duration-300 group-hover:scale-[1.04]"
            />
          </span>
          <span className="leading-none">
            <span className="block text-[1.05rem] font-semibold uppercase tracking-[0.22em] text-white">
              GPS
            </span>
            <span className="mt-1 block text-[0.82rem] font-medium uppercase tracking-[0.26em] text-[#d7d2fb]">
              Energy
            </span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-7 text-sm text-white/74 md:flex"
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
              >
                {t(item.labelKey)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <div
            className="flex items-center border border-white/15 bg-white/7 text-xs font-medium uppercase"
            aria-label={t("nav.language")}
          >
            {(["en", "fr"] as const).map((item) => (
              <Link
                key={item}
                href={getLocalizedPath(item, currentPath === "/" ? "" : currentPath)}
                className={`px-3 py-2 transition ${
                  locale === item
                    ? "bg-white text-[#111116]"
                    : "text-white/65 hover:text-white"
                }`}
              >
                {item}
              </Link>
            ))}
          </div>
          <Link
            href={getLocalizedPath(locale as Locale, "/contact")}
            className="bg-[#ff7908] px-5 py-3 text-sm font-semibold text-black transition hover:bg-white"
          >
            {t("nav.cta")}
          </Link>
        </div>

        <details className="group relative md:hidden">
          <summary
            className="flex h-11 w-11 cursor-pointer list-none items-center justify-center border border-white/15 bg-white/8"
            aria-label={t("nav.mobile")}
          >
            <span className="sr-only">{t("nav.mobile")}</span>
            <span className="flex flex-col gap-1.5">
              <span className="block h-px w-5 bg-white" />
              <span className="block h-px w-5 bg-white" />
              <span className="block h-px w-5 bg-white" />
            </span>
          </summary>
          <div className="absolute right-0 mt-3 w-[min(86vw,320px)] border border-white/12 bg-[#09090c]/95 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl">
            <div className="grid gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={getLocalizedPath(locale as Locale, item.href)}
                  className={`border px-4 py-3 text-sm ${
                    page === item.key
                      ? "border-white/18 bg-white/8 text-white"
                      : "border-white/8 text-white/78"
                  }`}
                >
                  {t(item.labelKey)}
                </Link>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between gap-3">
              <div className="flex border border-white/10 text-xs uppercase">
                <Link
                  href={getLocalizedPath("en", currentPath === "/" ? "" : currentPath)}
                  className={`px-3 py-2 ${
                    locale === "en" ? "bg-white text-black" : "text-white/65"
                  }`}
                >
                  EN
                </Link>
                <Link
                  href={getLocalizedPath("fr", currentPath === "/" ? "" : currentPath)}
                  className={`px-3 py-2 ${
                    locale === "fr" ? "bg-white text-black" : "text-white/65"
                  }`}
                >
                  FR
                </Link>
              </div>
              <Link
                href={getLocalizedPath(locale as Locale, "/contact")}
                className="bg-[#ff7908] px-4 py-2 text-sm font-semibold text-black"
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
