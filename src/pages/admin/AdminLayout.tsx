import { Link, NavLink, Outlet } from "react-router-dom";
import { isSupabaseConfigured } from "../../lib/supabase";

const adminLinks = [
  { to: "/admin", label: "სიახლეები", end: true },
  { to: "/admin/texts", label: "ტექსტები", end: false },
];

/** Chrome shared by every /admin page. Open access — no login. */
const AdminLayout = () => {
  return (
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
          <Link
            to="/"
            className="text-sm text-white/80 hover:text-white shrink-0"
          >
            საიტზე დაბრუნება
          </Link>
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
  );
};

export default AdminLayout;
