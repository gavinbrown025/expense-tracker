"use client";

import { useState, useRef } from "react";

import { DEFAULT_CATEGORIES, Category } from "@/types/Categories";
import addExpenseRecord from "@/app/actions/addExpenseRecord";
import { suggestCategory } from "@/app/actions/suggestCategory";
import { useChartContext } from "@/contexts/ChartContext";

import UIIcon from "./UIIcon";
import CardHeading from "./CardHeading";

export default function AddRecord() {
  const { refreshRecords } = useChartContext();
  const formRef = useRef<HTMLFormElement>(null);
  const [amount, setAmount] = useState(50);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error" | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState<Category | "">("");
  const [description, setDescription] = useState("");
  const [isCategorizingAI, setIsCategorizingAI] = useState(false);

  const clientAction = async (formData: FormData) => {
    setIsLoading(true);
    setAlertMessage(null);

    formData.set("amount", amount.toString());
    formData.set("category", category);

    const { error } = await addExpenseRecord(formData);

    if (error) {
      setAlertType("error");
      setAlertMessage(`Error: ${error}`);
    } else {
      setAlertType("success");
      setAlertMessage("Expense record added successfully!");
      formRef.current?.reset();
      setAmount(50);
      setCategory("");
      setDescription("");
    }

    setIsLoading(false);
    refreshRecords();
  };

  const handleAISuggestCategory = async () => {
    if (!description.trim()) {
      setAlertMessage("Please enter a description first");
      setAlertType("error");
      return;
    }
    setIsCategorizingAI(true);
    setAlertMessage(null);

    try {
      const result = await suggestCategory(description);
      if (result.error) {
        setAlertType("error");
        setAlertMessage(`AI Suggestion: ${result.error}`);
      } else {
        setCategory(result.category as Category);
        setAlertType("success");
        setAlertMessage(`AI Suggested Category ${result.category}`);
      }
    } catch (error) {
      setAlertType("error");
      setAlertMessage(`AI Suggestion failed: ${error}`);
    } finally {
      setIsCategorizingAI(false);
    }
  };

  return (
    <div className="card @container/card card-md @lg/card:card-lg bg-neutral shadow-xl">
      <div className="card-body">
        <CardHeading
          iconName="add_card"
          title="Add New Expense"
          description="Track your spending with AI assistance"
        />
        <form
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            clientAction(formData);
          }}
        >
          <div className="grid grid-cols-1 @lg/card:grid-cols-2 gap-4 mb-8">
            <div>
              <label htmlFor="text" className="text-sm font-semibold">
                Expense description
              </label>
              <div className="input validator w-full mt-2">
                <input
                  type="text"
                  id="text"
                  name="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Coffee, groceries, gas..."
                  min="3"
                  required
                />
                <button
                  type="button"
                  title="AI Category Suggestion"
                  disabled={isCategorizingAI || !description.trim()}
                  onClick={handleAISuggestCategory}
                  className={`btn p-1 h-3/4 aspect-square ${
                    isCategorizingAI || !description.trim()
                      ? "gradient-base-100"
                      : "gradient-primary hover:bg-gradient-to-tl"
                  }`}
                >
                  <div
                    className={`swap swap-rotate grid place-items-center  ${
                      isCategorizingAI && "swap-active"
                    }`}
                  >
                    <UIIcon
                      iconName="diamond_shine"
                      className="swap-off !text-base"
                    />
                    <span className="size-3/4 swap-on loading loading-spinner" />
                  </div>
                </button>
              </div>
              <p
                className={`mt-2 ml-1 text-xs text-success ${
                  !isCategorizingAI && "hidden"
                }`}
              >
                <UIIcon iconName="diamond_shine" className="!text-xs" />{" "}
                Searching for AI Suggestions
              </p>
            </div>
            <div>
              <label htmlFor="date" className="text-sm font-semibold">
                Expense Date
              </label>
              <div className="input validator w-full mt-2">
                <input
                  type="date"
                  name="date"
                  id="date"
                  required
                  onFocus={(e) => e.target.showPicker()}
                />
                <UIIcon
                  iconName="calendar_today"
                  className="pointer-events-none !text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="category" className="font-semibold text-sm">
                Category
              </label>
              <select
                name="category"
                id="category"
                value={category}
                required
                className="select validator mt-2 w-full"
                onChange={(e) => setCategory(e.target.value as Category)}
              >
                <option disabled={true} value="">
                  Pick a category
                </option>
                {DEFAULT_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
                {/* Add more categories as needed */}
              </select>
              <p className="mt-2 ml-1 text-xs text-neutral-content/70">
                Use the <UIIcon iconName="diamond_shine" className="!text-xs" />{" "}
                above for AI Suggestions
              </p>
            </div>

            <div>
              <label htmlFor="amount" className="text-sm font-semibold">
                Amount
              </label>
              <div className="input validator mt-2 w-full">
                $
                <input
                  type="number"
                  required
                  name="amount"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                  min="1"
                  step="0.01"
                  placeholder="0.00"
                />
              </div>
              <p className="mt-2 ml-1 text-xs text-neutral-content/70">
                Enter a number between $1 and $1000
              </p>
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`btn btn-primary w-full shadow-lg transition-all duration-200 ${
              isLoading
                ? "gradient-base-100 border-neutral"
                : "gradient-primary hover:bg-gradient-to-tl"
            }`}
          >
            <div
              className={`swap swap-rotate grid place-items-center  ${
                isLoading && "swap-active"
              }`}
            >
              <UIIcon iconName="add" className="swap-off !text-lg" />
              <span className="size-3/4 swap-on loading loading-spinner"></span>
            </div>
            Add Expense
          </button>
        </form>
        {alertMessage && (
          <div
            className={`rounded-md border border-l-8 p-2 ${
              alertType === "success"
                ? `bg-success/10 border-success`
                : `bg-error/10 border-error`
            }`}
          >
            <p className="text-sm">{alertMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}
