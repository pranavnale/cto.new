"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

import { Navbar } from "./navbar";
import { Sidebar } from "./sidebar";

type DashboardShellProps = {
  children: React.ReactNode;
  className?: string;
};

export function DashboardShell({ children, className }: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const handleToggleSidebar = React.useCallback(() => {
    setSidebarOpen((open) => !open);
  }, []);

  const handleCloseSidebar = React.useCallback(() => {
    setSidebarOpen(false);
  }, []);

  return (
    <div className="relative flex min-h-screen w-full overflow-hidden bg-transparent">
      <Sidebar isOpen={sidebarOpen} onClose={handleCloseSidebar} />
      <div className="flex min-h-screen flex-1 flex-col lg:pl-72">
        <Navbar onToggleSidebar={handleToggleSidebar} />
        <main className="flex-1">
          <div
            className={cn(
              "mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:py-8",
              "motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500",
              className
            )}
          >
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
