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
  backgroundMedia = "gpsMain",
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
    <section className="relative overflow-hidden bg-[#042a54] text-white">
      <AmbientMedia
        image={media.image}
        imageAlt={media.alt}
        preload
        videoSrc={videoSrc}
        videoPoster="/gps/gps-main.jpeg"
        imageClassName="object-cover opacity-54"
        videoClassName="object-cover opacity-20"
        overlayClassName="bg-[linear-gradient(90deg,rgba(4,42,84,0.9)_0%,rgba(4,42,84,0.72)_48%,rgba(4,42,84,0.46)_100%)]"
      />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-5 py-24 sm:px-8 lg:grid-cols-[minmax(0,1fr)_430px] lg:px-10 lg:py-28">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold text-white/78">{eyebrow}</p>
          <h1 className="mt-6 max-w-4xl text-5xl font-light leading-[1.04] text-white sm:text-6xl lg:text-[4.8rem]">
            {title}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/78">
            {copy}
          </p>
        </div>

        <aside className="hover-lift border border-white/20 bg-white/[0.08] text-sm text-white/84 backdrop-blur-md">
          {accent ? (
            <div className="group image-card relative h-64 border-b border-white/16 bg-white/[0.06]">
              <Image
                src={accent.image}
                alt=""
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 430px, 90vw"
                className="image-hover object-cover"
              />
            </div>
          ) : null}
          <div className="p-6">
            <div className="grid gap-3">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="hover-lift border border-white/16 bg-white/[0.04] px-4 py-3"
                >
                  {item}
                </div>
              ))}
            </div>
            {gallery.length > 0 ? (
              <div className="mt-5 grid grid-cols-2 gap-2" aria-hidden="true">
                {gallery.slice(0, 4).map((item, index) => (
                  <div
                    key={`${item.alt}-${index}`}
                    className="group image-card relative h-28 overflow-hidden border border-white/18 bg-white/[0.055]"
                  >
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      placeholder="blur"
                      sizes="(min-width: 1024px) 160px, 42vw"
                      className="image-hover object-cover"
                    />
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
