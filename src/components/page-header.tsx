import type { ReactNode } from "react";

export function PageHeader({
  kicker,
  title,
  action,
}: {
  kicker?: string;
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-5 flex items-end justify-between gap-3">
      <div className="min-w-0">
        {kicker ? (
          <p className="mb-1 text-xs font-medium tracking-widest text-muted uppercase">{kicker}</p>
        ) : null}
        <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">{title}</h1>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
