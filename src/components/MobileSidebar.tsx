import { NavLink } from "react-router-dom";
import { navLinks } from "../data/navLinks";
import { useText } from "../hooks/siteTexts";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSidebar = ({ isOpen, onClose }: MobileSidebarProps) => {
  const t = useText();

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar panel */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button */}
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="text-[#333333] hover:text-[#333333]"
            aria-label="Close menu"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Navigation links */}
        <nav className="flex flex-col px-4 gap-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={onClose}
              className={({ isActive }) =>
                `py-3 px-4 rounded-lg text-base font-medium transition-colors ${
                  isActive
                    ? "bg-[#e6f4ec] text-[#1f3f3a]"
                    : "text-[#333333] hover:bg-gray-100"
                }`
              }
            >
              {t(link.textKey)}
            </NavLink>
          ))}
        </nav>

        {/* Contact button */}
        <div className="px-4 mt-6">
          <a
            href={`tel:${t("nav.contactPhone")}`}
            className="block w-full text-center bg-[#1f3f3a] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#1f3f3a]/80 transition-colors"
          >
            {t("nav.contactCta")}
          </a>
        </div>
      </div>
    </>
  );
};

export default MobileSidebar;
