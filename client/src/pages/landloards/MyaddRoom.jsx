import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaCheckCircle, FaClock, FaUser, FaMapMarkerAlt } from 'react-icons/fa'; // Import icons from react-icons
import { Link } from 'react-router-dom';
import swal from 'sweetalert2';
import DisplayLocation from '../../components/DisplayLocation';

function MyaddRoom() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const roomsPerPage = 6;


    const [showMap, setShowMap] = useState(null); // State to track which map to show
    const toggleMapVisibility = (roomId) => {
        setShowMap(showMap === roomId ? null : roomId); // Toggle visibility based on roomId
    };

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const token = localStorage.getItem('token'); // Adjust the token retrieval method as necessary
                const response = await axios.get('http://localhost:5000/api/property/myaddroom', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setRooms(response.data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, []);

    if (rooms.length === 0) {
        return <div><p>The user has no room yet</p></div>;
    }

    const handleDelete = async (roomId) => {
        const result = await swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                const token = localStorage.getItem('token'); // Adjust the token retrieval method as necessary
                const response = await axios.delete(`http://localhost:5000/api/property/deleteroom/${roomId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data.success) {
                    setRooms(rooms.filter(room => room._id !== roomId));
                    swal.fire(
                        'Deleted!',
                        'Your room has been deleted.',
                        'success'
                    );
                } else {
                    swal.fire({
                        icon: 'error',
                        title: 'Failed to Delete room.',
                        text: response.data.message || 'An error occurred',
                        timer: 3000,
                    });
                }
            } catch (error) {
                console.error('Failed to delete room:', error);
                swal.fire({
                    icon: 'error',
                    title: 'Failed to delete room',
                    text: error.response?.data?.message || 'An error occurred',
                    timer: 3000,
                });
            }
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

    // Pagination logic
    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = rooms.slice(indexOfFirstRoom, indexOfLastRoom);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">My Added Rooms</h1>
            {currentRooms.length === 0 ? (
                <p>No rooms found.</p>
            ) : (
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {currentRooms.map((room) => (
                            <div
                                key={room._id}
                                className="bg-white shadow-md rounded-lg p-4 transform transition duration-500 hover:scale-105 relative"
                            >
                                <div className="p-4">
                               
                                <h2 className="text-xl font-semibold">Address: {room.address}</h2>
                                    <p>Floor Level: {room.floorLevel}</p>
                                    <p>House Number: {room.houseNumber}</p>
                                    <p>Rent Per Month: {room.rentPerMonth}</p>
                                    <p>Room Status: {room.active ? 'Active' : 'Pending'}</p>
                                   
                                {room.active ? (
                                        <FaCheckCircle style={{ color: 'green' }} /> // Display verification icon if active
                                    ) : (
                                        <FaClock style={{ color: 'orange' }} /> // Display pending icon if not active
                                    )}
    
                                 {/* Map toggle button */}
                                <button
                                    className="text-blue-500 hover:text-blue-700 mt-2"
                                    onClick={() => toggleMapVisibility(room._id)}
                                >
                                <span style={{display:"flex", flexDirection:"row"}}>
                                     <FaMapMarkerAlt /> {/* Map icon */}
                                    {showMap === room._id ? ' Hide Map' : ' View Map'}
                                </span>
                                   
                                </button>

                                {/* Conditionally display the map */}
                                {showMap === room._id && room.RoomLocation && (
                                    <DisplayLocation
                                        latitude={room.RoomLocation.latitudeValue}
                                        longitude={room.RoomLocation.longitudeValue}
                                    />
                                )}

                               
                            </div>
                                
                                <div className="absolute top-4 right-4 flex space-x-2">
                                    {/* the link to all the booked user information */}
                                    <Link to={`/roomsBookedUser/${room._id}`}>
                                        <FaUser className="mr-1" /> 
                                    </Link>
                                    
                                    {/* the link to editRoom info */}
                                    <Link className="text-blue-500 hover:text-blue-700 transition duration-300" 
                                        to={`/editOwnerHouseInfo/${room._id}`}>
                                        <FaEdit />
                                    </Link>

                                    <button
                                        onClick={() => handleDelete(room._id)}
                                        className="text-red-500 hover:text-red-700 transition duration-300"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50"
                        >
                            Prev
                        </button>
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={indexOfLastRoom >= rooms.length}
                            className="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MyaddRoom;


