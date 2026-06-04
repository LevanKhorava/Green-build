import Hero from "../components/Hero";
import StatsSection from "../components/StatsSection";
import ProjectsSection from "../components/ProjectsSection";
import VideosSection from "../components/VideosSection";
import NewsSection from "../components/NewsSection";

const Home = () => {
  return (
    <>
      <Hero />
      <ProjectsSection />
      <StatsSection />
      <VideosSection />
      <NewsSection />
    </>
  );
};

export default Home;
