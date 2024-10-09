import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BookedUserCard from '../guest/BookedUserCard';
import Loading from '../../components/Loader';

const HouseBookedUser = () => {
  const { houseId } = useParams();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 3; // Show 3 bookings per page
  
  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `http://localhost:5000/api/bookRoom/roomsBookedUser/${houseId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBookings(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingData();
  }, [houseId]);

  // Calculate the indexes for the current page
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);

  // Pagination controls
  const totalPages = Math.ceil(bookings.length / bookingsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (bookings.length === 0) {
    return <div>No users have booked this house.</div>;
  }

  return (
    <div className='flex gap-1 flex-col items-center justify-center'>
      
      <h1>Booked Users</h1>
      {/* Render current page bookings */}
      
      {currentBookings.map((booking) => (
        <BookedUserCard 
          key={booking._id} 
          booking={booking} 
          image={booking.user.avatar}
          user={booking.user.name}
          email={booking.user.email}
          phone={booking.user.phone}
          fromTime={booking.bookedTime.fromTime}
          toTime={booking.bookedTime.toTime}
          totalDays={booking.TotalDays}
          totalPayment={booking.totalPayment.toFixed(2)}
        />
      ))}

      {/* Pagination controls */}
      <div className="flex justify-end items-center mt-4 space-x-2">
        <button 
          onClick={handlePreviousPage} 
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button 
          onClick={handleNextPage} 
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HouseBookedUser;
