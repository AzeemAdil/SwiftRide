
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Smartphone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="background-primary pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         
          <div>
            <h3 className="text-2xl font-bold heading-color mb-4 primary-font">SwiftRides</h3>
            <p className="heading-color text-base secondary-font mb-4">
              Connecting drivers with empty seats to passengers looking for a ride. Save money, make friends, and help
              the environment!
            </p>
            <div className="flex space-x-4">
              <a href="#" className="heading-color hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="heading-color hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="heading-color hover:text-white">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          
          <div>
            <h3 className="text-xl font-semibold heading-color mb-4 primary-font">Quick Links</h3>
            <ul className="space-y-2 secondary-font">
              <li>
                <Link to="/about" className="heading-color hover:text-white text-base">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="heading-color hover:text-white text-base">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/faq" className="heading-color hover:text-white text-base">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="heading-color hover:text-white text-base">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

         
          <div>
            <h3 className="text-xl font-semibold heading-color mb-4 primary-font">Contact Us</h3>
            <ul className="space-y-3 secondary-font">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 heading-color mr-2 mt-0.5" />
                <span className="heading-color text-base">123 Ride Avenue, San Francisco, CA 94103</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 heading-color mr-2" />
                <a href="mailto:mrnekoxd4@gmail.com" className="heading-color hover:text-white text-base">
                mrnekoxd4@gmail.com
                </a>
              </li>
              <li className="flex items-center">
                <Smartphone className="h-5 w-5 heading-color mr-2" />
                <a href="tel:+92-323-8241291" className="heading-color hover:text-white text-base">
                +92-323-8241291
                </a>
              </li>
            </ul>
          </div>
        </div>

       
        <div className="mt-12 pt-8 border-t border-gray-700 text-center">
          <p className="heading-color text-base secondary-font">
            © {new Date().getFullYear()} SwiftRides. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}


