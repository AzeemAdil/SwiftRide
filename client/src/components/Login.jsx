
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password || !formData.role) {
      setError("All fields are required");
      return;
    }
    setError("");
  
    api
      .post("/api/login", formData)
      .then((response) => {
        if (response.data.success) {
        
          if (formData.role === "rider") {
            navigate("/rider-dashboard");
          } else if (formData.role === "driver") {
            navigate("/driver-dashboard");
          }
        } else {
          setError(response.data.message);
        }
      })
      .catch((error) => {
  console.error("Error signing up:", error.response?.data?.message || error.response?.data || error.message);
  alert(error.response?.data?.message || "Something went wrong");
});
    

  };

  return (
    <section className="min-h-screen flex items-center justify-center background-primary text-white px-6 py-12">
      <div className="max-w-md w-full background-card p-8 rounded-2xl shadow-xl text-center">
        <h1 className="text-4xl font-bold primary-font text-color mb-6">Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-left text-lg font-semibold text-color">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-background-secondary"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-left text-lg font-semibold text-color">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-background-secondary"
              placeholder="Enter your password"
              minLength={6}
            />
          </div>
          <div>
            <label className="block text-left text-lg font-semibold text-color">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-background-secondary"
            >
              <option value="">Select your role</option>
              <option value="rider">Rider</option>
              <option value="driver">Driver</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-3 background-secondary text-white text-xl font-semibold rounded-lg hover:opacity-90 transition"
          >
            Log In
          </button>
        </form>
        <p className="mt-4 text-lg text-color">
          Don't have an account?{" "}
          <Link to="/signup" className="text-background-secondary font-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
