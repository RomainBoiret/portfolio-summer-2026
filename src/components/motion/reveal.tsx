"use client";

import { cn } from "@/lib/utils";
import { useRevealOnView } from "@/components/motion/use-reveal-on-view";

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, visible } = useRevealOnView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn(
        "reveal-block",
        visible && "reveal-block-visible",
        className,
      )}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}

/** Editorial mask reveal for large section titles. */
export function TitleReveal({
  children,
  className,
  align = "left",
  as: Tag = "h2",
}: {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "right";
  as?: "h1" | "h2" | "h3";
}) {
  const { ref, visible } = useRevealOnView<HTMLHeadingElement>();

  return (
    <Tag
      ref={ref}
      className={cn(
        "title-reveal",
        align === "right" && "title-reveal-right",
        visible && "is-visible",
        className,
      )}
    >
      <span className="title-reveal-mask">
        <span className="title-reveal-text">{children}</span>
      </span>
      <span aria-hidden className="title-reveal-rule" />
    </Tag>
  );
}
