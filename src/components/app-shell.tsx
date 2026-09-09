import { useEffect, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  AlertTriangle,
  Building2,
  ClipboardList,
  HardHat,
  LayoutDashboard,
  MoreHorizontal,
  Package,
  ShieldCheck,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { LogoMark } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SitePicker } from "@/components/site-picker";
import { t } from "@/lib/i18n";
import { useSthal } from "@/lib/store";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", key: "dashboard" as const, icon: LayoutDashboard },
  { to: "/sites", key: "sites" as const, icon: Building2 },
  { to: "/dpr", key: "dpr" as const, icon: ClipboardList },
  { to: "/issues", key: "issues" as const, icon: AlertTriangle },
];

const MORE = [
  { to: "/materials", key: "materials" as const, icon: Package },
  { to: "/labor", key: "labor" as const, icon: Users },
  { to: "/quality", key: "quality" as const, icon: ShieldCheck },
  { to: "/safety", key: "safety" as const, icon: HardHat },
];

export function AppShell({ children }: { children: ReactNode }) {
  const lang = useSthal((s) => s.lang);
  const setLang = useSthal((s) => s.setLang);
  const resetSample = useSthal((s) => s.resetSample);
  const setHydrated = useSthal((s) => s.setHydrated);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    void Promise.resolve(useSthal.persist.rehydrate()).finally(() => {
      setHydrated(true);
    });
  }, [setHydrated]);

  const moreActive = MORE.some((m) => pathname === m.to || pathname.startsWith(m.to + "/"));

  return (
    <div className="min-h-dvh bg-bg text-ink">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-56 flex-col border-r border-border bg-surface md:flex">
        <div className="flex items-center gap-2.5 px-5 py-5">
          <LogoMark className="size-8" />
          <div>
            <p className="font-display text-lg leading-none font-semibold tracking-tight">
              {t(lang, "app")}
            </p>
            <p className="mt-1 text-[11px] tracking-wide text-muted">{t(lang, "tagline")}</p>
          </div>
        </div>
        <nav className="flex flex-1 flex-col gap-0.5 px-3">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} icon={item.icon} label={t(lang, item.key)} active={isActive(pathname, item.to)} />
          ))}
          <p className="mt-4 mb-1 px-3 text-[10px] font-medium tracking-widest text-subtle uppercase">
            {t(lang, "field")}
          </p>
          {MORE.map((item) => (
            <NavLink key={item.to} to={item.to} icon={item.icon} label={t(lang, item.key)} active={isActive(pathname, item.to)} />
          ))}
        </nav>
        <div className="px-3 pb-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-muted"
            onClick={() => {
              if (confirm(t(lang, "confirmReset"))) {
                resetSample();
                toast.success(t(lang, "resetDone"));
              }
            }}
          >
            {t(lang, "reset")}
          </Button>
        </div>
      </aside>

      <div className="md:pl-56">
        <header className="sticky top-0 z-20 flex items-center gap-2 border-b border-border bg-bg/90 px-3 py-2 backdrop-blur-sm md:px-6">
          <div className="flex items-center gap-2 md:hidden">
            <LogoMark className="size-7" />
            <span className="font-display font-semibold">{t(lang, "app")}</span>
          </div>
          <div className="ml-auto flex min-w-0 flex-1 items-center justify-end gap-2 md:ml-0">
            <SitePicker className="max-w-48 md:max-w-56" />
            <Button
              variant="outline"
              size="sm"
              className="shrink-0"
              onClick={() => setLang(lang === "en" ? "mr" : "en")}
            >
              {t(lang, "language")}
            </Button>
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" aria-label={t(lang, "more")}>
                    <MoreHorizontal />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {MORE.map((item) => (
                    <DropdownMenuItem key={item.to} asChild>
                      <Link to={item.to} className="flex items-center gap-2">
                        <item.icon className="size-4" />
                        {t(lang, item.key)}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onSelect={() => {
                      if (confirm(t(lang, "confirmReset"))) {
                        resetSample();
                        toast.success(t(lang, "resetDone"));
                      }
                    }}
                  >
                    {t(lang, "reset")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <main className="px-3 py-5 pb-24 md:px-6 md:pb-8">{children}</main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm md:hidden">
        <ul className="grid grid-cols-5">
          {NAV.map((item) => {
            const active = isActive(pathname, item.to);
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={cn(
                    "flex h-14 flex-col items-center justify-center gap-0.5 text-[10px] font-medium",
                    active ? "text-primary" : "text-muted",
                  )}
                >
                  <item.icon className="size-5" />
                  {t(lang, item.key)}
                </Link>
              </li>
            );
          })}
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={cn(
                    "flex h-14 w-full flex-col items-center justify-center gap-0.5 text-[10px] font-medium",
                    moreActive ? "text-primary" : "text-muted",
                  )}
                >
                  <MoreHorizontal className="size-5" />
                  {t(lang, "field")}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" align="end">
                {MORE.map((item) => (
                  <DropdownMenuItem key={item.to} asChild>
                    <Link to={item.to} className="flex items-center gap-2">
                      <item.icon className="size-4" />
                      {t(lang, item.key)}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        </ul>
      </nav>
    </div>
  );
}

function isActive(pathname: string, to: string) {
  if (to === "/") return pathname === "/";
  return pathname === to || pathname.startsWith(to + "/");
}

function NavLink({
  to,
  icon: Icon,
  label,
  active,
}: {
  to: string;
  icon: typeof LayoutDashboard;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "flex h-11 items-center gap-2.5 rounded-md px-3 text-sm font-medium transition-colors duration-150",
        active ? "bg-sheet text-ink" : "text-muted hover:bg-sheet/70 hover:text-ink",
      )}
    >
      <Icon className="size-4" />
      {label}
    </Link>
  );
}
