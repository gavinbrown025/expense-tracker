export type ChartType = "Date" | "Category";
export type StoredDateRange = { start: string; end: string; label?: string };


export interface ExpenseStatsProps {
  averageExpense: number;
  highestExpense: number;
  lowestExpense: number;
  validDays: number;
}

export type ChartStats = ExpenseStatsProps | null;

export interface Stat {
  value: string;
  iconName: string;
  label: string;
  trend: React.ReactNode | string;
  styles: Array<string>;
  badge?: {
    badgeText: string;
    status: "primary" | "warning" | "error" | "success";
  };
}

export interface Stats {
  [key: string]: Stat;
}