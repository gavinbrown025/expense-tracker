import Link from "next/link";
import { usePathname } from 'next/navigation';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import UIIcon from "./UIIcon";

type MobileMenuProps = {
  open: boolean;
  links: { href: string; label: string; icon: string }[];
  onClose: () => void;
};

export default function MobileMenu({ open, links, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  return (
    <div
      className={`md:hidden transition-all duration-300 ease-in-out ${
        open ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
      }`}
    >
      <ul className="menu w-full border-t border-secondary/50">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`btn btn-neutral ${pathname === link.href ? "btn-active" : ""}`}
              onClick={onClose}
            >
              <UIIcon iconName={link.icon} className="!text-lg" />
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
        <div className="pt-3 border-t border-secondary/50">
          <SignedOut>
            <SignInButton>
              <button
                className="btn btn-primary w-full"
                onClick={onClose}
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
        </div>
      </ul>
    </div>
  );
}
