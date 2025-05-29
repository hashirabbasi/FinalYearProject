import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const WorkerLogout = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/workers/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.removeItem("token");
          navigate("/workerLogin");
        }
      })
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/workerLogin");
      });
  }, [token, navigate]);

  return <div>Logging out...</div>;
};

export default WorkerLogout;