import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { WorkerDataContext } from "../context/WorkerContext";

const WorkerProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { setWorker } = useContext(WorkerDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/workerLogin");
      return;
    }

    // Fetch worker profile only if token exists
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/workers/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setWorker(response.data.worker);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching worker profile:", error);
        setIsLoading(false);
        navigate("/workerLogin");
      });
    // eslint-disable-next-line
  }, [token, navigate, setWorker]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default WorkerProtectWrapper;