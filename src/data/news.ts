import greenBuildImg from "../assets/greenBuild.png";

export interface NewsItem {
  id: number;
  title: string;
  description: string;
  date: string;
  imageUrl: string;
}

export const news: NewsItem[] = [
  {
    id: 1,
    title: "გრინბილდი ახალ პროექტზე მუშაობას იწყებს",
    description:
      "მალე მომხმარებლებს შესაძლებლობა ექნებათ გაიცნონ კომპანიის ახალი საცხოვრებელი პროექტი.",
    date: "2026-06-08",
    imageUrl:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    title: "ვაზისუბნის პროექტი – დასრულებული საცხოვრებელი სივრცე",
    description:
      "ალუბლების ქუჩაზე მდებარე პროექტი დასრულებულია და მზად არის საცხოვრებლად.",
    date: "2026-05-22",
    imageUrl: greenBuildImg,
  },
  {
    id: 3,
    title: "გადახდის მოქნილი პირობები მომხმარებლებისთვის",
    description:
      "გრინბილდი აგრძელებს მომხმარებლებზე მორგებული შეთავაზებების შემუშავებას.",
    date: "2026-05-05",
    imageUrl:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
  },
];

export function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("ka-GE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
