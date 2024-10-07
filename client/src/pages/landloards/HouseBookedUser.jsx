// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const HouseBookedUser = () => {
//   const { houseId } = useParams(); // Get houseId from the URL
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

 
//       useEffect(() => {
//         const fetchBookingData = async () => {
//             try {
//                 const token = localStorage.getItem('token'); // Assuming token is needed for authorization
//                 const response = await axios.get(`http://localhost:5000/api/bookRoom/roomsBookedUser/${houseId}`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 });
//                 setBookings(response.data.data); // Store the booking data
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchBookingData();
//     }, [houseId]);


// if(bookings.length === 0){
//     return<div> the room has not been booked yet</div>
// }

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h1>Booked Users for House {houseId}</h1>
//       {bookings.length === 0 ? (
//         <p>No users have booked this house.</p>
//       ) : (
//         bookings.map((booking) => (
//           <div key={booking._id}>
//             <h3>User: {booking.user.name}</h3>
//             <p>Email: {booking.user.email}</p>
//             <p>Phone: {booking.user.phone}</p>
//             <p>Booking Duration: {booking.bookedTime.fromTime} - {booking.bookedTime.toTime}</p>
//             <p>Total Days: {booking.TotalDays}</p>
//             <p>Total Payment: {booking.totalPayment}</p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default HouseBookedUser;


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
  const bookingsPerPage = 4; // Show 5 bookings per page
  
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
    <Loading/>
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (bookings.length === 0) {
    return <div>No users have booked this house.</div>;
  }

   return (
    <div>
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
            totalPayment={booking.totalPayment}
        />
      ))}

      {/* Pagination controls */}
      <div className="pagination-controls">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Prev
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );

  // return (
  //   <div>
  //     <h1 className="text-xl font-bold">Booked Users for House {houseId}</h1>
  //     <div className="space-y-4">
  //       {bookings.map((booking) => (
  //         <BookedUserCard
  //           key={booking._id}
            // image={booking.user.avatar}
            // user={booking.user.name}
            // email={booking.user.email}
            // phone={booking.user.phone}
            // fromTime={booking.bookedTime.fromTime}
            // toTime={booking.bookedTime.toTime}
            // totalDays={booking.TotalDays}
            // totalPayment={booking.totalPayment}
  //         />
  //       ))}
  //     </div>
  //   </div>
  // );


};

export default HouseBookedUser;

