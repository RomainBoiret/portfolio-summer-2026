"use client";

import * as React from "react";

type RevealCallback = () => void;

const elements = new Map<Element, RevealCallback>();
let observer: IntersectionObserver | null = null;

function getObserver() {
  if (typeof window === "undefined") return null;
  if (observer) return observer;

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const cb = elements.get(entry.target);
        if (!cb) continue;
        cb();
        observer?.unobserve(entry.target);
        elements.delete(entry.target);
      }
    },
    { rootMargin: "0px 0px -40px 0px", threshold: 0.01 },
  );

  return observer;
}

/** One shared IntersectionObserver for all reveal animations. */
export function useRevealOnView<T extends Element>(
  enabled = true,
) {
  const ref = React.useRef<T | null>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node || !enabled) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const obs = getObserver();
    if (!obs) {
      setVisible(true);
      return;
    }

    const reveal = () => setVisible(true);
    elements.set(node, reveal);
    obs.observe(node);

    return () => {
      obs.unobserve(node);
      elements.delete(node);
    };
  }, [enabled]);

  return { ref, visible };
}
