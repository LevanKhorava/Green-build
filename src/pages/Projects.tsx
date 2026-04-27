import { useState } from "react";
import buildingImg from "../assets/greenBuild.png";

interface Floor {
  id: number;
  label: string;
  clipPath: string;
  apartmentCount: number;
  status: "available" | "sold-out" | "coming-soon";
}

const statusLabels: Record<string, string> = {
  available: "ხელმისაწვდომია",
  "sold-out": "გაყიდულია",
  "coming-soon": "მალე",
};

const floors: Floor[] = [
  {
    id: 7,
    label: "სართული 7",
    clipPath: "polygon(20% 45%, 75% 50.5%, 74% 55.5%, 20% 50%)",
    apartmentCount: 6,
    status: "available",
  },
  {
    id: 6,
    label: "სართული 6",
    clipPath: "polygon(20% 50%, 74% 55.5%, 73% 60.5%, 20% 55%)",
    apartmentCount: 6,
    status: "available",
  },
  {
    id: 5,
    label: "სართული 5",
    clipPath: "polygon(20% 55%, 73% 60.5%, 72% 65.5%, 20% 60%)",
    apartmentCount: 8,
    status: "coming-soon",
  },
  {
    id: 4,
    label: "სართული 4",
    clipPath: "polygon(20% 60%, 72% 65.5%, 71% 70.5%, 20% 65%)",
    apartmentCount: 8,
    status: "available",
  },
  {
    id: 3,
    label: "სართული 3",
    // clipPath: "polygon(20% 70%, 71% 73.1%, 70% 78.1%, 20% 75%)",
    clipPath: "polygon(20.5% 66%, 71.8% 70.5%, 72% 75.5%, 20.2% 72.5%)",
    apartmentCount: 8,
    status: "sold-out",
  },
  {
    id: 2,
    label: "სართული 2",
    clipPath: "polygon(20% 73%, 72% 75.8%, 72% 80%, 20% 79%)",
    apartmentCount: 8,
    status: "available",
  },
  {
    id: 1,
    label: "სართული 1",
    clipPath: "polygon(19.5% 80%, 73% 80.5%, 74% 85.5%, 20% 85%)",
    apartmentCount: 4,
    status: "sold-out",
  },
];

function getPolygonCenter(clipPath: string) {
  const nums = clipPath.match(/[\d.]+/g)!.map(Number);
  const ys = [nums[1], nums[3], nums[5], nums[7]];
  return { left: nums[0], top: (Math.min(...ys) + Math.max(...ys)) / 2 };
}

const Projects = () => {
  const [hoveredFloor, setHoveredFloor] = useState<number | null>(null);
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null);

  const activeFloor = floors.find((f) => f.id === selectedFloor);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">პროექტები</h1>
      <p className="text-gray-500 mb-8">აირჩიეთ სართული დეტალების სანახავად</p>

      <div className="relative w-full max-w-3xl mx-auto select-none bg-gray-900 rounded-xl overflow-hidden">
        <img
          src={buildingImg}
          alt="GreenBuild საცხოვრებელი კორპუსი"
          className="w-full h-auto block"
          draggable={false}
        />

        {floors.map((floor) => {
          const isHovered = hoveredFloor === floor.id;
          const isSelected = selectedFloor === floor.id;

          return (
            <div
              key={floor.id}
              role="button"
              tabIndex={0}
              aria-label={`Floor ${floor.id} — ${statusLabels[floor.status]}`}
              className={`absolute transition-all duration-300 cursor-pointer ${
                isSelected
                  ? "bg-green-500/30"
                  : isHovered
                    ? "bg-green-500/20"
                    : ""
              }`}
              style={{
                clipPath: floor.clipPath,
                inset: 0,
              }}
              onMouseEnter={() => setHoveredFloor(floor.id)}
              onMouseLeave={() => setHoveredFloor(null)}
              onClick={() =>
                setSelectedFloor(selectedFloor === floor.id ? null : floor.id)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedFloor(
                    selectedFloor === floor.id ? null : floor.id,
                  );
                }
              }}
            >
              {(() => {
                const center = getPolygonCenter(floor.clipPath);
                return (
                  <span
                    className={`absolute text-white text-xs sm:text-sm font-semibold
                      bg-green-600/90 px-2 py-0.5 sm:px-3 sm:py-1 rounded-md whitespace-nowrap
                      -translate-y-1/2 transition-opacity duration-300 ${
                        isSelected || isHovered ? "opacity-100" : "opacity-0"
                      }`}
                    style={{
                      left: `${center.left + 1}%`,
                      top: `${center.top}%`,
                    }}
                  >
                    {floor.label}
                  </span>
                );
              })()}
            </div>
          );
        })}
      </div>

      {activeFloor && (
        <div
          key={activeFloor.id}
          className="mt-6 max-w-3xl mx-auto bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8 animate-[fadeSlideUp_0.4s_ease-out_both]"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              {activeFloor.label}
            </h2>
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full ${
                activeFloor.status === "available"
                  ? "bg-green-100 text-green-700"
                  : activeFloor.status === "coming-soon"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-gray-100 text-gray-500"
              }`}
            >
              {statusLabels[activeFloor.status]}
            </span>
          </div>
          <p className="text-gray-500">
            ბინების რაოდენობა: {activeFloor.apartmentCount}
          </p>
        </div>
      )}
    </div>
  );
};

export default Projects;
