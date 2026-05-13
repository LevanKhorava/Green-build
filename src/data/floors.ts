export interface Floor {
  id: number;
  label: string;
  clipPath: string;
  apartmentCount: number;
  status: "available" | "sold-out" | "coming-soon";
  block: "A" | "B";
}

export const statusLabels: Record<string, string> = {
  available: "ხელმისაწვდომია",
  "sold-out": "გაყიდულია",
  "coming-soon": "მალე",
};

export const floorsA: Floor[] = [
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

export const floorsB: Floor[] = [
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

export function getFloorById(floorId: number): Floor | undefined {
  return floorsA.find((f) => f.id === floorId) ?? floorsB.find((f) => f.id === floorId);
}
