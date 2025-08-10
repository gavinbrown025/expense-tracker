"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import UIIcon from "./UIIcon";
import { useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const links = [
    { href: "/", label: "Home", icon: "home" },
    { href: "/about", label: "About", icon: "info" },
    { href: "/contact", label: "Contact", icon: "phone_enabled" },
  ];

  return (
    <nav className="sticky top-0 z-50 text-neutral-content bg-neutral/95 backdrop-blur-xl border-b border-base-200/50 shadow-lg shadow-base-900/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center gap-2 sm:gap-3 flex-shrink-0 group transition-all duration-300 hover:scale-105"
              onClick={closeMobileMenu}
            >
              <div className="size-7 sm:size-8 md:size-10 rounded-lg sm:rounded-xl bg-primary flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:rotate-3">
                <UIIcon iconName="receipt_long" className="!text-white !text-lg sm:!text-xl md:!text-2xl" />
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
                className="btn bg-transparent text-white hover:bg-primary border-0 rounded-xl transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Authentication - Desktop */}
            <div className="hidden sm:block">
              <SignedOut>
                <SignInButton>
                  <button className="relative overflow-hidden bg-primary px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95">
                    <div className="relative z-10 flex items-center gap-1 sm:gap-2">
                      <span>Sign In</span>
                      <UIIcon iconName="login" className="!text-lg sm:!text-xl" />
                    </div>
                    <div className="absolute inset-0 bg-primary opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <div className="p-0.5 sm:p-1 rounded-lg sm:rounded-xl bg-primary backdrop-blur-sm border border-primary-200/30">
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox:
                          "w-6 h-6 sm:w-8 sm:h-8 hover:scale-110 transition-transform duration-200",
                        userButtonBox: "flex items-center justify-center",
                      },
                    }}
                  />
                </div>
              </SignedIn>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-1.5 sm:p-2 rounded-lg sm:rounded-xl hover:text-primary-600 hover:bg-primary-50/50 transition-all duration-200 active:scale-95"
              aria-label="Toggle mobile menu"
            >
              <svg
                className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 ${
                  isMobileMenuOpen ? "rotate-90" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`text-white leading-none md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-96 opacity-100 pb-3 sm:pb-4"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-primary/80 backdrop-blur-sm rounded-xl mt-2 shadow-lg">
            {/* Mobile Navigation Links */}
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:text-primary-600 hover:bg-primary-50/50 text-sm font-medium transition-all duration-200 active:scale-95"
                onClick={closeMobileMenu}
              >
                <UIIcon iconName={link.icon} />
                <span>{link.label}</span>
              </Link>
            ))}

            {/* Mobile Authentication */}
            <div className="pt-3 border-t border-base-200/50">
              <SignedOut>
                <SignInButton>
                  <button
                    className="btn btn-primary border-0 text-white rounded-xl w-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
                    onClick={closeMobileMenu}
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
          </div>
        </div>
      </div>
    </nav>
  );
}
