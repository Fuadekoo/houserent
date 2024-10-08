import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Spin, DatePicker, Button, Form, message, Checkbox } from 'antd';
import swal from 'sweetalert2';
import 'tailwindcss/tailwind.css';
import DisplayLocation from '../components/DisplayLocation';
import { FaMapMarkerAlt } from 'react-icons/fa';

import { useTranslation } from 'react-i18next';

const { RangePicker } = DatePicker;

function BookNow() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [houseDetails, setHouseDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fromTime, setFromTime] = useState();
  const [toTime, setToTime] = useState();
  const [totalDays, setTotalDays] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [isChecked, setIsChecked] = useState(false); // State for checkbox
  
  
  const [showMap, setShowMap] = useState(null); // State to track which map to show

const toggleMapVisibility = (roomId) => {
  if (roomId) {
    setShowMap(showMap === roomId ? null : roomId);
  } else {
    console.error('Invalid room ID');
  }
};


  useEffect(() => {
    const fetchHouseDetails = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        const response = await axios.get(`http://localhost:5000/api/property/singlehouse/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        });
        setHouseDetails(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch house details:', error);
        setLoading(false);
      }
    };

    fetchHouseDetails();
  }, [id]);

  // Handle time slot selection
  function selectedTimeSlot(values) {
    const from = values[0].format('MMM DD YYYY HH:mm');
    const to = values[1].format('MMM DD YYYY HH:mm');
    const diffDays = values[1].diff(values[0], 'minute');
    //const diffDays = values[1].diff(values[0], 'days');  // it iss for testing to wait for the minute not max like day and month


    setFromTime(from);
    setToTime(to);
    setTotalDays(diffDays);
  }

  useEffect(() => {
    if (houseDetails) {
      const rentPerDay = houseDetails.rentPerMonth / 30;
      setTotalPayment(totalDays * rentPerDay);
    }
  }, [totalDays, houseDetails]);

  const handleBooking = async () => {
    if (!fromTime || !toTime || totalDays <= 0 || totalPayment <= 0) {
      // alert('Please select valid booking details');
      swal.fire({
        icon: 'error',
        title: 'Please select valid booking details',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }
    const bookingData = {
      totalPayment,
      bookedTime: { fromTime, toTime },
      totalDays,
    };


    try {
      const response = await axios.post(`http://localhost:5000/api/bookRoom/booking/${id}`, 
        bookingData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data.success) {
        // message.success('House booked successfully');
        swal.fire({
          icon: 'success',
          title: response.data.message || 'House booked successfully',
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        // message.error(response.data.message);
        swal.fire({
          icon: 'error',
          title: response.data.message || 'Failed to book house',
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        // message.error(error.response.data.message);
        swal.fire({
          icon: 'error',
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        // message.error('Failed to book house');
        swal.fire({
          icon: 'error',
          title: 'Failed to book house',
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
  };

  console.log("total day is :", totalDays)


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    
      {loading ? (
        <Spin size="large" />
      ) : (
        houseDetails && (
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl animate__animated animate__fadeIn">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2">
                <div className="flex flex-wrap">
                  {houseDetails.image.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`House ${index}`}
                      className="w-full md:w-1/2 p-2 object-cover"
                    />
                  ))}
                </div>
              </div>

              <div className="md:w-1/2 p-4">
                <h2 className="text-2xl font-bold mb-4">{houseDetails.address}</h2>
                <p className="mb-2">{t('common.booknow.floor')}: {houseDetails.floorLevel}</p>
                <p className="mb-2">{t('common.booknow.house')}: {houseDetails.houseNumber}</p>
                <p className="mb-2">{t('common.booknow.rent')}: {houseDetails.rentPerMonth} birr</p>
                <p className="mb-2">{t('common.booknow.description')}: {houseDetails.description}</p>
                <Form layout="vertical" onFinish={handleBooking}>
                  <Form.Item label="Select Booking Time" required>
                    <RangePicker
                      showTime={{ format: 'HH:mm' }}
                      format="YYYY-MM-DD HH:mm"
                      onChange={selectedTimeSlot}
                      className="w-full"
                    />
                  </Form.Item>
                  <p>total days :{totalDays}</p>
                  <Form.Item>
                    <Checkbox
                      checked={isChecked}
                      onChange={(e) => setIsChecked(e.target.checked)}
                    >
                      {t('common.booknow.iagree')}
                      
                    </Checkbox>
                    
                  </Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="w-full"
                    disabled={!isChecked} // Disable button if checkbox is not checked
                  >
                    {t('common.booknow.book')}
                  </Button>
                </Form>
                 
              </div>
              
            </div>
                              
              {/* Map Button */}
            <button
              className="text-blue-500 hover:text-blue-700 mt-2"
              onClick={() => toggleMapVisibility(houseDetails._id)}
            >
              <span style={{ display: 'flex', flexDirection: 'row' }}>
                <FaMapMarkerAlt />{' '}
                {showMap === houseDetails._id ? ' Hide Map' : ' View Map'}
              </span>
            </button> 

{/* Conditionally display the map with full screen coverage */}

 {showMap === houseDetails._id && houseDetails.RoomLocation && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="relative h-1/4 w-1/4 bg-white shadow-lg rounded">
      <DisplayLocation
        latitude={houseDetails.RoomLocation.latitudeValue}
        longitude={houseDetails.RoomLocation.longitudeValue}
      />
      <button
        onClick={() => setShowMap(null)}
        className="absolute bg-red-500 text-white p-2 rounded"
      >
        Close Map
      </button>
    </div>
  </div>
)}
                               
          </div>
        )
      )}
    </div>
  );
}

export default BookNow;

