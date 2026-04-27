"use client";

import { useRef } from "react";
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
  const cursorRef = useRef<HTMLDivElement>(null);

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
    const cursor = cursorRef.current;
    const cursorRing = cursor?.querySelector<HTMLElement>("[data-cursor-ring]");
    const cursorCore = cursor?.querySelector<HTMLElement>("[data-cursor-core]");
    const cursorLabel = cursor?.querySelector<HTMLElement>("[data-cursor-label]");

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
    const premiumMm = gsap.matchMedia();
    const cursorMm = gsap.matchMedia();

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

    premiumMm.add("(pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const cleanup: Array<() => void> = [];

      gsap.utils.toArray<HTMLElement>("[data-premium-card]").forEach((card) => {
        const rotateXTo = gsap.quickTo(card, "rotationX", {
          duration: 0.34,
          ease: "power3.out",
        });
        const rotateYTo = gsap.quickTo(card, "rotationY", {
          duration: 0.34,
          ease: "power3.out",
        });
        const xTo = gsap.quickTo(card, "x", {
          duration: 0.34,
          ease: "power3.out",
        });
        const yTo = gsap.quickTo(card, "y", {
          duration: 0.34,
          ease: "power3.out",
        });
        const scaleTo = gsap.quickTo(card, "scale", {
          duration: 0.34,
          ease: "power3.out",
        });

        const onEnter = () => {
          scaleTo(1.01);
          yTo(-5);
          card.style.setProperty("--premium-glint-opacity", "0.86");
        };

        const onMove = (event: PointerEvent) => {
          const bounds = card.getBoundingClientRect();
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

          rotateYTo(gsap.utils.interpolate(-5.5, 5.5, progressX));
          rotateXTo(gsap.utils.interpolate(4.2, -4.2, progressY));
          xTo(gsap.utils.interpolate(-2, 2, progressX));
          yTo(gsap.utils.interpolate(-3, 3, progressY) - 5);
          card.style.setProperty(
            "--premium-glint-x",
            `${gsap.utils.interpolate(12, 88, progressX)}%`,
          );
          card.style.setProperty(
            "--premium-glint-y",
            `${gsap.utils.interpolate(8, 90, progressY)}%`,
          );
        };

        const onLeave = () => {
          rotateXTo(0);
          rotateYTo(0);
          xTo(0);
          yTo(0);
          scaleTo(1);
          card.style.setProperty("--premium-glint-opacity", "0");
          card.style.setProperty("--premium-glint-x", "50%");
          card.style.setProperty("--premium-glint-y", "50%");
        };

        card.addEventListener("pointerenter", onEnter);
        card.addEventListener("pointermove", onMove);
        card.addEventListener("pointerleave", onLeave);

        cleanup.push(() => {
          card.removeEventListener("pointerenter", onEnter);
          card.removeEventListener("pointermove", onMove);
          card.removeEventListener("pointerleave", onLeave);
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-magnetic]").forEach((item) => {
        const xTo = gsap.quickTo(item, "x", {
          duration: 0.28,
          ease: "power3.out",
        });
        const yTo = gsap.quickTo(item, "y", {
          duration: 0.28,
          ease: "power3.out",
        });
        const rotateTo = gsap.quickTo(item, "rotation", {
          duration: 0.32,
          ease: "power3.out",
        });

        const onMove = (event: PointerEvent) => {
          const bounds = item.getBoundingClientRect();
          const progressX = ((event.clientX - bounds.left) / bounds.width) - 0.5;
          const progressY = ((event.clientY - bounds.top) / bounds.height) - 0.5;

          xTo(progressX * 14);
          yTo(progressY * 10);
          rotateTo(progressX * 3.2);
        };

        const onLeave = () => {
          xTo(0);
          yTo(0);
          rotateTo(0);
        };

        item.addEventListener("pointermove", onMove);
        item.addEventListener("pointerleave", onLeave);

        cleanup.push(() => {
          item.removeEventListener("pointermove", onMove);
          item.removeEventListener("pointerleave", onLeave);
        });
      });

      return () => {
        cleanup.forEach((fn) => fn());
      };
    });

    cursorMm.add("(pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      if (!cursor || !cursorRing || !cursorCore || !cursorLabel) {
        return;
      }

      const cleanup: Array<() => void> = [];
      const xTo = gsap.quickTo(cursor, "x", {
        duration: 0.18,
        ease: "power3.out",
      });
      const yTo = gsap.quickTo(cursor, "y", {
        duration: 0.18,
        ease: "power3.out",
      });
      const ringScaleTo = gsap.quickTo(cursorRing, "scale", {
        duration: 0.28,
        ease: "power3.out",
      });
      const coreScaleTo = gsap.quickTo(cursorCore, "scale", {
        duration: 0.22,
        ease: "power3.out",
      });
      const labelScaleTo = gsap.quickTo(cursorLabel, "scale", {
        duration: 0.22,
        ease: "power3.out",
      });
      const interactiveItems = gsap.utils.toArray<HTMLElement>(
        "a, button, summary, [data-magnetic], [data-premium-card], [data-tilt-panel]",
      );

      document.body.classList.add("has-premium-cursor");

      gsap.set(cursor, {
        autoAlpha: 0,
        xPercent: -50,
        yPercent: -50,
      });
      gsap.set(cursorLabel, {
        autoAlpha: 0,
        scale: 0.92,
      });

      const setInteractiveState = (target: HTMLElement | null) => {
        const label = target?.dataset.cursorLabel ?? "";
        const isInteractive = Boolean(target);

        gsap.to(cursorRing, {
          backgroundColor: isInteractive ? "rgba(255,143,43,0.18)" : "rgba(255,255,255,0.05)",
          borderColor: isInteractive ? "rgba(255,208,166,0.82)" : "rgba(163,131,86,0.62)",
          boxShadow: isInteractive
            ? "0 0 44px rgba(255,143,43,0.34), 0 0 88px rgba(85,125,165,0.24)"
            : "0 0 30px rgba(85,125,165,0.2), 0 0 40px rgba(255,143,43,0.12)",
          duration: 0.22,
          ease: "power3.out",
        });
        gsap.to(cursorCore, {
          backgroundColor: isInteractive ? "#ffffff" : "#ff8f2b",
          duration: 0.2,
          ease: "power3.out",
        });
        ringScaleTo(isInteractive ? 1.42 : 1);
        coreScaleTo(isInteractive ? 0.82 : 1);
        cursorLabel.textContent = label;
        gsap.to(cursorLabel, {
          autoAlpha: label ? 1 : 0,
          duration: 0.18,
          ease: "power2.out",
        });
        labelScaleTo(label ? 1 : 0.92);
      };

      const handleMove = (event: PointerEvent) => {
        xTo(event.clientX);
        yTo(event.clientY);

        if (gsap.getProperty(cursor, "autoAlpha") === 0) {
          gsap.to(cursor, {
            autoAlpha: 1,
            duration: 0.18,
            ease: "power2.out",
          });
        }
      };

      const handleDown = () => {
        ringScaleTo(0.88);
        coreScaleTo(0.66);
      };

      const handleUp = () => {
        ringScaleTo(1);
        coreScaleTo(1);
      };

      const handleLeaveWindow = () => {
        gsap.to(cursor, {
          autoAlpha: 0,
          duration: 0.16,
          ease: "power2.out",
        });
      };

      window.addEventListener("pointermove", handleMove);
      window.addEventListener("pointerdown", handleDown);
      window.addEventListener("pointerup", handleUp);
      document.addEventListener("mouseleave", handleLeaveWindow);

      cleanup.push(() => {
        window.removeEventListener("pointermove", handleMove);
        window.removeEventListener("pointerdown", handleDown);
        window.removeEventListener("pointerup", handleUp);
        document.removeEventListener("mouseleave", handleLeaveWindow);
        document.body.classList.remove("has-premium-cursor");
      });

      interactiveItems.forEach((item) => {
        const onEnter = () => setInteractiveState(item);
        const onLeave = () => setInteractiveState(null);

        item.addEventListener("pointerenter", onEnter);
        item.addEventListener("pointerleave", onLeave);

        cleanup.push(() => {
          item.removeEventListener("pointerenter", onEnter);
          item.removeEventListener("pointerleave", onLeave);
        });
      });

      return () => {
        cleanup.forEach((fn) => fn());
      };
    });

    return () => {
      mm.revert();
      premiumMm.revert();
      cursorMm.revert();
    };
  });

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[120] hidden md:block"
    >
      <div className="premium-cursor-label" data-cursor-label />
      <div className="premium-cursor-ring" data-cursor-ring />
      <div className="premium-cursor-core" data-cursor-core />
    </div>
  );
}
