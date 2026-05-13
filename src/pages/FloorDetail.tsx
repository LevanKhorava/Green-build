import { Link, useParams } from "react-router-dom";
import { getFloorById, statusLabels } from "../data/floors";

const FloorDetail = () => {
  const { id, floorId } = useParams<{ id: string; floorId: string }>();
  const floor = getFloorById(Number(floorId));

  if (!floor) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          სართული ვერ მოიძებნა
        </h1>
        <p className="text-gray-500 mb-6">მითითებული სართული არ არსებობს.</p>
        <Link
          to={`/projects/${id}`}
          className="inline-flex items-center gap-2 text-green-700 font-semibold hover:text-green-800 transition-colors"
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
    <div className="max-w-5xl mx-auto px-4 py-12 bg-white">
      <Link
        to={`/projects/${id}`}
        className="inline-flex items-center gap-2 text-green-700 font-medium hover:text-green-800 transition-colors mb-6"
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
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            {floor.label}
          </h2>
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full ${
              floor.status === "available"
                ? "bg-green-100 text-green-700"
                : floor.status === "coming-soon"
                  ? "bg-amber-100 text-amber-700"
                  : "bg-gray-100 text-gray-500"
            }`}
          >
            {statusLabels[floor.status]}
          </span>
        </div>
        <p className="text-gray-500">
          ბინების რაოდენობა: {floor.apartmentCount}
        </p>
      </div>
    </div>
  );
};

export default FloorDetail;
