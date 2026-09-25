import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { SiteTextsProvider } from "./hooks/SiteTextsProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <SiteTextsProvider>
        <App />
      </SiteTextsProvider>
    </BrowserRouter>
  </StrictMode>,
);
