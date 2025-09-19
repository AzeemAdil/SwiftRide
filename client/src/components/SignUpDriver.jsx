
import React, { useState } from "react";
import axios from "axios";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const SignUpDriver = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    vehicleModel: "",
    licensePlate: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Driver Signup Data:", formData);

    api.post("/api/signup/driver", formData)
      .then((response) => {
        console.log("Response:", response.data);
        if (response.data.success) {
          alert("Driver signed up successfully! please login to continue.");
          navigate("/login");
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
  console.error("Error signing up:", error.response?.data?.message || error.response?.data || error.message);
  alert(error.response?.data?.message || "Something went wrong");
});
  };

  return (
    <div className="min-h-screen flex items-center justify-center background-primary text-white px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-color">
        <h2 className="text-3xl font-bold primary-font text-center mb-6">Driver Signup</h2>
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
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
            required
          />
          <input
            type="text"
            name="vehicleModel"
            placeholder="Vehicle Model"
            value={formData.vehicleModel}
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
            required
          />
          <input
            type="text"
            name="licensePlate"
            placeholder="License Plate"
            value={formData.licensePlate}
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
            required
          />
          <button
            type="submit"
            className="w-full background-secondary text-white py-3 rounded-md font-semibold hover:opacity-90 transition"
          >
            Sign Up as Driver
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpDriver;
