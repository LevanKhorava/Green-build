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
import AdminLayout from "./pages/admin/AdminLayout";
import AdminNews from "./pages/admin/AdminNews";
import AdminTexts from "./pages/admin/AdminTexts";
import AdminReviews from "./pages/admin/AdminReviews";

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

      {/* Admin — own shell, no public header/footer */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminNews />} />
        <Route path="reviews" element={<AdminReviews />} />
        <Route path="texts" element={<AdminTexts />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
