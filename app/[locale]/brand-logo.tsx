import Image from "next/image";

type BrandLogoProps = {
  className?: string;
  preload?: boolean;
  title?: string;
  variant?: "compact" | "full";
  framed?: boolean;
};

const logoSource = "/gps-energy-logo-transparent.svg";

export function BrandLogo({
  className = "",
  framed = false,
  preload = false,
  title = "GPS Energy",
  variant = "compact",
}: BrandLogoProps) {
  const isFull = variant === "full";

  return (
    <span
      className={`relative block ${className}`}
      data-brand-ui="true"
    >
      {framed ? (
        <>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-[-10%] rounded-[36px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.26),rgba(255,255,255,0.08)_34%,transparent_68%)] blur-2xl"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-[10%] top-[6%] h-[56%] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.3),rgba(255,255,255,0.1)_40%,transparent_72%)] blur-2xl"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-[8%] bottom-[8%] h-[22%] rounded-full bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.28)_18%,rgba(255,255,255,0.4)_50%,rgba(255,255,255,0.28)_82%,transparent_100%)] blur-xl"
          />
        </>
      ) : null}
      <Image
        alt={title}
        className={`relative z-10 block h-auto w-full select-none object-contain ${
          framed
            ? "brightness-[1.04] contrast-[1.08] saturate-[1.05] drop-shadow-[0_0_28px_rgba(255,255,255,0.26)] drop-shadow-[0_18px_34px_rgba(7,20,41,0.22)]"
            : "drop-shadow-[0_0_18px_rgba(255,255,255,0.22)] drop-shadow-[0_14px_28px_rgba(7,20,41,0.16)]"
        }`}
        draggable="false"
        src={logoSource}
        width={1280}
        height={1191}
        sizes={isFull ? "(min-width: 640px) 286px, 228px" : "(min-width: 1024px) 114px, (min-width: 640px) 98px, 88px"}
        preload={preload}
        unoptimized
      />
    </span>
  );
}
