import React from "react";
import { Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {
  return (
    <section className="background-primary text-white py-32 px-6 md:px-12 text-center">
      <h1 className="text-5xl md:text-6xl font-bold primary-font mb-12">Contact Us</h1>

      <div className="max-w-4xl mx-auto text-left">
       
        <div className="mb-12 text-lg md:text-xl">
          <p className="mb-4 flex items-center">
            <Mail className="mr-3" /> Email: support@rideshare.com
          </p>
          <p className="mb-4 flex items-center">
            <Phone className="mr-3" /> Phone: +123 456 7890
          </p>
          <p className="flex items-center">
            <MapPin className="mr-3" /> Location: 123 RideShare Street, City, Country
          </p>
        </div>

        
        <form className="bg-white p-6 rounded-lg shadow-lg text-color">
          <h2 className="text-2xl font-semibold secondary-font mb-6">Send Us a Message</h2>
          <div className="mb-4">
            <label className="block text-lg mb-2" htmlFor="name">Name</label>
            <input className="w-full p-3 border rounded-lg" type="text" id="name" placeholder="Your Name" required />
          </div>
          <div className="mb-4">
            <label className="block text-lg mb-2" htmlFor="email">Email</label>
            <input className="w-full p-3 border rounded-lg" type="email" id="email" placeholder="Your Email" required />
          </div>
          <div className="mb-4">
            <label className="block text-lg mb-2" htmlFor="message">Message</label>
            <textarea className="w-full p-3 border rounded-lg" id="message" rows="5" placeholder="Your Message" required></textarea>
          </div>
          <button type="submit" className="background-secondary text-white text-lg px-6 py-3 rounded-lg font-semibold shadow-lg hover:opacity-90 transition">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
