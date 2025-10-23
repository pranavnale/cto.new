"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  BarChart3,
  CalendarRange,
  CircleDot,
  GaugeCircle,
  LayoutDashboard,
  LifeBuoy,
  Settings2
} from "lucide-react";

import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Overview", href: "/", icon: LayoutDashboard },
  { label: "Pulse", href: "/pulse", icon: Activity },
  { label: "Forecasts", href: "/forecasts", icon: BarChart3 },
  { label: "Capacity", href: "/capacity", icon: GaugeCircle },
  { label: "Programs", href: "/programs", icon: CircleDot },
  { label: "Planning", href: "/planning", icon: CalendarRange }
] as const;

const SECONDARY_ITEMS = [
  { label: "Settings", href: "/settings", icon: Settings2 },
  { label: "Support", href: "/support", icon: LifeBuoy }
] as const;

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm transition-all duration-300 ease-out lg:hidden",
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
      />
      <aside
        className={cn(
          "group/sidebar fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-white/5 bg-slate-950/95 pb-8 text-slate-200 shadow-2xl shadow-slate-950/60 transition-transform duration-300 ease-out backdrop-blur-xl",
          "lg:bg-slate-950/80 lg:shadow-glow",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex items-center gap-3 px-6 pt-6">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-brand-400 via-brand-500 to-brand-600 shadow-lg shadow-brand-500/40">
            <span className="text-lg font-bold text-white">P</span>
          </div>
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-400">PulseMetrics</p>
            <p className="text-lg font-semibold text-white">Command Center</p>
          </div>
        </div>

        <div className="mt-10 flex flex-1 flex-col space-y-6 overflow-hidden px-4">
          <nav className="space-y-1 overflow-y-auto pr-2 text-sm">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isRoot = item.href === "/";
              const isActive = isRoot
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "group flex items-center gap-3 rounded-2xl px-3 py-3 font-medium transition-all duration-300 ease-out",
                    "hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400",
                    isActive
                      ? "bg-white/15 text-white shadow-inner shadow-brand-500/30"
                      : "text-slate-400"
                  )}
                >
                  <span
                    className={cn(
                      "grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-200 transition-colors",
                      isActive ? "border-white/20 bg-white/15 text-white" : "group-hover:text-white"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="space-y-2 text-sm text-slate-400">
            {SECONDARY_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "group flex items-center gap-3 rounded-2xl px-3 py-3 font-medium transition-all duration-300 ease-out",
                    "hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400",
                    isActive ? "bg-white/10 text-white" : "text-slate-400"
                  )}
                >
                  <span
                    className={cn(
                      "grid h-8 w-8 place-items-center rounded-xl border border-white/5 bg-white/5 text-slate-200",
                      isActive ? "border-white/30 bg-white/15 text-white" : "group-hover:text-white"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-auto px-6">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-5 text-sm shadow-inner shadow-brand-900/30">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">Insights</p>
            <p className="mt-2 text-base font-semibold text-white">AI Anomaly Reports</p>
            <p className="mt-1 text-slate-400">
              Surface anomalies in real time and alert your teams before metrics drift.
            </p>
            <Link
              href="/pulse"
              onClick={onClose}
              className="mt-4 inline-flex items-center justify-center rounded-2xl bg-white/20 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-slate-950/40 transition hover:bg-white/30"
            >
              View reports
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
