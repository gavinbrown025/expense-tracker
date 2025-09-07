"use client";

import deleteRecord from "@/app/actions/deleteRecord";
import { useChartContext } from "@/contexts/ChartContext";
import UIIcon from "@/components/UIIcon";

import { Record } from "@/types/Record";

import { format } from "date-fns";
import { useState } from "react";

const icons = {
  Food: "fastfood",
  Transport: "commute",
  Utilities: "electrical_services",
  Health: "medical_services",
  Shopping: "shopping_cart",
  Other: "help",
  Entertainment: "attractions",
};

export default function ExpenseItem({ expense }: { expense: Record }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const date = format(new Date(expense.date), "MMM dd, yyyy");
  const iconName = icons[expense.category as keyof typeof icons] || icons.Other;

  const { refreshRecords } = useChartContext();

  const deleteExpense = async () => {
    setIsDeleting(true);
    try {
      await deleteRecord(expense.id);
      refreshRecords();
    } catch (error) {
      console.error("Error deleting expense:", error);
      setIsDeleting(false);
    }
  };

  return (
    <div
      className={`group relative gradient-base-300 shadow-md rounded-lg ${
        isDeleting ? "skeleton opacity-50" : ""
      }`}
    >
      <div
        onClick={() => !isDeleting && deleteExpense()}
        className="hidden group-hover:grid absolute top-2 right-2 size-3.5 bg-error place-items-center rounded-sm cursor-pointer hover:bg-error/80"
      >
        <span className="transform rotate-45 text-lg leading-0">+</span>
      </div>
      <div className="stat">
        <div className="stat-figure">
          <UIIcon iconName={iconName} />
        </div>
        <div className="stat-title">{expense.category}</div>
        <div className="stat-value">${expense.amount}</div>
        <div className="stat-desc">{date}</div>
      </div>
    </div>
  );
}
