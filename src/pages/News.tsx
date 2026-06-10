import { useEffect, useRef, useState } from "react";
import { news, formatDate } from "../data/news";

const News = () => {
  const gridRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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
      <section className="relative bg-[#26b462] text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-24 -right-24 w-72 h-72 md:w-96 md:h-96 bg-[#e6f4ec]/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 md:w-96 md:h-96 bg-[#e6f4ec]/15 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-3">სიახლეები</h1>
          <p className="text-[#e6f4ec] text-base md:text-lg max-w-2xl mx-auto">
            გაიცანით გრინბილდის უახლეს სიახლეებს, მიმდინარე აქტივობებსა და
            სამომავლო პროექტებს.
          </p>
        </div>
      </section>

      {/* News Grid */}
      <section ref={gridRef} className="bg-[#f7f9f8] py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item, i) => (
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
                  <h3 className="text-lg font-bold text-[#333333] mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#333333] leading-relaxed line-clamp-3">
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
