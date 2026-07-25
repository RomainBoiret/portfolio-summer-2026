import Link from "next/link";
import type { ReactNode } from "react";
import { IconArrowRight } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary";
  arrow?: boolean;
  className?: string;
  href: string;
  target?: string;
  rel?: string;
  tabIndex?: number;
};

export function Button({
  children,
  variant = "primary",
  arrow = false,
  className,
  href,
  target,
  rel,
  tabIndex,
}: ButtonProps) {
  const classes = cn(
    variant === "primary" ? "btn-primary" : "btn-secondary",
    className,
  );

  const content = (
    <>
      <span>{children}</span>
      {arrow ? <IconArrowRight /> : null}
    </>
  );

  const isInternal = href.startsWith("/") && !href.startsWith("//");
  if (isInternal) {
    return (
      <Link href={href} className={classes} tabIndex={tabIndex}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={classes}
      target={target}
      rel={rel}
      tabIndex={tabIndex}
    >
      {content}
    </a>
  );
}
