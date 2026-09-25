import { useEffect, useRef, useState } from "react";
import { useText } from "../hooks/siteTexts";

const valueIcons = [
  (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
  ),
  (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6 5.87v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2m13-6a4 4 0 100-8 4 4 0 000 8zm-8 0a3 3 0 100-6 3 3 0 000 6z"
        />
      </svg>
  ),
  (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
  ),
  (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
  ),
  (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
        />
      </svg>
  ),
];

const About = () => {
  const valuesRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLElement>(null);
  const [valuesVisible, setValuesVisible] = useState(false);
  const [timelineVisible, setTimelineVisible] = useState(false);
  const t = useText();

  const values = valueIcons.map((icon, i) => ({
    icon,
    title: t(`about.value${i + 1}.title`),
    description: t(`about.value${i + 1}.description`),
  }));

  const timeline = [1, 2, 3, 4, 5].map((n) => ({
    year: t(`about.timeline${n}.year`),
    title: t(`about.timeline${n}.title`),
    description: t(`about.timeline${n}.description`),
  }));

  useEffect(() => {
    const observerCallback =
      (setter: (v: boolean) => void) =>
      ([entry]: IntersectionObserverEntry[]) => {
        if (entry.isIntersecting) setter(true);
      };

    const o1 = new IntersectionObserver(observerCallback(setValuesVisible), {
      threshold: 0.2,
    });
    const o2 = new IntersectionObserver(observerCallback(setTimelineVisible), {
      threshold: 0.15,
    });

    if (valuesRef.current) o1.observe(valuesRef.current);
    if (timelineRef.current) o2.observe(timelineRef.current);

    return () => {
      o1.disconnect();
      o2.disconnect();
    };
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-white text-[#1f3f3a] overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-4 py-20 md:py-28 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">{t("about.title")}</h1>
          <h2 className="text-2xl md:text-4xl font-bold mb-6">
            {t("about.subtitle")}
          </h2>
          <div className="space-y-4 text-base md:text-lg text-[#1f3f3a] text-left max-w-3xl mx-auto">
            <p>{t("about.paragraph1")}</p>
            <p>{t("about.paragraph2")}</p>
            <p>{t("about.paragraph3")}</p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section ref={valuesRef} className="bg-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div
            className={`text-center mb-12 transition-all duration-700 ease-out ${
              valuesVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <h2 className="text-2xl md:text-4xl font-bold text-[#1f3f3a] mb-3">
              {t("about.values.heading")}
            </h2>
            <p className="text-[#1f3f3a] text-base md:text-lg max-w-2xl mx-auto">
              {t("about.values.subtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <div
                key={i}
                className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center
                  hover:shadow-lg hover:-translate-y-1 transition-all duration-300
                  ${valuesVisible ? "animate-[fadeSlideUp_0.6s_ease-out_both]" : "opacity-0"}`}
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <div className="w-14 h-14 rounded-full bg-[#e6f4ec] text-[#1f3f3a] flex items-center justify-center mx-auto mb-4">
                  {v.icon}
                </div>
                <h3 className="text-lg font-bold text-[#1f3f3a] mb-2">
                  {v.title}
                </h3>
                <p className="text-sm text-[#1f3f3a] leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section ref={timelineRef} className="relative bg-white py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4">
          <div
            className={`text-center mb-14 transition-all duration-700 ease-out ${
              timelineVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <h2 className="text-2xl md:text-4xl font-bold text-[#1f3f3a] mb-3">
              {t("about.timeline.heading")}
            </h2>
            <p className="text-[#1f3f3a] text-base md:text-lg">
              {t("about.timeline.subtitle")}
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-[#1f3f3a]/20" />

            {timeline.map((item, i) => (
              <div
                key={i}
                className={`relative mb-10 last:mb-0 md:flex md:items-start ${
                  i % 2 === 0 ? "md:flex-row-reverse" : ""
                } ${timelineVisible ? "animate-[fadeSlideUp_0.6s_ease-out_both]" : "opacity-0"}`}
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-[#1f3f3a] rounded-full border-4 border-[#e6f4ec] z-10 mt-1" />
                <div
                  className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
                    i % 2 === 0 ? "md:ml-auto md:pl-10" : "md:mr-auto md:pr-10"
                  }`}
                >
                  <span className="inline-block text-sm font-bold text-[#1f3f3a] bg-[#e6f4ec] px-3 py-1 rounded-full mb-2">
                    {item.year}
                  </span>
                  <h3 className="text-lg font-bold text-[#1f3f3a] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#1f3f3a] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
