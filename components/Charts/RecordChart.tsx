"use client";

import { useChartContext } from "@/contexts/ChartContext";

import DateChart from "@/components/Charts/DateChart";
import CategoryChart from "@/components/Charts/CategoryChart";
import ChartHeading from "@/components/Charts/ChartHeading";
import ChartFilters from "@/components/Charts/ChartFilters";

const ActiveChart = () => {
  const { records, chartType, threshold } = useChartContext();
  if (!records || records.length === 0) return <div>No records</div>;
  if (chartType === "Date") return <DateChart records={records} threshold={threshold} />;
  if (chartType === "Category") return <CategoryChart records={records} />;
  return <div className="error">Error</div>;
};

const RecordChart = () => {
  return (
    <div className="card sm:card-lg bg-neutral">
      <div className="card-body space-y-12">
        <ChartHeading />
        <ActiveChart />
        <ChartFilters />
      </div>
    </div>
  );
};

export default RecordChart;
