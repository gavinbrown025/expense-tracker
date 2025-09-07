"use client";

import ExpenseItem from "./ExpenseItem";
import Card from "@/components/Card";
import type { Record } from "@/types/Record";

import ChartFilters from "../Charts/ChartFilters";
import { useChartContext } from "@/contexts/ChartContext";
import { usePagination } from "../Pagination";

export default function HistoryCard() {
  const { records, isInitialLoad, recordsError } = useChartContext();

  const { displayedItems, PageController } = usePagination(records as Record[]);

  if (recordsError) {
    return <div className="error">{recordsError}</div>;
  }

  return (
    <Card
      title="Expense History"
      iconName="bookmark"
      desc="Your Spending Timeline"
      headingChildren={<PageController />}
    >
      <ChartFilters />

      <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4">
        {isInitialLoad &&
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="skeleton h-32" />
          ))}

        {!isInitialLoad &&
          (displayedItems as Record[]).map((record) => (
            <ExpenseItem key={record.id} expense={record} />
          ))}
      </div>
    </Card>
  );
}
