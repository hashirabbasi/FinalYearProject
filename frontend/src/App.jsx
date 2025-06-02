import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Start from "./pages/Start";
import UserLogin from "./pages/UserLogin";
import UserSignUp from "./pages/UserSignUp";
import WorkerLogin from "./pages/WorkerLogin";
import WorkerSignUp from "./pages/WorkerSignUp";
import UserProtectWrapper from "./pages/UserProtectWraper";
import UserLogout from "./pages/UserLogout";
import AdminDashboard from "./pages/AdminDashboard";
import WorkerHome from "./pages/WorkerHome";
import WorkerProtectWrapper from "./pages/WorkerProtectWrapper";
import WorkerLogout from "./pages/WorkerLogout";
import Riding from "./pages/Riding";
function App() {
  // ...

  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/userLogin" element={<UserLogin />} />
        <Route path="/SignUp" element={<UserSignUp />} />
       <Route path="/Riding" element={<Riding />} />
        <Route path="/workerLogin" element={<WorkerLogin />} />
        <Route path="/workerSignUp" element={<WorkerSignUp />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route
          path="/Home"
          element={
            <UserProtectWrapper>
              <Home />
            </UserProtectWrapper>
          }
        />
        <Route
          path="/users/logout"
          element={
            <UserProtectWrapper>
              <UserLogout />
            </UserProtectWrapper>
          }
        />

        <Route
          path="/Worker-Home"
          element={
            <WorkerProtectWrapper>
              <WorkerHome />
            </WorkerProtectWrapper>
          }
        />
        <Route
          path="/Workers/logout"
          element={
            <WorkerProtectWrapper>
              <WorkerLogout />
            </WorkerProtectWrapper>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
