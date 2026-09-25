import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
} from "../config";
import { useText } from "../hooks/siteTexts";

const ContactFloat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const t = useText();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setSending(true);
    setError("");

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        { publicKey: EMAILJS_PUBLIC_KEY },
      );
      setSubmitted(true);
      formRef.current.reset();
      setTimeout(() => setSubmitted(false), 3000);
    } catch {
      setError(t("contact.error"));
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
        {isOpen ? (
          <span className="relative">✕</span>
        ) : (
          <span className="relative flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 animate-bounce"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
              />
            </svg>
            {t("contact.button")}
          </span>
        )}
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
                  {t("contact.heading")}
                </h3>
                <p className="text-[#e6f4ec] text-xs mt-0.5">
                  {t("contact.subtitle")}
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
                  {t("contact.success")}
                </div>
              ) : (
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="space-y-3"
                >
                  <div>
                    <label className="block text-xs font-medium text-[#333333] mb-1">
                      {t("contact.field.firstName")}
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
                      {t("contact.field.lastName")}
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
                      {t("contact.field.phone")}
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
                    {sending ? t("contact.sending") : t("contact.submit")}
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
