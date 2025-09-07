import { currentUser } from "@clerk/nextjs/server";
import Guest from "@/components/Guest";
import Dashboard from "@/components/Dashboard";
export default async function HomePage() {
  const user = await currentUser();
  return (
    <div className="min-h-screen transition-colors duration-300">
      {user ? <Dashboard user={user} /> : <Guest />}
    </div>
  );
}
