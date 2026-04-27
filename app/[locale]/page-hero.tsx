import { AmbientMedia } from "./ambient-media";
import { siteMedia, type SiteMediaKey } from "./site-media";

type Props = {
  backgroundMedia?: SiteMediaKey;
  eyebrow: string;
  title: string;
  copy: string;
  highlights?: string[];
  videoSrc?: string;
};

export function PageHero({
  backgroundMedia = "hero",
  eyebrow,
  title,
  copy,
  highlights = [],
  videoSrc,
}: Props) {
  const media = siteMedia[backgroundMedia];

  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[#557da5] text-white">
      <AmbientMedia
        image={media.image}
        imageAlt={media.alt}
        videoSrc={videoSrc}
        videoPoster="/hero-wellhead.webp"
        imageClassName="scale-[1.03] object-cover opacity-28"
        videoClassName="scale-[1.08] object-cover opacity-18 blur-[1px]"
        overlayClassName="bg-[linear-gradient(90deg,rgba(85,125,165,0.9)_0%,rgba(85,125,165,0.76)_45%,rgba(54,95,132,0.58)_100%)]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgba(255,143,43,0.24),transparent_28%),radial-gradient(circle_at_18%_78%,rgba(163,131,86,0.16),transparent_24%),radial-gradient(circle_at_18%_78%,rgba(85,125,165,0.22),transparent_26%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(85,125,165,0.95)_0%,rgba(85,125,165,0.78)_48%,rgba(54,95,132,0.52)_100%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-8 px-5 py-24 sm:px-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:px-10 lg:py-28">
        <div
          data-section-reveal
          data-reveal-from="left"
          className="max-w-4xl"
        >
          <div className="mb-6 flex items-center gap-4 text-xs font-semibold uppercase text-white/68">
            <span className="h-px w-12 bg-[linear-gradient(90deg,#a38356_0%,#ff8f2b_100%)]" />
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
          className="border border-white/12 bg-white/[0.045] p-6 text-sm text-white/74 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-md"
        >
          <div className="mb-6 h-20 w-px bg-gradient-to-b from-[#ff8f2b] via-[#a38356] to-[#557da5]" />
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
        </aside>
      </div>
    </section>
  );
}
