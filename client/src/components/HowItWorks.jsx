import React from "react";
import { Link } from "react-router-dom";
import { Car, ShieldCheck, HelpCircle } from "lucide-react";

const HowItWorks = () => {
  return (
    <section className="background-primary text-white py-32 px-6 md:px-12 text-center">
      <h1 className="text-5xl md:text-6xl font-bold primary-font mb-12">How It Works</h1>
      
      <div className="max-w-5xl mx-auto">
        
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold primary-font mb-6">For Riders</h2>
          <p className="text-lg md:text-xl mb-4">Need a ride? Find one in just a few clicks.</p>
          <ul className="text-lg md:text-xl space-y-4 text-left max-w-3xl mx-auto">
            <li className="flex items-center"><Car className="mr-2" />Search for available rides.</li>
            <li className="flex items-center"><Car className="mr-2" />Book your ride securely.</li>
            <li className="flex items-center"><Car className="mr-2" />Meet your driver and enjoy the ride!</li>
            <li className="flex items-center"><Car className="mr-2" />Also if wanna share ride with others you can do that as well and save money</li>
          </ul>
        </div>

        
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold primary-font mb-6">For Drivers</h2>
          <p className="text-lg md:text-xl mb-4">Got extra seats? Earn money by sharing your ride.</p>
          <ul className="text-lg md:text-xl space-y-4 text-left max-w-3xl mx-auto">
            <li className="flex items-center"><Car className="mr-2" />Sign up and list your ride.</li>
            <li className="flex items-center"><Car className="mr-2" />Accept ride requests.</li>
            <li className="flex items-center"><Car className="mr-2" />Drive and earn!</li>
          </ul>
        </div>

       
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold primary-font mb-6">Safety & Trust</h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            We verify our drivers and provide secure payments. Your safety is our priority.
          </p>
          <div className="flex justify-center mt-6">
            <ShieldCheck className="h-12 w-12" />
          </div>
        </div>

       
        <div className="mt-12">
          <h3 className="text-2xl md:text-3xl font-semibold primary-font mb-6">Ready to start your journey?</h3>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <Link to="/signup" className="bg-white text-color text-xl px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-gray-200 transition">
              Sign Up
            </Link>
            <Link to="/login" className="border border-white text-white text-xl px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-color transition">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
