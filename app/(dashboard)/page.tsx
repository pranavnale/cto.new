import { Activity, ArrowUpRight, Sparkles, TrendingUp } from "lucide-react";

const kpis = [
  {
    label: "Revenue Run Rate",
    value: "$3.2M",
    change: "+12.4%",
    icon: TrendingUp,
    color: "text-emerald-500"
  },
  {
    label: "Operational Pulse",
    value: "96",
    change: "+4.1",
    icon: Activity,
    color: "text-sky-500"
  },
  {
    label: "AI Insights",
    value: "18 alerts",
    change: "-32%",
    icon: Sparkles,
    color: "text-violet-400"
  }
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400">
          PulseMetrics
        </p>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Command Center Overview
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
              Monitor live performance, anomaly detection, and capacity planning insights across every
              team.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-900/30 transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:shadow-white/30 dark:hover:bg-slate-200">
            Generate report
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {kpis.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} data-glow-card className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.3em] text-slate-400">
                    {item.label}
                  </p>
                  <p className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white">
                    {item.value}
                  </p>
                </div>
                <span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/20 bg-white/40 text-slate-700 shadow-inner shadow-white/40 dark:border-white/5 dark:bg-slate-900/60 dark:text-white">
                  <Icon className="h-5 w-5" />
                </span>
              </div>
              <p className="mt-6 text-sm font-medium text-slate-500 dark:text-slate-400">
                <span className={item.color}>{item.change}</span> vs last sprint
              </p>
            </div>
          );
        })}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div data-glow-card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Real-time Pulse</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Operational signals synthesized from telemetry across teams.
              </p>
            </div>
            <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-500">
              Stable
            </span>
          </div>
          <div className="mt-8 space-y-6">
            {["Latency stabilized", "Deployment sync", "Escalation backlog cleared"].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between rounded-2xl border border-slate-200/70 bg-white/60 px-4 py-3 text-sm font-medium shadow-sm shadow-slate-200/60 transition dark:border-slate-800/60 dark:bg-slate-900/50 dark:shadow-none"
              >
                <span>{item}</span>
                <span className="text-slate-400">Last 15m</span>
              </div>
            ))}
          </div>
        </div>

        <div data-glow-card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Capacity Forecast</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                AI-assisted scenario planning for the next 8 weeks.
              </p>
            </div>
            <span className="rounded-full bg-brand-500/20 px-3 py-1 text-xs font-semibold text-brand-500">
              Updated 2m ago
            </span>
          </div>
          <div className="mt-8 grid gap-4 text-sm text-slate-500 dark:text-slate-400">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Baseline demand</span>
                <span className="font-semibold text-slate-900 dark:text-white">+8.2%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200/80">
                <div className="h-2 w-[62%] rounded-full bg-gradient-to-r from-brand-400 via-brand-500 to-sky-400" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Hiring runway</span>
                <span className="font-semibold text-slate-900 dark:text-white">92%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200/80">
                <div className="h-2 w-[92%] rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-300" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Risk coverage</span>
                <span className="font-semibold text-slate-900 dark:text-white">78%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200/80">
                <div className="h-2 w-[78%] rounded-full bg-gradient-to-r from-rose-400 via-rose-500 to-fuchsia-400" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
