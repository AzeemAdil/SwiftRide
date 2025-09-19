
import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="background-primary text-center text-white h-screen flex flex-col justify-center items-center px-6 md:px-12">
      <h1 className="text-5xl md:text-7xl font-bold primary-font mb-6">
        Find or Offer a Ride Easily!
      </h1>
      <p className="text-xl md:text-2xl secondary-font max-w-3xl mb-8">
        Connecting drivers with empty seats to passengers looking for a ride. Join us to save money and travel smart!
      </p>
      <div className="flex space-x-6">
        <Link to="/signup" className="bg-white text-color text-2xl px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-gray-200 transition">
          Sign Up
        </Link>
        <Link to="/login" className="border border-white text-white text-2xl px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-color transition">
          Log In
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
