import { Link, useParams } from "react-router-dom";
import { getFloorById, statusLabels } from "../data/floors";

const FloorDetail = () => {
  const { id, floorId } = useParams<{ id: string; floorId: string }>();
  const floor = getFloorById(Number(floorId));

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
    </div>
  );
};

export default FloorDetail;
