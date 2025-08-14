import UIIcon from "./UIIcon";

import type { User } from '@clerk/nextjs/server';

export default function WelcomeCard({ user }: { user: User }) {
  return (
    <div className="card bg-neutral shadow-xl sm:card-lg lg:card-xl">
      <div className="card-body">
        <div className="card-title mb-2">
          <figure className="relative mr-2">
            <img
              src={user.imageUrl}
              alt={`${user.firstName}&#39;s profile`}
              className="size-16 sm:size-18 rounded-full border border-primary"
            />
            <div className="bg-primary absolute right-0 bottom-0 sm:right-1 sm:bottom-1 size-4 sm:size-5 rounded-full grid place-items-center">
              <UIIcon iconName="check" className="!text-sm" />
            </div>
          </figure>
          <h2 className="text-xl md:text-2xl">Welcome, {user.firstName}!</h2>
        </div>
        <p>
          Here&#39;s a quick overview of your recent expense activity. Track
          your spending, analyze patterns, and manage your budget efficiently!
        </p>
        <div className="card-actions justify-start mt-4">
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
      </div>
    </div>
  );
}
