import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Start from "./pages/Start";
import UserLogin from "./pages/userLogin";
import UserSignUp from "./pages/UserSignUp";
import WorkerLogin from "./pages/Workerlogin";
import WorkerSignUp from "./pages/WorkerSignUp";
import React from "react";
import { userProtectedWraper } from "./pages/userProtectedWraper";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/userLogin" element={<UserLogin />} />
        <Route path="/SignUp" element={<UserSignUp />} />
        <Route path="/workerLogin" element={<WorkerLogin />} />
        <Route path="/workerSignUp" element={<WorkerSignUp />} />
        <Route
          path="/Home"
          element={
            <userProtectedWraper>
              <Home />
            </userProtectedWraper>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
