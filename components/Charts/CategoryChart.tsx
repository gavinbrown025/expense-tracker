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
import { DEFAULT_CATEGORIES } from "@/types/Categories";

const aggregateByCategory = (records: Record[]) => {
  const categoryTotals: { [key: string]: number } = {};
  DEFAULT_CATEGORIES.forEach((cat) => {
    categoryTotals[cat] = 0;
  });
  records.forEach((record) => {
    if (categoryTotals.hasOwnProperty(record.category)) {
      categoryTotals[record.category] += record.amount;
    }
  });
  return DEFAULT_CATEGORIES.map((category) => ({
    category,
    total: categoryTotals[category],
  }));
};

const ExpenseSpiderChart = ({ records }: { records: Record[] }) => {
  const data = aggregateByCategory(records);

  return (
    <div className="aspect-4/3">
      <ResponsiveContainer width="100%" height="100%">
          <RadarChart
            data={data}
            outerRadius="90%"
          >
          <PolarGrid stroke="var(--color-base-content)" opacity={0.2} />
          <PolarAngleAxis
            dataKey="category"
            tick={{
              fill: "var(--color-neutral-content)",
              fontSize: "var(--text-xs)",
            }}
          />
          <PolarRadiusAxis
            tick={{
              fill: "var(--color-neutral-content)",
              dx: 4,
              dy: 8,
              fontSize: "var(--text-xs)",
            }}
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
