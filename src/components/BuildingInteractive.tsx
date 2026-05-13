import { useState } from "react";
import { createPortal } from "react-dom";
import { floorsA, floorsB, statusLabels, type Floor } from "../data/floors";
import buildingImg from "../assets/greenBuild.png";

interface BuildingInteractiveProps {
  onFloorClick: (floor: Floor) => void;
  selectedFloorId?: number | null;
  className?: string;
}

const BuildingInteractive = ({
  onFloorClick,
  selectedFloorId,
  className = "",
}: BuildingInteractiveProps) => {
  const [hoveredFloor, setHoveredFloor] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const renderFloorOverlay = (floor: Floor) => {
    const isHovered = hoveredFloor === floor.id;
    const isSelected = selectedFloorId === floor.id;

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
        onClick={() => onFloorClick(floor)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onFloorClick(floor);
          }
        }}
      />
    );
  };

  return (
    <div
      className={`relative w-full select-none bg-gray-900 rounded-2xl overflow-hidden ${className}`}
    >
      <img
        src={buildingImg}
        alt="GreenBuild საცხოვრებელი კორპუსი"
        className="w-full h-auto block"
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
            {(() => {
              const floor = floorsA.find((f) => f.id === hoveredFloor) ?? floorsB.find((f) => f.id === hoveredFloor);
              return floor ? `${floor.block} Block — ${floor.label}` : "სართული";
            })()}
          </span>,
          document.body,
        )}

      {floorsB.map(renderFloorOverlay)}
      {floorsA.map(renderFloorOverlay)}
    </div>
  );
};

export default BuildingInteractive;
