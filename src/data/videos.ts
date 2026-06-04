export interface Video {
  id: number;
  youtubeId: string;
  title: string;
}

export const videos: Video[] = [
  { id: 1, youtubeId: "Dv6Ewpn2w5g", title: "ვიდეო 1" },
  { id: 2, youtubeId: "5hmAV373oRA", title: "ვიდეო 2" },
  { id: 3, youtubeId: "R4Y0kHgCK6s", title: "ვიდეო 3" },
  { id: 4, youtubeId: "n7jltvM_UKw", title: "ვიდეო 4" },
  { id: 5, youtubeId: "rBfxflgmIF4", title: "ვიდეო 5" },
];

export const thumbnailUrl = (youtubeId: string) =>
  `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;

export const embedUrl = (youtubeId: string) =>
  `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`;
