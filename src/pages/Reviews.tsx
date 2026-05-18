import { useEffect, useRef, useState } from "react";
import { reviews, Stars } from "../data/reviews";

const avgRating =
  Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) * 10) / 10;

const Reviews = () => {
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
          <div className="absolute -top-24 -left-24 w-72 h-72 md:w-96 md:h-96 bg-[#e6f4ec]/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 md:w-96 md:h-96 bg-[#e6f4ec]/15 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-3">შეფასებები</h1>
          <p className="text-[#e6f4ec] text-base md:text-lg max-w-xl mx-auto">
            რას ამბობენ ჩვენი მომხმარებლები
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-[#f7f9f8] border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
            <div className="flex items-center gap-3">
              <span className="text-4xl font-bold text-[#333333]">
                {avgRating}
              </span>
              <div>
                <Stars rating={Math.round(avgRating)} />
                <p className="text-xs text-[#333333] mt-1">საშუალო შეფასება</p>
              </div>
            </div>
            <div className="h-10 w-px bg-gray-200 hidden sm:block" />
            <div className="text-center">
              <span className="text-2xl font-bold text-[#333333]">
                {reviews.length}
              </span>
              <p className="text-xs text-[#333333] mt-1">შეფასება</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section ref={gridRef} className="bg-[#e6f4ec] py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <div
                key={review.id}
                className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-6
                  hover:shadow-lg hover:-translate-y-1 transition-all duration-300
                  ${isVisible ? "animate-[fadeSlideUp_0.6s_ease-out_both]" : "opacity-0"}`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <Stars rating={review.rating} />
                <p className="text-[#333333] text-sm leading-relaxed mt-4 mb-6">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <img
                    src={review.imageUrl}
                    alt={review.name}
                    className="w-11 h-11 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div>
                    <p className="text-sm font-bold text-[#333333]">
                      {review.name}
                    </p>
                    <p className="text-xs text-[#333333]">
                      {review.role} — {review.project}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reviews;
