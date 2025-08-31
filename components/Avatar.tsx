import type { User } from "@clerk/nextjs/server";

const Avatar = ({ user }: { user: User }) => {
  const f = (user.firstName || "U").charAt(0);
  const l = (user.lastName || "").charAt(0);
  const initials = f + l;

  return (
    <div className="avatar -order-1 avatar-placeholder">
      <div className="gradient-base-100 ring-2 ring-primary w-18 sm:w-20 rounded-full ">
        {!user.hasImage ? (
          <span className="text-2xl">{initials}</span>
        ) : (
          <img src={user.imageUrl} alt={`${user.firstName}'s profile`} />
        )}
      </div>
    </div>
  );
};

export default Avatar;
