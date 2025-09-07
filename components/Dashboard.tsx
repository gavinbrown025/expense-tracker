import { User } from "@clerk/nextjs/server";
import { ChartProvider } from "@/contexts/ChartContext";

import WelcomeCard from "@/components/WelcomeCard";
import AddNewRecord from "@/components/AddNewRecord";
import RecordChart from "@/components/Charts/RecordChart";
import AIInsights from "@/components/Insights/AIInsights";
import HistoryCard from "@/components/History/HistoryCard";

export default function Dashboard({ user }: { user: User }) {
  return (
    <ChartProvider>
      <div className="container-x py-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <WelcomeCard user={user} />
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
  );
}
