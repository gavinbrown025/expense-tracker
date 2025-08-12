import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden gradient-base border-t border-neutral/50">
      {/* Gradient accent line */}
      <div className="absolute top-0 left-0 w-full h-1 gradient-line"></div>

      <div className="container-y container-x">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo and Tagline */}
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-8 gradient-primary rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-lg">💰</span>
              </div>
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
              <Link
                href="/"
                className="group inline-flex items-center gap-2 hover:text-primary text-sm font-medium transition-colors duration-200"
              >
                <span className="w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                Home
              </Link>
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 hover:text-primary text-sm font-medium transition-colors duration-200"
              >
                <span className="w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>{" "}
                About
              </Link>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 hover:text-primary text-sm font-medium transition-colors duration-200"
              >
                <span className="w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                Contact
              </Link>
            </div>
          </div>

          {/* Features */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">
              Features
            </h3>
            <div className="flex flex-col items-center md:items-start space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-5 h-5 gradient-primary rounded-md flex items-center justify-center shadow-sm">
                  <span className="text-white text-xs">🤖</span>
                </div>
                AI-Powered Insights
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-5 h-5 gradient-primary rounded-md flex items-center justify-center shadow-sm">
                  <span className="text-white text-xs">✨</span>
                </div>
                Smart Categorization
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-5 h-5 gradient-primary rounded-md flex items-center justify-center shadow-sm">
                  <span className="text-white text-xs">📊</span>
                </div>
                Analytics Dashboard
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent mb-8"></div>

        {/* Copyright and Social */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} ExpenseTracker. All rights
              reserved.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full text-xs font-medium">
              <span className="w-1.5 h-1.5 bg-emerald-500 dark:bg-emerald-400 rounded-full animate-pulse"></span>
              Made by Sahand
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
