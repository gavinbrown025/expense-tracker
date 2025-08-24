"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import { Record } from "@/types/Record";
import getRecords from "@/app/actions/getRecords";

type ChartType = "Date" | "Category";

interface ChartContextValue {
  records: Record[];
  chartType: ChartType;
  error: string | null;
  setChartType: (type: ChartType) => void;
  filters: {
    startDate?: Date;
    endDate?: Date;
    threshold: number;
    label?: string;
  };
  setFilters: (
    filters: Partial<{
      startDate?: Date;
      endDate?: Date;
      threshold: number;
      label?: string;
    }>
  ) => void;
}

// Utility to get initial date range from localStorage or default
function getInitialDateRange() {
  const today = new Date();
  let end = today;
  let start = new Date(today);
  start.setDate(today.getDate() - 30);
  let label = "Last 30 days";
  if (typeof window !== "undefined") {
    const stored = window.localStorage.getItem("dateRange");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.start && parsed.end) {
          start = new Date(parsed.start);
          end = new Date(parsed.end);
          label = parsed.label || "Custom";
        }
      } catch {}
    }
  }
  return { start, end, label };
}

const ChartContext = createContext<ChartContextValue | undefined>(undefined);

export const useChartContext = () => {
  const context = useContext(ChartContext);
  if (!context)
    throw new Error("useChartContext must be used within ChartProvider");
  return context;
};

export const ChartProvider = ({ children }: { children: ReactNode }) => {
  const initial = getInitialDateRange();
  const [filters, setFiltersState] = useState({
    startDate: initial.start,
    endDate: initial.end,
    threshold: 50, // default value, will update from localStorage in useEffect
    label: initial.label,
  });
  const [records, setRecords] = useState<Record[]>([]);
  const [chartType, setChartType] = useState<ChartType>("Date");
  const [error, setError] = useState<string | null>(null);

  // On mount, update threshold from localStorage if available
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem("threshold");
      if (stored) {
        setFiltersState((prev) => ({ ...prev, threshold: Number(stored) }));
      }
    }
  }, []);

  // Fetch records automatically when filters change
  useEffect(() => {
    (async () => {
      try {
        const { records, error } = await getRecords({
          startDate: filters.startDate,
          endDate: filters.endDate,
        });
        if (error) {
          setError(error);
        } else if (records) {
          setRecords(records);
          setError(null);
        }
      } catch {
        setError("Failed to fetch records");
      }
    })();
  }, [filters.startDate, filters.endDate]);

  // Persist threshold to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        "threshold",
        JSON.stringify(filters.threshold)
      );
    }
  }, [filters.threshold]);

  // Setter for filters (partial update)
  const setFilters = useCallback((newFilters: Partial<typeof filters>) => {
    setFiltersState((prev) => ({ ...prev, ...newFilters }));
  }, []);

  const contextValue = useMemo(
    () => ({
      records,
      chartType,
      setChartType,
      filters,
      setFilters,
      error,
    }),
    [records, chartType, filters, setChartType, setFilters, error]
  );

  return (
    <ChartContext.Provider value={contextValue}>
      {children}
    </ChartContext.Provider>
  );
};
