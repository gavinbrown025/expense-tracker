"use client";

import { useChartContext } from "@/contexts/ChartContext";
import { subDays, startOfMonth, endOfMonth, format, addDays } from "date-fns";

type Preset = {
  label: string;
  value: string;
  getRange: (today: Date) => { start: Date; end: Date };
};
const presets: Preset[] = [
  {
    label: "Last 7 days",
    value: "last7",
    getRange: (today) => ({
      start: subDays(today, 7),
      end: today,
    }),
  },
  {
    label: "Last 30 days",
    value: "last30",
    getRange: (today) => ({
      start: subDays(today, 30),
      end: today,
    }),
  },
  {
    label: "This month",
    value: "thisMonth",
    getRange: (today) => ({
      start: startOfMonth(today),
      end: today,
    }),
  },
  {
    label: "Last month",
    value: "lastMonth",
    getRange: (today) => {
      const lastMonthDate = subDays(today, today.getDate());
      return {
        start: startOfMonth(lastMonthDate),
        end: endOfMonth(lastMonthDate),
      };
    },
  },
  {
    label: "Upcoming",
    value: "upcoming",
    getRange: (today) => ({
      start: today,
      end: addDays(today, 30),
    }),
  },
];

const DateRangeSelector = () => {
  const { dateRange, setDateRange } = useChartContext();

  const today = new Date();
  const startDateStr = dateRange.start
    ? format(new Date(dateRange.start), "yyyy-MM-dd")
    : "";
  const endDateStr = dateRange.end
    ? format(new Date(dateRange.end), "yyyy-MM-dd")
    : "";

  const selectedPresetValue =
    presets.find((p) => p.label === dateRange.label)?.value || "custom";

  const handlePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const preset = presets.find((p) => p.value === e.target.value);
    if (preset) {
      const { start, end } = preset.getRange(today);
      setDateRange({
        start: start.toISOString(),
        end: end.toISOString(),
        label: preset.label,
      });
    }
  };

  const handleDateChange =
    (key: "start" | "end") => (e: React.ChangeEvent<HTMLInputElement>) => {
      setDateRange({
        ...dateRange,
        [key]: new Date(e.target.value).toISOString(),
        label: "Custom",
      });
    };

  return (
    <div className="flex gap-2">
      {/* Preset buttons */}
      <div className="w-min flex-col justify-stretch">
        <label className="label text-xs" htmlFor="range">
          Date Range
        </label>
        <select
          id="range"
          className="select select-xs select-bordered w-min"
          value={selectedPresetValue}
          onChange={handlePresetChange}
        >
          {presets.map((preset) => (
            <option
              key={preset.value}
              className="text-xs whitespace-nowrap py-1 px-2 cursor-pointer hover:bg-neutral/50"
              value={preset.value}
            >
              {preset.label}
            </option>
          ))}
          <option value="custom" disabled hidden>
            Custom
          </option>
        </select>
      </div>

      {/* Manual date inputs */}
      <div className="w-min flex-col justify-stretch">
        <label className="label text-xs" htmlFor="startDate">
          Start Date
        </label>
        <input
          id="startDate"
          type="date"
          className="input input-xs input-bordered w-22"
          value={startDateStr}
          onChange={handleDateChange("start")}
          onFocus={(e) => {
            e.target.showPicker();
          }}
        />
      </div>

      <div className="w-min flex-col justify-stretch">
        <label className="label text-xs" htmlFor="endDate">
          End Date
        </label>
        <input
          id="endDate"
          type="date"
          className="input input-xs input-bordered w-22 validator"
          value={endDateStr}
          onChange={handleDateChange("end")}
          onFocus={(e) => {
            e.target.showPicker();
          }}
        />
      </div>
    </div>
  );
};

export default DateRangeSelector;
