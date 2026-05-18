import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const ContactFloat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setSending(true);
    setError("");

    try {
      await emailjs.sendForm(
        "service_99kqxhr",
        "template_jkah0qj",
        formRef.current,
        { publicKey: "A6m3FkQoJDdswEPDX" },
      );
      setSubmitted(true);
      formRef.current.reset();
      setTimeout(() => setSubmitted(false), 3000);
    } catch {
      setError("გაგზავნა ვერ მოხერხდა. სცადეთ თავიდან.");
    } finally {
      setSending(false);
    }
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
        className="fixed bottom-6 right-6 z-30 bg-[#1f3f3a] text-white rounded-full shadow-lg
          hover:bg-[#1f3f3a]/80 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer
          flex items-center justify-center px-5 py-3 text-sm font-semibold whitespace-nowrap"
      >
        <span className="absolute inset-0 rounded-full bg-[#e6f4ec]/40 animate-ping" />
        <span className="relative">{isOpen ? "✕" : "დაგვიტოვეთ ნომერი"}</span>
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
            <div className="bg-[#1f3f3a] px-5 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-white font-bold text-sm">
                  დაგვიტოვეთ ნომერი
                </h3>
                <p className="text-[#e6f4ec] text-xs mt-0.5">
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="p-5">
              {submitted ? (
                <div className="bg-[#e6f4ec] border border-[#1f3f3a]/20 text-[#1f3f3a] rounded-lg p-4 text-center text-sm">
                  მადლობა! ჩვენ მალე დაგიკავშირდებით.
                </div>
              ) : (
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="space-y-3"
                >
                  <div>
                    <label className="block text-xs font-medium text-[#333333] mb-1">
                      სახელი
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#1f3f3a] focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#333333] mb-1">
                      გვარი
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#1f3f3a] focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#333333] mb-1">
                      ტელეფონის ნომერი
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+995 5XX XXX XXX"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#1f3f3a] focus:border-transparent transition"
                    />
                  </div>
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-center text-sm">
                      {error}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full bg-[#1f3f3a] text-white font-semibold py-2.5 rounded-lg text-sm hover:bg-[#1f3f3a]/80 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {sending ? "იგზავნება..." : "გაგზავნა"}
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
