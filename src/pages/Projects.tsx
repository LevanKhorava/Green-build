import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import buildingImg from "../assets/greenBuild.png";

const projectsList = [
  {
    id: 1,
    title: "გრინ ბილდის საცხოვრებელი კომპლექსი",
    description:
      "თანამედროვე საცხოვრებელი კომპლექსი ორი ბლოკით (A და B). 7-10 სართულიანი შენობები ბინების ფართო არჩევანით — სტუდიოდან ოთხოთახიანამდე.",
    imageUrl: buildingImg,
    status: "მიმდინარე",
    totalApartments: 82,
    location: "თბილისი",
  },
];

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
      <section className="relative bg-linear-to-br from-green-700 to-green-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-24 -left-24 w-72 h-72 md:w-96 md:h-96 bg-green-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 md:w-96 md:h-96 bg-emerald-400/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-3">
            ჩვენი პროექტები
          </h1>
          <p className="text-green-100 text-base md:text-lg max-w-xl mx-auto">
            აღმოაჩინეთ ჩვენი მიმდინარე და დასრულებული პროექტები
          </p>
        </div>
      </section>

      {/* Projects List */}
      <section ref={gridRef} className="bg-white py-12 md:py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 gap-8">
            {projectsList.map((project, i) => (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                className={`group block bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100
                  hover:shadow-xl hover:-translate-y-1 transition-all duration-300
                  ${isVisible ? "animate-[fadeSlideUp_0.6s_ease-out_both]" : "opacity-0"}`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="md:flex">
                  <div className="md:w-1/2 h-64 md:h-auto overflow-hidden bg-gray-900">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700">
                        {project.status}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
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
                      </span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
                      {project.title}
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-6 mb-6">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 text-green-600"
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
                        <span>{project.totalApartments} ბინა</span>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-2 text-green-700 font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                      დეტალურად
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
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
