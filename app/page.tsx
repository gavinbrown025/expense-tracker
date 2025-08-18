import { currentUser } from "@clerk/nextjs/server";
import { ChartProvider } from "@/contexts/ChartContext";

import Guest from "@/components/Guest";
import WelcomeCard from "@/components/WelcomeCard";
import AddNewRecord from "@/components/AddNewRecord";
import RecordChart from "@/components/Charts/RecordChart";


export default async function HomePage() {
  const user = await currentUser();
  if (!user) {
    return <Guest />;
  }
  return (
    <div className="bg-base-100 min-h-screen transition-colors duration-300">
      <div className="container-x container-y">
        <div className="grid gap-4 md:grid-cols-2 md:gap-6">
          <div className="space-y-6">
            <WelcomeCard user={user} />
            <AddNewRecord />
          </div>
          <div className="space-y-6">
            <ChartProvider>
              <RecordChart />
            </ChartProvider>
            <div className="card bg-neutral">other</div>
          </div>
        </div>
      </div>
    </div>
  );
}
