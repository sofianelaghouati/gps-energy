"use client";

import type { CSSProperties } from "react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { BrandLogo } from "./brand-logo";

type Metric = {
  copy: string;
  label: string;
  value: string;
};

type Props = {
  copy: string;
  eyebrow: string;
  metrics: Metric[];
  title: string;
};

export function CompanyProfileShowcase({
  copy,
  eyebrow,
  metrics,
  title,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const panel = root?.querySelector<HTMLElement>("[data-tilt-panel]");
      const glare = root?.querySelector<HTMLElement>("[data-tilt-glare]");
      const layers = root
        ? Array.from(root.querySelectorAll<HTMLElement>("[data-tilt-layer]"))
        : [];
      const flairs = root
        ? Array.from(
            root.querySelectorAll<HTMLElement>("[data-premium-flair-loop]"),
          )
        : [];
      const sweeps = root
        ? Array.from(
            root.querySelectorAll<HTMLElement>("[data-premium-sweep-loop]"),
          )
        : [];
      const pulses = root
        ? Array.from(
            root.querySelectorAll<HTMLElement>("[data-premium-pulse-loop]"),
          )
        : [];
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const finePointer = window.matchMedia("(pointer: fine)").matches;
      const wideViewport = window.matchMedia("(min-width: 1024px)").matches;
      const cleanup: Array<() => void> = [];

      if (!root || !panel) {
        return;
      }

      root.style.setProperty("--tilt-focus-x", "50%");
      root.style.setProperty("--tilt-focus-y", "38%");

      const intro = gsap.timeline({
        defaults: {
          duration: 0.88,
          ease: "power3.out",
        },
      });

      intro
        .from(panel, {
          autoAlpha: 0,
          rotateX: 10,
          rotateY: -8,
          scale: 0.965,
          y: 28,
        })
        .from(
          layers,
          {
            autoAlpha: 0,
            stagger: 0.06,
            x: 20,
            y: 18,
          },
          0.14,
        );

      cleanup.push(() => intro.kill());

      flairs.forEach((flair, index) => {
        const tween = gsap.to(flair, {
          duration: 2.8 + index * 0.45,
          ease: "sine.inOut",
          repeat: -1,
          rotation: index % 2 === 0 ? 9 : -9,
          x: index % 2 === 0 ? 10 : -10,
          y: index % 2 === 0 ? -12 : 12,
          yoyo: true,
        });

        cleanup.push(() => tween.kill());
      });

      sweeps.forEach((sweep, index) => {
        const tween = gsap.fromTo(
          sweep,
          {
            xPercent: -100,
            opacity: 0,
          },
          {
            delay: index * 0.5,
            duration: 3.6 + index * 0.3,
            ease: "sine.inOut",
            opacity: 0.82,
            repeat: -1,
            xPercent: 100,
            yoyo: true,
          },
        );

        cleanup.push(() => tween.kill());
      });

      pulses.forEach((pulse, index) => {
        const tween = gsap.to(pulse, {
          delay: index * 0.25,
          duration: 1.8 + index * 0.2,
          ease: "sine.inOut",
          opacity: 0.28,
          repeat: -1,
          scale: 1.22,
          yoyo: true,
        });

        cleanup.push(() => tween.kill());
      });

      if (!finePointer || !wideViewport || reduceMotion) {
        return () => {
          cleanup.forEach((fn) => fn());
        };
      }

      const rotateXTo = gsap.quickTo(panel, "rotationX", {
        duration: 0.45,
        ease: "power3.out",
      });
      const rotateYTo = gsap.quickTo(panel, "rotationY", {
        duration: 0.45,
        ease: "power3.out",
      });
      const xTo = gsap.quickTo(panel, "x", {
        duration: 0.45,
        ease: "power3.out",
      });
      const yTo = gsap.quickTo(panel, "y", {
        duration: 0.45,
        ease: "power3.out",
      });
      const scaleTo = gsap.quickTo(panel, "scale", {
        duration: 0.45,
        ease: "power3.out",
      });
      const layerSetters = layers.map((layer) => ({
        rotation: gsap.quickTo(layer, "rotation", {
          duration: 0.55,
          ease: "power3.out",
        }),
        x: gsap.quickTo(layer, "x", {
          duration: 0.5,
          ease: "power3.out",
        }),
        y: gsap.quickTo(layer, "y", {
          duration: 0.5,
          ease: "power3.out",
        }),
      }));
      const glareXTo = glare
        ? gsap.quickTo(glare, "xPercent", {
            duration: 0.45,
            ease: "power3.out",
          })
        : null;
      const glareYTo = glare
        ? gsap.quickTo(glare, "yPercent", {
            duration: 0.45,
            ease: "power3.out",
          })
        : null;

      const reset = () => {
        rotateXTo(0);
        rotateYTo(0);
        xTo(0);
        yTo(0);
        scaleTo(1);
        root.style.setProperty("--tilt-focus-x", "50%");
        root.style.setProperty("--tilt-focus-y", "38%");

        layerSetters.forEach((setter) => {
          setter.rotation(0);
          setter.x(0);
          setter.y(0);
        });

        if (glare) {
          gsap.to(glare, {
            autoAlpha: 0,
            duration: 0.24,
            ease: "power2.out",
          });
        }

        glareXTo?.(0);
        glareYTo?.(0);
      };

      const handleMove = (event: PointerEvent) => {
        const bounds = root.getBoundingClientRect();
        const progressX = gsap.utils.clamp(
          0,
          1,
          (event.clientX - bounds.left) / bounds.width,
        );
        const progressY = gsap.utils.clamp(
          0,
          1,
          (event.clientY - bounds.top) / bounds.height,
        );
        const rotateY = gsap.utils.interpolate(-13, 13, progressX);
        const rotateX = gsap.utils.interpolate(11, -11, progressY);
        const offsetX = gsap.utils.interpolate(-10, 10, progressX);
        const offsetY = gsap.utils.interpolate(-8, 8, progressY);

        rotateXTo(rotateX);
        rotateYTo(rotateY);
        xTo(offsetX);
        yTo(offsetY);
        scaleTo(1.012);
        root.style.setProperty(
          "--tilt-focus-x",
          `${gsap.utils.interpolate(34, 66, progressX)}%`,
        );
        root.style.setProperty(
          "--tilt-focus-y",
          `${gsap.utils.interpolate(16, 62, progressY)}%`,
        );

        layerSetters.forEach((setter, index) => {
          const depth = Number(layers[index]?.dataset.depth ?? 24);

          setter.x(gsap.utils.interpolate(-depth, depth, progressX) / 8);
          setter.y(gsap.utils.interpolate(-depth, depth, progressY) / 11);
          setter.rotation(
            gsap.utils.interpolate(-depth * 0.04, depth * 0.04, progressX),
          );
        });

        if (glare) {
          gsap.to(glare, {
            autoAlpha: 0.88,
            duration: 0.18,
            ease: "power2.out",
          });
        }

        glareXTo?.(gsap.utils.interpolate(-18, 18, progressX));
        glareYTo?.(gsap.utils.interpolate(-16, 16, progressY));
      };

      const handleEnter = () => {
        scaleTo(1.008);
        if (glare) {
          gsap.to(glare, {
            autoAlpha: 0.72,
            duration: 0.22,
            ease: "power2.out",
          });
        }
      };

      root.addEventListener("pointerenter", handleEnter);
      root.addEventListener("pointermove", handleMove);
      root.addEventListener("pointerleave", reset);

      cleanup.push(() => {
        root.removeEventListener("pointerenter", handleEnter);
        root.removeEventListener("pointermove", handleMove);
        root.removeEventListener("pointerleave", reset);
      });

      return () => {
        cleanup.forEach((fn) => fn());
      };
    },
    { scope: rootRef },
  );

  const primaryMetrics = metrics.slice(0, 3);
  const secondaryMetric = metrics.at(3);

  return (
    <div
      ref={rootRef}
      className="relative min-h-[460px] [perspective:1800px]"
      style={
        {
          "--tilt-focus-x": "50%",
          "--tilt-focus-y": "38%",
        } as CSSProperties
      }
    >
      <div
        data-tilt-panel
        data-cursor-label="Tilt"
        className="relative min-h-[460px] overflow-hidden border border-white/14 bg-[linear-gradient(135deg,#0b2d59_0%,#12396f_28%,#1a4e88_56%,#275f9e_78%,#ff6b00_142%)] p-5 shadow-[0_36px_100px_rgba(11,45,89,0.3)] [transform-style:preserve-3d] sm:p-7"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--tilt-focus-x)_var(--tilt-focus-y),rgba(255,255,255,0.24),transparent_23%),linear-gradient(135deg,rgba(255,255,255,0.14),transparent_40%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(11,45,89,0.22))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_80%,rgba(255,180,102,0.18),transparent_26%),radial-gradient(circle_at_74%_18%,rgba(255,107,0,0.24),transparent_24%),radial-gradient(circle_at_84%_12%,rgba(255,255,255,0.12),transparent_22%)]" />
        <div className="absolute inset-0 opacity-45 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:42px_42px]" />
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/65 to-transparent" />
        <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#ff6b00]/85 to-transparent" />
        <div
          data-tilt-glare
          className="pointer-events-none absolute -inset-[18%] opacity-0 mix-blend-screen"
        >
          <div className="h-full w-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.34),transparent_30%)] blur-3xl" />
        </div>
        <div
          data-premium-sweep-loop
          className="absolute left-[-20%] top-[18%] h-[1px] w-[54%] rotate-[15deg] bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-35"
        />
        <div
          data-premium-sweep-loop
          className="absolute bottom-[24%] left-[-15%] h-[2px] w-[60%] bg-gradient-to-r from-transparent via-[#ff6b00] to-transparent opacity-45"
        />
        <div
          data-premium-pulse-loop
          className="absolute right-[18%] top-[30%] h-3 w-3 rounded-full bg-white/70 shadow-[0_0_20px_rgba(255,255,255,0.45)]"
        />
        <div
          data-premium-pulse-loop
          className="absolute right-[22%] top-[40%] h-2.5 w-2.5 rounded-full bg-[#ff6b00]/85 shadow-[0_0_18px_rgba(255,107,0,0.4)]"
        />
        <div
          data-premium-pulse-loop
          className="absolute right-[26%] top-[50%] h-2 w-2 rounded-full bg-white/60 shadow-[0_0_16px_rgba(255,255,255,0.3)]"
        />

        <div
          data-tilt-layer
          data-depth="18"
          className="absolute left-5 top-5 right-5 flex items-start justify-between gap-6 sm:left-7 sm:right-7 sm:top-7"
        >
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white/66">
              {eyebrow}
            </p>
            <div className="mt-4 h-px w-16 bg-[#ff6b00]" />
          </div>
          <div className="w-[5.6rem] shrink-0 sm:w-[6.4rem]">
            <BrandLogo className="h-auto w-full opacity-100" framed />
          </div>
        </div>

        <div
          data-tilt-layer
          data-depth="30"
          className="absolute right-5 top-[6.5rem] border border-white/15 bg-white/[0.08] px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-white/72 backdrop-blur-md sm:right-7 sm:top-[7.5rem]"
        >
          Algeria field support
        </div>

        <div
          data-tilt-layer
          data-depth="42"
          className="absolute left-5 top-28 right-[30%] sm:left-7 sm:top-34 sm:right-[34%]"
        >
          <h3 className="max-w-sm text-[1.8rem] font-semibold uppercase leading-[0.92] text-white sm:text-[2.45rem]">
            {title}
          </h3>
        </div>

        <div
          data-tilt-layer
          data-depth="96"
          data-premium-flair-loop
          className="absolute right-[12%] top-[22%] h-14 w-14 rotate-45 border border-[#ff6b00]/55 bg-[#ff6b00]/10 shadow-[0_0_30px_rgba(255,107,0,0.2)] sm:h-20 sm:w-20"
        />
        <div
          data-tilt-layer
          data-depth="82"
          data-premium-flair-loop
          className="absolute bottom-[18%] right-[20%] h-32 w-32 rounded-full border border-white/16 sm:h-44 sm:w-44"
        />
        <div
          data-tilt-layer
          data-depth="68"
          data-premium-flair-loop
          className="absolute bottom-[24%] right-[25%] h-16 w-16 rounded-full border border-[#ff6b00]/40 sm:h-24 sm:w-24"
        />
        <div
          data-tilt-layer
          data-depth="90"
          data-premium-flair-loop
          className="absolute left-[12%] top-[62%] h-28 w-28 rounded-full bg-[#ff6b00]/12 blur-2xl sm:h-36 sm:w-36"
        />
        <div
          data-tilt-layer
          data-depth="74"
          data-premium-flair-loop
          className="absolute right-[30%] top-[16%] h-18 w-18 rounded-full bg-white/10 blur-xl sm:h-24 sm:w-24"
        />
        <div
          data-tilt-layer
          data-depth="76"
          className="absolute right-[16%] top-[28%] h-[42%] w-px bg-gradient-to-b from-transparent via-white/30 to-transparent"
        />

        <div
          data-tilt-layer
          data-depth="54"
          className="absolute bottom-5 left-5 right-[34%] border border-white/14 bg-white/[0.09] p-5 backdrop-blur-md sm:bottom-7 sm:left-7 sm:p-6"
        >
          <p className="text-sm leading-7 text-white/78">{copy}</p>
          <div className="mt-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-white/14" />
            <span className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-[#dbe8f5]">
              precise execution
            </span>
          </div>
        </div>

        <div
          data-tilt-layer
          data-depth="72"
          className="absolute bottom-5 right-5 w-[38%] min-w-[210px] border border-white/14 bg-[#0b2d59]/62 p-4 shadow-[0_24px_60px_rgba(7,20,41,0.34)] backdrop-blur-xl sm:bottom-7 sm:right-7 sm:p-5"
        >
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-[#dbe8f5]">
            operational snapshot
          </p>
          <div className="mt-4 grid gap-3">
            {primaryMetrics.map((metric) => (
              <div
                key={metric.label}
                className="border border-white/10 bg-white/[0.05] px-3 py-3"
              >
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-white/54">
                  {metric.label}
                </p>
                <p className="mt-2 text-lg font-semibold uppercase text-white">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>
          {secondaryMetric ? (
            <div className="mt-4 border-t border-white/10 pt-4">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-white/54">
                {secondaryMetric.label}
              </p>
              <p className="mt-2 text-sm leading-6 text-white/72">
                {secondaryMetric.copy}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
