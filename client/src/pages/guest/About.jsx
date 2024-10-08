import React from 'react';
import Navbar from '../guest/Navbar';
import keyhouse from "../../images/keyhouse.jpg";

function About() {
    return (
        <div>
            <Navbar />
            <div className="max-w-4xl bg-white shadow-md rounded-lg overflow-hidden mt-4">
                <img 
                    src={keyhouse}
                    alt="System Overview" 
                    className="w-full h-64 object-cover"
                />
                <div className="p-6">
                    <h1 className="text-3xl font-bold mb-4">About Our System</h1>
                    <p className="text-gray-700 text-lg">
                        Welcome to our house rental system. Our platform provides a seamless experience for finding and renting houses. 
                        With a user-friendly interface and a wide range of options, you can easily find the perfect home that meets your needs.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default About;
