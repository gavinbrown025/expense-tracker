import getUserRecord from "@/app/actions/getUserRecord";
import getBestWorstExpense from "@/app/actions/getBestWorstExpense";

import { useEffect, useState } from "react";
import { StoredDateRange } from "@/types/Chart";
import { ChartStats } from "@/types/Chart";

export function useRecordStats(dateRange: StoredDateRange) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [stats, setStats] = useState<ChartStats>(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const start = new Date(dateRange.start);
        const end = new Date(dateRange.end);
        // Fetch both average and range data
        const [userRecordResult, rangeResult] = await Promise.all([
          getUserRecord({ start, end }),
          getBestWorstExpense({ start, end }),
        ]);

        const { record, daysWithRecords } = userRecordResult;
        const { highestExpense, lowestExpense } = rangeResult;

        // Calculate average expense
        const validRecord = record || 0;
        const validDays = daysWithRecords || 0;
        const averageExpense = validRecord / (validDays || 1);

        setStats({
          averageExpense: averageExpense || 0,
          highestExpense: highestExpense || 0,
          lowestExpense: lowestExpense || 0,
          validDays,
        });
      } catch (error) {
        console.error("Error fetching expense data:", error);
        return setError("Failed to fetch stats");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [dateRange]);

  return { stats, error, loading };
}
