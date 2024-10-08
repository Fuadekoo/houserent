import React from 'react';
import { FaPhone, FaGlobe, FaEnvelope } from 'react-icons/fa';
import Footer from '../guest/Footer';
import Navbar from '../guest/Navbar';

function Contact() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto p-4 flex-grow">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <div className="flex items-center mb-2">
          <FaPhone className="text-lg mr-2 animate-bounce" />
          <p className="text-lg">Phone: 0911223344</p>
        </div>
        <div className="flex items-center mb-2">
          <FaGlobe className="text-lg mr-2 animate-spin" />
          <p className="text-lg">
            Website: <a href="http://www.houserent.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">www.houserent.com</a>
          </p>
        </div>
        <div className="flex items-center mb-2">
          <FaEnvelope className="text-lg mr-2 animate-pulse" />
          <p className="text-lg">
            Email: <a href="mailto:houserent@gmail.com" className="text-blue-500 underline">houserent@gmail.com</a>
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center mt-4 bg-gray-100 p-4 rounded-lg shadow-md">
          <div className="flex-grow">
            <p className="text-lg text-center md:text-left">Feel free to reach out to us by phone for any inquiries or assistance. We're here to help!</p>
          </div>
          <div className="mt-4 md:mt-0 md:ml-4">
            <img src="https://via.placeholder.com/150" alt="Contact Us" className="w-32 h-32 rounded-full mx-auto md:mx-0 animate-bounce" />
          </div>
        </div>
        <div className="mt-4">
          <img src="https://via.placeholder.com/300x200" alt="Person clicking phone to call" className="w-full h-auto mx-auto" />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;