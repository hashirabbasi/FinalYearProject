import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import UserContext from "./context/UserContext.jsx";
import WorkerContext from "./context/WorkerContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WorkerContext>
    <UserContext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserContext>
    </WorkerContext>
  </StrictMode>
);
