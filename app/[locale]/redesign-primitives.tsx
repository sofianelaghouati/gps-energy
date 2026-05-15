import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { siteMedia, type SiteMediaKey } from "./site-media";

type SectionIntroProps = {
  copy?: string;
  eyebrow: string;
  invert?: boolean;
  title: string;
  wide?: boolean;
};

export function SectionIntro({
  copy,
  eyebrow,
  invert = false,
  title,
  wide = false,
}: SectionIntroProps) {
  return (
    <div className={wide ? "max-w-5xl" : "max-w-3xl"}>
      <p className={`text-sm font-semibold ${invert ? "text-white/76" : "text-[#042a54]"}`}>
        {eyebrow}
      </p>
      <h2
        className={`mt-5 text-4xl font-light leading-[1.08] sm:text-5xl lg:text-6xl ${
          invert ? "text-white" : "text-[#06111f]"
        }`}
      >
        {title}
      </h2>
      {copy ? (
        <p
          className={`mt-6 max-w-2xl text-base leading-7 sm:text-lg ${
            invert ? "text-white/72" : "text-[#566373]"
          }`}
        >
          {copy}
        </p>
      ) : null}
    </div>
  );
}

type ServiceCardProps = {
  benefit?: string;
  copy: string;
  index: number;
  title: string;
};

export function ServiceCard({ benefit, copy, index, title }: ServiceCardProps) {
  return (
    <article className="service-card group flex min-h-[310px] w-[282px] shrink-0 flex-col justify-between border border-[#d9e0e7] bg-white p-7 text-[#06111f] shadow-sm sm:w-[320px]">
      <div>
        <p className="text-sm font-medium text-[#042a54]" data-link>
          0{index + 1}
        </p>
        <h3 className="mt-8 text-3xl font-light leading-[1.18]">{title}</h3>
        <p className="mt-6 text-sm leading-6 text-[#566373]" data-muted>
          {copy}
        </p>
      </div>
      <div className="mt-8">
        {benefit ? (
          <p className="mb-5 border-t border-current/12 pt-5 text-sm leading-6 text-[#566373]" data-muted>
            {benefit}
          </p>
        ) : null}
        <span className="text-base font-medium text-[#042a54]" data-link>
          Explorer →
        </span>
      </div>
    </article>
  );
}

type InfoCardProps = {
  copy: string;
  eyebrow?: string;
  invert?: boolean;
  title: string;
};

export function InfoCard({ copy, eyebrow, invert = false, title }: InfoCardProps) {
  return (
    <article
      className={`hover-lift border p-7 ${
        invert
          ? "border-white/16 bg-white/[0.04] text-white"
          : "border-[#c9d7e5] border-t-4 border-t-[#042a54] bg-white text-[#06111f]"
      }`}
    >
      {eyebrow ? (
        <p className={`text-sm font-medium ${invert ? "text-white/68" : "text-[#042a54]"}`}>
          {eyebrow}
        </p>
      ) : null}
      <h3 className="mt-4 text-2xl font-light leading-tight">{title}</h3>
      <p className={`mt-5 text-sm leading-7 ${invert ? "text-white/70" : "text-[#566373]"}`}>
        {copy}
      </p>
    </article>
  );
}

type MediaPanelProps = {
  className?: string;
  mediaKey: SiteMediaKey;
  priority?: boolean;
};

export function MediaPanel({ className = "", mediaKey, priority = false }: MediaPanelProps) {
  const media = siteMedia[mediaKey];

  return (
    <div className={`group image-card relative overflow-hidden bg-[#f3f5f7] ${className}`}>
      <Image
        src={media.image}
        alt={media.alt}
        fill
        placeholder="blur"
        preload={priority}
        fetchPriority={priority ? "high" : undefined}
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="image-hover object-cover"
      />
    </div>
  );
}

type TextLinkProps = {
  children: ReactNode;
  href: string;
  invert?: boolean;
};

export function TextLink({ children, href, invert = false }: TextLinkProps) {
  return (
    <Link
      href={href}
      className={`button-hover inline-flex min-h-12 items-center border px-6 text-sm font-medium ${
        invert
          ? "border-white/32 text-white hover:bg-white hover:text-[#042a54]"
          : "border-[#042a54] text-[#042a54] hover:bg-[#042a54] hover:text-white"
      }`}
    >
      {children} →
    </Link>
  );
}
