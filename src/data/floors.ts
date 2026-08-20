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
    apartmentCount: 1,
    status: "available",
    block: "B",
    apartments: [
      {
        id: 122,
        label: "ბინა 122",
        rooms: 2,
        size: 77.9,
        bathrooms: 1,
        pricePerSqm: 0,
        sold: false,
        side: "back",
      },
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
    apartmentCount: 0,
    status: "sold-out",
    block: "B",
    apartments: [],
  },
  {
    id: 3,
    label: "სართული 3",
    clipPath: "polygon(20.5% 59.5%, 71.9% 65.3%, 72% 70%, 20.2% 66.6%)",
    apartmentCount: 1,
    status: "available",
    block: "B",
    apartments: [
      {
        id: 231,
        label: "ბინა 23",
        rooms: 2,
        size: 53.4,
        bathrooms: 1,
        pricePerSqm: 0,
        sold: false,
        side: "back",
      },
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
      {
        id: 23,
        label: "ბინა 23",
        rooms: 2,
        size: 53.4,
        bathrooms: 1,
        pricePerSqm: 0,
        sold: false,
        side: "back",
      },
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
    clipPath: "polygon(71% 24.5%, 93.8% 31%, 94% 35.5%, 71% 29.5%)",
    apartmentCount: 3,
    status: "available",
    block: "A",
    apartments: [
      {
        id: 136,
        label: "ბინა 136",
        rooms: 2,
        size: 99.8,
        bathrooms: 1,
        pricePerSqm: 0,
        sold: false,
        side: "back",
      },
      {
        id: 138,
        label: "ბინა 138",
        rooms: 3,
        size: 98.3,
        bathrooms: 2,
        pricePerSqm: 0,
        sold: false,
        side: "front",
      },
      {
        id: 139,
        label: "ბინა 139",
        rooms: 3,
        size: 111.8,
        bathrooms: 2,
        pricePerSqm: 0,
        sold: false,
        side: "front",
      },
    ],
  },
  {
    id: 110,
    label: "სართული 10",
    clipPath: "polygon(71% 28%, 94% 35.5%, 94.5% 40%, 71% 34.5%)",
    apartmentCount: 0,
    status: "sold-out",
    block: "A",
    apartments: [],
  },
  {
    id: 109,
    label: "სართული 9",
    clipPath: "polygon(71% 34.5%, 94.3% 40%, 94.5% 44.5%, 71% 39.5%)",
    apartmentCount: 0,
    status: "sold-out",
    block: "A",
    apartments: [],
  },
  {
    id: 108,
    label: "სართული 8",
    clipPath: "polygon(71.5% 39.5%, 94.5% 44.5%, 94.9% 49%, 71.5% 44.5%)",
    apartmentCount: 0,
    status: "sold-out",
    block: "A",
    apartments: [],
  },
  {
    id: 107,
    label: "სართული 7",
    clipPath: "polygon(71.5% 44.5%, 94.7% 49%, 94.9% 53%, 71.5% 49%)",
    apartmentCount: 0,
    status: "sold-out",
    block: "A",
    apartments: [],
  },
  {
    id: 106,
    label: "სართული 6",
    clipPath: "polygon(71.8% 50%, 94.9% 54%, 95.1% 58%, 71.8% 55%)",
    apartmentCount: 0,
    status: "sold-out",
    block: "A",
    apartments: [],
  },
  {
    id: 105,
    label: "სართული 5",
    clipPath: "polygon(71.8% 56%, 94.9% 59%, 95.1% 62.8%, 71.8% 61%)",
    apartmentCount: 0,
    status: "sold-out",
    block: "A",
    apartments: [],
  },
  {
    id: 104,
    label: "სართული 4",
    clipPath: "polygon(71.8% 61%, 95.4% 63.5%, 95.6% 67%, 71.8% 66%)",
    apartmentCount: 0,
    status: "sold-out",
    block: "A",
    apartments: [],
  },
  {
    id: 103,
    label: "სართული 3",
    clipPath: "polygon(72% 66%, 95.4% 68.2%, 95.6% 72% , 72.1% 71%)",
    apartmentCount: 0,
    status: "sold-out",
    block: "A",
    apartments: [],
  },
  {
    id: 102,
    label: "სართული 2",
    clipPath: "polygon(72.2% 71%, 95.4% 72%, 95.6% 76%, 72.5% 76%)",
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
      {
        id: 4,
        label: "ბინა 4",
        rooms: 4,
        size: 73.7,
        bathrooms: 2,
        pricePerSqm: 0,
        sold: false,
        side: "front",
      },
    ],
  },
];

export function getFloorById(floorId: number): Floor | undefined {
  return (
    floorsA.find((f) => f.id === floorId) ??
    floorsB.find((f) => f.id === floorId)
  );
}
