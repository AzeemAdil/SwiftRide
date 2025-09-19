import React from 'react'
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRider = ({ children }) => {
    const token = Cookies.get("token");
    const role = Cookies.get("role");
  
    if (!token || role !== "rider") {
      alert("You must be a rider to access this page.");
      return <Navigate to="/login" replace />;
    }
  
    return children;
  };

export default ProtectedRider