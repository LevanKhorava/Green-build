import { useState } from "react";
import { createPortal } from "react-dom";
import buildingImg from "../assets/greenBuild.png";

interface Floor {
  id: number;
  label: string;
  clipPath: string;
  apartmentCount: number;
  status: "available" | "sold-out" | "coming-soon";
  block: "A" | "B";
}

const statusLabels: Record<string, string> = {
  available: "ხელმისაწვდომია",
  "sold-out": "გაყიდულია",
  "coming-soon": "მალე",
};

const floorsA: Floor[] = [
  {
    id: 7,
    label: "სართული 7",
    clipPath: "polygon(21.5% 28.9%, 71.4% 43.7%, 71.5% 48.7%, 21.2% 36%)",
    apartmentCount: 6,
    status: "available",
    block: "A",
  },
  {
    id: 6,
    label: "სართული 6",
    clipPath: "polygon(21.2% 36.4%, 71.5% 49%, 71.6% 54%, 21% 43.3%)",
    apartmentCount: 6,
    status: "available",
    block: "A",
  },
  {
    id: 5,
    label: "სართული 5",
    clipPath: "polygon(21% 43.8%, 71.7% 54.5%, 71.8% 59.5%, 20.8% 51%)",
    apartmentCount: 8,
    status: "coming-soon",
    block: "A",
  },
  {
    id: 4,
    label: "სართული 4",
    clipPath: "polygon(20.8% 51.8%, 71.8% 59.8%, 71.8% 64.7%, 20.5% 59%)",
    apartmentCount: 8,
    status: "available",
    block: "A",
  },
  {
    id: 3,
    label: "სართული 3",
    // clipPath: "polygon(20% 70%, 71% 73.1%, 70% 78.1%, 20% 75%)",
    clipPath: "polygon(20.5% 59.5%, 71.9% 65.3%, 72% 70%, 20.2% 66.6%)",
    apartmentCount: 8,
    status: "sold-out",
    block: "A",
  },
  {
    id: 2,
    label: "სართული 2",
    clipPath: "polygon(20.3% 67.3%, 72% 70.8%, 72% 76%, 20% 75%)",
    apartmentCount: 8,
    status: "available",
    block: "A",
  },
  {
    id: 1,
    label: "სართული 1",
    clipPath: "polygon(18.5% 75.3%, 72% 76.5%, 72% 81%, 18.5% 83%)",
    apartmentCount: 4,
    status: "sold-out",
    block: "A",
  },
];

const floorsB: Floor[] = [
  {
    id: 110,
    label: "სართული 10",
    clipPath: "polygon(73% 29.5%, 96% 35.5%, 96% 40%, 73% 34.5%)",
    apartmentCount: 6,
    status: "available",
    block: "B",
  },
  {
    id: 109,
    label: "სართული 9",
    clipPath: "polygon(73% 34.5%, 96% 40%, 96% 44.5%, 73% 39.5%)",
    apartmentCount: 6,
    status: "available",
    block: "B",
  },
  {
    id: 108,
    label: "სართული 8",
    clipPath: "polygon(73% 39.5%, 96% 44.5%, 96% 49%, 73% 44.5%)",
    apartmentCount: 6,
    status: "available",
    block: "B",
  },
  {
    id: 107,
    label: "სართული 7",
    clipPath: "polygon(73% 44.5%, 96% 49%, 96% 53%, 73% 49%)",
    apartmentCount: 6,
    status: "available",
    block: "B",
  },
  {
    id: 106,
    label: "სართული 6",
    clipPath: "polygon(73% 50%, 96% 54%, 96% 58%, 73% 55%)",
    apartmentCount: 6,
    status: "available",
    block: "B",
  },
  {
    id: 105,
    label: "სართული 5",
    clipPath: "polygon(73% 56%, 96% 59%, 96% 62.8%, 73% 61%)",
    apartmentCount: 8,
    status: "coming-soon",
    block: "B",
  },
  {
    id: 104,
    label: "სართული 4",
    clipPath: "polygon(73% 61%, 96% 63.5%, 96% 67%, 73% 66%)",
    apartmentCount: 8,
    status: "available",
    block: "B",
  },
  {
    id: 103,
    label: "სართული 3",
    clipPath: "polygon(73% 66%, 96% 68.2%, 96% 72%, 73% 71%)",
    apartmentCount: 8,
    status: "sold-out",
    block: "B",
  },
  {
    id: 102,
    label: "სართული 2",
    clipPath: "polygon(73% 71%, 96% 72%, 96% 76%, 73% 76%)",
    apartmentCount: 8,
    status: "available",
    block: "B",
  },
  {
    id: 101,
    label: "სართული 1",
    clipPath: "polygon(73% 76%, 96% 75.8%, 96% 81%, 73% 81%)",
    apartmentCount: 4,
    status: "sold-out",
    block: "B",
  },
];

const Projects = () => {
  const [hoveredFloor, setHoveredFloor] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null);

  const activeFloor =
    floorsB.find((f) => f.id === selectedFloor) ||
    floorsA.find((f) => f.id === selectedFloor);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 bg-white">
      <h1 className="text-3xl font-bold mb-2">პროექტები</h1>
      <p className="text-gray-500 mb-8">აირჩიეთ სართული დეტალების სანახავად</p>

      <div className="relative w-full max-w-3xl mx-auto select-none bg-gray-900 rounded-2xl  overflow-hidden">
        <img
          src={buildingImg}
          alt="GreenBuild საცხოვრებელი კორპუსი"
          className="w-full h-auto  block  "
          draggable={false}
        />

        {hoveredFloor != null &&
          createPortal(
            <span
              className="fixed z-50 pointer-events-none text-white text-xs sm:text-sm font-semibold bg-green-600/90 px-2 py-0.5 sm:px-3 sm:py-1 rounded-md whitespace-nowrap"
              style={{
                left: mousePos.x + 12,
                top: mousePos.y - 28,
              }}
            >
              {floorsA.find((f) => f.id === hoveredFloor)?.label ||
                floorsB.find((f) => f.id === hoveredFloor)?.label ||
                "სართული"}
            </span>,
            document.body,
          )}

        {floorsB.map((floor) => {
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
              onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
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
            />
          );
        })}

        {floorsA.map((floor) => {
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
              onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
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
            />
          );
        })}
      </div>

      {activeFloor && (
        <div
          key={activeFloor.id}
          className="mt-6 max-w-3xl mx-auto bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8 animate-[fadeSlideUp_0.4s_ease-out_both]"
        >
          <h1 className="font-bold">{activeFloor.block} Block</h1>
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
