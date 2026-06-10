import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import buildingImg from "../assets/greenBuild.png";

const ProjectsSection = () => {
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
    <section ref={sectionRef} className="bg-[#f7f9f8] py-12 sm:py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div
          className={`text-center mb-8 sm:mb-12 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#333333] mb-3 sm:mb-4">
            ჩვენი პროექტი
          </h2>
          <p className="text-[#333333] text-base sm:text-lg max-w-2xl mx-auto">
            თანამედროვე საცხოვრებელი კომპლექსი, შექმნილი კომფორტული და მშვიდი
            ცხოვრებისათვის
          </p>
        </div>

        <Link
          to="/projects/1"
          className={`group block bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100
            hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 mb-8 sm:mb-12
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: "200ms", transitionDuration: "700ms" }}
        >
          <div className="md:flex">
            <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden bg-[#1f3f3a]">
              <img
                src={buildingImg}
                alt="სახლი ალუბლებზე"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-[#26b462] text-white shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  დასრულებული
                </span>
              </div>
            </div>

            <div className="md:w-1/2 p-6 sm:p-8 md:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-sm text-[#1f3f3a] font-medium mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                ვაზისუბანი, ალუბლების ქ. N9
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-[#333333] mb-3">
                სახლი ალუბლებზე
              </h3>

              <p className="text-[#333333] text-sm sm:text-base leading-relaxed mb-6">
                თანამედროვე საცხოვრებელი კომპლექსი ფუნქციური დაგეგმარებითა და
                ხარისხიანი სამშენებლო სტანდარტებით.
              </p>

              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="text-center bg-[#e6f4ec] rounded-xl py-3">
                  <div className="text-xl sm:text-2xl font-bold text-[#1f3f3a]">
                    142
                  </div>
                  <div className="text-[11px] sm:text-xs text-[#333333]">
                    ბინა
                  </div>
                </div>
                <div className="text-center bg-[#e6f4ec] rounded-xl py-3">
                  <div className="text-xl sm:text-2xl font-bold text-[#1f3f3a]">
                    2
                  </div>
                  <div className="text-[11px] sm:text-xs text-[#333333]">
                    ბლოკი
                  </div>
                </div>
                <div className="text-center bg-[#e6f4ec] rounded-xl py-3">
                  <div className="text-xl sm:text-2xl font-bold text-[#1f3f3a]">
                    11
                  </div>
                  <div className="text-[11px] sm:text-xs text-[#333333]">
                    სართული
                  </div>
                </div>
              </div>

              <span className="inline-flex items-center gap-2 text-[#1f3f3a] font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                პროექტის ნახვა
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
              </span>
            </div>
          </div>
        </Link>

        <div
          className={`text-center transition-all duration-700 ease-out delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 bg-[#1f3f3a] text-white font-semibold
              px-6 py-3 sm:px-8 sm:py-3.5 text-sm sm:text-base rounded-full
              hover:bg-[#1f3f3a]/80 hover:shadow-lg hover:scale-105
              active:scale-95 transition-all duration-300"
          >
            ყველა პროექტი
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

export default ProjectsSection;
