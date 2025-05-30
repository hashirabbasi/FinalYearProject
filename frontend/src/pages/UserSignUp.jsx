import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { userDataContext } from "../context/UserContext";
const UserSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [userDate, setUserDate] = useState({});

  const navigate = useNavigate();
  const { user, setUser } = useContext(userDataContext);
console.log("Context value:", useContext(userDataContext));

  const handleSubmit = async (e) => {
  e.preventDefault();

  const newUser = {
    fullName: {
      firstname,
      lastname,
    },
    email,
    password,
  };

  try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);

    if (response.status === 201) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem("token", data.token);
      navigate('/Home');
    }
  } catch (error) {
    console.error("Registration error:", error);
    alert("Failed to register. Please try again.");
  }

  setEmail("");
  setPassword("");
  setFirstName("");
  setLastName("");
};

  return (
    <div className="p-7 h-screen flex flex-col justify-between ">
      <div>
        <img className=" w-16 mb-10" src="image.png" alt="" />

        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <h3 className="text-base font-medium mb-2">what's your name</h3>
          <div className="flex gap-4 mb-5 ">
            <input
              type="text"
              placeholder="Enter your First name"
              required
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-[#eeeeee] w-1/2  rounded px-4 py-2 border  text-base placeholder:text-base"
            />
            <input
              type="text"
              placeholder="Enter your Last name"
              required
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-[#eeeeee] w-1/2  rounded px-4 py-2 border  text-base placeholder:text-base"
            />
          </div>

          <h3 className="text-base font-medium mb-2">what's your email</h3>

          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-base"
          />

          <h3 className="text-base font-medium mb-2">what's your password</h3>
          <input
            type="password"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-base"
          />
          <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg ">
           Create Account
          </button>
        </form>
        <p className="text-center">
          already have an account?{" "}
          <Link to="/UserLogin" className="text-blue-600">
            <b> Login here </b>
          </Link>
        </p>
      </div>

      <div>
        <p className="text-[8px] leading-tight">
          {" "}
          Lorem Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Officiis omnis magni quae vitae porro error modi ipsum, est illo
          nostrum! Eaque adipisci illum ea. Dolor itaque harum corrupti quis
          et.ipsum, dolor sit amet consectetur adipisicing elit. Unde omnis
          veritatis eligendi sit totam ab saepe voluptates! Aperiam adipisci
          deserunt molestiae! Excepturi eaque laborum hic nam! Quam eius nisi
          ullam.
        </p>
      </div>
    </div>
  );
};

export default UserSignUp;
