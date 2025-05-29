import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { WorkerDataContext } from '../context/WorkerContext';

const WorkerSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [experience, setExperience] = useState("");
  const { setWorker } = useContext(WorkerDataContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newWorker = {
      firstname,
      lastname,
      email,
      password,
      phone,
      serviceType,
      experience,
      status: "inactive", // Required by backend validator
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/workers/register`,
        newWorker
      );

      if (res.status === 201) {
        alert("Registered successfully! Please wait for admin approval.");
        // Do NOT set token or setWorker here
        navigate('/workerLogin');
      }

      // Clear form fields
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
      setPhone("");
      setServiceType("");
      setExperience("");
    } catch (err) {
      const errorMsg =
        err.response?.data?.errors?.[0]?.msg ||
        err.response?.data?.message ||
        "Registration failed";
      alert(errorMsg);
      console.error("Registration failed:", err.response?.data || err.message);
    }
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between bg-gray-50">
      <div>
        <img className="w-16 mb-10" src="/image.png" alt="Logo" />
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="First Name"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
            className="border px-4 py-2 w-full rounded"
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
            className="border px-4 py-2 w-full rounded"
            required
          />
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
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border px-4 py-2 w-full rounded"
            required
          />
          <select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="border px-4 py-2 w-full rounded"
            required
          >
            <option value="">Select Service Type</option>
            <option value="plumber">Plumber</option>
            <option value="electrician">Electrician</option>
            <option value="carpenter">Carpenter</option>
            <option value="cleaner">Cleaner</option>
            <option value="painter">Painter</option>
            <option value="other">Other</option>
          </select>
          <input
            type="number"
            placeholder="Years of Experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="border px-4 py-2 w-full rounded"
            required
          />

          <button type="submit" className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg">
            Create Account
          </button>
        </form>
        <p className="text-center mt-2">
          Already have an account?{" "}
          <Link to="/workerLogin" className="text-blue-600 font-bold">
            Login here
          </Link>
        </p>
      </div>
      <div>
        <p className='text-[10px] text-center leading-tight text-gray-600'>
          By signing up, you agree to our terms and conditions.
        </p>
      </div>
    </div>
  );
};

export default WorkerSignUp;
