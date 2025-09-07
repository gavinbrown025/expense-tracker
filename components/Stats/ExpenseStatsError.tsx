import UIIcon from "@/components/UIIcon";
import StatusBadge from "@/components/StatusBadge";

const ExpenseError = () => {
  return (
    <div className="stats gradient-error/20 shadow">
      <div className="stat place-items-center">
        <UIIcon iconName="warning" className="text-error !text-3xl" />
        <div className="stat-title">Error</div>
        <div className="stat-value text-lg">
          Unable to load expense statistics
        </div>
        <StatusBadge
          text="Please try again later"
          status="error"
        />
      </div>
    </div>
  );
};

export default ExpenseError;
