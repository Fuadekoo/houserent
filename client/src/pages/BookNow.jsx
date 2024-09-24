import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { DatePicker, Spin, Button } from 'antd';
import moment from 'moment';
import 'tailwindcss/tailwind.css';

const { RangePicker } = DatePicker;

function BookNow() {
  const { id } = useParams();
  const [houseDetails, setHouseDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fromTime, setFromTime] = useState(null);
  const [toTime, setToTime] = useState(null);
  const [totalDays, setTotalDays] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  useEffect(() => {
    const fetchHouseDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/property/${id}`);
        setHouseDetails(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch house details:', error);
        setLoading(false);
      }
    };

    fetchHouseDetails();
  }, [id]);

  const selectedTimeSlot = (values) => {
    if (values) {
      setFromTime(moment(values[0]).format('MMM DD YYYY HH:mm'));
      setToTime(moment(values[1]).format('MMM DD YYYY HH:mm'));
      const days = values[1].diff(values[0], 'days');
      setTotalDays(days);
      setTotalPayment((houseDetails.rentPerMonth / 30) * days);
    }
  };

  const bookHouse = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/booking/book/${houseDetails._id}`, {
        fromTime,
        toTime,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.data.success) {
        alert('House booked successfully');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert('Failed to book house');
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
                  {houseDetails.images.map((image, index) => (
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
                <RangePicker
                  className="w-full mb-4"
                  showTime={{ format: 'HH:mm' }}
                  format="MMM DD YYYY HH:mm"
                  onChange={selectedTimeSlot}
                />
                <p className="mb-2">Total Days: {totalDays}</p>
                <p className="mb-2">Total Payment: {totalPayment.toFixed(2)} birr</p>
                <Button type="primary" onClick={bookHouse} className="w-full">
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default BookNow;