import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import swal from 'sweetalert2';
import { Form, Input, Button } from 'antd';
import { useTranslation } from 'react-i18next';

function Edithouse() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const [houseDetails, setHouseDetails] = useState({
    id: id,
    rentPerMonth: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming token is needed for authorization
        const response = await axios.get(`http://localhost:5000/api/property/singlehouse/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setHouseDetails(response.data.data); // Store the booking data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingData();
  }, [id]);

  const handleupdate = (e) => {
    e.preventDefault();
    if (!houseDetails.rentPerMonth) {
      toast.error('Rent per month cannot be empty');
      return;
    }
    axios
      .put(`http://localhost:5000/api/property/owner-edit-room/${id}`, houseDetails)
      .then((res) => {
        swal.fire({
          icon: 'success',
          title: 'House updated successfully',
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/myroomPosted');
      })
      .catch((err) => {
        console.error(err);
        toast.error('Error updating house: ' + err.message);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
        <h2 className="text-2xl font-bold mb-4 text-center">Owner Update House Rent/Month</h2>
        <Form onFinish={handleupdate} className="space-y-4">
          <Form.Item
            name="rentPerMonth"
            label="Rent Per Month"
            rules={[
              { required: true, message: t('landloard.edithouse.rent') },
              { type: 'number', message: t('landloard.edithouse.rentrequired') }
            ]}
          >
            <Input
              onChange={e => setHouseDetails({ ...houseDetails, rentPerMonth: e.target.value })}
              className="form-control mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              type="text"
              value={houseDetails.rentPerMonth}
            />
          </Form.Item>
          <div className="text-right">
            <Button type="primary" htmlType="submit" className="btn1 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Update
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Edithouse;