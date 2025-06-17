import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { WorkerDataContext } from "../context/WorkerContext";

const WorkerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setWorker } = useContext(WorkerDataContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const userData = { email, password };
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/workers/login`,
        userData
      );

      if (response.status === 200) {
        const data = response.data;
        setWorker(data.worker);
        localStorage.setItem("token", data.token);
        navigate("/Worker-Home");
      }
    } catch (error) {
      setError("Login failed. Check your credentials.");
    }
    setLoading(false);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <div className="flex flex-col items-center mb-8">
          <img
            className="w-16 h-16 mb-2 rounded-full shadow"
            src="/image.png"
            alt="Logo"
          />
          <h1 className="text-3xl font-bold text-[#153a54] mb-2 tracking-tight">
            Sahulat Worker Login
          </h1>
          <p className="text-gray-500 text-sm">
            Welcome back! Please login to your worker account.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#f3f6fa] rounded px-4 py-2 border border-gray-300 w-full text-base focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#f3f6fa] rounded px-4 py-2 border border-gray-300 w-full text-base focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <div className="flex justify-between items-center">
            <Link
              to="/workers/forgetPassword"
              className="text-blue-600 text-sm hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          {error && (
            <div className="text-red-600 text-center text-sm">{error}</div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-2 transition duration-200 shadow"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center mt-6 text-gray-600">
          New here?{" "}
          <Link
            to="/WorkerSignUp"
            className="text-blue-600 font-bold hover:underline"
          >
            Register as a Worker
          </Link>
        </p>
        <div className="mt-6">
          <Link
            to="/UserLogin"
            className="bg-[#d5622d] flex items-center justify-center text-white font-semibold rounded-lg px-4 py-2 w-full text-lg hover:bg-[#b94e1a] transition"
          >
            Sign In as User
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WorkerLogin;