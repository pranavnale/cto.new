"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import {
  ArrowDownRight,
  ArrowUpRight,
  DollarSign,
  Download,
  MousePointerClick,
  Percent,
  Settings2,
  Users,
  X
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import type { TooltipProps } from "recharts";
import type { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type DashboardRange = "7d" | "30d" | "90d";
type MetricValueType = "number" | "currency" | "percentage";
type ThemeValue = "light" | "dark" | "system";

type DashboardMetric = {
  id: "users" | "revenue" | "sessions" | "conversion";
  label: string;
  value: number;
  change: number;
  valueType: MetricValueType;
};

type DashboardData = {
  metrics: DashboardMetric[];
  revenueTrend: Array<{ label: string; revenue: number; forecast: number }>;
  acquisition: Array<{ channel: string; current: number; previous: number }>;
  devices: Array<{ name: string; value: number }>;
  meta: {
    updated: string;
    comparison: string;
  };
};

const RANGE_OPTIONS: Array<{ value: DashboardRange; label: string }> = [
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" }
];

type TooltipFormatter = (value: number) => string;

type ExtendedTooltipProps = TooltipProps<ValueType, NameType> & {
  valueFormatter?: TooltipFormatter;
  labelFormatter?: (label: string) => string;
};

const ChartTooltip = ({
  active,
  payload,
  label,
  valueFormatter,
  labelFormatter
}: ExtendedTooltipProps) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const displayLabel = labelFormatter ? labelFormatter(String(label ?? "")) : label;

  return (
    <div className="min-w-[160px] rounded-2xl border border-slate-200 bg-white/90 px-3 py-2 text-xs font-medium text-slate-600 shadow-lg backdrop-blur dark:border-slate-800/80 dark:bg-slate-900/85 dark:text-slate-300">
      {displayLabel ? (
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-100">{displayLabel}</p>
      ) : null}
      <div className="mt-1 space-y-1.5">
        {payload.map((item) => {
          const color = item.color ?? "#6366f1";
          const rawValue = typeof item.value === "number" ? item.value : Number(item.value ?? 0);
          const formattedValue = valueFormatter ? valueFormatter(rawValue) : rawValue.toLocaleString();

          return (
            <div
              key={String(item.dataKey)}
              className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-slate-400 dark:text-slate-500"
            >
              <span className="inline-flex h-2 w-2 flex-none rounded-full" style={{ backgroundColor: color }} />
              <span className="flex-1 text-[11px] font-medium text-slate-600 dark:text-slate-300">
                {item.name ?? item.dataKey}
              </span>
              <span className="font-semibold text-slate-900 dark:text-white">{formattedValue}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const DASHBOARD_DATA: Record<DashboardRange, DashboardData> = {
  "7d": {
    metrics: [
      { id: "users", label: "Total Users", value: 12482, change: 5.8, valueType: "number" },
      { id: "revenue", label: "Revenue", value: 328000, change: 8.4, valueType: "currency" },
      { id: "sessions", label: "Sessions", value: 98210, change: 2.1, valueType: "number" },
      { id: "conversion", label: "Conversion Rate", value: 3.62, change: 0.7, valueType: "percentage" }
    ],
    revenueTrend: [
      { label: "Mon", revenue: 42000, forecast: 39500 },
      { label: "Tue", revenue: 46800, forecast: 41000 },
      { label: "Wed", revenue: 51200, forecast: 45500 },
      { label: "Thu", revenue: 49800, forecast: 47000 },
      { label: "Fri", revenue: 56200, forecast: 52000 },
      { label: "Sat", revenue: 48800, forecast: 48000 },
      { label: "Sun", revenue: 52400, forecast: 50500 }
    ],
    acquisition: [
      { channel: "Organic", current: 12400, previous: 11800 },
      { channel: "Paid", current: 9300, previous: 8600 },
      { channel: "Referrals", current: 6200, previous: 5900 },
      { channel: "Partners", current: 4100, previous: 3800 }
    ],
    devices: [
      { name: "Desktop", value: 48 },
      { name: "Mobile", value: 44 },
      { name: "Tablet", value: 8 }
    ],
    meta: {
      updated: "2 minutes ago",
      comparison: "previous period"
    }
  },
  "30d": {
    metrics: [
      { id: "users", label: "Total Users", value: 48230, change: 4.2, valueType: "number" },
      { id: "revenue", label: "Revenue", value: 1286000, change: 6.3, valueType: "currency" },
      { id: "sessions", label: "Sessions", value: 378420, change: -3.1, valueType: "number" },
      { id: "conversion", label: "Conversion Rate", value: 3.44, change: 0.4, valueType: "percentage" }
    ],
    revenueTrend: [
      { label: "Week 1", revenue: 286000, forecast: 274000 },
      { label: "Week 2", revenue: 301500, forecast: 289000 },
      { label: "Week 3", revenue: 312400, forecast: 297500 },
      { label: "Week 4", revenue: 328600, forecast: 315000 }
    ],
    acquisition: [
      { channel: "Organic", current: 48600, previous: 46200 },
      { channel: "Paid", current: 35100, previous: 33800 },
      { channel: "Referrals", current: 21800, previous: 20200 },
      { channel: "Partners", current: 16500, previous: 15100 }
    ],
    devices: [
      { name: "Desktop", value: 47 },
      { name: "Mobile", value: 46 },
      { name: "Tablet", value: 7 }
    ],
    meta: {
      updated: "12 minutes ago",
      comparison: "prior 30 days"
    }
  },
  "90d": {
    metrics: [
      { id: "users", label: "Total Users", value: 141200, change: 7.6, valueType: "number" },
      { id: "revenue", label: "Revenue", value: 3842000, change: 11.2, valueType: "currency" },
      { id: "sessions", label: "Sessions", value: 1146800, change: 1.8, valueType: "number" },
      { id: "conversion", label: "Conversion Rate", value: 3.58, change: 0.9, valueType: "percentage" }
    ],
    revenueTrend: [
      { label: "Aug", revenue: 1264000, forecast: 1228000 },
      { label: "Sep", revenue: 1279000, forecast: 1251000 },
      { label: "Oct", revenue: 1309000, forecast: 1283000 }
    ],
    acquisition: [
      { channel: "Organic", current: 146200, previous: 140400 },
      { channel: "Paid", current: 98200, previous: 91200 },
      { channel: "Referrals", current: 68400, previous: 65400 },
      { channel: "Partners", current: 52400, previous: 49200 }
    ],
    devices: [
      { name: "Desktop", value: 45 },
      { name: "Mobile", value: 49 },
      { name: "Tablet", value: 6 }
    ],
    meta: {
      updated: "34 minutes ago",
      comparison: "prior 90 days"
    }
  }
};

const KPI_ICONS: Record<DashboardMetric["id"], React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  users: Users,
  revenue: DollarSign,
  sessions: MousePointerClick,
  conversion: Percent
};

const numberFormatter = new Intl.NumberFormat("en-US");
const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});
const percentFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

const PIE_COLORS = ["#4f46e5", "#0ea5e9", "#f97316"];

function formatPercentage(value: number) {
  return `${value.toFixed(1)}%`;
}

function formatCompactCurrency(value: number) {
  if (value >= 1_000_000) {
    return "$" + (value / 1_000_000).toFixed(1) + "M";
  }
  if (value >= 1_000) {
    return "$" + (value / 1_000).toFixed(0) + "k";
  }
  return "$" + value.toFixed(0);
}

const renderCurrencyTooltip: TooltipProps<ValueType, NameType>["content"] = (props) => (
  <ChartTooltip {...props} valueFormatter={(value) => currencyFormatter.format(Number(value))} />
);

const renderNumberTooltip: TooltipProps<ValueType, NameType>["content"] = (props) => (
  <ChartTooltip {...props} valueFormatter={(value) => numberFormatter.format(Number(value))} />
);

const renderPercentTooltip: TooltipProps<ValueType, NameType>["content"] = (props) => (
  <ChartTooltip {...props} valueFormatter={(value) => formatPercentage(Number(value))} />
);

export default function DashboardPage() {
  const [activeRange, setActiveRange] = React.useState<DashboardRange>("7d");
  const [isDownloading, setIsDownloading] = React.useState(false);
  const downloadTimerRef = React.useRef<ReturnType<typeof setTimeout>>();
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [autoRefresh, setAutoRefresh] = React.useState(true);
  const [proactiveAlerts, setProactiveAlerts] = React.useState(true);
  const [mounted, setMounted] = React.useState(false);
  const [selectedTheme, setSelectedTheme] = React.useState<ThemeValue>("system");

  const { theme, setTheme, resolvedTheme } = useTheme();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!mounted) {
      return;
    }
    const nextTheme = (theme ?? "system") as ThemeValue;
    setSelectedTheme(nextTheme);
  }, [theme, mounted]);

  React.useEffect(() => {
    if (!settingsOpen) {
      return;
    }

    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSettingsOpen(false);
      }
    };

    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [settingsOpen]);

  React.useEffect(() => {
    return () => {
      if (downloadTimerRef.current) {
        clearTimeout(downloadTimerRef.current);
      }
    };
  }, []);

  const dashboardData = DASHBOARD_DATA[activeRange];
  const revenueMetric = dashboardData.metrics.find((metric) => metric.id === "revenue");
  const revenueChange = revenueMetric?.change ?? 0;
  const revenueChangeLabel = `${revenueChange >= 0 ? "+" : "-"}${formatPercentage(Math.abs(revenueChange))}`;
  const themePreference = (!mounted ? "system" : (theme ?? "system")) as ThemeValue;
  const resolvedCurrentTheme = !mounted
    ? "system"
    : themePreference === "system"
      ? ((resolvedTheme as ThemeValue | undefined) ?? "system")
      : themePreference;

  const handleDownload = React.useCallback(() => {
    if (isDownloading) {
      return;
    }
    setIsDownloading(true);
    downloadTimerRef.current = setTimeout(() => {
      setIsDownloading(false);
    }, 1400);
  }, [isDownloading]);

  const handleThemeChange = React.useCallback(
    (value: ThemeValue) => {
      setSelectedTheme(value);
      setTheme(value);
    },
    [setTheme]
  );

  return (
    <div className="space-y-10">
      <section className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400">
          PulseMetrics
        </p>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <motion.h1
              className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              Command Center Overview
            </motion.h1>
            <motion.p
              className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
            >
              Explore live revenue movements, acquisition health, and engagement signals across your footprint.
            </motion.p>
          </div>
          <motion.div
            className="flex flex-wrap items-center gap-2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4, ease: "easeOut" }}
          >
            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-900/30 transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/50 focus-visible:ring-offset-2 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
            >
              <Download className={cn("h-4 w-4", isDownloading && "animate-spin")} />
              {isDownloading ? "Preparing..." : "Download report"}
            </button>
            <button
              type="button"
              onClick={() => setSettingsOpen(true)}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200/80 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-brand-300 hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:border-slate-800/70 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:border-brand-300 dark:hover:text-brand-200"
            >
              <Settings2 className="h-4 w-4" />
              Dashboard settings
            </button>
          </motion.div>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white/70 p-1 text-sm font-medium shadow-sm dark:border-slate-800/70 dark:bg-slate-950/60">
            {RANGE_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setActiveRange(option.value)}
                className={cn(
                  "relative rounded-full px-4 py-2 transition-all duration-200",
                  activeRange === option.value
                    ? "bg-slate-900 text-white shadow-sm shadow-slate-900/30 dark:bg-white dark:text-slate-900 dark:shadow-slate-900/40"
                    : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">
            Synced {dashboardData.meta.updated}
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeRange}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4"
          >
            {dashboardData.metrics.map((metric, index) => {
              const Icon = KPI_ICONS[metric.id];
              const isPositive = metric.change >= 0;
              const changeColor = isPositive ? "text-emerald-500" : "text-rose-500";
              const changeIcon = isPositive ? ArrowUpRight : ArrowDownRight;

              return (
                <motion.div
                  key={metric.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index, duration: 0.35, ease: "easeOut" }}
                  whileHover={{ y: -4 }}
                >
                  <Card className="h-full">
                    <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
                      <div className="space-y-1.5">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">
                          {metric.label}
                        </p>
                        <CardDescription>Track performance vs {dashboardData.meta.comparison}</CardDescription>
                      </div>
                      <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/40 bg-white/70 text-slate-600 shadow-inner dark:border-white/5 dark:bg-slate-900/70 dark:text-white">
                        <Icon className="h-5 w-5" />
                      </span>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <motion.p
                        key={`${activeRange}-${metric.id}-value`}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="text-3xl font-semibold text-slate-900 dark:text-white"
                      >
                        {metric.valueType === "percentage"
                          ? `${percentFormatter.format(metric.value)}%`
                          : metric.valueType === "currency"
                          ? currencyFormatter.format(metric.value)
                          : numberFormatter.format(metric.value)}
                      </motion.p>
                      <p className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                        <span className={cn("inline-flex items-center gap-1", changeColor)}>
                          {React.createElement(changeIcon, { className: "h-4 w-4" })}
                          {formatPercentage(Math.abs(metric.change))}
                        </span>
                        vs {dashboardData.meta.comparison}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </section>

      <section className="grid gap-6 xl:grid-cols-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={`revenue-${activeRange}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="xl:col-span-7"
          >
            <Card className="h-full">
              <CardHeader className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Revenue Trend</CardTitle>
                  <CardDescription>Actual vs forecasted revenue movement</CardDescription>
                </div>
                <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-500">
                  {revenueChangeLabel} vs baseline
                </span>
              </CardHeader>
              <CardContent>
                <div className="h-[280px] w-full">
                  <ResponsiveContainer>
                    <LineChart data={dashboardData.revenueTrend} margin={{ left: 12, right: 12, top: 12, bottom: 12 }}>
                      <CartesianGrid strokeDasharray="4 4" stroke="rgba(148, 163, 184, 0.25)" />
                      <XAxis dataKey="label" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
                      <YAxis
                        tick={{ fill: "#64748b", fontSize: 12 }}
                        tickFormatter={(value) => formatCompactCurrency(Number(value))}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip
                        cursor={{ strokeDasharray: "4 4", stroke: "rgba(99,102,241,0.35)" }}
                        content={renderCurrencyTooltip}
                      />
                      <Line
                        type="monotone"
                        dataKey="forecast"
                        stroke="rgba(148, 163, 184, 0.6)"
                        strokeDasharray="6 6"
                        strokeWidth={2}
                        dot={false}
                        name="Forecast"
                      />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#6366f1"
                        strokeWidth={3}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                        name="Revenue"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={`acquisition-${activeRange}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="xl:col-span-5"
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Acquisition Channels</CardTitle>
                <CardDescription>Channel performance comparison</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[280px] w-full">
                  <ResponsiveContainer>
                    <BarChart data={dashboardData.acquisition} margin={{ left: 4, right: 16, top: 12, bottom: 12 }}>
                      <CartesianGrid strokeDasharray="4 4" stroke="rgba(148, 163, 184, 0.25)" vertical={false} />
                      <XAxis dataKey="channel" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
                      <YAxis
                        tick={{ fill: "#64748b", fontSize: 12 }}
                        tickFormatter={(value) => `${Math.round(Number(value) / 1000)}k`}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip
                        cursor={{ fill: "rgba(99,102,241,0.08)" }}
                        content={renderNumberTooltip}
                      />
                      <Legend
                        verticalAlign="top"
                        align="left"
                        iconType="circle"
                        wrapperStyle={{ paddingBottom: 12, fontSize: 12, color: "#64748b" }}
                      />
                      <Bar dataKey="current" name="Current" radius={[10, 10, 10, 10]} fill="#6366f1" barSize={16} />
                      <Bar dataKey="previous" name="Previous" radius={[10, 10, 10, 10]} fill="#c7d2fe" barSize={16} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </section>

      <AnimatePresence mode="wait">
        <motion.div
          key={`devices-${activeRange}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Card>
            <CardHeader className="flex flex-col space-y-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <CardTitle>Device Engagement</CardTitle>
                <CardDescription>Traffic split by device family</CardDescription>
              </div>
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">
                {mounted ? `${resolvedCurrentTheme === "dark" ? "Dark mode" : "Light mode"} theme active` : "Detecting theme"}
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 lg:grid-cols-[1.4fr_minmax(0,1fr)]">
                <div className="h-[260px]">
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={dashboardData.devices}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={70}
                        outerRadius={110}
                        stroke="none"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${Math.round(percent * 100)}%`}
                      >
                        {dashboardData.devices.map((entry, index) => (
                          <Cell key={`${entry.name}-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip content={renderPercentTooltip} />
                      <Legend
                        verticalAlign="bottom"
                        height={36}
                        iconType="circle"
                        wrapperStyle={{ fontSize: 12, color: "#64748b" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-col justify-center gap-4 text-sm text-slate-600 dark:text-slate-300">
                  {dashboardData.devices.map((device, index) => (
                    <div
                      key={device.name}
                      className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white/70 px-4 py-3 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/70"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="inline-flex h-8 w-8 flex-none items-center justify-center rounded-full text-xs font-semibold text-white"
                          style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }}
                        >
                          {device.name.charAt(0)}
                        </span>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-slate-800 dark:text-white">{device.name}</span>
                          <span className="text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                            Share of sessions
                          </span>
                        </div>
                      </div>
                      <span className="text-base font-semibold text-slate-900 dark:text-white">
                        {formatPercentage(device.value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {settingsOpen ? (
          <motion.div
            key="settings-modal"
            className="fixed inset-0 z-50 grid place-items-center bg-slate-950/60 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSettingsOpen(false)}
          >
            <motion.div
              className="w-full max-w-md space-y-6 rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-2xl shadow-slate-950/20 dark:border-slate-800/70 dark:bg-slate-950/90"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Dashboard preferences</h2>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Personalize your workspace theme and automation routines.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSettingsOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/80 text-slate-500 transition hover:text-slate-800 dark:border-slate-800/70 dark:text-slate-300 dark:hover:text-white"
                  aria-label="Close settings"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">
                    Theme
                  </p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-3">
                    {(["light", "dark", "system"] as ThemeValue[]).map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => handleThemeChange(value)}
                        className={cn(
                          "rounded-2xl border border-slate-200/70 bg-white/80 px-4 py-3 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-brand-300 hover:text-brand-600 dark:border-slate-800/70 dark:bg-slate-900/60 dark:text-slate-300",
                          selectedTheme === value &&
                            "border-brand-400 bg-gradient-to-br from-brand-500/10 via-transparent to-transparent text-brand-600 dark:text-brand-300"
                        )}
                      >
                        {value === "system" ? "System" : value === "dark" ? "Dark" : "Light"}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 text-sm font-semibold text-slate-600 shadow-sm dark:border-slate-800/70 dark:bg-slate-900/70 dark:text-slate-200">
                    <span>Auto-refresh data</span>
                    <input
                      type="checkbox"
                      checked={autoRefresh}
                      onChange={() => setAutoRefresh((prev) => !prev)}
                      className="h-5 w-5 rounded border-slate-300 text-brand-500 focus:ring-brand-500 focus:ring-offset-0 dark:border-slate-700"
                    />
                  </label>
                  <label className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 text-sm font-semibold text-slate-600 shadow-sm dark:border-slate-800/70 dark:bg-slate-900/70 dark:text-slate-200">
                    <span>Proactive alerting</span>
                    <input
                      type="checkbox"
                      checked={proactiveAlerts}
                      onChange={() => setProactiveAlerts((prev) => !prev)}
                      className="h-5 w-5 rounded border-slate-300 text-brand-500 focus:ring-brand-500 focus:ring-offset-0 dark:border-slate-700"
                    />
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-brand-500/10 via-transparent to-transparent px-4 py-3 text-xs text-slate-500 dark:text-slate-400">
                <span>Active theme:</span>
                <span className="font-semibold uppercase tracking-[0.25em] text-brand-600 dark:text-brand-300">
                  {resolvedCurrentTheme}
                </span>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
