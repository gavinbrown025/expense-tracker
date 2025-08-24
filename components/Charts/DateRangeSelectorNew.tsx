"use client";

import { useChartContext } from "@/contexts/ChartContext";

import { subDays, startOfMonth, endOfMonth, format, addDays } from "date-fns";
import { useEffect, useState } from "react";

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
  const { filters, setFilters } = useChartContext();
  const today = new Date();
  // Set initial selectedPreset based on filters.label
  const initialPreset = filters.label
    ? presets.find((p) => p.label === filters.label) || null
    : presets[1];
  const [selectedPreset, setSelectedPreset] = useState<Preset | null>(initialPreset);

  useEffect(() => {
    // Update selectedPreset if filters.label changes
    if (filters.label) {
      const preset = presets.find((p) => p.label === filters.label);
      setSelectedPreset(preset || null);
    }
  }, [filters.label]);

  const handlePresetSelect = (preset: Preset) => {
    setSelectedPreset(preset);
    const { start, end } = preset.getRange(today);
    setFilters({ startDate: start, endDate: end, label: preset.label });
    localStorage.setItem(
      "dateRange",
      JSON.stringify({ label: preset.label, start: start.toISOString(), end: end.toISOString() })
    );
  };

  const handleCustomChange = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    setSelectedPreset(null);
    setFilters({ startDate, endDate, label: "Custom" });
    localStorage.setItem(
      "dateRange",
      JSON.stringify({ label: "Custom", start: startDate.toISOString(), end: endDate.toISOString() })
    );
  };

  return (
    <>
      {/* Preset buttons */}
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-neutral btn-sm border-neutral-content/50 shadow-md whitespace-nowrap"
        >
          {selectedPreset ? selectedPreset.label : "Custom"}
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-1 w-min py-2 px-0 shadow-sm"
        >
          {presets.map((preset) => (
            <li
              key={preset.value}
              className={`text-xs whitespace-nowrap py-1 px-2 cursor-pointer hover:bg-neutral/50 ${
                selectedPreset?.value === preset.value
                  ? "bg-base-300 font-semibold"
                  : ""
              }`}
              onClick={() => handlePresetSelect(preset)}
            >
              {preset.label}
            </li>
          ))}
        </ul>
      </div>

      {/* Manual date inputs */}
      <div>
        <label className="input input-xs w-36 px-2">
          <div className="min-w-[22px] text-center text-neutral-content/60">
            Start
          </div>
          <input
            className="pl-2 border-l border-l-neutral-content/20"
            type="date"
            value={filters.startDate ? format(filters.startDate, "yyyy-MM-dd") : ""}
            max={filters.endDate ? format(filters.endDate, "yyyy-MM-dd") : ""}
            onChange={(e) =>
              handleCustomChange(
                e.target.value,
                filters.endDate ? format(filters.endDate, "yyyy-MM-dd") : ""
              )
            }
          />
        </label>
        <label className="input input-xs w-36 px-2">
          <div className="min-w-[22px] text-center text-neutral-content/60">
            End
          </div>
          <input
            className="pl-2 border-l border-l-neutral-content/20"
            type="date"
            value={filters.endDate ? format(filters.endDate, "yyyy-MM-dd") : ""}
            min={filters.startDate ? format(filters.startDate, "yyyy-MM-dd") : ""}
            onChange={(e) =>
              handleCustomChange(
                filters.startDate ? format(filters.startDate, "yyyy-MM-dd") : "",
                e.target.value
              )
            }
          />
        </label>
      </div>
    </>
  );
};

export default DateRangeSelector;
