import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide",
  {
    variants: {
      tone: {
        neutral: "bg-sheet text-ink",
        ok: "bg-ok-bg text-ok",
        warn: "bg-warn-bg text-warn",
        danger: "bg-danger-bg text-danger",
        info: "bg-info-bg text-info",
        primary: "bg-primary text-primary-fg",
      },
    },
    defaultVariants: { tone: "neutral" },
  },
);

export function Badge({
  className,
  tone,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}
