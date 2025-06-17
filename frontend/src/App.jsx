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
import WorkerServicing from "./pages/WorkerServicing";
import ForgotPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyOTP from "./pages/VerifyOTP";
import 'remixicon/fonts/remixicon.css'

function App() {
  

  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/userLogin" element={<UserLogin />} />
        <Route path="/SignUp" element={<UserSignUp />} />
       <Route path="/Riding" element={<Riding />} />
       <Route path="/Worker-Servicing" element={<WorkerServicing/>} />
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
        <Route path="/users/forgot-password" element={<ForgotPassword />} />
        <Route path="/users/reset-password" element={<ResetPassword />} />
        <Route path="/users/verify-otp" element={<VerifyOTP />} />

      </Routes>
    </div>
  );
}

export default App;
