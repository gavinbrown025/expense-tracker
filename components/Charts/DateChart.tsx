"use client";

import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { format, compareAsc, isValid } from "date-fns";

// Define the type for a record
interface Record {
  date: string; // ISO date string
  amount: number; // Amount spent
  category: string; // Expense category
}

const aggregateByDate = (records: Record[]) => {
  const dateMap = new Map<
    string,
    { total: number; categories: string[]; originalDate: string }
  >();

  records.forEach((record) => {
    const dateObj = new Date(record.date);

    if (!isValid(dateObj)) {
      console.warn("Invalid date:", record.date);
      return;
    }

    const dateKey = format(dateObj, "yyyy-MM-dd");
    const existing = dateMap.get(dateKey);

    if (existing) {
      existing.total += record.amount;
      if (!existing.categories.includes(record.category)) {
        existing.categories.push(record.category);
      }
    } else {
      dateMap.set(dateKey, {
        total: record.amount,
        categories: [record.category],
        originalDate: record.date,
      });
    }
  });

  return Array.from(dateMap.entries())
    .map(([date, data]) => ({
      date,
      amount: data.total,
      categories: data.categories,
      originalDate: data.originalDate,
    }))
    .sort((a, b) =>
      compareAsc(new Date(a.originalDate), new Date(b.originalDate))
    );
};

const formatChartDate = (value: string) => {
  const d = new Date(value);
  return isValid(d) ? format(d, "MMM dd") : value;
};

const ExpenseChart = ({ records }: { records: Record[] }) => {
  const data = aggregateByDate(records);

  // Set the split line of the chart
  const [threshold, setThreshold] = useState(50);

  const gradientOffset = (threshold: number) => {
    const dataMax = Math.max(...data.map((i) => i.amount));
    const dataMin = Math.min(...data.map((i) => i.amount));
    if (dataMax <= threshold) return 0;
    if (dataMin >= threshold) return 1;
    return (dataMax - threshold) / (dataMax - dataMin);
  };
  const off = gradientOffset(threshold);

  return (
    <div className="aspect-4/3">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 0,
            right: 24,
            left: -16,
            bottom: 16,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--color-base-content)"
            opacity={0.1}
          />
          <XAxis
            tickMargin={16}
            tick={{ fill: "var(--color-neutral-content)" }}
            dataKey="date"
            tickFormatter={formatChartDate}
          />
          <YAxis tick={{ fill: "var(--color-neutral-content)", dx: -4 }} />
          <Tooltip
            wrapperStyle={{
              boxShadow: "var(--shadow-md)",
              background: "var(--color-neutral)",
              color: "var(--base-content)",
              fontSize: "var(--text-xs)"
            }}
            contentStyle={{ background: "var(--color-neutral)" }}
            itemStyle={{
              color: "inherit",
              textTransform: "capitalize",
              fontWeight: "600",
            }}
          />
          <defs>
            <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset={off}
                stopColor="var(--color-error)"
                stopOpacity={0.75}
              />
              <stop
                offset={off}
                stopColor="var(--color-accent)"
                stopOpacity={0.75}
              />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#ffffff35"
            fill="url(#splitColor)"
            baseValue={threshold}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseChart;
