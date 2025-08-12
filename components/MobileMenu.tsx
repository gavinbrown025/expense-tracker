import Link from "next/link";
import { usePathname } from "next/navigation";
import UIIcon from "./UIIcon";
import AuthButton from "./AuthButton";

type MobileMenuProps = {
  open: boolean;
  links: { href: string; label: string; icon: string }[];
  closeMobileMenu: () => void;
};

export default function MobileMenu({
  open,
  links,
  closeMobileMenu,
}: MobileMenuProps) {
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
              className={`btn btn-neutral ${
                pathname === link.href ? "btn-active" : ""
              }`}
              onClick={closeMobileMenu}
            >
              <UIIcon iconName={link.icon} className="!text-lg" />
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
        <div className="pt-3 border-t border-secondary/50">
          <AuthButton
            inClass="hidden"
            outClass="w-full"
            onClick={closeMobileMenu}
          />
        </div>
      </ul>
    </div>
  );
}
