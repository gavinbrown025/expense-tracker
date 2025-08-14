import { currentUser } from "@clerk/nextjs/server";

import Guest from "@/components/Guest";
import WelcomeCard from "@/components/WelcomeCard";
import AddNewRecord from "@/components/AddNewRecord";

export default async function HomePage() {
  const user = await currentUser();
  if (!user) {
    return <Guest />;
  }
  return (
    <div className="bg-base-100 min-h-screen transition-colors duration-300">
      <div className="container-x container-y">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-4 sm:space-y-6">
            <WelcomeCard user={user} />
          </div>
          <AddNewRecord />
        </div>
      </div>
    </div>
  );
}
