import { useText } from "../hooks/siteTexts";

const Footer = () => {
  const t = useText();

  return (
    <footer className="bg-[#26b462] text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-[#e6f4ec]/20 flex items-center justify-center shrink-0">
              <svg
                className="w-4 h-4 text-[#e6f4ec]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-[#e6f4ec]/60">{t("footer.phone.label")}</p>
              <a
                href={`tel:${t("footer.phone.tel")}`}
                className="text-gray-200 font-medium hover:text-white transition-colors"
              >
                {t("footer.phone.value")}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-[#e6f4ec]/20 flex items-center justify-center shrink-0">
              <svg
                className="w-4 h-4 text-[#e6f4ec]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-[#e6f4ec]/60">{t("footer.email.label")}</p>
              <p className="text-gray-200 font-medium">{t("footer.email.value")}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-[#e6f4ec]/20 flex items-center justify-center shrink-0">
              <svg
                className="w-4 h-4 text-[#e6f4ec]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-[#e6f4ec]/60">{t("footer.hours.label")}</p>
              <p className="text-gray-200 font-medium">{t("footer.hours.value")}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-[#e6f4ec]/20 flex items-center justify-center shrink-0">
              <svg
                className="w-4 h-4 text-[#e6f4ec]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-[#e6f4ec]/60">{t("footer.address.label")}</p>
              <p className="text-gray-200 font-medium">{t("footer.address.value")}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#e6f4ec]/60">
            &copy; {new Date().getFullYear()} {t("footer.copyright")}
          </p>
          <div className="flex items-center gap-3">
            <a
              href={t("footer.facebook.url")}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-9 h-9 rounded-full bg-[#e6f4ec]/20 flex items-center justify-center hover:bg-[#e6f4ec]/30 transition-colors"
            >
              <svg
                className="w-4 h-4 text-[#e6f4ec]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.261c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
