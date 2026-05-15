"use client";

import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  income: { label: "Income", color: "#bfdbfe" },
};

type Props = {
  data: { month: string; income: number }[];
};

export function IncomesChart({ data }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full">
      <h2 className="text-base font-bold text-gray-900 mb-4">Income</h2>

      <ChartContainer config={chartConfig} className="w-full h-80">
        <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="#f0f0f0" />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#6b7280", fontSize: 13 }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#6b7280", fontSize: 13 }}
            tickFormatter={(v) => `$${v.toLocaleString("en-US")}`}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar
            dataKey="income"
            fill="var(--color-income)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}