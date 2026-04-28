import Image from "next/image";

type BrandLogoProps = {
  className?: string;
  preload?: boolean;
  title?: string;
  variant?: "compact" | "full";
  framed?: boolean;
};

const logoSource = "/gps-energy-logo-transparent.svg?v=blue-orange-performance";

export function BrandLogo({
  className = "",
  framed = false,
  preload = false,
  title = "GPS Energy",
  variant = "compact",
}: BrandLogoProps) {
  const isFull = variant === "full";
  const logoSizes = isFull
    ? "(min-width: 1024px) 220px, (min-width: 640px) 198px, 172px"
    : "(min-width: 1024px) 94px, (min-width: 640px) 82px, 74px";
  const logoTransform = isFull
    ? "scale-[1.02] -translate-y-[1.5%]"
    : "scale-[1.05] -translate-y-[3.5%]";
  const badgeChrome = framed
    ? isFull
      ? "rounded-[18px] p-2"
      : "rounded-[14px] p-1.5"
    : "";

  return (
    <span
      className={`relative block overflow-hidden bg-[#ffffff] ${badgeChrome} ${className}`}
      data-brand-ui="true"
    >
      <Image
        alt={title}
        className={`block h-auto w-full select-none object-contain transform-gpu ${logoTransform}`}
        draggable="false"
        src={logoSource}
        width={1280}
        height={1060}
        sizes={logoSizes}
        preload={preload}
        unoptimized
      />
    </span>
  );
}
