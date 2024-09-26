import { message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SetUser } from '../redux/usersSlice';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';
function Profile({ children }) {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.alerts);
  const { user } = useSelector(state => state.users);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
        message.error('Passwords do not match');
        return;
    }

    try {
        dispatch(ShowLoading());
        const response = await axios.put(
          `/api/users/update-user-by-id/${user._id}`,  // Use backticks here
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        
        dispatch(HideLoading());

        if (response.data.success) {
            message.success('User updated successfully');
            dispatch(SetUser(response.data.data));
        } else {
            message.error(response.data.message);
        }
    } catch (error) {
        message.error(error.message);
        dispatch(HideLoading());
    }
};

  return (
    <div className='p-3 max-w-lg mx-auto' ><h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type="email"
          placeholder="Email"
          disabled
          value={formData.email}
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Username"
          value={formData.name}
          className="border p-3 rounded-lg"
          id="name"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Enter New Password"
          value={formData.password}
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          className="border p-3 rounded-lg"
          id="confirmPassword"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? 'Loading...' : 'Update'}
        </button>
      </form>
      </div>
  );
}

export default Profile;
