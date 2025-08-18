// ChartFilters.tsx
import { useChartContext } from "@/contexts/ChartContext";

import DateRangeSelector from "@/components/DateRangeSelector";
import UIIcon from "@/components/UIIcon";
import { useEffect } from "react";

export default function ChartFilters() {
  const { chartType, setChartType, threshold, setThreshold } =
    useChartContext();

  const getInitialThreshold = () => {
    const stored = localStorage.getItem("threshold");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {}
    }
    return 50;
  };
  useEffect(() => {
    const initialThreshold = getInitialThreshold();
    setThreshold(initialThreshold);
  }, []);

  return (
    <div className="flex items-center gap-4">
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-neutral btn-sm border-neutral-content/50 shadow-md whitespace-nowrap"
        >
          {chartType} <UIIcon iconName="chart_data" />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-1 w-min py-2 px-0 shadow-sm"
        >
          <li
            onClick={() => setChartType("Date")}
            className={`text-xs whitespace-nowrap py-1 px-2 cursor-pointer hover:bg-neutral/50 ${
              chartType === "Date" ? "bg-base-300 font-semibold" : ""
            }`}
          >
            Date
          </li>
          <li
            onClick={() => setChartType("Category")}
            className={`text-xs whitespace-nowrap py-1 px-2 cursor-pointer hover:bg-neutral/50 ${
              chartType === "Category" ? "bg-base-300 font-semibold" : ""
            }`}
          >
            Category
          </li>
        </ul>
      </div>

      {/* Threshold Selector */}
      <label className="input input-xs w-min" htmlFor="threshold">
        <div className="text-neutral-content/60">Target Spend</div>
        <input
          className="w-12 pl-2 border-l border-l-neutral-content/20"
          id="threshold"
          type="number"
          value={threshold}
          onChange={(e) => setThreshold(Number(e.target.value))}
        />
      </label>
      {/* DateRangeSelector */}
      <DateRangeSelector />
    </div>
  );
}
