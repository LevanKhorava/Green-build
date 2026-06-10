import { Link, useNavigate, useParams } from "react-router-dom";
import BuildingInteractive from "../components/BuildingInteractive";

const features = [
  {
    label: "2 ბლოკი",
    value: "A — 11 სართული, B — 8 სართული",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      />
    ),
  },
  {
    label: "ორდონიანი მიწისქვეშა პარკინგი",
    value: "უსაფრთხო და მოსახერხებელი",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 7h8m-8 4h8m-9 8h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    ),
  },
  {
    label: "142 ბინა",
    value: "ფართო არჩევანი",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    ),
  },
  {
    label: "თანამედროვე ლიფტები და საინჟინრო სისტემები",
    value: "სანდო ინფრასტრუქტურა",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    ),
  },
];

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (id !== "1") {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-[#333333] mb-4">
          პროექტი ვერ მოიძებნა
        </h1>
        <p className="text-[#333333] mb-6">
          მითითებული პროექტი არ არსებობს.
        </p>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-[#1f3f3a] font-semibold hover:text-[#1f3f3a]/70 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 16l-4-4m0 0l4-4m-4 4h18"
            />
          </svg>
          პროექტებზე დაბრუნება
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#f7f9f8]">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-[#1f3f3a] font-medium hover:text-[#1f3f3a]/70 transition-colors mb-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 16l-4-4m0 0l4-4m-4 4h18"
            />
          </svg>
          პროექტებზე დაბრუნება
        </Link>

        {/* Project header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10 mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-[#26b462] text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              დასრულებული
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm text-[#1f3f3a] font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              ვაზისუბანი, ალუბლების ქ. N9
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-[#333333] mb-4">
            სახლი ალუბლებზე
          </h1>

          <p className="text-[#333333] text-base md:text-lg leading-relaxed mb-8">
            თანამედროვე საცხოვრებელი კომპლექსი, რომელიც შექმნილია კომფორტული და
            მშვიდი ცხოვრებისათვის. პროექტი აერთიანებს ფუნქციურ დაგეგმარებას,
            კეთილმოწყობილ გარემოსა და ხარისხიან სამშენებლო სტანდარტებს.
          </p>

          <h2 className="text-lg font-bold text-[#333333] mb-4">
            პროექტი მოიცავს:
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {features.map((f) => (
              <div
                key={f.label}
                className="flex items-start gap-4 p-4 rounded-xl bg-[#f7f9f8] border border-gray-100"
              >
                <div className="w-10 h-10 shrink-0 rounded-full bg-[#e6f4ec] text-[#1f3f3a] flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    {f.icon}
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#333333]">
                    {f.label}
                  </div>
                  <div className="text-xs text-[#333333]/70 mt-0.5">
                    {f.value}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl bg-[#e6f4ec] border border-[#26b462]/20 p-4 flex items-start gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-[#1f3f3a] mt-0.5 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-sm text-[#1f3f3a] font-medium">
              დღეს პროექტი დასრულებულია და მზად არის საცხოვრებლად.
            </p>
          </div>
        </div>

        {/* Interactive building */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
          <h2 className="text-2xl font-bold text-[#333333] mb-2">
            აირჩიეთ სართული
          </h2>
          <p className="text-[#333333] mb-8">
            დააწკაპუნეთ სართულზე დეტალური ინფორმაციის სანახავად
          </p>

          <BuildingInteractive
            onFloorClick={(floor) => navigate(`/projects/${id}/floor/${floor.id}`)}
            className="max-w-3xl mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
