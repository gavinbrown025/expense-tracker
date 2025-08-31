"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import { Record } from "@/types/Record";
import { ChartType, StoredDateRange, ChartStats } from "@/types/Chart";

import { useChartFilters } from "@/hooks/useChartFilters";
import { useChartRecords } from "@/hooks/useChartRecords";
import { useRecordStats } from "@/hooks/useRecordStats";

type ChartContextType = {
  records: Record[];
  isInitialLoad: boolean;
  recordsError: string | null;
  statsError: string | null;
  chartType: ChartType;
  setChartType: React.Dispatch<React.SetStateAction<ChartType>>;
  dateRange: StoredDateRange;
  setDateRange: React.Dispatch<React.SetStateAction<StoredDateRange>>;
  threshold: number;
  setThreshold: React.Dispatch<React.SetStateAction<number>>;
  refreshRecords: () => void;
  stats: ChartStats;
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

  // Use the filter hook for all filter state
  const {
    dateRange,
    setDateRange,
    threshold,
    setThreshold,
    chartType,
    setChartType,
  } = useChartFilters();

  const {
    records,
    error: recordsError,
    loading: recordsLoading,
  } = useChartRecords(dateRange);

  const {
    stats,
    error: statsError,
    loading: statsLoading,
  } = useRecordStats(dateRange);

  useEffect(() => {
    if (isInitialLoad && !recordsLoading && !statsLoading) {
      setIsInitialLoad(false);
    }
  }, [isInitialLoad, recordsLoading, statsLoading]);

  const refreshRecords = () => setDateRange((prev) => ({ ...prev }));

  return (
    <ChartContext.Provider
      value={{
        records,
        isInitialLoad,
        recordsError,
        statsError,
        chartType,
        setChartType,
        dateRange,
        setDateRange,
        threshold,
        setThreshold,
        refreshRecords,
        stats,
      }}
    >
      {children}
    </ChartContext.Provider>
  );
};
