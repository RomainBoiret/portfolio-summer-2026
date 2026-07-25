"use client";

import type { ReactNode } from "react";
import { useContact } from "@/components/contact/contact-context";
import { IconArrowRight } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export function ContactTrigger({
  children,
  variant = "primary",
  arrow = false,
  className,
}: {
  children: ReactNode;
  variant?: "primary" | "secondary" | "text" | "link";
  arrow?: boolean;
  className?: string;
}) {
  const { openContact } = useContact();

  const classes =
    variant === "primary"
      ? cn("btn-primary", className)
      : variant === "secondary"
        ? cn("btn-secondary", className)
        : variant === "link"
          ? cn(
              "text-muted transition-colors hover:text-accent",
              className,
            )
          : cn(
              "cursor-pointer text-xs font-semibold uppercase tracking-[0.16em] text-foreground transition-colors duration-300 hover:text-accent",
              className,
            );

  return (
    <button type="button" onClick={openContact} className={classes}>
      {variant === "primary" || variant === "secondary" ? (
        <>
          <span>{children}</span>
          {arrow ? <IconArrowRight /> : null}
        </>
      ) : (
        children
      )}
    </button>
  );
}
