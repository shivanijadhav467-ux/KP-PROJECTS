import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("text-primary", className)}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="26" height="26" rx="3" fill="currentColor" opacity="0.12" />
      <path
        d="M8 24V12.5L16 8l8 4.5V24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path d="M8 24h16" stroke="currentColor" strokeWidth="1.75" />
      <path d="M16 12v12M11 16.5h4M17 19h4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
