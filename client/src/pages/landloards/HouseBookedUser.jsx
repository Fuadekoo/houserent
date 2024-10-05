import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loading from '../../components/Loader';

const HouseBookedUser = () => {
  const { houseId } = useParams(); // Get houseId from the URL
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 
      useEffect(() => {
        const fetchBookingData = async () => {
            try {
                const token = localStorage.getItem('token'); // Assuming token is needed for authorization
                const response = await axios.get(`http://localhost:5000/api/bookRoom/roomsBookedUser/${houseId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setBookings(response.data.data); // Store the booking data
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBookingData();
    }, [houseId]);


if(bookings.length === 0){
    return<div> the room has not been booked yet</div>
}

  if (loading) {
    <Loading/>
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Booked Users for House {houseId}</h1>
      {bookings.length === 0 ? (
        <p>No users have booked this house.</p>
      ) : (
        bookings.map((booking) => (
          <div key={booking._id}>
            <h3>User: {booking.user.name}</h3>
            <p>Email: {booking.user.email}</p>
            <p>Phone: {booking.user.phone}</p>
            <p>Booking Duration: {booking.bookedTime.fromTime} - {booking.bookedTime.toTime}</p>
            <p>Total Days: {booking.TotalDays}</p>
            <p>Total Payment: {booking.totalPayment}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default HouseBookedUser;
