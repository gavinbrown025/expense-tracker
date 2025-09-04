import type { User } from "@clerk/nextjs/server";

const Avatar = ({
  user,
  className,
}: {
  user: Pick<User, "firstName" | "lastName" | "imageUrl" | "hasImage">;
  className?: string;
}) => {
  const f = (user.firstName || "U").charAt(0);
  const l = (user.lastName || "").charAt(0);
  const initials = f + l;

  return (
    <div className="avatar -order-1 avatar-placeholder">
      <div
        className={`gradient-base-100 ring-2 ring-primary rounded-full ${className}`}
      >
        {!user.hasImage ? (
          <span>{initials}</span>
        ) : (
          <img src={user.imageUrl} alt={`${user.firstName}'s profile`} />
        )}
      </div>
    </div>
  );
};

export default Avatar;
