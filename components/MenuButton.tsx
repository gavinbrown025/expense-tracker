'use client'

type MenuButtonProps = {
  onClick?: () => void;
  mobileMenuOpen?: boolean;
};

export default function MenuButton({ onClick, mobileMenuOpen = false }: MenuButtonProps) {
  return (
    <button
      onClick={onClick}
      className="md:hidden p-1.5 sm:p-2 rounded-lg sm:rounded-xl hover:text-primary-600 hover:bg-primary-50/50 transition-all duration-200 active:scale-95"
      aria-label="Toggle mobile menu"
    >
      <svg
        className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 ${
          mobileMenuOpen ? "rotate-90" : ""
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        {mobileMenuOpen ? (
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
  );
}