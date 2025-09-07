"use server";
import { db } from "@/lib/db";
import { GetRecordsParams } from "@/types/Record";
import { auth } from "@clerk/nextjs/server";

async function getBestWorstExpense({
  start,
  end,
  limit,
}: GetRecordsParams): Promise<{
  highestExpense?: number;
  lowestExpense?: number;
  error?: string;
}> {
  const { userId } = await auth();
  if (!userId) return { error: "User not found" };

  try {
    // Fetch all records for the authenticated user
    const records = await db.record.findMany({
      where: { userId, date: { gte: start, lte: end } },
      select: { amount: true }, // Fetch only the `amount` field for efficiency
      take: limit,
    });

    if (!records || records.length === 0) {
      return { highestExpense: 0, lowestExpense: 0 }; // Return 0 if no records exist
    }

    const amounts = records.map((record) => record.amount);

    // Calculate best and worst expense amounts
    const highestExpense = Math.max(...amounts); // Highest amount
    const lowestExpense = Math.min(...amounts); // Lowest amount

    return { highestExpense, lowestExpense };
  } catch (error) {
    console.error("Error fetching expense amounts:", error); // Log the error
    return { error: "Database error" };
  }
}

export default getBestWorstExpense;
