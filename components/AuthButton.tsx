import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import UIIcon from "@/components/UIIcon";

type AuthButtonProps = {
  onClick?: () => void;
  className?: string;
};

export default function AuthButton({ onClick, className = "" }: AuthButtonProps) {
  return (
    <>
      <SignedOut>
        <SignInButton>
          <button
            className={`btn btn-primary w-full ${className}`}
            onClick={onClick}
          >
            <span>Sign In</span>
            <UIIcon iconName="login" className="!text-lg" />
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <div className="flex items-center justify-center p-3 rounded-xl bg-gradient-to-r from-primary/50 to-secondary/50 backdrop-blur-sm border border-primary-200/30">
          <UserButton
            appearance={{
              elements: {
                avatarBox:
                  "size-8 hover:scale-110 transition-transform duration-200",
                userButtonBox: "flex items-center justify-center",
              },
            }}
          />
        </div>
      </SignedIn>
    </>
  );
}