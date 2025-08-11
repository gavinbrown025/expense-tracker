"use client";

import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import MenuButton from "@/components/MenuButton";
import MobileMenu from "@/components/MobileMenu";
import UIIcon from "@/components/UIIcon";
import { useState } from "react";
import AuthButton from "./AuthButton";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const links = [
    { href: "/", label: "Home", icon: "home" },
    { href: "/about", label: "About", icon: "info" },
    { href: "/contact", label: "Contact", icon: "phone_enabled" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-neutral shadow-md shadow-base-900/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center gap-2 sm:gap-3 flex-shrink-0 group transition-all duration-300 hover:scale-105"
              onClick={closeMobileMenu}
            >
              <div className="size-7 sm:size-8 md:size-10 rounded-sm sm:rounded-md bg-primary flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:rotate-3">
                <UIIcon
                  iconName="receipt_long"
                  className="!text-white !text-lg sm:!text-xl md:!text-2xl"
                />
              </div>
              <h1 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold">
                ExpenseTracker
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="btn btn-neutral hover:btn-primary transition-all duration-200"
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
            <AuthButton outClass="not-sm:hidden"/>
          </div>
        </div>

        {/* Mobile Menu */}
        <MobileMenu
          open={isMobileMenuOpen}
          links={links}
          onClose={closeMobileMenu}
        />
      </div>
    </nav>
  );
}
