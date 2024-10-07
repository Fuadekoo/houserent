// import React from 'react';
// import { useSpring, animated } from 'react-spring';
// import Navbar from './Navbar';
// import Footer from './Footer';
// function About() {
//   const fadeIn = useSpring({ opacity: 1, from: { opacity: 0 } });

//   return (
//     <animated.div style={fadeIn} className="p-8 bg-white shadow-lg rounded-lg">
//       <h1 className="text-3xl font-bold mb-4">About Our System</h1>
//       <p className="text-lg mb-8">
//         Our system is designed to provide the best house renting experience with advanced features and user-friendly interface.
//       </p>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         <DeveloperCard
//           name="Developer 1"
//           description="Expert in frontend development with a passion for creating interactive user experiences."
//         />
//         <DeveloperCard
//           name="Developer 2"
//           description="Backend guru with extensive experience in building scalable and robust systems."
//         />
//         <DeveloperCard
//           name="Developer 3"
//           description="Full-stack developer with a knack for solving complex problems and optimizing performance."
//         />
//       </div>
//     </animated.div>
//   );
// }

// function DeveloperCard({ name, description }) {
//   const cardAnimation = useSpring({
//     transform: 'scale(1)',
//     from: { transform: 'scale(0.8)' },
//     config: { tension: 200, friction: 12 }
//   });

//   return (
//     <animated.div style={cardAnimation} className="p-6 bg-gray-100 shadow-md rounded-md">
//       <h2 className="text-2xl font-semibold mb-2">{name}</h2>
//       <p className="text-base">{description}</p>
//     </animated.div>
//   );
// }

// export default About;
