import * as React from "react";
import { cn } from "@/lib/utils";

export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "flex min-h-24 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-ink shadow-sm transition-[box-shadow,border-color] duration-150 placeholder:text-subtle focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
