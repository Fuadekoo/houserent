
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