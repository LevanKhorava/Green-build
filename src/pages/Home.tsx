import Hero from "../components/Hero";
import StatsSection from "../components/StatsSection";
import ProjectsSection from "../components/ProjectsSection";
import ReviewsSection from "../components/ReviewsSection";
import NewsSection from "../components/NewsSection";

const Home = () => {
  return (
    <>
      <Hero />
      <ProjectsSection />
      <StatsSection />
      <ReviewsSection />
      <NewsSection />
    </>
  );
};

export default Home;
