import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getFloorById, statusLabels } from "../data/floors";
import flatImg from "../assets/flat.png";

const flatImages = import.meta.glob("../assets/*.png", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const getImageForLabel = (label: string): string => {
  const num = label.replace(/^ბინა\s+/, "").trim();
  return flatImages[`../assets/${num}.png`] ?? flatImg;
};

const FloorDetail = () => {
  const { id, floorId } = useParams<{ id: string; floorId: string }>();
  const floor = getFloorById(Number(floorId));
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string>(flatImg);

  if (!floor) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-[#333333] mb-4">
          სართული ვერ მოიძებნა
        </h1>
        <p className="text-[#333333] mb-6">მითითებული სართული არ არსებობს.</p>
        <Link
          to={`/projects/${id}`}
          className="inline-flex items-center gap-2 text-[#1f3f3a] font-semibold hover:text-[#1f3f3a]/70 transition-colors"
        >
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
              d="M7 16l-4-4m0 0l4-4m-4 4h18"
            />
          </svg>
          პროექტზე დაბრუნება
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 bg-[#f7f9f8]">
      <Link
        to={`/projects/${id}`}
        className="inline-flex items-center gap-2 text-[#1f3f3a] font-medium hover:text-[#1f3f3a]/70 transition-colors mb-6"
      >
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
            d="M7 16l-4-4m0 0l4-4m-4 4h18"
          />
        </svg>
        პროექტზე დაბრუნება
      </Link>

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8 animate-[fadeSlideUp_0.4s_ease-out_both]">
        <h1 className="font-bold mb-4">{floor.block} Block</h1>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#333333]">
            {floor.label}
          </h2>
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full ${
              floor.status === "available"
                ? "bg-[#e6f4ec] text-[#1f3f3a]"
                : floor.status === "coming-soon"
                  ? "bg-amber-100 text-amber-700"
                  : "bg-gray-100 text-[#333333]"
            }`}
          >
            {statusLabels[floor.status]}
          </span>
        </div>
        <p className="text-[#333333]">
          ბინების რაოდენობა: {floor.apartmentCount}
        </p>
      </div>

      <h2 className="text-xl sm:text-2xl font-bold text-[#333333] mt-10 mb-6">
        ბინები
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {floor.apartments
          .filter((apt) => !apt.sold)
          .map((apt, i) => (
            <div
              key={apt.id}
              className="rounded-2xl shadow-sm border border-gray-100 bg-white overflow-hidden transition-all duration-300 animate-[fadeSlideUp_0.5s_ease-out_both] cursor-pointer hover:shadow-lg hover:-translate-y-1"
              style={{ animationDelay: `${i * 80}ms` }}
              onClick={() => {
                setLightboxImg(getImageForLabel(apt.label));
                setLightboxOpen(true);
              }}
            >
              <div className="h-44 overflow-hidden">
                <img
                  src={getImageForLabel(apt.label)}
                  alt={apt.label}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold mb-3 text-[#333333]">
                  {apt.label}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-sm text-[#333333]">
                    <span className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-[#e6f4ec]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-[#1f3f3a]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15"
                        />
                      </svg>
                    </span>
                    <span>
                      ოთახები: <strong>{apt.rooms}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#333333]">
                    <span className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-[#e6f4ec]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-[#1f3f3a]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                        />
                      </svg>
                    </span>
                    <span>
                      ფართი: <strong>{apt.size} მ²</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#333333]">
                    <span className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-[#e6f4ec]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-[#1f3f3a]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </span>
                    <span>
                      ხედი:{" "}
                      <strong>
                        {apt.side === "front" ? "წინა" : "უკანა"}
                      </strong>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 animate-[fadeSlideUp_0.3s_ease-out_both]"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src={lightboxImg}
            alt="ბინის გეგმა"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default FloorDetail;
