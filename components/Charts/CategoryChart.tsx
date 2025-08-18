"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Record } from "@/types/Record";

const aggregateByCategory = (records: Record[]) => {
  const categoryMap = new Map<string, number>();

  records.forEach((record) => {
    const existing = categoryMap.get(record.category) || 0;
    categoryMap.set(record.category, existing + record.amount);
  });

  return Array.from(categoryMap.entries()).map(([category, total]) => ({
    category,
    total,
  }));
};

const ExpenseSpiderChart = ({ records }: { records: Record[] }) => {
  const data = aggregateByCategory(records);

  return (
    <div className="aspect-square">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid stroke="var(--color-base-content)" opacity={0.2} />
          <PolarAngleAxis
            dataKey="category"
            tick={{ fill: "var(--color-neutral-content)" }}
          />
          <PolarRadiusAxis
            tick={{ fill: "var(--color-neutral-content)" }}
            angle={90}
            domain={[0, "auto"]}
          />
          <Tooltip
            wrapperStyle={{
              boxShadow: "var(--shadow-md)",
              background: "var(--color-neutral)",
              color: "var(--base-content)",
              fontSize: "var(--text-xs)",
            }}
            contentStyle={{ background: "var(--color-neutral)" }}
            itemStyle={{
              color: "inherit",
              textTransform: "capitalize",
              fontWeight: "600",
            }}
          />
          <Radar
            name="Spending"
            dataKey="total"
            stroke="var(--color-accent)"
            fill="var(--color-accent)"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseSpiderChart;
