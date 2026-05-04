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
    title: "ახალი პროექტის დაწყება ვაკეში",
    description:
      "გრინ ბილდმა დაიწყო ახალი საცხოვრებელი კომპლექსის მშენებლობა ვაკის პრესტიჟულ უბანში.",
    date: "2026-04-15",
    imageUrl:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    title: "გრინ ჰაუსი II - გაყიდვა დაიწყო",
    description:
      "საბურთალოზე მდებარე გრინ ჰაუსი II-ში ბინების გაყიდვა ოფიციალურად დაიწყო.",
    date: "2026-04-10",
    imageUrl:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    title: "ენერგოეფექტური მშენებლობის სტანდარტები",
    description:
      "ჩვენი კომპანია გადავიდა ენერგოეფექტური მშენებლობის თანამედროვე სტანდარტებზე.",
    date: "2026-03-28",
    imageUrl:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=400&fit=crop",
  },
  {
    id: 4,
    title: "წლის საუკეთესო დეველოპერის ჯილდო",
    description:
      "გრინ ბილდმა მიიღო წლის საუკეთესო დეველოპერის ჯილდო ქართული ბიზნეს ასოციაციისგან.",
    date: "2026-03-15",
    imageUrl:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop",
  },
  {
    id: 5,
    title: "გრინ პარკის მშენებლობა დასრულდა",
    description:
      "ნუცუბიძეზე მდებარე გრინ პარკის მშენებლობა წარმატებით დასრულდა და ბინები ჩაბარდა.",
    date: "2026-03-01",
    imageUrl:
      "https://images.unsplash.com/photo-1486718448742-163732cd1544?w=600&h=400&fit=crop",
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
