import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Spin, DatePicker, Button, Form, message } from 'antd';
import moment from 'moment';
import 'tailwindcss/tailwind.css';

const { RangePicker } = DatePicker;

function BookNow() {
    const { id } = useParams();
    const [houseDetails, setHouseDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [fromTime, setFromTime] = useState(null);
    const [toTime, setToTime] = useState(null);

    useEffect(() => {
        const fetchHouseDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/property/singlehouse/${id}`);
                setHouseDetails(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch house details:', error);
                setLoading(false);
            }
        };

        fetchHouseDetails();
    }, [id]);

    const handleBooking = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/api/bookRoom/booking/${id}`, {
                fromTime,
                toTime,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (response.data.success) {
                message.success('House booked successfully');
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            message.error('Failed to book house');
        }
    };

    const onDateChange = (values) => {
        if (values) {
            setFromTime(moment(values[0]).toISOString());
            setToTime(moment(values[1]).toISOString());
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
                                            className="w-full md:w-1/2 p-2 object-cover transform transition-transform duration-300 hover:scale-105"
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="md:w-1/2 p-4">
                                <h2 className="text-2xl font-bold mb-4">{houseDetails.address}</h2>
                                <p className="mb-2">Floor Level: {houseDetails.floorLevel}</p>
                                <p className="mb-2">House Number: {houseDetails.houseNumber}</p>
                                <p className="mb-2">Rent Per Month: {houseDetails.rentPerMonth} birr</p>
                                <Form layout="vertical" onFinish={handleBooking}>
                                    <Form.Item label="Select Booking Time" required>
                                        <RangePicker
                                            showTime={{ format: 'HH:mm' }}
                                            format="YYYY-MM-DD HH:mm"
                                            onChange={onDateChange}
                                            className="w-full"
                                        />
                                    </Form.Item>
                                    <Button type="primary" htmlType="submit" className="w-full">
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