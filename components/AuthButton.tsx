import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import UIIcon from "@/components/UIIcon";

type AuthButtonProps = {
  onClick?: () => void;
  inClass?: string;
  outClass?: string;
};

export default function AuthButton({
  onClick,
  inClass = "",
  outClass = "",
}: AuthButtonProps) {
  return (
    <>
      <SignedOut>
        <SignInButton>
          <button
            className={`btn btn-primary flex items-center ${outClass}`}
            onClick={onClick}
          >
            <span>Sign In</span>
            <UIIcon iconName="login" className="!text-lg" />
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <div className={inClass}>
          <UserButton />
        </div>
      </SignedIn>
    </>
  );
}
