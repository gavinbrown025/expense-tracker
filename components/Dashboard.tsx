import { User } from "@clerk/nextjs/server";
import { ChartProvider } from "@/contexts/ChartContext";

import WelcomeCard from "@/components/WelcomeCard";
import AddNewRecord from "@/components/AddNewRecord";
import RecordChart from "@/components/Charts/RecordChart";
import AIInsights from "@/components/Insights/AIInsights";

export default function Dashboard({ user }: { user: User }) {
  return (
    <ChartProvider>
      <div className="container-x py-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <WelcomeCard user={user} />
            <AddNewRecord />
          </div>
          <div className="space-y-6">
            <RecordChart />
          </div>
          <div className="col-span-full">
            <AIInsights />
          </div>
        </div>
      </div>
    </ChartProvider>
  );
}
