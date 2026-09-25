import { useState } from "react";
import { NavLink } from "react-router-dom";
import MobileSidebar from "./MobileSidebar";
import { useText } from "../hooks/siteTexts";
import { navLinks } from "../data/navLinks";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const t = useText();

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-30 bg-[#26b462]"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <NavLink to="/" className="text-xl font-bold text-white">
            {t("brand.name")}
          </NavLink>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-300 ${
                    isActive
                      ? "text-white"
                      : "text-green-100 hover:text-white"
                  }`
                }
              >
                {t(link.textKey)}
              </NavLink>
            ))}
          </nav>

          <a
            href={`tel:${t("nav.contactPhone")}`}
            className="hidden md:inline-flex py-2 px-4 rounded-lg text-sm font-medium border border-white text-white hover:bg-white/10 transition-colors duration-300"
          >
            {t("nav.contactCta")}
          </a>

          <button
            className="md:hidden text-white hover:text-green-100 transition-colors duration-300"
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
