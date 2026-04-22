import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-baseline gap-2 text-ink no-underline",
        className,
      )}
      aria-label="Robert Editing — home"
    >
      <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-robert text-white font-display text-lg shadow-card">
        R
        <span
          aria-hidden
          className="absolute -right-0.5 -bottom-0.5 h-2 w-2 rounded-full bg-white ring-2 ring-robert"
        />
      </span>
      <span className="font-display text-xl tracking-tight">
        Robert <span className="text-robert">Editing</span>
      </span>
    </Link>
  );
}
