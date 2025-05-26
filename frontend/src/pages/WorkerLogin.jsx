import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Workerlogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [userDate, setUserDate] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    setUserDate({
      email: email,
      password: password,
    });

    setEmail("");
    setPassword("");
  };

  return (
    // change image in  your image path
    <div className="p-7 h-screen flex flex-col justify-between ">
      <div>
        <img className=" w-20 mb-10" src="image.png" alt="" />

        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2">what's your email</h3>

          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
          />

          <h3 className="text-lg font-medium mb-2">what's your password</h3>
          <input
            type="password"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
          />
          <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg ">
            Login
          </button>
        </form>
        <p className="text-center">
          Join here!    {"  "}
          <Link to="/WorkerSignUp" className="text-blue-600">
            <b> Register as a Worker{" "}</b>
          </Link>
        </p>
      </div>

      <div>
        <Link
          to="/UserLogin"
          className="bg-[#d5622d] flex items-center justify-center  text-white font-semibold mb-5 rounded px-4 py-2  w-full text-lg placeholder:text-base"
        >
          Singn In as User
        </Link>
      </div>
    </div>
  );
};

export default Workerlogin;
