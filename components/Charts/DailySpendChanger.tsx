import { useChartContext } from "@/contexts/ChartContext";

export default function DailySpendChanger() {
  const { threshold, setThreshold, chartType } = useChartContext();

  return (
      <div className="w-min flex-col justify-stretch">
        <label className="label text-xs" htmlFor="targetSpend">
          Target Spend
        </label>
        <input
          id="targetSpend"
          type="number"
          title="Target Spend"
          placeholder="$"
          value={threshold}
          min={0}
          disabled={chartType !== "Date"}
          className="input input-xs input-bordered"
          onChange={(e) => setThreshold(Number(e.target.value))}
        />
      </div>
  );
}
