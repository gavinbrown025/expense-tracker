import React from "react";
import UIIcon from "@/components/UIIcon";

export default function ChartHeading() {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="btn btn-primary size-10 gradient-primary sm:size-12 rounded-full border-0">
        <UIIcon iconName="savings" className="!text-2xl" />
      </div>
      <div className="flex-grow">
        <h2 className="card-title text-xl md:text-2xl">Expense Chart</h2>
        <p>Analyze and set your spending goals</p>
      </div>
    </div>
  );
}
