"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Record } from "@/types/Record";
import { subDays } from "date-fns";

export default async function getRecords(params?: {
  startDate?: Date;
  endDate?: Date;
  limit?: number;
}): Promise<{ records?: Record[]; error?: string }> {
  const { userId } = await auth();
  if (!userId) return { error: "User not found" };

  try {
    const now = new Date();
    const defaultStart = subDays(now, 30);

    const {
      startDate = defaultStart,
      endDate = now,
      limit = 100,
    } = params || {};

    const records = await db.record.findMany({
      where: {
        userId,
        date: { gte: startDate, lte: endDate },
      },
      orderBy: { date: "desc" },
      take: limit,
    });

    return { records };
  } catch (error) {
    console.error("Error Fetching Records:", error);
    return { error: "Database Error" };
  }
}
