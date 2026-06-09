export interface Apartment {
  id: number;
  label: string;
  rooms: number;
  size: number;
  bathrooms: number;
  pricePerSqm: number;
  sold: boolean;
  side: "front" | "back";
}

export interface Floor {
  id: number;
  label: string;
  clipPath: string;
  apartmentCount: number;
  status: "available" | "sold-out" | "coming-soon";
  block: "A" | "B";
  apartments: Apartment[];
}

export const statusLabels: Record<string, string> = {
  available: "ხელმისაწვდომია",
  "sold-out": "გაყიდულია",
  "coming-soon": "მალე",
};

export const floorsA: Floor[] = [
  {
    id: 8,
    label: "სართული 8",
    clipPath: "polygon(21.8% 21.9%, 71.3% 38.7%, 71.4% 43.7%, 21.5% 28.9%)",
    apartmentCount: 4,
    status: "available",
    block: "B",
    apartments: [
      { id: 122, label: "ბინა 122", rooms: 2, size: 77.9, bathrooms: 1, pricePerSqm: 0, sold: false, side: "back" },
      { id: 1221, label: "ბინა 122ა", rooms: 2, size: 72, bathrooms: 1, pricePerSqm: 0, sold: false, side: "back" },
      { id: 1231, label: "ბინა 123ა", rooms: 2, size: 74.2, bathrooms: 1, pricePerSqm: 0, sold: false, side: "front" },
      { id: 1232, label: "ბინა 123ბ", rooms: 3, size: 87.1, bathrooms: 2, pricePerSqm: 0, sold: false, side: "front" },
    ],
  },
  {
    id: 7,
    label: "სართული 7",
    clipPath: "polygon(21.5% 28.9%, 71.4% 43.7%, 71.5% 48.7%, 21.2% 36%)",
    apartmentCount: 0,
    status: "sold-out",
    block: "B",
    apartments: [],
  },
  {
    id: 6,
    label: "სართული 6",
    clipPath: "polygon(21.2% 36.4%, 71.5% 49%, 71.6% 54%, 21% 43.3%)",
    apartmentCount: 0,
    status: "sold-out",
    block: "B",
    apartments: [],
  },
  {
    id: 5,
    label: "სართული 5",
    clipPath: "polygon(21% 43.8%, 71.7% 54.5%, 71.8% 59.5%, 20.8% 51%)",
    apartmentCount: 0,
    status: "sold-out",
    block: "B",
    apartments: [],
  },
  {
    id: 4,
    label: "სართული 4",
    clipPath: "polygon(20.8% 51.8%, 71.8% 59.8%, 71.8% 64.7%, 20.5% 59%)",
    apartmentCount: 1,
    status: "available",
    block: "B",
    apartments: [
      { id: 57, label: "ბინა 57", rooms: 2, size: 53.4, bathrooms: 1, pricePerSqm: 0, sold: false, side: "back" },
    ],
  },
  {
    id: 3,
    label: "სართული 3",
    clipPath: "polygon(20.5% 59.5%, 71.9% 65.3%, 72% 70%, 20.2% 66.6%)",
    apartmentCount: 1,
    status: "available",
    block: "B",
    apartments: [
      { id: 40, label: "ბინა 40", rooms: 2, size: 53.4, bathrooms: 1, pricePerSqm: 0, sold: false, side: "back" },
    ],
  },
  {
    id: 2,
    label: "სართული 2",
    clipPath: "polygon(20.3% 67.3%, 72% 70.8%, 72% 76%, 20% 75%)",
    apartmentCount: 1,
    status: "available",
    block: "B",
    apartments: [
      { id: 23, label: "ბინა 23", rooms: 2, size: 53.4, bathrooms: 1, pricePerSqm: 0, sold: false, side: "back" },
    ],
  },
  {
    id: 1,
    label: "სართული 1",
    clipPath: "polygon(18.5% 75.3%, 72% 76.5%, 72% 81%, 18.5% 83%)",
    apartmentCount: 0,
    status: "sold-out",
    block: "B",
    apartments: [],
  },
];

export const floorsB: Floor[] = [
  {
    id: 111,
    label: "სართული 11",
    clipPath: "polygon(73% 24.5%, 96% 31%, 96% 35.5%, 73% 29.5%)",
    apartmentCount: 3,
    status: "available",
    block: "A",
    apartments: [
      { id: 136, label: "ბინა 136", rooms: 2, size: 99.8, bathrooms: 1, pricePerSqm: 0, sold: false, side: "back" },
      { id: 138, label: "ბინა 138", rooms: 3, size: 98.3, bathrooms: 2, pricePerSqm: 0, sold: false, side: "front" },
      { id: 139, label: "ბინა 139", rooms: 3, size: 111.8, bathrooms: 2, pricePerSqm: 0, sold: false, side: "front" },
    ],
  },
  {
    id: 110,
    label: "სართული 10",
    clipPath: "polygon(73% 29.5%, 96% 35.5%, 96% 40%, 73% 34.5%)",
    apartmentCount: 1,
    status: "available",
    block: "A",
    apartments: [
      { id: 135, label: "ბინა 135", rooms: 2, size: 57.1, bathrooms: 1, pricePerSqm: 0, sold: false, side: "front" },
    ],
  },
  {
    id: 109,
    label: "სართული 9",
    clipPath: "polygon(73% 34.5%, 96% 40%, 96% 44.5%, 73% 39.5%)",
    apartmentCount: 1,
    status: "available",
    block: "A",
    apartments: [
      { id: 129, label: "ბინა 129", rooms: 2, size: 57.1, bathrooms: 1, pricePerSqm: 0, sold: false, side: "front" },
    ],
  },
  {
    id: 108,
    label: "სართული 8",
    clipPath: "polygon(73% 39.5%, 96% 44.5%, 96% 49%, 73% 44.5%)",
    apartmentCount: 0,
    status: "sold-out",
    block: "A",
    apartments: [],
  },
  {
    id: 107,
    label: "სართული 7",
    clipPath: "polygon(73% 44.5%, 96% 49%, 96% 53%, 73% 49%)",
    apartmentCount: 0,
    status: "sold-out",
    block: "A",
    apartments: [],
  },
  {
    id: 106,
    label: "სართული 6",
    clipPath: "polygon(73% 50%, 96% 54%, 96% 58%, 73% 55%)",
    apartmentCount: 0,
    status: "sold-out",
    block: "A",
    apartments: [],
  },
  {
    id: 105,
    label: "სართული 5",
    clipPath: "polygon(73% 56%, 96% 59%, 96% 62.8%, 73% 61%)",
    apartmentCount: 0,
    status: "sold-out",
    block: "A",
    apartments: [],
  },
  {
    id: 104,
    label: "სართული 4",
    clipPath: "polygon(73% 61%, 96% 63.5%, 96% 67%, 73% 66%)",
    apartmentCount: 0,
    status: "sold-out",
    block: "A",
    apartments: [],
  },
  {
    id: 103,
    label: "სართული 3",
    clipPath: "polygon(73% 66%, 96% 68.2%, 96% 72%, 73% 71%)",
    apartmentCount: 0,
    status: "sold-out",
    block: "A",
    apartments: [],
  },
  {
    id: 102,
    label: "სართული 2",
    clipPath: "polygon(73% 71%, 96% 72%, 96% 76%, 73% 76%)",
    apartmentCount: 0,
    status: "sold-out",
    block: "A",
    apartments: [],
  },
  {
    id: 101,
    label: "სართული 1",
    clipPath: "polygon(73% 76%, 96% 75.8%, 96% 81%, 73% 81%)",
    apartmentCount: 1,
    status: "available",
    block: "A",
    apartments: [
      { id: 4, label: "ბინა 4", rooms: 4, size: 73.7, bathrooms: 2, pricePerSqm: 0, sold: false, side: "front" },
    ],
  },
];

export function getFloorById(floorId: number): Floor | undefined {
  return floorsA.find((f) => f.id === floorId) ?? floorsB.find((f) => f.id === floorId);
}
