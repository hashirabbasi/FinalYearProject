// src/pages/UserProtectWrapper.jsx

import React, { useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/UserContext';
import { useEffect } from 'react';

const UserProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const { user } = useContext(userDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/userLogin');
    }
  }, [token, navigate]);

  return <>{children}</>;
};

export default UserProtectWrapper;
