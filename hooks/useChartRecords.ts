import { useEffect, useState } from "react";
import getRecords from "@/app/actions/getRecords";
import { Record } from "@/types/Record";
import { StoredDateRange } from "@/types/Chart";

export function useChartRecords(dateRange: StoredDateRange) {
  const [records, setRecords] = useState<Record[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      setLoading(true);
      try {
        const { records, error } = await getRecords({
          start: new Date(dateRange.start),
          end: new Date(dateRange.end),
        });
        if (error) setError(error);
        else setRecords(records ?? []);
      } catch {
        setError("Failed to fetch records");
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, [dateRange]);

  return { records, error, loading };
}
