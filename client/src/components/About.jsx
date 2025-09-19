import React from "react";
import { Link } from "react-router-dom";
import { Users, ShieldCheck, Car } from "lucide-react";

const About = () => {
  return (
    <section className="background-primary text-white py-24 px-6 md:px-12 text-center">
      <h1 className="text-5xl md:text-6xl font-bold primary-font mb-12">About Us</h1>
      
      <div className="max-w-5xl mx-auto">
        
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold secondary-font mb-6">Who We Are</h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            We are a revolutionary ride-sharing platform connecting riders and drivers
            seamlessly. Our goal is to make commuting easy, affordable, and accessible
            for everyone.
          </p>
        </div>

        
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold secondary-font mb-6">Our Mission</h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            To provide a reliable, secure, and eco-friendly transportation solution that
            benefits both drivers and riders.
          </p>
        </div>

       
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold secondary-font mb-6">What We Offer</h2>
          <ul className="text-lg md:text-xl text-left max-w-3xl mx-auto space-y-4">
            <li className="flex items-center"><Car className="mr-2" />Easy ride booking with real-time tracking.</li>
            <li className="flex items-center"><Car className="mr-2" />Affordable fares with transparent pricing.</li>
            <li className="flex items-center"><Car className="mr-2" />Secure and verified drivers for safe travel.</li>
          </ul>
        </div>

        
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold secondary-font mb-6">Your Safety, Our Priority</h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            We ensure a secure and trustworthy experience with verified drivers and 
            seamless support. Our commitment is to provide a safe ride every time.
          </p>
          <div className="flex justify-center mt-6">
            <ShieldCheck className="h-12 w-12" />
          </div>
        </div>

        
        <div className="mt-12">
          <h3 className="text-2xl md:text-3xl font-semibold secondary-font mb-6">Join Us Today!</h3>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <Link to="/signup" className="bg-white text-color text-xl px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-gray-200 transition">
              Sign Up
            </Link>
            <Link to="/contact" className="border border-white text-white text-xl px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-color transition">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
