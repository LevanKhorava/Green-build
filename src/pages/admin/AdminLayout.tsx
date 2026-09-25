import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { isSupabaseConfigured } from "../../lib/supabase";
import AdminGate from "./AdminGate";
import { forgetUnlocked } from "./adminSession";

const adminLinks = [
  { to: "/admin", label: "სიახლეები", end: true },
  { to: "/admin/reviews", label: "შეფასებები", end: false },
  { to: "/admin/texts", label: "ტექსტები", end: false },
];

/** Chrome shared by every /admin page, behind the password gate. */
const AdminLayout = () => {
  // Remounts the gate after locking, so the password form comes back.
  const [gateKey, setGateKey] = useState(0);

  const handleLock = () => {
    forgetUnlocked();
    setGateKey((n) => n + 1);
  };

  return (
    <AdminGate key={gateKey}>
    <div className="min-h-dvh bg-[#f5f7f6]">
      <header className="bg-[#1f3f3a] text-white">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6 min-w-0">
            <span className="font-bold shrink-0">ადმინ პანელი</span>
            <nav className="flex items-center gap-1">
              {adminLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `text-sm px-3 py-1.5 rounded-lg transition-colors ${
                      isActive
                        ? "bg-white/15 text-white"
                        : "text-white/70 hover:text-white"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <Link to="/" className="text-sm text-white/80 hover:text-white">
              საიტზე დაბრუნება
            </Link>
            <button
              onClick={handleLock}
              className="text-sm border border-white/30 px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors"
            >
              გასვლა
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {!isSupabaseConfigured && (
          <p className="mb-6 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-4">
            Supabase არ არის კონფიგურირებული — შეავსეთ VITE_SUPABASE_URL და
            VITE_SUPABASE_ANON_KEY ფაილში .env.local, სხვა შემთხვევაში ცვლილებები
            არ შეინახება.
          </p>
        )}
        <Outlet />
      </main>
    </div>
    </AdminGate>
  );
};

export default AdminLayout;
