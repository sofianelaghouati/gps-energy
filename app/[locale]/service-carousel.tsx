"use client";

import Link from "next/link";
import { useRef } from "react";

type Service = {
  benefit?: string;
  copy: string;
  href: string;
  key: string;
  title: string;
};

type Props = {
  countLabel: string;
  nextLabel: string;
  previousLabel: string;
  services: Service[];
};

export function ServiceCarousel({
  countLabel,
  nextLabel,
  previousLabel,
  services,
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  function move(direction: "previous" | "next") {
    const track = trackRef.current;
    if (!track) return;

    const distance = Math.min(track.clientWidth * 0.86, 680);
    track.scrollBy({
      behavior: "smooth",
      left: direction === "next" ? distance : -distance,
    });
  }

  return (
    <div className="mt-12">
      <div className="mb-5 flex items-center justify-between gap-4">
        <p className="text-sm text-[#566373]">{countLabel}</p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => move("previous")}
            className="flex h-11 w-11 items-center justify-center border border-[#d9e0e7] bg-white text-xl text-[#042a54] transition hover:bg-[#042a54] hover:text-white"
            aria-label={previousLabel}
          >
            {"<"}
          </button>
          <button
            type="button"
            onClick={() => move("next")}
            className="flex h-11 w-11 items-center justify-center border border-[#d9e0e7] bg-white text-xl text-[#042a54] transition hover:bg-[#042a54] hover:text-white"
            aria-label={nextLabel}
          >
            {">"}
          </button>
        </div>
      </div>
      <div
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-5"
      >
        {services.map((service, index) => (
          <article
            key={service.key}
            className="service-card flex min-h-[280px] w-[282px] shrink-0 snap-start flex-col justify-between border border-[#c9d7e5] border-t-4 border-t-[#042a54] bg-white p-7 text-[#06111f] shadow-sm sm:w-[320px]"
          >
            <div>
              <p className="text-sm font-medium text-[#042a54]" data-link>
                0{index + 1}
              </p>
              <h3 className="mt-8 text-3xl font-light leading-[1.18]">
                {service.title}
              </h3>
              <p className="mt-6 text-sm leading-6 text-[#566373]" data-muted>
                {service.copy}
              </p>
            </div>
            <div className="mt-8">
              {service.benefit ? (
                <p
                  className="mb-5 border-t border-current/12 pt-5 text-sm leading-6 text-[#566373]"
                  data-muted
                >
                  {service.benefit}
                </p>
              ) : null}
              <Link
                href={service.href}
                className="text-base font-medium text-[#042a54]"
                data-link
              >
                Explorer {">"}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
