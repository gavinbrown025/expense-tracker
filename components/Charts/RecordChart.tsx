"use client";

import { useChartContext } from "@/contexts/ChartContext";

import DateChart from "@/components/Charts/DateChart";
import CategoryChart from "@/components/Charts/CategoryChart";
import CardHeading from "@/components/CardHeading";
import ChartFilters from "@/components/Charts/ChartFilters";
import ChartSelector from "./ChartSelector";

const ActiveChart = () => {
  const { isInitialLoad, error, records, chartType } = useChartContext();
  if (error) return <div className="error">{error}</div>;
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

const RecordChart = () => {
  return (
    <div className="card @container/card card-md @lg/card:card-lg bg-neutral">
      <div className="card-body">
        <CardHeading
          iconName="savings"
          title="Expense Chart"
          description="Analyze and set your spending goals"
        >
          <ChartSelector />
        </CardHeading>
        <ChartFilters />
        <ActiveChart />
      </div>
    </div>
  );
};

export default RecordChart;
