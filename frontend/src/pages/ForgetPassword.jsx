import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = ({ onOTPSent }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleForgot = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/forgetPassword`,
        { email }
      );
      setSuccess("OTP sent to your email.");
      setLoading(false);
      if (onOTPSent) onOTPSent(email);
    } catch (err) {
      setLoading(false);
      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Failed to send OTP"
      );
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow p-6">
      <h2 className="text-2xl font-semibold text-center mb-4">Forgot Password</h2>
      <form onSubmit={handleForgot} className="space-y-4">
        <input
          type="email"
          placeholder="Enter your Gmail address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-4 py-2 rounded"
          required
        />
        {error && <div className="text-red-600 text-center text-sm">{error}</div>}
        {success && (
          <div className="text-green-600 text-center text-sm">{success}</div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded py-2"
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;