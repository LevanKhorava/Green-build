/**
 * Every editable piece of copy on the site.
 *
 * `defaultTexts` holds the original wording — it is what visitors see until
 * something is overridden in /admin/texts, and what "reset" restores. Keys are
 * stored in the Supabase `site_texts` table; only overridden keys have a row.
 *
 * To make a new string editable: add a key here, add it to a group below, then
 * render it with `useText()` instead of a literal.
 */
export const defaultTexts: Record<string, string> = {
  // ─── Navigation ───────────────────────────────────────────────────────────
  "brand.name": "GreenBuild",
  "nav.home": "მთავარი",
  "nav.about": "ჩვენს შესახებ",
  "nav.projects": "პროექტები",
  "nav.news": "სიახლეები",
  "nav.reviews": "შეფასებები",
  "nav.contactCta": "დაგვიკავშირდით",
  "nav.contactPhone": "+995322022080",

  // ─── Footer ───────────────────────────────────────────────────────────────
  "footer.phone.label": "ტელეფონი",
  "footer.phone.value": "032 2 02 20 80",
  "footer.phone.tel": "+995322022080",
  "footer.email.label": "ელ. ფოსტა",
  "footer.email.value": "info@greenbuild.ge",
  "footer.hours.label": "სამუშაო საათები",
  "footer.hours.value": "10:00 – 18:00",
  "footer.address.label": "მისამართი",
  "footer.address.value": "თბილისი, საქართველო",
  "footer.copyright": "Green Build. All rights reserved.",
  "footer.facebook.url":
    "https://www.facebook.com/share/1EEkNkhmok/?mibextid=wwXIfr",

  // ─── Home · hero ──────────────────────────────────────────────────────────
  "home.hero.title": "GreenBuild",
  "home.hero.subtitle": "შენი ახალი სახლი იწყება აქ —",
  "home.hero.highlight": "„სახლი ალუბლებზე\"",

  // ─── Home · stats ─────────────────────────────────────────────────────────
  "home.stats.heading":
    "წლების განმავლობაში ჩვენ შევქმენით საიმედო სივრცეები ათასობით ოჯახისთვის",
  "home.stats.item1.value": "3",
  "home.stats.item1.suffix": "",
  "home.stats.item1.label": "აშენებული შენობა",
  "home.stats.item2.value": "250",
  "home.stats.item2.suffix": "+",
  "home.stats.item2.label": "გაყიდული ბინა",
  "home.stats.item3.value": "1500",
  "home.stats.item3.suffix": "+",
  "home.stats.item3.label": "კმაყოფილი მომხმარებელი",
  "home.stats.item4.value": "8",
  "home.stats.item4.suffix": "",
  "home.stats.item4.label": "წლიანი გამოცდილება",
  "home.stats.paragraph":
    "10-წლიანი გამოცდილებით სამშენებლო სფეროში, გრინბილდი ქმნის თანამედროვე, კომფორტულ და უსაფრთხო საცხოვრებელ გარემოს. ვაზისუბანში ჩვენი დასრულებული და შესახლებული პროექტი გრინბილდის ხარისხისა და სანდოობის კიდევ ერთი დასტურია. კომპანია აქტიურად მუშაობს ახალ პროექტზე, რომელთა შესახებ ინფორმაციაც მალე გახდება ხელმისაწვდომი.",
  "home.stats.cta": "მეტის ნახვა",

  // ─── Home · reviews (videos) ──────────────────────────────────────────────
  "home.videos.heading": "შეფასებები",
  "home.videos.subtitle": "რას ამბობენ ჩვენი მომხმარებლები",
  "home.videos.cta": "ყველა შეფასება",

  // ─── Home · news ──────────────────────────────────────────────────────────
  "home.news.heading": "სიახლეები",
  "home.news.subtitle": "გაეცანით ჩვენს უახლეს ამბებს და მიღწევებს",
  "home.news.cta": "მეტის ნახვა",

  // ─── Contact widget ───────────────────────────────────────────────────────
  "contact.button": "დაგვიტოვეთ ნომერი",
  "contact.heading": "დაგვიტოვეთ ნომერი",
  "contact.subtitle": "ჩვენ მალე დაგიკავშირდებით",
  "contact.field.firstName": "სახელი",
  "contact.field.lastName": "გვარი",
  "contact.field.phone": "ტელეფონის ნომერი",
  "contact.submit": "გაგზავნა",
  "contact.sending": "იგზავნება...",
  "contact.success": "მადლობა! ჩვენ მალე დაგიკავშირდებით.",
  "contact.error": "გაგზავნა ვერ მოხერხდა. სცადეთ თავიდან.",

  // ─── About ────────────────────────────────────────────────────────────────
  "about.title": "ჩვენს შესახებ",
  "about.subtitle": "10 წელი ხარისხისა და განვითარების გზაზე",
  "about.paragraph1":
    "გრინბილდი უკვე 10 წელია სამშენებლო სფეროში ოპერირებს და მომხმარებლებს სთავაზობს თანამედროვე, უსაფრთხო და კომფორტულ საცხოვრებელ გარემოს.",
  "about.paragraph2":
    "ჩვენი საქმიანობა ეფუძნება პასუხისმგებლობას, პროფესიონალიზმსა და ხარისხის მაღალ სტანდარტებს. თითოეული პროექტი იქმნება იმ იდეით, რომ მობინადრეებმა მიიღონ არა მხოლოდ ბინა, არამედ გარემო, სადაც კომფორტულად იცხოვრებენ წლების განმავლობაში.",
  "about.paragraph3":
    "ჩვენ მუდმივად ვვითარდებით, ვნერგავთ თანამედროვე სამშენებლო მიდგომებს და ვგეგმავთ ახალ პროექტებს, რომლებიც კიდევ უფრო მეტ ადამიანს მისცემს შესაძლებლობას შეიძინოს ხარისხიანი საცხოვრებელი.",

  "about.values.heading": "ჩვენი ღირებულებები",
  "about.values.subtitle": "ყველაფერი რასაც ვაკეთებთ ეფუძნება ხუთ ძირითად პრინციპს",
  "about.value1.title": "ხარისხი ყველა დეტალში",
  "about.value1.description":
    "ვაქცევთ ყურადღებას თითოეულ მცირე დეტალს — მასალის შერჩევიდან საბოლოო მოპირკეთებამდე.",
  "about.value2.title": "მომხმარებელზე ორიენტირებული მიდგომა",
  "about.value2.description":
    "მომხმარებლის საჭიროებები და კომფორტი არის ჩვენი ყველა გადაწყვეტილების საფუძველი.",
  "about.value3.title": "სანდოობა და გამჭვირვალობა",
  "about.value3.description":
    "ვმოქმედებთ გახსნილად — ვადები, ფასები და პირობები ყოველთვის ნათელია.",
  "about.value4.title": "თანამედროვე სამშენებლო სტანდარტები",
  "about.value4.description":
    "ვიყენებთ უახლეს ტექნოლოგიებსა და საერთაშორისო სამშენებლო სტანდარტებს.",
  "about.value5.title": "გრძელვადიანი განვითარება",
  "about.value5.description":
    "ვაშენებთ პროექტებს, რომლებიც წლების შემდეგაც შეინარჩუნებენ ღირებულებას.",

  "about.timeline.heading": "ჩვენი გზა",
  "about.timeline.subtitle": "კომპანიის განვითარების მნიშვნელოვანი ეტაპები",
  "about.timeline1.year": "2018",
  "about.timeline1.title": "კომპანიის დაარსება",
  "about.timeline1.description":
    "Green Build დაარსდა მცირე გუნდით და დიდი ხედვით — შეექმნა მდგრადი საცხოვრებელი სივრცეები.",
  "about.timeline2.year": "2020",
  "about.timeline2.title": "პირველი პროექტის დასრულება",
  "about.timeline2.description":
    "გრინ ჰაუსი I წარმატებით ჩაბარდა ვაკეში — 48 ბინა და 100% გაყიდვა.",
  "about.timeline3.year": "2022",
  "about.timeline3.title": "100+ გაყიდული ბინა",
  "about.timeline3.description":
    "მიღწეული იქნა 100 გაყიდული ბინის ნიშნული. კომპანიამ გააფართოვა საქმიანობა სხვადასხვა უბანში.",
  "about.timeline4.year": "2024",
  "about.timeline4.title": "ენერგოეფექტურობის სერტიფიკატი",
  "about.timeline4.description":
    "კომპანიამ მიიღო ენერგოეფექტური მშენებლობის საერთაშორისო სერტიფიკატი.",
  "about.timeline5.year": "2026",
  "about.timeline5.title": "250+ ბინა და 5 პროექტი",
  "about.timeline5.description":
    "დღეს Green Build არის ერთ-ერთი წამყვანი დეველოპერი 5 აქტიური პროექტით და 1500+ კმაყოფილი მომხმარებლით.",

  // ─── News page ────────────────────────────────────────────────────────────
  "newsPage.title": "სიახლეები",
  "newsPage.intro":
    "გაიცანით გრინბილდის უახლეს სიახლეებს, მიმდინარე აქტივობებსა და სამომავლო პროექტებს.",

  // ─── Reviews page ─────────────────────────────────────────────────────────
  "reviewsPage.title": "შეფასებები",
  "reviewsPage.intro":
    "ჩვენთვის ყველაზე მნიშვნელოვანი მომხმარებლის ნდობა და კმაყოფილებაა. სწორედ ამიტომ თითოეული დასრულებული პროექტი რეალური ადამიანების გამოცდილებით ფასდება.",
  "video.card.author": "გრინბილდის მაცხოვრებელი",
  "video.lightbox.close": "დახურვა",

};

export interface TextField {
  key: string;
  label: string;
  multiline?: boolean;
}

export interface TextGroup {
  id: string;
  title: string;
  fields: TextField[];
}

/** Drives the /admin/texts screen: which fields appear, in what order. */
export const textGroups: TextGroup[] = [
  {
    id: "nav",
    title: "ნავიგაცია",
    fields: [
      { key: "brand.name", label: "ლოგოს ტექსტი" },
      { key: "nav.home", label: "მთავარი" },
      { key: "nav.about", label: "ჩვენს შესახებ" },
      { key: "nav.projects", label: "პროექტები" },
      { key: "nav.news", label: "სიახლეები" },
      { key: "nav.reviews", label: "შეფასებები" },
      { key: "nav.contactCta", label: "ღილაკი — დაგვიკავშირდით" },
      { key: "nav.contactPhone", label: "ღილაკის ტელეფონი (tel:)" },
    ],
  },
  {
    id: "home.hero",
    title: "მთავარი — ჰერო",
    fields: [
      { key: "home.hero.title", label: "სათაური" },
      { key: "home.hero.subtitle", label: "ქვესათაური" },
      { key: "home.hero.highlight", label: "ხაზგასმული ტექსტი" },
    ],
  },
  {
    id: "home.stats",
    title: "მთავარი — სტატისტიკა",
    fields: [
      { key: "home.stats.heading", label: "სათაური", multiline: true },
      { key: "home.stats.item1.value", label: "1. რიცხვი" },
      { key: "home.stats.item1.suffix", label: "1. სიმბოლო (+)" },
      { key: "home.stats.item1.label", label: "1. წარწერა" },
      { key: "home.stats.item2.value", label: "2. რიცხვი" },
      { key: "home.stats.item2.suffix", label: "2. სიმბოლო (+)" },
      { key: "home.stats.item2.label", label: "2. წარწერა" },
      { key: "home.stats.item3.value", label: "3. რიცხვი" },
      { key: "home.stats.item3.suffix", label: "3. სიმბოლო (+)" },
      { key: "home.stats.item3.label", label: "3. წარწერა" },
      { key: "home.stats.item4.value", label: "4. რიცხვი" },
      { key: "home.stats.item4.suffix", label: "4. სიმბოლო (+)" },
      { key: "home.stats.item4.label", label: "4. წარწერა" },
      { key: "home.stats.paragraph", label: "აღწერა", multiline: true },
      { key: "home.stats.cta", label: "ღილაკი" },
    ],
  },
  {
    id: "home.videos",
    title: "მთავარი — შეფასებები",
    fields: [
      { key: "home.videos.heading", label: "სათაური" },
      { key: "home.videos.subtitle", label: "ქვესათაური" },
      { key: "home.videos.cta", label: "ღილაკი" },
    ],
  },
  {
    id: "home.news",
    title: "მთავარი — სიახლეები",
    fields: [
      { key: "home.news.heading", label: "სათაური" },
      { key: "home.news.subtitle", label: "ქვესათაური" },
      { key: "home.news.cta", label: "ღილაკი" },
    ],
  },
  {
    id: "contact",
    title: "საკონტაქტო ფორმა",
    fields: [
      { key: "contact.button", label: "მცურავი ღილაკი" },
      { key: "contact.heading", label: "ფორმის სათაური" },
      { key: "contact.subtitle", label: "ფორმის ქვესათაური" },
      { key: "contact.field.firstName", label: "ველი — სახელი" },
      { key: "contact.field.lastName", label: "ველი — გვარი" },
      { key: "contact.field.phone", label: "ველი — ტელეფონი" },
      { key: "contact.submit", label: "გაგზავნის ღილაკი" },
      { key: "contact.sending", label: "იგზავნება..." },
      { key: "contact.success", label: "წარმატების შეტყობინება", multiline: true },
      { key: "contact.error", label: "შეცდომის შეტყობინება", multiline: true },
    ],
  },
  {
    id: "about",
    title: "ჩვენს შესახებ — შესავალი",
    fields: [
      { key: "about.title", label: "სათაური" },
      { key: "about.subtitle", label: "ქვესათაური" },
      { key: "about.paragraph1", label: "აბზაცი 1", multiline: true },
      { key: "about.paragraph2", label: "აბზაცი 2", multiline: true },
      { key: "about.paragraph3", label: "აბზაცი 3", multiline: true },
    ],
  },
  {
    id: "about.values",
    title: "ჩვენს შესახებ — ღირებულებები",
    fields: [
      { key: "about.values.heading", label: "სათაური" },
      { key: "about.values.subtitle", label: "ქვესათაური" },
      { key: "about.value1.title", label: "1. სათაური" },
      { key: "about.value1.description", label: "1. აღწერა", multiline: true },
      { key: "about.value2.title", label: "2. სათაური" },
      { key: "about.value2.description", label: "2. აღწერა", multiline: true },
      { key: "about.value3.title", label: "3. სათაური" },
      { key: "about.value3.description", label: "3. აღწერა", multiline: true },
      { key: "about.value4.title", label: "4. სათაური" },
      { key: "about.value4.description", label: "4. აღწერა", multiline: true },
      { key: "about.value5.title", label: "5. სათაური" },
      { key: "about.value5.description", label: "5. აღწერა", multiline: true },
    ],
  },
  {
    id: "about.timeline",
    title: "ჩვენს შესახებ — ჩვენი გზა",
    fields: [
      { key: "about.timeline.heading", label: "სათაური" },
      { key: "about.timeline.subtitle", label: "ქვესათაური" },
      { key: "about.timeline1.year", label: "1. წელი" },
      { key: "about.timeline1.title", label: "1. სათაური" },
      { key: "about.timeline1.description", label: "1. აღწერა", multiline: true },
      { key: "about.timeline2.year", label: "2. წელი" },
      { key: "about.timeline2.title", label: "2. სათაური" },
      { key: "about.timeline2.description", label: "2. აღწერა", multiline: true },
      { key: "about.timeline3.year", label: "3. წელი" },
      { key: "about.timeline3.title", label: "3. სათაური" },
      { key: "about.timeline3.description", label: "3. აღწერა", multiline: true },
      { key: "about.timeline4.year", label: "4. წელი" },
      { key: "about.timeline4.title", label: "4. სათაური" },
      { key: "about.timeline4.description", label: "4. აღწერა", multiline: true },
      { key: "about.timeline5.year", label: "5. წელი" },
      { key: "about.timeline5.title", label: "5. სათაური" },
      { key: "about.timeline5.description", label: "5. აღწერა", multiline: true },
    ],
  },
  {
    id: "newsPage",
    title: "სიახლეების გვერდი",
    fields: [
      { key: "newsPage.title", label: "სათაური" },
      { key: "newsPage.intro", label: "შესავალი", multiline: true },
    ],
  },
  {
    id: "reviewsPage",
    title: "შეფასებების გვერდი",
    fields: [
      { key: "reviewsPage.title", label: "სათაური" },
      { key: "reviewsPage.intro", label: "შესავალი", multiline: true },
    ],
  },
  {
    id: "footer",
    title: "ფუტერი",
    fields: [
      { key: "footer.phone.label", label: "ტელეფონი — წარწერა" },
      { key: "footer.phone.value", label: "ტელეფონი — ნომერი" },
      { key: "footer.phone.tel", label: "ტელეფონი — tel: ბმული" },
      { key: "footer.email.label", label: "ელ. ფოსტა — წარწერა" },
      { key: "footer.email.value", label: "ელ. ფოსტა — მისამართი" },
      { key: "footer.hours.label", label: "საათები — წარწერა" },
      { key: "footer.hours.value", label: "საათები — მნიშვნელობა" },
      { key: "footer.address.label", label: "მისამართი — წარწერა" },
      { key: "footer.address.value", label: "მისამართი — მნიშვნელობა" },
      { key: "footer.copyright", label: "საავტორო უფლებები" },
      { key: "footer.facebook.url", label: "Facebook ბმული" },
    ],
  },
];
