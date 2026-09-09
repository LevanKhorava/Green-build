import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import buildingImg from "../assets/greenBuildActive.jpg";

const projectsList = [
  {
    id: 1,
    title: "სახლი ალუბლებზე",
    imageUrl: buildingImg,
    status: "დასრულებული",
    location: "ვაზისუბანი, ალუბლების ქ. N9",
  },
];

const GreenBuildBadge = () => (
  <div className="absolute -top-1 -right-1 w-30 h-30 overflow-hidden pointer-events-none z-20">
    {/* Fold shadow — top */}
    <span
      className="absolute top-0 left-4.5 w-1.5 h-1.5 bg-[#134a2f]"
      style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
    />
    {/* Fold shadow — right */}
    <span
      className="absolute bottom-4.5 right-0 w-1.5 h-1.5 bg-[#134a2f]"
      style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
    />
    {/* Main ribbon */}
    <span className="absolute top-6.5 -right-6.5 w-40 rotate-45 bg-[#26b462] text-white text-[10px] font-bold text-center py-1 shadow-md tracking-wider">
      GreenBuild
    </span>
  </div>
);

const Projects = () => {
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
      <section className="relative bg-white text-[#1f3f3a] overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-3">
            ჩვენი პროექტები
          </h1>
          <p className="text-[#1f3f3a] text-base md:text-lg max-w-xl mx-auto">
            აღმოაჩინეთ ჩვენი მიმდინარე და დასრულებული პროექტები
          </p>
        </div>
      </section>

      {/* Projects List */}
      <section ref={gridRef} className="bg-white py-12 md:py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projectsList.map((project, i) => (
              <div
                key={project.id}
                className={`group relative transition-transform duration-300 hover:-translate-y-1
                  ${isVisible ? "animate-[fadeSlideUp_0.6s_ease-out_both]" : "opacity-0"}`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <Link
                  to={`/projects/${project.id}`}
                  className="block bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100
                    transition-shadow duration-300 group-hover:shadow-xl"
                >
                  <div className="p-5 flex flex-col">
                    {/* Name + address above image */}
                    <div className="mb-4">
                      <h2 className="text-lg md:text-xl font-bold text-[#1f3f3a] mb-1">
                        {project.title}
                      </h2>
                      <div className="flex items-center gap-1.5 text-xs text-[#1f3f3a]/70">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
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
                        {project.location}
                      </div>
                    </div>

                    {/* Image */}
                    <div className="h-48 md:h-56 overflow-hidden rounded-xl bg-[#1f3f3a] mb-4">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>

                    {/* Status + CTA */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#e6f4ec] text-[#1f3f3a]">
                        {project.status}
                      </span>
                      <span className="inline-flex items-center gap-2 bg-[#1f3f3a] text-white font-semibold px-4 py-2 rounded-full text-sm hover:bg-[#1f3f3a]/80 transition-colors">
                        აირჩიე სახლი
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
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
                <GreenBuildBadge />
              </div>
            ))}

            {/* Coming Soon card */}
            <div
              className={`group relative transition-transform duration-300
                ${isVisible ? "animate-[fadeSlideUp_0.6s_ease-out_both]" : "opacity-0"}`}
              style={{ animationDelay: `${projectsList.length * 100}ms` }}
            >
              <div className="block bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <div className="p-5 flex flex-col">
                  {/* Placeholder name + subtitle */}
                  <div className="mb-4">
                    <h2 className="text-lg md:text-xl font-bold text-[#1f3f3a]/60 mb-1">
                      ახალი პროექტი
                    </h2>
                    <div className="flex items-center gap-1.5 text-xs text-[#1f3f3a]/40">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
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
                      ლოკაცია მალე გამოცხადდება
                    </div>
                  </div>

                  {/* Coming soon background — clean mint with blueprint grid */}
                  <div className="h-48 md:h-56 overflow-hidden rounded-xl mb-4 relative bg-[#e6f4ec] flex items-center justify-center border border-[#1f3f3a]/10">
                    {/* Blueprint grid overlay */}
                    <div
                      className="absolute inset-0 opacity-40"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(31,63,58,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(31,63,58,0.15) 1px, transparent 1px)",
                        backgroundSize: "24px 24px",
                      }}
                    />
                    {/* Center content */}
                    <div className="relative flex flex-col items-center gap-3 z-10">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-14 h-14 text-[#1f3f3a]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 3v3M8 6c-2 1-3.5 3-3.5 6v2h15v-2c0-3-1.5-5-3.5-6M3.5 14h17v2h-17z"
                        />
                      </svg>
                      <span className="text-[#1f3f3a] font-bold text-xl md:text-2xl tracking-wide">
                        Coming Soon
                      </span>
                    </div>
                  </div>

                  {/* Status + inactive CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#f7f9f8] text-[#1f3f3a]/60 border border-[#1f3f3a]/15">
                      დაგეგმილი
                    </span>
                    <span className="inline-flex items-center gap-2 bg-[#1f3f3a]/30 text-white font-semibold px-4 py-2 rounded-full text-sm">
                      Coming Soon
                    </span>
                  </div>
                </div>
              </div>
              <GreenBuildBadge />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
