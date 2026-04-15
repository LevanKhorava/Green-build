import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

interface StatItem {
  label: string;
  value: number;
  suffix?: string;
}

const stats: StatItem[] = [
  { label: "აშენებული შენობა", value: 3 },
  { label: "გაყიდული ბინა", value: 250, suffix: "+" },
  { label: "კმაყოფილი მომხმარებელი", value: 1500, suffix: "+" },
  { label: "წლიანი გამოცდილება", value: 8 },
];

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
        className={`h-full bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center border border-white/10
          hover:bg-white/20 hover:border-white/30 hover:scale-105 hover:-translate-y-1
          transition-all duration-500 ease-out
          ${isVisible ? "animate-[fadeSlideUp_0.6s_ease-out_both]" : "opacity-0 translate-y-8"}`}
        style={{ animationDelay: `${index * 150}ms` }}
      >
        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 sm:mb-2 tabular-nums">
          {count.toLocaleString()}
          {stat.suffix && <span className="text-green-300">{stat.suffix}</span>}
        </div>
        <div className="text-green-200 text-xs sm:text-sm md:text-base font-medium tracking-wide uppercase">
          {stat.label}
        </div>
        <div className="absolute inset-0 rounded-2xl bg-green-400/0 group-hover:bg-green-400/5 transition-colors duration-500" />
      </div>
    </div>
  );
};

const StatsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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
      className="relative bg-linear-to-br from-green-800 via-green-900 to-emerald-950 py-12 sm:py-16 md:py-24 lg:py-28 overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-green-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-100 sm:h-100 md:w-150 md:h-150 bg-green-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4">
        <div
          className={`text-center mb-14 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4"></h2>
          <p className="text-green-200/80 text-base sm:text-lg max-w-2xl mx-auto">
            წლების განმავლობაში ჩვენ შევქმენით საიმედო სივრცეები ათასობით
            ოჯახისთვის
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-10 sm:mb-14">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              stat={stat}
              isVisible={isVisible}
              index={index}
            />
          ))}
        </div>

        <div
          className={`text-center transition-all duration-700 ease-out delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <Link
            to="/about"
            className="inline-flex items-center gap-2 bg-white text-green-800 font-semibold px-6 py-3 sm:px-8 sm:py-3.5 text-sm sm:text-base rounded-full
              hover:bg-green-50 hover:shadow-lg hover:shadow-green-900/30 hover:scale-105
              active:scale-95 transition-all duration-300"
          >
            მეტის ნახვა
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
