import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { userDataContext } from "../context/UserContext";

const UserSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setUser } = useContext(userDataContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const newUser = {
      fullName: {
        firstname,
        lastname,
      },
      email,
      password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        newUser
      );

      if (response.status === 201) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        navigate("/Home");
      }
    } catch (error) {
      setError("Failed to register. Please try again.");
    }
    setLoading(false);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFirstName("");
    setLastName("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-10">
        <div className="flex flex-col items-center mb-8">
          <img
            className="w-16 h-16 mb-2 rounded-full shadow"
            src="/image.png"
            alt="Logo"
          />
          <h1 className="text-3xl font-bold text-[#153a54] mb-2 tracking-tight">
            Create Your Account
          </h1>
          <p className="text-gray-500 text-sm text-center">
            Sign up to get started with Sahulat!
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="First Name"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              className="border px-4 py-2 w-1/2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              className="border px-4 py-2 w-1/2 rounded"
              required
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border px-4 py-2 w-full rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border px-4 py-2 w-full rounded"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border px-4 py-2 w-full rounded"
            required
          />
          {error && (
            <div className="text-red-600 text-center text-sm">{error}</div>
          )}
          <button
            type="submit"
            className="bg-[#111] text-white font-semibold rounded px-4 py-2 w-full text-lg transition hover:bg-[#153a54]"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link
            to="/UserLogin"
            className="text-blue-600 font-bold hover:underline"
          >
            Login here
          </Link>
        </p>
        <div className="mt-4">
          <p className="text-[10px] text-center leading-tight text-gray-600">
            By signing up, you agree to our terms and conditions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSignUp;
