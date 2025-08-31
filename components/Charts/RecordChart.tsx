"use client";

import { useChartContext } from "@/contexts/ChartContext";
import { ExpenseStatsProps } from "@/types/Chart";

import DateChart from "@/components/Charts/DateChart";
import CategoryChart from "@/components/Charts/CategoryChart";
import ChartFilters from "@/components/Charts/ChartFilters";
import ChartSelector from "@/components/Charts/ChartSelector";
import Card from "@/components/Card";

import ExpenseStats from "@/components/Stats/ExpenseStats";
import ExpenseError from "@/components/Stats/ExpenseStatsError";

const ActiveChart = () => {
  const { isInitialLoad, recordsError, records, chartType } = useChartContext();
  if (recordsError) return <div className="error">{recordsError}</div>;
  if (isInitialLoad)
    return (
      <div className="skeleton opacity-50 grid place-items-center w-full aspect-4/3">
        <div>
          <span className="loading loading-bars loading-xl mr-4" />
          Loading
        </div>
      </div>
    );

  if (!records || records.length === 0)
    return (
      <div className="grid place-items-center w-full aspect-16/9">
        No Records Available
      </div>
    );
  if (chartType === "Date") return <DateChart records={records} />;
  if (chartType === "Category") return <CategoryChart records={records} />;
  return <div className="error">Error</div>;
};

const ExpenseStatsContainer = () => {
  const { stats, statsError, isInitialLoad } = useChartContext();
  if (statsError) return <ExpenseError />;
  if (isInitialLoad)
    return (
      <div className="skeleton opacity-50 grid place-items-center w-full h-32">
        <div>
          <span className="loading loading-bars loading-xl mr-4" />
          Loading
        </div>
      </div>
    );

  return <ExpenseStats {...stats as ExpenseStatsProps} />;
};

const RecordChart = () => {
  return (
    <Card
      iconName="savings"
      title="Expense Chart"
      desc="Analyze and set your spending goals"
      headingChildren={<ChartSelector />}
    >
      <ChartFilters />
      <ExpenseStatsContainer />
      <ActiveChart />
    </Card>
  );
};

export default RecordChart;
