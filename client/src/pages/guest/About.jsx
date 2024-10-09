// import React, { useState, useEffect } from 'react';
// import Navbar from '../guest/Navbar';
// import Footer from '../guest/Footer';

// // Import multiple images
// import keyhouse from "../../images/keyhouse.jpg";
// import house1 from "../../images/house1.jpg";
// import house2 from "../../images/house2.jpg";
// import house3 from "../../images/house3.jpg";

// // Array of images
// const images = [keyhouse, house1, house2, house3];

// function About() {
//     const [currentImageIndex, setCurrentImageIndex] = useState(0);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
//         }, 4000);

//         return () => clearInterval(interval);
//     }, []);

//     return (
//         <div className="flex flex-col min-h-screen">
//             <Navbar />
//             <div className="max-w-4xl bg-white shadow-md rounded-lg overflow-hidden mt-4 mx-auto">
//                 <div className="relative w-full h-64 overflow-hidden">
//                     <div
//                         className="absolute top-0 left-0 w-full h-full flex transition-transform duration-1000"
//                         style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
//                     >
//                         {images.map((image, index) => (
//                             <img 
//                                 key={index}
//                                 src={image}
//                                 alt={`House ${index + 1}`} 
//                                 className="w-full h-64 object-cover flex-shrink-0"
//                             />
//                         ))}
//                     </div>
//                 </div>
//                 <div className="p-6">
//                     <h1 className="text-3xl font-bold mb-4">About Our System</h1>
//                     <p className="text-gray-700 text-lg">
//                         Welcome to our house rental system. Our platform provides a seamless experience for finding and renting houses. 
//                         With a user-friendly interface and a wide range of options, you can easily find the perfect home that meets your needs.
//                     </p>
//                 </div>
//             </div>
//             <Footer />
//         </div>
//     );
// }

// export default About;

import React from 'react';
import keyhouse from "../../images/keyhouse.jpg";
import house1 from "../../images/house1.jpg";
import house2 from "../../images/house2.jpg";
import house3 from "../../images/house3.jpg";
import wege1 from "../../images/wege1.jpg";
import fuad1 from "../../images/fuad1.jpg";
import ebisa1 from "../../images/ebisa1.jpg";
import Navbar from './Navbar';
import { useTranslation } from 'react-i18next';




// Example images for the carousel
const images = [
  keyhouse,
  house1,
  house2,
  house3,
];

const About = () => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
    const {t} = useTranslation();

    const developers = [
  {
    name: t('guest.about.FuadAbdurahaman'),
    role: t('guest.about.Frole'),
    image: fuad1, // Use the imported image directly
    description:t('guest.about.Fdescription'),
   
  },
  {
    name: t('guest.about.WegeneArgow'),
    role: t('guest.about.Wrole'),
    image: wege1, // Use the imported image directly
    description:t('guest.about.Wdescription'),
  },
  {
    name: t('guest.about.EbisaTebalu'),
    role: t('guest.about.Erole'),
    image: ebisa1, // Use the imported image directly
    description:t('guest.about.Edescription'),
    
  },
];

  return (
    // Add Navbar here
    <div className="bg-gradient-to-r from-indigo-50 to-gay-500 min-h-screen py-0">
      <Navbar /> {/* Include Navbar at the top */}

      <div className="container mx-auto px-4">
        {/* About Our System Section */}
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
            <h1 className="text-3xl font-bold mb-4">{t('guest.about.AboutOurSystem')}</h1>
            <p className="text-gray-700 text-lg">
              {t('guest.about.Welcome')}
            </p>
          </div>
        </div>

        {/* Heading for Team Section */}
        <h1 className="text-4xl font-bold text-center text-black mb-8 mt-8">{t('guest.about.MeetOurTeam')}</h1>

        {/* Developer Cards */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {developers.map((developer, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
              {/* Developer Image */}
              <div className="flex justify-center">
                <img
                  className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-md mt-4" // Adjusted size and added border for visibility
                  src={developer.image} // Directly use the imported image
                  alt={developer.name}
                />
              </div>
              {/* Developer Info */}
              <div className="p-6 text-center">
                <h2 className="text-xl font-semibold text-gray-800">{developer.name}</h2>
                <p className="text-gray-500 text-sm mb-2">{developer.role}</p>
                <p className="text-gray-600">{developer.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
