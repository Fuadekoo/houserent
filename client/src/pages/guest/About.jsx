import React, { useState, useEffect } from 'react';
import Navbar from '../guest/Navbar';
import Footer from '../guest/Footer';

// Import multiple images
import keyhouse from "../../images/keyhouse.jpg";
import house1 from "../../images/house1.jpg";
import house2 from "../../images/house2.jpg";
import house3 from "../../images/house3.jpg";

// Array of images
const images = [keyhouse, house1, house2, house3];

function About() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="max-w-4xl bg-white shadow-md rounded-lg overflow-hidden mt-4 mx-auto">
                <div className="relative w-full h-64 overflow-hidden">
                    <div
                        className="absolute top-0 left-0 w-full h-full flex transition-transform duration-1000"
                        style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                    >
                        {images.map((image, index) => (
                            <img 
                                key={index}
                                src={image}
                                alt={`House ${index + 1}`} 
                                className="w-full h-64 object-cover flex-shrink-0"
                            />
                        ))}
                    </div>
                </div>
                <div className="p-6">
                    <h1 className="text-3xl font-bold mb-4">About Our System</h1>
                    <p className="text-gray-700 text-lg">
                        Welcome to our house rental system. Our platform provides a seamless experience for finding and renting houses. 
                        With a user-friendly interface and a wide range of options, you can easily find the perfect home that meets your needs.
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default About;