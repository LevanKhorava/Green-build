import { useState } from "react";
import { createPortal } from "react-dom";
import { floorsA, floorsB, statusLabels, type Floor } from "../data/floors";
import buildingImg from "../assets/greenBuild.png";

interface BuildingInteractiveProps {
  onFloorClick: (floor: Floor) => void;
  selectedFloorId?: number | null;
  className?: string;
}

const isTouch =
  typeof window !== "undefined" &&
  window.matchMedia("(hover: none)").matches;

const BuildingInteractive = ({
  onFloorClick,
  selectedFloorId,
  className = "",
}: BuildingInteractiveProps) => {
  const [hoveredFloor, setHoveredFloor] = useState<number | null>(null);
  const [pendingFloor, setPendingFloor] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const renderFloorOverlay = (floor: Floor) => {
    const isHovered = hoveredFloor === floor.id;
    const isSelected =
      selectedFloorId === floor.id || pendingFloor === floor.id;
    const hasAvailable = floor.apartments.some((a) => !a.sold);
    const flashRed = isSelected && !hasAvailable;

    return (
      <div
        key={floor.id}
        role="button"
        tabIndex={0}
        aria-label={`Floor ${floor.id} — ${statusLabels[floor.status]}`}
        className={`absolute transition-all duration-300 cursor-pointer ${
          isSelected
            ? flashRed
              ? "bg-red-500/40"
              : "bg-green-500/30"
            : isHovered
              ? hasAvailable
                ? "bg-green-500/20"
                : "bg-red-500/30"
              : ""
        }`}
        style={{
          clipPath: floor.clipPath,
          inset: 0,
        }}
        onMouseEnter={() => setHoveredFloor(floor.id)}
        onMouseLeave={() => setHoveredFloor(null)}
        onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
        onClick={() => {
          if (!isTouch) {
            if (hasAvailable) onFloorClick(floor);
            return;
          }
          setPendingFloor(floor.id);
          window.setTimeout(() => {
            setPendingFloor(null);
            if (hasAvailable) onFloorClick(floor);
          }, 350);
        }}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && hasAvailable) {
            e.preventDefault();
            onFloorClick(floor);
          }
        }}
      />
    );
  };

  return (
    <div
      className={`relative w-full select-none bg-[#1f3f3a] rounded-2xl overflow-hidden ${className}`}
    >
      <img
        src={buildingImg}
        alt="GreenBuild საცხოვრებელი კორპუსი"
        className="w-full h-auto block"
        draggable={false}
      />

      {hoveredFloor != null &&
        !isTouch &&
        createPortal(
          <span
            className="fixed z-50 pointer-events-none text-white text-xs sm:text-sm font-semibold bg-green-600/90 px-2 py-0.5 sm:px-3 sm:py-1 rounded-md whitespace-nowrap"
            style={{
              left: mousePos.x + 12,
              top: mousePos.y - 28,
            }}
          >
            {(() => {
              const floor =
                floorsA.find((f) => f.id === hoveredFloor) ??
                floorsB.find((f) => f.id === hoveredFloor);
              if (!floor) return "სართული";
              const soldOut = !floor.apartments.some((a) => !a.sold);
              return `${floor.block} Block — ${floor.label}${soldOut ? " — სრულად გაყიდულია" : ""}`;
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
