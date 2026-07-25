import { cn } from "@/lib/utils";

export function AccentRule({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("accent-rule h-px w-12 bg-accent", className)} />
  );
}

export function CategoryChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex rounded-sm border border-white/40 px-2.5 py-0.5 text-[0.7rem] font-medium tracking-wide text-white">
      {children}
    </span>
  );
}
