"use client";

import { useUser } from "@clerk/nextjs";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import { ChartProvider } from "@/contexts/ChartContext";

import WelcomeCard from "@/components/WelcomeCard";
import AddNewRecord from "@/components/AddNewRecord";
import RecordChart from "@/components/Charts/RecordChart";
import AIInsights from "@/components/Insights/AIInsights";
import HistoryCard from "@/components/History/HistoryCard";

export default function DashboardClient() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isSignedIn) return redirect("/sign-in");

  return (
    <div className="min-h-screen transition-colors duration-300">
      <ChartProvider>
        <div className="container-x py-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-6">
              <WelcomeCard />
              <AddNewRecord />
              <AIInsights />
            </div>
            <div className="space-y-6">
              <RecordChart />
              <HistoryCard />
            </div>
          </div>
        </div>
      </ChartProvider>
    </div>
  );
}
