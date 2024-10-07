


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HouseCard from './HouseCard';
import moment from 'moment';

function BookedRoomsCurrent() {
  const [bookedHouses, setBookedHouses] = useState([]); // All booked houses

  useEffect(() => {
    // Fetch all booked rooms
    axios
      .get('http://localhost:5000/api/bookRoom/getBookedRooms')
      .then((response) => setBookedHouses(response.data))
      .catch((err) => console.log(err));
  }, []);

  // Function to check if booking time is active (current time is between fromTime and toTime)
  const isBookingActive = (bookedTime) => {
    const now = moment();
    const fromTime = moment(bookedTime.fromTime);
    const toTime = moment(bookedTime.toTime);

    return now.isBetween(fromTime, toTime, null, '[]'); // Return true if now is within the booking time
  };

  return (
    <div className="flex flex-wrap justify-center gap-6 overflow-y-auto h-96">
      {bookedHouses.map((booking) => {
        const { house, bookedTime } = booking;

        // Only show the house if the booking is currently active
        return isBookingActive(bookedTime) ? (
          <div key={house._id}>
            <HouseCard house={house} />
          </div>
        ) : null; // Skip rendering if the booking is not active
      })}
    </div>
  );
}

export default BookedRoomsCurrent;
