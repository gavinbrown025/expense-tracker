import Card from "@/components/Card";
import Avatar from '@/components/Avatar'

import type { User } from "@clerk/nextjs/server";

export default function WelcomeCard({ user }: { user: User }) {

  return (
    <Card
      title={`Welcome, ${user.firstName}!`}
      desc="Here's a quick overview of your recent expense activity. Track your spending, analyze patterns, and manage your budget efficiently!"
      headingChildren={<Avatar className="w-18 sm:w-20 text-2xl" user={user} />}
    >
      <div className="card-actions">
        <div className="badge badge-outline border-accent">
          Joined: {new Date(user.createdAt).toLocaleDateString()}
        </div>
        <div className="badge badge-outline border-accent">
          Last Active:{" "}
          {user.lastActiveAt
            ? new Date(user.lastActiveAt).toLocaleDateString()
            : "Today"}
        </div>
      </div>
    </Card>
  );
}
