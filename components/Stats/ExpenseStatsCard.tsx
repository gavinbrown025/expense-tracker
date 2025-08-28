import getUserRecord from "@/app/actions/getUserRecord";
import getBestWorstExpense from "@/app/actions/getBestWorstExpense";

import CardHeading from "../CardHeading";
import ExpenseError from "./ExpenseStatsError";
import ExpenseStats from "./ExpenseStats";

const getData = async () => {
  try {
    // Fetch both average and range data
    const [userRecordResult, rangeResult] = await Promise.all([
      getUserRecord(),
      getBestWorstExpense(),
    ]);

    const { record, daysWithRecords } = userRecordResult;
    const { bestExpense, worstExpense } = rangeResult;

    // Calculate average expense
    const validRecord = record || 0;
    const validDays =
      daysWithRecords && daysWithRecords > 0 ? daysWithRecords : 1;
    const averageExpense = validRecord / validDays;

    return (
      <ExpenseStats
        averageExpense={averageExpense}
        bestExpense={bestExpense || 0}
        worstExpense={worstExpense || 0}
        validDays={validDays || 0}
      />
    );
  } catch (error) {
    console.error("Error fetching expense data:", error);
    return <ExpenseError />;
  }
};

const ExpenseStatsCard = async () => {
  const activeComponent = await getData();
  return (
    <div className="card @container/card card-md @lg/card:card-lg gradient-neutral">
      <div className="card-body">
        <CardHeading
          iconName="savings"
          title="Expense Statistics"
          description="Your spending insights and ranges"
        />
        {activeComponent}
      </div>
    </div>
  );
};

export default ExpenseStatsCard;
