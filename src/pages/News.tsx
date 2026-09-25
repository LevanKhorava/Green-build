import { useEffect, useRef, useState } from "react";
import { formatDate } from "../data/news";
import { useNews } from "../hooks/useNews";
import { useText } from "../hooks/siteTexts";

const News = () => {
  const gridRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { items } = useNews();
  const t = useText();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (gridRef.current) observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      {/* Header */}
      <section className="relative bg-white text-[#1f3f3a] overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-3">{t("newsPage.title")}</h1>
          <p className="text-[#1f3f3a] text-base md:text-lg max-w-2xl mx-auto">
            {t("newsPage.intro")}
          </p>
        </div>
      </section>

      {/* News Grid */}
      <section ref={gridRef} className="bg-white py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, i) => (
              <article
                key={item.id}
                className={`group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100
                  hover:shadow-lg hover:-translate-y-1 transition-all duration-300
                  ${isVisible ? "animate-[fadeSlideUp_0.6s_ease-out_both]" : "opacity-0"}`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <span className="inline-block text-xs font-medium text-[#1f3f3a] bg-[#e6f4ec] px-3 py-1 rounded-full mb-3">
                    {formatDate(item.date)}
                  </span>
                  <h3 className="text-lg font-bold text-[#1f3f3a] mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#1f3f3a] leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default News;
