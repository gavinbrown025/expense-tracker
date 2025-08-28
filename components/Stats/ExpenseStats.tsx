import UIIcon from "../UIIcon";
import StatusBadge from "../StatusBadge";

interface ExpenseStatsProps {
  averageExpense: number;
  bestExpense: number;
  worstExpense: number;
  validDays: number;
}

const ExpenseStats = ({
  averageExpense,
  bestExpense,
  worstExpense,
  validDays,
}: ExpenseStatsProps) => {
  const stats = {
    avg: averageExpense.toFixed(2),
    best: bestExpense.toFixed(2),
    worst: worstExpense.toFixed(2),
  };
  const status = validDays > 0 ? "primary" : "warning";
  const badgeText =
    validDays > 1
      ? `${validDays} day${validDays === 1 ? "" : "s"} of data`
      : `No Valid Data`;

  return (
    <div className="stats stats-vertical @xl/card:stats-horizontal gradient-accent/20 shadow">
      <div className="stat place-items-center gradient-base-300/20">
        <UIIcon iconName="money_range" className="text-accent !text-4xl" />
        <div className="stat-title font-bold text-accent text-sm">
          Average Expense
        </div>
        <div className="stat-value">${stats.avg}</div>
        <div className="stat-desc">
          <StatusBadge text={badgeText} status={status} />
        </div>
      </div>

      <div className="stat place-items-center bg-accent/10">
        <UIIcon iconName="trending_down" className="text-primary !text-4xl" />
        <div className="stat-title">Lowest</div>
        <div className="stat-value">${stats.worst}</div>
        <div className="stat-desc">↗︎ 400 (22%)</div>
      </div>

      <div className="stat place-items-center bg-error/30">
        <UIIcon iconName="trending_up" className="text-error !text-4xl" />
        <div className="stat-title">Highest</div>
        <div className="stat-value">${stats.best}</div>
        <div className="stat-desc">↘︎ 90 (14%)</div>
      </div>
    </div>
  );
};

export default ExpenseStats;
