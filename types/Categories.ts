export const DEFAULT_CATEGORIES = [
  "Food",
  "Transport",
  "Utilities",
  "Health",
  "Shopping",
  "Other",
  "Entertainment",
] as const;

export type Category = typeof DEFAULT_CATEGORIES[number];