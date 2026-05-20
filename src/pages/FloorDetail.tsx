import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getFloorById, statusLabels } from "../data/floors";
import flatImg from "../assets/flat.png";

const FloorDetail = () => {
  const { id, floorId } = useParams<{ id: string; floorId: string }>();
  const floor = getFloorById(Number(floorId));
  const [lightboxOpen, setLightboxOpen] = useState(false);

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
        {floor.apartments.map((apt, i) => (
          <div
            key={apt.id}
            className={`rounded-2xl shadow-sm border overflow-hidden transition-all duration-300 animate-[fadeSlideUp_0.5s_ease-out_both] cursor-pointer ${
              apt.sold
                ? "bg-white border-gray-100"
                : "bg-white border-gray-100 hover:shadow-lg hover:-translate-y-1"
            }`}
            style={{ animationDelay: `${i * 80}ms` }}
            onClick={() => setLightboxOpen(true)}
          >
            <div className="h-44 overflow-hidden relative">
              <img
                src={flatImg}
                alt={apt.label}
                className="w-full h-full object-cover"
              />
              {apt.sold && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[#ff0000] text-3xl font-black tracking-wider animate-[pulse_2s_ease-in-out_infinite] drop-shadow-[0_0_8px_rgba(255,0,0,0.6)]">
                    გაყიდულია
                  </span>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3
                className={`text-lg font-bold mb-3 ${apt.sold ? "text-red-600" : "text-[#333333]"}`}
              >
                {apt.label}
              </h3>
              <div className="space-y-2">
                <div
                  className={`flex items-center gap-3 text-sm ${apt.sold ? "text-red-600/80" : "text-[#333333]"}`}
                >
                  <span
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${apt.sold ? "bg-red-100" : "bg-[#e6f4ec]"}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`w-4 h-4 ${apt.sold ? "text-red-600" : "text-[#1f3f3a]"}`}
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
                <div
                  className={`flex items-center gap-3 text-sm ${apt.sold ? "text-red-600/80" : "text-[#333333]"}`}
                >
                  <span
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${apt.sold ? "bg-red-100" : "bg-[#e6f4ec]"}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`w-4 h-4 ${apt.sold ? "text-red-600" : "text-[#1f3f3a]"}`}
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
                <div
                  className={`flex items-center gap-3 text-sm ${apt.sold ? "text-red-600/80" : "text-[#333333]"}`}
                >
                  <span
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${apt.sold ? "bg-red-100" : "bg-[#e6f4ec]"}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`w-4 h-4 ${apt.sold ? "text-red-600" : "text-[#1f3f3a]"}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                  <span>
                    სააბაზანო: <strong>{apt.bathrooms}</strong>
                  </span>
                </div>
                <div
                  className={`flex items-center gap-3 text-sm ${apt.sold ? "text-red-600/80" : "text-[#333333]"}`}
                >
                  <span
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${apt.sold ? "bg-red-100" : "bg-[#e6f4ec]"}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`w-4 h-4 ${apt.sold ? "text-red-600" : "text-[#1f3f3a]"}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                      />
                    </svg>
                  </span>
                  <span>
                    ფასი: <strong>${apt.pricePerSqm}/მ²</strong>
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
            src={flatImg}
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
