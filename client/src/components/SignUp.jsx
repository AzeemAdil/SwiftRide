import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);
    navigate(`/signup/${selectedRole}`);
  };

  return (
    <section className="background-primary text-white py-16 px-6 md:px-12 text-center min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl md:text-6xl font-bold primary-font mb-12">Sign Up</h1>
      <p className="text-lg md:text-xl mb-6">Choose your role to continue</p>
      
      <div className="flex flex-col md:flex-row gap-6">
        <button
          onClick={() => handleRoleSelection("rider")}
          className="bg-white text-color text-xl px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-gray-200 transition w-64"
        >
          Sign Up as Rider
        </button>
        <button
          onClick={() => handleRoleSelection("driver")}
          className="border border-white text-white text-xl px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-color transition w-64"
        >
          Sign Up as Driver
        </button>
      </div>
      
      <p className="mt-6 text-lg">
        Already have an account? 
        <Link to="/login" className="text-secondary-color underline ml-2">Log In</Link>
      </p>
    </section>
  );
};

export default Signup;
