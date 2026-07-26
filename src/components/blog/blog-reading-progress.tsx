"use client";

import { useEffect, useState } from "react";

/** Thin reading progress bar fixed under the site header. */
export function BlogReadingProgress({
  targetId = "blog-article-body",
}: {
  targetId?: string;
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = document.getElementById(targetId);
      if (!el) {
        setProgress(0);
        return;
      }
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) {
        setProgress(rect.bottom <= window.innerHeight ? 100 : 0);
        return;
      }
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      setProgress((scrolled / total) * 100);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [targetId]);

  return (
    <div
      className="blog-progress"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress)}
      aria-label="Reading progress"
    >
      <div
        className="blog-progress-bar"
        style={{
          transform: `scaleX(${progress / 100})`,
          transition: undefined,
        }}
      />
    </div>
  );
}
