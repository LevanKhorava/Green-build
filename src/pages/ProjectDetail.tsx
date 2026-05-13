import { Link, useNavigate, useParams } from "react-router-dom";
import BuildingInteractive from "../components/BuildingInteractive";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (id !== "1") {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          პროექტი ვერ მოიძებნა
        </h1>
        <p className="text-gray-500 mb-6">
          მითითებული პროექტი არ არსებობს.
        </p>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-green-700 font-semibold hover:text-green-800 transition-colors"
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
    <div className="max-w-5xl mx-auto px-4 py-12 bg-white">
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 text-green-700 font-medium hover:text-green-800 transition-colors mb-6"
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

      <h1 className="text-3xl font-bold mb-2">
        გრინ ბილდის საცხოვრებელი კომპლექსი
      </h1>
      <p className="text-gray-500 mb-8">აირჩიეთ სართული დეტალების სანახავად</p>

      <BuildingInteractive
        onFloorClick={(floor) => navigate(`/projects/${id}/floor/${floor.id}`)}
        className="max-w-3xl mx-auto"
      />
    </div>
  );
};

export default ProjectDetail;
