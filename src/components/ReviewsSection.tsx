import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { reviews, Stars } from "../data/reviews";

const previewReviews = reviews.slice(0, 3);

const ReviewsSection = () => {
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
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-gray-50 py-12 sm:py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div
          className={`text-center mb-8 sm:mb-12 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
            შეფასებები
          </h2>
          <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto">
            რას ამბობენ ჩვენი მომხმარებლები
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 sm:mb-12">
          {previewReviews.map((review, i) => (
            <div
              key={review.id}
              className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-6
                hover:shadow-lg hover:-translate-y-1 transition-all duration-300
                ${isVisible ? "animate-[fadeSlideUp_0.6s_ease-out_both]" : "opacity-0"}`}
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <Stars rating={review.rating} />
              <p className="text-gray-600 text-sm leading-relaxed mt-4 mb-6">
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
                  <p className="text-sm font-bold text-gray-800">
                    {review.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {review.role} — {review.project}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`text-center transition-all duration-700 ease-out delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <Link
            to="/reviews"
            className="inline-flex items-center gap-2 bg-green-600 text-white font-semibold
              px-6 py-3 sm:px-8 sm:py-3.5 text-sm sm:text-base rounded-full
              hover:bg-green-700 hover:shadow-lg hover:scale-105
              active:scale-95 transition-all duration-300"
          >
            ყველა შეფასება
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
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
