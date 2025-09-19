import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedDriver = ({ children }) => {
    const token = Cookies.get("token");
    const role = Cookies.get("role");
  
    if (!token || role !== "driver") {
      alert("You must be a driver to access this page.");
      return <Navigate to="/login" replace />;
    }
  
    return children;
  };

export default ProtectedDriver;