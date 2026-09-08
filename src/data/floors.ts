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
    clipPath: "polygon(5% 21.5%, 65% 30%, 65% 37%, 5% 30%)",
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
    clipPath: "polygon(5% 30%, 66.5% 37%, 66.5% 44%, 5% 40%)",
    apartmentCount: 0,
    status: "sold-out",
    block: "B",
    apartments: [],
  },
  {
    id: 6,
    label: "სართული 6",
    clipPath: "polygon(5% 40%, 66.5% 44.6%, 66.5% 51.7%, 5% 50%)",
    apartmentCount: 0,
    status: "sold-out",
    block: "B",
    apartments: [],
  },
  {
    id: 5,
    label: "სართული 5",
    clipPath: "polygon(5% 50%, 66.5% 51.7%, 66.5% 59.1%, 5% 60%)",
    apartmentCount: 0,
    status: "sold-out",
    block: "B",
    apartments: [],
  },
  {
    id: 4,
    label: "სართული 4",
    clipPath: "polygon(5% 60%, 66.5% 59%, 66.5% 66.6%, 5% 70%)",
    apartmentCount: 0,
    status: "sold-out",
    block: "B",
    apartments: [],
  },
  {
    id: 3,
    label: "სართული 3",
    clipPath: "polygon(5% 70%, 66.5% 66%, 66.5% 74%, 5% 80%)",
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
    clipPath: "polygon(5% 80%, 66.5% 73%, 66.5% 81.1%, 5% 90%)",
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
    clipPath: "polygon(10% 93%, 66.5% 81%, 66.5% 88%, 10% 100%)",
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
    clipPath: "polygon(64.5% 7%, 89% 12.5%, 92.9% 18%, 64.5% 13%)",
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
    clipPath: "polygon(67.5% 14.7%, 92.8% 18.8%, 92.7% 26%, 67.5% 22%)",
    apartmentCount: 0,
    status: "sold-out",
    block: "A",
    apartments: [],
  },
  {
    id: 109,
    label: "სართული 9",
    clipPath: "polygon(67.5% 22%, 92.8% 26%, 92.7% 33%, 67.5% 29%)",
    apartmentCount: 0,
    status: "sold-out",
    block: "A",
    apartments: [],
  },
  {
    id: 108,
    label: "სართული 8",
    clipPath: "polygon(67.5% 29%, 92.8% 33%, 92.7% 38%, 67.5% 36%)",
    apartmentCount: 0,
    status: "sold-out",
    block: "A",
    apartments: [],
  },
  {
    id: 107,
    label: "სართული 7",
    clipPath: "polygon(67.5% 36%, 92.8% 38%, 92.7% 45%, 67.5% 43%)",
    apartmentCount: 0,
    status: "sold-out",
    block: "A",
    apartments: [],
  },
  {
    id: 106,
    label: "სართული 6",
    clipPath: "polygon(67.5% 45%, 92.8% 45%, 92.7% 52%, 67.5% 52%)",
    apartmentCount: 0,
    status: "sold-out",
    block: "A",
    apartments: [],
  },
  {
    id: 105,
    label: "სართული 5",
    clipPath: "polygon(67.5% 52%, 92.8% 52%, 92.7% 58.5%, 67.5% 59%)",
    apartmentCount: 0,
    status: "sold-out",
    block: "A",
    apartments: [],
  },
  {
    id: 104,
    label: "სართული 4",
    clipPath: "polygon(67.5% 59%, 92.8% 58%, 92.7% 64.5%, 67.5% 66%)",
    apartmentCount: 0,
    status: "sold-out",
    block: "A",
    apartments: [],
  },
  {
    id: 103,
    label: "სართული 3",
    clipPath: "polygon(67.5% 66%, 92.8% 64.7%, 92.7% 70.5%, 67.5% 73%)",
    apartmentCount: 0,
    status: "sold-out",
    block: "A",
    apartments: [],
  },
  {
    id: 102,
    label: "სართული 2",
    clipPath: "polygon(67.5% 74%, 92.8% 71.5%, 92.7% 77%, 67.5% 80%)",
    apartmentCount: 0,
    status: "sold-out",
    block: "A",
    apartments: [],
  },
  {
    id: 101,
    label: "სართული 1",
    // clipPath: "polygon(64.5% 80%, 89% 78%, 92.9% 84%, 64.5% 82%)",
    clipPath: "polygon(67.5% 81%, 92% 78%, 92.2% 81.7%, 67.5% 86%)",
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
