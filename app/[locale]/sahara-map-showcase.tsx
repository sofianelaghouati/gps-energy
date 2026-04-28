"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { siteMedia, type SiteMediaKey } from "./site-media";

type Location = {
  copy: string;
  id: string;
  imageAlt: string;
  mediaKey: SiteMediaKey;
  name: string;
  note: string;
  stat: string;
  x: number;
  y: number;
};

type Props = {
  eyebrow: string;
  hint: string;
  intro: string;
  locations: Location[];
  title: string;
};

const outlinePath =
  "M134 34 221 44 292 84 321 155 298 220 315 320 279 415 196 454 112 427 62 346 43 259 50 171 91 95Z";
const saharaPath =
  "M89 183 131 170 192 177 247 199 281 232 287 315 263 396 201 434 132 410 87 335 71 270Z";

export function SaharaMapShowcase({
  eyebrow,
  hint,
  intro,
  locations,
  title,
}: Props) {
  const [activeId, setActiveId] = useState(locations[0]?.id ?? "");
  const activeLocation = useMemo(
    () => locations.find((location) => location.id === activeId) ?? locations[0],
    [activeId, locations],
  );

  if (!activeLocation) {
    return null;
  }

  const activeMedia = siteMedia[activeLocation.mediaKey];

  return (
    <div className="grid gap-6 lg:grid-cols-[0.86fr_1.14fr] lg:items-stretch">
      <article
        data-premium-card
        className="relative overflow-hidden border border-white/12 bg-[#12396f] p-6 shadow-[0_28px_80px_rgba(11,45,89,0.28)] sm:p-8"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(255,107,0,0.24),transparent_24%),radial-gradient(circle_at_78%_82%,rgba(53,128,215,0.18),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]" />
        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ffb466]">
            {eyebrow}
          </p>
          <h2 className="mt-4 max-w-lg text-3xl font-semibold leading-[1.02] text-white sm:text-5xl">
            {title}
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/72 sm:text-base">
            {intro}
          </p>
        </div>

        <div className="relative mt-8">
          <div className="absolute inset-4 rounded-[2rem] border border-white/8" />
          <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:34px_34px]" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-white/12 bg-[linear-gradient(180deg,#0b2d59_0%,#12396f_60%,#1d4f88_100%)]">
            <svg
              aria-hidden="true"
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 360 480"
            >
              <path
                d={outlinePath}
                fill="rgba(255,255,255,0.08)"
                stroke="rgba(255,255,255,0.28)"
                strokeWidth="2"
              />
              <path d={saharaPath} fill="rgba(255,107,0,0.18)" />
              <path
                d={saharaPath}
                fill="none"
                stroke="rgba(255,180,102,0.65)"
                strokeDasharray="8 8"
                strokeWidth="1.5"
              />
            </svg>

            {locations.map((location) => {
              const active = location.id === activeLocation.id;

              return (
                <button
                  key={location.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setActiveId(location.id)}
                  onFocus={() => setActiveId(location.id)}
                  onMouseEnter={() => setActiveId(location.id)}
                  className="group absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${location.x}%`, top: `${location.y}%` }}
                  data-cursor-label={location.name}
                  data-magnetic
                >
                  <span
                    className={`absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border transition duration-300 ${
                      active
                        ? "border-[#ff6b00]/70 bg-[#ff6b00]/12"
                        : "border-white/18 bg-white/6"
                    }`}
                  />
                  <span
                    className={`absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border transition duration-300 ${
                      active
                        ? "border-[#ffd6b0] bg-[#ff6b00]"
                        : "border-white/28 bg-white/70"
                    }`}
                  />
                  <span
                    className={`absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full transition duration-300 ${
                      active ? "bg-white" : "bg-[#0a203d]"
                    }`}
                  />
                  <span
                    className={`pointer-events-none absolute left-[calc(100%+0.8rem)] top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-full border px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] shadow-[0_12px_32px_rgba(10,22,35,0.24)] transition duration-300 sm:inline-flex ${
                      active
                        ? "border-[#ff6b00]/45 bg-[#0b2d59] text-white"
                        : "border-white/12 bg-[#0b2d59]/82 text-white/70"
                    }`}
                  >
                    {location.name}
                  </span>
                </button>
              );
            })}

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-4 rounded-full border border-white/12 bg-[#0b2d59]/58 px-4 py-3 backdrop-blur-md">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-white/72">
                {hint}
              </p>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[#ffb466]">
                {activeLocation.stat}
              </p>
            </div>
          </div>
        </div>
      </article>

      <div className="grid gap-4">
        <article
          data-premium-card
          className="overflow-hidden border border-black/10 bg-white shadow-[0_28px_80px_rgba(11,45,89,0.14)]"
        >
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              key={activeLocation.id}
              src={activeMedia.image}
              alt={activeLocation.imageAlt || activeMedia.alt}
              placeholder="blur"
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(18,33,47,0.12)_48%,rgba(18,33,47,0.74)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#ffb466]">
                {activeLocation.stat}
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
                {activeLocation.name}
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/82">
                {activeLocation.copy}
              </p>
            </div>
          </div>
        </article>

        <div className="grid gap-4 sm:grid-cols-2">
          {locations.map((location) => {
            const active = location.id === activeLocation.id;
            const media = siteMedia[location.mediaKey];

            return (
              <button
                key={location.id}
                type="button"
                onClick={() => setActiveId(location.id)}
                onFocus={() => setActiveId(location.id)}
                onMouseEnter={() => setActiveId(location.id)}
                className={`group overflow-hidden border text-left transition duration-300 ${
                  active
                    ? "border-[#ff6b00]/45 bg-[#0b2d59]"
                    : "border-black/10 bg-white hover:border-[#12396f]/34"
                }`}
                data-premium-card
                data-cursor-label={location.name}
                data-magnetic
              >
                <div className="relative aspect-[5/3] overflow-hidden">
                  <Image
                    src={media.image}
                    alt={location.imageAlt || media.alt}
                    placeholder="blur"
                    sizes="(min-width: 1024px) 18vw, (min-width: 640px) 45vw, 100vw"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(11,45,89,0.08)_45%,rgba(11,45,89,0.74)_100%)]" />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between gap-3">
                    <h4
                      className={`text-base font-semibold ${
                        active ? "text-white" : "text-[#0a203d]"
                      }`}
                    >
                      {location.name}
                    </h4>
                    <span
                      className={`text-[0.65rem] font-semibold uppercase tracking-[0.12em] ${
                        active ? "text-[#ffb466]" : "text-[#12396f]"
                      }`}
                    >
                      {location.stat}
                    </span>
                  </div>
                  <p
                    className={`mt-2 text-sm leading-6 ${
                      active ? "text-white/72" : "text-[#546273]"
                    }`}
                  >
                    {location.note}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
