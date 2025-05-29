// src/pages/UserLogin.jsx
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { userDataContext } from "../context/UserContext";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(userDataContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = { email, password };
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        userData
      );

      if (response.status === 200) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user.role);

        if (data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/Home");
        }
      }
    } catch (error) {
      alert("Login failed. Check your credentials.");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img className="w-16 mb-10" src="image.png" alt="Logo" />
        <form onSubmit={handleSubmit}>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
          />

          <h3 className="text-lg font-medium mb-2">What's your password</h3>
          <input
            type="password"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
          />

          <button
            type="submit"
            className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg"
          >
            Login
          </button>
        </form>

        <p className="text-center">
          New here? {" "}
          <Link to="/SignUp" className="text-blue-600 font-bold">
            Create new Account
          </Link>
        </p>
      </div>

      <div>
        <Link
          to="/workerLogin"
          className="bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg"
        >
          Sign In as Worker
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
