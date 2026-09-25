import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useText } from "../hooks/siteTexts";

interface StatItem {
  label: string;
  value: number;
  suffix?: string;
}

/** The four counters, each editable in /admin/texts. */
const STAT_SLOTS = [1, 2, 3, 4];

function useCountUp(target: number, isVisible: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    setCount(0);
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    const stepTime = duration / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), target);
      setCount(current);
      if (step >= steps) {
        clearInterval(timer);
        setCount(target);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target, isVisible]);

  return count;
}

const StatCard = ({
  stat,
  isVisible,
  index,
}: {
  stat: StatItem;
  isVisible: boolean;
  index: number;
}) => {
  const count = useCountUp(stat.value, isVisible);

  return (
    <div
      className="relative group"
      style={{
        animationDelay: `${index * 150}ms`,
        animationFillMode: "both",
      }}
    >
      <div
        className={`h-full bg-[#f7f9f8] rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center border border-[#1f3f3a]/15
          hover:bg-[#e6f4ec] hover:border-[#1f3f3a]/30 hover:scale-105 hover:-translate-y-1
          transition-all duration-500 ease-out
          ${isVisible ? "animate-[fadeSlideUp_0.6s_ease-out_both]" : "opacity-0 translate-y-8"}`}
        style={{ animationDelay: `${index * 150}ms` }}
      >
        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1f3f3a] mb-1 sm:mb-2 tabular-nums">
          {count.toLocaleString()}
          {stat.suffix && <span className="text-[#26b462]">{stat.suffix}</span>}
        </div>
        <div className="text-[#1f3f3a] text-xs sm:text-sm md:text-base font-medium tracking-wide uppercase">
          {stat.label}
        </div>
      </div>
    </div>
  );
};

const StatsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const t = useText();

  const stats: StatItem[] = STAT_SLOTS.map((n) => ({
    label: t(`home.stats.item${n}.label`),
    value: Number(t(`home.stats.item${n}.value`)) || 0,
    suffix: t(`home.stats.item${n}.suffix`),
  }));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white py-12 sm:py-16 md:py-24 lg:py-28 overflow-hidden border-b border-[#1f3f3a]/15"
    >
      <div className="relative max-w-6xl mx-auto px-4">
        <div
          className={`text-center mb-10 sm:mb-14 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1f3f3a] max-w-3xl mx-auto">
            {t("home.stats.heading")}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-10 sm:mb-14">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              stat={stat}
              isVisible={isVisible}
              index={index}
            />
          ))}
        </div>

        <div className="mb-10 sm:mb-14 bg-[#f7f9f8] border border-[#1f3f3a]/15 rounded-2xl p-6 sm:p-8 md:p-10 w-full">
          <p className="text-base md:text-lg leading-relaxed text-[#1f3f3a] text-left max-w-3xl mx-auto">
            {t("home.stats.paragraph")}
          </p>
        </div>

        <div
          className={`text-right transition-all duration-700 ease-out delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <Link
            to="/about"
            className="inline-flex items-center gap-2 bg-[#1f3f3a] text-white font-semibold px-6 py-3 sm:px-8 sm:py-3.5 text-sm sm:text-base rounded-full
              hover:bg-[#1f3f3a]/80 hover:shadow-lg hover:scale-105
              active:scale-95 transition-all duration-300"
          >
            {t("home.stats.cta")}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
