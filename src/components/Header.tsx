import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import MobileSidebar from "./MobileSidebar";

const navLinks = [
  { to: "/", label: "მთავარი" },
  { to: "/about", label: "ჩვენს შესახებ" },
  { to: "/projects", label: "პროექტები" },
  { to: "/news", label: "სიახლეები" },
  { to: "/reviews", label: "შეფასებები" },
];

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const isScrolled = window.scrollY >= 50;
      setScrolled(isScrolled);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }, [scrolled]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
          scrolled ? "bg-white shadow-sm" : "bg-[#166534]"
        }`}
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <NavLink
            to="/"
            className={`text-xl font-bold transition-colors duration-300 ${
              scrolled ? "text-green-600" : "text-white"
            }`}
          >
            GreenBuild
          </NavLink>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-300 ${
                    scrolled
                      ? isActive
                        ? "text-green-600"
                        : "text-gray-700 hover:text-green-600"
                      : isActive
                        ? "text-white"
                        : "text-green-100 hover:text-white"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <a
            href="tel:+995599000000"
            className={`hidden md:inline-flex py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-300 ${
              scrolled
                ? "bg-green-600 text-white hover:bg-green-700"
                : "border border-white text-white hover:bg-white/10"
            }`}
          >
            დაგვიკავშირდით
          </a>

          <button
            className={`md:hidden transition-colors duration-300 ${
              scrolled
                ? "text-gray-700 hover:text-gray-900"
                : "text-white hover:text-green-100"
            }`}
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
