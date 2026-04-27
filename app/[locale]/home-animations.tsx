"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function getDirectionalOffset(direction: string | undefined, amount: number) {
  if (direction === "right") {
    return { x: amount, y: 0 };
  }

  if (direction === "left") {
    return { x: -amount, y: 0 };
  }

  return { x: 0, y: 28 };
}

export function HomeAnimations() {
  useGSAP(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      return;
    }

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const heroMedia = document.querySelector<HTMLElement>("[data-hero-media]");
    const hero = document.querySelector<HTMLElement>("[data-hero]");
    const heroRevealItems = gsap.utils.toArray<HTMLElement>("[data-hero-reveal]");
    const verticalLine = document.querySelector<HTMLElement>("[data-vertical-line]");
    const sectionRevealItems =
      gsap.utils.toArray<HTMLElement>("[data-section-reveal]");

    if (heroMedia) {
      gsap.from(heroMedia, {
        autoAlpha: 0,
        scale: 1.04,
        duration: 1.35,
        ease: "power3.out",
      });
    }

    if (heroRevealItems.length > 0) {
      heroRevealItems.forEach((item, index) => {
        const direction = item.dataset.revealFrom ?? "left";
        const offset = getDirectionalOffset(direction, isMobile ? 18 : 48);

        gsap.from(item, {
          autoAlpha: 0,
          x: offset.x,
          y: offset.y,
          duration: 0.72,
          ease: "power3.out",
          delay: 0.04 + index * 0.06,
          clearProps: "transform",
        });
      });
    }

    if (verticalLine) {
      gsap.from(verticalLine, {
        scaleY: 0,
        transformOrigin: "top center",
        duration: 0.86,
        ease: "power3.out",
        delay: 0.16,
      });
    }

    sectionRevealItems.forEach((item) => {
      const direction = item.dataset.revealFrom;
      const offset = getDirectionalOffset(direction, isMobile ? 14 : 42);

      gsap.from(item, {
        autoAlpha: 0,
        x: offset.x,
        y: offset.y,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 84%",
          once: true,
        },
      });
    });

    gsap.utils.toArray<HTMLElement>("[data-scroll-shell]").forEach((shell) => {
      const panel = shell.querySelector<HTMLElement>("[data-scroll-panel]");
      const copy = Array.from(
        shell.querySelectorAll<HTMLElement>("[data-scroll-copy]"),
      );
      const visual = Array.from(
        shell.querySelectorAll<HTMLElement>("[data-scroll-visual]"),
      );

      if (!panel) {
        return;
      }

      gsap.set(panel, { autoAlpha: isMobile ? 1 : 0.56 });
      if (copy.length > 0) {
        gsap.set(copy, {
          autoAlpha: isMobile ? 1 : 0.42,
          xPercent: isMobile ? 0 : -8,
          yPercent: isMobile ? 0 : 3,
        });
      }
      if (visual.length > 0) {
        gsap.set(visual, {
          autoAlpha: isMobile ? 1 : 0.36,
          xPercent: isMobile ? 0 : 8,
          yPercent: isMobile ? 0 : 4,
          scale: isMobile ? 1 : 0.992,
        });
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: shell,
          start: isMobile ? "top top" : "top 72%",
          end: "bottom top",
          scrub: true,
        },
      });

      if (isMobile) {
        if (copy.length > 0) {
          timeline.to(
            copy,
            {
              autoAlpha: 0.2,
              xPercent: -4,
              yPercent: -4,
              duration: 0.16,
              ease: "none",
              stagger: 0.02,
            },
            0.78,
          );
        }

        if (visual.length > 0) {
          timeline.to(
            visual,
            {
              autoAlpha: 0.18,
              xPercent: 4,
              yPercent: -3,
              duration: 0.16,
              ease: "none",
              stagger: 0.02,
            },
            0.8,
          );
        }

        timeline.to(panel, { autoAlpha: 0.2, duration: 0.16, ease: "none" }, 0.84);
      } else {
        timeline.to(panel, { autoAlpha: 1, duration: 0.16, ease: "none" }, 0);

        if (copy.length > 0) {
          timeline
            .to(
              copy,
              {
                autoAlpha: 1,
                xPercent: 0,
                yPercent: 0,
                duration: 0.18,
                ease: "none",
                stagger: 0.03,
              },
              0.02,
            )
            .to(
              copy,
              {
                autoAlpha: 0.12,
                xPercent: -5,
                yPercent: -6,
                duration: 0.16,
                ease: "none",
                stagger: 0.02,
              },
              0.72,
            );
        }

        if (visual.length > 0) {
          timeline
            .to(
              visual,
              {
                autoAlpha: 1,
                xPercent: 0,
                yPercent: 0,
                scale: 1,
                duration: 0.22,
                ease: "none",
                stagger: 0.04,
              },
              0.06,
            )
            .to(
              visual,
              {
                autoAlpha: 0.08,
                xPercent: 5,
                yPercent: -4,
                scale: 0.988,
                duration: 0.16,
                ease: "none",
                stagger: 0.02,
              },
              0.76,
            );
        }

        timeline
          .to(panel, { autoAlpha: 1, duration: 0.34, ease: "none" }, 0.24)
          .to(panel, { autoAlpha: 0.1, duration: 0.16, ease: "none" }, 0.82);
      }
    });

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      if (heroMedia && hero) {
        gsap.to(heroMedia, {
          yPercent: 7,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    });

    return () => {
      mm.revert();
    };
  });

  return null;
}
