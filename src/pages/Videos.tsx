import { useEffect, useRef, useState } from "react";
import { videos } from "../data/videos";
import VideoCard from "../components/VideoCard";
import VideoLightbox from "../components/VideoLightbox";

const Videos = () => {
  const gridRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

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
      <section className="relative bg-[#26b462] text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-24 -left-24 w-72 h-72 md:w-96 md:h-96 bg-[#e6f4ec]/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 md:w-96 md:h-96 bg-[#e6f4ec]/15 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-3">შეფასებები</h1>
          <p className="text-[#e6f4ec] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            ჩვენთვის ყველაზე მნიშვნელოვანი მომხმარებლის ნდობა და კმაყოფილებაა.
            სწორედ ამიტომ თითოეული დასრულებული პროექტი რეალური ადამიანების
            გამოცდილებით ფასდება.
          </p>
        </div>
      </section>

      <section ref={gridRef} className="bg-[#e6f4ec] py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video, i) => (
              <div
                key={video.id}
                className={
                  isVisible
                    ? "animate-[fadeSlideUp_0.6s_ease-out_both]"
                    : "opacity-0"
                }
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <VideoCard video={video} onPlay={setActiveId} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <VideoLightbox youtubeId={activeId} onClose={() => setActiveId(null)} />
    </div>
  );
};

export default Videos;
