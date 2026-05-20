export interface Apartment {
  id: number;
  label: string;
  rooms: number;
  size: number;
  bathrooms: number;
  pricePerSqm: number;
  sold: boolean;
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
    id: 7,
    label: "სართული 7",
    clipPath: "polygon(21.5% 28.9%, 71.4% 43.7%, 71.5% 48.7%, 21.2% 36%)",
    apartmentCount: 6,
    status: "available",
    block: "A",
    apartments: [
      { id: 701, label: "ბინა 701", rooms: 2, size: 58, bathrooms: 1, pricePerSqm: 1100, sold: true },
      { id: 702, label: "ბინა 702", rooms: 3, size: 82, bathrooms: 2, pricePerSqm: 1150, sold: true },
      { id: 703, label: "ბინა 703", rooms: 1, size: 38, bathrooms: 1, pricePerSqm: 1200, sold: true },
      { id: 704, label: "ბინა 704", rooms: 2, size: 62, bathrooms: 1, pricePerSqm: 1100, sold: false },
      { id: 705, label: "ბინა 705", rooms: 3, size: 88, bathrooms: 2, pricePerSqm: 1180, sold: false },
      { id: 706, label: "ბინა 706", rooms: 1, size: 42, bathrooms: 1, pricePerSqm: 1220, sold: false },
    ],
  },
  {
    id: 6,
    label: "სართული 6",
    clipPath: "polygon(21.2% 36.4%, 71.5% 49%, 71.6% 54%, 21% 43.3%)",
    apartmentCount: 6,
    status: "available",
    block: "A",
    apartments: [
      { id: 601, label: "ბინა 601", rooms: 2, size: 55, bathrooms: 1, pricePerSqm: 1050, sold: true },
      { id: 602, label: "ბინა 602", rooms: 3, size: 78, bathrooms: 2, pricePerSqm: 1100, sold: true },
      { id: 603, label: "ბინა 603", rooms: 1, size: 36, bathrooms: 1, pricePerSqm: 1150, sold: true },
      { id: 604, label: "ბინა 604", rooms: 2, size: 60, bathrooms: 1, pricePerSqm: 1080, sold: false },
      { id: 605, label: "ბინა 605", rooms: 4, size: 105, bathrooms: 2, pricePerSqm: 1050, sold: false },
      { id: 606, label: "ბინა 606", rooms: 1, size: 40, bathrooms: 1, pricePerSqm: 1170, sold: false },
    ],
  },
  {
    id: 5,
    label: "სართული 5",
    clipPath: "polygon(21% 43.8%, 71.7% 54.5%, 71.8% 59.5%, 20.8% 51%)",
    apartmentCount: 8,
    status: "coming-soon",
    block: "A",
    apartments: [
      { id: 501, label: "ბინა 501", rooms: 1, size: 35, bathrooms: 1, pricePerSqm: 1000, sold: true },
      { id: 502, label: "ბინა 502", rooms: 2, size: 52, bathrooms: 1, pricePerSqm: 1020, sold: true },
      { id: 503, label: "ბინა 503", rooms: 2, size: 56, bathrooms: 1, pricePerSqm: 1030, sold: true },
      { id: 504, label: "ბინა 504", rooms: 3, size: 75, bathrooms: 2, pricePerSqm: 1050, sold: true },
      { id: 505, label: "ბინა 505", rooms: 1, size: 38, bathrooms: 1, pricePerSqm: 1010, sold: false },
      { id: 506, label: "ბინა 506", rooms: 2, size: 54, bathrooms: 1, pricePerSqm: 1040, sold: false },
      { id: 507, label: "ბინა 507", rooms: 3, size: 80, bathrooms: 2, pricePerSqm: 1060, sold: false },
      { id: 508, label: "ბინა 508", rooms: 1, size: 40, bathrooms: 1, pricePerSqm: 1020, sold: false },
    ],
  },
  {
    id: 4,
    label: "სართული 4",
    clipPath: "polygon(20.8% 51.8%, 71.8% 59.8%, 71.8% 64.7%, 20.5% 59%)",
    apartmentCount: 8,
    status: "available",
    block: "A",
    apartments: [
      { id: 401, label: "ბინა 401", rooms: 1, size: 37, bathrooms: 1, pricePerSqm: 960, sold: true },
      { id: 402, label: "ბინა 402", rooms: 2, size: 55, bathrooms: 1, pricePerSqm: 980, sold: true },
      { id: 403, label: "ბინა 403", rooms: 3, size: 74, bathrooms: 2, pricePerSqm: 1000, sold: true },
      { id: 404, label: "ბინა 404", rooms: 2, size: 58, bathrooms: 1, pricePerSqm: 990, sold: true },
      { id: 405, label: "ბინა 405", rooms: 1, size: 36, bathrooms: 1, pricePerSqm: 970, sold: false },
      { id: 406, label: "ბინა 406", rooms: 3, size: 78, bathrooms: 2, pricePerSqm: 1010, sold: false },
      { id: 407, label: "ბინა 407", rooms: 2, size: 50, bathrooms: 1, pricePerSqm: 985, sold: false },
      { id: 408, label: "ბინა 408", rooms: 1, size: 42, bathrooms: 1, pricePerSqm: 975, sold: false },
    ],
  },
  {
    id: 3,
    label: "სართული 3",
    clipPath: "polygon(20.5% 59.5%, 71.9% 65.3%, 72% 70%, 20.2% 66.6%)",
    apartmentCount: 8,
    status: "sold-out",
    block: "A",
    apartments: [
      { id: 301, label: "ბინა 301", rooms: 2, size: 53, bathrooms: 1, pricePerSqm: 920, sold: true },
      { id: 302, label: "ბინა 302", rooms: 3, size: 76, bathrooms: 2, pricePerSqm: 950, sold: true },
      { id: 303, label: "ბინა 303", rooms: 1, size: 35, bathrooms: 1, pricePerSqm: 940, sold: true },
      { id: 304, label: "ბინა 304", rooms: 2, size: 57, bathrooms: 1, pricePerSqm: 930, sold: true },
      { id: 305, label: "ბინა 305", rooms: 1, size: 39, bathrooms: 1, pricePerSqm: 935, sold: false },
      { id: 306, label: "ბინა 306", rooms: 3, size: 82, bathrooms: 2, pricePerSqm: 960, sold: false },
      { id: 307, label: "ბინა 307", rooms: 2, size: 48, bathrooms: 1, pricePerSqm: 925, sold: false },
      { id: 308, label: "ბინა 308", rooms: 4, size: 110, bathrooms: 2, pricePerSqm: 900, sold: false },
    ],
  },
  {
    id: 2,
    label: "სართული 2",
    clipPath: "polygon(20.3% 67.3%, 72% 70.8%, 72% 76%, 20% 75%)",
    apartmentCount: 8,
    status: "available",
    block: "A",
    apartments: [
      { id: 201, label: "ბინა 201", rooms: 1, size: 36, bathrooms: 1, pricePerSqm: 880, sold: true },
      { id: 202, label: "ბინა 202", rooms: 2, size: 52, bathrooms: 1, pricePerSqm: 900, sold: true },
      { id: 203, label: "ბინა 203", rooms: 2, size: 56, bathrooms: 1, pricePerSqm: 910, sold: true },
      { id: 204, label: "ბინა 204", rooms: 3, size: 72, bathrooms: 2, pricePerSqm: 920, sold: true },
      { id: 205, label: "ბინა 205", rooms: 1, size: 38, bathrooms: 1, pricePerSqm: 885, sold: false },
      { id: 206, label: "ბინა 206", rooms: 3, size: 80, bathrooms: 2, pricePerSqm: 930, sold: false },
      { id: 207, label: "ბინა 207", rooms: 2, size: 50, bathrooms: 1, pricePerSqm: 895, sold: false },
      { id: 208, label: "ბინა 208", rooms: 4, size: 115, bathrooms: 2, pricePerSqm: 870, sold: false },
    ],
  },
  {
    id: 1,
    label: "სართული 1",
    clipPath: "polygon(18.5% 75.3%, 72% 76.5%, 72% 81%, 18.5% 83%)",
    apartmentCount: 4,
    status: "sold-out",
    block: "A",
    apartments: [
      { id: 101, label: "ბინა 101", rooms: 3, size: 85, bathrooms: 2, pricePerSqm: 850, sold: true },
      { id: 102, label: "ბინა 102", rooms: 4, size: 120, bathrooms: 2, pricePerSqm: 830, sold: true },
      { id: 103, label: "ბინა 103", rooms: 3, size: 90, bathrooms: 2, pricePerSqm: 860, sold: false },
      { id: 104, label: "ბინა 104", rooms: 2, size: 65, bathrooms: 1, pricePerSqm: 870, sold: false },
    ],
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
    apartments: [
      { id: 1001, label: "ბინა 1001", rooms: 2, size: 60, bathrooms: 1, pricePerSqm: 1250, sold: true },
      { id: 1002, label: "ბინა 1002", rooms: 3, size: 85, bathrooms: 2, pricePerSqm: 1300, sold: true },
      { id: 1003, label: "ბინა 1003", rooms: 1, size: 40, bathrooms: 1, pricePerSqm: 1350, sold: true },
      { id: 1004, label: "ბინა 1004", rooms: 2, size: 65, bathrooms: 1, pricePerSqm: 1270, sold: false },
      { id: 1005, label: "ბინა 1005", rooms: 3, size: 90, bathrooms: 2, pricePerSqm: 1280, sold: false },
      { id: 1006, label: "ბინა 1006", rooms: 1, size: 42, bathrooms: 1, pricePerSqm: 1320, sold: false },
    ],
  },
  {
    id: 109,
    label: "სართული 9",
    clipPath: "polygon(73% 34.5%, 96% 40%, 96% 44.5%, 73% 39.5%)",
    apartmentCount: 6,
    status: "available",
    block: "B",
    apartments: [
      { id: 901, label: "ბინა 901", rooms: 2, size: 57, bathrooms: 1, pricePerSqm: 1200, sold: true },
      { id: 902, label: "ბინა 902", rooms: 3, size: 83, bathrooms: 2, pricePerSqm: 1230, sold: true },
      { id: 903, label: "ბინა 903", rooms: 1, size: 38, bathrooms: 1, pricePerSqm: 1280, sold: true },
      { id: 904, label: "ბინა 904", rooms: 2, size: 62, bathrooms: 1, pricePerSqm: 1210, sold: false },
      { id: 905, label: "ბინა 905", rooms: 4, size: 108, bathrooms: 2, pricePerSqm: 1180, sold: false },
      { id: 906, label: "ბინა 906", rooms: 1, size: 44, bathrooms: 1, pricePerSqm: 1260, sold: false },
    ],
  },
  {
    id: 108,
    label: "სართული 8",
    clipPath: "polygon(73% 39.5%, 96% 44.5%, 96% 49%, 73% 44.5%)",
    apartmentCount: 6,
    status: "available",
    block: "B",
    apartments: [
      { id: 801, label: "ბინა 801", rooms: 2, size: 55, bathrooms: 1, pricePerSqm: 1150, sold: true },
      { id: 802, label: "ბინა 802", rooms: 3, size: 80, bathrooms: 2, pricePerSqm: 1180, sold: true },
      { id: 803, label: "ბინა 803", rooms: 1, size: 37, bathrooms: 1, pricePerSqm: 1220, sold: true },
      { id: 804, label: "ბინა 804", rooms: 2, size: 60, bathrooms: 1, pricePerSqm: 1160, sold: false },
      { id: 805, label: "ბინა 805", rooms: 3, size: 86, bathrooms: 2, pricePerSqm: 1170, sold: false },
      { id: 806, label: "ბინა 806", rooms: 1, size: 41, bathrooms: 1, pricePerSqm: 1200, sold: false },
    ],
  },
  {
    id: 107,
    label: "სართული 7",
    clipPath: "polygon(73% 44.5%, 96% 49%, 96% 53%, 73% 49%)",
    apartmentCount: 6,
    status: "available",
    block: "B",
    apartments: [
      { id: 707, label: "ბინა 707", rooms: 2, size: 54, bathrooms: 1, pricePerSqm: 1100, sold: true },
      { id: 708, label: "ბინა 708", rooms: 3, size: 78, bathrooms: 2, pricePerSqm: 1130, sold: true },
      { id: 709, label: "ბინა 709", rooms: 1, size: 36, bathrooms: 1, pricePerSqm: 1170, sold: true },
      { id: 710, label: "ბინა 710", rooms: 2, size: 58, bathrooms: 1, pricePerSqm: 1110, sold: false },
      { id: 711, label: "ბინა 711", rooms: 3, size: 84, bathrooms: 2, pricePerSqm: 1120, sold: false },
      { id: 712, label: "ბინა 712", rooms: 1, size: 40, bathrooms: 1, pricePerSqm: 1150, sold: false },
    ],
  },
  {
    id: 106,
    label: "სართული 6",
    clipPath: "polygon(73% 50%, 96% 54%, 96% 58%, 73% 55%)",
    apartmentCount: 6,
    status: "available",
    block: "B",
    apartments: [
      { id: 613, label: "ბინა 613", rooms: 2, size: 52, bathrooms: 1, pricePerSqm: 1060, sold: true },
      { id: 614, label: "ბინა 614", rooms: 3, size: 76, bathrooms: 2, pricePerSqm: 1080, sold: true },
      { id: 615, label: "ბინა 615", rooms: 1, size: 35, bathrooms: 1, pricePerSqm: 1120, sold: true },
      { id: 616, label: "ბინა 616", rooms: 2, size: 56, bathrooms: 1, pricePerSqm: 1070, sold: false },
      { id: 617, label: "ბინა 617", rooms: 4, size: 102, bathrooms: 2, pricePerSqm: 1040, sold: false },
      { id: 618, label: "ბინა 618", rooms: 1, size: 39, bathrooms: 1, pricePerSqm: 1100, sold: false },
    ],
  },
  {
    id: 105,
    label: "სართული 5",
    clipPath: "polygon(73% 56%, 96% 59%, 96% 62.8%, 73% 61%)",
    apartmentCount: 8,
    status: "coming-soon",
    block: "B",
    apartments: [
      { id: 509, label: "ბინა 509", rooms: 1, size: 36, bathrooms: 1, pricePerSqm: 1000, sold: true },
      { id: 510, label: "ბინა 510", rooms: 2, size: 50, bathrooms: 1, pricePerSqm: 1020, sold: true },
      { id: 511, label: "ბინა 511", rooms: 2, size: 54, bathrooms: 1, pricePerSqm: 1030, sold: true },
      { id: 512, label: "ბინა 512", rooms: 3, size: 73, bathrooms: 2, pricePerSqm: 1050, sold: true },
      { id: 513, label: "ბინა 513", rooms: 1, size: 37, bathrooms: 1, pricePerSqm: 1010, sold: false },
      { id: 514, label: "ბინა 514", rooms: 2, size: 52, bathrooms: 1, pricePerSqm: 1025, sold: false },
      { id: 515, label: "ბინა 515", rooms: 3, size: 77, bathrooms: 2, pricePerSqm: 1045, sold: false },
      { id: 516, label: "ბინა 516", rooms: 1, size: 39, bathrooms: 1, pricePerSqm: 1015, sold: false },
    ],
  },
  {
    id: 104,
    label: "სართული 4",
    clipPath: "polygon(73% 61%, 96% 63.5%, 96% 67%, 73% 66%)",
    apartmentCount: 8,
    status: "available",
    block: "B",
    apartments: [
      { id: 409, label: "ბინა 409", rooms: 1, size: 35, bathrooms: 1, pricePerSqm: 960, sold: true },
      { id: 410, label: "ბინა 410", rooms: 2, size: 53, bathrooms: 1, pricePerSqm: 980, sold: true },
      { id: 411, label: "ბინა 411", rooms: 3, size: 72, bathrooms: 2, pricePerSqm: 1000, sold: true },
      { id: 412, label: "ბინა 412", rooms: 2, size: 56, bathrooms: 1, pricePerSqm: 985, sold: true },
      { id: 413, label: "ბინა 413", rooms: 1, size: 38, bathrooms: 1, pricePerSqm: 965, sold: false },
      { id: 414, label: "ბინა 414", rooms: 3, size: 76, bathrooms: 2, pricePerSqm: 995, sold: false },
      { id: 415, label: "ბინა 415", rooms: 2, size: 48, bathrooms: 1, pricePerSqm: 975, sold: false },
      { id: 416, label: "ბინა 416", rooms: 1, size: 40, bathrooms: 1, pricePerSqm: 970, sold: false },
    ],
  },
  {
    id: 103,
    label: "სართული 3",
    clipPath: "polygon(73% 66%, 96% 68.2%, 96% 72%, 73% 71%)",
    apartmentCount: 8,
    status: "sold-out",
    block: "B",
    apartments: [
      { id: 309, label: "ბინა 309", rooms: 2, size: 51, bathrooms: 1, pricePerSqm: 920, sold: true },
      { id: 310, label: "ბინა 310", rooms: 3, size: 74, bathrooms: 2, pricePerSqm: 940, sold: true },
      { id: 311, label: "ბინა 311", rooms: 1, size: 36, bathrooms: 1, pricePerSqm: 930, sold: true },
      { id: 312, label: "ბინა 312", rooms: 2, size: 55, bathrooms: 1, pricePerSqm: 925, sold: true },
      { id: 313, label: "ბინა 313", rooms: 1, size: 38, bathrooms: 1, pricePerSqm: 935, sold: false },
      { id: 314, label: "ბინა 314", rooms: 3, size: 80, bathrooms: 2, pricePerSqm: 950, sold: false },
      { id: 315, label: "ბინა 315", rooms: 2, size: 46, bathrooms: 1, pricePerSqm: 915, sold: false },
      { id: 316, label: "ბინა 316", rooms: 4, size: 112, bathrooms: 2, pricePerSqm: 900, sold: false },
    ],
  },
  {
    id: 102,
    label: "სართული 2",
    clipPath: "polygon(73% 71%, 96% 72%, 96% 76%, 73% 76%)",
    apartmentCount: 8,
    status: "available",
    block: "B",
    apartments: [
      { id: 209, label: "ბინა 209", rooms: 1, size: 37, bathrooms: 1, pricePerSqm: 880, sold: true },
      { id: 210, label: "ბინა 210", rooms: 2, size: 50, bathrooms: 1, pricePerSqm: 900, sold: true },
      { id: 211, label: "ბინა 211", rooms: 2, size: 54, bathrooms: 1, pricePerSqm: 905, sold: true },
      { id: 212, label: "ბინა 212", rooms: 3, size: 70, bathrooms: 2, pricePerSqm: 915, sold: true },
      { id: 213, label: "ბინა 213", rooms: 1, size: 36, bathrooms: 1, pricePerSqm: 885, sold: false },
      { id: 214, label: "ბინა 214", rooms: 3, size: 78, bathrooms: 2, pricePerSqm: 920, sold: false },
      { id: 215, label: "ბინა 215", rooms: 2, size: 48, bathrooms: 1, pricePerSqm: 890, sold: false },
      { id: 216, label: "ბინა 216", rooms: 4, size: 118, bathrooms: 2, pricePerSqm: 865, sold: false },
    ],
  },
  {
    id: 101,
    label: "სართული 1",
    clipPath: "polygon(73% 76%, 96% 75.8%, 96% 81%, 73% 81%)",
    apartmentCount: 4,
    status: "sold-out",
    block: "B",
    apartments: [
      { id: 105, label: "ბინა 105", rooms: 3, size: 88, bathrooms: 2, pricePerSqm: 850, sold: true },
      { id: 106, label: "ბინა 106", rooms: 4, size: 125, bathrooms: 2, pricePerSqm: 820, sold: true },
      { id: 107, label: "ბინა 107", rooms: 3, size: 92, bathrooms: 2, pricePerSqm: 845, sold: false },
      { id: 108, label: "ბინა 108", rooms: 2, size: 68, bathrooms: 1, pricePerSqm: 860, sold: false },
    ],
  },
];

export function getFloorById(floorId: number): Floor | undefined {
  return floorsA.find((f) => f.id === floorId) ?? floorsB.find((f) => f.id === floorId);
}
