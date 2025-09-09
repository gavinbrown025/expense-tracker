import { currentUser, User } from "@clerk/nextjs/server";

import { ChartProvider } from "@/contexts/ChartContext";
import { redirect } from "next/navigation";

import WelcomeCard from "@/components/WelcomeCard";
import AddNewRecord from "@/components/AddNewRecord";
import RecordChart from "@/components/Charts/RecordChart";
import AIInsights from "@/components/Insights/AIInsights";
import HistoryCard from "@/components/History/HistoryCard";

export default async function Dashboard() {
  try {
    const user = await currentUser();
    if (!user) {
      return redirect("/sign-in");
    }
    return (
      <div className="min-h-screen transition-colors duration-300">
        <ChartProvider>
          <div className="container-x py-8">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-6">
                <WelcomeCard user={user as User} />
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
  } catch (error) {
    console.error("Error fetching user:", error);
    return redirect("/sign-in");
  }
}
