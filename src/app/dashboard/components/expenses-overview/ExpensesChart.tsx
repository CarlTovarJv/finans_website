"use client";

import { Bar, BarChart, XAxis, YAxis, Cell } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const COLORS = ["#000c44", "#204d81", "#406b8d", "#8b8dc4", "#c0c2e0"];
const chartConfig = { amount: { label: "Amount" } };
const fmt = (n: number) => "$" + n.toLocaleString("en-US");

type Props = {
  data: { category: string; amount: number }[];
};

export function ExpensesChart({ data }: Props) {
  const total = data.reduce((sum, e) => sum + e.amount, 0);

  const dataWithPct = data.map(d => ({
    ...d,
    pct: total > 0 ? Math.round((d.amount / total) * 100) : 0,
  }));

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-5xl">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Expenses Details</h2>

      <ChartContainer config={chartConfig} className="w-full" style={{ height: `${data.length * 52}px` }}>
        <BarChart
          data={dataWithPct}
          layout="vertical"
          margin={{ left: 100, right: 70, top: 4, bottom: 4 }}
        >
          <XAxis type="number" domain={[0, 100]} hide />
          <YAxis
            type="category"
            dataKey="category"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 13, fill: "#4b5563" }}
            width={95}
          />
          <ChartTooltip
            content={<ChartTooltipContent />}
            formatter={(value) => [`${value}%`, "Porcentaje"]}
            cursor={{ fill: "transparent" }}
          />
          <Bar dataKey="pct" radius={[0, 4, 4, 0]} label={{
            position: "insideRight",
            formatter: (v: unknown) => `${v}%`,
            fontSize: 11,
            fill: "#fff",
            fontWeight: 600,
          }}>
            {dataWithPct.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>

      {/* Montos y total */}
      <div className="mt-3 border-t border-gray-100 pt-2">
        {dataWithPct.map((item, i) => (
          <div key={i} className="flex items-center justify-between py-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
              <span className="text-sm text-gray-600">{item.category}</span>
            </div>
            <span className="text-sm font-medium text-gray-900">{fmt(item.amount)}</span>
          </div>
        ))}
        <div className="flex justify-between pt-2 mt-1 border-t border-gray-100">
          <span className="text-sm font-semibold text-gray-900">Total</span>
          <span className="text-sm font-semibold text-gray-900">{fmt(total)}</span>
        </div>
      </div>
    </div>
  );
}