import { createRoot } from "react-dom/client";
import { HelmetProvider } from 'react-helmet-async'; // 1. Import this
import App from "./App.tsx";
import "./index.css";

// 2. Wrap your App component
createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);