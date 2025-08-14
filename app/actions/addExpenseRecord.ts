"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

interface RecordData {
  amount: number;
  text: string;
  category: string;
  date: string;
}

interface RecordResult {
  data?: object;
  error?: string;
}

async function addExpenseRecord(formData: FormData): Promise<RecordResult> {
  // Validate form data
  const textValue = formData.get("text");
  const amountValue = formData.get("amount");
  const categoryValue = formData.get("category");
  const dateValue = formData.get("date");

  if (
    !textValue ||
    textValue === "" ||
    !amountValue ||
    amountValue === "" ||
    !categoryValue ||
    categoryValue === "" ||
    !dateValue ||
    dateValue === ""
  ) {
    return { error: "All fields are required." };
  }

  const text: string = textValue.toString().trim();
  const amount: number = parseFloat(amountValue.toString().trim());
  const category: string = categoryValue.toString().trim();
  let date: string;

  try {
    const inputDate = dateValue.toString();
    const [year, month, day] = inputDate.split("-");
    const dateObj = new Date(
      Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(day), 12, 0, 0)
    );
    date = dateObj.toISOString();
  } catch (error) {
    console.log("Invalid date format:", error);
    return { error: "Invalid date format. Please use YYYY-MM-DD." };
  }

  const { userId } = await auth();
  if (!userId) return { error: "User not authenticated." };

  try {
    const createRecord = await db.record.create({
      data: { text, amount, category, date, userId },
    });
    const recordData: RecordData = {
      amount: createRecord.amount,
      text: createRecord.text,
      category: createRecord.category,
      date: createRecord.date?.toISOString() || date,
    };

    revalidatePath("/");

    return { data: recordData };
  } catch (error) {
    console.error("Error adding expense record:", error);
    return { error: "Failed to add expense record." };
  }
}

export default addExpenseRecord