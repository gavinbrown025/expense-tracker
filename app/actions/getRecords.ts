"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Record, GetRecordsParams } from "@/types/Record";

export default async function getRecords({
  start,
  end,
  limit,
}: GetRecordsParams): Promise<{ records?: Record[]; error?: string }> {
  const { userId } = await auth();
  if (!userId) return { error: "User not found" };

  // get all if no date
  const date = start && end ? { gte: start, lte: end } : undefined;

  try {
    const records = await db.record.findMany({
      where: { userId, date },
      orderBy: { date: "desc" },
      take: limit,
    });
    return { records };
  } catch (error) {
    console.error("Error Fetching Records:", error);
    return { error: "Database Error" };
  }
}
