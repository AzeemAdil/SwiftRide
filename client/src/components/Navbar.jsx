import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Cookies from 'js-cookie';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedin, setLoggedin] = useState(false);
  const [isDriver, setDriver] = useState(false);

  useEffect(()=>{
    const token = Cookies.get('token');
    const role = Cookies.get("role");
    if(token){
      setLoggedin(true);
      if(role==="driver"){
        setDriver(true);
      }
    }
    
  },[])

  const handleLogOut = () =>{
    Cookies.remove('token');
    Cookies.remove('role');
    setLoggedin(false);
  }

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="background-primary shadow-md fixed top-0 left-0 w-full z-80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
        
        <Link to="/" className="flex items-center gap-2">
          {/* <img src="/logo.svg" alt="Logo" className="h-10 w-auto" /> */}
          <span className="text-3xl font-bold text-white primary-font">SwiftRides</span>
        </Link>

        <nav className="hidden md:flex space-x-8 secondary-font text-lg text-white">
          <Link to="/" className="hover:text-gray-300 transition">Home</Link>
          <Link to="/rider-dashboard" className={`hover:text-gray-300 transition ${isLoggedin ? "":"hidden"} ${isDriver? "hidden" : ""}`}>Find Rides</Link>
          <Link to="/driver-dashboard" className={`hover:text-gray-300 transition  ${isDriver? "" : "hidden"}`}>Offer a Ride</Link>
          <Link to="/how-it-works" className="hover:text-gray-300 transition">How It Works</Link>
          <Link to="/faq" className="hover:text-gray-300 transition">FAQ</Link>
          <Link to="/contact" className="hover:text-gray-300 transition">Contact</Link>
          {/* <Link to="/profile" className="hover:text-gray-300 transition">Profile</Link> */}
        </nav>

        <div className={`items-center space-x-4 ${isLoggedin ? 'hidden' : 'hidden md:flex'}`}>
          <Link to="/login" className="text-white hover:text-gray-300 text-lg">Login</Link>
          <Link to="/signup" className="background-secondary text-white px-5 py-2 rounded-full hover:bg-opacity-90 text-lg transition-all">Sign Up</Link>
        </div>
        <div className={`items-center space-x-4 ${isLoggedin ? 'hidden md:flex' : 'hidden'}`}>
          <Link to="/" onClick={handleLogOut} className="text-white hover:text-gray-300 text-lg">Logout</Link>
        </div>

        

        <button onClick={toggleMenu} className="md:hidden text-white">
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

   
      {menuOpen && (
        <div className="md:hidden background-primary px-6 pb-6 space-y-4 secondary-font text-white">
          <Link to="/" onClick={toggleMenu} className="block text-lg hover:text-gray-300">Home</Link>
          <Link to="/rider-dashboard" onClick={toggleMenu} className={`block text-lg hover:text-gray-300 ${isLoggedin ? "":"hidden"} ${isDriver? "hidden" : ""}`}>Find Rides</Link>
          <Link to="/driver-dashboard" onClick={toggleMenu} className={`block text-lg hover:text-gray-300 ${isDriver? "" : "hidden"}`}>Offer a Ride</Link>
          <Link to="/how-it-works" onClick={toggleMenu} className="block text-lg hover:text-gray-300">How It Works</Link>
          <Link to="/faq" onClick={toggleMenu} className="block text-lg hover:text-gray-300">FAQ</Link>
          <Link to="/contact" onClick={toggleMenu} className="block text-lg hover:text-gray-300">Contact</Link>
          {/* <Link to="/profile" onClick={toggleMenu} className="block text-lg hover:text-gray-300">Profile</Link> */}
          <hr className="border-gray-600" />
          <div className={`${isLoggedin ? "hidden" : ""}`}>
            <Link to="/login" onClick={toggleMenu} className="block text-lg hover:text-gray-300">Login</Link>
            <Link to="/signup" onClick={toggleMenu} className="block background-secondary text-center py-2 rounded-full hover:bg-opacity-90">Sign Up</Link>
          </div>
          <div className={`${isLoggedin ? "" : "hidden"}`}>
            <Link to="/" onClick={()=>{toggleMenu(); handleLogOut();}} className="block background-secondary text-center py-2 rounded-full hover:bg-opacity-90">Log out</Link>
          </div>

        </div>
      )}
    </header>
  );
};

export default Navbar;
