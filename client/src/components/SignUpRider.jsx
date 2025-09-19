
import React, { useState } from "react";
import axios from "axios";  
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const SignUpRider = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: ""   
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = (e) => {
  e.preventDefault();
  console.log("Rider Signup Data:", formData);

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  const payload = {
    fullName: formData.fullName,
    email: formData.email,
    password: formData.password,
    phoneNumber: formData.phoneNumber,
  };

  
  api.post("/api/signup/rider", payload)
  .then((response) => {
    console.log("Response:", response.data);
    if (response.data.success) {
      alert("Rider signed up successfully! please login to continue.");
      navigate("/login");
    } else {
      alert(response.data.message);
    }
  })
  .catch((error) => {
  console.error("Error signing up:", error.response?.data?.message || error.response?.data || error.message);
  alert(error.response?.data?.message || "Something went wrong");
});
  console.log("Payload:", payload);
};


  return (
    <section className="min-h-screen flex items-center justify-center background-card">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-center primary-font text-color mb-6">Sign Up as a Rider</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="UserName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
            required
          />
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
            required
            minLength={6}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
            required
            minLength={6}
          />
          <button
            type="submit"
            className="w-full background-secondary text-white py-3 rounded-md text-lg font-semibold hover:opacity-90 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </section>
  );
};

export default SignUpRider;
