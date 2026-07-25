import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-shell px-6 sm:px-8", className)}>
      {children}
    </div>
  );
}

export function TextLink({
  href,
  children,
  className,
  external,
  "aria-label": ariaLabel,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  "aria-label"?: string;
}) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      className={cn(
        "text-foreground underline decoration-border underline-offset-[5px] transition-colors duration-300 hover:decoration-accent hover:text-accent-hover",
        className,
      )}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : undefined)}
    >
      {children}
    </a>
  );
}
