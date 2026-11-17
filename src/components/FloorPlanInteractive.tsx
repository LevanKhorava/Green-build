import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { statusLabels, type Apartment } from "../data/floors";
import type { FloorPlan, PlanUnit } from "../data/floorPlans";

interface FloorPlanInteractiveProps {
  plan: FloorPlan;
  onApartmentClick: (apartment: Apartment) => void;
  className?: string;
}

// Same tap feedback as the building: the highlight shows briefly, then the flat opens.
const TAP_FLASH_MS = 350;
// Room the tooltip needs to the right of the cursor before it flips to the left.
const TOOLTIP_ROOM = 220;

const availableApartment = (unit: PlanUnit) =>
  unit.apartment && !unit.apartment.sold ? unit.apartment : undefined;

const FloorPlanInteractive = ({
  plan,
  onApartmentClick,
  className = "",
}: FloorPlanInteractiveProps) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [pending, setPending] = useState<number | null>(null);
  const [tooltip, setTooltip] = useState({ x: 0, y: 0, flip: false });
  // The click event does not say reliably whether it came from a finger (iOS reports
  // "mouse"), so remember it from the pointerdown that preceded it.
  const pointerType = useRef("mouse");
  const flashTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(flashTimer.current), []);

  const open = (apartment: Apartment) => {
    // The tooltip is portalled to <body>; leaving it up would paint it over the lightbox.
    setHovered(null);
    onApartmentClick(apartment);
  };

  const hover = (unit: PlanUnit, e: React.PointerEvent) => {
    if (e.pointerType === "touch") return;
    setHovered(unit.number);
    setTooltip({
      x: e.clientX,
      y: e.clientY,
      flip: e.clientX > window.innerWidth - TOOLTIP_ROOM,
    });
  };

  const handleClick = (unit: PlanUnit) => {
    const apartment = availableApartment(unit);
    if (pointerType.current !== "touch") {
      if (apartment) open(apartment);
      return;
    }
    if (pending != null) return;
    setPending(unit.number);
    flashTimer.current = window.setTimeout(() => {
      setPending(null);
      if (apartment) open(apartment);
    }, TAP_FLASH_MS);
  };

  const renderUnit = (unit: PlanUnit) => {
    const apartment = availableApartment(unit);
    const active = hovered === unit.number || pending === unit.number;
    // Exactly one fill and one stroke class per state: they are equally specific, so two
    // on the same element would be decided by stylesheet order, not by intent.
    const look = apartment
      ? active
        ? "cursor-pointer fill-green-500/50 stroke-green-700"
        : "cursor-pointer fill-transparent stroke-green-700 focus-visible:fill-green-500/50"
      : active
        ? "cursor-not-allowed fill-red-500/50 stroke-red-700"
        : "cursor-not-allowed fill-transparent stroke-transparent";

    return (
      <path
        key={unit.number}
        d={unit.path}
        fillRule="evenodd"
        data-apartment={unit.number}
        className={`outline-none transition-all duration-300 motion-reduce:transition-none stroke-[2.5] [stroke-linejoin:round] [vector-effect:non-scaling-stroke] ${look}`}
        {...(apartment
          ? {
              role: "button",
              tabIndex: 0,
              "aria-label": `${apartment.label} — ${statusLabels.available}`,
            }
          : { "aria-hidden": true })}
        onPointerDown={(e) => {
          pointerType.current = e.pointerType;
        }}
        onPointerEnter={(e) => hover(unit, e)}
        onPointerMove={(e) => hover(unit, e)}
        onPointerLeave={() =>
          setHovered((current) => (current === unit.number ? null : current))
        }
        onClick={() => handleClick(unit)}
        onKeyDown={(e) => {
          if (apartment && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            open(apartment);
          }
        }}
      />
    );
  };

  const hoveredUnit = plan.units.find((unit) => unit.number === hovered);
  const hoveredApartment = hoveredUnit && availableApartment(hoveredUnit);
  // Available flats are drawn last so their outline is never covered by a neighbour's.
  const sold = plan.units.filter((unit) => !availableApartment(unit));
  const available = plan.units.filter((unit) => availableApartment(unit));

  return (
    <div
      className={`relative w-full select-none overflow-hidden bg-white ${className}`}
      style={{ aspectRatio: `${plan.width} / ${plan.height}` }}
    >
      <img
        src={plan.image}
        alt={`სართული ${plan.storey} — გეგმა`}
        className="absolute inset-0 w-full h-full"
        draggable={false}
        decoding="async"
      />

      {/* Same box and same coordinate space as the sheet, so outlines follow it at any size. */}
      <svg
        viewBox={`0 0 ${plan.width} ${plan.height}`}
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full touch-manipulation [-webkit-tap-highlight-color:transparent]"
      >
        {sold.map(renderUnit)}
        {available.map(renderUnit)}
      </svg>

      {hoveredUnit &&
        createPortal(
          <span
            className={`fixed z-40 pointer-events-none text-white text-xs sm:text-sm font-semibold px-2 py-0.5 sm:px-3 sm:py-1 rounded-md whitespace-nowrap ${
              hoveredApartment ? "bg-green-600/90" : "bg-red-600/90"
            } ${tooltip.flip ? "-translate-x-full" : ""}`}
            style={{
              left: tooltip.flip ? tooltip.x - 12 : tooltip.x + 12,
              top: tooltip.y - 28,
            }}
          >
            {hoveredApartment
              ? hoveredApartment.label
              : `ბინა ${hoveredUnit.number} — ${statusLabels["sold-out"]}`}
          </span>,
          document.body,
        )}
    </div>
  );
};

export default FloorPlanInteractive;
