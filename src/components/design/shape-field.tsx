"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type AtmosphereShape = {
  id: string;
  speed: number;
  className: string;
  innerClassName: string;
  /** If false, shape only shows from `sm` and up. Default true. */
  mobile?: boolean;
};

const shapes: AtmosphereShape[] = [
  // -- Mobile: only these few (mobile !== false) --
  {
    id: "h1",
    speed: 0.12,
    className: "left-[16%] top-[6%] h-14 w-14 sm:left-[16%] sm:h-28 sm:w-28",
    innerClassName: "shape shape-drift rounded-full border-2 border-accent/35",
  },
  {
    id: "h2",
    speed: 0.2,
    className: "right-[18%] top-[12%] h-8 w-8 sm:right-[18%] sm:top-[8%] sm:h-14 sm:w-14",
    innerClassName: "shape shape-spin rotate-12 border-2 border-accent-rose/40",
  },
  {
    id: "a1",
    speed: 0.14,
    className: "right-[8%] top-[36%] h-16 w-16 sm:right-[10%] sm:top-[28%] sm:h-28 sm:w-28",
    innerClassName: "shape shape-float rounded-full border-2 border-accent/25",
  },
  {
    id: "p1",
    speed: 0.16,
    className: "left-[8%] top-[58%] h-12 w-12 sm:left-[10%] sm:top-[56%] sm:h-20 sm:w-20",
    innerClassName: "shape shape-drift rounded-full border-2 border-accent-teal/30",
  },

  // -- Desktop extras --
  {
    id: "h3",
    mobile: false,
    speed: 0.08,
    className: "left-[8%] top-[14%] h-4 w-4",
    innerClassName: "shape shape-pulse rounded-full bg-accent-teal/40",
  },
  {
    id: "h4",
    mobile: false,
    speed: 0.3,
    className: "right-[12%] top-[15%] h-9 w-9",
    innerClassName:
      "shape shape-float rounded-[0.3rem] border-2 border-accent-violet/30",
  },
  {
    id: "h5",
    mobile: false,
    speed: 0.18,
    className: "left-[12%] top-[9%] h-5 w-5",
    innerClassName: "shape shape-drift-alt rounded-full border border-accent/35",
  },
  {
    id: "h6",
    mobile: false,
    speed: 0.35,
    className: "right-[22%] top-[20%] h-3 w-3",
    innerClassName: "shape shape-pulse rounded-full bg-accent-rose/45",
  },
  {
    id: "a2",
    mobile: false,
    speed: 0.28,
    className: "left-[6%] top-[32%] h-16 w-16",
    innerClassName:
      "shape shape-drift rounded-[0.4rem] border-2 border-accent-violet/30",
  },
  {
    id: "a3",
    mobile: false,
    speed: 0.2,
    className: "right-[8%] top-[38%] h-11 w-11",
    innerClassName:
      "shape shape-spin-slow rotate-[18deg] border-2 border-accent-rose/35",
  },
  {
    id: "a4",
    mobile: false,
    speed: 0.32,
    className: "left-[10%] top-[40%] h-4 w-4",
    innerClassName: "shape shape-pulse rounded-full bg-accent/50",
  },
  {
    id: "a5",
    mobile: false,
    speed: 0.12,
    className: "right-[14%] top-[33%] h-14 w-14",
    innerClassName: "shape shape-spin rounded-full border border-accent-teal/25",
  },
  {
    id: "a6",
    mobile: false,
    speed: 0.25,
    className: "left-[8%] top-[44%] h-8 w-8",
    innerClassName: "shape shape-float rotate-12 border-2 border-accent-rose/30",
  },
  {
    id: "m1",
    mobile: false,
    speed: 0.19,
    className: "right-[6%] top-[46%] h-12 w-12",
    innerClassName: "shape shape-drift rounded-full border-2 border-accent-teal/28",
  },
  {
    id: "m2",
    mobile: false,
    speed: 0.27,
    className: "left-[8%] top-[50%] h-5 w-5",
    innerClassName: "shape shape-pulse rounded-full bg-accent-violet/40",
  },
  {
    id: "m3",
    mobile: false,
    speed: 0.14,
    className: "right-[38%] top-[50%] h-16 w-16",
    innerClassName: "shape shape-float rounded-full border-2 border-accent/22",
  },
  {
    id: "p2",
    mobile: false,
    speed: 0.26,
    className: "right-[19%] top-[58%] h-14 w-14",
    innerClassName: "shape shape-float rounded-[0.35rem] border-2 border-accent/35",
  },
  {
    id: "p3",
    mobile: false,
    speed: 0.34,
    className: "left-[28%] top-[62%] h-4 w-4",
    innerClassName: "shape shape-pulse rounded-full bg-accent-violet/45",
  },
  {
    id: "p4",
    mobile: false,
    speed: 0.21,
    className: "right-[26%] top-[64%] h-10 w-10",
    innerClassName:
      "shape shape-spin-slow -rotate-12 border-2 border-accent-rose/32",
  },
  {
    id: "p5",
    mobile: false,
    speed: 0.29,
    className: "left-[38%] top-[68%] h-3 w-3",
    innerClassName: "shape shape-drift-alt rounded-full bg-accent-teal/45",
  },
  {
    id: "p6",
    mobile: false,
    speed: 0.17,
    className: "right-[32%] top-[70%] h-12 w-12",
    innerClassName:
      "shape shape-float rounded-[0.4rem] border-2 border-accent-violet/25",
  },

  // -- Contact / Say hi (slow parallax so they stay in frame) --
  {
    id: "c1",
    speed: 0.06,
    className: "right-[16%] top-[78%] h-16 w-16 sm:right-[18%] sm:top-[76%] sm:h-28 sm:w-28",
    innerClassName: "shape shape-float rounded-full border-2 border-accent-rose/30",
  },
  {
    id: "c2",
    speed: 0.08,
    className: "left-[18%] top-[86%] h-10 w-10 sm:left-[16%] sm:top-[82%] sm:h-14 sm:w-14",
    innerClassName:
      "shape shape-drift rounded-[0.4rem] border-2 border-accent-violet/30",
  },
  {
    id: "c3",
    mobile: false,
    speed: 0.05,
    className: "right-[22%] top-[84%] h-10 w-10",
    innerClassName: "shape shape-spin-slow rotate-12 border-2 border-accent/35",
  },
  {
    id: "c4",
    mobile: false,
    speed: 0.1,
    className: "left-[28%] top-[88%] h-4 w-4",
    innerClassName: "shape shape-pulse rounded-full bg-accent/50",
  },
  {
    id: "c5",
    mobile: false,
    speed: 0.04,
    className: "right-[34%] top-[90%] h-12 w-12",
    innerClassName: "shape shape-float rounded-full border-2 border-accent-teal/28",
  },
  {
    id: "c6",
    mobile: false,
    speed: 0.09,
    className: "left-[38%] top-[80%] h-8 w-8",
    innerClassName:
      "shape shape-drift rounded-[0.35rem] border-2 border-accent-rose/32",
  },
  {
    id: "c7",
    mobile: false,
    speed: 0.07,
    className: "right-[28%] top-[94%] h-6 w-6",
    innerClassName: "shape shape-drift-alt rounded-full border border-accent/40",
  },
  {
    id: "c8",
    speed: 0.05,
    className: "left-[32%] top-[94%] h-3 w-3 sm:left-[42%] sm:top-[93%] sm:h-5 sm:w-5",
    innerClassName: "shape shape-pulse rounded-full bg-accent-teal/45",
  },
  {
    id: "c9",
    mobile: false,
    speed: 0.11,
    className: "right-[40%] top-[79%] h-3 w-3",
    innerClassName: "shape shape-pulse rounded-full bg-accent-violet/45",
  },
  {
    id: "c10",
    mobile: false,
    speed: 0.06,
    className: "left-[22%] top-[92%] h-9 w-9",
    innerClassName: "shape shape-spin rotate-45 border-2 border-accent-rose/28",
  },
];

/** Full-page geometric atmosphere - continuous, inset, parallax. */
export function ShapeField({ className }: { className?: string }) {
  const rootRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let frame = 0;
    let layers: Array<{ el: HTMLElement; speed: number }> = [];
    let idleId = 0;
    let cancelled = false;
    let armScroll: (() => void) | null = null;

    const update = () => {
      const y = window.scrollY;
      for (const { el, speed } of layers) {
        el.style.transform = `translate3d(0, ${y * -speed}px, 0)`;
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    const start = () => {
      if (cancelled) return;
      layers = Array.from(
        root.querySelectorAll<HTMLElement>("[data-parallax]"),
      ).map((el) => ({
        el,
        speed: Number(el.dataset.parallax) || 0.15,
      }));

      const enable = () => {
        if (cancelled) return;
        frame = requestAnimationFrame(update);
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll, { passive: true });
        if (armScroll) window.removeEventListener("scroll", armScroll);
        armScroll = null;
      };

      // Defer parallax listeners until the user actually scrolls.
      if (window.scrollY > 0) enable();
      else {
        armScroll = enable;
        window.addEventListener("scroll", enable, { passive: true, once: true });
      }
    };

    const ric =
      window.requestIdleCallback?.bind(window) ??
      ((cb: IdleRequestCallback) =>
        window.setTimeout(
          () => cb({ didTimeout: false, timeRemaining: () => 0 } as IdleDeadline),
          200,
        ));

    idleId = ric(start, { timeout: 1200 }) as number;

    return () => {
      cancelled = true;
      if (window.cancelIdleCallback) window.cancelIdleCallback(idleId);
      else window.clearTimeout(idleId);
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (armScroll) window.removeEventListener("scroll", armScroll);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 z-0 overflow-visible",
        className,
      )}
    >
      {shapes.map((shape) => (
        <span
          key={shape.id}
          data-parallax={shape.speed}
          className={cn(
            "absolute",
            shape.mobile === false && "hidden sm:block",
            shape.className,
          )}
        >
          <span className={cn("block h-full w-full", shape.innerClassName)} />
        </span>
      ))}
    </div>
  );
}
