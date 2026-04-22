import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import News from "./pages/News";
import Reviews from "./pages/Reviews";

function App() {
  console.log("App component rendered/////");
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/news" element={<News />} />
        <Route path="/reviews" element={<Reviews />} />
      </Route>
    </Routes>
  );
}

export default App;
