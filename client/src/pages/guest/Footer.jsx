import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <h1 className="text-2xl font-bold">HouseRent</h1>
                        <p className="text-sm">Find your perfect home</p>
                    </div>
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-400 hover:text-white">Home</a>
                        <a href="#" className="text-gray-400 hover:text-white">About</a>
                        <a href="#" className="text-gray-400 hover:text-white">Contact</a>
                    </div>
                </div>
                <div className="mt-8 text-center text-gray-400">
                    <p>&copy; 2023 HouseRent. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;