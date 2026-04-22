import { useState } from "react";
import { NavLink } from "react-router-dom";
import MobileSidebar from "./MobileSidebar";

const navLinks = [
  { to: "/", label: "მთავარი" },
  { to: "/about", label: "ჩვენს შესახებ" },
  { to: "/projects", label: "პროექტები" },
  { to: "/news", label: "სიახლეები" },
  { to: "/reviews", label: "შეფასებები" },
  { to: "/pay", label: "გადახდა" },
];

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-30 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Brand */}
          <NavLink to="/" className="text-xl font-bold text-green-600">
            GreenBuild
          </NavLink>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? "text-green-600"
                      : "text-gray-700 hover:text-green-600"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop contact button */}
          <a
            href="tel:+995599000000"
            className="hidden md:inline-flex bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
          >
            დაგვიკავშირდით
          </a>

          {/* Mobile hamburger button */}
          <button
            className="md:hidden text-gray-700 hover:text-gray-900"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </header>

      <MobileSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
    </>
  );
};

export default Header;
