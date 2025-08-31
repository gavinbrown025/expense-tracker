import { Stats, ExpenseStatsProps,  } from "@/types/Chart";

import UIIcon from "../UIIcon";
import StatusBadge from "../StatusBadge";

const ExpenseStats = ({
  averageExpense,
  highestExpense,
  lowestExpense,
  validDays,
}: ExpenseStatsProps) => {
  const status = validDays > 0 ? "primary" : "warning";
  const badgeText =
    validDays > 1
      ? `${validDays} day${validDays === 1 ? "" : "s"} of data`
      : `No Valid Data`;

  const stats: Stats = {
    avg: {
      iconName: "money_range",
      label: "Average Expense",
      value: averageExpense.toFixed(2),
      trend: <StatusBadge text={badgeText} status={status} />,
      styles: ["bg-accent/25", "text-accent", "text-accent font-bold text-sm"],
    },
    highest: {
      iconName: "trending_up",
      label: "Highest Expense",
      value: highestExpense.toFixed(2),
      trend: "↗︎ 400 (22%)",
      styles: ["bg-error/25", "text-error", "text-base-content"],
    },
    lowest: {
      iconName: "trending_down",
      label: "Lowest Expense",
      value: lowestExpense.toFixed(2),
      trend: "↘︎ 90 (14%)",
      styles: ["bg-primary/10", "text-primary", "text-base-content"],
    },
  };

  return (
    <div className="stats stats-vertical @md/card:stats-horizontal gradient-accent/20 shadow">
      {Object.entries(stats).map(([key, stat]) => (
        <div key={key} className={`stat place-items-center ${stat.styles[0]} `}>
          {/* <UIIcon
            iconName={stat.iconName}
            className={`${stat.styles[1]} !text-2xl`}
          /> */}
          <div className={`stat-title ${stat.styles[2]}`}>{stat.label}</div>
          <div className="stat-value py-1 @lg/card:text-2xl @xl/card:text-3xl text-xl">
            ${stat.value}
          </div>
          <div className={`stat-desc ${stat.styles[1]}`}>{stat.trend}</div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseStats;
