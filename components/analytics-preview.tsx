"use client";

import { motion } from "framer-motion";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const data = [
  { name: "Mon", value: 24 },
  { name: "Tue", value: 30 },
  { name: "Wed", value: 28 },
  { name: "Thu", value: 34 },
  { name: "Fri", value: 36 },
  { name: "Sat", value: 32 },
  { name: "Sun", value: 40 }
];

export function AnalyticsPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="h-56 w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" />
          <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} dy={8} tickLine={false} />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} dx={-8} width={32} tickLine={false} />
          <Tooltip
            cursor={{ stroke: "hsl(var(--primary))" }}
            contentStyle={{
              backgroundColor: "hsl(var(--popover))",
              color: "hsl(var(--popover-foreground))",
              borderRadius: "0.75rem",
              border: "1px solid hsl(var(--border))"
            }}
          />
          <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
