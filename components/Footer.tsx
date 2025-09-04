import Link from "next/link";
import { features } from "@/lib/features";
import UICircleIcon from "@/components/UICircleIcon";
import StatusBadge from "./StatusBadge";

const Footer = () => {
  const NavLinks = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/about",
      label: "About",
    },
    {
      href: "/contact",
      label: "Contact",
    },
  ];
  return (
    <footer className="relative overflow-hidden gradient-base-100 border-t border-neutral/50">
      {/* Gradient accent line */}
      <div className="absolute top-0 left-0 w-full h-1 gradient-accent"></div>

      <div className="container-x py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo and Tagline */}
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 mb-4">
              <UICircleIcon
                iconName="money_bag"
                className="gradient-primary !size-8"
              />
              <h2 className="text-xl font-bold gradient-text">
                ExpenseTracker
              </h2>
            </div>
            <p className="mx-auto leading-relaxed max-w-sm">
              Intelligent financial management powered by AI. Track your
              expenses, manage your budget, and gain insights into your spending
              patterns.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="flex flex-col items-center md:items-start space-y-3">
              {NavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group inline-flex items-center gap-2 hover:text-primary text-sm font-medium transition-colors duration-200"
                >
                  <span className="status status-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <div className="flex flex-col items-center md:items-start space-y-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex items-center gap-3 text-sm"
                >
                  <UICircleIcon
                    iconName={feature.icon}
                    iconClass="text-base!"
                    className="gradient-primary !size-6"
                  />
                  {feature.title}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-base-content/20 to-transparent mb-8"></div>

        {/* Copyright and Social */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} ExpenseTracker. All rights reserved.
            </p>
          </div>
          <StatusBadge text="Made by Gavin Brown" className="text-sm text-primary/100" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
