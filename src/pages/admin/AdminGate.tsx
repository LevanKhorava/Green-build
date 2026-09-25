import { useState } from "react";
import type { ReactNode } from "react";
import { ADMIN_PASSWORD } from "../../config";
import { rememberUnlocked, readUnlocked } from "./adminSession";

const AdminGate = ({ children }: { children: ReactNode }) => {
  const [unlocked, setUnlocked] = useState(readUnlocked);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (unlocked) return <>{children}</>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      rememberUnlocked();
      setUnlocked(true);
      setPassword("");
      setError("");
    } else {
      setError("პაროლი არასწორია");
      setPassword("");
    }
  };

  return (
    <div className="min-h-dvh flex items-center justify-center bg-[#f5f7f6] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
      >
        <h1 className="text-2xl font-bold text-[#1f3f3a] mb-1">ადმინ პანელი</h1>
        <p className="text-sm text-[#1f3f3a]/70 mb-6">
          გასაგრძელებლად შეიყვანეთ პაროლი
        </p>

        <label className="block text-sm font-medium text-[#1f3f3a] mb-1">
          პაროლი
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoFocus
          autoComplete="current-password"
          className="w-full mb-5 px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#1f3f3a] focus:outline-none"
        />

        {error && (
          <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg p-3">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-[#1f3f3a] text-white font-semibold py-2.5 rounded-lg
            hover:bg-[#16302c] transition-colors"
        >
          შესვლა
        </button>
      </form>
    </div>
  );
};

export default AdminGate;
