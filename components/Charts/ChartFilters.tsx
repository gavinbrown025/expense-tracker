import DateRangeSelector from "@/components/Charts/DateRangeChanger";
import DailySpendChanger from "@/components/Charts/DailySpendChanger";
import { useChartContext } from "@/contexts/ChartContext";

const skeletonLoader = (count = 1) => (
  <>
    {Array.from({ length: count }, (_, i) => (
      <div key={i}>
        <div className="skeleton opacity-50 w-12 h-3 mb-1 rounded-sm"></div>
        <div className="skeleton opacity-50 w-16 h-4 mb-1 rounded-sm"></div>
      </div>
    ))}
  </>
);

export default function ChartFilters() {
  const { isInitialLoad } = useChartContext();
  return (
    <div className="flex justify-between items-center gap-4">
      {isInitialLoad ? skeletonLoader(1) : <DailySpendChanger />}
      {isInitialLoad ? (
        <div className="flex gap-2 w-min">{skeletonLoader(3)}</div>
      ) : (
        <DateRangeSelector />
      )}
    </div>
  );
}
