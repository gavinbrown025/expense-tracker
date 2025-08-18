"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Record } from "@/types/Record";
import getRecords from "@/app/actions/getRecords";

type ChartType = "Date" | "Category";

interface ChartContextValue {
  records: Record[];
  chartType: ChartType;
  setChartType: (type: ChartType) => void;
  startDate?: Date;
  endDate?: Date;
  setDateRange: (start?: Date, end?: Date, label?: string) => void;
  error: string | null;
  refreshRecords: () => void;
  threshold: number;
  setThreshold: (value: number) => void;
}

const ChartContext = createContext<ChartContextValue | undefined>(undefined);

export const useChartContext = () => {
  const context = useContext(ChartContext);
  if (!context)
    throw new Error("useChartContext must be used within ChartProvider");
  return context;
};

export const ChartProvider = ({ children }: { children: ReactNode }) => {
  const [threshold, setThreshold] = useState(50);
  const [records, setRecords] = useState<Record[]>([]);
  const [chartType, setChartType] = useState<ChartType>("Date");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [error, setError] = useState<string | null>(null);

  const fetchRecords = async (start?: Date, end?: Date) => {
    try {
      const { records, error } = await getRecords({
        startDate: start,
        endDate: end,
      });

      if (error) {
        setError(error);
      } else if (records) {
        setRecords(records);
        setError(null);
        setStartDate(start);
        setEndDate(end);
      }
    } catch {
      setError("Failed to fetch records");
    }
  };

  const refreshRecords = () => fetchRecords(startDate, endDate);

  const setDateRange = (start?: Date, end?: Date, label?: string) => {
    if (start && end) {
      localStorage.setItem(
        "dateRange",
        JSON.stringify({
          label: label || "Custom",
          start: start.toISOString(),
          end: end.toISOString(),
        })
      );
    }
    fetchRecords(start, end);
  };

  const setInitialDateRange = () => {
    const today = new Date();
    let end = today;
    let start = new Date(today);
    start.setDate(today.getDate() - 30);
    let label = "Last 30 days";
    const stored = localStorage.getItem("dateRange");
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
    return { start, end, label };
  };

  useEffect(() => {
    localStorage.setItem("threshold", JSON.stringify(threshold));
  }, [threshold]);

  useEffect(() => {
    const { start, end, label } = setInitialDateRange();
    setDateRange(start, end, label);
  }, []);

  return (
    <ChartContext.Provider
      value={{
        records,
        chartType,
        setChartType,
        startDate,
        endDate,
        setDateRange,
        error,
        refreshRecords,
        threshold,
        setThreshold,
      }}
    >
      {children}
    </ChartContext.Provider>
  );
};
