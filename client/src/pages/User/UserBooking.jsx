import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token'); // Adjust the token retrieval method as necessary
        const response = await axios.get('http://localhost:5000/api/bookRoom/mybookings', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookings(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  console.log("my booking information is : " ,bookings )


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">User Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-xl font-semibold">Address: {booking.house.address}</h2>
              <p>Floor Level: {booking.house.floorLevel}</p>
              <p>House Number: {booking.house.houseNumber}</p>
              <p>Rent Per Month: {booking.house.rentPerMonth}</p>
              <p>From: {new Date(booking.bookedTime.fromTime).toLocaleString()}</p>
              <p>To: {new Date(booking.bookedTime.toTime).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserBooking;