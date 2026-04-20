import Hero from "../components/Hero";
import StatsSection from "../components/StatsSection";
import ContactSection from "../components/ContactSection";
import ProjectsSection from "../components/ProjectsSection";
import NewsSection from "../components/NewsSection";

const Home = () => {
  return (
    <>
      <Hero />
      <ContactSection />
      <StatsSection />
      <ProjectsSection />
      <NewsSection />
    </>
  );
};

export default Home;
