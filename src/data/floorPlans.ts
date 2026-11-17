import { floorsA, floorsB, type Apartment, type Floor } from "./floors";
import {
  SHEET_HEIGHT,
  SHEET_WIDTH,
  eleventhRegions,
  groundRegions,
  penthouseRegions,
  tenthRegions,
  towerRegions,
  typicalRegions,
  type PlanRegion,
} from "./floorPlanRegions";
import sheet1 from "../assets/floor-plans/floor-1.avif";
import sheet2 from "../assets/floor-plans/floor-2.avif";
import sheet3 from "../assets/floor-plans/floor-3.avif";
import sheet4 from "../assets/floor-plans/floor-4.avif";
import sheet5 from "../assets/floor-plans/floor-5.avif";
import sheet6 from "../assets/floor-plans/floor-6.avif";
import sheet7 from "../assets/floor-plans/floor-7.avif";
import sheet8 from "../assets/floor-plans/floor-8.avif";
import sheet9 from "../assets/floor-plans/floor-9.avif";
import sheet10 from "../assets/floor-plans/floor-10.avif";
import sheet11 from "../assets/floor-plans/floor-11.avif";

/** One apartment outline on a sheet, with the flat from floors.ts when it is still listed. */
export interface PlanUnit extends PlanRegion {
  apartment?: Apartment;
}

export interface FloorPlan {
  /** 1–11. One sheet shows the whole storey, both blocks. */
  storey: number;
  image: string;
  width: number;
  height: number;
  units: PlanUnit[];
}

const sheets: Partial<Record<number, string>> = {
  1: sheet1,
  2: sheet2,
  3: sheet3,
  4: sheet4,
  5: sheet5,
  6: sheet6,
  7: sheet7,
  8: sheet8,
  9: sheet9,
  10: sheet10,
  11: sheet11,
};

const renumber = (regions: PlanRegion[], by: number): PlanRegion[] =>
  regions.map((region) => ({ ...region, number: region.number + by }));

const regionsByStorey: Partial<Record<number, PlanRegion[]>> = {
  1: groundRegions,
  2: typicalRegions,
  3: renumber(typicalRegions, 17),
  4: renumber(typicalRegions, 34),
  5: renumber(typicalRegions, 51),
  6: renumber(typicalRegions, 68),
  7: renumber(typicalRegions, 85),
  8: [...towerRegions, ...penthouseRegions],
  9: renumber(towerRegions, 8),
  10: tenthRegions,
  11: eleventhRegions,
};

const allFloors = [...floorsA, ...floorsB];

/** Floor ids are 1–8 in block B and 101–111 in block A; both name the storey on the sheet. */
export const getStorey = (floor: Floor): number =>
  floor.id > 100 ? floor.id - 100 : floor.id;

export function getFloorPlan(floor: Floor): FloorPlan | undefined {
  const storey = getStorey(floor);
  const image = sheets[storey];
  const regions = regionsByStorey[storey];
  if (!image || !regions) return undefined;

  const apartments = allFloors
    .filter((other) => getStorey(other) === storey)
    .flatMap((other) => other.apartments);

  return {
    storey,
    image,
    width: SHEET_WIDTH,
    height: SHEET_HEIGHT,
    units: regions.map((region) => ({
      ...region,
      apartment: apartments.find((apartment) => apartment.id === region.number),
    })),
  };
}

if (import.meta.env.DEV) {
  for (const floor of allFloors) {
    const storey = getStorey(floor);
    const drawn = new Set(regionsByStorey[storey]?.map((region) => region.number));
    for (const apartment of floor.apartments) {
      if (!drawn.has(apartment.id)) {
        console.warn(
          `[floorPlans] ${apartment.label} (id ${apartment.id}) has no outline on storey ${storey}`,
        );
      }
    }
  }
}
