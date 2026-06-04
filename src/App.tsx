import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/Layout";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import FloorDetail from "./pages/FloorDetail";
import News from "./pages/News";
import Videos from "./pages/Videos";

function App() {
  return (
    <>
    <ScrollToTop />
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/projects/:id/floor/:floorId" element={<FloorDetail />} />
        <Route path="/news" element={<News />} />
        <Route path="/reviews" element={<Videos />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
