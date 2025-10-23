"use client";

import { Bell, Menu, Search } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";

type NavbarProps = {
  onToggleSidebar: () => void;
  className?: string;
};

export function Navbar({ onToggleSidebar, className }: NavbarProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-30 w-full border-b border-slate-200/70 bg-white/70 backdrop-blur-xl transition-all duration-300 dark:border-slate-800/60 dark:bg-slate-950/80",
        className
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <div className="flex flex-1 items-center gap-3">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white/80 text-slate-600 shadow-sm transition hover:border-brand-400 hover:text-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:border-brand-300 dark:hover:text-brand-200 lg:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation</span>
          </button>

          <div className="relative hidden flex-1 items-center sm:flex">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              name="search"
              placeholder="Search metrics, teams, or dashboards"
              className="h-11 w-full rounded-2xl border border-transparent bg-white/70 pl-12 pr-4 text-sm font-medium text-slate-600 shadow-inner shadow-slate-200/80 transition-all duration-300 placeholder:text-slate-400 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-400/60 dark:bg-slate-900/60 dark:text-slate-200 dark:shadow-none dark:placeholder:text-slate-500"
            />
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <div className="relative flex items-center gap-2 rounded-full border border-slate-200/60 bg-white/60 px-2 py-1 shadow-sm shadow-slate-200/80 backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-900/60 dark:shadow-none">
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100/80 hover:text-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:text-slate-300 dark:hover:bg-slate-800/90 dark:hover:text-brand-200"
              aria-label="View notifications"
            >
              <Bell className="h-5 w-5" />
            </button>
            <ThemeToggle className="hidden sm:inline-flex" />
            <div className="flex items-center gap-2 rounded-full bg-gradient-to-br from-brand-500/90 via-brand-500 to-brand-600 px-2 py-1 text-white shadow-md shadow-brand-500/50">
              <div className="hidden flex-col text-left text-xs font-medium leading-tight sm:flex">
                <span>Alex Morgan</span>
                <span className="text-white/70">Operations</span>
              </div>
              <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white/50">
                <Image src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=96&auto=format&fit=facearea&facepad=3" alt="Profile" fill sizes="40px" className="object-cover" />
              </div>
            </div>
          </div>

          <ThemeToggle className="sm:hidden" />
        </div>
      </div>
    </header>
  );
}
