import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { PropsWithChildren } from "react";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "PulseMetrics",
  description: "Analytics dashboard scaffolding for PulseMetrics"
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} bg-background font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
import "./globals.css";

import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "PulseMetrics",
    template: "%s | PulseMetrics"
  },
  description:
    "PulseMetrics is an intelligent operations dashboard delivering real-time context into revenue, capacity, and anomaly detection across teams.",
  icons: {
    icon: "/favicon.svg"
  },
  openGraph: {
    title: "PulseMetrics Command Center",
    description:
      "Modern operations intelligence with responsive dashboards, anomaly detection, and planning insights.",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "PulseMetrics Command Center",
    description:
      "Modern operations intelligence with responsive dashboards, anomaly detection, and planning insights."
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-slate-50 text-slate-900 antialiased transition-colors selection:bg-brand-500/20 selection:text-brand-900 dark:bg-slate-950 dark:text-slate-100",
          inter.variable
        )}
      >
        <ThemeProvider>
          <div className="relative flex min-h-screen flex-col">
            <div className="pointer-events-none absolute inset-0 -z-10 opacity-80 mix-blend-screen dark:mix-blend-normal">
              <div className="absolute left-1/2 top-[-20%] h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-brand-500/20 blur-[120px]" />
              <div className="absolute bottom-[-15%] left-[10%] h-[420px] w-[420px] rounded-full bg-cyan-400/20 blur-[140px]" />
              <div className="absolute right-[5%] top-[10%] h-[360px] w-[360px] rounded-full bg-pink-400/25 blur-[120px]" />
            </div>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
