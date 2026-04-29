import Image from "next/image";
import { AmbientMedia } from "./ambient-media";
import { siteMedia, type SiteMediaKey } from "./site-media";

type Props = {
  backgroundMedia?: SiteMediaKey;
  eyebrow: string;
  title: string;
  copy: string;
  accentMedia?: SiteMediaKey;
  galleryMedia?: SiteMediaKey[];
  highlights?: string[];
  videoSrc?: string;
};

export function PageHero({
  backgroundMedia = "hero",
  eyebrow,
  title,
  copy,
  accentMedia,
  galleryMedia = [],
  highlights = [],
  videoSrc,
}: Props) {
  const media = siteMedia[backgroundMedia];
  const accent = accentMedia ? siteMedia[accentMedia] : null;
  const gallery = galleryMedia.map((key) => siteMedia[key]);

  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[#12396f] text-white">
      <AmbientMedia
        image={media.image}
        imageAlt={media.alt}
        preload
        videoSrc={videoSrc}
        videoPoster="/hero-wellhead.webp"
        imageClassName="scale-[1.03] object-cover opacity-28"
        videoClassName="scale-[1.08] object-cover opacity-18 blur-[1px]"
        overlayClassName="bg-[linear-gradient(90deg,rgba(18,57,111,0.92)_0%,rgba(18,57,111,0.8)_45%,rgba(11,45,89,0.62)_100%)]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgba(255,107,0,0.28),transparent_28%),radial-gradient(circle_at_18%_78%,rgba(255,180,102,0.16),transparent_24%),radial-gradient(circle_at_18%_78%,rgba(35,81,140,0.2),transparent_26%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,57,111,0.95)_0%,rgba(18,57,111,0.8)_48%,rgba(11,45,89,0.56)_100%)]" />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-8 px-5 py-24 sm:px-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:px-10 lg:py-28">
        <div
          data-section-reveal
          data-reveal-from="left"
          className="max-w-4xl"
        >
          <div className="mb-6 flex items-center gap-4 text-xs font-semibold uppercase text-white/68">
            <span className="h-px w-12 bg-[linear-gradient(90deg,#ffb466_0%,#ff6b00_100%)]" />
            <span>{eyebrow}</span>
          </div>
          <h1 className="max-w-4xl text-4xl font-semibold leading-[1] text-white sm:text-5xl lg:text-[4.9rem]">
            {title}
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-white/74 sm:text-lg">
            {copy}
          </p>
        </div>

        <aside
          data-section-reveal
          data-reveal-from="right"
          className="overflow-hidden border border-white/12 bg-white/[0.06] text-sm text-white/74 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-md"
        >
          {accent ? (
            <div className="relative h-32 border-b border-white/12 bg-white/[0.06] sm:h-36">
              <Image
                src={accent.image}
                alt=""
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 340px, 90vw"
                className="object-cover opacity-82 saturate-[1.08]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(18,57,111,0.18)_0%,transparent_54%,rgba(255,107,0,0.18)_100%)]" />
            </div>
          ) : (
            <div className="h-1 bg-[linear-gradient(90deg,#ff6b00_0%,#ffb466_48%,rgba(255,255,255,0)_100%)]" />
          )}
          <div className="p-5 sm:p-6">
            <div className="mb-5 h-px w-14 bg-gradient-to-r from-[#ff6b00] via-[#ffb466] to-transparent" />
            <div className="grid gap-3">
              {highlights.map((item) => (
                <div
                  key={item}
                  data-premium-card
                  className="border border-white/10 bg-black/20 px-4 py-3"
                >
                  {item}
                </div>
              ))}
            </div>
            {gallery.length > 0 ? (
              <div className="mt-5 grid grid-cols-2 gap-2" aria-hidden="true">
                {gallery.map((item, index) => (
                  <div
                    key={`${item.alt}-${index}`}
                    className="relative h-20 overflow-hidden border border-white/12 bg-white/[0.055] shadow-[0_18px_44px_rgba(0,0,0,0.24)]"
                  >
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      placeholder="blur"
                      sizes="(min-width: 1024px) 150px, 42vw"
                      className="object-cover opacity-78 saturate-[1.08]"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(18,57,111,0.22)_0%,transparent_54%,rgba(255,107,0,0.18)_100%)]" />
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </aside>
      </div>
    </section>
  );
}
