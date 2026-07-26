import { cn } from "@/lib/utils";

type IconProps = {
  className?: string;
};

const iconBase =
  "size-[1.05rem] shrink-0 [stroke-linecap:round] [stroke-linejoin:round]";

export function IconArrowRight({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={cn(iconBase, "btn-arrow", className)}
      aria-hidden
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function IconChevronLeft({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={cn(iconBase, className)}
      aria-hidden
    >
      <path d="m15 6-6 6 6 6" />
    </svg>
  );
}

export function IconChevronRight({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={cn(iconBase, className)}
      aria-hidden
    >
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

export function IconChevronDown({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={cn(iconBase, className)}
      aria-hidden
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function IconClose({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={cn(iconBase, className)}
      aria-hidden
    >
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function IconSearch({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={cn(iconBase, className)}
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export function IconCopy({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={cn(iconBase, className)}
      aria-hidden
    >
      <rect x="9" y="9" width="11" height="11" rx="1.5" />
      <path d="M5 15V5.5A1.5 1.5 0 0 1 6.5 4H15" />
    </svg>
  );
}

export function IconCheck({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={cn(iconBase, className)}
      aria-hidden
    >
      <path d="m5 12 5 5L20 7" />
    </svg>
  );
}
