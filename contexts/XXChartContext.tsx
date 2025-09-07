"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import { getStoredValue, setStoredValue } from "@/lib/storage";
import getRecords from "@/app/actions/getRecords";
import { Record } from "@/types/Record";

import getUserRecord from "@/app/actions/getUserRecord";
import getBestWorstExpense from "@/app/actions/getBestWorstExpense";

type ChartType = "Date" | "Category";
type StoredDateRange = { start: string; end: string; label?: string };

type ChartStats = {
  averageExpense: number;
  highestExpense: number;
  lowestExpense: number;
  validDays: number;
} | null;

type ChartContextType = {
  records: Record[];
  isInitialLoad: boolean;
  error: string | null;
  dateRange: StoredDateRange;
  setDateRange: React.Dispatch<React.SetStateAction<StoredDateRange>>;
  threshold: number;
  setThreshold: React.Dispatch<React.SetStateAction<number>>;
  chartType: ChartType;
  setChartType: React.Dispatch<React.SetStateAction<ChartType>>;
  refreshRecords: () => void;
  stats: ChartStats;
};

const DEFAULT_DATE_RANGE = () => {
  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - 30);
  return {
    start: start.toISOString(),
    end: today.toISOString(),
    label: "Last 30 days",
  };
};

const ChartContext = createContext<ChartContextType | undefined>(undefined);

export const useChartContext = () => {
  const context = useContext(ChartContext);
  if (!context)
    throw new Error("useChartContext must be used within ChartProvider");
  return context;
};

export const ChartProvider = ({ children }: { children: ReactNode }) => {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [records, setRecords] = useState<Record[]>([]);
  const [stats, setStats] = useState<ChartStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load persisted values or defaults
  const [dateRange, setDateRange] = useState<StoredDateRange>(() =>
    getStoredValue<StoredDateRange>("dateRange", DEFAULT_DATE_RANGE())
  );
  const [threshold, setThreshold] = useState<number>(() =>
    getStoredValue<number>("threshold", 50)
  );
  const [chartType, setChartType] = useState<ChartType>(() =>
    getStoredValue<ChartType>("chartType", "Date")
  );

  // On mount, update state from localStorage if available
  useEffect(() => {
    const storedDateRange = getStoredValue<StoredDateRange>(
      "dateRange",
      DEFAULT_DATE_RANGE()
    );
    setDateRange(storedDateRange);

    setThreshold(getStoredValue<number>("threshold", 50));
    setChartType(getStoredValue<ChartType>("chartType", "Date"));
  }, []);

  // Persist state changes
  useEffect(() => setStoredValue("dateRange", dateRange), [dateRange]);
  useEffect(() => setStoredValue("threshold", threshold), [threshold]);
  useEffect(() => setStoredValue("chartType", chartType), [chartType]);

  const fetchStats = async () => {
    try {
      // Fetch both average and range data
      const [userRecordResult, rangeResult] = await Promise.all([
        getUserRecord(),
        getBestWorstExpense(),
      ]);

      const { record, daysWithRecords } = userRecordResult;
      const { highestExpense, lowestExpense } = rangeResult;

      // Calculate average expense
      const validRecord = record || 0;
      const validDays = daysWithRecords || 0;
      const averageExpense = validRecord / validDays;

      setStats({ averageExpense, highestExpense, lowestExpense, validDays });
    } catch (error) {
      console.error("Error fetching expense data:", error);
      return setError("Failed to fetch stats");
    }
  };

  const fetchRecords = async () => {
    try {
      const { records, error } = await getRecords({
        startDate: new Date(dateRange.start),
        endDate: new Date(dateRange.end),
      });
      if (error) setError(error);
      else setRecords(records ?? []);
    } catch {
      setError("Failed to fetch records");
    }
  };

  // Fetch records when dateRange changes
  useEffect(() => {
    if (isInitialLoad) {
      fetchRecords().then(() => fetchStats()).then(() => setIsInitialLoad(false));
    } else {
      fetchRecords();
      fetchStats();
    }
  }, [dateRange]);

  const refreshRecords = () => fetchRecords();

  return (
    <ChartContext.Provider
      value={{
        records,
        error,
        dateRange,
        setDateRange,
        threshold,
        setThreshold,
        chartType,
        setChartType,
        refreshRecords,
        isInitialLoad,
        stats,
      }}
    >
      {children}
    </ChartContext.Provider>
  );
};
