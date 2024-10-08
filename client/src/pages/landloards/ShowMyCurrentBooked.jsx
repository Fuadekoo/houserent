
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HouseCard from '../guest/HouseCard';



function ShowMyCurrentBooked() {
  const [bookedHouses, setBookedHouses] = useState([]); // All currently booked houses
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch currently booked rooms for the logged-in room owner
    axios
      .get('http://localhost:5000/api/bookRoom/getOwnerCurrentBookedRooms', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming token is stored in localStorage
        }
      })
      .then((response) => {
        setBookedHouses(response.data.data);
        setLoading(false); // Stop loading once data is fetched
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false); // Stop loading on error
      });
  }, []);


  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (bookedHouses.length === 0) return <div>No currently booked rooms found.</div>;

  return (
    <div className="flex flex-wrap justify-center gap-6 overflow-y-auto h-96" style={{height:"690px"}}>
      {bookedHouses.map((booking) => {
        const { house } = booking;

        return (
          <div key={house._id}>
            <HouseCard house={house} />
          </div>
        );
      })}
    </div>
  );
}

export default ShowMyCurrentBooked;
