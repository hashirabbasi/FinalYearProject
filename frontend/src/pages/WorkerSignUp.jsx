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
  const [cnicFront, setCnicFront] = useState(null);
  const [cnicBack, setCnicBack] = useState(null);
  const { setWorker } = useContext(WorkerDataContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e, setter) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("serviceType", serviceType);
    formData.append("experience", experience);
    formData.append("status", "inactive");
    if (cnicFront) formData.append("cnicFront", cnicFront);
    if (cnicBack) formData.append("cnicBack", cnicBack);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/workers/register`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.status === 201) {
        alert("Registered successfully! Please wait for admin approval.");
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
      setCnicFront(null);
      setCnicBack(null);
    } catch (err) {
      const errorMsg =
        err.response?.data?.errors?.[0]?.msg ||
        err.response?.data?.message ||
        "Registration failed";
      alert(errorMsg);
      console.error("Registration failed:", err.response?.data || err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-10">
        <div className="flex flex-col items-center mb-8">
          <img className="w-16 h-16 mb-2 rounded-full shadow" src="/image.png" alt="Logo" />
          <h1 className="text-3xl font-bold text-[#153a54] mb-2 tracking-tight">
            Worker Sign Up
          </h1>
          <p className="text-gray-500 text-sm text-center">
            Register as a worker and join Sahulat!
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
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

          {/* CNIC Front Upload */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">CNIC Front Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={e => handleImageChange(e, setCnicFront)}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              required
            />
          </div>
          {/* CNIC Back Upload */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">CNIC Back Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={e => handleImageChange(e, setCnicBack)}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              required
            />
          </div>

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
          <Link to="/workerLogin" className="text-blue-600 font-bold hover:underline">
            Login here
          </Link>
        </p>
        <div className="mt-4">
          <p className='text-[10px] text-center leading-tight text-gray-600'>
            By signing up, you agree to our terms and conditions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorkerSignUp;
