import { useState, useEffect } from "react";
import { getStoredValue, setStoredValue } from "@/lib/storage";
import { ChartType, StoredDateRange  } from "@/types/Chart";

const DEFAULT_DATE_RANGE = (): StoredDateRange => {
  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - 30);
  return {
    start: start.toISOString(),
    end: today.toISOString(),
    label: "Last 30 days",
  };
};

export function useChartFilters() {
  const [dateRange, setDateRange] = useState<StoredDateRange>(() =>
    getStoredValue<StoredDateRange>("dateRange", DEFAULT_DATE_RANGE())
  );
  const [threshold, setThreshold] = useState<number>(() =>
    getStoredValue<number>("threshold", 50)
  );
  const [chartType, setChartType] = useState<ChartType>(() =>
    getStoredValue<ChartType>("chartType", "Date")
  );

  // Persist state changes
  useEffect(() => setStoredValue("dateRange", dateRange), [dateRange]);
  useEffect(() => setStoredValue("threshold", threshold), [threshold]);
  useEffect(() => setStoredValue("chartType", chartType), [chartType]);

  return {
    dateRange,
    setDateRange,
    threshold,
    setThreshold,
    chartType,
    setChartType,
  };
}
