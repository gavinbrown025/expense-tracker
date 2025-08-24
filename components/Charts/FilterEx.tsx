import React, { useState } from "react";

export default function FilterEx() {
  const [chartType, setChartType] = useState("date");
  const [range, setRange] = useState("last7");
  const [targetSpend, setTargetSpend] = useState(50);
  const [startDate, setStartDate] = useState("2025-07-21");
  const [endDate, setEndDate] = useState("2025-08-20");

  return (
    <div className="border-t border-neutral-content/50 pt-2 w-full flex flex-row flex-wrap justify-between gap-4 mb-4">



      <div className="flex gap-2">
        <div className="w-min flex-col justify-stretch">
          <label className="label text-xs" htmlFor="range">
            Date Range
          </label>
          <select
            id="range"
            className="select select-xs select-bordered w-min"
            value={range}
            onChange={(e) => setRange(e.target.value)}
            title="Date Range"
          >
            <option value="last7">7d</option>
            <option value="last30">30d</option>
            <option value="thisMonth">This Month</option>
            <option value="lastMonth">Last Month</option>
          </select>
        </div>


        <div className="w-min flex-col justify-stretch">
          <label className="label text-xs" htmlFor="startDate">
            Start Date
          </label>
          <input
            id="startDate"
            type="date"
            className="input input-xs input-bordered w-22"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            title="Start Date"
          />
        </div>
        <span className="self-end">-</span>
        <div className="w-min flex-col justify-stretch">
          <label className="label text-xs" htmlFor="endDate">
            End Date
          </label>
          <input
            id="endDate"
            type="date"
            className="input input-xs input-bordered w-22"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            title="End Date"
          />
        </div>
      </div>



      <div className="flex gap-2">
        <div className="w-min flex-col justify-stretch">
          <label className="label text-xs" htmlFor="targetSpend">
            Target Spend
          </label>
          <input
            id="targetSpend"
            type="number"
            disabled={chartType !== "date"}
            className="input input-xs input-bordered"
            value={targetSpend}
            onChange={(e) => setTargetSpend(Number(e.target.value))}
            min={0}
            placeholder="$"
            title="Target Spend"
          />
        </div>
      </div>
    </div>
  );
}
