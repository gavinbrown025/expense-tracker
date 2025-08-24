import { useChartContext } from "@/contexts/ChartContext";
type ChartType = "Date" | "Category";

export default function ChartTypeToggle() {
  const { chartType, setChartType } = useChartContext();

  return (
    <div className="w-min flex-col">
      <label className="label text-xs" htmlFor="chartType">
        Chart Type
      </label>
      <select
        id="chartType"
        title="Chart Type"
        value={chartType}
        className="btn btn-neutral btn-xs text-left border-neutral-content/50 shadow-md focus:bg-base-200/25"
        onChange={(e) => setChartType(e.target.value as ChartType)}
      >
        <option value="Date"> Date </option>
        <option value="Category">Category</option>
      </select>
    </div>
  );
}
