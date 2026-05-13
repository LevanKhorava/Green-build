import { useEffect, useRef, useState } from "react";

const ContactFloat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ firstName: "", lastName: "", phone: "" });
    setTimeout(() => setSubmitted(false), 3000);
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen]);

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-30 bg-green-600 text-white rounded-full shadow-lg
          hover:bg-green-700 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer
          flex items-center justify-center px-5 py-3 text-sm font-semibold whitespace-nowrap"
      >
        <span className="absolute inset-0 rounded-full bg-green-400/40 animate-ping" />
        <span className="relative">
          {isOpen ? "✕" : "დაგვიტოვეთ ნომერი"}
        </span>
      </button>

      {/* Panel */}
      {isOpen && (
        <div
          ref={panelRef}
          className="fixed bottom-24 right-6 z-30 w-80 max-w-[calc(100vw-3rem)]"
          style={{ animation: "contact-slide-up 0.3s ease-out both" }}
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-linear-to-r from-green-600 to-green-700 px-5 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-white font-bold text-sm">
                  დაგვიტოვეთ ნომერი
                </h3>
                <p className="text-green-100 text-xs mt-0.5">
                  ჩვენ მალე დაგიკავშირდებით
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="p-5">
              {submitted ? (
                <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 text-center text-sm">
                  მადლობა! ჩვენ მალე დაგიკავშირდებით.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      სახელი
                    </label>
                    <input
                      type="text"
                      required
                      value={form.firstName}
                      onChange={(e) =>
                        setForm({ ...form, firstName: e.target.value })
                      }
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      გვარი
                    </label>
                    <input
                      type="text"
                      required
                      value={form.lastName}
                      onChange={(e) =>
                        setForm({ ...form, lastName: e.target.value })
                      }
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      ტელეფონის ნომერი
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      placeholder="+995 5XX XXX XXX"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white font-semibold py-2.5 rounded-lg text-sm hover:bg-green-700 transition-colors cursor-pointer"
                  >
                    გაგზავნა
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactFloat;
