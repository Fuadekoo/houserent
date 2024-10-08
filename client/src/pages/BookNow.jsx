import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaShareAlt, FaMapMarkerAlt } from 'react-icons/fa'; // Import the share icon and map marker icon from react-icons
import { useParams } from 'react-router-dom';
import { Spin, DatePicker, Button, Form, Checkbox } from 'antd';
import swal from 'sweetalert2';
import 'tailwindcss/tailwind.css';
import DisplayLocation from '../components/DisplayLocation';
import { useTranslation } from 'react-i18next';
import Stamp from "../images/stamp.png";
import jsPDF from 'jspdf'; // Import jsPDF for PDF generation
import 'jspdf-autotable'; // Import jspdf-autotable for table generation

const { RangePicker } = DatePicker;

function BookNow() {
  const [showPopup, setShowPopup] = useState(false);
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
        swal.fire({
          icon: 'success',
          title: response.data.message || 'House booked successfully',
          showConfirmButton: false,
          timer: 1500
        });

        // Generate the PDF after successful booking
        generatePDF(response.data.data);  // Pass the booking details for PDF generation
      } else {
        swal.fire({
          icon: 'error',
          title: response.data.message || 'Failed to book house',
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        swal.fire({
          icon: 'error',
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        swal.fire({
          icon: 'error',
          title: 'Failed to book house',
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
};

// PDF generation function
const generatePDF = (bookingData) => {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(20);
  doc.setTextColor(0, 0, 255); // Blue color for title
  doc.text('Booking Confirmation', 105, 20, null, null, 'center');

  // House and User Info
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0); // Black color for text
  doc.text(`House Address: ${houseDetails?.address}`, 10, 40);
  doc.text(`Rent Per Month: ${houseDetails?.rentPerMonth} birr`, 10, 50);
  doc.text(`Total Days Booked: ${bookingData.totalDays}`, 10, 60);
  doc.text(`Commission Price: ${houseDetails?.adminPrice} birr`, 10, 70);
  doc.text(`Booking Payment: ${bookingData.totalPayment} birr`, 10, 80);
  doc.text(`Booking From: ${bookingData.bookedTime.fromTime}`, 10, 90);
  doc.text(`Booking To: ${bookingData.bookedTime.toTime}`, 10, 100);

  // Static Data
  doc.setFontSize(14);
  doc.setTextColor(255, 0, 0); // Red color for static data
  doc.text('Company Name: HouseRent', 10, 120);
  doc.text('Contact: +123456789', 10, 130);
  doc.text('Email: info@houserent.com', 10, 140);

  // Center the stamp
  const pageWidth = doc.internal.pageSize.getWidth();
  const stampWidth = 50;
  const stampHeight = 50;
  const stampX = (pageWidth - stampWidth) / 2;
  doc.addImage(Stamp, 'PNG', stampX, 150, stampWidth, stampHeight);

  // Save the PDF
  doc.save('booking-confirmation.pdf');
};


  const handleShareClick = () => {
    const shareValue = `http://localhost:3000/booking/${id}`;
    navigator.clipboard.writeText(shareValue).then(() => {
      swal.fire({
        icon: 'success',
        title: 'Copied to clipboard!',
        showConfirmButton: false,
        timer: 1500
      });
    }).catch(err => {
      console.error('Failed to copy: ', err);
      swal.fire({
        icon: 'error',
        title: 'Failed to copy!',
        showConfirmButton: false,
        timer: 1500
      });
    });
  };

  console.log("total day is :", totalDays)

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  return (
    <div className="min-h-200 flex items-center justify-center bg-gray-100" >
      {loading ? (
        <Spin size="large" />
      ) : (
        houseDetails && (
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl animate__animated animate__fadeIn " style={{backgroundColor:"red" ,marginTop:"2px"}}>
            <div className="flex flex-col md:flex-row ">
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
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                 
                  {houseDetails.address}
                  <FaShareAlt className="ml-9  mr-2 cursor-pointer" onClick={handleShareClick}  /><h6 className='text-sm'>share link</h6>
                </h2>
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
                      onChange={handleCheckboxChange}
                      // onChange={(e) => setIsChecked(e.target.checked)}
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

{showPopup && (
              <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-black opacity-50 w-full h-full absolute"></div>
                <div className="bg-white p-6 rounded shadow-lg z-50 m-4">
                  <h2 className="text-xl font-bold mb-4">Rules and Regulations</h2>
                  <p className="mb-4">Here are the rules and regulations for the booking system.</p>
                  <button onClick={handlePopupClose} className='btn btn-primary'>OK</button>
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