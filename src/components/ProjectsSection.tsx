import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "გრინ ჰაუსი I",
    description: "თანამედროვე საცხოვრებელი კომპლექსი ვაკეში",
    imageUrl:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    title: "გრინ ჰაუსი II",
    description: "პრემიუმ კლასის ბინები საბურთალოზე",
    imageUrl:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
  },

  {
    id: 4,
    title: "გრინ პლაზა",
    description: "მრავალფუნქციური კომპლექსი გლდანში",
    imageUrl:
      "https://images.unsplash.com/photo-1554435493-93422e8220c8?w=600&h=400&fit=crop",
  },
  {
    id: 5,
    title: "გრინ ტაუერი",
    description: "მაღალსართულიანი საცხოვრებელი ისანში",
    imageUrl:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop",
  },
  {
    id: 6,
    title: "გრინ პარკი",
    description: "პარკთან ახლოს მდებარე კომპლექსი ნუცუბიძეზე",
    imageUrl:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop",
  },
];

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div
      className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100
        hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-80 sm:h-88 flex flex-col"
    >
      <div className="h-48 sm:h-56 shrink-0 overflow-hidden">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <div className="p-4 sm:p-5 flex-1">
        <h3 className="text-lg font-bold text-gray-800 mb-1">
          {project.title}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2">
          {project.description}
        </p>
      </div>
    </div>
  );
};

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
    <section ref={sectionRef} className="bg-white py-12 sm:py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div
          className={`text-center mb-8 sm:mb-12 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
            ჩვენი პროექტები
          </h2>
          <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto">
            ჩვენ ვაშენებთ თანამედროვე და მდგრად შენობებს, რომლებიც აკმაყოფილებს
            უმაღლეს სტანდარტებს
          </p>
        </div>

        <div
          className={`border border-gray-200 rounded-2xl p-4 sm:p-6 mb-8 sm:mb-12 transition-all duration-700 ease-out delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <Swiper
            modules={[Autoplay]}
            spaceBetween={16}
            loop={true}
            speed={4000}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            className="continuous-slider"
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
          >
            {projects.map((project) => (
              <SwiperSlide key={project.id}>
                <ProjectCard project={project} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div
          className={`text-center transition-all duration-700 ease-out delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 bg-green-600 text-white font-semibold
              px-6 py-3 sm:px-8 sm:py-3.5 text-sm sm:text-base rounded-full
              hover:bg-green-700 hover:shadow-lg hover:scale-105
              active:scale-95 transition-all duration-300"
          >
            მეტის ნახვა
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
