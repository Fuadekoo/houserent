// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import HouseCard from './HouseCard';
// import Loading from '../components/Loader'; // Make sure to import your Loading component

// const HousesList = () => {
//   const [houses, setHouses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchHouses = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/property/active-rooms');
//         if (response.data.success) {
//           setHouses(response.data.data);
//         } else {
//           setError(response.data.message);
//         }
//       } catch (err) {
//         setError('Failed to fetch houses');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHouses();
//   }, []);



//   if (loading) {
//     return <Loading />;
//   }

//   if (error) {
//     return <div className="text-center mt-10 text-red-500">{error}</div>;
//   }

//   return (
//     <div className="flex flex-wrap justify-center gap-6 overflow-y-auto h-96">
//       {houses.map((house) => (
//         <HouseCard key={house._id} house={house} />
//       ))}
//     </div>
//   );
// };

// export default HousesList;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import HouseCard from './HouseCard'; // Assuming you have created this component
import Loading from '../components/Loader'; // Assuming you have a Loader component

const HousesList = () => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookedHouses, setBookedHouses] = useState([]);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/property/active-rooms');
        if (response.data.success) {
          setHouses(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError('Failed to fetch houses');
      } finally {
        setLoading(false);
      }
    };

    const fetchBookedHouses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/bookRoom/getBookedRooms');
        if (response.data.success) {
          setBookedHouses(response.data.data);
        }
      } catch (err) {
        console.error('Failed to fetch booked houses');
      }
    };

    fetchHouses();
    fetchBookedHouses();
  }, []);

  const isBookingActive = (bookedTime) => {
    const now = moment();
    const fromTime = moment(bookedTime.fromTime, 'YYYY-MM-DDTHH:mm:ss');
    const toTime = moment(bookedTime.toTime, 'YYYY-MM-DDTHH:mm:ss');

    return now.isBetween(fromTime, toTime, null, '[]');
  };

  const isHouseBooked = (houseId) => {
    const bookedHousesForHouse = bookedHouses.filter((booking) => booking.house === houseId);

    for (const bookedHouse of bookedHousesForHouse) {
      if (bookedHouse && bookedHouse.bookedTime) {
        if (isBookingActive(bookedHouse.bookedTime)) {
          return true;
        }
      }
    }
    return false;
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-6 overflow-y-auto h-96">
      {houses.map((house) => {
        const isBooked = isHouseBooked(house._id);
        return !isBooked ? (
          <HouseCard key={house._id} house={house} />
        ) : null; // Only display houses that are not booked
      })}
    </div>
  );
};

export default HousesList;
