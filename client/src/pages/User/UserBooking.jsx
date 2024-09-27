import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fromTime, setFromTime] = useState('');
  const [toTime, setToTime] = useState('');

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

  const handleBooking = async (houseId) => {
    try {
      const token = localStorage.getItem('token'); // Adjust the token retrieval method as necessary

      const response = await axios.post(`http://localhost:5000/api/bookRoom/booking/${houseId}`, {
        fromTime,
        toTime,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Booking successful:', response.data);
    } catch (err) {
      console.error('Booking failed:', err.message);
    }
  };

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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">User Bookings</h1>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fromTime">
          From Time
        </label>
        <input
          type="datetime-local"
          id="fromTime"
          value={fromTime}
          onChange={(e) => setFromTime(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="toTime">
          To Time
        </label>
        <input
          type="datetime-local"
          id="toTime"
          value={toTime}
          onChange={(e) => setToTime(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
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
              <button
                onClick={() => handleBooking(booking.house._id)}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
              >
                Book Again
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserBooking;