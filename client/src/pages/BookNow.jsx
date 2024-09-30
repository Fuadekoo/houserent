import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Spin, DatePicker, Button, Form, message, Checkbox } from 'antd';
import swal from 'sweetalert2';
import 'tailwindcss/tailwind.css';

const { RangePicker } = DatePicker;

function BookNow() {
  const { id } = useParams();
  const [houseDetails, setHouseDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fromTime, setFromTime] = useState();
  const [toTime, setToTime] = useState();
  const [totalDays, setTotalDays] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [isChecked, setIsChecked] = useState(false); // State for checkbox

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
    const diffDays = values[1].diff(values[0], 'days');

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
                <p className="mb-2">Floor Level: {houseDetails.floorLevel}</p>
                <p className="mb-2">House Number: {houseDetails.houseNumber}</p>
                <p className="mb-2">Rent Per Month: {houseDetails.rentPerMonth} birr</p>
                <p className="mb-2">description: {houseDetails.description}</p>
                <Form layout="vertical" onFinish={handleBooking}>
                  <Form.Item label="Select Booking Time" required>
                    <RangePicker
                      showTime={{ format: 'HH:mm' }}
                      format="YYYY-MM-DD HH:mm"
                      onChange={selectedTimeSlot}
                      className="w-full"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Checkbox
                      checked={isChecked}
                      onChange={(e) => setIsChecked(e.target.checked)}
                    >
                      I agree to the terms and conditions
                    </Checkbox>
                  </Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="w-full"
                    disabled={!isChecked} // Disable button if checkbox is not checked
                  >
                    Book Now
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default BookNow;