import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

interface NewsItem {
  id: number;
  title: string;
  description: string;
  date: string;
  imageUrl: string;
}

const news: NewsItem[] = [
  {
    id: 1,
    title: "ახალი პროექტის დაწყება ვაკეში",
    description:
      "გრინ ბილდმა დაიწყო ახალი საცხოვრებელი კომპლექსის მშენებლობა ვაკის პრესტიჟულ უბანში.",
    date: "2026-04-15",
    imageUrl:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    title: "გრინ ჰაუსი II - გაყიდვა დაიწყო",
    description:
      "საბურთალოზე მდებარე გრინ ჰაუსი II-ში ბინების გაყიდვა ოფიციალურად დაიწყო.",
    date: "2026-04-10",
    imageUrl:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    title: "ენერგოეფექტური მშენებლობის სტანდარტები",
    description:
      "ჩვენი კომპანია გადავიდა ენერგოეფექტური მშენებლობის თანამედროვე სტანდარტებზე.",
    date: "2026-03-28",
    imageUrl:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=400&fit=crop",
  },
  {
    id: 4,
    title: "წლის საუკეთესო დეველოპერის ჯილდო",
    description:
      "გრინ ბილდმა მიიღო წლის საუკეთესო დეველოპერის ჯილდო ქართული ბიზნეს ასოციაციისგან.",
    date: "2026-03-15",
    imageUrl:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop",
  },
  {
    id: 5,
    title: "გრინ პარკის მშენებლობა დასრულდა",
    description:
      "ნუცუბიძეზე მდებარე გრინ პარკის მშენებლობა წარმატებით დასრულდა და ბინები ჩაბარდა.",
    date: "2026-03-01",
    imageUrl:
      "https://images.unsplash.com/photo-1486718448742-163732cd1544?w=600&h=400&fit=crop",
  },
];

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("ka-GE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const NewsCard = ({
  item,
  isActive,
}: {
  item: NewsItem;
  isActive: boolean;
}) => {
  return (
    <div
      className={`rounded-2xl overflow-hidden transition-all duration-500 h-96 flex flex-col ${
        isActive
          ? "shadow-2xl shadow-green-500/20 border-2 border-green-500 scale-105"
          : "shadow-md border border-white/10 scale-95 opacity-60"
      }`}
    >
      <div className="h-48 shrink-0 overflow-hidden relative">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500"
          loading="lazy"
        />
        <div
          className={`absolute inset-0 transition-colors duration-500 ${
            isActive
              ? "bg-linear-to-t from-green-900/60 to-transparent"
              : "bg-linear-to-t from-gray-900/60 to-transparent"
          }`}
        />
        <span
          className={`absolute bottom-3 left-3 text-xs font-medium px-3 py-1 rounded-full transition-colors duration-500 ${
            isActive
              ? "bg-green-500 text-white"
              : "bg-white/20 text-white/80 backdrop-blur-sm"
          }`}
        >
          {formatDate(item.date)}
        </span>
      </div>
      <div
        className={`p-5 flex-1 flex flex-col transition-colors duration-500 ${
          isActive ? "bg-white" : "bg-white/90"
        }`}
      >
        <h3
          className={`text-lg font-bold mb-2 line-clamp-2 transition-colors duration-500 ${
            isActive ? "text-gray-900" : "text-gray-600"
          }`}
        >
          {item.title}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-3 flex-1">
          {item.description}
        </p>
        <div
          className={`mt-3 text-sm font-semibold transition-all duration-500 ${
            isActive
              ? "text-green-600 translate-x-0 opacity-100"
              : "text-gray-400 -translate-x-2 opacity-0"
          }`}
        >
          ვრცლად →
        </div>
      </div>
    </div>
  );
};

const NewsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

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
      className="relative bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 py-12 sm:py-16 md:py-24 overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-64 h-64 sm:w-96 sm:h-96 bg-green-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 sm:w-96 sm:h-96 bg-green-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4">
        <div
          className={`text-center mb-10 sm:mb-14 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
            სიახლეები
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            გაეცანით ჩვენს უახლეს ამბებს და მიღწევებს
          </p>
        </div>

        <div
          className={`mb-10 sm:mb-14 transition-all duration-700 ease-out delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <Swiper
            modules={[Autoplay]}
            centeredSlides={true}
            loop={true}
            speed={600}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="news-slider"
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 16 },
              768: { slidesPerView: 1.5, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 32 },
            }}
          >
            {news.map((item, index) => (
              <SwiperSlide key={item.id}>
                <NewsCard item={item} isActive={index === activeIndex} />
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
            to="/news"
            className="inline-flex items-center gap-2 border-2 border-white text-white font-semibold
              px-6 py-3 sm:px-8 sm:py-3.5 text-sm sm:text-base rounded-full
              hover:bg-white hover:text-gray-900 hover:shadow-lg hover:scale-105
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

export default NewsSection;
