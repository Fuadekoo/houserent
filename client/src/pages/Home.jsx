// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import HouseCard from './HouseCard';

// // const HousesList = () => {
// //   const [houses, setHouses] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const fetchHouses = async () => {
// //       try {
// //         const response = await axios.get('http://localhost:5000/api/property/active-rooms');
// //         if (response.data.success) {
// //           setHouses(response.data.data);
// //         } else {
// //           setError(response.data.message);
// //         }
// //       } catch (err) {
// //         setError('Failed to fetch houses');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchHouses();
// //   }, []);



// //   if (loading) {
// //     return <Loading />;
// //   }

// //   if (error) {
// //     return <div className="text-center mt-10 text-red-500">{error}</div>;
// //   }

//   // return (
//   //   <div className="flex flex-wrap justify-center gap-6 overflow-y-auto h-96">
//   //     {houses.map((house) => (
//   //       <HouseCard key={house._id} house={house} />
//   //     ))}
//   //   </div>
//   // );
// // };

// // export default HousesList;




// import moment from 'moment';

// function HousesList() {
//   const [allclass, setMyClass] = useState([]);
//   const [bookedHouses, setBookedHouses] = useState([]);

//   useEffect(() => {
//     axios
//       .get('http://localhost:5000/api/property/active-rooms')
//       .then((response) => setMyClass(response.data))
//       .catch((err) => console.log(err));

//     axios
//       .get('http://localhost:5000/api/bookRoom/getBookedRooms')
//       .then((response) => setBookedHouses(response.data))
//       .catch((err) => console.log(err));
//   }, []); 

//   const isBookingActive = (bookedTime) => {
//     const now = moment();
//     const fromTime = moment(bookedTime.fromTime);
//     const toTime = moment(bookedTime.toTime);

//     const isBeforeFromTime = now.isBefore(fromTime.startOf('minute')); // Change 'minute' to 'day' for day-based logic
//     const isAfterToTime = now.isAfter(toTime.endOf('minute')); // Change 'minute' to 'day' for day-based logic

//     return !(isBeforeFromTime || isAfterToTime);
//   };

//   const isHouseBooked = (houseId) => {
//     const bookedHousesForHouse = bookedHouses.filter((booking) => booking.house._id === houseId);

//     for (const bookedHouse of bookedHousesForHouse) {
//       if (bookedHouse && bookedHouse.bookedTime) {
//         const isBookingCompleted = !isBookingActive(bookedHouse.bookedTime);

//         // If booking is active, return true to indicate the house is booked
//         if (!isBookingCompleted && checkOverlap(bookedHouse.bookedTime)) {
//           return true;
//         }
//       }
//     }
//     return false;
//   };

//   const checkOverlap = (bookedTime) => {
//     const now = moment();
//     const fromTime = moment(bookedTime.fromTime);
//     const toTime = moment(bookedTime.toTime);

//     // Check if the current time overlaps with the booked period
//     return now.isBetween(fromTime, toTime, null, '[]'); // '[]' includes both start and end times
//   };

//   return (
//     <div className="flex flex-wrap justify-center gap-6 overflow-y-auto h-96">
//       {allclass.map((houselist) => {
//         const isBooked = isHouseBooked(houselist._id);
//         return !isBooked ? (
//           <div>
          
//           <HouseCard key={houselist._id} house={houselist} />
//           </div>
//         ):null
//        } )}
//     </div>
  
//   );
// }
// export default HousesList;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HouseCard from './HouseCard';
import moment from 'moment';

function HousesList() {
  const [activeHouses, setActiveHouses] = useState([]);
  const [bookedHouses, setBookedHouses] = useState([]);

  useEffect(() => {
    // Fetch active houses
    axios
      .get('http://localhost:5000/api/property/active-rooms')
      .then((response) => setActiveHouses(response.data.data)) // 'data.data' as per your controller response structure
      .catch((err) => console.log(err));

    // Fetch booked houses
    axios
      .get('http://localhost:5000/api/bookRoom/getBookedRooms')
      .then((response) => setBookedHouses(response.data))
      .catch((err) => console.log(err));
  }, []);

  const isBookingActive = (bookedTime) => {
    const now = moment();
    const fromTime = moment(bookedTime.fromTime);
    const toTime = moment(bookedTime.toTime);

    return now.isBetween(fromTime, toTime, null, '[]'); // Check if current time is within booked time
  };

  const isHouseBooked = (houseId) => {
    const houseBookings = bookedHouses.filter(booking => booking.house._id === houseId);

    for (const booking of houseBookings) {
      if (booking && booking.bookedTime && isBookingActive(booking.bookedTime)) {
        return true; // House is currently booked
      }
    }

    return false; // House is available
  };

  return (
    <div className="flex flex-wrap justify-center gap-6 overflow-y-auto h-96">
      {activeHouses.map((house) => {
        const isBooked = isHouseBooked(house._id);
        return !isBooked ? (
          <div key={house._id}>
            <HouseCard house={house} />
          </div>
        ) : null; // Only show house if it's not booked
      })}
    </div>
  );
}

export default HousesList;
