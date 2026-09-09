import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function EmptyState({
  icon,
  title,
  hint,
  action,
  className,
}: {
  icon: ReactNode;
  title: string;
  hint?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-lg bg-sheet px-6 py-10 text-center",
        className,
      )}
    >
      <div className="text-muted">{icon}</div>
      <p className="font-medium">{title}</p>
      {hint ? <p className="max-w-sm text-sm text-muted">{hint}</p> : null}
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}
