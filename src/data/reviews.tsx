export interface Review {
  id: number;
  name: string;
  role: string;
  rating: number;
  text: string;
  imageUrl: string;
  project: string;
}

export const reviews: Review[] = [
  {
    id: 1,
    name: "ნინო გელაშვილი",
    role: "ბინის მფლობელი",
    rating: 5,
    text: "გრინ ჰაუსი I-ში ბინა შევიძინე 2020 წელს. მშენებლობის ხარისხმა და ვადების დაცვამ ძალიან კარგი შთაბეჭდილება მოახდინა. უაღრესად კმაყოფილი ვარ!",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    project: "გრინ ჰაუსი I",
  },
  {
    id: 2,
    name: "გიორგი ჩხაიძე",
    role: "ინვესტორი",
    rating: 5,
    text: "რამდენიმე ბინა შევიძინე საინვესტიციო მიზნით. Green Build-ის პროექტები ყოველთვის მაღალი ხარისხით გამოირჩევა და ღირებულება სტაბილურად იზრდება.",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    project: "გრინ ჰაუსი II",
  },
  {
    id: 3,
    name: "მარიამ კვარაცხელია",
    role: "ბინის მფლობელი",
    rating: 4,
    text: "გრინ პარკში ცხოვრება ნამდვილი სიამოვნებაა. პარკთან სიახლოვე, მშვიდი გარემო და თანამედროვე ინფრასტრუქტურა — ყველაფერი რაც საჭიროა.",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    project: "გრინ პარკი",
  },
  {
    id: 4,
    name: "დავით ბერიძე",
    role: "ბინის მფლობელი",
    rating: 5,
    text: "პროფესიონალური მომსახურება ყიდვის პროცესის თავიდან ბოლომდე. გუნდი ძალიან ყურადღებიანი იყო და ყველა კითხვას დროულად პასუხობდა.",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    project: "გრინ ტაუერი",
  },
  {
    id: 5,
    name: "ანა წიკლაური",
    role: "ბინის მფლობელი",
    rating: 5,
    text: "ჩვენი ოჯახისთვის საუკეთესო გადაწყვეტილება იყო ბინის შეძენა გრინ პლაზაში. ბავშვების სათამაშო მოედანი, პარკინგი და მაღაზიები — ყველაფერი ახლოსაა.",
    imageUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    project: "გრინ პლაზა",
  },
  {
    id: 6,
    name: "ლევან მაღლაკელიძე",
    role: "ინვესტორი",
    rating: 4,
    text: "Green Build-თან თანამშრომლობა სასიამოვნო გამოცდილებაა. გამჭვირვალე პირობები, კარგი ფასი და მაღალი ხარისხი — რაც ინვესტორს სჭირდება.",
    imageUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    project: "გრინ ჰაუსი II",
  },
];

export function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          className={`w-5 h-5 ${i < rating ? "text-yellow-400" : "text-gray-200"}`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}
