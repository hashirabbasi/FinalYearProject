import React from "react";
import { Link } from "react-router-dom";
import { useState,useContext} from "react";
import { userDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";  
const userLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [userDate, setUserDate] = useState({});

   const { user, setUser } = useContext(userDataContext);
  const navigate = useNavigate();

  const handleSubmit =async (e) => {
    e.preventDefault();
     const userData = {
      email,
      password,
    };
   const response =  await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)
    
    if (response.status === 200){ 
       const data = response.data;
      setUser(data.user);
      navigate('/Home');
    }


    setEmail("");
    setPassword("");
  };

  return (
    // change image in  your image path
    <div className="p-7 h-screen flex flex-col justify-between ">
      <div>
        <img className=" w-16 mb-10" src="image.png" alt="" />

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
          New here?{" "}
          <Link to="/SignUp" className="text-blue-600">
           <b> Create new Account{" "}</b>
          </Link>
        </p>
      </div>

      <div>
        <Link
          to="/workerLogin"
          className="bg-[#10b461] flex items-center justify-center  text-white font-semibold mb-5 rounded px-4 py-2  w-full text-lg placeholder:text-base"
        >
          Singn In as Worker
        </Link>
      </div>
    </div>
  );
};

export default userLogin;
