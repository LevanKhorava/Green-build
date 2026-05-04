import { useEffect, useRef, useState } from "react";

interface Review {
  id: number;
  name: string;
  role: string;
  rating: number;
  text: string;
  imageUrl: string;
  project: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "ნინო გელაშვილი",
    role: "ბინის მფლობელი",
    rating: 5,
    text: "გრინ ჰაუსი I-ში ბინა შევიძინე 2020 წელს. მშენებლობის ხარისხმა და ვადების დაცვამ ძალიან კარგი შთაბეჭდილება მოახდინა. უაღრესად კმაყოფილი ვარ!",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    project: "გრინ ჰაუსი I",
  },
  {
    id: 2,
    name: "გიორგი ჩხაიძე",
    role: "ინვესტორი",
    rating: 5,
    text: "რამდენიმე ბინა შევიძინე საინვესტიციო მიზნით. Green Build-ის პროექტები ყოველთვის მაღალი ხარისხით გამოირჩევა და ღირებულება სტაბილურად იზრდება.",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    project: "გრინ ჰაუსი II",
  },
  {
    id: 3,
    name: "მარიამ კვარაცხელია",
    role: "ბინის მფლობელი",
    rating: 4,
    text: "გრინ პარკში ცხოვრება ნამდვილი სიამოვნებაა. პარკთან სიახლოვე, მშვიდი გარემო და თანამედროვე ინფრასტრუქტურა — ყველაფერი რაც საჭიროა.",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    project: "გრინ პარკი",
  },
  {
    id: 4,
    name: "დავით ბერიძე",
    role: "ბინის მფლობელი",
    rating: 5,
    text: "პროფესიონალური მომსახურება ყიდვის პროცესის თავიდან ბოლომდე. გუნდი ძალიან ყურადღებიანი იყო და ყველა კითხვას დროულად პასუხობდა.",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    project: "გრინ ტაუერი",
  },
  {
    id: 5,
    name: "ანა წიკლაური",
    role: "ბინის მფლობელი",
    rating: 5,
    text: "ჩვენი ოჯახისთვის საუკეთესო გადაწყვეტილება იყო ბინის შეძენა გრინ პლაზაში. ბავშვების სათამაშო მოედანი, პარკინგი და მაღაზიები — ყველაფერი ახლოსაა.",
    imageUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    project: "გრინ პლაზა",
  },
  {
    id: 6,
    name: "ლევან მაღლაკელიძე",
    role: "ინვესტორი",
    rating: 4,
    text: "Green Build-თან თანამშრომლობა სასიამოვნო გამოცდილებაა. გამჭვირვალე პირობები, კარგი ფასი და მაღალი ხარისხი — რაც ინვესტორს სჭირდება.",
    imageUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    project: "გრინ ჰაუსი II",
  },
];

const avgRating =
  Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) * 10) / 10;

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          className={`w-5 h-5 ${i < rating ? "text-yellow-400" : "text-gray-200"}`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

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
      <section className="relative bg-linear-to-br from-green-700 to-green-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-24 -left-24 w-72 h-72 md:w-96 md:h-96 bg-green-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 md:w-96 md:h-96 bg-emerald-400/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-3">შეფასებები</h1>
          <p className="text-green-100 text-base md:text-lg max-w-xl mx-auto">
            რას ამბობენ ჩვენი მომხმარებლები
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
            <div className="flex items-center gap-3">
              <span className="text-4xl font-bold text-gray-800">
                {avgRating}
              </span>
              <div>
                <Stars rating={Math.round(avgRating)} />
                <p className="text-xs text-gray-400 mt-1">საშუალო შეფასება</p>
              </div>
            </div>
            <div className="h-10 w-px bg-gray-200 hidden sm:block" />
            <div className="text-center">
              <span className="text-2xl font-bold text-gray-800">
                {reviews.length}
              </span>
              <p className="text-xs text-gray-400 mt-1">შეფასება</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section ref={gridRef} className="bg-gray-50 py-12 md:py-20">
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
        </div>
      </section>
    </div>
  );
};

export default Reviews;
