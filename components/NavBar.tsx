"use client";
import ThemeToggle from "@/components/ThemeToggle";
import MenuButton from "@/components/MenuButton";
import MobileMenu from "@/components/MobileMenu";
import UIIcon from "@/components/UIIcon";
import AuthButton from "@/components/AuthButton";

import Link from "next/link";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isSignedIn } = useUser();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const links = [
    ...(isSignedIn
      ? [{ href: "/dashboard", label: "Dashboard", icon: "dashboard" }]
      : []),
    { href: "/", label: "Home", icon: "home" },
    { href: "/about", label: "About", icon: "info" },
    { href: "/contact", label: "Contact", icon: "phone_enabled" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-neutral shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-14 sm:h-16">
          {/* Logo Section */}
          <div className="flex flex-grow items-center">
            <Link
              href={isSignedIn ? "/dashboard" : "/"}
              className="flex items-center gap-2 sm:gap-3 flex-shrink-0 group transition-all duration-300 hover:scale-105"
              onClick={closeMobileMenu}
            >
              <div className="size-7 sm:size-8 md:size-10 rounded-sm sm:rounded-md gradient-primary flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:rotate-3">
                <UIIcon
                  iconName="receipt_long"
                  className="!text-white !text-lg sm:!text-xl md:!text-2xl"
                />
              </div>
              <h1 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold gradient-text">
                ExpenseTracker
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {links.map((link) => (
              // make dashboard link hidden if user is not signed in
              <Link
                key={link.href}
                href={link.href}
                className="btn btn-neutral hover:btn-primary transition-all duration-200"
                onClick={closeMobileMenu}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            <ThemeToggle />
            <MenuButton
              onClick={toggleMobileMenu}
              mobileMenuOpen={isMobileMenuOpen}
            />
            <AuthButton outClass="not-sm:hidden" />
          </div>
        </div>

        {/* Mobile Menu */}
        <MobileMenu
          open={isMobileMenuOpen}
          links={links}
          closeMobileMenu={closeMobileMenu}
        />
      </div>
    </nav>
  );
}
